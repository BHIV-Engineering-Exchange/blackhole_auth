'use client';

import React from 'react';
import styles from './FederationTopology.module.css';

export interface ServiceNode {
  id: string;
  label: string;
  status: 'active' | 'processing' | 'recovering' | 'offline' | 'error';
  metric: string;
}

export interface FederationTopologyProps {
  nodes?: ServiceNode[];
  activeStep?: number;
  latencyMs?: number;
  activePacketSource?: string;
  activePacketTarget?: string;
}

const STAGE_COLORS = [
  'var(--signal-cyan)',
  'var(--perception-green)',
  'var(--intelligence-purple)',
  'var(--state-amber)',
  'var(--vessel-blue)',
];

const STAGE_ICONS = ['📡', '👁', '◈', '⚙', '🔗'];

const STAGE_COUNTS = [60, 20, 45, 100, 20];

export default function FederationTopology({
  nodes = [
    { id: 'ingest', label: 'Signal', status: 'active', metric: '4.8k msg/s' },
    { id: 'valid', label: 'Perception', status: 'processing', metric: '100% Match' },
    { id: 'replay', label: 'Intelligence', status: 'active', metric: '1.2x Speed' },
    { id: 'persist', label: 'State', status: 'active', metric: '4ms Delay' },
    { id: 'federate', label: 'Bucket', status: 'active', metric: '99.9% Sync' }
  ],
  activeStep = 0,
  latencyMs = 8
}: FederationTopologyProps) {

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'var(--signal-cyan)';
      case 'processing': return 'var(--vessel-blue)';
      case 'recovering': return 'var(--state-amber)';
      case 'offline': return 'var(--text-dim)';
      case 'error': return 'var(--alert-red)';
      default: return 'var(--text-dim)';
    }
  };

  const shortLabels = ['Signal', 'Perception', 'Intelligence', 'State', 'Bucket'];

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div>
          <span className={styles.topLabel}>FEDERATION RUNTIME</span>
          <h4 className={styles.title}>Pipeline Flow</h4>
        </div>
        <span className={styles.latency}>
          <span className={styles.dot}></span> Live Sync (Δ: {latencyMs}ms)
        </span>
      </div>

      {/* SVACS-style horizontal pipeline */}
      <div className={styles.pipeline}>
        {nodes.map((node, i) => (
          <React.Fragment key={node.id}>
            {i > 0 && <span className={styles.pipelineArrow}>→</span>}
            <div
              className={`${styles.pipelineStage} ${activeStep === i ? styles.pipelineStageActive : ''}`}
              style={{ '--stage-color': STAGE_COLORS[i] } as React.CSSProperties}
            >
              <div
                className={styles.stageIcon}
                style={{ background: `color-mix(in srgb, ${STAGE_COLORS[i]} 18%, transparent)`, color: STAGE_COLORS[i] }}
              >
                {STAGE_ICONS[i]}
              </div>
              <span className={styles.stageLabel}>{shortLabels[i]}</span>
              <span className={styles.stageCount}>{STAGE_COUNTS[i]}</span>
              <span className={styles.stageMetric}>{node.metric}</span>
            </div>
          </React.Fragment>
        ))}
      </div>

      {/* Compact network topology graph */}
      <div className={styles.svgWrapper}>
        <svg viewBox="0 0 320 100" className={styles.svg}>
          <defs>
            <linearGradient id="lineGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="var(--signal-cyan)" stopOpacity="0.3" />
              <stop offset="50%" stopColor="var(--intelligence-purple)" stopOpacity="0.6" />
              <stop offset="100%" stopColor="var(--vessel-blue)" stopOpacity="0.3" />
            </linearGradient>
          </defs>

          {/* Grid lines */}
          {[20, 40, 60, 80].map(y => (
            <line key={y} x1="10" y1={y} x2="310" y2={y} stroke="rgba(255,255,255,0.04)" strokeWidth="1" />
          ))}

          {/* Multi-series line chart */}
          <polyline
            points="10,70 50,55 90,60 130,35 170,45 210,25 250,40 290,20 310,30"
            fill="none" stroke="var(--signal-cyan)" strokeWidth="1.5" opacity="0.9"
          />
          <polyline
            points="10,75 50,65 90,50 130,55 170,40 210,50 250,35 290,45 310,38"
            fill="none" stroke="var(--perception-green)" strokeWidth="1.5" opacity="0.9"
          />
          <polyline
            points="10,80 50,70 90,65 130,50 170,55 210,42 250,50 290,55 310,48"
            fill="none" stroke="var(--intelligence-purple)" strokeWidth="1.5" opacity="0.9"
          />
          <polyline
            points="10,85 50,78 90,72 130,68 170,62 210,58 250,60 290,65 310,58"
            fill="none" stroke="var(--state-amber)" strokeWidth="1.5" opacity="0.9"
          />

          {/* Active packet on topology path */}
          <path d="M 30 50 L 290 50" fill="none" stroke="url(#lineGrad)" strokeWidth="2" strokeDasharray="4,3" opacity="0.5" />
          <circle cx={30 + activeStep * 65} cy="50" r="4" fill={STAGE_COLORS[activeStep]} className={styles.packetPulse}>
            <animate attributeName="opacity" values="1;0.5;1" dur="1.5s" repeatCount="indefinite" />
          </circle>

          {/* Node dots */}
          {nodes.map((node, i) => (
            <g key={node.id} transform={`translate(${30 + i * 65}, 50)`}>
              <circle r="8" fill="var(--deep-navy)" stroke={getStatusColor(node.status)} strokeWidth="1.5"
                className={activeStep === i ? styles.activeNode : ''} />
              <circle r="2.5" fill={getStatusColor(node.status)} />
            </g>
          ))}

          <text x="10" y="96" fill="var(--text-dim)" fontSize="9" fontFamily="var(--font-sans)" fontWeight="500">Events over time</text>
        </svg>
      </div>

      <div className={styles.matrixGrid}>
        <div className={styles.matrixItem}>
          <span className={styles.matrixLabel}>Uptime</span>
          <span className={styles.matrixVal}>99.98%</span>
        </div>
        <div className={styles.matrixItem}>
          <span className={styles.matrixLabel}>Recovery</span>
          <span className={styles.matrixVal} style={{ color: 'var(--perception-green)' }}>SECURE</span>
        </div>
        <div className={styles.matrixItem}>
          <span className={styles.matrixLabel}>Sync Mode</span>
          <span className={styles.matrixVal} style={{ color: 'var(--signal-cyan)' }}>DETERMINISTIC</span>
        </div>
      </div>
    </div>
  );
}
