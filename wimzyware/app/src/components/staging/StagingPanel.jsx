import './StagingPanel.css';

const STATUS_CONFIG = {
  'draft': { label: 'Draft', className: 'stg-status-draft' },
  'in-review': { label: 'In Review', className: 'stg-status-in-review' },
  'staging': { label: 'Staging', className: 'stg-status-staging' },
  'approved': { label: 'Approved', className: 'stg-status-approved' },
  'deployed': { label: 'Deployed', className: 'stg-status-deployed' },
};

function StagingPanel({ changeRequest, agents, selectedProject, onBack }) {
  const agent = agents.find(a => a.id === changeRequest.agentId);
  const statusConf = STATUS_CONFIG[changeRequest.status] || { label: changeRequest.status, className: '' };
  const planLabel = {
    'pro-review': 'Pro Review',
    'cowboy': 'Cowboy Mode',
    'ai-only': 'AI Only',
  };

  return (
    <div className="staging-panel">
      <button className="stg-back-btn" onClick={onBack}>
        ← Back to Change Requests
      </button>

      <div className="stg-header">
        <div className="stg-header-top">
          <h2 className="stg-title">{changeRequest.title}</h2>
          <span className={`stg-status-badge ${statusConf.className}`}>
            {statusConf.label}
          </span>
        </div>
        <div className="stg-header-meta">
          <span className="stg-agent">
            {agent?.icon} {agent?.name || changeRequest.agentId}
          </span>
          <span className="stg-meta-sep">|</span>
          <span className="stg-project">{selectedProject?.name}</span>
        </div>
      </div>

      {/* Confidence Score */}
      <div className="stg-section">
        <h3 className="stg-section-title">Confidence Score</h3>
        <div className="stg-confidence">
          <div className="stg-confidence-bar">
            <div
              className="stg-confidence-fill"
              style={{ width: `${changeRequest.confidenceScore}%` }}
            />
          </div>
          <span className="stg-confidence-value">{changeRequest.confidenceScore}%</span>
        </div>
      </div>

      {/* Human Review Notice */}
      <div className="stg-section">
        <h3 className="stg-section-title">Review Policy</h3>
        <div className={`stg-review-notice ${changeRequest.requiresHumanReview ? 'stg-review-required' : 'stg-review-auto'}`}>
          {changeRequest.requiresHumanReview ? (
            <>
              <span className="stg-review-icon">👁</span>
              <div className="stg-review-text">
                <strong>Human review required</strong>
                <p>This change must be reviewed and approved before deployment. Project plan: {planLabel[selectedProject?.plan] || selectedProject?.plan}.</p>
              </div>
            </>
          ) : (
            <>
              <span className="stg-review-icon">✅</span>
              <div className="stg-review-text">
                <strong>Auto-approved</strong>
                <p>High confidence score allows automatic deployment under the current plan.</p>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Files Changed */}
      <div className="stg-section">
        <h3 className="stg-section-title">
          Files Changed ({changeRequest.filesChanged.length})
        </h3>
        <ul className="stg-file-list">
          {changeRequest.filesChanged.map((file, idx) => (
            <li key={idx} className="stg-file-item">
              <span className="stg-file-icon">📄</span>
              <span className="stg-file-name">{file}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Preview Link */}
      <div className="stg-section">
        <h3 className="stg-section-title">Staging Preview</h3>
        <div className="stg-preview-link">
          <span className="stg-preview-icon">🔗</span>
          <a href="#" className="stg-preview-url" onClick={(e) => e.preventDefault()}>
            https://staging.wimzyware.dev/{selectedProject?.id}/{changeRequest.id}
          </a>
          <span className="stg-preview-placeholder">(Preview placeholder)</span>
        </div>
      </div>

      {/* Action Buttons */}
      {/* Future: These will trigger Lambda functions to deploy/reject changes */}
      <div className="stg-actions">
        <button className="stg-btn stg-btn-approve" disabled={changeRequest.status === 'deployed'}>
          ✓ Approve & Deploy
        </button>
        <button className="stg-btn stg-btn-reject" disabled={changeRequest.status === 'deployed'}>
          ✕ Reject
        </button>
        <button className="stg-btn stg-btn-secondary">
          Request Changes
        </button>
      </div>
    </div>
  );
}

export default StagingPanel;
