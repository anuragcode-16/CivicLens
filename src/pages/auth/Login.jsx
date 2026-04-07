import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '@/context/AuthContext';
import Button from '@/components/common/Button';
import Input from '@/components/common/Input';
import { Select } from '@/components/common/Input';
import { Mail, Lock, LogIn, Leaf, ArrowRight, Shield, Users, BarChart3 } from 'lucide-react';

const roles = [
  { value: 'citizen', label: 'Citizen' },
  { value: 'authority', label: 'Municipal Authority' },
  { value: 'organization', label: 'Organization' },
  { value: 'admin', label: 'Administrator' },
];

const features = [
  { icon: Shield, text: 'AI-verified waste reporting' },
  { icon: Users, text: 'Role-based civic dashboards' },
  { icon: BarChart3, text: 'Real-time analytics & heatmaps' },
];

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    const result = await login(form.email, form.password);
    setLoading(false);
    if (result.success) {
      const paths = { citizen: '/citizen', authority: '/authority', admin: '/admin', organization: '/organization' };
      navigate(paths[result.user.role] || '/citizen');
    } else {
      setError('Invalid credentials. Try: citizen@civic.lens / authority@civic.lens / admin@civic.lens / org@civic.lens');
    }
  };

  return (
    <div className="w-full max-w-5xl grid lg:grid-cols-2 gap-8 items-center">
      {/* Left: Feature Panel */}
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
          Welcome back to <span className="text-gradient">cleaner cities</span>
        </h2>
        <p className="text-[var(--text-secondary)] mb-8 leading-relaxed">
          Log in to your dashboard. Report waste, track resolutions, check your impact score, and stay connected to your city's cleanliness.
        </p>
        <div className="space-y-4">
          {features.map((f, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 + i * 0.1 }}
              className="flex items-center gap-3"
            >
              <div className="w-9 h-9 rounded-lg bg-civic-500/10 flex items-center justify-center">
                <f.icon size={16} className="text-civic-500" />
              </div>
              <span className="text-sm text-[var(--text-secondary)]">{f.text}</span>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Right: Login Form */}
      <motion.div
        initial={{ opacity: 0, x: 20, rotateY: -5 }}
        animate={{ opacity: 1, x: 0, rotateY: 0 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        style={{ perspective: '1000px' }}
      >
        <div className="glass-strong rounded-2xl p-8 shadow-elevated relative overflow-hidden">
          {/* Decorative gradient */}
          <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-bl from-civic-500/10 to-transparent rounded-bl-full" />
          
          <div className="relative">
            <div className="text-center mb-8">
              <div className="lg:hidden flex items-center justify-center gap-2 mb-4">
                <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-civic-500 to-teal-500 flex items-center justify-center">
                  <Leaf size={18} className="text-white" />
                </div>
              </div>
              <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-2">Sign In</h2>
              <p className="text-sm text-[var(--text-secondary)]">Access your CivicLens dashboard</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <Input
                label="Email"
                type="email"
                icon={Mail}
                placeholder="citizen@civic.lens"
                value={form.email}
                onChange={e => setForm({ ...form, email: e.target.value })}
                required
              />
              <Input
                label="Password"
                type="password"
                icon={Lock}
                placeholder="Enter your password"
                value={form.password}
                onChange={e => setForm({ ...form, password: e.target.value })}
                required
              />

              <div className="flex items-center justify-between">
                <label className="flex items-center gap-2 text-sm text-[var(--text-secondary)] cursor-pointer">
                  <input type="checkbox" className="w-4 h-4 rounded border-[var(--border-subtle)] accent-civic-500" />
                  Remember me
                </label>
                <Link to="/forgot-password" className="text-sm text-civic-500 hover:text-civic-600 font-medium">
                  Forgot password?
                </Link>
              </div>

              {error && (
                <motion.p
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-sm text-danger-500 bg-danger-50 dark:bg-danger-500/10 px-4 py-2.5 rounded-xl"
                >
                  {error}
                </motion.p>
              )}

              <Button
                type="submit"
                variant="primary"
                size="lg"
                loading={loading}
                className="w-full"
                icon={LogIn}
              >
                Sign In
              </Button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-sm text-[var(--text-secondary)]">
                Don't have an account?{' '}
                <Link to="/signup" className="text-civic-500 hover:text-civic-600 font-semibold">
                  Sign up <ArrowRight size={12} className="inline" />
                </Link>
              </p>
            </div>

            <div className="mt-6 pt-5 border-t border-[var(--border-subtle)]">
              <p className="text-xs text-[var(--text-tertiary)] text-center">
                Demo accounts: citizen@civic.lens · authority@civic.lens · admin@civic.lens · org@civic.lens (any password)
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
