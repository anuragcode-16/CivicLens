import { useState } from 'react';
import PageWrapper from '@/components/layout/PageWrapper';
import Card from '@/components/common/Card';
import Button from '@/components/common/Button';
import Input from '@/components/common/Input';
import { TextArea } from '@/components/common/Input';
import { Mail, Phone, MapPin, Send, MessageSquare, CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);
  return (
    <PageWrapper>
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h1 className="text-4xl font-bold text-[var(--text-primary)] mb-4">Contact Us</h1>
          <p className="text-lg text-[var(--text-secondary)]">Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.</p>
        </div>
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="space-y-4">
            {[
              { icon: Mail, title: 'Email', text: 'support@civiclens.in' },
              { icon: Phone, title: 'Phone', text: '+91 80 1234 5678' },
              { icon: MapPin, title: 'Office', text: 'Koramangala, Bangalore, India' },
            ].map((c, i) => (
              <Card key={i} className="p-4 flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-civic-500/10 flex items-center justify-center"><c.icon size={18} className="text-civic-500" /></div>
                <div><p className="text-xs text-[var(--text-tertiary)]">{c.title}</p><p className="text-sm font-medium text-[var(--text-primary)]">{c.text}</p></div>
              </Card>
            ))}
          </div>
          <div className="lg:col-span-2">
            {submitted ? (
              <Card className="p-8 text-center">
                <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring' }}>
                  <CheckCircle size={48} className="text-civic-500 mx-auto mb-4" />
                </motion.div>
                <h3 className="text-xl font-bold text-[var(--text-primary)] mb-2">Message Sent!</h3>
                <p className="text-[var(--text-secondary)]">We'll get back to you within 24 hours.</p>
              </Card>
            ) : (
              <Card className="p-6">
                <form onSubmit={e => { e.preventDefault(); setSubmitted(true); }} className="space-y-4">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <Input label="Name" placeholder="Your name" required />
                    <Input label="Email" type="email" placeholder="you@example.com" required />
                  </div>
                  <Input label="Subject" placeholder="How can we help?" required />
                  <TextArea label="Message" placeholder="Tell us more..." />
                  <Button type="submit" variant="primary" size="lg" icon={Send} className="w-full">Send Message</Button>
                </form>
              </Card>
            )}
          </div>
        </div>
      </div>
    </PageWrapper>
  );
}
