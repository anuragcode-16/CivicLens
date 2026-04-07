import PageWrapper from '@/components/layout/PageWrapper';
import Card from '@/components/common/Card';
import Button from '@/components/common/Button';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Camera, Zap, TrendingUp, CheckCircle, ArrowRight, Leaf } from 'lucide-react';

const steps = [
  { step: 1, icon: Camera, title: 'Citizen Reports Waste', points: ['Open CivicLens app or web dashboard', 'Take a photo of waste spotted in public', 'GPS location is auto-tagged', 'Submit with optional description'], color: 'from-civic-500 to-teal-500' },
  { step: 2, icon: Zap, title: 'AI Validates & Classifies', points: ['Gemini 1.5 Flash analyzes the image', 'Detects waste presence with confidence score', 'Classifies into 9 waste categories', 'Assigns severity: LOW to CRITICAL'], color: 'from-ocean-500 to-civic-500' },
  { step: 3, icon: TrendingUp, title: 'Authority Takes Action', points: ['Report routed to responsible department', 'Ward officer receives push notification', 'Task assigned to cleanup team', 'SLA timer begins (48h max)'], color: 'from-warm-500 to-blush-500' },
  { step: 4, icon: CheckCircle, title: 'Verified Resolution', points: ['Cleanup team completes the work', 'Authority uploads "after" photo', 'Citizen receives before/after confirmation', 'Heatmap turns green, impact score updated'], color: 'from-teal-500 to-civic-500' },
];

export default function HowItWorks() {
  return (
    <PageWrapper>
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-civic-500/10 text-civic-600 dark:text-civic-400 mb-4">
            <Leaf size={12} /> How CivicLens Works
          </span>
          <h1 className="text-4xl font-bold text-[var(--text-primary)] mb-4">From Report to Resolution</h1>
          <p className="text-lg text-[var(--text-secondary)]">A transparent, AI-powered pipeline that turns citizen complaints into verified civic action.</p>
        </div>

        <div className="space-y-8">
          {steps.map((step, i) => (
            <motion.div key={i} initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}>
              <Card className="p-6 sm:p-8">
                <div className={`flex flex-col sm:flex-row gap-6 ${i % 2 === 1 ? 'sm:flex-row-reverse' : ''}`}>
                  <div className="flex-shrink-0">
                    <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${step.color} flex items-center justify-center`}>
                      <step.icon size={28} className="text-white" />
                    </div>
                    <p className="text-4xl font-black text-[var(--text-tertiary)]/20 mt-2">0{step.step}</p>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-[var(--text-primary)] mb-3">{step.title}</h3>
                    <ul className="space-y-2">
                      {step.points.map((point, j) => (
                        <li key={j} className="flex items-start gap-2 text-sm text-[var(--text-secondary)]">
                          <CheckCircle size={14} className="text-civic-500 mt-0.5 flex-shrink-0" />
                          {point}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link to="/signup"><Button variant="primary" size="xl" icon={Leaf} iconRight={ArrowRight}>Start Reporting</Button></Link>
        </div>
      </div>
    </PageWrapper>
  );
}
