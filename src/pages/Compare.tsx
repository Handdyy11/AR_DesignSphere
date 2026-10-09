import { useNavigate } from 'react-router-dom';
import { CheckCircle2, MessageSquare } from 'lucide-react';
import { DESIGN_A_IMAGE, DESIGN_B_IMAGE } from '../data/catalog';
import { useApp } from '../context/AppContext';

const ROWS = [
  { label: 'Furniture', a: 'Luna sofa + oak table', b: 'Nordic sofa + marble side' },
  { label: 'Layout', a: 'Conversation cluster', b: 'Open walkway focus' },
  { label: 'Colors', a: 'Sand Beige · Olive', b: 'Grey · White' },
  { label: 'Materials', a: 'Linen · Oak', b: 'Bouclé · Marble' },
  { label: 'Space Usage', a: '78% efficient', b: '84% efficient' },
  { label: 'Cost', a: '₹1,14,200', b: '₹98,600' },
];

export default function Compare() {
  const { state, dispatch, t } = useApp();
  const navigate = useNavigate();

  return (
    <>
      <h1 className="page-title">{t('compareTitle')}</h1>
      <p className="page-sub">{t('compareSub')}</p>

      <div className="compare-grid">
        <article className="card compare-card">
          <img src={DESIGN_A_IMAGE} alt="Design A recommended living room" />
          <div className="body">
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                gap: '0.5rem',
                marginBottom: '0.5rem',
              }}
            >
              <h3>{t('designA')}</h3>
              <span className="badge badge-teal">{t('recommendedTag')}</span>
            </div>
            <p style={{ color: 'var(--secondary)', fontSize: 'var(--fs-sm)' }}>
              {t('Warm modern scheme aligned with your living-room brief and current budget.')}
            </p>
          </div>
        </article>

        <article className="card compare-card">
          <img src={DESIGN_B_IMAGE} alt="Design B alternative living room" />
          <div className="body">
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                gap: '0.5rem',
                marginBottom: '0.5rem',
              }}
            >
              <h3>{t('designB')}</h3>
              <span className="badge">{t('alternativeTag')}</span>
            </div>
            <p style={{ color: 'var(--secondary)', fontSize: 'var(--fs-sm)' }}>
              {t('Cooler palette with leaner spend — strong if you prioritize open circulation.')}
            </p>
          </div>
        </article>
      </div>

      <div className="card" style={{ overflow: 'hidden', marginBottom: '1.15rem' }}>
        <div className="panel-head">{t('budgetComparison')}</div>
        <table className="compare-table">
          <thead>
            <tr>
              <th>{t('aspectHeader')}</th>
              <th>{t('designA')}</th>
              <th>{t('designB')}</th>
            </tr>
          </thead>
          <tbody>
            {ROWS.map((row) => (
              <tr key={row.label}>
                <td>{t(row.label)}</td>
                <td>{t(row.a)}</td>
                <td>{t(row.b)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="card" style={{ padding: '1.15rem 1.25rem' }}>
        <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
          <div className="avatar" style={{ background: '#3d6b8c' }}>
            AM
          </div>
          <div style={{ flex: 1 }}>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.45rem',
                marginBottom: '0.35rem',
              }}
            >
              <strong>Arjun Mehta</strong>
              <span className="badge">{t('designerRole')}</span>
              <MessageSquare size={14} color="var(--secondary)" />
            </div>
            <p style={{ color: 'var(--secondary)', fontSize: 'var(--fs-sm)' }}>
              {t('I recommend Design A for Riya’s evening-use living room. The sand beige sofa and olive accents feel intentional without exceeding the ₹1.25L envelope.')}
            </p>
          </div>
        </div>

        <div className="footer-actions">
          <button
            className="btn btn-danger"
            onClick={() => dispatch({ type: 'REQUEST_CHANGES' })}
          >
            {t('requestChangesBtn')}
          </button>
          <button
            className="btn btn-primary"
            onClick={() => dispatch({ type: 'APPROVE_DESIGN' })}
          >
            {t('approveFinalBtn')}
          </button>
        </div>
      </div>

      {state.designApproved && (
        <div className="approval-banner">
          <div>
            <h3>
              <CheckCircle2
                size={22}
                style={{ verticalAlign: 'middle', marginRight: 8 }}
                color="var(--success)"
              />
              {t('designApprovedTitle')}
            </h3>
            <p>{t('readyHandoff')}</p>
          </div>
          <button
            className="btn btn-dark"
            onClick={() => navigate('/settings')}
          >
            {t('continueSettingsBtn')}
          </button>
        </div>
      )}

      {state.saveToast && !state.designApproved && null}
    </>
  );
}
