import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '@/context/AuthContext';
import Button from '@/components/common/Button';
import Input from '@/components/common/Input';
import { Select } from '@/components/common/Input';
import { User, Mail, Lock, Phone, MapPin, UserPlus, Leaf, CheckCircle } from 'lucide-react';

const roles = [
  { value: 'citizen', label: 'Citizen' },
  { value: 'authority', label: 'Municipal Authority' },
  { value: 'organization', label: 'Organization' },
];

const benefits = [
  'Report waste with AI-powered validation',
  'Track your civic impact and earn badges',
  'Join community cleanup campaigns',
  'Access real-time city cleanliness data',
  'Connect with municipal authorities directly',
];

export default function Signup() {
  const { signup } = useAuth();
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({ name: '', email: '', phone: '', password: '', confirmPassword: '', role: 'citizen', city: 'Bangalore', ward: 'W-14' });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const validateStep1 = () => {
    const e = {};
    if (!form.name) e.name = 'Name is required';
    if (!form.email) e.email = 'Email is required';
    if (!form.phone) e.phone = 'Phone is required';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const validateStep2 = () => {
    const e = {};
    if (!form.password || form.password.length < 6) e.password = 'Password must be at least 6 characters';
    if (form.password !== form.confirmPassword) e.confirmPassword = 'Passwords don\'t match';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleNext = () => {
    if (step === 1 && validateStep1()) setStep(2);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateStep2()) return;
    setLoading(true);
    const result = await signup(form);
    setLoading(false);
    if (result.success) {
      const paths = { citizen: '/citizen', authority: '/authority', admin: '/admin', organization: '/organization' };
      navigate(paths[result.user.role] || '/citizen');
    }
  };

  const update = (field, value) => {
    setForm({ ...form, [field]: value });
    if (errors[field]) setErrors({ ...errors, [field]: '' });
  };

  return (
    <div className="w-full max-w-5xl grid lg:grid-cols-2 gap-8 items-center">
      {/* Left panel */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
        className="hidden lg:flex flex-col justify-center p-10"
      >
        <div className="flex items-center gap-2.5 mb-8">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-civic-500 to-teal-500 flex items-center justify-center">
            <Leaf size={20} className="text-white" />
          </div>
          <span className="text-2xl font-bold text-[var(--text-primary)]">CivicLens</span>
        </div>
        <h2 className="text-3xl font-bold text-[var(--text-primary)] mb-4">
          Join the movement for <span className="text-gradient">civic accountability</span>
        </h2>
        <p className="text-[var(--text-secondary)] mb-8 leading-relaxed">
          Create your free account and start making a difference in your city today.
        </p>
        <div className="space-y-3">
          {benefits.map((b, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 + i * 0.08 }}
              className="flex items-center gap-3"
            >
              <CheckCircle size={16} className="text-civic-500 flex-shrink-0" />
              <span className="text-sm text-[var(--text-secondary)]">{b}</span>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Right: Signup Form */}
      <motion.div
        initial={{ opacity: 0, x: 20, rotateY: -5 }}
        animate={{ opacity: 1, x: 0, rotateY: 0 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="glass-strong rounded-2xl p-8 shadow-elevated relative overflow-hidden">
          <div className="absolute top-0 left-0 w-40 h-40 bg-gradient-to-br from-teal-500/10 to-transparent rounded-br-full" />

          <div className="relative">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-2">Create Account</h2>
              <p className="text-sm text-[var(--text-secondary)]">Step {step} of 2</p>
              <div className="flex gap-2 mt-3 justify-center">
                <div className={`h-1 w-16 rounded-full transition-colors ${step >= 1 ? 'bg-civic-500' : 'bg-[var(--bg-tertiary)]'}`} />
                <div className={`h-1 w-16 rounded-full transition-colors ${step >= 2 ? 'bg-civic-500' : 'bg-[var(--bg-tertiary)]'}`} />
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {step === 1 && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
                  <Input label="Full Name" icon={User} placeholder="Your name" value={form.name} onChange={e => update('name', e.target.value)} error={errors.name} required />
                  <Input label="Email" type="email" icon={Mail} placeholder="you@example.com" value={form.email} onChange={e => update('email', e.target.value)} error={errors.email} required />
                  <Input label="Phone" type="tel" icon={Phone} placeholder="+91 9876543210" value={form.phone} onChange={e => update('phone', e.target.value)} error={errors.phone} required />
                  <Select label="I am a..." icon={UserPlus} options={roles} value={form.role} onChange={e => update('role', e.target.value)} />
                  <Button type="button" variant="primary" size="lg" className="w-full" onClick={handleNext}>
                    Continue
                  </Button>
                </motion.div>
              )}

              {step === 2 && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
                  <Input label="Password" type="password" icon={Lock} placeholder="Min 6 characters" value={form.password} onChange={e => update('password', e.target.value)} error={errors.password} required />
                  <Input label="Confirm Password" type="password" icon={Lock} placeholder="Re-enter password" value={form.confirmPassword} onChange={e => update('confirmPassword', e.target.value)} error={errors.confirmPassword} required />
                  <Input label="City" icon={MapPin} placeholder="Your city" value={form.city} onChange={e => update('city', e.target.value)} />
                  
                  <label className="flex items-start gap-2 text-sm text-[var(--text-secondary)]">
                    <input type="checkbox" required className="mt-1 w-4 h-4 rounded accent-civic-500" />
                    <span>I agree to the <a href="#" className="text-civic-500 font-medium">Terms of Service</a> and <a href="#" className="text-civic-500 font-medium">Privacy Policy</a></span>
                  </label>

                  <div className="flex gap-3">
                    <Button type="button" variant="ghost" size="lg" className="flex-1" onClick={() => setStep(1)}>
                      Back
                    </Button>
                    <Button type="submit" variant="primary" size="lg" className="flex-1" loading={loading} icon={UserPlus}>
                      Create Account
                    </Button>
                  </div>
                </motion.div>
              )}
            </form>

            <div className="mt-6 text-center">
              <p className="text-sm text-[var(--text-secondary)]">
                Already have an account?{' '}
                <Link to="/login" className="text-civic-500 hover:text-civic-600 font-semibold">Sign in</Link>
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
