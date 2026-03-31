export const mockChangeRequests = [
  { id: 'cr-1', projectId: 'proj-1', title: 'Update hero banner image', status: 'deployed', agentId: 'design', confidenceScore: 95, requiresHumanReview: false, filesChanged: ['index.html', 'assets/hero.jpg', 'styles.css'] },
  { id: 'cr-2', projectId: 'proj-1', title: 'Rewrite About page copy', status: 'staging', agentId: 'copywriting', confidenceScore: 88, requiresHumanReview: true, filesChanged: ['about.html'] },
  { id: 'cr-3', projectId: 'proj-2', title: 'Add user authentication flow', status: 'in-review', agentId: 'backend', confidenceScore: 72, requiresHumanReview: true, filesChanged: ['src/auth/login.js', 'src/auth/register.js', 'src/middleware/auth.js', 'src/routes/auth.js'] },
  { id: 'cr-4', projectId: 'proj-2', title: 'Redesign dashboard cards', status: 'draft', agentId: 'frontend', confidenceScore: 91, requiresHumanReview: false, filesChanged: ['src/components/DashboardCard.jsx', 'src/styles/dashboard.css'] },
  { id: 'cr-5', projectId: 'proj-3', title: 'Add SEO metadata', status: 'approved', agentId: 'seo', confidenceScore: 97, requiresHumanReview: false, filesChanged: ['index.html', 'projects.html'] },
  { id: 'cr-6', projectId: 'proj-4', title: 'Create REST API endpoints', status: 'in-review', agentId: 'backend', confidenceScore: 68, requiresHumanReview: true, filesChanged: ['src/routes/patients.js', 'src/routes/appointments.js', 'src/models/patient.js', 'src/middleware/validate.js'] },
];
