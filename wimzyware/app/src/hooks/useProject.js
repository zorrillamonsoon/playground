import { useState, useMemo } from 'react';
import { mockProjects } from '../data/mockProjects';
import { mockChangeRequests } from '../data/mockChangeRequests';

/**
 * Custom hook for managing project state.
 * Future: Will integrate with projectService for real API calls.
 */
export function useProject(initialProjectId = null) {
  const [selectedProjectId, setSelectedProjectId] = useState(
    initialProjectId || mockProjects[0]?.id || null
  );

  const projects = mockProjects;

  const selectedProject = useMemo(
    () => projects.find(p => p.id === selectedProjectId) || null,
    [projects, selectedProjectId]
  );

  const changeRequests = useMemo(
    () => mockChangeRequests.filter(cr => cr.projectId === selectedProjectId),
    [selectedProjectId]
  );

  const selectProject = (projectId) => {
    setSelectedProjectId(projectId);
  };

  return {
    projects,
    selectedProject,
    selectedProjectId,
    selectProject,
    changeRequests,
  };
}
