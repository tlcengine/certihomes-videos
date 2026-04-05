import React from "react";
import {
  useCurrentFrame,
  useVideoConfig,
  spring,
  interpolate,
  Img,
  staticFile,
} from "remotion";
import type { Scene } from "../lib/scenes";

/**
 * FLUX-generated background image for each scene type.
 * Applies a dark overlay and subtle pan/zoom (Ken Burns effect).
 */
export const SceneBackground: React.FC<{
  sceneType: Scene["type"];
  localFrame: number;
  durationFrames: number;
  overlayOpacity?: number;
}> = ({ sceneType, localFrame, durationFrames, overlayOpacity = 0.55 }) => {
  const { fps } = useVideoConfig();

  // Map scene type to background image
  const bgMap: Record<Scene["type"], string> = {
    intro: "backgrounds/intro.png",
    problem: "backgrounds/problem.png",
    solution: "backgrounds/solution.png",
    product: "backgrounds/product.png",
    metric: "backgrounds/metric.png",
    cta: "backgrounds/cta.png",
  };

  const bgFile = bgMap[sceneType];

  // Ken Burns: slow zoom from 100% to 108% over the scene duration
  const zoom = interpolate(localFrame, [0, durationFrames], [1.0, 1.08], {
    extrapolateRight: "clamp",
  });

  // Subtle pan
  const panX = interpolate(localFrame, [0, durationFrames], [0, -15], {
    extrapolateRight: "clamp",
  });
  const panY = interpolate(localFrame, [0, durationFrames], [0, -8], {
    extrapolateRight: "clamp",
  });

  // Fade in
  const fadeIn = spring({
    frame: localFrame,
    fps,
    config: { damping: 30, stiffness: 60, mass: 1.5 },
  });

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        overflow: "hidden",
        opacity: fadeIn,
      }}
    >
      {/* Background image with Ken Burns */}
      <div
        style={{
          position: "absolute",
          inset: "-10%",
          transform: `scale(${zoom}) translate(${panX}px, ${panY}px)`,
        }}
      >
        <Img
          src={staticFile(bgFile)}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
        />
      </div>

      {/* Dark overlay for text readability */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: `rgba(0, 0, 0, ${overlayOpacity})`,
        }}
      />

      {/* Vignette */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.6) 100%)",
        }}
      />
    </div>
  );
};
