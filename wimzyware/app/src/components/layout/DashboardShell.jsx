import Sidebar from './Sidebar';
import MainPanel from './MainPanel';
import ChatPanel from './ChatPanel';
import ProjectSelector from '../projects/ProjectSelector';
import AgentList from '../agents/AgentList';
import ChangeRequestPanel from '../changes/ChangeRequestPanel';
import './DashboardShell.css';

function DashboardShell({
  projects,
  selectedProject,
  selectedProjectId,
  onSelectProject,
  agents,
  selectedAgent,
  selectedAgentId,
  onSelectAgent,
  conversation,
  changeRequests,
}) {
  return (
    <div className="dashboard-shell">
      <Sidebar>
        <ProjectSelector
          projects={projects}
          selectedProjectId={selectedProjectId}
          onSelectProject={onSelectProject}
        />
        <AgentList
          agents={agents}
          selectedAgentId={selectedAgentId}
          onSelectAgent={onSelectAgent}
          projectType={selectedProject?.type || 'static'}
        />
      </Sidebar>

      <MainPanel selectedProject={selectedProject}>
        <ChangeRequestPanel
          changeRequests={changeRequests}
          agents={agents}
          selectedProject={selectedProject}
        />
      </MainPanel>

      <ChatPanel
        selectedAgent={selectedAgent}
        conversation={conversation}
      />
    </div>
  );
}

export default DashboardShell;
