import React from "react";
import { useCurrentFrame, useVideoConfig, interpolate } from "remotion";
import { theme } from "../lib/theme";

export const ProgressBar: React.FC = () => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();

  const progress = interpolate(frame, [0, durationInFrames], [0, 100], {
    extrapolateRight: "clamp",
  });

  return (
    <div
      style={{
        position: "absolute",
        bottom: 0,
        left: 0,
        width: "100%",
        height: 4,
        backgroundColor: "rgba(255,255,255,0.1)",
        zIndex: 10,
      }}
    >
      <div
        style={{
          width: `${progress}%`,
          height: "100%",
          background: theme.gradientGold,
          transition: "none",
        }}
      />
    </div>
  );
};
