import { useState, type FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Boxes, Home, PenTool } from 'lucide-react';
import { HERO_IMAGE } from '../data/catalog';
import { useApp } from '../context/AppContext';
import LanguageSelector from '../components/LanguageSelector';

export default function Login() {
  const { state, dispatch, t } = useApp();
  const navigate = useNavigate();
  const [email, setEmail] = useState('riya.sharma@email.com');
  const [password, setPassword] = useState('designsphere');
  const [remember, setRemember] = useState(true);
  const [loading, setLoading] = useState(false);

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      dispatch({ type: 'LOGIN', email, role: state.selectedRole });
      navigate(state.selectedRole === 'designer' ? '/designer/projects' : '/dashboard');
    }, 700);
  };

  return (
    <div className="auth-page">
      <div className="auth-visual">
        <img src={HERO_IMAGE} alt="Interior design inspiration" />
        <div className="ar-overlay" />
      </div>

      <div className="auth-panel" style={{ position: 'relative' }}>
        <div style={{ position: 'absolute', top: '1.5rem', right: '1.5rem' }}>
          <LanguageSelector variant="compact" />
        </div>

        <Link to="/" className="brand-lockup" style={{ marginBottom: '0.5rem' }}>
          <div className="brand-mark">
            <Boxes size={20} />
          </div>
          <div>
            <strong>{t('appName')}</strong>
            <em>{t('appTagline')}</em>
          </div>
        </Link>

        <h1>{t('welcomeBack')}</h1>
        <p>{t('loginSubtitle')}</p>

        <div className="role-toggle">
          <button
            type="button"
            className={`role-option${state.selectedRole === 'homeowner' ? ' selected' : ''}`}
            onClick={() => {
              dispatch({ type: 'SET_ROLE', role: 'homeowner' });
              setEmail('riya.sharma@email.com');
            }}
          >
            <Home size={18} color="var(--teal)" />
            <strong>{t('imHomeowner')}</strong>
            <span>Riya Sharma</span>
          </button>
          <button
            type="button"
            className={`role-option${state.selectedRole === 'designer' ? ' selected' : ''}`}
            onClick={() => {
              dispatch({ type: 'SET_ROLE', role: 'designer' });
              setEmail('arjun.mehta@studio.com');
            }}
          >
            <PenTool size={18} color="var(--teal)" />
            <strong>{t('imDesigner')}</strong>
            <span>Arjun Mehta</span>
          </button>
        </div>

        <form className="auth-form" onSubmit={onSubmit}>
          <div className="field">
            <label htmlFor="email">{t('emailLabel')}</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="field">
            <label htmlFor="password">{t('passwordLabel')}</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="auth-row">
            <label className="checkbox">
              <input
                type="checkbox"
                checked={remember}
                onChange={(e) => setRemember(e.target.checked)}
              />
              {t('rememberMe')}
            </label>
            <button type="button" className="linkish">
              {t('forgotPassword')}
            </button>
          </div>
          <button className="btn btn-primary" type="submit" disabled={loading}>
            {loading ? t('signingIn') : t('loginBtn')}
          </button>
          <button
            type="button"
            className="btn btn-secondary"
            onClick={() => {
              dispatch({ type: 'LOGIN', email, role: state.selectedRole });
              navigate(state.selectedRole === 'designer' ? '/designer/projects' : '/dashboard');
            }}
          >
            {t('createAccountBtn')}
          </button>
        </form>
      </div>
    </div>
  );
}

