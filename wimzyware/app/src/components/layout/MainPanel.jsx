import './MainPanel.css';

function MainPanel({ selectedProject, children }) {
  const typeBadgeClass = selectedProject?.type === 'backend' ? 'badge-backend' : 'badge-static';
  const planLabel = {
    'pro-review': 'Pro Review',
    'cowboy': 'Cowboy Mode',
    'ai-only': 'AI Only',
  };

  return (
    <main className="main-panel">
      <header className="main-panel-header">
        <div className="main-panel-header-left">
          <h1 className="main-panel-title">
            {selectedProject?.name || 'No Project Selected'}
          </h1>
          {selectedProject && (
            <div className="main-panel-badges">
              <span className={`type-badge ${typeBadgeClass}`}>
                {selectedProject.type === 'backend' ? 'Backend App' : 'Static Site'}
              </span>
              <span className="plan-badge">
                {planLabel[selectedProject.plan] || selectedProject.plan}
              </span>
            </div>
          )}
        </div>
        {selectedProject && (
          <div className="main-panel-header-right">
            <span className="domain-label">{selectedProject.domain}</span>
            <span className="status-dot active" />
          </div>
        )}
      </header>
      <div className="main-panel-content">
        {children}
      </div>
    </main>
  );
}

export default MainPanel;
