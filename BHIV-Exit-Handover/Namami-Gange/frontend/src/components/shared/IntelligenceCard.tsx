import React from 'react';
import styles from './IntelligenceCard.module.css';

interface Props {
  title: string;
  value: string | number;
  delta?: string;
  deltaType?: 'up' | 'down' | 'neutral';
  color?: 'blue' | 'teal' | 'amber' | 'red' | 'green' | 'purple';
  icon?: string;
}

const ICON_MAP: Record<string, string> = {
  blue: '◆',
  teal: '●',
  amber: '▲',
  red: '!',
  green: '✓',
  purple: '◇',
};

export default function IntelligenceCard({ title, value, delta, deltaType, color = 'blue', icon }: Props) {
  const colorKey = color.charAt(0).toUpperCase() + color.slice(1);
  return (
    <div className={`${styles.card} ${styles[color]}`}>
      <div className={styles.header}>
        <span className={styles.title}>{title}</span>
        <div className={`${styles.iconBox} ${styles[`icon${colorKey}`]}`}>
          {icon ?? ICON_MAP[color] ?? '●'}
        </div>
      </div>
      <div className={`${styles.value} ${styles[color]}`}>{value}</div>
      {delta && (
        <div className={`${styles.delta} ${deltaType ? styles[deltaType] : styles.neutral}`}>
          {deltaType === 'up' && <span className={styles.trendArrow}>↑</span>}
          {deltaType === 'down' && <span className={styles.trendArrow}>↓</span>}
          {delta}
          <span className={styles.deltaLabel}>from baseline</span>
        </div>
      )}
    </div>
  );
}
