// Future integration points:
// - Amazon DynamoDB for project data persistence
// - API Gateway for REST endpoints
// - S3 for static site hosting and asset storage
// - CloudFront for CDN distribution
// - Lambda for serverless compute

import { mockProjects } from '../data/mockProjects';
import { mockChangeRequests } from '../data/mockChangeRequests';

export const projectService = {
  async getProjects() {
    // TODO: Replace with API Gateway call -> DynamoDB
    // GET /api/projects
    await new Promise(resolve => setTimeout(resolve, 100));
    return mockProjects;
  },

  async getProject(projectId) {
    // TODO: Replace with API Gateway call -> DynamoDB
    // GET /api/projects/:id
    await new Promise(resolve => setTimeout(resolve, 100));
    return mockProjects.find(p => p.id === projectId) || null;
  },

  async getChangeRequests(projectId) {
    // TODO: Replace with API Gateway call -> DynamoDB
    // GET /api/projects/:id/change-requests
    await new Promise(resolve => setTimeout(resolve, 100));
    return mockChangeRequests.filter(cr => cr.projectId === projectId);
  },

  async updateChangeRequestStatus(changeRequestId, newStatus) {
    // TODO: Replace with API Gateway call -> Lambda -> DynamoDB
    // PATCH /api/change-requests/:id
    await new Promise(resolve => setTimeout(resolve, 200));
    return { id: changeRequestId, status: newStatus };
  },

  async deployChangeRequest(changeRequestId) {
    // TODO: Replace with API Gateway call -> Lambda -> S3/CloudFront
    // POST /api/change-requests/:id/deploy
    await new Promise(resolve => setTimeout(resolve, 500));
    return { id: changeRequestId, status: 'deployed', deployedAt: new Date().toISOString() };
  },
};
