import { useState } from 'react';
import { useApp } from '../context/AppContext';
import type { AccessibilitySettings } from '../context/AppContext';
import ColorSwatches from '../components/ColorSwatches';
import LanguageSelector from '../components/LanguageSelector';

const DEMO_COLORS = [
  { name: 'Sand Beige', hex: '#C4A882' },
  { name: 'Olive', hex: '#6B7F4A' },
  { name: 'Grey', hex: '#8A8F98' },
  { name: 'Teal', hex: '#18b7a0' },
  { name: 'Navy', hex: '#102b38' },
  { name: 'Terracotta', hex: '#c85a38' },
];

function Toggle({
  on,
  onClick,
  label,
}: {
  on: boolean;
  onClick: () => void;
  label: string;
}) {
  return (
    <button
      type="button"
      className={`toggle${on ? ' on' : ''}`}
      onClick={onClick}
      aria-pressed={on}
      aria-label={label}
    />
  );
}

export default function Accessibility() {
  const { state, dispatch, t } = useApp();
  const [demoColor, setDemoColor] = useState('Olive');
  const [demoHex, setDemoHex] = useState('#6B7F4A');
  const a = state.accessibility;

  const set = (settings: Partial<AccessibilitySettings>) =>
    dispatch({ type: 'SET_A11Y', settings });

  return (
    <>
      <h1 className="page-title">{t('a11yTitle')}</h1>
      <p className="page-sub">{t('a11ySubtitle')}</p>

      <div className="a11y-layout">
        <div className="card" style={{ padding: '0.5rem 1.25rem 1rem' }}>
          {/* Language Accessibility Section */}
          <h2 style={{ fontSize: 'var(--fs-lg)', margin: '1rem 0 0.25rem' }}>
            {t('languageSectionTitle')}
          </h2>
          <p style={{ color: 'var(--secondary)', fontSize: 'var(--fs-sm)', marginBottom: '0.85rem' }}>
            {t('languageSectionDesc')}
          </p>

          <LanguageSelector variant="full" />

          <h2 style={{ fontSize: 'var(--fs-lg)', margin: '1.5rem 0 0.25rem' }}>
            {t('visualA11yTitle')}
          </h2>

          <div className="setting-row">
            <div>
              <h3>{t('highContrastTitle')}</h3>
              <p>{t('highContrastDesc')}</p>
            </div>
            <Toggle
              on={a.highContrast}
              label={t('highContrastTitle')}
              onClick={() => set({ highContrast: !a.highContrast })}
            />
          </div>

          <div className="setting-row">
            <div>
              <h3>{t('textSizeTitle')}</h3>
              <p>{t('textSizeDesc')}</p>
            </div>
            <div className="segmented">
              {(['small', 'medium', 'large'] as const).map((size) => (
                <button
                  key={size}
                  className={a.textSize === size ? 'active' : ''}
                  onClick={() => set({ textSize: size })}
                >
                  {t(size.charAt(0).toUpperCase() + size.slice(1))}
                </button>
              ))}
            </div>
          </div>

          <div className="setting-row">
            <div>
              <h3>{t('reduceMotionTitle')}</h3>
              <p>{t('reduceMotionDesc')}</p>
            </div>
            <Toggle
              on={a.reduceMotion}
              label={t('reduceMotionTitle')}
              onClick={() => set({ reduceMotion: !a.reduceMotion })}
            />
          </div>

          <div className="setting-row">
            <div>
              <h3>{t('largerControlsTitle')}</h3>
              <p>{t('largerControlsDesc')}</p>
            </div>
            <Toggle
              on={a.largerControls}
              label={t('largerControlsTitle')}
              onClick={() => set({ largerControls: !a.largerControls })}
            />
          </div>

          <h2 style={{ fontSize: 'var(--fs-lg)', margin: '1.25rem 0 0.25rem' }}>
            {t('colorVisibilityTitle')}
          </h2>

          <div className="setting-row">
            <div>
              <h3>{t('colorBlindTitle')}</h3>
              <p>{t('colorBlindDesc')}</p>
            </div>
            <Toggle
              on={a.colorBlind}
              label={t('colorBlindTitle')}
              onClick={() => set({ colorBlind: !a.colorBlind })}
            />
          </div>

          <div className="setting-row">
            <div>
              <h3>{t('showLabelsTitle')}</h3>
              <p>{t('showLabelsDesc')}</p>
            </div>
            <Toggle
              on={a.showColorLabels}
              label={t('showLabelsTitle')}
              onClick={() => set({ showColorLabels: !a.showColorLabels })}
            />
          </div>

          <div className="setting-row">
            <div>
              <h3>{t('increaseBordersTitle')}</h3>
              <p>{t('increaseBordersDesc')}</p>
            </div>
            <Toggle
              on={a.increaseBorders}
              label={t('increaseBordersTitle')}
              onClick={() => set({ increaseBorders: !a.increaseBorders })}
            />
          </div>

          <div className="footer-actions">
            <button
              className="btn btn-secondary"
              onClick={() => dispatch({ type: 'RESET_A11Y' })}
            >
              {t('resetDefaultBtn')}
            </button>
            <button
              className="btn btn-primary"
              onClick={() =>
                dispatch({
                  type: 'SAVE',
                  message: 'Preferences saved',
                })
              }
            >
              {t('savePreferencesBtn')}
            </button>
          </div>
        </div>

        <div className="card a11y-preview">
          <h2 style={{ fontSize: 'var(--fs-lg)', marginBottom: '0.35rem' }}>
            {t('livePreviewTitle')}
          </h2>
          <p style={{ color: 'var(--secondary)', fontSize: 'var(--fs-sm)' }}>
            {t('livePreviewSub')}
          </p>

          <div className="demo-card card">
            <span
              className="badge"
              style={{
                background: `${demoHex}20`,
                color: demoHex,
                border: `1.5px solid ${demoHex}44`,
                transition: 'all 0.2s',
              }}
            >
              {t(demoColor)} · {t('sampleBadge')}
            </span>
            <h3 style={{ margin: '0.75rem 0 0.35rem', fontSize: 'var(--fs-md)' }}>
              {t('sampleTitle')}
            </h3>
            <p style={{ color: 'var(--secondary)', fontSize: 'var(--fs-sm)' }}>
              {t('sampleDesc')}
            </p>

            <div style={{ margin: '1rem 0' }}>
              <div
                style={{
                  fontSize: 'var(--fs-sm)',
                  fontWeight: 600,
                  marginBottom: '0.5rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}
              >
                <span>{t('Color indicators')}</span>
                <span style={{ fontSize: 'var(--fs-xs)', color: 'var(--secondary)', fontWeight: 700 }}>
                  {t(demoColor)} ({demoHex})
                </span>
              </div>
              <ColorSwatches
                colors={DEMO_COLORS}
                selected={demoColor}
                onSelect={(name, hex) => {
                  setDemoColor(name);
                  setDemoHex(hex);
                }}
              />
            </div>

            <div className="field" style={{ marginBottom: '0.85rem' }}>
              <label>{t('Sample input')}</label>
              <input defaultValue="Riya Sharma" />
            </div>

            <div style={{ display: 'flex', gap: '0.55rem', flexWrap: 'wrap' }}>
              <button
                className="btn btn-primary"
                style={{
                  background: demoHex,
                  borderColor: demoHex,
                  transition: 'background 0.2s, border-color 0.2s',
                }}
              >
                {t('Primary action')}
              </button>
              <button className="btn btn-secondary">{t('Secondary')}</button>
            </div>

            <ul
              style={{
                margin: '1rem 0 0',
                paddingLeft: '1.1rem',
                color: 'var(--secondary)',
                fontSize: 'var(--fs-xs)',
              }}
            >
              <li>{t('Language:')} {state.language.toUpperCase()}</li>
              <li>{t('Contrast:')} {a.highContrast ? t('High') : t('Standard')}</li>
              <li>{t('Text:')} {t(a.textSize)}</li>
              <li>{t('Motion:')} {a.reduceMotion ? t('Reduced') : t('Enabled')}</li>
              <li>{t('Controls:')} {a.largerControls ? t('Large') : t('Default')}</li>
              <li>{t('Palette:')} {a.colorBlind ? t('Color-blind friendly') : t('Brand')}</li>
              <li>{t('Color labels:')} {a.showColorLabels ? t('On') : t('Off')}</li>
              <li>{t('Borders:')} {a.increaseBorders ? t('Emphasized') : t('Subtle')}</li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}

