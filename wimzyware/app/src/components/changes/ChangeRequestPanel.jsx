import { useState } from 'react';
import StagingPanel from '../staging/StagingPanel';
import './ChangeRequestPanel.css';

const STATUS_CONFIG = {
  'draft': { label: 'Draft', className: 'status-draft' },
  'in-review': { label: 'In Review', className: 'status-in-review' },
  'staging': { label: 'Staging', className: 'status-staging' },
  'approved': { label: 'Approved', className: 'status-approved' },
  'deployed': { label: 'Deployed', className: 'status-deployed' },
};

function ChangeRequestPanel({ changeRequests, agents, selectedProject }) {
  const [selectedCRId, setSelectedCRId] = useState(null);

  const selectedCR = changeRequests.find(cr => cr.id === selectedCRId);

  const getAgentName = (agentId) => {
    const agent = agents.find(a => a.id === agentId);
    return agent ? `${agent.icon} ${agent.name}` : agentId;
  };

  if (selectedCR) {
    return (
      <StagingPanel
        changeRequest={selectedCR}
        agents={agents}
        selectedProject={selectedProject}
        onBack={() => setSelectedCRId(null)}
      />
    );
  }

  return (
    <div className="change-request-panel">
      <div className="crp-header">
        <h2 className="crp-title">Change Requests</h2>
        <span className="crp-count">{changeRequests.length} total</span>
      </div>

      {changeRequests.length === 0 && (
        <div className="crp-empty">
          <div className="crp-empty-icon">📋</div>
          <p className="crp-empty-title">No change requests yet</p>
          <p className="crp-empty-desc">Chat with an agent to create your first change request.</p>
        </div>
      )}

      <div className="crp-list">
        {changeRequests.map((cr) => {
          const statusConf = STATUS_CONFIG[cr.status] || { label: cr.status, className: '' };
          return (
            <div
              key={cr.id}
              className={`crp-card ${cr.id === selectedCRId ? 'crp-card-selected' : ''}`}
              onClick={() => setSelectedCRId(cr.id)}
            >
              <div className="crp-card-top">
                <h3 className="crp-card-title">{cr.title}</h3>
                <span className={`crp-status-badge ${statusConf.className}`}>
                  {statusConf.label}
                </span>
              </div>
              <div className="crp-card-meta">
                <span className="crp-card-agent">{getAgentName(cr.agentId)}</span>
                <span className="crp-card-separator">|</span>
                <span className="crp-card-files">{cr.filesChanged.length} file{cr.filesChanged.length !== 1 ? 's' : ''}</span>
                <span className="crp-card-separator">|</span>
                <span className="crp-card-confidence">
                  Confidence: <strong>{cr.confidenceScore}%</strong>
                </span>
              </div>
              <div className="crp-card-bottom">
                {cr.requiresHumanReview && (
                  <span className="crp-review-badge">
                    👁 Human Review Required
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default ChangeRequestPanel;
