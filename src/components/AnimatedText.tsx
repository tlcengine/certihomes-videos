import React from "react";
import {
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
  Easing,
} from "remotion";
import { theme } from "../lib/theme";

export const AnimatedTitle: React.FC<{
  text: string;
  delay?: number;
  fontSize?: number;
  color?: string;
}> = ({ text, delay = 0, fontSize = 72, color = theme.white }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const lines = text.split("\n");

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
      {lines.map((line, i) => {
        const lineDelay = delay + i * 6;
        const progress = spring({
          frame: frame - lineDelay,
          fps,
          config: { damping: 20, stiffness: 100, mass: 0.8 },
        });

        const opacity = interpolate(progress, [0, 1], [0, 1]);
        const translateY = interpolate(progress, [0, 1], [40, 0]);

        return (
          <div
            key={i}
            style={{
              fontSize,
              fontWeight: 800,
              fontFamily: theme.fontFamily,
              color,
              opacity,
              transform: `translateY(${translateY}px)`,
              lineHeight: 1.1,
              letterSpacing: "-0.02em",
            }}
          >
            {line}
          </div>
        );
      })}
    </div>
  );
};

export const AnimatedSubtitle: React.FC<{
  text: string;
  delay?: number;
  fontSize?: number;
  color?: string;
}> = ({ text, delay = 12, fontSize = 28, color = theme.textMuted }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const progress = spring({
    frame: frame - delay,
    fps,
    config: { damping: 25, stiffness: 80, mass: 1 },
  });

  const opacity = interpolate(progress, [0, 1], [0, 1]);
  const translateY = interpolate(progress, [0, 1], [20, 0]);

  return (
    <div
      style={{
        fontSize,
        fontWeight: 400,
        fontFamily: theme.fontFamily,
        color,
        opacity,
        transform: `translateY(${translateY}px)`,
        lineHeight: 1.5,
        maxWidth: 700,
        whiteSpace: "pre-line",
      }}
    >
      {text}
    </div>
  );
};

export const AnimatedBullets: React.FC<{
  items: string[];
  delay?: number;
  fontSize?: number;
}> = ({ items, delay = 18, fontSize = 26 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16, marginTop: 20 }}>
      {items.map((item, i) => {
        const itemDelay = delay + i * 8;
        const progress = spring({
          frame: frame - itemDelay,
          fps,
          config: { damping: 18, stiffness: 120, mass: 0.6 },
        });

        const opacity = interpolate(progress, [0, 1], [0, 1]);
        const translateX = interpolate(progress, [0, 1], [-30, 0]);

        return (
          <div
            key={i}
            style={{
              fontSize,
              fontFamily: theme.fontFamily,
              color: theme.lightGray,
              opacity,
              transform: `translateX(${translateX}px)`,
              display: "flex",
              alignItems: "center",
              gap: 12,
              fontWeight: 500,
            }}
          >
            <div
              style={{
                width: 8,
                height: 8,
                borderRadius: 4,
                backgroundColor: theme.accent,
                flexShrink: 0,
                opacity,
              }}
            />
            {item}
          </div>
        );
      })}
    </div>
  );
};

export const AnimatedStat: React.FC<{
  value: string;
  label: string;
  delay?: number;
}> = ({ value, label, delay = 10 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const scale = spring({
    frame: frame - delay,
    fps,
    config: { damping: 12, stiffness: 100, mass: 1.2 },
  });

  const opacity = interpolate(scale, [0, 1], [0, 1]);

  return (
    <div
      style={{
        textAlign: "center",
        opacity,
        transform: `scale(${interpolate(scale, [0, 1], [0.7, 1])})`,
        marginTop: 30,
      }}
    >
      <div
        style={{
          fontSize: 96,
          fontWeight: 900,
          fontFamily: theme.fontFamily,
          color: theme.accent,
          letterSpacing: "-0.03em",
          lineHeight: 1,
        }}
      >
        {value}
      </div>
      <div
        style={{
          fontSize: 22,
          fontFamily: theme.fontFamily,
          color: theme.textMuted,
          marginTop: 12,
          fontWeight: 400,
        }}
      >
        {label}
      </div>
    </div>
  );
};
