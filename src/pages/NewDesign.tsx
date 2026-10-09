import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';

const ROOM_TYPES = [
  { id: 'Living Room', key: 'catLivingRoom' },
  { id: 'Bedroom', key: 'catBedroom' },
  { id: 'Kitchen', key: 'catKitchen' },
  { id: 'Dining Room', key: 'catDiningRoom' },
  { id: 'Office', key: 'catOffice' },
];

const STYLES = [
  { id: 'Modern', key: 'styleModern' },
  { id: 'Minimal', key: 'styleMinimal' },
  { id: 'Scandinavian', key: 'styleScandinavian' },
  { id: 'Contemporary', key: 'styleContemporary' },
  { id: 'Japandi', key: 'styleJapandi' },
];

export default function NewDesign() {
  const { state, dispatch, t } = useApp();
  const navigate = useNavigate();
  const p = state.project;

  return (
    <>
      <h1 className="page-title">{t('createSpaceTitle')}</h1>
      <p className="page-sub">{t('createSpaceSub')}</p>

      <div className="card" style={{ padding: '1.5rem', maxWidth: 720 }}>
        <div style={{ display: 'grid', gap: '1.1rem' }}>
          <div className="field">
            <label htmlFor="pname">{t('projectNameLabel')}</label>
            <input
              id="pname"
              value={p.name}
              onChange={(e) =>
                dispatch({ type: 'SET_PROJECT', project: { name: e.target.value } })
              }
              placeholder={t('projectNamePlaceholder')}
            />
          </div>

          <div className="field">
            <label>{t('roomTypeLabel')}</label>
            <div className="prompt-chips">
              {ROOM_TYPES.map(({ id, key }) => (
                <button
                  key={id}
                  type="button"
                  className={`chip${p.roomType === id ? ' active' : ''}`}
                  onClick={() =>
                    dispatch({ type: 'SET_PROJECT', project: { roomType: id } })
                  }
                >
                  {t(key)}
                </button>
              ))}
            </div>
          </div>

          <div className="field">
            <label>{t('designStyleLabel')}</label>
            <div className="prompt-chips">
              {STYLES.map(({ id, key }) => (
                <button
                  key={id}
                  type="button"
                  className={`chip${p.style === id ? ' active' : ''}`}
                  onClick={() =>
                    dispatch({ type: 'SET_PROJECT', project: { style: id } })
                  }
                >
                  {t(key)}
                </button>
              ))}
            </div>
          </div>

          <div className="field">
            <label htmlFor="budget">{t('budgetCcyLabel')}</label>
            <input
              id="budget"
              type="number"
              min={500}
              value={p.budget}
              onChange={(e) =>
                dispatch({
                  type: 'SET_PROJECT',
                  project: { budget: e.target.value },
                })
              }
            />
          </div>

          <div className="footer-actions" style={{ marginTop: 0 }}>
            <button className="btn btn-ghost" onClick={() => navigate('/dashboard')}>
              {t('cancelBtn')}
            </button>
            <button
              className="btn btn-primary"
              disabled={!p.name.trim()}
              onClick={() => navigate('/room-photos')}
            >
              {t('continueBtn')}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
