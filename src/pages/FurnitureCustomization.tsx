import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import ColorSwatches from '../components/ColorSwatches';
import FurnitureVisual from '../components/FurnitureVisual';

const MATERIALS = ['Linen Blend', 'Bouclé', 'Velvet', 'Leather', 'Wool Blend'];
const SIZES = ['Small', 'Medium', 'Large'] as const;

export default function FurnitureCustomization() {
  const { state, dispatch, getFurniture, t } = useApp();
  const navigate = useNavigate();

  const instance = useMemo(() => {
    const id = state.customizingId ?? state.selectedInstanceId;
    return state.placedFurniture.find((p) => p.instanceId === id) ?? null;
  }, [state]);

  const item = instance ? getFurniture(instance.furnitureId) : undefined;

  const [color, setColor] = useState(instance?.color ?? 'Sand Beige');
  const [colorHex, setColorHex] = useState(instance?.colorHex ?? '#C4A882');
  const [material, setMaterial] = useState(instance?.material ?? 'Linen Blend');
  const [size, setSize] = useState<(typeof SIZES)[number]>(
    instance?.size ?? 'Medium',
  );
  const [stickerStyle, setStickerStyle] = useState<'diecut' | 'seamless'>(
    instance?.stickerStyle ?? 'diecut',
  );

  useEffect(() => {
    if (!instance) return;
    setColor(instance.color);
    setColorHex(instance.colorHex);
    setMaterial(instance.material);
    setSize(instance.size);
    if (instance.stickerStyle) setStickerStyle(instance.stickerStyle);
  }, [instance]);

  if (!instance || !item) {
    return (
      <>
        <h1 className="page-title">{t('customizationTitle')}</h1>
        <p className="page-sub">{t('No furniture selected.')}</p>
        <button className="btn btn-primary" onClick={() => navigate('/editor')}>
          {t('backBtn')}
        </button>
      </>
    );
  }

  const apply = (mode: 'add' | 'replace' | 'save') => {
    const scale =
      size === 'Small' ? 0.85 : size === 'Large' ? 1.2 : 1;
    dispatch({
      type: 'APPLY_CUSTOMIZATION',
      id: instance.instanceId,
      updates: { color, colorHex, material, size, scale, stickerStyle },
    });
    if (mode === 'add') {
      dispatch({
        type: 'ADD_FURNITURE',
        item,
        color,
        colorHex,
      });
    }
    navigate('/editor');
  };

  return (
    <>
      <h1 className="page-title">{t(item.name)}</h1>
      <p className="page-sub">{t('customizationSub')}</p>

      <div className="custom-layout">
        <div className="custom-preview">
          <FurnitureVisual
            src={item.image}
            tint={colorHex}
            alt={t(item.name)}
            material={material}
            isSticker={true}
            stickerStyle={stickerStyle}
          />
        </div>

        <div className="panel">
          <div className="panel-head">{t('customizationTitle')}</div>
          <div className="panel-body" style={{ display: 'grid', gap: '1.25rem' }}>
            {/* Color Swatches and Custom Tint */}
            <div>
              <h3 style={{ fontSize: 'var(--fs-sm)', marginBottom: '0.65rem' }}>
                {t('colorLabel')} — {t(color)}
              </h3>
              <ColorSwatches
                colors={item.colors}
                selected={color}
                onSelect={(name, hex) => {
                  setColor(name);
                  setColorHex(hex);
                }}
              />
              <div className="custom-color-picker-row">
                <input
                  type="color"
                  value={colorHex}
                  onChange={(e) => {
                    setColor('Custom Color');
                    setColorHex(e.target.value);
                  }}
                />
                <span style={{ fontSize: 'var(--fs-xs)', color: 'var(--secondary)' }}>
                  {t('pickColor')} ({colorHex})
                </span>
              </div>
            </div>

            {/* Material selector */}
            <div>
              <h3 style={{ fontSize: 'var(--fs-sm)', marginBottom: '0.65rem' }}>
                {t('materialLabel')}
              </h3>
              <div className="option-grid">
                {MATERIALS.map((m) => (
                  <button
                    key={m}
                    type="button"
                    className={`option-tile${material === m ? ' active' : ''}`}
                    onClick={() => setMaterial(m)}
                  >
                    {t(m)}
                  </button>
                ))}
              </div>
            </div>

            {/* Sticker Cutout Style */}
            <div>
              <h3 style={{ fontSize: 'var(--fs-sm)', marginBottom: '0.65rem' }}>
                {t('stickerModeLabel')}
              </h3>
              <div className="sticker-style-toggle">
                <button
                  type="button"
                  className={`sticker-style-btn${stickerStyle === 'diecut' ? ' active' : ''}`}
                  onClick={() => setStickerStyle('diecut')}
                >
                  {t('Die-Cut Sticker')}
                </button>
                <button
                  type="button"
                  className={`sticker-style-btn${stickerStyle === 'seamless' ? ' active' : ''}`}
                  onClick={() => setStickerStyle('seamless')}
                >
                  {t('Seamless Cutout')}
                </button>
              </div>
            </div>

            {/* Size selector */}
            <div>
              <h3 style={{ fontSize: 'var(--fs-sm)', marginBottom: '0.65rem' }}>
                {t('sizeLabel')}
              </h3>
              <div className="option-grid">
                {SIZES.map((s) => (
                  <button
                    key={s}
                    type="button"
                    className={`option-tile${size === s ? ' active' : ''}`}
                    onClick={() => setSize(s)}
                  >
                    {t(s)}
                  </button>
                ))}
              </div>
            </div>

            <div className="props-list">
              <div className="row">
                <span>{t('priceLabel')}</span>
                <strong>₹{item.price.toLocaleString()}</strong>
              </div>
              <div className="row">
                <span>{t('baseDimensions')}</span>
                <strong>
                  {item.width}" × {item.depth}" × {item.height}"
                </strong>
              </div>
            </div>

            <div className="footer-actions" style={{ marginTop: 0 }}>
              <button className="btn btn-secondary" onClick={() => apply('add')}>
                {t('addToDesign')}
              </button>
              <button
                className="btn btn-secondary"
                onClick={() => apply('replace')}
              >
                {t('replaceBtn')}
              </button>
              <button className="btn btn-primary" onClick={() => apply('save')}>
                {t('saveBtn')}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
