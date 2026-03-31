import './Sidebar.css';

function Sidebar({ children }) {
  return (
    <aside className="sidebar">
      <div className="sidebar-brand">
        <div className="sidebar-logo">W</div>
        <div className="sidebar-brand-text">
          <span className="sidebar-brand-name">Wimzyware</span>
          <span className="sidebar-brand-tagline">AI Dashboard</span>
        </div>
      </div>
      <div className="sidebar-content">
        {children}
      </div>
    </aside>
  );
}

export default Sidebar;
