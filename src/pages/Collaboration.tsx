import { useState, type FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link2, UserPlus, Check, RefreshCw } from 'lucide-react';
import { useApp } from '../context/AppContext';
import FurnitureVisual from '../components/FurnitureVisual';

export default function Collaboration() {
  const { state, dispatch, getFurniture, roomImage, t } = useApp();
  const navigate = useNavigate();
  const [tab, setTab] = useState<'open' | 'resolved'>('open');
  const [comment, setComment] = useState('');
  const [replyFor, setReplyFor] = useState<string | null>(null);
  const [replyText, setReplyText] = useState('');
  const [inviteOpen, setInviteOpen] = useState(false);

  const filtered = state.comments.filter((c) => c.status === tab);

  const addComment = (e: FormEvent) => {
    e.preventDefault();
    if (!comment.trim()) return;
    dispatch({ type: 'ADD_COMMENT', text: comment.trim() });
    setComment('');
  };

  return (
    <>
      <div className="section-head">
        <div>
          <h1 className="page-title" style={{ marginBottom: 0 }}>
            {t('collabTitle')}
          </h1>
          <p className="page-sub" style={{ marginBottom: 0 }}>
            {t('collabSub')}
          </p>
        </div>
        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
          <button
            className="btn btn-secondary"
            onClick={() => {
              setInviteOpen(true);
              dispatch({
                type: 'SAVE',
                message: 'Invite sent to collaborator',
              });
              setTimeout(() => setInviteOpen(false), 2000);
            }}
          >
            <UserPlus size={16} /> {t('inviteCollaborator')}
          </button>
          <button
            className="btn btn-secondary"
            onClick={() =>
              dispatch({ type: 'SAVE', message: 'Share link copied' })
            }
          >
            <Link2 size={16} /> {t('shareLink')}
          </button>
          <button className="btn btn-primary" onClick={() => navigate('/compare')}>
            {t('goToCompare')}
          </button>
        </div>
      </div>

      <div
        className="badge badge-success"
        style={{ marginBottom: '1rem', display: 'inline-flex', gap: '0.4rem' }}
      >
        {state.syncStatus === 'syncing' ? (
          <>
            <RefreshCw size={12} /> {t('syncingChanges')}
          </>
        ) : (
          <>
            <Check size={12} /> {t('allSynced')}
          </>
        )}
        {inviteOpen && ` · ${t('collaboratorInvited')}`}
      </div>

      <div className="collab-layout">
        <div>
          <div className="canvas" style={{ minHeight: 520 }}>
            <img className="room" src={roomImage} alt="Shared design" />
            <div className="ar-overlay" style={{ opacity: 0.3 }} />
            <div className="ar-label">
              <span className="pulse-dot" /> {t('liveEditing')}
            </div>

            {state.placedFurniture.map((p) => {
              const item = getFurniture(p.furnitureId);
              if (!item) return null;
              const scaleX = p.scaleX ?? 1;
              const scaleY = p.scaleY ?? 1;
              const flipFactor = p.flipX ? -1 : 1;
              return (
                <div
                  key={p.instanceId}
                  className="placed-item"
                  style={{
                    left: `${p.x}%`,
                    top: `${p.y}%`,
                    transform: `translate(-50%, -50%) rotate(${p.rotation}deg) scale(${p.scale * 0.9 * scaleX * flipFactor}, ${p.scale * 0.9 * scaleY})`,
                    width: 120,
                  }}
                >
                  <FurnitureVisual
                    src={item.image}
                    tint={p.colorHex}
                    alt={t(item.name)}
                    isSticker={true}
                    stickerStyle={p.stickerStyle ?? 'diecut'}
                    material={p.material}
                  />
                </div>
              );
            })}

            {state.comments
              .filter((c) => c.status === 'open')
              .map((c, i) => (
                <div
                  key={c.id}
                  className="marker"
                  style={{ left: `${c.markerX}%`, top: `${c.markerY}%` }}
                  title={t(c.text)}
                >
                  <span>{i + 1}</span>
                </div>
              ))}
          </div>
        </div>

        <div className="panel">
          <div className="panel-head">{t('discussion')}</div>
          <div className="panel-body">
            <div style={{ marginBottom: '1rem' }}>
              <h3 style={{ fontSize: 'var(--fs-sm)', marginBottom: '0.35rem' }}>
                {t('participants')}
              </h3>
              <div className="participant">
                <div className="avatar">RS</div>
                <div style={{ flex: 1 }}>
                  <strong>Riya Sharma</strong>
                  <div style={{ fontSize: 'var(--fs-xs)', color: 'var(--secondary)' }}>
                    {t('homeownerRole')} · {t('Live editing')}
                  </div>
                </div>
                <span className="status-dot" title={t('Online')} />
              </div>
              <div className="participant">
                <div className="avatar" style={{ background: '#3d6b8c' }}>
                  AM
                </div>
                <div style={{ flex: 1 }}>
                  <strong>Arjun Mehta</strong>
                  <div style={{ fontSize: 'var(--fs-xs)', color: 'var(--secondary)' }}>
                    {t('designerRole')} · {t('Reviewing layout')}
                  </div>
                </div>
                <span className="status-dot" title={t('Online')} />
              </div>
            </div>

            <div className="tabs">
              <button
                className={tab === 'open' ? 'active' : ''}
                onClick={() => setTab('open')}
              >
                {t('openTab')} ({state.comments.filter((c) => c.status === 'open').length})
              </button>
              <button
                className={tab === 'resolved' ? 'active' : ''}
                onClick={() => setTab('resolved')}
              >
                {t('resolvedTab')} (
                {state.comments.filter((c) => c.status === 'resolved').length})
              </button>
            </div>

            {filtered.map((c) => (
              <div
                key={c.id}
                className={`comment-card${c.status === 'resolved' ? ' resolved' : ''}`}
              >
                <div className="comment-meta">
                  <span>
                    {c.author} · {t(c.role)}
                  </span>
                  <span className="badge">{t(c.status)}</span>
                </div>
                <p style={{ fontSize: 'var(--fs-sm)' }}>{t(c.text)}</p>
                {c.replies.map((r) => (
                  <div key={r.id} className="reply">
                    <strong>{r.author}: </strong>
                    {t(r.text)}
                  </div>
                ))}
                {c.status === 'open' && (
                  <div
                    style={{
                      display: 'flex',
                      gap: '0.45rem',
                      marginTop: '0.65rem',
                      flexWrap: 'wrap',
                    }}
                  >
                    <button
                      className="btn btn-ghost"
                      style={{ height: 34, padding: '0 0.75rem' }}
                      onClick={() =>
                        setReplyFor(replyFor === c.id ? null : c.id)
                      }
                    >
                      {t('replyBtn')}
                    </button>
                    <button
                      className="btn btn-secondary"
                      style={{ height: 34, padding: '0 0.75rem' }}
                      onClick={() =>
                        dispatch({ type: 'RESOLVE_COMMENT', id: c.id })
                      }
                    >
                      {t('resolveCommentBtn')}
                    </button>
                  </div>
                )}
                {replyFor === c.id && (
                  <form
                    style={{
                      display: 'flex',
                      gap: '0.4rem',
                      marginTop: '0.55rem',
                    }}
                    onSubmit={(e) => {
                      e.preventDefault();
                      if (!replyText.trim()) return;
                      dispatch({
                        type: 'REPLY_COMMENT',
                        id: c.id,
                        text: replyText.trim(),
                      });
                      setReplyText('');
                      setReplyFor(null);
                    }}
                  >
                    <input
                      className="input"
                      style={{ flex: 1, height: 36 }}
                      placeholder={t('writeReplyPlaceholder')}
                      value={replyText}
                      onChange={(e) => setReplyText(e.target.value)}
                    />
                    <button className="btn btn-primary" style={{ height: 36 }}>
                      {t('sendBtn')}
                    </button>
                  </form>
                )}
              </div>
            ))}

            <form
              onSubmit={addComment}
              style={{ display: 'grid', gap: '0.55rem', marginTop: '0.5rem' }}
            >
              <textarea
                placeholder={t('addCommentPlaceholder')}
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              />
              <button className="btn btn-primary" type="submit">
                {t('addCommentBtn')}
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
