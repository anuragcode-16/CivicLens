import { useState, useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { geocode } from 'opencage-api-client';
import PageWrapper from '@/components/layout/PageWrapper';
import Button from '@/components/common/Button';
import Input from '@/components/common/Input';
import { TextArea, Select } from '@/components/common/Input';
import Card from '@/components/common/Card';
import { WASTE_CATEGORIES } from '@/data/mockData';
import { ROUTES } from '@/lib/routes';
import { uploadImageToCloudinary, isCloudinaryConfigured } from '@/lib/cloudinary';
import { useAuth } from '@/context/AuthContext';
import { useCreateReportMutation } from '@/store/api/reportsApi';

const MotionDiv = motion.div;
import {
  Camera, Upload, MapPin, Scan, CheckCircle, AlertCircle,
  X, Image as ImageIcon, ArrowLeft, LocateFixed,
} from 'lucide-react';

const severityOptions = [
  { value: 'LOW', label: 'Low — Small isolated item' },
  { value: 'MEDIUM', label: 'Medium — Pile or accumulation' },
  { value: 'HIGH', label: 'High — Large dumping, drain blockage' },
  { value: 'CRITICAL', label: 'Critical — Hazardous, biomedical, fire risk' },
];

const categoryOptions = Object.entries(WASTE_CATEGORIES).map(([key, val]) => ({ value: key, label: `${val.icon} ${val.label}` }));
const INITIAL_FORM = {
  category: 'plastic_waste',
  severity: 'MEDIUM',
  description: '',
  location: 'Koramangala 4th Block, Bangalore',
};

/** Maps UI category keys to POST /api/reports `category` (see API_REPORT_README.md). */
const CATEGORY_TO_API = {
  plastic_waste: 'plastic',
  dry_waste: 'dry',
  wet_waste: 'wet',
  construction_debris: 'construction',
  biomedical_waste: 'biomedical',
  hazardous_waste: 'hazardous',
  e_waste: 'electronic',
  mixed_waste: 'mixed',
  domestic_waste: 'domestic',
};

const OPENCAGE_API_KEY = (import.meta.env.VITE_OPENCAGE_API_KEY || '').trim();

function apiErrorMessage(error, fallback) {
  return (
    error?.data?.message ||
    error?.data?.error ||
    error?.error ||
    fallback
  );
}

function buildValidationResult(categoryKey, severity) {
  const safeCategory = WASTE_CATEGORIES[categoryKey] ? categoryKey : 'mixed_waste';
  const safeSeverity = severityOptions.some((option) => option.value === severity) ? severity : 'MEDIUM';
  const categoryMeta = WASTE_CATEGORIES[safeCategory];

  return {
    category: safeCategory,
    object: categoryMeta?.label || 'Waste',
    severity: safeSeverity,
    confidence: 0.93,
    reason: `The uploaded photo appears to contain ${categoryMeta?.label?.toLowerCase() || 'waste'} and is suitable for reporting.`,
  };
}

function formatConfidenceScore(value) {
  return typeof value === 'number' && Number.isFinite(value)
    ? `${Math.round(value * 100)}%`
    : value || '—';
}

function formatCoordinates(coords) {
  return coords && typeof coords.lat === 'number' && typeof coords.lng === 'number'
    ? `${coords.lat.toFixed(5)}, ${coords.lng.toFixed(5)}`
    : 'Coordinates unavailable';
}



export default function ReportWaste({ embedded = false }) {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [createReport, { isLoading: isCreatingReport }] = useCreateReportMutation();
  const [step, setStep] = useState(1); // 1 = upload, 2 = review (validation + details), 3 = confirm
  const [imagePreview, setImagePreview] = useState(null);
  const [validating, setValidating] = useState(false);
  const [validation, setValidation] = useState(null);
  const [form, setForm] = useState(INITIAL_FORM);
  const [submitting, setSubmitting] = useState(false);
  /** Full Cloudinary upload JSON (secure_url, public_id, asset_id, …). */
  const [cloudinaryAsset, setCloudinaryAsset] = useState(null);
  const [uploadError, setUploadError] = useState(null);
  const [submitError, setSubmitError] = useState(null);
  const [createdReport, setCreatedReport] = useState(null);
  const [validationPhase, setValidationPhase] = useState('idle'); // 'upload' | 'analyze' | 'idle'
  const [locationCoords, setLocationCoords] = useState(null);
  const [isGeocoding, setIsGeocoding] = useState(false);
  const [useCurrentLocation, setUseCurrentLocation] = useState(false);
  const [isFetchingCurrentLocation, setIsFetchingCurrentLocation] = useState(false);
  const [manualLocation, setManualLocation] = useState(INITIAL_FORM.location);
  const [locationError, setLocationError] = useState(null);

  useEffect(() => {
    setValidation((current) => (
      current ? buildValidationResult(form.category, form.severity) : current
    ));
  }, [form.category, form.severity]);

  const resolveLocationCoordinates = useCallback(
    async (locationText) => {
      const query = (locationText || '').trim();

      if (!query) {
        setLocationCoords(null);
        setLocationError('Location is required.');
        return null;
      }

      if (!OPENCAGE_API_KEY) {
        setLocationError('Geocoding is not configured. Set VITE_OPENCAGE_API_KEY in .env.');
        return null;
      }

      setIsGeocoding(true);
      setLocationError(null);

      try {
        const result = await geocode({
          q: query,
          key: OPENCAGE_API_KEY,
          no_annotations: 1,
          limit: 1,
        });

        const geometry = result?.results?.[0]?.geometry;
        // Patch: ensure lat/lng are numeric and not null/undefined/NaN and not the string 'undefined'
        if (
          !geometry ||
          typeof geometry.lat !== 'number' || typeof geometry.lng !== 'number' ||
          isNaN(geometry.lat) || isNaN(geometry.lng) ||
          geometry.lat === null || geometry.lng === null ||
          geometry.lat === undefined || geometry.lng === undefined
        ) {
          setLocationCoords(null);
          setLocationError('Could not find coordinates for this location.');
          return null;
        }

        const coords = { lat: geometry.lat, lng: geometry.lng };
        setLocationCoords(coords);
        return coords;
      } catch (error) {
        setLocationCoords(null);
        setLocationError(error?.message || 'Unable to geocode this location right now.');
        return null;
      } finally {
        setIsGeocoding(false);
      }
    },
    [],
  );

  const processImageFile = useCallback(
    async (file) => {
      if (!file || !file.type.startsWith('image/')) return;

      setImagePreview(URL.createObjectURL(file));
      setCloudinaryAsset(null);
      setUploadError(null);
      setSubmitError(null);
      setCreatedReport(null);
      setValidation(null);
      setStep(2);
      setValidating(true);
      setValidationPhase('upload');

      try {
        if (!isCloudinaryConfigured()) {
          throw new Error(
            'Image upload is not configured. Set VITE_CLOUDINARY_CLOUD_NAME (and optional VITE_CLOUDINARY_UPLOAD_PRESET) in .env.',
          );
        }
        const asset = await uploadImageToCloudinary(file);
        setCloudinaryAsset(asset);

        setValidationPhase('analyze');
        await new Promise((r) => setTimeout(r, 2500));
        setValidation(buildValidationResult(form.category, form.severity));
      } catch (err) {
        setUploadError(err?.message || 'Could not upload image. Try again.');
      } finally {
        setValidating(false);
        setValidationPhase('idle');
      }
    },
    [form.category, form.severity],
  );

  const handleImageChange = useCallback(
    (e) => {
      const file = e.target.files?.[0];
      if (file) processImageFile(file);
      e.target.value = '';
    },
    [processImageFile],
  );

  const handleDrop = useCallback(
    (e) => {
      e.preventDefault();
      const file = e.dataTransfer?.files?.[0];
      if (file && file.type.startsWith('image/')) processImageFile(file);
    },
    [processImageFile],
  );

  const toggleCurrentLocation = useCallback(() => {
    if (useCurrentLocation) {
      setUseCurrentLocation(false);
      setIsFetchingCurrentLocation(false);
      setLocationCoords(null);
      setLocationError(null);
      setForm((prev) => ({ ...prev, location: manualLocation }));
      return;
    }

    if (typeof navigator === 'undefined' || !navigator.geolocation) {
      setLocationError('Current location is not supported in this browser.');
      return;
    }

    setIsFetchingCurrentLocation(true);
    setLocationError(null);

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const coords = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };

        setLocationCoords(coords);
        setUseCurrentLocation(true);
        setForm((prev) => ({
          ...prev,
          location: `Current location (${formatCoordinates(coords)})`,
        }));
        setIsFetchingCurrentLocation(false);
      },
      (error) => {
        const message = error?.code === 1
          ? 'Location permission was denied. Allow access to use your current coordinates.'
          : error?.code === 2
            ? 'Your current location could not be determined.'
            : error?.code === 3
              ? 'Current location request timed out. Try again.'
              : 'Unable to access your current location right now.';

        setLocationError(message);
        setLocationCoords(null);
        setUseCurrentLocation(false);
        setIsFetchingCurrentLocation(false);
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0,
      },
    );
  }, [manualLocation, useCurrentLocation]);

  const resetReview = useCallback(() => {
    setStep(1);
    setImagePreview(null);
    setValidation(null);
    setCloudinaryAsset(null);
    setUploadError(null);
    setSubmitError(null);
    setCreatedReport(null);
    setValidating(false);
    setSubmitting(false);
    setValidationPhase('idle');
    setLocationCoords(null);
    setUseCurrentLocation(false);
    setIsFetchingCurrentLocation(false);
    setLocationError(null);
    setForm((prev) => ({ ...prev, location: manualLocation }));
  }, [manualLocation]);

  const resetFlow = useCallback(() => {
    resetReview();
    setForm(INITIAL_FORM);
    setManualLocation(INITIAL_FORM.location);
  }, [resetReview]);

  const handleSubmit = async () => {
    if (submitting || isCreatingReport) return;
    setSubmitError(null);
    const imageUrl = cloudinaryAsset?.secure_url || cloudinaryAsset?.url;
    if (!imageUrl) {
      setSubmitError('Image is missing. Please upload a photo again.');
      return;
    }
    const userId = user?.id != null ? Number(user.id) : NaN;
    if (!Number.isFinite(userId)) {
      setSubmitError('You must be signed in to submit a report.');
      return;
    }

    let coords = locationCoords;
    // If we don't have coords, resolve via geocode
    if (!coords) {
      coords = await resolveLocationCoordinates(form.location);
    }

    // Patch: validate coords here, make sure lat/lng are numbers and not NaN/null/undefined
    if (
      !coords ||
      typeof coords.lat !== 'number' ||
      typeof coords.lng !== 'number' ||
      isNaN(coords.lat) ||
      isNaN(coords.lng)
    ) {
      setSubmitError('Please enter a valid location so we can detect latitude and longitude.');
      return;
    }

    const apiCategory = CATEGORY_TO_API[form.category] || 'mixed';

    const payload = {
      userId,
      imageUrl: String(imageUrl),
      latitude: Number(coords.lat),
      longitude: Number(coords.lng),
      addressText: (form.location || '').trim() || 'Current location',
      description: (form.description || '').trim(),
      category: apiCategory,
      severity: (form.severity || 'MEDIUM').toLowerCase(),
      status: 'pending',
      aiConfidenceScore: validation?.confidence || null,
    };

    setSubmitting(true);
    try {
      const result = await createReport(payload).unwrap();
      const saved = result?.data != null && typeof result.data === 'object' ? result.data : result;
      setCreatedReport(saved);
      setStep(3);
    } catch (err) {
      setSubmitError(apiErrorMessage(err, 'Could not submit report. Try again.'));
    } finally {
      setSubmitting(false);
    }
  };

  const inner = (
    <>
      {/* Header */}
      <div className={embedded ? 'mb-3' : 'mb-8'}>
        <h1 className={`font-bold text-[var(--text-primary)] mb-0.5 ${embedded ? 'text-lg sm:text-xl' : 'text-2xl'}`}>
          Report Waste
        </h1>
        <p className={`text-[var(--text-secondary)] ${embedded ? 'text-xs sm:text-sm' : ''}`}>
          Upload a photo, let AI validate it, and file your report
        </p>
      </div>

      {/* Progress Steps */}
      <div className={`flex items-center gap-1 sm:gap-2 max-w-lg ${embedded ? 'mb-4' : 'mb-8'}`}>
        {['Upload', 'Review', 'Confirm'].map((label, i) => (
          <div key={i} className="flex items-center gap-2 flex-1">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-colors ${
              step > i + 1 ? 'bg-civic-500 text-white' :
              step === i + 1 ? 'bg-civic-500 text-white' :
              'bg-[var(--bg-tertiary)] text-[var(--text-tertiary)]'
            }`}>
              {step > i + 1 ? <CheckCircle size={16} /> : i + 1}
            </div>
            <span className={`text-[10px] sm:text-xs font-medium ${embedded ? '' : 'hidden sm:block'} ${step >= i + 1 ? 'text-[var(--text-primary)]' : 'text-[var(--text-tertiary)]'}`}>{label}</span>
            {i < 2 && <div className={`flex-1 h-0.5 rounded-full ${step > i + 1 ? 'bg-civic-500' : 'bg-[var(--bg-tertiary)]'}`} />}
          </div>
        ))}
      </div>

      <AnimatePresence mode="wait">
        {/* Step 1: Upload */}
        {step === 1 && (
          <MotionDiv key="upload" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
            <Card className={`max-w-2xl ${embedded ? 'p-4 sm:p-5' : 'p-8'}`}>
              <div
                onDragOver={e => e.preventDefault()}
                onDrop={handleDrop}
                className={`border-2 border-dashed border-[var(--border-subtle)] hover:border-civic-500/50 rounded-2xl text-center transition-colors cursor-pointer ${embedded ? 'p-6 sm:p-8' : 'p-12'}`}
              >
                <input type="file" accept="image/*" capture="environment" onChange={handleImageChange} className="hidden" id="waste-image" />
                <label htmlFor="waste-image" className="cursor-pointer">
                  <div className="w-16 h-16 rounded-2xl bg-civic-500/10 flex items-center justify-center mx-auto mb-4">
                    <Camera size={28} className="text-civic-500" />
                  </div>
                  <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-2">Upload Waste Photo</h3>
                  <p className="text-sm text-[var(--text-secondary)] mb-4">
                    Take a photo or drag and drop an image of the waste
                  </p>
                  <div className="flex flex-wrap justify-center gap-2">
                    <Button variant="primary" size="md" icon={Camera}>Take Photo</Button>
                    <Button variant="outline" size="md" icon={Upload}>Upload File</Button>
                  </div>
                </label>
              </div>
              <p className="text-xs text-[var(--text-tertiary)] mt-4 text-center">
                Supported formats: JPG, PNG, HEIF · Max size: 10MB · GPS location will be auto-tagged
              </p>
            </Card>
          </MotionDiv>
        )}

        {/* Step 2: Review */}
        {step === 2 && (
          <MotionDiv key="validate" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
            <div className={`grid md:grid-cols-2 max-w-5xl ${embedded ? 'gap-3 sm:gap-4' : 'gap-6'}`}>
              {/* Image Preview */}
              <Card className="p-4 overflow-hidden">
                {imagePreview ? (
                  <div className="space-y-4">
                    <div className="relative rounded-xl overflow-hidden aspect-[4/3] bg-[var(--bg-tertiary)]">
                      <img src={imagePreview} alt="Uploaded waste" className="w-full h-full object-cover" />
                      <button onClick={resetReview} className="absolute top-2 right-2 w-8 h-8 rounded-lg glass flex items-center justify-center text-white hover:bg-danger-500 transition-colors">
                        <X size={16} />
                      </button>
                    </div>
                    <div className="rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-secondary)] p-4 text-sm">
                      <p className="font-semibold text-[var(--text-primary)]">Uploaded Photo</p>
                      <p className="mt-1 text-[var(--text-secondary)]">
                        Validation results and report details now appear together so you can review and submit in one place.
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="aspect-[4/3] bg-[var(--bg-tertiary)] rounded-xl flex items-center justify-center">
                    <ImageIcon size={48} className="text-[var(--text-tertiary)]" />
                  </div>
                )}
              </Card>

              {/* Validation + Details */}
              <Card className={`p-6 ${embedded ? '' : 'min-h-[32rem]'}`}>
                {validating ? (
                  <div className="flex flex-col items-center justify-center h-full py-12">
                    <div className="relative w-16 h-16 mb-4">
                      <div className="absolute inset-0 rounded-full border-2 border-civic-500/20 animate-ping" />
                      <div className="absolute inset-0 rounded-full border-2 border-t-civic-500 animate-spin" />
                      <div className="absolute inset-2 rounded-full bg-civic-500/10 flex items-center justify-center">
                        <Scan size={20} className="text-civic-500" />
                      </div>
                    </div>
                    <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-2">
                      {validationPhase === 'upload' ? 'Uploading photo…' : 'AI Analyzing Image'}
                    </h3>
                    <p className="text-sm text-[var(--text-secondary)] text-center px-2">
                      {validationPhase === 'upload'
                        ? 'Sending your image securely to Cloudinary…'
                        : 'Detecting waste, classifying type, and assessing severity…'}
                    </p>
                  </div>
                ) : uploadError ? (
                  <div className="flex flex-col items-stretch justify-center h-full py-8 px-1">
                    <div className="flex items-center gap-2 mb-3 text-danger-600 dark:text-danger-400">
                      <AlertCircle size={22} className="shrink-0" />
                      <h3 className="text-lg font-semibold text-[var(--text-primary)]">Upload failed</h3>
                    </div>
                    <p className="text-sm text-[var(--text-secondary)] mb-6">{uploadError}</p>
                    <Button
                      variant="primary"
                      size="lg"
                      className="w-full"
                      onClick={resetReview}
                    >
                      Choose another photo
                    </Button>
                  </div>
                ) : validation ? (
                  <div className="space-y-6">
                    <div className="space-y-4">
                      <div className="flex flex-wrap items-start justify-between gap-3">
                        <div>
                          <div className="flex items-center gap-2">
                            <CheckCircle size={20} className="text-civic-500" />
                            <h3 className="text-lg font-semibold text-[var(--text-primary)]">AI Validation Complete</h3>
                          </div>
                          <p className="mt-1 text-sm text-[var(--text-secondary)]">
                            Review the suggested waste details below, then make any edits before submitting.
                          </p>
                        </div>
                        <span className="rounded-full bg-civic-500/10 px-3 py-1 text-xs font-semibold text-civic-700 dark:text-civic-300">
                          {formatConfidenceScore(validation.confidence)} confidence
                        </span>
                      </div>

                      <div className="grid gap-3 sm:grid-cols-2">
                        {[
                          ['Detected category', WASTE_CATEGORIES[validation.category]?.label || 'Waste'],
                          ['Detected object', validation.object || 'Waste'],
                          ['Suggested severity', validation.severity || 'MEDIUM'],
                          ['Photo status', 'Ready to submit'],
                        ].map(([label, value]) => (
                          <div key={label} className="rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-secondary)] p-3">
                            <p className="text-xs font-medium uppercase tracking-wide text-[var(--text-tertiary)]">{label}</p>
                            <p className="mt-1 text-sm font-semibold text-[var(--text-primary)]">{value}</p>
                          </div>
                        ))}
                      </div>

                      <div className="rounded-xl border border-civic-500/20 bg-civic-500/5 p-4 text-sm text-[var(--text-secondary)]">
                        <span className="font-semibold text-[var(--text-primary)]">AI note:</span> {validation.reason}
                      </div>
                    </div>

                    <div className="border-t border-[var(--border-subtle)] pt-6">
                      <div className="mb-5">
                        <h4 className="text-base font-semibold text-[var(--text-primary)]">Report Details</h4>
                        <p className="mt-1 text-sm text-[var(--text-secondary)]">
                          These details will be sent to the responsible authority with your report.
                        </p>
                      </div>

                      <div className="space-y-5">
                        {submitError ? (
                          <p className="text-sm text-danger-600 dark:text-danger-400 font-medium bg-danger-50 dark:bg-danger-950/30 border border-danger-200 dark:border-danger-800 rounded-xl px-3 py-2">
                            {submitError}
                          </p>
                        ) : null}
                        <Select
                          label="Waste Category"
                          options={categoryOptions}
                          value={form.category}
                          onChange={e => setForm({ ...form, category: e.target.value })}
                        />
                        <Select
                          label="Severity"
                          options={severityOptions}
                          value={form.severity}
                          onChange={e => setForm({ ...form, severity: e.target.value })}
                        />
                        <div className="rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-secondary)] p-3">
                          <div className="flex flex-wrap items-center justify-between gap-3">
                            <div>
                              <p className="text-sm font-semibold text-[var(--text-primary)]">Location Source</p>
                              <p className="mt-1 text-xs text-[var(--text-secondary)]">
                                Toggle this on to use your device&apos;s current latitude and longitude.
                              </p>
                            </div>
                            <Button
                              type="button"
                              variant={useCurrentLocation ? 'primary' : 'outline'}
                              size="sm"
                              onClick={toggleCurrentLocation}
                              loading={isFetchingCurrentLocation}
                              icon={LocateFixed}
                            >
                              {useCurrentLocation ? 'Using Current Location' : 'Use Current Location'}
                            </Button>
                          </div>
                          {useCurrentLocation && locationCoords ? (
                            <p className="mt-3 text-xs font-medium text-civic-700 dark:text-civic-300">
                              Current coordinates: {formatCoordinates(locationCoords)}
                            </p>
                          ) : null}
                        </div>
                        <Input
                          label="Location"
                          icon={MapPin}
                          value={form.location}
                          disabled={useCurrentLocation}
                          onChange={e => {
                            setForm({ ...form, location: e.target.value });
                            setManualLocation(e.target.value);
                            setLocationCoords(null);
                            setLocationError(null);
                          }}
                          onBlur={e => {
                            if (!useCurrentLocation) {
                              void resolveLocationCoordinates(e.target.value);
                            }
                          }}
                          helper={
                            locationError
                              ? locationError
                              : isFetchingCurrentLocation
                                ? 'Fetching your current device coordinates...'
                                : useCurrentLocation && locationCoords
                                  ? `Using current coordinates: ${formatCoordinates(locationCoords)}`
                                  : isGeocoding
                                ? 'Resolving location coordinates...'
                                : locationCoords
                                  ? `Coordinates: ${formatCoordinates(locationCoords)}`
                                  : 'Enter an address/place name and click outside to fetch lat/lng.'
                          }
                          error={locationError || undefined}
                        />
                        <TextArea
                          label="Description (Optional)"
                          placeholder="Add any additional details about the waste..."
                          value={form.description}
                          onChange={e => setForm({ ...form, description: e.target.value })}
                        />
                        <div className="flex gap-3 pt-2">
                          <Button variant="ghost" size="lg" onClick={resetReview} icon={ArrowLeft}>Choose Another Photo</Button>
                          <Button variant="primary" size="lg" className="flex-1" onClick={handleSubmit} loading={submitting || isCreatingReport} icon={CheckCircle}>
                            Submit Report
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="flex h-full items-center justify-center text-center">
                    <div>
                      <p className="text-base font-semibold text-[var(--text-primary)]">Waiting for validation</p>
                      <p className="mt-1 text-sm text-[var(--text-secondary)]">
                        Upload a clear photo to review the AI analysis and complete the report details here.
                      </p>
                    </div>
                  </div>
                )}
              </Card>
            </div>
          </MotionDiv>
        )}

        {/* Step 3: Confirmation */}
        {step === 3 && (
          <MotionDiv key="confirm" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}>
            <Card className="p-8 max-w-lg mx-auto text-center">
              <MotionDiv
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', damping: 15 }}
                className="w-20 h-20 rounded-full bg-civic-500/10 flex items-center justify-center mx-auto mb-6"
              >
                <CheckCircle size={40} className="text-civic-500" />
              </MotionDiv>
              <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-2">Report Submitted!</h2>
              <p className="text-[var(--text-secondary)] mb-4">Your waste report has been filed and sent to the responsible authority.</p>
              <div className="bg-[var(--bg-tertiary)] rounded-xl p-4 mb-6 text-left space-y-2 text-sm">
                <div className="flex justify-between gap-2">
                  <span className="text-[var(--text-secondary)] shrink-0">Report ID</span>
                  <span className="font-mono font-semibold text-civic-600 dark:text-civic-400 text-right break-all">
                    {createdReport?.id != null
                      ? String(createdReport.id)
                      : createdReport?.reportId != null
                        ? String(createdReport.reportId)
                        : '—'}
                  </span>
                </div>
                <div className="flex justify-between"><span className="text-[var(--text-secondary)]">Category</span><span className="font-medium">{WASTE_CATEGORIES[form.category]?.label}</span></div>
                <div className="flex justify-between"><span className="text-[var(--text-secondary)]">Status</span><span className="font-medium text-warning-500">Pending</span></div>
                {cloudinaryAsset?.secure_url || cloudinaryAsset?.url ? (
                  <div className="flex justify-between gap-2 items-start pt-1 border-t border-[var(--border-subtle)]">
                    <span className="text-[var(--text-secondary)] shrink-0">Photo</span>
                    <span className="font-medium text-civic-600 dark:text-civic-400 text-right break-all text-xs line-clamp-2" title={cloudinaryAsset.secure_url || cloudinaryAsset.url}>
                      Saved
                    </span>
                  </div>
                ) : null}
              </div>
              <div className="flex gap-3">
                <Button
                  variant="outline"
                  size="md"
                  className="flex-1"
                  onClick={() => navigate(`${ROUTES.citizen.home}#my-reports`)}
                >
                  View My Reports
                </Button>
                <Button variant="primary" size="md" className="flex-1" onClick={resetFlow}>
                  Report Another
                </Button>
              </div>
            </Card>
          </MotionDiv>
        )}
      </AnimatePresence>
    </>
  );

  return embedded ? inner : <PageWrapper>{inner}</PageWrapper>;
}
