import './ProjectSelector.css';

function ProjectSelector({ projects, selectedProjectId, onSelectProject }) {
  return (
    <div className="project-selector">
      <div className="project-selector-header">
        <span className="project-selector-label">Projects</span>
      </div>
      <ul className="project-list">
        {projects.map((project) => (
          <li
            key={project.id}
            className={`project-item ${project.id === selectedProjectId ? 'project-item-selected' : ''}`}
            onClick={() => onSelectProject(project.id)}
          >
            <div className="project-item-info">
              <span className="project-item-name">{project.name}</span>
              <span className="project-item-domain">{project.domain}</span>
            </div>
            <span className={`project-type-badge ${project.type === 'backend' ? 'ptb-backend' : 'ptb-static'}`}>
              {project.type === 'backend' ? 'API' : 'Static'}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ProjectSelector;
