import { useNavigate } from 'react-router-dom';
import {
  PenTool, Layers, Palette, Sparkles, Users,
  GitCompare, View, ArrowRight, Grid3X3, Lightbulb,
  ClipboardList, Workflow, CheckCircle2
} from 'lucide-react';
import { useApp } from '../context/AppContext';

const PRIMARY_TOOLS = [
  {
    id: 'editor',
    icon: Layers,
    labelKey: 'studioEditor',
    label: '2D & 3D Space Editor',
    descKey: 'studioEditorDesc',
    desc: 'Arrange furniture stickers, customize room dimensions, and adjust floor layouts in real-time.',
    route: '/editor',
    accentColor: 'var(--teal)',
    badge: 'Core Studio',
  },
  {
    id: 'ar',
    icon: View,
    labelKey: 'studioAR',
    label: 'AR Room Visualizer',
    descKey: 'studioARDesc',
    desc: 'Overlay scale-accurate furniture models directly into live client room photos.',
    route: '/ar-preview',
    accentColor: '#7c3aed',
    badge: 'Augmented Reality',
  },
  {
    id: 'ai',
    icon: Sparkles,
    labelKey: 'studioAI',
    label: 'Design Insights',
    descKey: 'studioAIDesc',
    desc: 'Generate smart layout ideas, color palettes, and curated furniture pairings instantly.',
    route: '/ai-assistant',
    accentColor: '#d97706',
    badge: 'Intelligent Suggestions',
  },
];

const SECONDARY_TOOLS = [
  {
    id: 'compare',
    icon: GitCompare,
    labelKey: 'studioCompare',
    label: 'Design Variant Comparison',
    descKey: 'studioCompareDesc',
    desc: 'Side-by-side A/B comparison for client decision making.',
    route: '/compare',
  },
  {
    id: 'collab',
    icon: Users,
    labelKey: 'studioCollab',
    label: 'Client Collaboration Board',
    descKey: 'studioCollabDesc',
    desc: 'Live markup, pins, and shared feedback notes on active designs.',
    route: '/collaboration',
  },
  {
    id: 'customize',
    icon: Palette,
    labelKey: 'studioCustomize',
    label: 'Material & Finish Studio',
    descKey: 'studioCustomizeDesc',
    desc: 'Deep customizer for fabrics, wood grains, metal finishes, and tints.',
    route: '/customize',
  },
];

const WORKFLOW_STEPS = [
  { step: 1, icon: ClipboardList, label: 'Client Brief', desc: 'Requirements & Scope' },
  { step: 2, icon: Grid3X3, label: 'Room Setup', desc: 'Dimensions & Base Photo' },
  { step: 3, icon: PenTool, label: 'Design & Place', desc: 'Stickers & Styling' },
  { step: 4, icon: View, label: 'AR Visualise', desc: 'Photorealistic Overlay' },
  { step: 5, icon: Lightbulb, label: 'Compare Options', desc: 'A/B Variant Review' },
  { step: 6, icon: Workflow, label: 'Client Approval', desc: 'Sign-off & Delivery' },
];

export default function DesignerStudio() {
  const { t } = useApp();
  const navigate = useNavigate();

  return (
    <div style={{ maxWidth: 1280, margin: '0 auto' }}>
      {/* Header */}
      <div style={{ marginBottom: '1.75rem' }}>
        <h1 className="page-title">{t('designerStudioTitle') || 'Design Studio'}</h1>
        <p className="page-sub">
          {t('designerStudioSub') || 'Central workspace for 3D modeling, AR presentation, and client customization.'}
        </p>
      </div>

      {/* Primary Studio Tools */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '1.25rem',
          marginBottom: '2rem',
        }}
      >
        {PRIMARY_TOOLS.map(tool => {
          const Icon = tool.icon;
          return (
            <div
              key={tool.id}
              className="card"
              style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                padding: '1.5rem',
                border: '1.5px solid var(--border)',
                position: 'relative',
                overflow: 'hidden',
                transition: 'transform var(--transition), box-shadow var(--transition), border-color var(--transition)',
              }}
            >
              {/* Subtle top accent bar */}
              <div
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  height: 4,
                  background: tool.accentColor,
                }}
              />

              <div>
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: '1rem',
                  }}
                >
                  <div
                    style={{
                      width: 44,
                      height: 44,
                      borderRadius: 'var(--radius-sm)',
                      background: 'var(--light-gray)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: tool.accentColor,
                    }}
                  >
                    <Icon size={22} />
                  </div>
                  <span
                    className="badge"
                    style={{
                      fontSize: '0.7rem',
                      fontWeight: 700,
                    }}
                  >
                    {tool.badge}
                  </span>
                </div>

                <h2 style={{ fontSize: 'var(--fs-md)', fontWeight: 800, marginBottom: '0.35rem' }}>
                  {t(tool.labelKey) || tool.label}
                </h2>
                <p
                  style={{
                    fontSize: 'var(--fs-sm)',
                    color: 'var(--secondary)',
                    lineHeight: 1.5,
                    marginBottom: '1.25rem',
                  }}
                >
                  {t(tool.descKey) || tool.desc}
                </p>
              </div>

              <button
                className="btn btn-primary"
                onClick={() => navigate(tool.route)}
                style={{
                  width: '100%',
                  height: 40,
                  fontSize: 'var(--fs-sm)',
                }}
              >
                <span>{t('launchTool') || 'Launch Tool'}</span>
                <ArrowRight size={15} />
              </button>
            </div>
          );
        })}
      </div>

      {/* Secondary Tools Grid */}
      <div style={{ marginBottom: '2rem' }}>
        <h2 style={{ fontSize: 'var(--fs-md)', fontWeight: 800, marginBottom: '0.85rem' }}>
          {t('additionalTools') || 'Specialized Utilities'}
        </h2>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
            gap: '1rem',
          }}
        >
          {SECONDARY_TOOLS.map(tool => {
            const Icon = tool.icon;
            return (
              <div
                key={tool.id}
                className="card"
                onClick={() => navigate(tool.route)}
                style={{
                  cursor: 'pointer',
                  padding: '1.15rem',
                  display: 'flex',
                  gap: '1rem',
                  alignItems: 'flex-start',
                  transition: 'transform var(--transition), border-color var(--transition), box-shadow var(--transition)',
                }}
              >
                <div
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: 'var(--radius-sm)',
                    background: 'rgba(24, 183, 160, 0.1)',
                    color: 'var(--teal-dark)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                  }}
                >
                  <Icon size={20} />
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.2rem' }}>
                    <h3 style={{ fontSize: 'var(--fs-sm)', fontWeight: 700, margin: 0 }}>
                      {t(tool.labelKey) || tool.label}
                    </h3>
                    <ArrowRight size={13} style={{ color: 'var(--secondary)', opacity: 0.6 }} />
                  </div>
                  <p style={{ fontSize: 'var(--fs-xs)', color: 'var(--secondary)', lineHeight: 1.4, margin: 0 }}>
                    {t(tool.descKey) || tool.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Standardized Responsive Workflow Steps */}
      <div className="card" style={{ padding: '1.5rem', marginBottom: '1.5rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
          <div>
            <h2 style={{ fontSize: 'var(--fs-md)', fontWeight: 800, margin: 0 }}>
              {t('designerWorkflow') || 'Designer Workflow Pipeline'}
            </h2>
            <p style={{ fontSize: 'var(--fs-xs)', color: 'var(--secondary)', margin: '0.15rem 0 0 0' }}>
              {t('workflowSub') || 'Standard 6-stage lifecycle from initial client consultation to sign-off.'}
            </p>
          </div>
          <span className="badge badge-teal" style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
            <CheckCircle2 size={12} /> Standardized
          </span>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
            gap: '1rem',
          }}
        >
          {WORKFLOW_STEPS.map(step => {
            const Icon = step.icon;
            return (
              <div
                key={step.step}
                style={{
                  background: 'var(--light-gray)',
                  borderRadius: 'var(--radius-sm)',
                  padding: '1rem 0.85rem',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  textAlign: 'center',
                  position: 'relative',
                }}
              >
                <div
                  style={{
                    position: 'absolute',
                    top: '0.5rem',
                    left: '0.65rem',
                    fontSize: '0.65rem',
                    fontWeight: 800,
                    color: 'var(--secondary)',
                  }}
                >
                  #{step.step}
                </div>
                <div
                  style={{
                    width: 38,
                    height: 38,
                    borderRadius: '50%',
                    background: 'var(--navy-deep)',
                    color: '#fff',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: '0.65rem',
                  }}
                >
                  <Icon size={18} />
                </div>
                <p style={{ fontWeight: 700, fontSize: 'var(--fs-xs)', marginBottom: '0.2rem' }}>
                  {t(step.label) || step.label}
                </p>
                <p style={{ fontSize: '0.72rem', color: 'var(--secondary)', lineHeight: 1.3, margin: 0 }}>
                  {t(step.desc) || step.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

