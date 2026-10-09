import { useMemo, useRef, useState, type ChangeEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { Check, Upload } from 'lucide-react';
import { ROOM_PHOTOS, type RoomCategory } from '../data/catalog';
import { useApp } from '../context/AppContext';

const CATS: Array<{ id: RoomCategory | 'All'; key: string }> = [
  { id: 'All', key: 'catAll' },
  { id: 'Living Room', key: 'catLivingRoom' },
  { id: 'Bedroom', key: 'catBedroom' },
  { id: 'Kitchen', key: 'catKitchen' },
  { id: 'Office', key: 'catOffice' },
];

export default function RoomPhotoBrowser() {
  const { state, dispatch, t } = useApp();
  const navigate = useNavigate();
  const [tab, setTab] = useState<'browse' | 'upload'>('browse');
  const [cat, setCat] = useState<(typeof CATS)[number]['id']>('All');
  const fileRef = useRef<HTMLInputElement>(null);

  const photos = useMemo(
    () =>
      cat === 'All'
        ? ROOM_PHOTOS
        : ROOM_PHOTOS.filter((p) => p.category === cat),
    [cat],
  );

  const selectedId = state.selectedRoom?.id;

  const onUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    dispatch({ type: 'UPLOAD_ROOM', url });
    setTab('upload');
  };

  return (
    <>
      <h1 className="page-title">{t('chooseRoomTitle')}</h1>
      <p className="page-sub">{t('chooseRoomSub')}</p>

      <div className="tabs">
        <button
          className={tab === 'browse' ? 'active' : ''}
          onClick={() => setTab('browse')}
        >
          {t('browseTab')}
        </button>
        <button
          className={tab === 'upload' ? 'active' : ''}
          onClick={() => setTab('upload')}
        >
          {t('uploadTab')}
        </button>
      </div>

      {tab === 'browse' && (
        <>
          <div className="prompt-chips" style={{ marginBottom: '1rem' }}>
            {CATS.map(({ id, key }) => (
              <button
                key={id}
                className={`chip${cat === id ? ' active' : ''}`}
                onClick={() => setCat(id)}
              >
                {t(key)}
              </button>
            ))}
          </div>
          <div className="photo-grid">
            {photos.map((photo) => (
              <button
                key={photo.id}
                type="button"
                className={`photo-card${selectedId === photo.id ? ' selected' : ''}`}
                onClick={() => dispatch({ type: 'SET_ROOM', room: photo })}
              >
                <img src={photo.image} alt={t(photo.name)} />
                <div className="caption">
                  {t(photo.name)}
                  <div style={{ fontWeight: 500, opacity: 0.85 }}>
                    {t(photo.category)} · {t(photo.size)}
                  </div>
                </div>
                {selectedId === photo.id && (
                  <span className="check-mark">
                    <Check size={14} />
                  </span>
                )}
              </button>
            ))}
          </div>
        </>
      )}

      {tab === 'upload' && (
        <div className="card" style={{ padding: '1.5rem' }}>
          <div
            style={{
              border: '1.5px dashed var(--border)',
              borderRadius: 14,
              padding: '2.5rem',
              textAlign: 'center',
              background: 'var(--light-gray)',
            }}
          >
            <Upload size={28} color="var(--teal)" style={{ margin: '0 auto' }} />
            <h3 style={{ margin: '0.85rem 0 0.35rem' }}>{t('uploadPhotoTitle')}</h3>
            <p className="page-sub" style={{ marginBottom: '1rem' }}>
              {t('uploadPhotoDesc')}
            </p>
            <input
              ref={fileRef}
              type="file"
              accept="image/*"
              hidden
              onChange={onUpload}
            />
            <button
              className="btn btn-primary"
              onClick={() => fileRef.current?.click()}
            >
              {t('chooseFileBtn')}
            </button>
          </div>

          {state.uploadedRoomUrl && (
            <div style={{ marginTop: '1.25rem' }}>
              <h3 style={{ marginBottom: '0.75rem' }}>{t('uploadedSelection')}</h3>
              <div
                className="photo-card selected"
                style={{ maxWidth: 420, cursor: 'default' }}
              >
                <img src={state.uploadedRoomUrl} alt="Uploaded room" />
                <div className="caption">{t('uploadedSelection')}</div>
                <span className="check-mark">
                  <Check size={14} />
                </span>
              </div>
            </div>
          )}
        </div>
      )}

      <div className="footer-actions">
        <button className="btn btn-ghost" onClick={() => navigate('/new-design')}>
          {t('backBtn')}
        </button>
        <button
          className="btn btn-primary"
          disabled={!state.selectedRoom}
          onClick={() => {
            dispatch({ type: 'SET_SCAN', state: 'scanning' });
            navigate('/room-setup');
          }}
        >
          {t('continueSelected')}
        </button>
      </div>
    </>
  );
}
