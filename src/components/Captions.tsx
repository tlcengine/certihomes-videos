import React from "react";
import {
  useCurrentFrame,
  useVideoConfig,
  spring,
  interpolate,
} from "remotion";
import { theme } from "../lib/theme";
import type { Caption } from "../lib/captions";

/**
 * Karaoke-style synced captions overlay.
 * Shows one caption at a time, with word-highlight animation.
 */
export const CaptionOverlay: React.FC<{
  captions: Caption[];
  position?: "bottom" | "center";
  fontSize?: number;
  showBackground?: boolean;
}> = ({ captions, position = "bottom", fontSize = 32, showBackground = true }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const currentTimeSec = frame / fps;

  // Find the active caption
  const activeCaption = captions.find(
    (c) => currentTimeSec >= c.start && currentTimeSec < c.end
  );

  if (!activeCaption) return null;

  const captionDuration = activeCaption.end - activeCaption.start;
  const captionProgress = (currentTimeSec - activeCaption.start) / captionDuration;
  const localFrame = (currentTimeSec - activeCaption.start) * fps;

  // Entrance animation
  const enterProgress = spring({
    frame: localFrame,
    fps,
    config: { damping: 25, stiffness: 200, mass: 0.5 },
  });

  // Exit animation (fade out in last 0.2s)
  const exitProgress = interpolate(
    currentTimeSec,
    [activeCaption.end - 0.2, activeCaption.end],
    [1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  const opacity = Math.min(enterProgress, exitProgress);
  const translateY = interpolate(enterProgress, [0, 1], [15, 0]);

  const positionStyle: React.CSSProperties =
    position === "bottom"
      ? { bottom: 80, left: 0, right: 0 }
      : { top: "50%", left: 0, right: 0, transform: "translateY(-50%)" };

  return (
    <div
      style={{
        position: "absolute",
        ...positionStyle,
        display: "flex",
        justifyContent: "center",
        zIndex: 30,
        opacity,
        pointerEvents: "none",
      }}
    >
      <div
        style={{
          transform: `translateY(${translateY}px)`,
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {showBackground && (
          <div
            style={{
              position: "absolute",
              inset: "-8px -20px",
              background: "rgba(0, 0, 0, 0.7)",
              borderRadius: 12,
              backdropFilter: "blur(10px)",
            }}
          />
        )}
        <CaptionWords
          text={activeCaption.text}
          progress={captionProgress}
          fontSize={fontSize}
          localFrame={localFrame}
          fps={fps}
        />
      </div>
    </div>
  );
};

const CaptionWords: React.FC<{
  text: string;
  progress: number;
  fontSize: number;
  localFrame: number;
  fps: number;
}> = ({ text, progress, fontSize, localFrame, fps }) => {
  const words = text.split(" ");
  const activeWordIndex = Math.floor(progress * words.length);

  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "center",
        gap: "0 8px",
        maxWidth: 900,
        position: "relative",
        zIndex: 1,
      }}
    >
      {words.map((word, i) => {
        const isActive = i === activeWordIndex;
        const isPast = i < activeWordIndex;
        const wordDelay = i * 1;

        const wordProgress = spring({
          frame: localFrame - wordDelay,
          fps,
          config: { damping: 30, stiffness: 300, mass: 0.3 },
        });

        return (
          <span
            key={i}
            style={{
              fontSize,
              fontWeight: isActive ? 800 : 600,
              fontFamily: theme.fontFamily,
              color: isActive
                ? theme.accent
                : isPast
                ? theme.white
                : "rgba(255, 255, 255, 0.6)",
              opacity: interpolate(wordProgress, [0, 1], [0.5, 1]),
              transform: `scale(${isActive ? 1.05 : 1})`,
              transition: "color 0.1s",
              lineHeight: 1.4,
            }}
          >
            {word}
          </span>
        );
      })}
    </div>
  );
};
