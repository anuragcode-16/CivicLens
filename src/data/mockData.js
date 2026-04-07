// Mock data for the CivicLens platform

export const MOCK_REPORTS = [
  { id: 'CLR-2024-001', citizen_id: '1', citizen_name: 'Priya Sharma', ward_id: 'W-14', city_id: 'BLR', image_url: '', category: 'plastic_waste', severity: 'MEDIUM', status: 'pending', description: 'Pile of plastic bags and bottles dumped near park entrance', gps_lat: 12.9716, gps_lng: 77.5946, created_at: '2024-03-15T10:30:00Z', resolved_at: null },
  { id: 'CLR-2024-002', citizen_id: '1', citizen_name: 'Priya Sharma', ward_id: 'W-14', city_id: 'BLR', image_url: '', category: 'wet_waste', severity: 'HIGH', status: 'in-progress', description: 'Rotting food waste dumped along the drainage canal', gps_lat: 12.9756, gps_lng: 77.5906, created_at: '2024-03-14T08:15:00Z', resolved_at: null },
  { id: 'CLR-2024-003', citizen_id: '5', citizen_name: 'Amit Patel', ward_id: 'W-14', city_id: 'BLR', image_url: '', category: 'construction_debris', severity: 'HIGH', status: 'overdue', description: 'Construction rubble blocking the footpath', gps_lat: 12.9686, gps_lng: 77.5976, created_at: '2024-03-10T14:00:00Z', resolved_at: null },
  { id: 'CLR-2024-004', citizen_id: '6', citizen_name: 'Meera Reddy', ward_id: 'W-12', city_id: 'BLR', image_url: '', category: 'e_waste', severity: 'MEDIUM', status: 'resolved', description: 'Old monitors and circuit boards abandoned near bin', gps_lat: 12.9616, gps_lng: 77.6046, created_at: '2024-03-12T11:45:00Z', resolved_at: '2024-03-13T09:30:00Z' },
  { id: 'CLR-2024-005', citizen_id: '7', citizen_name: 'Ravi Kumar', ward_id: 'W-14', city_id: 'BLR', image_url: '', category: 'biomedical_waste', severity: 'CRITICAL', status: 'escalated', description: 'Used syringes found near public garden', gps_lat: 12.9746, gps_lng: 77.5936, created_at: '2024-03-15T06:20:00Z', resolved_at: null },
  { id: 'CLR-2024-006', citizen_id: '1', citizen_name: 'Priya Sharma', ward_id: 'W-14', city_id: 'BLR', image_url: '', category: 'mixed_waste', severity: 'LOW', status: 'resolved', description: 'Small pile of unsorted household trash', gps_lat: 12.9726, gps_lng: 77.5956, created_at: '2024-03-11T16:30:00Z', resolved_at: '2024-03-12T10:00:00Z' },
  { id: 'CLR-2024-007', citizen_id: '8', citizen_name: 'Sunita Devi', ward_id: 'W-16', city_id: 'BLR', image_url: '', category: 'hazardous_waste', severity: 'CRITICAL', status: 'pending', description: 'Chemical containers and paint drums near water body', gps_lat: 12.9666, gps_lng: 77.6006, created_at: '2024-03-15T13:10:00Z', resolved_at: null },
  { id: 'CLR-2024-008', citizen_id: '9', citizen_name: 'Deepak Nair', ward_id: 'W-14', city_id: 'BLR', image_url: '', category: 'dry_waste', severity: 'LOW', status: 'resolved', description: 'Cardboard boxes and newspapers scattered', gps_lat: 12.9736, gps_lng: 77.5966, created_at: '2024-03-09T09:00:00Z', resolved_at: '2024-03-09T15:30:00Z' },
];

export const MOCK_CAMPAIGNS = [
  { id: 'CMP-001', title: 'Ward 14 Spring Cleanup Drive', organizer: 'Koramangala Residents Welfare', description: 'Join us for a community cleanup drive to clear persistent waste hotspots in Ward 14.', location: 'Koramangala, Bangalore', event_date: '2024-04-05T09:00:00Z', max_participants: 50, current_participants: 32, status: 'active', target_waste: 'mixed_waste' },
  { id: 'CMP-002', title: 'E-Waste Collection Marathon', organizer: 'GreenTech NGO', description: 'Bring your old electronics for safe, responsible recycling. Free drop-off for all citizens.', location: 'HSR Layout, Bangalore', event_date: '2024-04-12T10:00:00Z', max_participants: 200, current_participants: 87, status: 'active', target_waste: 'e_waste' },
  { id: 'CMP-003', title: 'Plastic-Free Lake Restoration', organizer: 'Save Lakes Foundation', description: 'Help clean the Bellandur lake periphery from plastic and mixed waste. Gear will be provided.', location: 'Bellandur Lake, Bangalore', event_date: '2024-04-20T07:00:00Z', max_participants: 100, current_participants: 45, status: 'active', target_waste: 'plastic_waste' },
  { id: 'CMP-004', title: 'Composting Workshop & Drive', organizer: 'BBMP Ward 18 Committee', description: 'Learn composting techniques and help set up community composting stations.', location: 'Indiranagar, Bangalore', event_date: '2024-03-28T10:00:00Z', max_participants: 30, current_participants: 30, status: 'closed', target_waste: 'wet_waste' },
];

export const MOCK_FACILITIES = [
  { id: 'FAC-001', type: 'garbage_center', name: 'BBMP Waste Collection Center - Koramangala', address: '4th Block, Koramangala, Bangalore', gps_lat: 12.9352, gps_lng: 77.6245, accepted_waste: ['plastic_waste', 'dry_waste', 'wet_waste', 'mixed_waste'], hours: '6:00 AM - 8:00 PM', distance: 1.2 },
  { id: 'FAC-002', type: 'ewaste_bin', name: 'E-Waste Drop-Off Point - HSR Layout', address: 'Sector 6, HSR Layout, Bangalore', gps_lat: 12.9116, gps_lng: 77.6389, accepted_waste: ['e_waste'], hours: '9:00 AM - 6:00 PM', distance: 2.5 },
  { id: 'FAC-003', type: 'composting_site', name: 'Community Composting Center', address: 'BTM Layout 2nd Stage, Bangalore', gps_lat: 12.9166, gps_lng: 77.6101, accepted_waste: ['wet_waste'], hours: '7:00 AM - 5:00 PM', distance: 1.8 },
  { id: 'FAC-004', type: 'recycling_center', name: 'Green Recycle Hub', address: 'Marathahalli, Bangalore', gps_lat: 12.9591, gps_lng: 77.6974, accepted_waste: ['plastic_waste', 'dry_waste', 'e_waste'], hours: '8:00 AM - 7:00 PM', distance: 4.1 },
  { id: 'FAC-005', type: 'biomedical_handler', name: 'Bio-Safe Medical Waste Facility', address: 'Electronic City, Bangalore', gps_lat: 12.8458, gps_lng: 77.6612, accepted_waste: ['biomedical_waste'], hours: '24/7', distance: 8.3 },
  { id: 'FAC-006', type: 'scrap_shop', name: 'Sri Vinayaka Scrap Dealers', address: 'Jayanagar 4th Block, Bangalore', gps_lat: 12.9259, gps_lng: 77.5837, accepted_waste: ['dry_waste', 'plastic_waste'], hours: '8:00 AM - 8:00 PM', distance: 0.8 },
];

export const MOCK_LEADERBOARD = [
  { rank: 1, name: 'Ananya Krishnan', ward: 'W-14', impact_score: 2850, reports: 47, badge: 'Green Champion' },
  { rank: 2, name: 'Vikram Shetty', ward: 'W-12', impact_score: 2340, reports: 38, badge: 'Active Reporter' },
  { rank: 3, name: 'Lakshmi Menon', ward: 'W-16', impact_score: 1980, reports: 31, badge: 'Active Reporter' },
  { rank: 4, name: 'Priya Sharma', ward: 'W-14', impact_score: 1250, reports: 22, badge: 'Active Reporter' },
  { rank: 5, name: 'Rohit Gupta', ward: 'W-18', impact_score: 1100, reports: 18, badge: 'Reporter' },
];

export const WASTE_CATEGORIES = {
  plastic_waste: { label: 'Plastic Waste', icon: '♻️', color: 'ocean', department: 'Solid Waste Management' },
  dry_waste: { label: 'Dry Waste', icon: '📦', color: 'warm', department: 'Dry Waste Processing' },
  wet_waste: { label: 'Wet Waste', icon: '🍂', color: 'civic', department: 'Composting / Wet Processing' },
  construction_debris: { label: 'Construction Debris', icon: '🧱', color: 'warm', department: 'PWD / Debris Removal' },
  biomedical_waste: { label: 'Biomedical Waste', icon: '⚠️', color: 'danger', department: 'Healthcare Waste Handler' },
  hazardous_waste: { label: 'Hazardous Waste', icon: '☢️', color: 'danger', department: 'KSPCB / Hazardous Cell' },
  e_waste: { label: 'E-Waste', icon: '💻', color: 'ocean', department: 'E-Waste Recycler' },
  mixed_waste: { label: 'Mixed Waste', icon: '🗑️', color: 'teal', department: 'SWM General' },
  domestic_waste: { label: 'Domestic Waste', icon: '🏠', color: 'blush', department: 'Door-to-door SWM' },
};

export const MOCK_ANALYTICS = {
  totalReports: 12847,
  resolvedReports: 10215,
  activeUsers: 8432,
  activeCampaigns: 24,
  avgResolutionHours: 18.5,
  falseReportRate: 3.2,
  categoryDistribution: [
    { name: 'Plastic', value: 3200, color: '#3b82f6' },
    { name: 'Wet', value: 2800, color: '#22c55e' },
    { name: 'Dry', value: 2100, color: '#f97316' },
    { name: 'Construction', value: 1500, color: '#eab308' },
    { name: 'Mixed', value: 1200, color: '#14b8a6' },
    { name: 'E-Waste', value: 900, color: '#8b5cf6' },
    { name: 'Hazardous', value: 600, color: '#ef4444' },
    { name: 'Biomedical', value: 547, color: '#ec4899' },
  ],
  weeklyTrend: [
    { week: 'W1', reports: 280, resolved: 245 },
    { week: 'W2', reports: 310, resolved: 290 },
    { week: 'W3', reports: 350, resolved: 320 },
    { week: 'W4', reports: 290, resolved: 275 },
    { week: 'W5', reports: 380, resolved: 340 },
    { week: 'W6', reports: 420, resolved: 380 },
    { week: 'W7', reports: 395, resolved: 370 },
    { week: 'W8', reports: 450, resolved: 410 },
  ],
  topWards: [
    { ward: 'Ward 14', reports: 1240, resolved: 1050, rate: 84.7 },
    { ward: 'Ward 12', reports: 980, resolved: 870, rate: 88.8 },
    { ward: 'Ward 16', reports: 850, resolved: 720, rate: 84.7 },
    { ward: 'Ward 18', reports: 720, resolved: 650, rate: 90.3 },
    { ward: 'Ward 22', reports: 680, resolved: 580, rate: 85.3 },
  ],
};
