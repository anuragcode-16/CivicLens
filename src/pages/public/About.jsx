import PageWrapper from '@/components/layout/PageWrapper';
import Card from '@/components/common/Card';
import { motion } from 'framer-motion';
import { Leaf, Globe, Shield, Users, Target, Heart } from 'lucide-react';

const values = [
  { icon: Shield, title: 'Transparency', desc: 'Every report, action, and resolution is publicly visible. No hidden processes.' },
  { icon: Users, title: 'Community', desc: 'Built for collaboration between citizens, authorities, NGOs, and organizations.' },
  { icon: Target, title: 'Accountability', desc: 'Time-bound resolution with automatic escalation ensures no complaint is ignored.' },
  { icon: Globe, title: 'Accessibility', desc: 'Multilingual support, mobile-first design, and inclusive experiences for all users.' },
  { icon: Heart, title: 'Civic Impact', desc: 'Every action contributes to measurable impact on city cleanliness and quality of life.' },
  { icon: Leaf, title: 'Sustainability', desc: 'Promoting waste segregation, recycling, and composting for a greener future.' },
];

export default function About() {
  return (
    <PageWrapper>
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h1 className="text-4xl font-bold text-[var(--text-primary)] mb-4">About CivicLens</h1>
          <p className="text-lg text-[var(--text-secondary)] leading-relaxed">
            CivicLens is a crowdsourced smart waste reporting and civic accountability platform that connects citizens who report waste with municipal authorities who resolve it — making all activity publicly visible in real time.
          </p>
        </div>

        <Card className="p-8 mb-12 bg-gradient-to-r from-civic-500/10 via-teal-500/5 to-ocean-500/10">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-4">Our Mission</h2>
            <p className="text-[var(--text-secondary)] leading-relaxed text-lg">
              To build cleaner cities through verified waste reporting, intelligent classification, public accountability, and community participation. We believe every citizen has the power to drive civic change.
            </p>
          </div>
        </Card>

        <h2 className="text-2xl font-bold text-[var(--text-primary)] text-center mb-8">Our Values</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {values.map((v, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }}>
              <Card className="p-5 h-full text-center">
                <div className="w-12 h-12 rounded-xl bg-civic-500/10 flex items-center justify-center mx-auto mb-4">
                  <v.icon size={22} className="text-civic-500" />
                </div>
                <h3 className="text-base font-bold text-[var(--text-primary)] mb-2">{v.title}</h3>
                <p className="text-sm text-[var(--text-secondary)]">{v.desc}</p>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </PageWrapper>
  );
}
