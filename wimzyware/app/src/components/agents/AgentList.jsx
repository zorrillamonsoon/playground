import './AgentList.css';

function AgentList({ agents, selectedAgentId, onSelectAgent, projectType }) {
  return (
    <div className="agent-list">
      <div className="agent-list-header">
        <span className="agent-list-label">Agents</span>
      </div>
      <ul className="agent-items">
        {agents.map((agent) => {
          const isDisabled = projectType === 'static' && !agent.availableForStatic;
          return (
            <li
              key={agent.id}
              className={`agent-item ${agent.id === selectedAgentId ? 'agent-item-selected' : ''} ${isDisabled ? 'agent-item-disabled' : ''}`}
              onClick={() => !isDisabled && onSelectAgent(agent.id)}
              title={isDisabled ? `${agent.name} is not available for static sites` : agent.description}
            >
              <span className="agent-item-icon">{agent.icon}</span>
              <div className="agent-item-info">
                <span className="agent-item-name">{agent.name}</span>
                {isDisabled && (
                  <span className="agent-item-unavailable">Backend only</span>
                )}
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default AgentList;
