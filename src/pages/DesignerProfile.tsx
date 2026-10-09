import { useState } from 'react';
import {
  Star, Award, MapPin, Phone, Mail, Globe, Edit3,
  ExternalLink, Plus, Camera, Briefcase, Share2
} from 'lucide-react';
import { useApp } from '../context/AppContext';

const PORTFOLIO_PROJECTS = [
  {
    id: 'port1',
    title: 'Tropical Modern Villa',
    location: 'Goa',
    year: '2025',
    category: 'Residential',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&q=80',
    rating: 4.9,
    review: '"Arjun transformed our villa beyond expectations. Stunning use of natural light and textures."',
    client: 'Mehta Family',
  },
  {
    id: 'port2',
    title: 'Corporate HQ Redesign',
    location: 'Mumbai',
    year: '2025',
    category: 'Commercial',
    image: 'https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=600&q=80',
    rating: 5.0,
    review: '"Our employees love the new space. Productivity is up and the design is award-worthy."',
    client: 'TechNova Ltd.',
  },
  {
    id: 'port3',
    title: 'Scandinavian Family Home',
    location: 'Pune',
    year: '2024',
    category: 'Residential',
    image: 'https://images.unsplash.com/photo-1565538810643-b5bdb714032a?w=600&q=80',
    rating: 4.8,
    review: '"Perfect blend of warmth and minimalism. Delivered on time and within budget."',
    client: 'Iyer Family',
  },
  {
    id: 'port4',
    title: 'Boutique Café Interior',
    location: 'Bangalore',
    year: '2024',
    category: 'Commercial',
    image: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=600&q=80',
    rating: 4.7,
    review: '"Our café has become an Instagram hotspot. The ambience is exactly what we dreamed of."',
    client: 'Brew & Co.',
  },
  {
    id: 'port5',
    title: 'Luxury Penthouse Suite',
    location: 'Delhi',
    year: '2023',
    category: 'Residential',
    image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=600&q=80',
    rating: 5.0,
    review: '"Every detail was meticulously crafted. Living here feels like a 5-star experience daily."',
    client: 'Kapoor Enterprises',
  },
  {
    id: 'port6',
    title: 'Zen Spa & Wellness Center',
    location: 'Hyderabad',
    year: '2023',
    category: 'Commercial',
    image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=600&q=80',
    rating: 4.9,
    review: '"The tranquility Arjun designed is palpable. Clients feel the calm the moment they walk in."',
    client: 'Serenity Spa',
  },
];

const SKILLS = [
  'Space Planning', 'Colour Theory', '3D Visualisation', 'AutoCAD',
  'Sustainable Design', 'Lighting Design', 'Material Sourcing', 'Project Management',
  'Vastu Shastra', 'Budget Optimization',
];

const SPECIALIZATIONS = ['Residential', 'Commercial', 'Hospitality', 'Retail'];

export default function DesignerProfile() {
  const { state, t } = useApp();
  const [activeTab, setActiveTab] = useState<'portfolio' | 'reviews' | 'about'>('portfolio');
  const [catFilter, setCatFilter] = useState('All');

  const name = state.user?.name ?? 'Arjun Mehta';
  const initials = name.split(' ').map(n => n[0]).join('').slice(0, 2);

  const filtered = catFilter === 'All' ? PORTFOLIO_PROJECTS : PORTFOLIO_PROJECTS.filter(p => p.category === catFilter);

  return (
    <div style={{ maxWidth: 1280, margin: '0 auto' }}>
      {/* Profile Hero Card */}
      <div
        className="card"
        style={{
          background: 'linear-gradient(135deg, rgba(24,183,160,0.08) 0%, rgba(16,43,56,0.04) 100%)',
          padding: '1.75rem',
          marginBottom: '1.75rem',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'flex-start', flexWrap: 'wrap' }}>
          {/* Avatar with Status */}
          <div style={{ position: 'relative', flexShrink: 0 }}>
            <div
              style={{
                width: 80,
                height: 80,
                borderRadius: '50%',
                background: 'linear-gradient(135deg, var(--teal), var(--navy-deep))',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '1.85rem',
                fontWeight: 800,
                color: '#fff',
                boxShadow: '0 4px 16px rgba(24,183,160,0.25)',
              }}
            >
              {initials}
            </div>
            <button
              aria-label="Change photo"
              style={{
                position: 'absolute',
                bottom: -2,
                right: -2,
                width: 28,
                height: 28,
                borderRadius: '50%',
                background: 'var(--teal)',
                border: '2px solid var(--surface)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
              }}
            >
              <Camera size={13} color="#fff" />
            </button>
          </div>

          {/* Designer Identity */}
          <div style={{ flex: '1 1 260px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', marginBottom: '0.25rem', flexWrap: 'wrap' }}>
              <h1 className="page-title" style={{ margin: 0, fontSize: 'var(--fs-xl)' }}>{name}</h1>
              <span className="badge badge-teal" style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                <Award size={12} /> {t('verified') || 'Verified Lead Designer'}
              </span>
            </div>

            <p style={{ color: 'var(--secondary)', fontSize: 'var(--fs-sm)', marginBottom: '0.65rem' }}>
              {t('designerTitle') || 'Senior Interior Architect & Spatial Consultant'}
            </p>

            {/* Specialization Tags */}
            <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap', marginBottom: '0.85rem' }}>
              {SPECIALIZATIONS.map(s => (
                <span key={s} className="badge badge-teal" style={{ fontSize: '0.7rem' }}>{s}</span>
              ))}
            </div>

            {/* Contact Metadata */}
            <div style={{ display: 'flex', gap: '1.25rem', flexWrap: 'wrap', fontSize: 'var(--fs-xs)', color: 'var(--secondary)' }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                <MapPin size={12} /> Mumbai, Maharashtra
              </span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                <Phone size={12} /> +91 98765 43210
              </span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                <Mail size={12} /> arjun.mehta@studio.com
              </span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                <Globe size={12} /> arjunmehta.design
              </span>
            </div>
          </div>

          {/* Stats & Quick Actions Block */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '1rem',
              alignItems: 'flex-start',
              flex: '0 0 auto',
            }}
          >
            {/* Action Buttons */}
            <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
              <button className="btn btn-secondary" style={{ fontSize: 'var(--fs-xs)', height: 34, padding: '0 0.85rem' }}>
                <Share2 size={13} /> {t('share') || 'Share'}
              </button>
              <button className="btn btn-secondary" style={{ fontSize: 'var(--fs-xs)', height: 34, padding: '0 0.85rem' }}>
                <ExternalLink size={13} /> {t('portfolio') || 'Public Link'}
              </button>
              <button className="btn btn-primary" style={{ fontSize: 'var(--fs-xs)', height: 34, padding: '0 0.95rem' }}>
                <Edit3 size={13} /> {t('editProfile') || 'Edit Profile'}
              </button>
            </div>

            {/* Metric counters */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(4, 1fr)',
                gap: '1rem',
                background: 'var(--surface)',
                padding: '0.65rem 1rem',
                borderRadius: 'var(--radius-sm)',
                border: '1px solid var(--border)',
                width: '100%',
              }}
            >
              {[
                { label: t('projects') || 'Projects', val: '48' },
                { label: t('clients') || 'Clients', val: '31' },
                { label: t('yearsExp') || 'Exp Years', val: '9+' },
                { label: t('avgRating') || 'Rating', val: '4.9 ★' },
              ].map(stat => (
                <div key={stat.label} style={{ textAlign: 'center' }}>
                  <strong style={{ fontSize: 'var(--fs-md)', display: 'block', color: 'var(--text)' }}>{stat.val}</strong>
                  <span style={{ fontSize: '0.68rem', color: 'var(--secondary)', fontWeight: 600 }}>{stat.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Segmented Tab Navigation */}
      <div
        style={{
          display: 'flex',
          gap: '0.4rem',
          borderBottom: '1px solid var(--border)',
          marginBottom: '1.5rem',
          paddingBottom: '0.5rem',
        }}
      >
        {(['portfolio', 'reviews', 'about'] as const).map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`chip ${activeTab === tab ? 'active' : ''}`}
            style={{ fontSize: 'var(--fs-sm)', height: 36, padding: '0 1.15rem' }}
          >
            {tab === 'portfolio' ? (t('portfolioTab') || 'Featured Portfolio') :
             tab === 'reviews' ? (t('reviewsTab') || 'Client Testimonials') :
             (t('aboutTab') || 'Qualifications & Skills')}
          </button>
        ))}
      </div>

      {/* Portfolio Tab Content */}
      {activeTab === 'portfolio' && (
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem', flexWrap: 'wrap', gap: '0.5rem' }}>
            <div style={{ display: 'flex', gap: '0.4rem' }}>
              {['All', 'Residential', 'Commercial'].map(cat => (
                <button
                  key={cat}
                  onClick={() => setCatFilter(cat)}
                  className={`chip ${catFilter === cat ? 'active' : ''}`}
                  style={{ fontSize: 'var(--fs-xs)', height: 32, padding: '0 0.8rem' }}
                >
                  {cat}
                </button>
              ))}
            </div>
            <button className="btn btn-secondary" style={{ fontSize: 'var(--fs-xs)', height: 34, padding: '0 0.85rem' }}>
              <Plus size={13} /> {t('addProject') || 'Add Project'}
            </button>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
              gap: '1.25rem',
            }}
          >
            {filtered.map(proj => (
              <div
                key={proj.id}
                className="card"
                style={{
                  padding: 0,
                  overflow: 'hidden',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                }}
              >
                <div>
                  <div style={{ position: 'relative', height: 180, overflow: 'hidden' }}>
                    <img
                      src={proj.image}
                      alt={proj.title}
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                      loading="lazy"
                    />
                    <span
                      className="badge badge-teal"
                      style={{
                        position: 'absolute',
                        top: '0.75rem',
                        right: '0.75rem',
                        boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
                      }}
                    >
                      {proj.category}
                    </span>
                  </div>

                  <div style={{ padding: '0.85rem 1rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.2rem' }}>
                      <h3 style={{ fontWeight: 800, fontSize: 'var(--fs-md)', margin: 0 }}>{proj.title}</h3>
                    </div>
                    <p style={{ fontSize: 'var(--fs-xs)', color: 'var(--secondary)', display: 'flex', alignItems: 'center', gap: '0.3rem', marginBottom: '0.65rem' }}>
                      <MapPin size={11} /> {proj.location} · {proj.year} · {proj.client}
                    </p>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', marginBottom: '0.5rem' }}>
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} size={13} fill={i < Math.floor(proj.rating) ? '#f59e0b' : 'none'} color="#f59e0b" />
                      ))}
                      <span style={{ fontSize: 'var(--fs-xs)', fontWeight: 700, color: 'var(--text)', marginLeft: '0.25rem' }}>
                        {proj.rating}
                      </span>
                    </div>

                    <p style={{ fontSize: 'var(--fs-xs)', color: 'var(--secondary)', fontStyle: 'italic', lineHeight: 1.4, margin: 0 }}>
                      {proj.review}
                    </p>
                  </div>
                </div>

                <div style={{ padding: '0 1rem 1rem' }}>
                  <button className="btn btn-secondary" style={{ width: '100%', fontSize: 'var(--fs-xs)', height: 34 }}>
                    <Briefcase size={13} /> {t('viewCaseStudy') || 'View Case Study'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Reviews Tab Content */}
      {activeTab === 'reviews' && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.25rem' }}>
          {PORTFOLIO_PROJECTS.map(proj => (
            <div key={proj.id} className="card" style={{ padding: '1.25rem', display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
              <img
                src={proj.image}
                alt=""
                style={{ width: 64, height: 64, borderRadius: 'var(--radius-sm)', objectFit: 'cover', flexShrink: 0 }}
                loading="lazy"
              />
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.25rem' }}>
                  <div>
                    <p style={{ fontWeight: 700, fontSize: 'var(--fs-sm)', margin: 0 }}>{proj.client}</p>
                    <p style={{ fontSize: 'var(--fs-xs)', color: 'var(--secondary)', margin: 0 }}>
                      {proj.title} ({proj.location})
                    </p>
                  </div>
                  <div style={{ display: 'flex', gap: '0.15rem', flexShrink: 0 }}>
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={12} fill={i < Math.floor(proj.rating) ? '#f59e0b' : 'none'} color="#f59e0b" />
                    ))}
                  </div>
                </div>
                <p style={{ fontSize: 'var(--fs-xs)', color: 'var(--text)', fontStyle: 'italic', lineHeight: 1.4, marginTop: '0.35rem' }}>
                  {proj.review}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* About & Skills Tab Content */}
      {activeTab === 'about' && (
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '1.5rem',
          }}
        >
          {/* Biography & Certifications */}
          <div className="card" style={{ padding: '1.5rem' }}>
            <h2 style={{ fontSize: 'var(--fs-md)', fontWeight: 800, marginBottom: '0.75rem' }}>
              {t('aboutMe') || 'Design Philosophy'}
            </h2>
            <p style={{ fontSize: 'var(--fs-sm)', color: 'var(--secondary)', lineHeight: 1.6, marginBottom: '1.25rem' }}>
              {t('designerBio') || 'Over 9 years of specialized spatial design experience across India. Focused on harmonious architectural proportions, natural material blending, and modern ergonomic standards.'}
            </p>

            <h3 style={{ fontSize: 'var(--fs-sm)', fontWeight: 700, marginBottom: '0.65rem' }}>
              {t('certifications') || 'Credentials & Accreditations'}
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              {[
                { label: 'B.Des in Interior Architecture', sub: 'National Institute of Design, 2015' },
                { label: 'PG Diploma in Sustainable Lighting', sub: 'CEPT University, 2017' },
                { label: 'GRIHA Certified Green Space Consultant', sub: '2019' },
              ].map(edu => (
                <div key={edu.label} style={{ display: 'flex', gap: '0.65rem', alignItems: 'flex-start', background: 'var(--light-gray)', padding: '0.6rem 0.75rem', borderRadius: 'var(--radius-sm)' }}>
                  <Award size={16} style={{ color: 'var(--teal-dark)', marginTop: '0.1rem', flexShrink: 0 }} />
                  <div>
                    <p style={{ fontSize: 'var(--fs-xs)', fontWeight: 700, margin: 0 }}>{edu.label}</p>
                    <p style={{ fontSize: '0.7rem', color: 'var(--secondary)', margin: 0 }}>{edu.sub}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Core Competencies */}
          <div className="card" style={{ padding: '1.5rem' }}>
            <h2 style={{ fontSize: 'var(--fs-md)', fontWeight: 800, marginBottom: '0.75rem' }}>
              {t('skills') || 'Core Competencies'}
            </h2>
            <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap', marginBottom: '1.25rem' }}>
              {SKILLS.map(skill => (
                <span
                  key={skill}
                  className="chip"
                  style={{ fontSize: 'var(--fs-xs)', height: 30, padding: '0 0.75rem' }}
                >
                  {skill}
                </span>
              ))}
            </div>

            <h3 style={{ fontSize: 'var(--fs-sm)', fontWeight: 700, marginBottom: '0.65rem' }}>
              {t('skillProficiency') || 'Proficiency Ratings'}
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {[
                { skill: 'Space Planning & 3D Drafting', pct: 98 },
                { skill: 'Photorealistic AR Rendering', pct: 94 },
                { skill: 'Sustainable Material Sourcing', pct: 88 },
                { skill: 'Budget & Milestone Management', pct: 92 },
              ].map(s => (
                <div key={s.skill}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 'var(--fs-xs)', fontWeight: 600, marginBottom: '0.25rem' }}>
                    <span>{s.skill}</span>
                    <span style={{ color: 'var(--teal-dark)' }}>{s.pct}%</span>
                  </div>
                  <div className="progress" style={{ margin: 0, height: 6 }}>
                    <span style={{ width: `${s.pct}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

