import React from "react";
import {
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
} from "remotion";
import { theme } from "../lib/theme";
import type { Scene } from "../lib/scenes";

const typeGradients: Record<Scene["type"], string> = {
  intro: theme.gradientDark,
  problem: `linear-gradient(135deg, #1A0A0A 0%, #2E1A1A 50%, #1A0A0A 100%)`,
  solution: `linear-gradient(135deg, #0A1A14 0%, #1A2E24 50%, #0A1A14 100%)`,
  product: theme.gradientDark,
  metric: `linear-gradient(135deg, #1A1500 0%, #2E2800 50%, #1A1500 100%)`,
  cta: theme.gradientGreen,
};

const typeAccents: Record<Scene["type"], string> = {
  intro: theme.accent,
  problem: "#FF6B6B",
  solution: theme.primaryLight,
  product: theme.accent,
  metric: theme.accentLight,
  cta: theme.white,
};

export const SceneContainer: React.FC<{
  scene: Scene;
  children: React.ReactNode;
  localFrame: number;
  durationFrames: number;
}> = ({ scene, children, localFrame, durationFrames }) => {
  const { fps } = useVideoConfig();

  // Fade in
  const fadeIn = spring({
    frame: localFrame,
    fps,
    config: { damping: 30, stiffness: 80, mass: 1 },
  });

  // Fade out in last 10 frames
  const fadeOut = interpolate(
    localFrame,
    [durationFrames - 10, durationFrames],
    [1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  const opacity = Math.min(fadeIn, fadeOut);

  // Accent line on the left
  const accentColor = typeAccents[scene.type];
  const lineHeight = interpolate(fadeIn, [0, 1], [0, 100]);

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        background: "transparent",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        opacity,
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Subtle grid pattern */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
        }}
      />

      {/* Accent line */}
      {scene.type !== "intro" && scene.type !== "cta" && (
        <div
          style={{
            position: "absolute",
            left: 80,
            top: "50%",
            width: 4,
            height: `${lineHeight}%`,
            transform: "translateY(-50%)",
            background: accentColor,
            borderRadius: 2,
            opacity: 0.6,
          }}
        />
      )}

      {/* Content */}
      <div
        style={{
          padding: scene.type === "intro" || scene.type === "cta" ? "0 80px" : "0 80px 0 120px",
          width: "100%",
          maxWidth: 1400,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: scene.type === "intro" || scene.type === "cta" ? "center" : "flex-start",
          textAlign: scene.type === "intro" || scene.type === "cta" ? "center" : "left",
        }}
      >
        {children}
      </div>

      {/* Scene type badge */}
      <div
        style={{
          position: "absolute",
          top: 40,
          right: 50,
          fontSize: 12,
          fontFamily: theme.fontMono,
          color: accentColor,
          opacity: 0.4,
          textTransform: "uppercase",
          letterSpacing: "0.15em",
        }}
      >
        {scene.type}
      </div>
    </div>
  );
};
