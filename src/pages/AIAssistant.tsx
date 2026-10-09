import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Send, Sparkles } from 'lucide-react';
import { FURNITURE } from '../data/catalog';
import { useApp } from '../context/AppContext';

const PROMPTS = [
  'Warmer seating for evenings',
  'Budget-friendly lighting',
  'Japandi layout ideas',
  'Olive accent pieces',
];

const BASE_RECOS = [
  {
    id: 'f1',
    type: 'Furniture',
    reason: 'Soft silhouette balances your modern living layout.',
  },
  {
    id: 'f3',
    type: 'Layout',
    reason: 'Low coffee table keeps sightlines open toward the window.',
  },
  {
    id: 'f12',
    type: 'Color',
    reason: 'Neutral rug anchors sand beige and olive accents.',
  },
  {
    id: 'f7',
    type: 'Lighting',
    reason: 'Sphere lamp adds vertical warmth without clutter.',
  },
];

export default function AIAssistant() {
  const { state, dispatch, roomImage, t } = useApp();
  const navigate = useNavigate();
  const [input, setInput] = useState('');
  const [activePrompt, setActivePrompt] = useState('Warmer seating for evenings');
  const [prefs, setPrefs] = useState({
    style: state.project.style,
    budget: state.project.budget,
    room: state.project.roomType,
  });

  const recommendations = useMemo(() => {
    let list = [...BASE_RECOS];
    if (activePrompt.toLowerCase().includes('lighting')) {
      list = [list[3], list[0], list[1], list[2]];
    } else if (activePrompt.toLowerCase().includes('olive')) {
      list = [
        { id: 'f6', type: 'Furniture', reason: 'Velvet chair in olive creates a calm focal point.' },
        { id: 'f11', type: 'Color', reason: 'Ceramic accents echo olive without overpowering.' },
        list[2],
        list[3],
      ];
    } else if (activePrompt.toLowerCase().includes('japandi')) {
      list = [
        { id: 'f2', type: 'Furniture', reason: 'Bouclé lounge sofa fits Japandi softness.' },
        { id: 'f9', type: 'Layout', reason: 'Low oak console keeps the room grounded.' },
        list[2],
        list[3],
      ];
    } else if (activePrompt.toLowerCase().includes('budget')) {
      list = [
        { id: 'f11', type: 'Color', reason: 'Affordable décor with high visual impact.' },
        { id: 'f4', type: 'Furniture', reason: 'Compact side table under $400.' },
        list[3],
        list[0],
      ];
    }
    return list
      .map((r) => {
        const item = FURNITURE.find((f) => f.id === r.id);
        return item ? { ...r, item } : null;
      })
      .filter(Boolean) as Array<{
      id: string;
      type: string;
      reason: string;
      item: (typeof FURNITURE)[number];
    }>;
  }, [activePrompt]);

  const ask = (text: string) => {
    const q = text.trim();
    if (!q) return;
    setActivePrompt(q);
    setInput('');
    dispatch({
      type: 'SAVE',
      message: 'AI recommendations updated',
    });
  };

  return (
    <>
      <h1 className="page-title">{t('aiTitle')}</h1>
      <p className="page-sub">{t('aiSub')}</p>

      <div className="ai-layout">
        <div>
          <div
            className="card"
            style={{ overflow: 'hidden', marginBottom: '1rem' }}
          >
            <img
              src={roomImage}
              alt="Current room"
              style={{ width: '100%', aspectRatio: '16/11', objectFit: 'cover' }}
            />
          </div>

          <div className="panel">
            <div className="panel-head">
              <span>{t('preferences')}</span>
              <Sparkles size={16} color="var(--teal)" />
            </div>
            <div className="panel-body" style={{ display: 'grid', gap: '0.85rem' }}>
              <div className="field">
                <label>{t('designStyleLabel')}</label>
                <select
                  value={prefs.style}
                  onChange={(e) =>
                    setPrefs((p) => ({ ...p, style: e.target.value }))
                  }
                >
                  {['Modern', 'Minimal', 'Scandinavian', 'Contemporary', 'Japandi'].map(
                    (s) => (
                      <option key={s} value={s}>{t(s)}</option>
                    ),
                  )}
                </select>
              </div>
              <div className="field">
                <label>{t('budgetCcyLabel')}</label>
                <input
                  type="number"
                  value={prefs.budget}
                  onChange={(e) =>
                    setPrefs((p) => ({ ...p, budget: e.target.value }))
                  }
                />
              </div>
              <div className="field">
                <label>{t('roomTypeLabel')}</label>
                <select
                  value={prefs.room}
                  onChange={(e) =>
                    setPrefs((p) => ({ ...p, room: e.target.value }))
                  }
                >
                  {['Living Room', 'Bedroom', 'Kitchen', 'Dining Room', 'Office'].map(
                    (r) => (
                      <option key={r} value={r}>{t(r)}</option>
                    ),
                  )}
                </select>
              </div>
            </div>
          </div>
        </div>

        <div>
          <div className="section-head">
            <h2>{t('aiRecommendations')}</h2>
            <button className="btn btn-ghost" onClick={() => navigate('/editor')}>
              {t('backBtn')}
            </button>
          </div>

          <div className="reco-grid">
            {recommendations.map((r) => (
              <article key={`${r.type}-${r.id}`} className="card reco-card">
                <img src={r.item.image} alt={t(r.item.name)} />
                <div className="body">
                  <span className="badge badge-teal">{t(r.type)}</span>
                  <h3 style={{ marginTop: '0.45rem' }}>{t(r.item.name)}</h3>
                  <p>{t(r.reason)}</p>
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      gap: '0.5rem',
                    }}
                  >
                    <strong>${r.item.price.toLocaleString()}</strong>
                    <button
                      className="btn btn-primary"
                      style={{ height: 'calc(var(--control-h) - 8px)' }}
                      onClick={() =>
                        dispatch({ type: 'AI_ADD', furnitureId: r.item.id })
                      }
                    >
                      {state.aiAddedIds.includes(r.item.id)
                        ? t('addedStatus')
                        : t('addToDesign')}
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>

          <div className="card" style={{ padding: '1rem', marginTop: '1rem' }}>
            <div style={{ display: 'flex', gap: '0.55rem' }}>
              <input
                className="input"
                style={{ flex: 1 }}
                placeholder={t('askPlaceholder')}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') ask(input);
                }}
              />
              <button className="btn btn-primary" onClick={() => ask(input)}>
                <Send size={16} />
              </button>
            </div>
            <div className="prompt-chips">
              {PROMPTS.map((p) => (
                <button
                  key={p}
                  className={`chip${activePrompt === p ? ' active' : ''}`}
                  onClick={() => ask(p)}
                >
                  {t(p)}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
