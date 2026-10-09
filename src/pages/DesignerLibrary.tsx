import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Search, Sofa, Lamp, Coffee, BookOpen, Grid3X3,
  Star, Plus, SlidersHorizontal, Tag, Package, Check
} from 'lucide-react';
import { FURNITURE } from '../data/catalog';
import { useApp } from '../context/AppContext';

const CATEGORIES = ['All', 'Sofas', 'Tables', 'Chairs', 'Lighting', 'Storage', 'Decor'];
const BRANDS = ['All Brands', 'Urban Ladder', 'Pepperfry', 'IKEA', 'Godrej Interio', 'Custom'];
const STYLE_TAGS = ['Modern', 'Scandinavian', 'Industrial', 'Bohemian', 'Minimalist', 'Classic'];

const CAT_ICONS: Record<string, React.ComponentType<{size?: number}>> = {
  Sofas: Sofa, Tables: Coffee, Chairs: BookOpen,
  Lighting: Lamp, Storage: Package, Decor: Grid3X3,
};

const SAVED_COLLECTIONS = [
  { id: 'c1', name: 'Riya – Living Room', count: 8, thumb: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=300&q=75' },
  { id: 'c2', name: 'Priya – Bedroom Set', count: 5, thumb: 'https://images.unsplash.com/photo-1616594039964-ae9021a400a0?w=300&q=75' },
  { id: 'c3', name: 'Vikram – Office Suite', count: 6, thumb: 'https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?w=300&q=75' },
];

export default function DesignerLibrary() {
  const { t, dispatch } = useApp();
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');
  const [brand, setBrand] = useState('All Brands');
  const [activeTags, setActiveTags] = useState<string[]>([]);
  const [showFilters, setShowFilters] = useState(false);
  const [favorites, setFavorites] = useState<string[]>([]);

  const toggleTag = (tag: string) =>
    setActiveTags(prev => prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]);
  const toggleFav = (id: string) =>
    setFavorites(prev => prev.includes(id) ? prev.filter(f => f !== id) : [...prev, id]);

  const filtered = FURNITURE.filter(item => {
    const matchCat = category === 'All' || item.category === category;
    const matchSearch = item.name.toLowerCase().includes(search.toLowerCase()) ||
      item.material.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  return (
    <div style={{ maxWidth: 1280, margin: '0 auto' }}>
      {/* Page Title */}
      <div style={{ marginBottom: '1.5rem' }}>
        <h1 className="page-title">{t('designerLibraryTitle') || 'Material & Product Catalog'}</h1>
        <p className="page-sub">
          {t('designerLibrarySub') || 'Curated collection of 3D furniture models, fabrics, and verified finishes.'}
        </p>
      </div>

      {/* Search + Filter Bar */}
      <div
        style={{
          display: 'flex',
          gap: '0.75rem',
          marginBottom: '1.25rem',
          flexWrap: 'wrap',
          alignItems: 'center',
        }}
      >
        <div style={{ position: 'relative', flex: '1 1 260px' }}>
          <Search
            size={16}
            style={{
              position: 'absolute',
              left: '0.85rem',
              top: '50%',
              transform: 'translateY(-50%)',
              color: 'var(--secondary)',
              pointerEvents: 'none',
            }}
          />
          <input
            type="search"
            className="input"
            placeholder={t('searchMaterials') || 'Search furniture, fabrics, finishes…'}
            value={search}
            onChange={e => setSearch(e.target.value)}
            style={{ width: '100%', paddingLeft: '2.5rem', height: 40 }}
          />
        </div>

        <select
          value={brand}
          onChange={e => setBrand(e.target.value)}
          className="input"
          style={{ height: 40, padding: '0 1rem', flex: '0 0 auto' }}
        >
          {BRANDS.map(b => <option key={b}>{b}</option>)}
        </select>

        <button
          className={`btn ${showFilters ? 'btn-primary' : 'btn-secondary'}`}
          onClick={() => setShowFilters(s => !s)}
          style={{ height: 40, padding: '0 1rem' }}
        >
          <SlidersHorizontal size={15} /> {t('filters') || 'Style Filter'}
        </button>
      </div>

      {/* Style Tag Drawer */}
      {showFilters && (
        <div
          className="card"
          style={{
            display: 'flex',
            gap: '0.5rem',
            flexWrap: 'wrap',
            marginBottom: '1.25rem',
            padding: '0.85rem 1rem',
            background: 'var(--light-gray)',
            alignItems: 'center',
          }}
        >
          <span style={{ fontSize: 'var(--fs-xs)', fontWeight: 700, color: 'var(--secondary)', display: 'flex', alignItems: 'center', gap: '0.35rem', marginRight: '0.25rem' }}>
            <Tag size={13} /> {t('styleFilter') || 'Styles:'}
          </span>
          {STYLE_TAGS.map(tag => (
            <button
              key={tag}
              onClick={() => toggleTag(tag)}
              className={`chip ${activeTags.includes(tag) ? 'active' : ''}`}
              style={{ fontSize: 'var(--fs-xs)', height: 32, padding: '0 0.75rem' }}
            >
              {activeTags.includes(tag) && <Check size={12} style={{ marginRight: '0.25rem' }} />}
              {tag}
            </button>
          ))}
        </div>
      )}

      {/* Category Tabs */}
      <div
        style={{
          display: 'flex',
          gap: '0.4rem',
          marginBottom: '1.75rem',
          overflowX: 'auto',
          paddingBottom: '0.35rem',
        }}
      >
        {CATEGORIES.map(cat => {
          const CatIcon = CAT_ICONS[cat];
          const isActive = category === cat;
          return (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              className={`chip ${isActive ? 'active' : ''}`}
              style={{
                fontSize: 'var(--fs-sm)',
                height: 36,
                padding: '0 0.95rem',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.4rem',
                flexShrink: 0,
              }}
            >
              {CatIcon && <CatIcon size={14} />} {cat}
            </button>
          );
        })}
      </div>

      {/* Saved Collections Row */}
      <div style={{ marginBottom: '2rem' }}>
        <div className="section-head" style={{ marginBottom: '0.75rem' }}>
          <div>
            <h2 style={{ fontSize: 'var(--fs-md)', fontWeight: 800, margin: 0 }}>
              {t('savedCollections') || 'Saved Client Collections'}
            </h2>
            <p style={{ fontSize: 'var(--fs-xs)', color: 'var(--secondary)', margin: '0.15rem 0 0 0' }}>
              {t('savedCollectionsSub') || 'Quick-access moodboards organized per client.'}
            </p>
          </div>
          <button
            className="btn btn-secondary"
            style={{ fontSize: 'var(--fs-xs)', height: 34, padding: '0 0.85rem' }}
          >
            <Plus size={13} /> {t('newCollection') || 'New Collection'}
          </button>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: '1rem',
          }}
        >
          {SAVED_COLLECTIONS.map(col => (
            <div
              key={col.id}
              className="card"
              style={{
                cursor: 'pointer',
                padding: 0,
                overflow: 'hidden',
                transition: 'transform var(--transition), box-shadow var(--transition)',
              }}
            >
              <div style={{ height: 110, overflow: 'hidden' }}>
                <img
                  src={col.thumb}
                  alt={col.name}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  loading="lazy"
                />
              </div>
              <div style={{ padding: '0.75rem' }}>
                <p style={{ fontSize: 'var(--fs-sm)', fontWeight: 700, marginBottom: '0.15rem' }}>{col.name}</p>
                <p style={{ fontSize: 'var(--fs-xs)', color: 'var(--secondary)', margin: 0 }}>
                  {col.count} {t('items') || 'items saved'}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Catalog Grid Header */}
      <div className="section-head" style={{ marginBottom: '0.85rem' }}>
        <h2 style={{ fontSize: 'var(--fs-md)', fontWeight: 800, margin: 0 }}>
          {t('allProducts') || 'Available Models & Materials'}
          <span style={{ fontSize: 'var(--fs-xs)', color: 'var(--secondary)', fontWeight: 600, marginLeft: '0.5rem' }}>
            ({filtered.length} {t('itemsFound') || 'items'})
          </span>
        </h2>
      </div>

      {/* Products Grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(230px, 1fr))',
          gap: '1.25rem',
        }}
      >
        {filtered.map(item => {
          const isFav = favorites.includes(item.id);
          return (
            <div
              key={item.id}
              className="card"
              style={{
                padding: 0,
                overflow: 'hidden',
                position: 'relative',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
              }}
            >
              {/* Fav Bookmark Button */}
              <button
                onClick={() => toggleFav(item.id)}
                aria-label="Save to favorites"
                style={{
                  position: 'absolute',
                  top: '0.65rem',
                  right: '0.65rem',
                  zIndex: 2,
                  background: 'rgba(16, 43, 56, 0.75)',
                  border: 'none',
                  borderRadius: '50%',
                  width: 32,
                  height: 32,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  backdropFilter: 'blur(6px)',
                  color: isFav ? '#f59e0b' : '#fff',
                }}
              >
                <Star size={14} fill={isFav ? '#f59e0b' : 'none'} />
              </button>

              <div>
                {/* Media frame */}
                <div
                  style={{
                    height: 155,
                    background: 'var(--light-gray)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    overflow: 'hidden',
                  }}
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    loading="lazy"
                    onError={e => { (e.target as HTMLImageElement).style.display = 'none'; }}
                  />
                </div>

                {/* Card details */}
                <div style={{ padding: '0.85rem' }}>
                  <h3 style={{ fontWeight: 700, fontSize: 'var(--fs-sm)', marginBottom: '0.2rem' }}>
                    {item.name}
                  </h3>
                  <p style={{ fontSize: 'var(--fs-xs)', color: 'var(--secondary)', marginBottom: '0.5rem' }}>
                    {item.material} · {item.category}
                  </p>

                  {/* Color dots preview */}
                  <div style={{ display: 'flex', gap: '0.35rem', flexWrap: 'wrap', marginBottom: '0.75rem', alignItems: 'center' }}>
                    {item.colors.slice(0, 4).map(c => (
                      <div
                        key={c.hex}
                        title={c.name}
                        style={{
                          width: 14,
                          height: 14,
                          borderRadius: '50%',
                          background: c.hex,
                          border: '1px solid var(--border)',
                        }}
                      />
                    ))}
                    {item.colors.length > 4 && (
                      <span style={{ fontSize: '0.65rem', color: 'var(--secondary)', fontWeight: 700 }}>
                        +{item.colors.length - 4}
                      </span>
                    )}
                  </div>

                  <p style={{ fontSize: 'var(--fs-sm)', fontWeight: 800, margin: 0, color: 'var(--text)' }}>
                    ₹{item.price.toLocaleString('en-IN')}
                  </p>
                </div>
              </div>

              {/* Action Buttons */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: '0.4rem', padding: '0 0.85rem 0.85rem' }}>
                <button
                  className="btn btn-primary"
                  style={{ fontSize: 'var(--fs-xs)', height: 34 }}
                  onClick={() => {
                    dispatch({ type: 'ADD_FURNITURE', item });
                    navigate('/editor');
                  }}
                >
                  {t('addToDesign') || 'Add to Studio'}
                </button>
                <button
                  className="btn btn-secondary"
                  style={{ fontSize: 'var(--fs-xs)', height: 34, padding: '0 0.75rem' }}
                  onClick={() => toggleFav(item.id)}
                >
                  {isFav ? 'Saved' : (t('save') || 'Save')}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

