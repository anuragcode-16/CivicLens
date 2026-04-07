import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import PageWrapper from '@/components/layout/PageWrapper';
import Button from '@/components/common/Button';
import Card from '@/components/common/Card';
import TerminalLoader from '@/components/landing/TerminalLoader';
import AnimatedCounter from '@/components/landing/AnimatedCounter';
import {
  Camera, Shield, MapPin, BarChart3, Users, Recycle, Bot, Megaphone,
  ArrowRight, CheckCircle, Zap, Globe, Award, TrendingUp,
  Building2, Truck, BookOpen, ChevronRight, Star, Leaf
} from 'lucide-react';
import { HeroGlobe } from '@/components/landing/HeroGlobe';

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
};

const staggerContainer = {
  animate: { transition: { staggerChildren: 0.1 } },
};

function SectionHeading({ tag, title, description }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6 }}
      className="text-center max-w-2xl mx-auto mb-12"
    >
      {tag && (
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-civic-500/10 text-civic-600 dark:text-civic-400 mb-4">
          <Leaf size={12} /> {tag}
        </span>
      )}
      <h2 className="text-3xl sm:text-4xl font-bold text-[var(--text-primary)] mb-4">{title}</h2>
      {description && <p className="text-[var(--text-secondary)] text-lg leading-relaxed">{description}</p>}
    </motion.div>
  );
}

const features = [
  { icon: Camera, title: 'Smart Reporting', desc: 'Snap a photo, tag the location, and your report is filed instantly with AI validation.', color: 'from-civic-500 to-teal-500' },
  { icon: Bot, title: 'AI Classification', desc: 'Gemini-powered image analysis classifies waste into 9 categories automatically.', color: 'from-ocean-500 to-civic-500' },
  { icon: Shield, title: 'Verified Accountability', desc: 'Before and after photos ensure transparent resolution tracking.', color: 'from-teal-500 to-ocean-500' },
  { icon: MapPin, title: 'Live Heatmap', desc: 'See your city\'s cleanliness in real-time. Red for dirty, green for clean.', color: 'from-danger-500 to-warm-500' },
  { icon: Megaphone, title: 'Cleanup Campaigns', desc: 'Join community drives, earn impact points, and climb the leaderboard.', color: 'from-warm-500 to-blush-500' },
  { icon: Recycle, title: 'Disposal Locator', desc: 'Find the nearest e-waste bin, composting site, or recycling center.', color: 'from-civic-500 to-civic-600' },
  { icon: BarChart3, title: 'Ward Analytics', desc: 'Deep insights into complaint patterns, resolution rates, and hotspots.', color: 'from-ocean-500 to-ocean-600' },
  { icon: Award, title: 'Impact Score', desc: 'Earn points for every report, campaign, and verified cleanup contribution.', color: 'from-blush-500 to-warm-500' },
];

const howItWorks = [
  { step: '01', title: 'Report', desc: 'Take a photo of waste and submit with location', icon: Camera },
  { step: '02', title: 'Validate', desc: 'AI analyzes the image and classifies waste type', icon: Zap },
  { step: '03', title: 'Route', desc: 'Report sent to the right authority and department', icon: TrendingUp },
  { step: '04', title: 'Resolve', desc: 'Cleanup team dispatched, verified with after photo', icon: CheckCircle },
];

const stakeholders = [
  { icon: Users, title: 'Citizens', desc: 'Report waste, join campaigns, track cleanup progress.', color: 'civic' },
  { icon: Shield, title: 'Municipal Authorities', desc: 'Manage reports, assign workers, track SLA performance.', color: 'ocean' },
  { icon: Building2, title: 'Organizations', desc: 'Bulk waste compliance, segregation tracking, pickup scheduling.', color: 'teal' },
  { icon: Globe, title: 'NGOs & Government', desc: 'Run cleanup campaigns, publish guides, monitor impact.', color: 'warm' },
];

const stats = [
  { value: 12847, suffix: '+', label: 'Reports Filed' },
  { value: 79, suffix: '%', label: 'Resolution Rate' },
  { value: 8432, suffix: '+', label: 'Active Citizens' },
  { value: 24, suffix: '', label: 'Active Campaigns' },
];

export default function Landing() {
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <PageWrapper>
      {/* ===== HERO ===== */}
      <section ref={heroRef} className="relative min-h-[90vh] flex items-center overflow-hidden">
        {/* Globe Background */}
        <div className="absolute inset-0 z-0 flex justify-end items-center pointer-events-auto opacity-80 dark:opacity-40 translate-x-1/4 overflow-hidden">
          <HeroGlobe />
        </div>

        {/* Ambient Blur Effects */}
        <div className="absolute inset-0 overflow-hidden z-0 pointer-events-none">
          <div className="absolute top-1/4 -left-32 w-96 h-96 bg-civic-500/20 rounded-full blur-[120px]" />
          <div className="absolute top-1/3 right-0 w-80 h-80 bg-teal-500/15 rounded-full blur-[100px]" />
          <div className="absolute bottom-1/4 left-1/3 w-72 h-72 bg-ocean-500/10 rounded-full blur-[100px]" />
        </div>

        <motion.div style={{ y: heroY, opacity: heroOpacity }} className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 w-full pointer-events-none">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center pointer-events-auto">
            {/* Hero Text */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              <motion.span
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold bg-civic-500/10 text-civic-600 dark:text-civic-400 border border-civic-500/20 mb-6"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-civic-500 animate-pulse" />
                AI-Powered Civic Platform
              </motion.span>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[var(--text-primary)] leading-[1.1] mb-6">
                Smart Waste Reporting for{' '}
                <span className="text-gradient">Cleaner Cities</span>
              </h1>

              <p className="text-lg text-[var(--text-secondary)] leading-relaxed mb-8 max-w-lg">
                Report waste in seconds. AI validates and classifies it. Authorities are notified instantly. 
                Track resolution on a live heatmap. Turn citizen complaints into transparent civic action.
              </p>

              <div className="flex flex-wrap gap-4">
                <Link to="/citizen/report">
                  <Button variant="primary" size="lg" icon={Camera} iconRight={ArrowRight}>
                    Report Waste
                  </Button>
                </Link>
                <Link to="/citizen">
                  <Button variant="outline" size="lg" icon={BarChart3}>
                    Explore Dashboard
                  </Button>
                </Link>
              </div>

              {/* Trust indicators */}
              <div className="mt-10 flex items-center gap-6">
                <div className="flex -space-x-2">
                  {['P', 'A', 'M', 'R', 'S'].map((letter, i) => (
                    <div key={i} className="w-8 h-8 rounded-full bg-gradient-to-br from-civic-400 to-teal-500 flex items-center justify-center text-white text-xs font-bold border-2 border-[var(--bg-primary)]">
                      {letter}
                    </div>
                  ))}
                </div>
                <div>
                  <div className="flex items-center gap-1 mb-0.5">
                    {[1,2,3,4,5].map(i => <Star key={i} size={12} className="fill-warning-400 text-warning-400" />)}
                  </div>
                  <p className="text-xs text-[var(--text-tertiary)]">Trusted by 8,000+ citizens</p>
                </div>
              </div>
            </motion.div>

            {/* Terminal Loader */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            >
              <TerminalLoader />
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* ===== PROBLEM ===== */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[var(--bg-secondary)]">
        <div className="max-w-7xl mx-auto">
          <SectionHeading
            tag="The Problem"
            title="Cities Struggle with Waste Accountability"
            description="Overflowing bins, illegal dumping, slow municipal response — citizens report, nothing happens. CivicLens changes that with AI-driven verification and transparent tracking."
          />
          <div className="grid md:grid-cols-3 gap-6 mt-8">
            {[
              { stat: '62%', label: 'of waste complaints go unresolved', icon: '😟' },
              { stat: '3.5 days', label: 'average wait for cleanup response', icon: '⏳' },
              { stat: '0%', label: 'of citizens can track complaint status', icon: '🔍' },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="glass-card p-6 text-center"
              >
                <span className="text-3xl mb-3 block">{item.icon}</span>
                <p className="text-3xl font-bold text-[var(--text-primary)] mb-2">{item.stat}</p>
                <p className="text-sm text-[var(--text-secondary)]">{item.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== HOW IT WORKS ===== */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <SectionHeading
            tag="How It Works"
            title="From Report to Resolution in 4 Steps"
            description="A seamless end-to-end workflow that turns waste complaints into verified civic action."
          />
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {howItWorks.map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                className="relative"
              >
                <Card className="p-6 text-center h-full">
                  <div className="text-5xl font-black text-civic-500/10 dark:text-civic-400/10 mb-2">{step.step}</div>
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-civic-500 to-teal-500 flex items-center justify-center mx-auto mb-4">
                    <step.icon size={22} className="text-white" />
                  </div>
                  <h3 className="text-lg font-bold text-[var(--text-primary)] mb-2">{step.title}</h3>
                  <p className="text-sm text-[var(--text-secondary)]">{step.desc}</p>
                </Card>
                {i < 3 && (
                  <div className="hidden lg:block absolute top-1/2 -right-3 z-10 text-[var(--text-tertiary)]">
                    <ChevronRight size={20} />
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== FEATURES ===== */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[var(--bg-secondary)]">
        <div className="max-w-7xl mx-auto">
          <SectionHeading
            tag="Features"
            title="Everything You Need for Civic Accountability"
            description="A comprehensive platform that bridges the gap between citizen reporting and municipal action."
          />
          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5"
          >
            {features.map((feature, i) => (
              <motion.div key={i} variants={fadeInUp}>
                <Card className="p-5 h-full group">
                  <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    <feature.icon size={20} className="text-white" />
                  </div>
                  <h3 className="text-base font-bold text-[var(--text-primary)] mb-2">{feature.title}</h3>
                  <p className="text-sm text-[var(--text-secondary)] leading-relaxed">{feature.desc}</p>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ===== STAKEHOLDERS ===== */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <SectionHeading
            tag="Who It's For"
            title="Built for Every Stakeholder"
            description="Role-based experiences designed for citizens, authorities, organizations, and government bodies."
          />
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {stakeholders.map((s, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <Card className="p-6 h-full text-center">
                  <div className={`w-14 h-14 rounded-2xl bg-${s.color}-500/10 flex items-center justify-center mx-auto mb-4`}>
                    <s.icon size={24} className={`text-${s.color}-500`} />
                  </div>
                  <h3 className="text-lg font-bold text-[var(--text-primary)] mb-2">{s.title}</h3>
                  <p className="text-sm text-[var(--text-secondary)]">{s.desc}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== STATS ===== */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-civic-600 to-teal-600 dark:from-navy-800 dark:to-charcoal-800 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMjAiIGN5PSIyMCIgcj0iMSIgZmlsbD0icmdiYSgyNTUsMjU1LDI1NSwwLjA1KSIvPjwvc3ZnPg==')] opacity-50" />
        <div className="relative max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">Impact That Speaks</h2>
            <p className="text-white/70 text-lg">Real numbers from cities using CivicLens</p>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="text-center p-6 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/10"
              >
                <p className="text-3xl sm:text-4xl font-extrabold text-white mb-1">
                  <AnimatedCounter end={stat.value} />{stat.suffix}
                </p>
                <p className="text-sm text-white/70">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== TESTIMONIALS ===== */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <SectionHeading
            tag="Testimonials"
            title="Trusted by Citizens & Officials"
            description="See what people are saying about CivicLens."
          />
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { name: 'Ananya K.', role: 'Citizen, Koramangala', quote: 'I reported illegal dumping near my apartment. Within 18 hours it was cleaned. The before/after photos gave me real confidence.' },
              { name: 'Rajesh M.', role: 'Ward Officer, BBMP', quote: 'CivicLens has cut our average complaint resolution time by 40%. The AI classification saves us hours of manual sorting.' },
              { name: 'Dr. Priya S.', role: 'GreenTech NGO', quote: 'Our cleanup campaigns now have 3x more participation thanks to CivicLens. The impact scoring system really motivates people.' },
            ].map((t, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <Card className="p-6 h-full">
                  <div className="flex items-center gap-1 mb-4">
                    {[1,2,3,4,5].map(s => <Star key={s} size={14} className="fill-warning-400 text-warning-400" />)}
                  </div>
                  <p className="text-sm text-[var(--text-secondary)] leading-relaxed mb-5 italic">"{t.quote}"</p>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-civic-400 to-teal-500 flex items-center justify-center text-white text-sm font-bold">
                      {t.name.charAt(0)}
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-[var(--text-primary)]">{t.name}</p>
                      <p className="text-xs text-[var(--text-tertiary)]">{t.role}</p>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== BOTTOM CTA ===== */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[var(--bg-secondary)]">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-[var(--text-primary)] mb-4">
              Ready to Make Your City Cleaner?
            </h2>
            <p className="text-lg text-[var(--text-secondary)] mb-8">
              Join thousands of citizens already making a difference. Report waste, track progress, and hold authorities accountable.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link to="/signup">
                <Button variant="primary" size="xl" icon={Leaf} iconRight={ArrowRight}>
                  Get Started Free
                </Button>
              </Link>
              <Link to="/features">
                <Button variant="outline" size="xl">
                  Learn More
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </PageWrapper>
  );
}
