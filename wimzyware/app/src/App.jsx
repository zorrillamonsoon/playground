import { useProject } from './hooks/useProject';
import { useAgent } from './hooks/useAgent';
import DashboardShell from './components/layout/DashboardShell';
import './App.css';

function App() {
  const {
    projects,
    selectedProject,
    selectedProjectId,
    selectProject,
    changeRequests,
  } = useProject();

  const {
    agents,
    selectedAgent,
    selectedAgentId,
    selectAgent,
    conversation,
  } = useAgent();

  return (
    <DashboardShell
      projects={projects}
      selectedProject={selectedProject}
      selectedProjectId={selectedProjectId}
      onSelectProject={selectProject}
      agents={agents}
      selectedAgent={selectedAgent}
      selectedAgentId={selectedAgentId}
      onSelectAgent={selectAgent}
      conversation={conversation}
      changeRequests={changeRequests}
    />
  );
}

export default App;
