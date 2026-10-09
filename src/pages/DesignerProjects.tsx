import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Plus, Clock, CheckCircle2, AlertCircle, MessageSquare,
  ChevronRight, Calendar, IndianRupee, Filter, ArrowUpRight
} from 'lucide-react';
import { useApp } from '../context/AppContext';

interface ClientProject {
  id: string;
  clientName: string;
  clientAvatar: string;
  projectName: string;
  roomType: string;
  budget: string;
  deadline: string;
  status: 'In Progress' | 'Pending Approval' | 'Approved' | 'Revision Requested';
  progress: number;
  openComments: number;
  coverImage: string;
  lastActivity: string;
}

const PROJECTS: ClientProject[] = [
  {
    id: 'p1',
    clientName: 'Riya Sharma',
    clientAvatar: 'RS',
    projectName: 'Modern Living Room Revamp',
    roomType: 'Living Room',
    budget: '₹1,20,000',
    deadline: 'Oct 25, 2026',
    status: 'Pending Approval',
    progress: 85,
    openComments: 3,
    coverImage: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=600&q=80',
    lastActivity: '2 hrs ago',
  },
  {
    id: 'p2',
    clientName: 'Priya Nair',
    clientAvatar: 'PN',
    projectName: 'Scandinavian Bedroom',
    roomType: 'Bedroom',
    budget: '₹85,000',
    deadline: 'Nov 5, 2026',
    status: 'In Progress',
    progress: 52,
    openComments: 1,
    coverImage: 'https://images.unsplash.com/photo-1616594039964-ae9021a400a0?w=600&q=80',
    lastActivity: '1 day ago',
  },
  {
    id: 'p3',
    clientName: 'Vikram Joshi',
    clientAvatar: 'VJ',
    projectName: 'Minimalist Home Office',
    roomType: 'Office',
    budget: '₹60,000',
    deadline: 'Nov 15, 2026',
    status: 'Revision Requested',
    progress: 70,
    openComments: 5,
    coverImage: 'https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?w=600&q=80',
    lastActivity: '3 hrs ago',
  },
  {
    id: 'p4',
    clientName: 'Meera Iyer',
    clientAvatar: 'MI',
    projectName: 'Luxury Kitchen Redesign',
    roomType: 'Kitchen',
    budget: '₹2,50,000',
    deadline: 'Sep 30, 2026',
    status: 'Approved',
    progress: 100,
    openComments: 0,
    coverImage: 'https://images.unsplash.com/photo-1556912173-46c336c7fd55?w=600&q=80',
    lastActivity: '5 days ago',
  },
  {
    id: 'p5',
    clientName: 'Aryan Kapoor',
    clientAvatar: 'AK',
    projectName: 'Urban Studio Flat',
    roomType: 'Living Room',
    budget: '₹95,000',
    deadline: 'Dec 1, 2026',
    status: 'In Progress',
    progress: 30,
    openComments: 0,
    coverImage: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=600&q=80',
    lastActivity: '2 days ago',
  },
];

const STATUS_CONFIG = {
  'In Progress': { cls: 'badge-teal', icon: Clock },
  'Pending Approval': { cls: 'badge-warn', icon: AlertCircle },
  'Approved': { cls: 'badge-success', icon: CheckCircle2 },
  'Revision Requested': { cls: 'badge-danger', icon: AlertCircle },
};

export default function DesignerProjects() {
  const { t } = useApp();
  const navigate = useNavigate();
  const [filter, setFilter] = useState<string>('All');
  const [expanded, setExpanded] = useState<string | null>(null);

  const filters = ['All', 'In Progress', 'Pending Approval', 'Approved', 'Revision Requested'];
  const filtered = filter === 'All' ? PROJECTS : PROJECTS.filter(p => p.status === filter);

  const stats = {
    total: PROJECTS.length,
    inProgress: PROJECTS.filter(p => p.status === 'In Progress').length,
    pendingApproval: PROJECTS.filter(p => p.status === 'Pending Approval').length,
    approved: PROJECTS.filter(p => p.status === 'Approved').length,
  };

  return (
    <div style={{ maxWidth: 1280, margin: '0 auto' }}>
      {/* Header section */}
      <div style={{ marginBottom: '1.5rem' }}>
        <h1 className="page-title">
          {t('designerProjectsTitle') || 'Client Projects & Approvals'}
        </h1>
        <p className="page-sub">
          {t('designerProjectsSub') || 'Manage all your active client engagements and track approval status.'}
        </p>
      </div>

      {/* Metrics Row */}
      <div className="grid-stats">
        <div className="card stat-card">
          <span>{t('totalClients') || 'Total Clients'}</span>
          <strong>{stats.total}</strong>
          <em>{t('activeEngagements') || 'Active engagements'}</em>
        </div>
        <div className="card stat-card">
          <span>{t('inProgress') || 'In Progress'}</span>
          <strong>{stats.inProgress}</strong>
          <em>{t('beingDesigned') || 'Being designed'}</em>
        </div>
        <div className="card stat-card">
          <span>{t('awaitingApproval') || 'Awaiting Approval'}</span>
          <strong style={{ color: 'var(--text)' }}>{stats.pendingApproval}</strong>
          <em style={{ color: '#b45309' }}>{t('clientReview') || 'Client review needed'}</em>
        </div>
        <div className="card stat-card">
          <span>{t('completedApproved') || 'Approved'}</span>
          <strong style={{ color: 'var(--text)' }}>{stats.approved}</strong>
          <em style={{ color: 'var(--success)' }}>{t('readyHandoff') || 'Ready for handoff'}</em>
        </div>
      </div>

      {/* Filter and Action Bar */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: '0.75rem',
          marginBottom: '1.5rem',
          flexWrap: 'wrap',
        }}
      >
        <div style={{ display: 'flex', gap: '0.4rem', alignItems: 'center', flexWrap: 'wrap' }}>
          <Filter size={15} style={{ color: 'var(--secondary)', marginRight: '0.2rem' }} />
          {filters.map(f => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`chip ${filter === f ? 'active' : ''}`}
              style={{ fontSize: 'var(--fs-xs)', height: 34, padding: '0 0.85rem' }}
            >
              {t(f) || f}
            </button>
          ))}
        </div>
        <button
          className="btn btn-primary"
          onClick={() => navigate('/new-design')}
          style={{ height: 38, padding: '0 1.15rem' }}
        >
          <Plus size={16} /> {t('newProject') || 'New Project'}
        </button>
      </div>

      {/* Projects Grid */}
      <div className="project-grid">
        {filtered.map(p => {
          const { cls, icon: StatusIcon } = STATUS_CONFIG[p.status];
          const isExpanded = expanded === p.id;

          return (
            <article
              key={p.id}
              className="card project-card"
              style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
              }}
            >
              <div>
                {/* Card Media Preview */}
                <div className="project-card-media">
                  <img src={p.coverImage} alt={p.projectName} loading="lazy" />
                  <span
                    className={`badge ${cls}`}
                    style={{
                      position: 'absolute',
                      top: '0.75rem',
                      right: '0.75rem',
                      boxShadow: '0 2px 8px rgba(0,0,0,0.18)',
                    }}
                  >
                    <StatusIcon size={12} /> {t(p.status) || p.status}
                  </span>
                  {p.openComments > 0 && (
                    <span
                      style={{
                        position: 'absolute',
                        top: '0.75rem',
                        left: '0.75rem',
                        background: 'rgba(16, 43, 56, 0.82)',
                        backdropFilter: 'blur(8px)',
                        borderRadius: '999px',
                        padding: '0.2rem 0.65rem',
                        fontSize: 'var(--fs-xs)',
                        fontWeight: 700,
                        color: '#fff',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.35rem',
                      }}
                    >
                      <MessageSquare size={11} /> {p.openComments}
                    </span>
                  )}
                </div>

                {/* Card Content Body */}
                <div className="project-card-body">
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.65rem' }}>
                    <div
                      style={{
                        width: 28,
                        height: 28,
                        borderRadius: '50%',
                        background: 'linear-gradient(135deg, var(--teal), var(--navy-deep))',
                        color: '#fff',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '0.7rem',
                        fontWeight: 800,
                        flexShrink: 0,
                      }}
                    >
                      {p.clientAvatar}
                    </div>
                    <div>
                      <h3 style={{ margin: 0, fontSize: 'var(--fs-md)', lineHeight: 1.25 }}>{p.projectName}</h3>
                      <p style={{ margin: 0, fontSize: 'var(--fs-xs)', color: 'var(--secondary)' }}>
                        {p.clientName} · {p.roomType}
                      </p>
                    </div>
                  </div>

                  {/* Metadata Row */}
                  <div className="meta-row" style={{ marginBottom: '0.75rem' }}>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                      <IndianRupee size={12} /> {p.budget}
                    </span>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                      <Calendar size={12} /> {p.deadline}
                    </span>
                    <span style={{ marginLeft: 'auto', opacity: 0.85 }}>
                      {p.lastActivity}
                    </span>
                  </div>

                  {/* Progress Indicator */}
                  <div style={{ marginBottom: '1rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 'var(--fs-xs)', color: 'var(--secondary)', fontWeight: 600, marginBottom: '0.35rem' }}>
                      <span>{t('progress') || 'Progress'}</span>
                      <span>{p.progress}%</span>
                    </div>
                    <div className="progress" style={{ margin: 0 }}>
                      <span
                        style={{
                          width: `${p.progress}%`,
                          background: p.status === 'Revision Requested'
                            ? '#d97706'
                            : p.status === 'Approved'
                            ? 'var(--success)'
                            : undefined,
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Card Footer Actions */}
              <div style={{ padding: '0 1.1rem 1.15rem' }}>
                {p.status === 'Pending Approval' || p.status === 'Revision Requested' ? (
                  <div>
                    <button
                      className="btn btn-secondary"
                      style={{ width: '100%', fontSize: 'var(--fs-sm)', height: 38, marginBottom: isExpanded ? '0.75rem' : 0 }}
                      onClick={() => setExpanded(isExpanded ? null : p.id)}
                    >
                      <MessageSquare size={14} />
                      {isExpanded
                        ? (t('hideApproval') || 'Hide Feedback')
                        : (t('viewApproval') || 'View Client Feedback')}
                      <ChevronRight
                        size={14}
                        style={{
                          transform: isExpanded ? 'rotate(90deg)' : 'none',
                          transition: 'transform 0.2s',
                          marginLeft: 'auto',
                        }}
                      />
                    </button>

                    {isExpanded && (
                      <div
                        style={{
                          background: 'var(--light-gray)',
                          borderRadius: 'var(--radius-sm)',
                          padding: '0.85rem',
                          display: 'flex',
                          flexDirection: 'column',
                          gap: '0.65rem',
                          marginTop: '0.5rem',
                        }}
                      >
                        <p style={{ fontSize: 'var(--fs-xs)', fontWeight: 700, color: 'var(--secondary)', margin: 0 }}>
                          {t('clientFeedback') || 'Client Note & Status'}
                        </p>
                        {p.status === 'Pending Approval' ? (
                          <div
                            style={{
                              fontSize: 'var(--fs-sm)',
                              color: 'var(--text)',
                              padding: '0.55rem 0.75rem',
                              background: 'var(--surface)',
                              borderRadius: '6px',
                              border: '1px solid var(--border)',
                              lineHeight: 1.4,
                            }}
                          >
                            💬 "{t('waitingClientFeedback') || 'Awaiting client review. Sent for approval 2 hrs ago.'}"
                          </div>
                        ) : (
                          <div
                            style={{
                              fontSize: 'var(--fs-sm)',
                              color: 'var(--text)',
                              padding: '0.55rem 0.75rem',
                              background: 'rgba(213, 160, 40, 0.12)',
                              borderRadius: '6px',
                              border: '1px solid rgba(213, 160, 40, 0.3)',
                              lineHeight: 1.4,
                            }}
                          >
                            ✏️ "{t('revisionNote') || 'Please replace the accent chair with something in olive green. Also adjust lighting near the window.'}"
                          </div>
                        )}
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem' }}>
                          <button
                            className="btn btn-primary"
                            style={{ fontSize: 'var(--fs-xs)', height: 34 }}
                            onClick={() => navigate('/editor')}
                          >
                            {t('openInStudio') || 'Open Studio'}
                          </button>
                          <button
                            className="btn btn-secondary"
                            style={{ fontSize: 'var(--fs-xs)', height: 34 }}
                            onClick={() => navigate('/collaboration')}
                          >
                            {t('goToCollab') || 'Collaboration'}
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  <button
                    className="btn btn-secondary"
                    style={{ width: '100%', fontSize: 'var(--fs-sm)', height: 38 }}
                    onClick={() => navigate('/editor')}
                  >
                    <span>{p.status === 'Approved' ? (t('viewDesign') || 'View Final Design') : (t('openInStudio') || 'Open Studio')}</span>
                    <ArrowUpRight size={15} style={{ marginLeft: 'auto' }} />
                  </button>
                )}
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
}

