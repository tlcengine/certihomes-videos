import React from "react";
import { useCurrentFrame, useVideoConfig, spring, interpolate } from "remotion";
import { theme } from "../lib/theme";

// Animated bar chart
export const BarChart: React.FC<{
  data: { label: string; value: number; color?: string }[];
  title?: string;
  delay?: number;
  maxValue?: number;
}> = ({ data, title, delay = 0, maxValue }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const max = maxValue || Math.max(...data.map((d) => d.value));

  return (
    <div style={{ width: "100%", display: "flex", flexDirection: "column", gap: 16 }}>
      {title && (
        <div
          style={{
            fontSize: 20,
            fontFamily: theme.fontFamily,
            color: theme.textMuted,
            fontWeight: 600,
            marginBottom: 8,
          }}
        >
          {title}
        </div>
      )}
      {data.map((item, i) => {
        const barDelay = delay + i * 6;
        const progress = spring({
          frame: frame - barDelay,
          fps,
          config: { damping: 20, stiffness: 60, mass: 1 },
        });
        const width = interpolate(progress, [0, 1], [0, (item.value / max) * 100]);
        const opacity = interpolate(progress, [0, 0.3], [0, 1], {
          extrapolateRight: "clamp",
        });

        return (
          <div key={i} style={{ display: "flex", alignItems: "center", gap: 12, opacity }}>
            <div
              style={{
                width: 100,
                fontSize: 14,
                fontFamily: theme.fontFamily,
                color: theme.lightGray,
                textAlign: "right",
                flexShrink: 0,
              }}
            >
              {item.label}
            </div>
            <div
              style={{
                flex: 1,
                height: 32,
                backgroundColor: "rgba(255,255,255,0.05)",
                borderRadius: 6,
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  width: `${width}%`,
                  height: "100%",
                  background: item.color || theme.gradientGold,
                  borderRadius: 6,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "flex-end",
                  paddingRight: 10,
                }}
              >
                <span
                  style={{
                    fontSize: 13,
                    fontFamily: theme.fontMono,
                    color: theme.dark,
                    fontWeight: 700,
                  }}
                >
                  {Math.round(item.value * progress).toLocaleString()}
                </span>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

// Animated donut/ring chart
export const DonutChart: React.FC<{
  value: number;
  maxValue: number;
  label: string;
  sublabel?: string;
  color?: string;
  delay?: number;
  size?: number;
}> = ({ value, maxValue, label, sublabel, color = theme.accent, delay = 0, size = 200 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const progress = spring({
    frame: frame - delay,
    fps,
    config: { damping: 25, stiffness: 50, mass: 1.2 },
  });

  const percentage = (value / maxValue) * 100;
  const animatedPercentage = percentage * progress;
  const circumference = 2 * Math.PI * 80;
  const strokeDashoffset = circumference - (animatedPercentage / 100) * circumference;

  const opacity = interpolate(progress, [0, 0.2], [0, 1], {
    extrapolateRight: "clamp",
  });

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 12,
        opacity,
      }}
    >
      <svg width={size} height={size} viewBox="0 0 200 200">
        {/* Background ring */}
        <circle
          cx="100"
          cy="100"
          r="80"
          fill="none"
          stroke="rgba(255,255,255,0.08)"
          strokeWidth="16"
        />
        {/* Animated ring */}
        <circle
          cx="100"
          cy="100"
          r="80"
          fill="none"
          stroke={color}
          strokeWidth="16"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          transform="rotate(-90 100 100)"
        />
        {/* Center text */}
        <text
          x="100"
          y="95"
          textAnchor="middle"
          fill={theme.white}
          fontSize="36"
          fontWeight="800"
          fontFamily={theme.fontFamily}
        >
          {Math.round(value * progress).toLocaleString()}
        </text>
        <text
          x="100"
          y="120"
          textAnchor="middle"
          fill={theme.textMuted}
          fontSize="14"
          fontFamily={theme.fontFamily}
        >
          {sublabel || ""}
        </text>
      </svg>
      <div
        style={{
          fontSize: 16,
          fontFamily: theme.fontFamily,
          color: theme.lightGray,
          fontWeight: 600,
          textAlign: "center",
        }}
      >
        {label}
      </div>
    </div>
  );
};

// Animated counter
export const AnimatedCounter: React.FC<{
  from?: number;
  to: number;
  prefix?: string;
  suffix?: string;
  delay?: number;
  fontSize?: number;
  color?: string;
  label?: string;
}> = ({
  from = 0,
  to,
  prefix = "",
  suffix = "",
  delay = 0,
  fontSize = 64,
  color = theme.accent,
  label,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const progress = spring({
    frame: frame - delay,
    fps,
    config: { damping: 30, stiffness: 40, mass: 1.5 },
  });

  const current = Math.round(interpolate(progress, [0, 1], [from, to]));
  const opacity = interpolate(progress, [0, 0.1], [0, 1], {
    extrapolateRight: "clamp",
  });

  return (
    <div style={{ textAlign: "center", opacity }}>
      <div
        style={{
          fontSize,
          fontWeight: 900,
          fontFamily: theme.fontFamily,
          color,
          letterSpacing: "-0.03em",
          lineHeight: 1,
        }}
      >
        {prefix}
        {current.toLocaleString()}
        {suffix}
      </div>
      {label && (
        <div
          style={{
            fontSize: 18,
            fontFamily: theme.fontFamily,
            color: theme.textMuted,
            marginTop: 8,
          }}
        >
          {label}
        </div>
      )}
    </div>
  );
};

// Animated line chart
export const LineChart: React.FC<{
  points: number[];
  labels?: string[];
  color?: string;
  delay?: number;
  title?: string;
  width?: number;
  height?: number;
}> = ({
  points,
  labels,
  color = theme.accent,
  delay = 0,
  title,
  width = 600,
  height = 300,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const progress = spring({
    frame: frame - delay,
    fps,
    config: { damping: 30, stiffness: 40, mass: 1.5 },
  });

  const max = Math.max(...points);
  const min = Math.min(...points);
  const range = max - min || 1;
  const padding = { top: 20, right: 20, bottom: 40, left: 20 };
  const chartW = width - padding.left - padding.right;
  const chartH = height - padding.top - padding.bottom;

  const visiblePoints = Math.round(points.length * progress);

  const pathPoints = points.slice(0, visiblePoints).map((p, i) => {
    const x = padding.left + (i / (points.length - 1)) * chartW;
    const y = padding.top + chartH - ((p - min) / range) * chartH;
    return `${i === 0 ? "M" : "L"} ${x} ${y}`;
  });

  const opacity = interpolate(progress, [0, 0.1], [0, 1], {
    extrapolateRight: "clamp",
  });

  return (
    <div style={{ opacity }}>
      {title && (
        <div
          style={{
            fontSize: 18,
            fontFamily: theme.fontFamily,
            color: theme.textMuted,
            marginBottom: 12,
            fontWeight: 600,
          }}
        >
          {title}
        </div>
      )}
      <svg width={width} height={height}>
        {/* Grid lines */}
        {[0, 0.25, 0.5, 0.75, 1].map((pct) => (
          <line
            key={pct}
            x1={padding.left}
            y1={padding.top + chartH * (1 - pct)}
            x2={padding.left + chartW}
            y2={padding.top + chartH * (1 - pct)}
            stroke="rgba(255,255,255,0.06)"
            strokeWidth={1}
          />
        ))}
        {/* Line */}
        <path
          d={pathPoints.join(" ")}
          fill="none"
          stroke={color}
          strokeWidth={3}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {/* Dot at end */}
        {visiblePoints > 0 && (
          <circle
            cx={
              padding.left +
              ((visiblePoints - 1) / (points.length - 1)) * chartW
            }
            cy={
              padding.top +
              chartH -
              ((points[visiblePoints - 1] - min) / range) * chartH
            }
            r={5}
            fill={color}
          />
        )}
        {/* X labels */}
        {labels?.map((label, i) => (
          <text
            key={i}
            x={padding.left + (i / (labels.length - 1)) * chartW}
            y={height - 10}
            textAnchor="middle"
            fill={theme.textMuted}
            fontSize={12}
            fontFamily={theme.fontFamily}
          >
            {label}
          </text>
        ))}
      </svg>
    </div>
  );
};
