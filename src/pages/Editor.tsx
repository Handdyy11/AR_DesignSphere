import {
  useEffect,
  useMemo,
  useRef,
  useState,
  type PointerEvent as ReactPointerEvent,
} from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Undo2,
  Redo2,
  Save,
  View,
  Share2,
  Move,
  RotateCw,
  Maximize2,
  Search,
  SlidersHorizontal,
  Trash2,
  FlipHorizontal,
  RotateCcw,
  Sparkles,
  Layers,
} from 'lucide-react';
import { FURNITURE, type FurnitureCategory } from '../data/catalog';
import { useApp } from '../context/AppContext';
import ColorSwatches from '../components/ColorSwatches';
import FurnitureVisual from '../components/FurnitureVisual';

const CATS: Array<{ id: FurnitureCategory; key: string }> = [
  { id: 'All', key: 'catAll' },
  { id: 'Sofas', key: 'catSofas' },
  { id: 'Tables', key: 'catTables' },
  { id: 'Chairs', key: 'catChairs' },
  { id: 'Lighting', key: 'catLighting' },
  { id: 'Storage', key: 'catStorage' },
  { id: 'Decor', key: 'catDecor' },
];

export default function Editor() {
  const { state, dispatch, getFurniture, roomImage, t } = useApp();
  const navigate = useNavigate();
  const canvasRef = useRef<HTMLDivElement>(null);
  const [cat, setCat] = useState<FurnitureCategory>('All');
  const [query, setQuery] = useState('');
  const [tool, setTool] = useState<'move' | 'rotate' | 'resize'>('move');
  const [drag, setDrag] = useState<{
    id: string;
    x: number;
    y: number;
    ox: number;
    oy: number;
  } | null>(null);
  const dragRef = useRef(drag);
  useEffect(() => {
    dragRef.current = drag;
  }, [drag]);

  const catalog = useMemo(() => {
    return FURNITURE.filter((f) => {
      const catOk = cat === 'All' || f.category === cat;
      const q = query.trim().toLowerCase();
      const qOk = !q || f.name.toLowerCase().includes(q);
      return catOk && qOk;
    });
  }, [cat, query]);

  const selected = state.placedFurniture.find(
    (p) => p.instanceId === state.selectedInstanceId,
  );
  const selectedItem = selected
    ? getFurniture(selected.furnitureId)
    : undefined;

  const pointerToPercent = (clientX: number, clientY: number) => {
    const rect = canvasRef.current?.getBoundingClientRect();
    if (!rect) return { x: 50, y: 50 };
    return {
      x: Math.min(92, Math.max(8, ((clientX - rect.left) / rect.width) * 100)),
      y: Math.min(90, Math.max(12, ((clientY - rect.top) / rect.height) * 100)),
    };
  };

  const startDrag = (
    e: ReactPointerEvent<HTMLDivElement>,
    id: string,
    currentX: number,
    currentY: number,
  ) => {
    if ((e.target as HTMLElement).closest('.tool-float')) return;
    e.preventDefault();
    e.stopPropagation();
    dispatch({ type: 'SELECT_INSTANCE', id });
    setTool('move');
    const pos = pointerToPercent(e.clientX, e.clientY);
    setDrag({
      id,
      x: currentX,
      y: currentY,
      ox: pos.x - currentX,
      oy: pos.y - currentY,
    });
    e.currentTarget.setPointerCapture(e.pointerId);
  };

  const onDragMove = (e: ReactPointerEvent<HTMLDivElement>) => {
    const pos = pointerToPercent(e.clientX, e.clientY);
    setDrag((prev) => {
      if (!prev) return prev;
      return {
        ...prev,
        x: Math.min(92, Math.max(8, pos.x - prev.ox)),
        y: Math.min(90, Math.max(12, pos.y - prev.oy)),
      };
    });
  };

  const endDrag = (e: ReactPointerEvent<HTMLDivElement>) => {
    const prev = dragRef.current;
    if (prev) {
      dispatch({
        type: 'UPDATE_INSTANCE',
        id: prev.id,
        updates: { x: prev.x, y: prev.y },
      });
    }
    setDrag(null);
    try {
      e.currentTarget.releasePointerCapture(e.pointerId);
    } catch {
      /* already released */
    }
  };

  const applyTool = (tTool: 'move' | 'rotate' | 'resize') => {
    setTool(tTool);
    if (!selected || tTool === 'move') return;
    if (tTool === 'rotate') {
      dispatch({
        type: 'UPDATE_INSTANCE',
        id: selected.instanceId,
        updates: { rotation: (selected.rotation + 15) % 360 },
      });
    } else {
      dispatch({
        type: 'UPDATE_INSTANCE',
        id: selected.instanceId,
        updates: {
          scale: Math.min(1.6, +(selected.scale + 0.1).toFixed(2)),
        },
      });
    }
  };

  return (
    <>
      <div className="section-head">
        <div>
          <h1 className="page-title" style={{ marginBottom: 0 }}>
            {t('editorTitle')}
          </h1>
          <p className="page-sub" style={{ marginBottom: 0 }}>
            {t('editorSub')}
          </p>
        </div>
      </div>

      <div className="toolbar">
        <button
          className="btn btn-secondary"
          onClick={() => dispatch({ type: 'UNDO' })}
          disabled={state.historyIndex <= 0}
        >
          <Undo2 size={16} /> {t('undoBtn')}
        </button>
        <button
          className="btn btn-secondary"
          onClick={() => dispatch({ type: 'REDO' })}
          disabled={state.historyIndex >= state.history.length - 1}
        >
          <Redo2 size={16} /> {t('redoBtn')}
        </button>
        <button
          className="btn btn-secondary"
          onClick={() => dispatch({ type: 'SAVE' })}
        >
          <Save size={16} /> {t('saveBtn')}
        </button>
        <button
          className="btn btn-primary"
          onClick={() => navigate('/ar-preview')}
        >
          <View size={16} /> {t('arPreviewBtn')}
        </button>
        <button
          className="btn btn-secondary"
          onClick={() =>
            dispatch({ type: 'SAVE', message: 'Share link copied' })
          }
        >
          <Share2 size={16} /> {t('shareBtn')}
        </button>
        <button
          className="btn btn-ghost"
          onClick={() => navigate('/ai-assistant')}
        >
          {t('aiAssistantBtn')}
        </button>
        <button
          className="btn btn-ghost"
          onClick={() => navigate('/collaboration')}
        >
          {t('collaborateBtn')}
        </button>
      </div>

      <div className="editor-layout">
        <aside className="panel">
          <div className="panel-head">{t('furnitureCatalog')}</div>
          <div className="panel-body">
            <div className="field" style={{ marginBottom: '0.75rem' }}>
              <div style={{ position: 'relative' }}>
                <Search
                  size={16}
                  style={{
                    position: 'absolute',
                    left: 12,
                    top: '50%',
                    transform: 'translateY(-50%)',
                    color: 'var(--secondary)',
                  }}
                />
                <input
                  className="input"
                  style={{ paddingLeft: 36, width: '100%' }}
                  placeholder={t('searchFurniture')}
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                />
              </div>
            </div>
            <div
              className="prompt-chips"
              style={{ marginBottom: '0.85rem', marginTop: 0 }}
            >
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
            <div className="catalog-grid">
              {catalog.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  className="catalog-item"
                  onClick={() =>
                    dispatch({ type: 'ADD_FURNITURE', item })
                  }
                >
                  <div className="catalog-item-media">
                    <img src={item.image} alt={item.name} />
                  </div>
                  <div className="catalog-item-body">
                    <strong>{t(item.name)}</strong>
                    <span>₹{item.price.toLocaleString()}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </aside>

        <section>
          <div
            className={`canvas${drag ? ' is-dragging' : ''}`}
            ref={canvasRef}
          >
            <img className="room" src={roomImage} alt="Design room" draggable={false} />
            <div className="ar-overlay" style={{ opacity: 0.35 }} />
            {state.placedFurniture.map((p) => {
              const item = getFurniture(p.furnitureId);
              if (!item) return null;
              const isSelected = p.instanceId === state.selectedInstanceId;
              const isDragging = drag?.id === p.instanceId;
              const x = isDragging ? drag.x : p.x;
              const y = isDragging ? drag.y : p.y;
              const scaleX = p.scaleX ?? 1;
              const scaleY = p.scaleY ?? 1;
              const flipFactor = p.flipX ? -1 : 1;
              const stickerStyle = p.stickerStyle ?? 'diecut';

              return (
                <div
                  key={p.instanceId}
                  className={`placed-item${isSelected ? ' selected' : ''}${isDragging ? ' dragging' : ''}`}
                  style={{
                    left: `${x}%`,
                    top: `${y}%`,
                    transform: `translate(-50%, -50%) rotate(${p.rotation}deg) scale(${p.scale * scaleX * flipFactor}, ${p.scale * scaleY})`,
                    width: p.size === 'Large' ? 170 : p.size === 'Small' ? 110 : 140,
                    cursor: tool === 'move' || isDragging ? 'grab' : 'pointer',
                  }}
                  onPointerDown={(e) => startDrag(e, p.instanceId, p.x, p.y)}
                  onPointerMove={onDragMove}
                  onPointerUp={endDrag}
                  onPointerCancel={endDrag}
                  onDoubleClick={() => {
                    dispatch({ type: 'SET_CUSTOMIZING', id: p.instanceId });
                    navigate('/customize');
                  }}
                >
                  {isSelected && (
                    <>
                      {/* Top floating quick toolbar */}
                      <div className="tool-float">
                        <button
                          title={t('moveLabel')}
                          className={tool === 'move' ? 'active' : ''}
                          onPointerDown={(e) => e.stopPropagation()}
                          onClick={(e) => {
                            e.stopPropagation();
                            setTool('move');
                          }}
                        >
                          <Move size={14} />
                        </button>
                        <button
                          title={t('rotateLabel')}
                          onPointerDown={(e) => e.stopPropagation()}
                          onClick={(e) => {
                            e.stopPropagation();
                            setTool('rotate');
                            dispatch({
                              type: 'UPDATE_INSTANCE',
                              id: p.instanceId,
                              updates: { rotation: (p.rotation + 15) % 360 },
                            });
                          }}
                        >
                          <RotateCw size={14} />
                        </button>
                        <button
                          title={t('resizeLabel')}
                          onPointerDown={(e) => e.stopPropagation()}
                          onClick={(e) => {
                            e.stopPropagation();
                            setTool('resize');
                            dispatch({
                              type: 'UPDATE_INSTANCE',
                              id: p.instanceId,
                              updates: {
                                scale: Math.min(2.0, +(p.scale + 0.1).toFixed(2)),
                              },
                            });
                          }}
                        >
                          <Maximize2 size={14} />
                        </button>
                        <button
                          title={t('flipHorizontal')}
                          onPointerDown={(e) => e.stopPropagation()}
                          onClick={(e) => {
                            e.stopPropagation();
                            dispatch({
                              type: 'UPDATE_INSTANCE',
                              id: p.instanceId,
                              updates: { flipX: !p.flipX },
                            });
                          }}
                        >
                          <FlipHorizontal size={14} />
                        </button>
                        <button
                          title={t('customizeLabel')}
                          onPointerDown={(e) => e.stopPropagation()}
                          onClick={(e) => {
                            e.stopPropagation();
                            dispatch({
                              type: 'SET_CUSTOMIZING',
                              id: p.instanceId,
                            });
                            navigate('/customize');
                          }}
                        >
                          <SlidersHorizontal size={14} />
                        </button>
                        <button
                          title={t('deleteFromDesign')}
                          onPointerDown={(e) => e.stopPropagation()}
                          onClick={(e) => {
                            e.stopPropagation();
                            dispatch({
                              type: 'DELETE_INSTANCE',
                              id: p.instanceId,
                            });
                          }}
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>

                      {/* Interactive Canvas Reshape & Resize Handles */}
                      <div
                        className="sticker-handle rotate"
                        title={t('rotateLabel')}
                        onPointerDown={(e) => {
                          e.stopPropagation();
                          dispatch({
                            type: 'UPDATE_INSTANCE',
                            id: p.instanceId,
                            updates: { rotation: (p.rotation + 15) % 360 },
                          });
                        }}
                      >
                        <RotateCw size={10} />
                      </div>
                      <div
                        className="sticker-handle nw"
                        title={t('resizeLabel')}
                        onPointerDown={(e) => {
                          e.stopPropagation();
                          dispatch({
                            type: 'UPDATE_INSTANCE',
                            id: p.instanceId,
                            updates: { scale: Math.max(0.5, +(p.scale - 0.08).toFixed(2)) },
                          });
                        }}
                      />
                      <div
                        className="sticker-handle ne"
                        title={t('resizeLabel')}
                        onPointerDown={(e) => {
                          e.stopPropagation();
                          dispatch({
                            type: 'UPDATE_INSTANCE',
                            id: p.instanceId,
                            updates: { scale: Math.min(2.0, +(p.scale + 0.08).toFixed(2)) },
                          });
                        }}
                      />
                      <div
                        className="sticker-handle se"
                        title={t('resizeLabel')}
                        onPointerDown={(e) => {
                          e.stopPropagation();
                          dispatch({
                            type: 'UPDATE_INSTANCE',
                            id: p.instanceId,
                            updates: { scale: Math.min(2.0, +(p.scale + 0.08).toFixed(2)) },
                          });
                        }}
                      />
                      <div
                        className="sticker-handle sw"
                        title={t('resizeLabel')}
                        onPointerDown={(e) => {
                          e.stopPropagation();
                          dispatch({
                            type: 'UPDATE_INSTANCE',
                            id: p.instanceId,
                            updates: { scale: Math.max(0.5, +(p.scale - 0.08).toFixed(2)) },
                          });
                        }}
                      />
                      {/* Width stretch handles */}
                      <div
                        className="sticker-handle w"
                        title={t('reshapeWidthLabel')}
                        onPointerDown={(e) => {
                          e.stopPropagation();
                          dispatch({
                            type: 'UPDATE_INSTANCE',
                            id: p.instanceId,
                            updates: { scaleX: Math.max(0.5, +((p.scaleX ?? 1) - 0.1).toFixed(2)) },
                          });
                        }}
                      />
                      <div
                        className="sticker-handle e"
                        title={t('reshapeWidthLabel')}
                        onPointerDown={(e) => {
                          e.stopPropagation();
                          dispatch({
                            type: 'UPDATE_INSTANCE',
                            id: p.instanceId,
                            updates: { scaleX: Math.min(2.0, +((p.scaleX ?? 1) + 0.1).toFixed(2)) },
                          });
                        }}
                      />
                      {/* Depth/Height stretch handles */}
                      <div
                        className="sticker-handle n"
                        title={t('reshapeDepthLabel')}
                        onPointerDown={(e) => {
                          e.stopPropagation();
                          dispatch({
                            type: 'UPDATE_INSTANCE',
                            id: p.instanceId,
                            updates: { scaleY: Math.max(0.5, +((p.scaleY ?? 1) - 0.1).toFixed(2)) },
                          });
                        }}
                      />
                      <div
                        className="sticker-handle s"
                        title={t('reshapeDepthLabel')}
                        onPointerDown={(e) => {
                          e.stopPropagation();
                          dispatch({
                            type: 'UPDATE_INSTANCE',
                            id: p.instanceId,
                            updates: { scaleY: Math.min(2.0, +((p.scaleY ?? 1) + 0.1).toFixed(2)) },
                          });
                        }}
                      />
                    </>
                  )}
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
          </div>
          <div
            style={{
              display: 'flex',
              gap: '0.5rem',
              marginTop: '0.75rem',
              flexWrap: 'wrap',
              alignItems: 'center',
            }}
          >
            {(['move', 'rotate', 'resize'] as const).map((tMode) => (
              <button
                key={tMode}
                className={`chip${tool === tMode ? ' active' : ''}`}
                onClick={() => applyTool(tMode)}
              >
                {tMode === 'move' && <Move size={14} />}
                {tMode === 'rotate' && <RotateCw size={14} />}
                {tMode === 'resize' && <Maximize2 size={14} />}
                {tMode === 'move' ? t('moveLabel') : tMode === 'rotate' ? t('rotateLabel') : t('resizeLabel')}
              </button>
            ))}
            <span className="empty-hint" style={{ padding: 0 }}>
              {t('dragHint')}
            </span>
          </div>
        </section>

        <aside className="panel">
          <div className="panel-head">{t('objectProps')}</div>
          <div className="panel-body">
            {!selected || !selectedItem ? (
              <p className="empty-hint">{t('selectOnCanvas')}</p>
            ) : (
              <div className="props-list">
                <div className="row">
                  <span>{t('Name')}</span>
                  <strong>{t(selectedItem.name)}</strong>
                </div>
                <div className="row">
                  <span>{t('priceLabel')}</span>
                  <strong>₹{selectedItem.price.toLocaleString()}</strong>
                </div>
                <div className="row">
                  <span>{t('Width')}</span>
                  <strong>{selectedItem.width}"</strong>
                </div>
                <div className="row">
                  <span>{t('Depth')}</span>
                  <strong>{selectedItem.depth}"</strong>
                </div>
                <div className="row">
                  <span>{t('Height')}</span>
                  <strong>{selectedItem.height}"</strong>
                </div>
                <div className="row">
                  <span>{t('materialLabel')}</span>
                  <strong>{t(selected.material)}</strong>
                </div>

                {/* Sticker Cutout Style Selector */}
                <div style={{ marginTop: '0.25rem' }}>
                  <div style={{ fontSize: 'var(--fs-xs)', fontWeight: 700, marginBottom: '0.35rem', color: 'var(--secondary)' }}>
                    {t('stickerModeLabel')}
                  </div>
                  <div className="sticker-style-toggle">
                    <button
                      type="button"
                      className={`sticker-style-btn${(selected.stickerStyle ?? 'diecut') === 'diecut' ? ' active' : ''}`}
                      onClick={() =>
                        dispatch({
                          type: 'UPDATE_INSTANCE',
                          id: selected.instanceId,
                          updates: { stickerStyle: 'diecut' },
                        })
                      }
                    >
                      <Layers size={13} /> {t('Die-Cut')}
                    </button>
                    <button
                      type="button"
                      className={`sticker-style-btn${selected.stickerStyle === 'seamless' ? ' active' : ''}`}
                      onClick={() =>
                        dispatch({
                          type: 'UPDATE_INSTANCE',
                          id: selected.instanceId,
                          updates: { stickerStyle: 'seamless' },
                        })
                      }
                    >
                      <Sparkles size={13} /> {t('Seamless')}
                    </button>
                  </div>
                </div>

                {/* Sticker Reshape & Stretch Sliders */}
                <div className="reshape-box">
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontWeight: 700, color: 'var(--text)', fontSize: 'var(--fs-xs)' }}>
                      {t('reshapeLabel')}
                    </span>
                    <button
                      type="button"
                      className="linkish"
                      style={{ fontSize: 'var(--fs-xs)' }}
                      onClick={() =>
                        dispatch({
                          type: 'UPDATE_INSTANCE',
                          id: selected.instanceId,
                          updates: { scale: 1, scaleX: 1, scaleY: 1, rotation: 0, flipX: false },
                        })
                      }
                    >
                      <RotateCcw size={12} style={{ display: 'inline', marginRight: 3 }} />
                      {t('resetShape')}
                    </button>
                  </div>

                  <div className="reshape-row">
                    <div className="reshape-row-header">
                      <span>{t('Scale')}</span>
                      <strong>{selected.scale.toFixed(2)}x</strong>
                    </div>
                    <input
                      type="range"
                      min={0.5}
                      max={2.0}
                      step={0.05}
                      value={selected.scale}
                      onChange={(e) =>
                        dispatch({
                          type: 'UPDATE_INSTANCE',
                          id: selected.instanceId,
                          updates: { scale: parseFloat(e.target.value) },
                        })
                      }
                    />
                  </div>

                  <div className="reshape-row">
                    <div className="reshape-row-header">
                      <span>{t('reshapeWidthLabel')}</span>
                      <strong>{(selected.scaleX ?? 1).toFixed(2)}x</strong>
                    </div>
                    <input
                      type="range"
                      min={0.5}
                      max={2.0}
                      step={0.05}
                      value={selected.scaleX ?? 1}
                      onChange={(e) =>
                        dispatch({
                          type: 'UPDATE_INSTANCE',
                          id: selected.instanceId,
                          updates: { scaleX: parseFloat(e.target.value) },
                        })
                      }
                    />
                  </div>

                  <div className="reshape-row">
                    <div className="reshape-row-header">
                      <span>{t('reshapeDepthLabel')}</span>
                      <strong>{(selected.scaleY ?? 1).toFixed(2)}x</strong>
                    </div>
                    <input
                      type="range"
                      min={0.5}
                      max={2.0}
                      step={0.05}
                      value={selected.scaleY ?? 1}
                      onChange={(e) =>
                        dispatch({
                          type: 'UPDATE_INSTANCE',
                          id: selected.instanceId,
                          updates: { scaleY: parseFloat(e.target.value) },
                        })
                      }
                    />
                  </div>

                  <div className="reshape-row">
                    <div className="reshape-row-header">
                      <span>{t('rotateLabel')}</span>
                      <strong>{selected.rotation}°</strong>
                    </div>
                    <input
                      type="range"
                      min={0}
                      max={359}
                      step={5}
                      value={selected.rotation}
                      onChange={(e) =>
                        dispatch({
                          type: 'UPDATE_INSTANCE',
                          id: selected.instanceId,
                          updates: { rotation: parseInt(e.target.value, 10) },
                        })
                      }
                    />
                  </div>

                  <div style={{ display: 'flex', gap: '0.4rem', marginTop: '0.2rem' }}>
                    <button
                      type="button"
                      className={`btn btn-secondary${selected.flipX ? ' active' : ''}`}
                      style={{ flex: 1, height: 34, fontSize: 'var(--fs-xs)' }}
                      onClick={() =>
                        dispatch({
                          type: 'UPDATE_INSTANCE',
                          id: selected.instanceId,
                          updates: { flipX: !selected.flipX },
                        })
                      }
                    >
                      <FlipHorizontal size={13} /> {t('flipHorizontal')}
                    </button>
                    <button
                      type="button"
                      className="btn btn-secondary"
                      style={{ height: 34, fontSize: 'var(--fs-xs)', padding: '0 0.6rem' }}
                      onClick={() =>
                        dispatch({
                          type: 'UPDATE_INSTANCE',
                          id: selected.instanceId,
                          updates: { rotation: (selected.rotation + 45) % 360 },
                        })
                      }
                    >
                      +45°
                    </button>
                  </div>
                </div>

                {/* Color and Material */}
                <div>
                  <div
                    style={{
                      fontSize: 'var(--fs-sm)',
                      fontWeight: 600,
                      marginBottom: '0.55rem',
                    }}
                  >
                    {t('colorLabel')} — {t(selected.color)}
                  </div>
                  <ColorSwatches
                    colors={selectedItem.colors}
                    selected={selected.color}
                    onSelect={(name, hex) =>
                      dispatch({
                        type: 'SET_COLOR',
                        id: selected.instanceId,
                        color: name,
                        colorHex: hex,
                      })
                    }
                  />

                  {/* Custom Color Picker input */}
                  <div className="custom-color-picker-row">
                    <input
                      type="color"
                      value={selected.colorHex}
                      onChange={(e) =>
                        dispatch({
                          type: 'SET_COLOR',
                          id: selected.instanceId,
                          color: 'Custom Color',
                          colorHex: e.target.value,
                        })
                      }
                    />
                    <span style={{ fontSize: 'var(--fs-xs)', color: 'var(--secondary)' }}>
                      {t('pickColor')} ({selected.colorHex})
                    </span>
                  </div>
                </div>

                <button
                  className="btn btn-primary"
                  style={{ width: '100%', marginTop: '0.5rem' }}
                  onClick={() => {
                    dispatch({
                      type: 'SET_CUSTOMIZING',
                      id: selected.instanceId,
                    });
                    navigate('/customize');
                  }}
                >
                  {t('customizeLabel')}
                </button>
                <button
                  className="btn btn-danger"
                  style={{ width: '100%' }}
                  onClick={() =>
                    dispatch({
                      type: 'DELETE_INSTANCE',
                      id: selected.instanceId,
                    })
                  }
                >
                  <Trash2 size={15} /> {t('deleteFromDesign')}
                </button>
              </div>
            )}
          </div>
        </aside>
      </div>
    </>
  );
}

