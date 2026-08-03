'use client';

import React from 'react';
import styles from './ReplayConsole.module.css';

interface ReplayLog {
  timestamp: string;
  corrId: string;
  block: number;
  status: 'VERIFIED' | 'COMPATIBLE' | 'BREACH' | 'REPLAYING';
  message: string;
}

interface ReplayConsoleProps {
  currentBlock?: number;
  totalBlocks?: number;
  corrId?: string;
  validationState?: 'VERIFIED' | 'VIOLATION' | 'SYNCING';
  replayLogs?: ReplayLog[];
  isSimulating?: boolean;
}

export default function ReplayConsole({
  currentBlock = 1208,
  totalBlocks = 2400,
  corrId = 'CORR-2026-0528-9941X',
  validationState = 'VERIFIED',
  replayLogs = [
    { timestamp: '15:14:02', corrId: 'CORR-2026-0528-9941X', block: 1208, status: 'VERIFIED', message: 'Ingestion schema contract match on Varanasi-seaplane' },
    { timestamp: '15:13:58', corrId: 'CORR-2026-0528-9940Y', block: 1207, status: 'COMPATIBLE', message: 'Backward compatibility validated for Patna terminal payload' },
    { timestamp: '15:13:50', corrId: 'CORR-2026-0528-9939Z', block: 1206, status: 'VERIFIED', message: 'State synchronization check matched (0ms deviation)' }
  ],
  isSimulating = true
}: ReplayConsoleProps) {
  
  const getStatusClass = (status: string) => {
    switch (status) {
      case 'VERIFIED': return styles.statusVerified;
      case 'COMPATIBLE': return styles.statusCompatible;
      case 'BREACH': return styles.statusBreach;
      case 'REPLAYING': return styles.statusReplaying;
      default: return '';
    }
  };

  const getOverallStateColor = (state: string) => {
    switch (state) {
      case 'VERIFIED': return 'var(--teal)';
      case 'VIOLATION': return 'var(--alert-red)';
      case 'SYNCING': return 'var(--amber)';
      default: return 'var(--text-dim)';
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div>
          <span className={styles.title}>DETERMINISTIC REPLAY PIPELINE</span>
          <p className={styles.subtitle}>Read-Only Observability Console</p>
        </div>
        <div className={styles.badge}>
          <span className={styles.badgePulse}></span>
          <span>OBSERVER MODE</span>
        </div>
      </div>

      {/* Charts — SVACS style */}
      <div className={styles.chartsRow}>
        <div className={styles.chartCard}>
          <span className={styles.chartTitle}>Events Over Time</span>
          <svg viewBox="0 0 200 70" className={styles.lineChart} preserveAspectRatio="none">
            {[15, 30, 45, 60].map(y => (
              <line key={y} x1="0" y1={y} x2="200" y2={y} stroke="rgba(255,255,255,0.04)" strokeWidth="1" />
            ))}
            <polyline points="0,55 25,40 50,45 75,25 100,35 125,15 150,30 175,10 200,20"
              fill="none" stroke="var(--signal-cyan)" strokeWidth="1.5" />
            <polyline points="0,60 25,50 50,38 75,42 100,30 125,38 150,22 175,32 200,28"
              fill="none" stroke="var(--perception-green)" strokeWidth="1.5" />
            <polyline points="0,62 25,55 50,48 75,50 100,40 125,45 150,35 175,42 200,38"
              fill="none" stroke="var(--intelligence-purple)" strokeWidth="1.5" />
            <polyline points="0,65 25,60 50,55 75,52 100,48 125,50 150,45 175,50 200,46"
              fill="none" stroke="var(--state-amber)" strokeWidth="1.5" />
          </svg>
        </div>
        <div className={styles.chartCard}>
          <span className={styles.chartTitle}>Validation Status</span>
          <div className={styles.donutWrapper}>
            <svg viewBox="0 0 100 100" className={styles.donutChart}>
              <circle cx="50" cy="50" r="38" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="12" />
              <circle cx="50" cy="50" r="38" fill="none" stroke="var(--perception-green)" strokeWidth="12"
                strokeDasharray="168 240" strokeDashoffset="0" transform="rotate(-90 50 50)" />
              <circle cx="50" cy="50" r="38" fill="none" stroke="var(--state-amber)" strokeWidth="12"
                strokeDasharray="48 240" strokeDashoffset="-168" transform="rotate(-90 50 50)" />
              <circle cx="50" cy="50" r="38" fill="none" stroke="var(--alert-red)" strokeWidth="12"
                strokeDasharray="24 240" strokeDashoffset="-216" transform="rotate(-90 50 50)" />
              <text x="50" y="46" textAnchor="middle" fill="var(--text-primary)" fontSize="14" fontWeight="600" fontFamily="var(--font-sans)">100</text>
              <text x="50" y="58" textAnchor="middle" fill="var(--text-dim)" fontSize="8" fontFamily="var(--font-sans)" fontWeight="500">Total</text>
            </svg>
            <div className={styles.donutLegend}>
              <div className={styles.legendItem}><span className={styles.legendDot} style={{ background: 'var(--perception-green)' }}></span>Allow 70%</div>
              <div className={styles.legendItem}><span className={styles.legendDot} style={{ background: 'var(--state-amber)' }}></span>Flag 20%</div>
              <div className={styles.legendItem}><span className={styles.legendDot} style={{ background: 'var(--alert-red)' }}></span>Deny 10%</div>
            </div>
          </div>
        </div>
      </div>

      {/* Sync status ring */}
      <div className={styles.syncSection}>
        <svg viewBox="0 0 60 60" className={styles.syncRing}>
          <circle cx="30" cy="30" r="24" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="5" />
          <circle cx="30" cy="30" r="24" fill="none" stroke="var(--perception-green)" strokeWidth="5"
            strokeDasharray="150.8 150.8" strokeLinecap="round" transform="rotate(-90 30 30)" />
          <text x="30" y="28" textAnchor="middle" fill="var(--perception-green)" fontSize="11" fontWeight="600" fontFamily="var(--font-sans)">100%</text>
          <text x="30" y="38" textAnchor="middle" fill="var(--text-dim)" fontSize="7" fontFamily="var(--font-sans)" fontWeight="500">Sync</text>
        </svg>
        <div className={styles.syncDetails}>
          {['Signal Ingestion', 'Perception', 'Intelligence', 'State Engine', 'Bucket'].map(stage => (
            <div key={stage} className={styles.syncItem}>
              <span className={styles.syncCheck}>✓</span> {stage}
            </div>
          ))}
        </div>
      </div>

      <div className={styles.trackerGrid}>
        <div className={styles.trackerCard}>
          <span className={styles.label}>Correlation ID</span>
          <span className={styles.valueMono}>{corrId}</span>
        </div>
        <div className={styles.trackerCard}>
          <span className={styles.label}>Validation Hash</span>
          <span className={styles.valueMono} style={{ color: getOverallStateColor(validationState) }}>
            {validationState === 'VERIFIED' ? 'SHA-256 MATCHED' : validationState === 'VIOLATION' ? 'CONTRACT BREACH' : 'CALCULATING'}
          </span>
        </div>
      </div>

      <div className={styles.progressSection}>
        <div className={styles.progressInfo}>
          <span>Deterministic Block: <strong className={styles.valueMono}>{currentBlock} / {totalBlocks}</strong></span>
          <span className={styles.valueMono}>{isSimulating ? '1.2x Speed' : 'PAUSED'}</span>
        </div>
        <div className={styles.progressBar}>
          <div className={styles.progressFill} style={{ width: `${(currentBlock / totalBlocks) * 100}%` }}></div>
        </div>
      </div>

      {/* Contract & Compatibility Metrics */}
      <div className={styles.contractSection}>
        <span className={styles.sectionHeader}>ANKITA VALIDATION LAYER</span>
        <div className={styles.contractItem}>
          <span>JSON Schema Matcher</span>
          <span className={styles.chipGood}>100% PASS</span>
        </div>
        <div className={styles.contractItem}>
          <span>Backward compatibility contract</span>
          <span className={styles.chipGood}>SECURE</span>
        </div>
        <div className={styles.contractItem}>
          <span>Validation State</span>
          <span style={{ color: getOverallStateColor(validationState), fontWeight: 'bold' }}>{validationState}</span>
        </div>
      </div>

      {/* Chronological Audit Logs */}
      <div className={styles.auditSection}>
        <span className={styles.sectionHeader}>DETERMINISTIC LINEAGE LOGS</span>
        <div className={styles.logList}>
          {replayLogs.map((log, i) => (
            <div key={i} className={styles.logItem}>
              <div className={styles.logHeader}>
                <span className={styles.logTime}>{log.timestamp}</span>
                <span className={`${styles.logStatus} ${getStatusClass(log.status)}`}>{log.status}</span>
                <span className={styles.logBlock}>Block #{log.block}</span>
              </div>
              <p className={styles.logMsg}>{log.message}</p>
              <div className={styles.logFooter}>
                <span>Corr: {log.corrId}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
