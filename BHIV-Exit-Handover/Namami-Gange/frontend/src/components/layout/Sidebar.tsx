'use client';

import React from 'react';
import styles from './Sidebar.module.css';

const navItems = [
  { id: 'global', label: 'Global Operations', icon: '🌐' },
  { id: 'basin', label: 'Ganga Basin Intel', icon: '🌊' },
  { id: 'location', label: 'Location Intel', icon: '📍' },
  { id: 'simulation', label: 'Scenario Simulation', icon: '🔮' },
  { id: 'signals', label: 'Realtime Signals', icon: '📡' },
  { id: 'infra', label: 'Infra Network', icon: '🏗️' },
  { id: 'collab', label: 'Collaboration', icon: '💬' },
  { id: 'governance', label: 'Governance View', icon: '🏛️' },
  { id: 'datasets', label: 'Dataset Management', icon: '📊' },
];

interface SidebarProps {
  activeTab: string;
  onTabChange: (id: string) => void;
  collapsed: boolean;
  onToggle: () => void;
}

export default function Sidebar({ activeTab, onTabChange, collapsed, onToggle }: SidebarProps) {
  return (
    <aside className={`${styles.sidebar} ${collapsed ? styles.collapsed : ''}`}>
      <div className={styles.logo}>
        <div className={styles.logoIcon}>NG</div>
        {!collapsed && (
          <div className={styles.logoText}>
            <span className={styles.brand}>NAMAMI GANGE</span>
            <span className={styles.sub}>Intel Surface</span>
          </div>
        )}
        <button
          type="button"
          className={styles.toggleBtn}
          onClick={onToggle}
          aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          title={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          {collapsed ? '›' : '‹'}
        </button>
      </div>

      <nav className={styles.nav}>
        {!collapsed && <div className={styles.sectionLabel}>Operational Domains</div>}
        {navItems.map(item => (
          <div
            key={item.id}
            className={`${styles.navItem} ${activeTab === item.id ? styles.active : ''}`}
            onClick={() => onTabChange(item.id)}
            title={collapsed ? item.label : undefined}
          >
            <span className={styles.icon}>{item.icon}</span>
            {!collapsed && <span className={styles.label}>{item.label}</span>}
          </div>
        ))}
      </nav>

      <div className={styles.footer}>
        <div className={styles.user}>
          <div className={styles.avatar}>JD</div>
          {!collapsed && (
            <div className={styles.userInfo}>
              <div className={styles.userName}>J. Dosanjh</div>
              <div className={styles.userRole}>Chief Ops Officer</div>
            </div>
          )}
        </div>
      </div>
    </aside>
  );
}
