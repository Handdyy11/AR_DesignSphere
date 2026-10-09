import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Move,
  RotateCw,
  Maximize2,
  Camera,
  Crosshair,
  Ruler,
  Trash2,
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import FurnitureVisual from '../components/FurnitureVisual';

export default function ARPreview() {
  const { state, dispatch, getFurniture, roomImage, t } = useApp();
  const navigate = useNavigate();
  const [tool, setTool] = useState<'move' | 'rotate' | 'resize' | 'capture'>(
    'move',
  );
  const [captured, setCaptured] = useState(false);

  const selected =
    state.placedFurniture.find((p) => p.instanceId === state.selectedInstanceId) ??
    state.placedFurniture[0];
  const selectedItem = selected
    ? getFurniture(selected.furnitureId)
    : undefined;

  const runTool = (tTool: typeof tool) => {
    setTool(tTool);
    if (tTool === 'capture') {
      dispatch({
        type: 'ADD_AR_CAPTURE',
        image: roomImage,
        label: `AR Capture ${state.arCaptures.length + 1}`,
      });
      setCaptured(true);
      setTimeout(() => setCaptured(false), 1500);
      return;
    }
    if (!selected) return;
    if (tTool === 'move') {
      dispatch({
        type: 'UPDATE_INSTANCE',
        id: selected.instanceId,
        updates: { x: Math.min(78, selected.x + 3) },
      });
    } else if (tTool === 'rotate') {
      dispatch({
        type: 'UPDATE_INSTANCE',
        id: selected.instanceId,
        updates: { rotation: (selected.rotation + 20) % 360 },
      });
    } else {
      dispatch({
        type: 'UPDATE_INSTANCE',
        id: selected.instanceId,
        updates: { scale: Math.min(1.7, +(selected.scale + 0.08).toFixed(2)) },
      });
    }
  };

  return (
    <>
      <h1 className="page-title">{t('arPreviewTitle')}</h1>
      <p className="page-sub">{t('arPreviewSub')}</p>

      <div className="ar-layout">
        <div>
          <div className="ar-stage">
            <img className="room" src={roomImage} alt="AR room view" />
            <div className="ar-overlay" />
            <div className="ar-hud">
              <span className="badge badge-teal">
                <span className="pulse-dot" /> {t('liveAR')}
              </span>
              <span className="badge">
                <Crosshair size={12} /> {t('surfaceLocked')}
              </span>
              <span className="badge">
                <Ruler size={12} /> {t('trueToScale')}
              </span>
              {captured && <span className="badge badge-success">{t('capturedState')}</span>}
            </div>

            {state.placedFurniture.map((p) => {
              const item = getFurniture(p.furnitureId);
              if (!item) return null;
              const isSelected = p.instanceId === selected?.instanceId;
              const scaleX = p.scaleX ?? 1;
              const scaleY = p.scaleY ?? 1;
              const flipFactor = p.flipX ? -1 : 1;
              const stickerStyle = p.stickerStyle ?? 'diecut';
              return (
                <div
                  key={p.instanceId}
                  className={`placed-item${isSelected ? ' selected' : ''}`}
                  style={{
                    left: `${p.x}%`,
                    top: `${p.y}%`,
                    transform: `translate(-50%, -50%) rotate(${p.rotation}deg) scale(${p.scale * scaleX * flipFactor}, ${p.scale * scaleY})`,
                    width: 150,
                  }}
                  onClick={() =>
                    dispatch({ type: 'SELECT_INSTANCE', id: p.instanceId })
                  }
                >
                  <FurnitureVisual
                    src={item.image}
                    tint={p.colorHex}
                    alt={t(item.name)}
                    isSticker={true}
                    stickerStyle={stickerStyle}
                    material={p.material}
                  />
                </div>
              );
            })}

            <div className="ar-controls">
              <button
                className={tool === 'move' ? 'active' : ''}
                onClick={() => runTool('move')}
              >
                <Move size={15} /> {t('moveLabel')}
              </button>
              <button
                className={tool === 'rotate' ? 'active' : ''}
                onClick={() => runTool('rotate')}
              >
                <RotateCw size={15} /> {t('rotateLabel')}
              </button>
              <button
                className={tool === 'resize' ? 'active' : ''}
                onClick={() => runTool('resize')}
              >
                <Maximize2 size={15} /> {t('resizeLabel')}
              </button>
              <button
                className={tool === 'capture' ? 'active' : ''}
                onClick={() => runTool('capture')}
              >
                <Camera size={15} /> {t('captureBtn')}
              </button>
            </div>
          </div>

          {state.arCaptures.length > 0 && (
            <div className="card" style={{ marginTop: '1rem', padding: '1rem' }}>
              <h3 style={{ fontSize: 'var(--fs-sm)', marginBottom: '0.75rem' }}>
                {t('capturedImages')} ({state.arCaptures.length})
              </h3>
              <div className="ar-captures-grid">
                {state.arCaptures.map((cap) => (
                  <div key={cap.id} className="ar-capture-card">
                    <img src={cap.image} alt={cap.label} />
                    <div className="ar-capture-meta">
                      <span>{cap.label}</span>
                      <button
                        type="button"
                        className="btn btn-danger ar-capture-delete"
                        aria-label={`Delete ${cap.label}`}
                        onClick={() =>
                          dispatch({ type: 'DELETE_AR_CAPTURE', id: cap.id })
                        }
                      >
                        <Trash2 size={14} /> {t('deleteFromDesign')}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <aside className="panel">
          <div className="panel-head">{t('selectedFurniture')}</div>
          <div className="panel-body">
            {selected && selectedItem ? (
              <div className="props-list">
                <FurnitureVisual
                  src={selectedItem.image}
                  tint={selected.colorHex}
                  alt={t(selectedItem.name)}
                  isSticker={true}
                  stickerStyle={selected.stickerStyle ?? 'diecut'}
                  material={selected.material}
                />
                <div className="row">
                  <span>{t('Name')}</span>
                  <strong>{t(selectedItem.name)}</strong>
                </div>
                <div className="row">
                  <span>{t('Base dimensions')}</span>
                  <strong>
                    {selectedItem.width}" × {selectedItem.depth}" ×{' '}
                    {selectedItem.height}"
                  </strong>
                </div>
                <div className="row">
                  <span>{t('Scale')}</span>
                  <strong>{Math.round(selected.scale * 100)}%</strong>
                </div>
                <div className="row">
                  <span>{t('colorLabel')}</span>
                  <strong>{t(selected.color)}</strong>
                </div>
              </div>
            ) : (
              <p className="empty-hint">{t('No furniture in this design yet.')}</p>
            )}

            <div
              className="footer-actions"
              style={{ flexDirection: 'column', marginTop: '1.25rem' }}
            >
              <button
                className="btn btn-secondary"
                style={{ width: '100%' }}
                onClick={() => navigate('/editor')}
              >
                {t('exitAR')}
              </button>
              <button
                className="btn btn-primary"
                style={{ width: '100%' }}
                onClick={() =>
                  dispatch({ type: 'SAVE', message: 'AR design saved' })
                }
              >
                {t('saveDesign')}
              </button>
            </div>
          </div>
        </aside>
      </div>
    </>
  );
}
