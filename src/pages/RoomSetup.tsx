import { useNavigate } from 'react-router-dom';
import { CheckCircle2, Loader2, Ruler } from 'lucide-react';
import { useApp } from '../context/AppContext';

export default function RoomSetup() {
  const { state, dispatch, roomImage, t } = useApp();
  const navigate = useNavigate();
  const scanning = state.scanState === 'scanning';
  const complete = state.scanState === 'complete' || state.scanState === 'idle';

  const width = 18;
  const length = 14;
  const height = 9;
  const area = width * length;

  const detectItems = [
    { key: 'floorDetected' },
    { key: 'wallDetected' },
    { key: 'roomBoundaries' },
    { key: 'measurements' },
  ];

  return (
    <>
      <h1 className="page-title">{t('roomSetupTitle')}</h1>
      <p className="page-sub">{t('roomSetupSub')}</p>

      <div className="setup-layout">
        <div>
          <div className="scan-stage" key={state.scanKey}>
            <img src={roomImage} alt="Selected room" />
            <div className="scan-overlay ar-overlay" />
            {scanning && <div className="scan-line" />}
            <div className="ar-label">
              <span className="pulse-dot" />
              {scanning ? t('scanningState') : t('surfaceMappedState')}
            </div>
            <div
              className="ar-frame"
              style={{ left: '10%', top: '18%', width: '80%', height: '68%' }}
            />
            <div className="measure-label" style={{ left: '12%', bottom: '14%' }}>
              <Ruler size={12} style={{ display: 'inline', marginRight: 4 }} />
              {width} {t('widthLabel')}
            </div>
            <div className="measure-label" style={{ right: '10%', top: '36%' }}>
              {length} {t('lengthLabel')}
            </div>
            <div className="measure-label" style={{ left: '42%', top: '12%' }}>
              {t('ceilingHeightLabel')}: {height} ft
            </div>
          </div>

          <div className="detect-list">
            {detectItems.map(({ key }, i) => {
              const ready = !scanning && (complete || state.scanState === 'idle');
              const stepReady = scanning ? false : ready || i < 2;
              return (
                <div
                  key={key}
                  className={`detect-item ${stepReady ? 'ok' : 'pending'}`}
                >
                  {scanning && i >= 2 ? (
                    <Loader2 size={16} className="spin" />
                  ) : (
                    <CheckCircle2 size={16} />
                  )}
                  {t(key)}
                  {scanning && i >= 2 ? '…' : stepReady ? ' ✓' : ''}
                </div>
              );
            })}
          </div>
        </div>

        <div className="panel">
          <div className="panel-head">{t('roomDimensions')}</div>
          <div className="panel-body">
            <div className="props-list">
              <div className="row">
                <span>{t('projectNameLabel')}</span>
                <strong>{t(state.project.name)}</strong>
              </div>
              <div className="row">
                <span>{t('roomTypeLabel')}</span>
                <strong>{t(state.project.roomType)}</strong>
              </div>
              <div className="field">
                <label>{t('widthLabel')}</label>
                <input defaultValue={width} readOnly />
              </div>
              <div className="field">
                <label>{t('lengthLabel')}</label>
                <input defaultValue={length} readOnly />
              </div>
              <div className="field">
                <label>{t('ceilingHeightLabel')}</label>
                <input defaultValue={height} readOnly />
              </div>
              <div className="field">
                <label>{t('totalFloorAreaLabel')}</label>
                <input value={`${area} sq ft`} readOnly />
              </div>
            </div>

            <div
              className="footer-actions"
              style={{ justifyContent: 'stretch', marginTop: '1.5rem' }}
            >
              <button
                className="btn btn-secondary"
                style={{ flex: 1 }}
                onClick={() => dispatch({ type: 'RESCAN' })}
                disabled={scanning}
              >
                {scanning ? 'Scanning…' : t('scanAgainBtn')}
              </button>
              <button
                className="btn btn-primary"
                style={{ flex: 1 }}
                disabled={scanning}
                onClick={() => {
                  dispatch({ type: 'SET_SCAN', state: 'complete' });
                  navigate('/editor');
                }}
              >
                {t('continueBtn')}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
