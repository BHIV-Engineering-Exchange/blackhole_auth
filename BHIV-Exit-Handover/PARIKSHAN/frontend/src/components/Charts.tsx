interface DonutSegment { color: string; value: number; label: string; }

export function DonutChart({
  segments,
  centerValue,
  centerLabel = "Total",
  size = 150,
}: {
  segments: DonutSegment[];
  centerValue: string | number;
  centerLabel?: string;
  size?: number;
}) {
  const r = 52;
  const strokeW = 22;
  const innerR = r - strokeW / 2;
  const circ = 2 * Math.PI * innerR;
  const total = segments.reduce((a, s) => a + s.value, 0) || 1;
  let accumulated = 0;

  return (
    <svg width={size} height={size} viewBox="0 0 140 140">
      <circle cx={70} cy={70} r={innerR} fill="none" stroke="#0f2050" strokeWidth={strokeW} />
      {segments.map((seg, i) => {
        const dash = (seg.value / total) * circ;
        const gap = circ - dash;
        const rot = -90 + (accumulated / total) * 360;
        accumulated += seg.value;
        return (
          <circle
            key={i}
            cx={70} cy={70} r={innerR}
            fill="none"
            stroke={seg.color}
            strokeWidth={strokeW}
            strokeDasharray={`${dash} ${gap}`}
            strokeLinecap="butt"
            transform={`rotate(${rot} 70 70)`}
          />
        );
      })}
      <text x={70} y={64} textAnchor="middle" fill="#ffffff" fontSize={20} fontWeight={700} fontFamily="Inter,sans-serif">
        {centerValue}
      </text>
      <text x={70} y={80} textAnchor="middle" fill="#5b7aa8" fontSize={10} fontFamily="Inter,sans-serif">
        {centerLabel}
      </text>
    </svg>
  );
}

interface LineSeries { label: string; color: string; values: number[]; }

export function AreaLineChart({
  series,
  xLabels,
  height = 180,
}: {
  series: LineSeries[];
  xLabels: string[];
  height?: number;
}) {
  const W = 460;
  const H = height;
  const padL = 38;
  const padR = 12;
  const padT = 10;
  const padB = 28;
  const plotW = W - padL - padR;
  const plotH = H - padT - padB;

  const allVals = series.flatMap((s) => s.values);
  const maxV = Math.max(...allVals, 1);
  const steps = 4;
  const stepVal = Math.ceil(maxV / steps / 10) * 10 || 50;

  const xOf = (i: number) => padL + (i / (xLabels.length - 1)) * plotW;
  const yOf = (v: number) => padT + plotH - (v / (stepVal * steps)) * plotH;

  const toPolyline = (vals: number[]) =>
    vals.map((v, i) => `${xOf(i)},${yOf(v)}`).join(" ");

  const toArea = (vals: number[]) => {
    const pts = vals.map((v, i) => `${xOf(i)},${yOf(v)}`).join(" L ");
    return `M ${xOf(0)},${padT + plotH} L ${pts} L ${xOf(vals.length - 1)},${padT + plotH} Z`;
  };

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full" style={{ height }}>
      {/* grid lines */}
      {Array.from({ length: steps + 1 }, (_, i) => {
        const v = i * stepVal;
        const y = yOf(v);
        return (
          <g key={i}>
            <line x1={padL} y1={y} x2={W - padR} y2={y} stroke="#132752" strokeWidth={1} />
            <text x={padL - 5} y={y + 4} textAnchor="end" fill="#3d5a7a" fontSize={9} fontFamily="Inter,sans-serif">
              {v}
            </text>
          </g>
        );
      })}

      {/* area fills */}
      {series.map((s, i) => (
        <path key={`area-${i}`} d={toArea(s.values)} fill={s.color} opacity={0.08} />
      ))}

      {/* lines */}
      {series.map((s, i) => (
        <polyline
          key={`line-${i}`}
          points={toPolyline(s.values)}
          fill="none"
          stroke={s.color}
          strokeWidth={2.5}
          strokeLinejoin="round"
          strokeLinecap="round"
        />
      ))}

      {/* dots at last point */}
      {series.map((s, i) => (
        <circle
          key={`dot-${i}`}
          cx={xOf(s.values.length - 1)}
          cy={yOf(s.values[s.values.length - 1])}
          r={3.5}
          fill={s.color}
        />
      ))}

      {/* x axis labels */}
      {xLabels.map((label, i) => (
        <text
          key={label}
          x={xOf(i)}
          y={H - 6}
          textAnchor="middle"
          fill="#3d5a7a"
          fontSize={9}
          fontFamily="Inter,sans-serif"
        >
          {label}
        </text>
      ))}
    </svg>
  );
}
