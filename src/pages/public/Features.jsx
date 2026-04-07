import PageWrapper from '@/components/layout/PageWrapper';
import Card from '@/components/common/Card';
import { motion } from 'framer-motion';
import { Camera, Shield, MapPin, BarChart3, Bot, Megaphone, Recycle, Award, Users, Bell, Truck, BookOpen, Globe, Zap, Lock, Building2, ArrowRight, Leaf } from 'lucide-react';
import Button from '@/components/common/Button';
import { Link } from 'react-router-dom';

const allFeatures = [
  { icon: Camera, title: 'Smart Waste Reporting', desc: 'Capture waste with your camera, auto-tag GPS location, and file verified reports in seconds. The entire process from photo to submission takes less than 30 seconds.', color: 'from-civic-500 to-teal-500' },
  { icon: Bot, title: 'AI Image Validation', desc: 'Gemini 1.5 Flash analyzes every uploaded image to detect waste, classify categories, and assess severity — preventing false reports and ensuring quality.', color: 'from-ocean-500 to-civic-500' },
  { icon: Shield, title: 'Before & After Verification', desc: 'Authorities must upload resolution photos to prove cleanup. Citizens see both before and after images for transparent accountability.', color: 'from-teal-500 to-ocean-500' },
  { icon: MapPin, title: 'Live Cleanliness Heatmap', desc: 'A real-time interactive map showing waste report density. Red zones for unresolved areas, green for clean — visible to everyone.', color: 'from-danger-500 to-warm-500' },
  { icon: BarChart3, title: 'Ward-Level Analytics', desc: 'Deep analytics: complaint volumes, category distribution, resolution times, seasonal trends, and persistent hotspot identification.', color: 'from-ocean-500 to-ocean-600' },
  { icon: Megaphone, title: 'Cleanup Campaigns', desc: 'NGOs and government bodies can create community cleanup drives. Citizens join, earn impact points, and climb the leaderboard.', color: 'from-warm-500 to-blush-500' },
  { icon: Recycle, title: 'Facility Locator', desc: 'Find the nearest garbage center, e-waste bin, composting site, recycling plant, or biomedical waste handler in your area.', color: 'from-civic-500 to-civic-600' },
  { icon: Award, title: 'Impact Score & Leaderboard', desc: 'Earn civic impact points for reporting, joining campaigns, and contributing to a cleaner city. Public leaderboard at ward and city level.', color: 'from-blush-500 to-warm-500' },
  { icon: Bell, title: 'Real-time Notifications', desc: 'Push notifications for report status changes, campaign invites, resolution confirmations, and escalation alerts via Socket.io.', color: 'from-ocean-400 to-ocean-500' },
  { icon: Truck, title: 'Bulk Pickup Scheduling', desc: 'Schedule pickups for furniture, construction debris, or medical waste. Choose your time slot and get confirmation.', color: 'from-teal-500 to-teal-600' },
  { icon: Zap, title: 'Auto-Escalation', desc: 'Reports unresolved after 48 hours are automatically escalated to higher authorities. 96h+ goes to commissioner level.', color: 'from-warm-500 to-danger-500' },
  { icon: BookOpen, title: 'Segregation Guides', desc: 'Interactive waste segregation education: what goes in which bin, how to prepare items, and common mistakes to avoid.', color: 'from-civic-400 to-teal-400' },
  { icon: Globe, title: 'Multilingual Support', desc: 'Full Hindi and regional language support. The AI assistant responds in the user\'s language automatically.', color: 'from-ocean-500 to-teal-500' },
  { icon: Lock, title: 'Role-Based Access', desc: 'Distinct experiences for citizens, municipal authorities, organizations, and platform administrators — each with tailored dashboards.', color: 'from-charcoal-700 to-navy-800' },
  { icon: Users, title: 'Green Champions Program', desc: 'Top-performing citizens earn Green Champion status with extended dashboard access and community recognition.', color: 'from-civic-500 to-civic-600' },
  { icon: Building2, title: 'Organization Accounts', desc: 'Apartments, offices, and restaurants get bulk waste compliance tracking, segregation audits, and incentive programs.', color: 'from-teal-600 to-ocean-600' },
];

export default function Features() {
  return (
    <PageWrapper>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-civic-500/10 text-civic-600 dark:text-civic-400 mb-4">
            <Leaf size={12} /> Platform Features
          </span>
          <h1 className="text-4xl font-bold text-[var(--text-primary)] mb-4">Everything You Need for Civic Accountability</h1>
          <p className="text-lg text-[var(--text-secondary)]">A comprehensive platform that bridges the gap between citizen reporting and municipal action.</p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {allFeatures.map((feature, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.03 }}>
              <Card className="p-5 h-full group">
                <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  <feature.icon size={20} className="text-white" />
                </div>
                <h3 className="text-sm font-bold text-[var(--text-primary)] mb-2">{feature.title}</h3>
                <p className="text-xs text-[var(--text-secondary)] leading-relaxed">{feature.desc}</p>
              </Card>
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-16">
          <Link to="/signup"><Button variant="primary" size="xl" icon={Leaf} iconRight={ArrowRight}>Get Started Free</Button></Link>
        </div>
      </div>
    </PageWrapper>
  );
}
