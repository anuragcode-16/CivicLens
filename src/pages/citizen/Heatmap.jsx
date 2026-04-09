import { useEffect, useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapContainer, TileLayer, CircleMarker, Popup, useMap } from 'react-leaflet';
import PageWrapper from '@/components/layout/PageWrapper';
import Card from '@/components/common/Card';
import { WASTE_CATEGORIES } from '@/data/mockData';
import { useTheme } from '@/context/ThemeContext';
import { useGetReportsQuery } from '@/store/api/reportsApi';
import {
  MapPin, AlertTriangle, CheckCircle, Clock, Filter, X,
  Activity, Flame, RefreshCw,
} from 'lucide-react';
import 'leaflet/dist/leaflet.css';

// Status → marker color mapping (per SKILL.md heatmap zones)
const STATUS_COLORS = {
  pending: '#f59e0b',      // Orange-Yellow
  'in-progress': '#3b82f6', // Blue
  resolved: '#22c55e',      // Green
  overdue: '#ef4444',       // Red
  escalated: '#dc2626',     // Dark Red
};

const SEVERITY_RADIUS = {
  LOW: 8,
  MEDIUM: 12,
  HIGH: 16,
  CRITICAL: 22,
};

const DEFAULT_MAP_CENTER = [12.9600, 77.5950];

// Tile layers
const LIGHT_TILES = 'https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png';
const DARK_TILES = 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png';
const TILE_ATTR = '&copy; <a href="https://www.openstreetmap.org/copyright">OSM</a> &copy; <a href="https://carto.com/">CARTO</a>';

// Recenter helper
function RecenterMap({ center }) {
  const map = useMap();
  map.setView(center, map.getZoom());
  return null;
}

function resolveAddress(report) {
  return (
    report?.ward_name ||
    report?.location?.address ||
    report?.location?.ward ||
    report?.address ||
    report?.ward_id ||
    report?.ward ||
    report?.city ||
    'Unknown'
  );
}

function normalizeCategory(value) {
  return String(value || 'mixed_waste').trim().replace(/-/g, '_').toLowerCase();
}

function normalizeStatus(value) {
  return String(value || 'pending').trim().toLowerCase().replace(/_/g, '-');
}

function normalizeReport(report, index) {
  const latitude = Number(report?.gps_lat ?? report?.latitude ?? report?.lat ?? report?.location?.lat);
  const longitude = Number(report?.gps_lng ?? report?.longitude ?? report?.lng ?? report?.location?.lng);

  return {
    ...report,
    id: String(report?.id ?? report?.reportId ?? report?._id ?? `report-${index}`),
    category: normalizeCategory(report?.category ?? report?.garbageType),
    severity: String(report?.severity || 'MEDIUM').toUpperCase(),
    status: normalizeStatus(report?.status),
    description: report?.description || report?.addressText || 'Waste report',
    citizen_name: report?.citizen_name || report?.reporter_name || report?.citizen?.name || 'Anonymous',
    address: resolveAddress(report),
    created_at: report?.created_at || report?.createdAt || new Date().toISOString(),
    gps_lat: latitude,
    gps_lng: longitude,
  };
}

function hasValidCoordinates(report) {
  return Number.isFinite(report.gps_lat)
    && Number.isFinite(report.gps_lng)
    && Math.abs(report.gps_lat) <= 90
    && Math.abs(report.gps_lng) <= 180;
}

export default function Heatmap() {
  const { theme } = useTheme();
  const { data: reportsResponse, isLoading, isFetching, isError, refetch } = useGetReportsQuery();
  const [wardFilter, setWardFilter] = useState('All');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [showFilters, setShowFilters] = useState(false);
  const [selectedReport, setSelectedReport] = useState(null);

  const reports = useMemo(() => {
    const raw = Array.isArray(reportsResponse)
      ? reportsResponse
      : Array.isArray(reportsResponse?.data)
        ? reportsResponse.data
        : Array.isArray(reportsResponse?.reports)
          ? reportsResponse.reports
          : [];

    return raw
      .map(normalizeReport)
      .filter(hasValidCoordinates);
  }, [reportsResponse]);

  const wardOptions = useMemo(() => {
    const wards = Array.from(new Set(reports.map((r) => r.address).filter(Boolean))).sort();
    return ['All', ...wards];
  }, [reports]);

  const categoryOptions = useMemo(() => {
    const categories = new Set(Object.keys(WASTE_CATEGORIES));
    reports.forEach((report) => {
      if (report.category) categories.add(report.category);
    });
    return ['All', ...Array.from(categories)];
  }, [reports]);

  useEffect(() => {
    if (wardFilter !== 'All' && !wardOptions.includes(wardFilter)) {
      setWardFilter('All');
    }
  }, [wardFilter, wardOptions]);

  useEffect(() => {
    if (categoryFilter !== 'All' && !categoryOptions.includes(categoryFilter)) {
      setCategoryFilter('All');
    }
  }, [categoryFilter, categoryOptions]);

  useEffect(() => {
    if (!selectedReport) return;
    const stillExists = reports.some((r) => r.id === selectedReport.id);
    if (!stillExists) setSelectedReport(null);
  }, [reports, selectedReport]);

  const filtered = useMemo(() => {
    return reports.filter((r) => {
      if (wardFilter !== 'All' && r.address !== wardFilter) return false;
      if (categoryFilter !== 'All' && r.category !== categoryFilter) return false;
      return true;
    });
  }, [reports, wardFilter, categoryFilter]);

  useEffect(() => {
    if (!selectedReport) return;
    const stillVisible = filtered.some((r) => r.id === selectedReport.id);
    if (!stillVisible) setSelectedReport(null);
  }, [filtered, selectedReport]);

  // Stats
  const stats = useMemo(() => {
    const total = filtered.length;
    const resolved = filtered.filter(r => r.status === 'resolved').length;
    const critical = filtered.filter(r => r.severity === 'CRITICAL' || r.status === 'escalated').length;
    const overdue = filtered.filter(r => r.status === 'overdue').length;
    return { total, resolved, resolvedPct: total ? Math.round((resolved / total) * 100) : 0, critical, overdue };
  }, [filtered]);

  const mapCenter = useMemo(() => {
    const source = filtered.length > 0 ? filtered : reports;
    if (source.length === 0) return DEFAULT_MAP_CENTER;

    const latSum = source.reduce((sum, report) => sum + report.gps_lat, 0);
    const lngSum = source.reduce((sum, report) => sum + report.gps_lng, 0);

    return [latSum / source.length, lngSum / source.length];
  }, [filtered, reports]);

  return (
    <PageWrapper>
      <div className="space-y-4">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-[var(--text-primary)] mb-1 flex items-center gap-2">
              <Flame size={24} className="text-warm-500" />
              Live Cleanliness Heatmap
            </h1>
            <p className="text-[var(--text-secondary)] text-sm">Real-time waste report density across Bangalore</p>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => refetch()}
              className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-sm font-semibold bg-[var(--bg-secondary)] border border-[var(--border-subtle)] text-[var(--text-primary)] hover:bg-[var(--bg-tertiary)] transition-colors"
            >
              <RefreshCw size={14} className={isFetching ? 'animate-spin' : ''} /> Refresh
            </button>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold bg-[var(--bg-secondary)] border border-[var(--border-subtle)] text-[var(--text-primary)] hover:bg-[var(--bg-tertiary)] transition-colors"
            >
              <Filter size={16} /> Filters {showFilters ? <X size={14} /> : null}
            </button>
          </div>
        </div>

        {isLoading && reports.length === 0 ? (
          <Card className="p-3 text-sm text-[var(--text-secondary)]">
            Loading live reports for the heatmap...
          </Card>
        ) : null}

        {isError ? (
          <Card className="p-3 text-sm text-danger-600 dark:text-danger-400">
            Unable to fetch report data right now. The map may be out of date.
          </Card>
        ) : null}

        {!isLoading && !isError && reports.length === 0 ? (
          <Card className="p-3 text-sm text-[var(--text-secondary)]">
            No geotagged reports available yet. Submit a report with location to populate the heatmap.
          </Card>
        ) : null}

        {/* Stats Bar */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          {[
            { label: 'Total Reports', value: stats.total, icon: MapPin, color: 'from-ocean-500/20 to-ocean-600/5 text-ocean-600 dark:text-ocean-400' },
            { label: 'Resolved', value: `${stats.resolvedPct}%`, icon: CheckCircle, color: 'from-civic-500/20 to-civic-600/5 text-civic-600 dark:text-civic-400' },
            { label: 'Critical / Escalated', value: stats.critical, icon: AlertTriangle, color: 'from-danger-500/20 to-danger-600/5 text-danger-600 dark:text-danger-400' },
            { label: 'Overdue', value: stats.overdue, icon: Clock, color: 'from-warm-500/20 to-warm-600/5 text-warm-600 dark:text-warm-400' },
          ].map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
            >
              <Card className="p-4">
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-xl bg-gradient-to-br ${s.color}`}>
                    <s.icon size={18} />
                  </div>
                  <div>
                    <p className="text-xl font-bold text-[var(--text-primary)]">{s.value}</p>
                    <p className="text-xs text-[var(--text-secondary)]">{s.label}</p>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Filters */}
        <AnimatePresence>
          {showFilters && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="overflow-hidden"
            >
              <Card className="p-4 space-y-4">
                <div>
                  <p className="text-xs font-semibold text-[var(--text-tertiary)] uppercase tracking-wide mb-2">Ward</p>
                  <div className="flex flex-wrap gap-2">
                    {wardOptions.map(w => (
                      <button
                        key={w}
                        onClick={() => setWardFilter(w)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                          wardFilter === w
                            ? 'bg-civic-500 text-white shadow-sm'
                            : 'bg-[var(--bg-tertiary)] text-[var(--text-secondary)] hover:bg-[var(--bg-secondary)]'
                        }`}
                      >
                        {w}
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <p className="text-xs font-semibold text-[var(--text-tertiary)] uppercase tracking-wide mb-2">Waste Category</p>
                  <div className="flex flex-wrap gap-2">
                    {categoryOptions.map(c => (
                      <button
                        key={c}
                        onClick={() => setCategoryFilter(c)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                          categoryFilter === c
                            ? 'bg-ocean-500 text-white shadow-sm'
                            : 'bg-[var(--bg-tertiary)] text-[var(--text-secondary)] hover:bg-[var(--bg-secondary)]'
                        }`}
                      >
                        {c === 'All' ? 'All' : WASTE_CATEGORIES[c]?.label || c.replace(/_/g, ' ')}
                      </button>
                    ))}
                  </div>
                </div>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Map */}
        <Card className="p-0 overflow-hidden rounded-2xl" padding={false}>
          <div className="relative h-[65vh] min-h-[400px]">
            <MapContainer
              center={mapCenter}
              zoom={14}
              scrollWheelZoom={true}
              className="h-full w-full z-0"
              style={{ background: theme === 'dark' ? '#0a1628' : '#f8fafc' }}
            >
              <TileLayer
                url={theme === 'dark' ? DARK_TILES : LIGHT_TILES}
                attribution={TILE_ATTR}
              />
              <RecenterMap center={mapCenter} />

              {filtered.map((report) => {
                const color = STATUS_COLORS[report.status] || '#94a3b8';
                const radius = SEVERITY_RADIUS[report.severity] || 10;
                const cat = WASTE_CATEGORIES[report.category];

                return (
                  <CircleMarker
                    key={report.id}
                    center={[report.gps_lat, report.gps_lng]}
                    radius={radius}
                    pathOptions={{
                      fillColor: color,
                      color: color,
                      weight: 2,
                      opacity: 0.9,
                      fillOpacity: 0.45,
                    }}
                    eventHandlers={{
                      click: () => setSelectedReport(report),
                    }}
                  >
                    <Popup>
                      <div className="min-w-[220px] text-sm font-sans">
                        <p className="font-bold text-base mb-1">{report.id}</p>
                        <div className="space-y-1 text-gray-700 dark:text-gray-300">
                          <p><strong>Category:</strong> {cat?.label || report.category}</p>
                          <p><strong>Severity:</strong> <span className={report.severity === 'CRITICAL' ? 'text-red-600 font-bold' : ''}>{report.severity}</span></p>
                          <p><strong>Status:</strong> <span className="capitalize">{report.status}</span></p>
                          <p><strong>Reporter:</strong> {report.citizen_name}</p>
                          <p><strong>Ward:</strong> {report.address}</p>
                          <p className="text-xs text-gray-500 mt-1">{report.description}</p>
                          <p className="text-xs text-gray-400 mt-1">{new Date(report.created_at).toLocaleString()}</p>
                        </div>
                      </div>
                    </Popup>
                  </CircleMarker>
                );
              })}
            </MapContainer>

            {/* Legend — glass overlay */}
            <div className="absolute bottom-4 left-4 z-[1000] glass-card p-3 rounded-xl">
              <p className="text-xs font-semibold text-[var(--text-primary)] mb-2">Heatmap Legend</p>
              <div className="space-y-1.5">
                {[
                  { color: 'bg-danger-500', label: 'Critical / Escalated' },
                  { color: 'bg-warm-500', label: 'Overdue' },
                  { color: 'bg-warning-400', label: 'Pending' },
                  { color: 'bg-ocean-500', label: 'In Progress' },
                  { color: 'bg-civic-500', label: 'Resolved' },
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <div className={`w-3 h-3 rounded-full ${item.color}`} />
                    <span className="text-[10px] text-[var(--text-secondary)]">{item.label}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Active report count */}
            <div className="absolute top-4 right-4 z-[1000] glass-card px-3 py-2 rounded-xl flex items-center gap-2">
              <Activity size={14} className="text-civic-500" />
              <span className="text-xs font-semibold text-[var(--text-primary)]">{filtered.length} reports visible</span>
            </div>
          </div>
        </Card>

        {/* Selected Report Detail */}
        <AnimatePresence>
          {selectedReport && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
            >
              <Card className="p-5">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 rounded-xl bg-gradient-to-br from-warm-500/20 to-danger-500/10">
                      <AlertTriangle size={20} className="text-warm-600 dark:text-warm-400" />
                    </div>
                    <div>
                      <h3 className="font-bold text-[var(--text-primary)]">{selectedReport.id}</h3>
                      <p className="text-xs text-[var(--text-tertiary)]">Reported by {selectedReport.citizen_name || 'Anonymous'}</p>
                    </div>
                  </div>
                  <button onClick={() => setSelectedReport(null)} className="p-1 rounded-lg hover:bg-[var(--bg-tertiary)] transition-colors">
                    <X size={18} className="text-[var(--text-tertiary)]" />
                  </button>
                </div>
                <p className="text-sm text-[var(--text-secondary)] mb-4">{selectedReport.description}</p>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
                  <div className="p-3 rounded-xl bg-[var(--bg-secondary)]">
                    <p className="text-[var(--text-tertiary)] text-xs mb-0.5">Category</p>
                    <p className="font-semibold text-[var(--text-primary)]">{WASTE_CATEGORIES[selectedReport.category]?.label || selectedReport.category}</p>
                  </div>
                  <div className="p-3 rounded-xl bg-[var(--bg-secondary)]">
                    <p className="text-[var(--text-tertiary)] text-xs mb-0.5">Severity</p>
                    <p className="font-semibold text-[var(--text-primary)]">{selectedReport.severity}</p>
                  </div>
                  <div className="p-3 rounded-xl bg-[var(--bg-secondary)]">
                    <p className="text-[var(--text-tertiary)] text-xs mb-0.5">Status</p>
                    <p className="font-semibold text-[var(--text-primary)] capitalize">{selectedReport.status}</p>
                  </div>
                  <div className="p-3 rounded-xl bg-[var(--bg-secondary)]">
                    <p className="text-[var(--text-tertiary)] text-xs mb-0.5">Address</p>
                    <p className="font-semibold text-[var(--text-primary)]">{selectedReport.address}</p>
                  </div>
                </div>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </PageWrapper>
  );
}
