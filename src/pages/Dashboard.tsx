import { useNavigate } from 'react-router-dom';
import { Plus } from 'lucide-react';
import { PROJECT_CARDS } from '../data/catalog';
import { useApp } from '../context/AppContext';

export default function Dashboard() {
  const { state, t } = useApp();
  const navigate = useNavigate();
  const name = state.user?.name ?? 'Riya Sharma';

  return (
    <>
      <h1 className="page-title">{t('welcomeUser')} {name}</h1>
      <p className="page-sub">{t('dashboardSub')}</p>

      <div className="grid-stats">
        <div className="card stat-card">
          <span>{t('totalProjects')}</span>
          <strong>08</strong>
          <em>{t('+2 this month')}</em>
        </div>
        <div className="card stat-card">
          <span>{t('designsInProgress')}</span>
          <strong>03</strong>
          <em>{t('1 awaiting review')}</em>
        </div>
        <div className="card stat-card">
          <span>{t('activeCollab')}</span>
          <strong>02</strong>
          <em>{t('Live with Arjun')}</em>
        </div>
        <div className="card stat-card">
          <span>{t('approvedDesign')}</span>
          <strong>01</strong>
          <em>{t('Ready for handoff')}</em>
        </div>
      </div>

      <div className="section-head" id="projects">
        <h2>{t('yourProjects')}</h2>
        <button
          className="btn btn-primary"
          onClick={() => navigate('/new-design')}
        >
          <Plus size={16} /> {t('createNewDesign')}
        </button>
      </div>

      <div className="project-grid">
        {PROJECT_CARDS.map((p) => (
          <article key={p.id} className="card project-card">
            <div className="project-card-media">
              <img src={p.image} alt={t(p.name)} />
            </div>
            <div className="project-card-body">
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  gap: '0.5rem',
                  marginBottom: '0.35rem',
                }}
              >
                <h3>{t(p.name)}</h3>
                <span
                  className={`badge ${
                    p.status === 'Approved'
                      ? 'badge-success'
                      : p.status === 'Collaboration'
                        ? 'badge-warn'
                        : 'badge-teal'
                  }`}
                >
                  {t(p.status)}
                </span>
              </div>
              <div className="meta-row">
                <span>{t('Budget')} {p.budget}</span>
                <span>{t(p.size)}</span>
                <span>{p.progress}%</span>
              </div>
              <div className="progress">
                <span style={{ width: `${p.progress}%` }} />
              </div>
              <button
                className="btn btn-secondary"
                style={{ width: '100%' }}
                onClick={() => navigate('/editor')}
              >
                {t('openProject')}
              </button>
            </div>
          </article>
        ))}
      </div>
    </>
  );
}
