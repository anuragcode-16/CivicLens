import PageWrapper from '@/components/layout/PageWrapper';
import Card from '@/components/common/Card';
import { MapPin } from 'lucide-react';

export default function Heatmap() {
  return (
    <PageWrapper>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-[var(--text-primary)] mb-1">Live Cleanliness Heatmap</h1>
        <p className="text-[var(--text-secondary)]">Real-time waste report density across your city</p>
      </div>
      <Card className="p-4 overflow-hidden mb-6">
        <div className="h-[60vh] min-h-[400px] rounded-xl bg-gradient-to-br from-civic-500/5 to-ocean-500/5 dark:from-navy-700 dark:to-charcoal-700 flex items-center justify-center relative">
          <div className="text-center">
            <MapPin size={48} className="text-civic-500 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-2">Interactive Heatmap</h3>
            <p className="text-sm text-[var(--text-secondary)] max-w-sm">Full Leaflet/Google Maps heatmap integration with ward overlays, marker clusters, and real-time report data.</p>
          </div>
          {/* Legend */}
          <div className="absolute bottom-4 left-4 glass-card p-3 rounded-xl">
            <p className="text-xs font-semibold text-[var(--text-primary)] mb-2">Heatmap Legend</p>
            <div className="space-y-1.5">
              {[
                { color: 'bg-danger-500', label: 'Critical (>80% unresolved)' },
                { color: 'bg-warm-500', label: 'High (50-80%)' },
                { color: 'bg-warning-400', label: 'Medium (20-50%)' },
                { color: 'bg-civic-500', label: 'Clean (<20%)' },
                { color: 'bg-gray-400', label: 'No data' },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-2">
                  <div className={`w-3 h-3 rounded-full ${item.color}`} />
                  <span className="text-[10px] text-[var(--text-secondary)]">{item.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Card>
    </PageWrapper>
  );
}
