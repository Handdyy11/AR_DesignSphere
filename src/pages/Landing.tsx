import { Link, useNavigate } from 'react-router-dom';
import { Boxes, ArrowRight, Home, PenTool } from 'lucide-react';
import { HERO_IMAGE } from '../data/catalog';
import { useApp } from '../context/AppContext';
import LanguageSelector from '../components/LanguageSelector';

export default function Landing() {
  const navigate = useNavigate();
  const { dispatch, t } = useApp();

  return (
    <div className="landing">
      <header className="landing-nav">
        <div className="brand-lockup">
          <div className="brand-mark">
            <Boxes size={20} />
          </div>
          <div>
            <strong>{t('appName')}</strong>
            <em>{t('appTagline')}</em>
          </div>
        </div>
        <nav className="landing-links">
          <a href="#how">{t('howItWorks')}</a>
          <a href="#inspiration">{t('inspiration')}</a>
          <a href="#designers">{t('forDesigners')}</a>
        </nav>
        <div className="landing-actions" style={{ display: 'flex', gap: '0.65rem', alignItems: 'center' }}>
          <LanguageSelector variant="compact" />
          <Link to="/login" className="btn btn-secondary">
            {t('signIn')}
          </Link>
          <Link to="/login" className="btn btn-primary">
            {t('getStarted')}
          </Link>
        </div>
      </header>

      <section className="hero">
        <div className="hero-copy">
          <span className="badge badge-teal">{t('heroBadge')}</span>
          <h1>{t('heroTitle')}</h1>
          <p>{t('heroDesc')}</p>
          <div className="hero-cta">
            <button
              className="btn btn-primary"
              onClick={() => navigate('/login')}
            >
              {t('startDesigning')} <ArrowRight size={16} />
            </button>
            <button
              className="btn btn-secondary"
              onClick={() => {
                dispatch({
                  type: 'LOGIN',
                  email: 'riya.sharma@email.com',
                  role: 'homeowner',
                });
                navigate('/dashboard');
              }}
            >
              {t('exploreDemo')}
            </button>
          </div>
        </div>

        <div className="hero-visual">
          <img src={HERO_IMAGE} alt="Modern living room with natural light" />
          <div className="ar-overlay" />
          <div className="ar-label">
            <span className="pulse-dot" /> {t('liveAR')}
          </div>
          <div
            className="ar-frame"
            style={{ left: '18%', top: '42%', width: '38%', height: '28%' }}
          />
          <div
            className="ar-frame"
            style={{ right: '14%', top: '28%', width: '18%', height: '36%' }}
          />
        </div>
      </section>

      <section className="roles-section" id="how">
        <h2>{t('spaceForEveryone')}</h2>
        <div className="role-cards">
          <button
            className="card role-card"
            onClick={() => {
              dispatch({ type: 'SET_ROLE', role: 'homeowner' });
              navigate('/login');
            }}
          >
            <Home size={22} color="var(--teal)" />
            <h3>{t('homeownerCardTitle')}</h3>
            <p>{t('homeownerCardDesc')}</p>
          </button>
          <button
            className="card role-card"
            id="designers"
            onClick={() => {
              dispatch({ type: 'SET_ROLE', role: 'designer' });
              navigate('/login');
            }}
          >
            <PenTool size={22} color="var(--teal)" />
            <h3>{t('designerCardTitle')}</h3>
            <p>{t('designerCardDesc')}</p>
          </button>
        </div>
      </section>
    </div>
  );
}

