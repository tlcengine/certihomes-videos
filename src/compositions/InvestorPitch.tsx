import React from "react";
import {
  useCurrentFrame,
  useVideoConfig,
  Audio,
  Sequence,
  staticFile,
  spring,
  interpolate,
} from "remotion";
import { theme } from "../lib/theme";
import { scenes } from "../lib/scenes";
import { pitchCaptions } from "../lib/captions";
import { SceneContainer } from "../components/SceneContainer";
import { SceneBackground } from "../components/SceneBackground";
import { CaptionOverlay } from "../components/Captions";
import {
  AnimatedTitle,
  AnimatedSubtitle,
  AnimatedBullets,
  AnimatedStat,
} from "../components/AnimatedText";
import { ProgressBar } from "../components/ProgressBar";

export const InvestorPitch: React.FC<{ layout: "landscape" | "vertical" }> = ({
  layout,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const isVertical = layout === "vertical";

  // Scale font sizes for vertical
  const scale = isVertical ? 0.85 : 1;

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        backgroundColor: theme.dark,
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Audio track */}
      <Audio src={staticFile("pitch-audio.wav")} />

      {/* CertiHomes logo watermark — top left */}
      <div
        style={{
          position: "absolute",
          top: isVertical ? 60 : 40,
          left: isVertical ? 30 : 50,
          zIndex: 20,
          display: "flex",
          alignItems: "center",
          gap: 10,
          opacity: 0.7,
        }}
      >
        <div
          style={{
            width: 32,
            height: 32,
            borderRadius: 8,
            background: theme.gradientGreen,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 18,
            fontWeight: 900,
            color: theme.white,
            fontFamily: theme.fontFamily,
          }}
        >
          C
        </div>
        <span
          style={{
            fontSize: 16,
            fontWeight: 600,
            color: theme.white,
            fontFamily: theme.fontFamily,
            letterSpacing: "0.05em",
          }}
        >
          CERTIHOMES
        </span>
      </div>

      {/* Scenes with FLUX backgrounds */}
      {scenes.map((scene) => {
        const startFrame = Math.round(scene.startSec * fps);
        const durationFrames = Math.round((scene.endSec - scene.startSec) * fps);

        return (
          <Sequence
            key={scene.id}
            from={startFrame}
            durationInFrames={durationFrames}
            name={scene.id}
          >
            <SceneRenderer
              scene={scene}
              durationFrames={durationFrames}
              scale={scale}
              isVertical={isVertical}
            />
          </Sequence>
        );
      })}

      {/* Whisper-synced captions overlay */}
      <CaptionOverlay
        captions={pitchCaptions}
        position={isVertical ? "bottom" : "bottom"}
        fontSize={isVertical ? 26 : 32}
        showBackground={true}
      />

      {/* Progress bar */}
      <ProgressBar />
    </div>
  );
};

const SceneRenderer: React.FC<{
  scene: (typeof scenes)[number];
  durationFrames: number;
  scale: number;
  isVertical: boolean;
}> = ({ scene, durationFrames, scale, isVertical }) => {
  const localFrame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleSize = scene.type === "intro" || scene.type === "cta"
    ? Math.round(80 * scale)
    : Math.round(56 * scale);

  const subtitleSize = scene.type === "intro" || scene.type === "cta"
    ? Math.round(28 * scale)
    : Math.round(24 * scale);

  return (
    <div style={{ width: "100%", height: "100%", position: "relative" }}>
      {/* FLUX-generated background with Ken Burns effect */}
      <SceneBackground
        sceneType={scene.type}
        localFrame={localFrame}
        durationFrames={durationFrames}
        overlayOpacity={0.5}
      />

      {/* Scene content (text, bullets, stats) */}
      <SceneContainer
        scene={scene}
        localFrame={localFrame}
        durationFrames={durationFrames}
      >
        {/* Title */}
        <AnimatedTitle
          text={scene.title}
          fontSize={titleSize}
          color={
            scene.type === "cta"
              ? theme.white
              : scene.type === "metric"
              ? theme.accent
              : theme.white
          }
        />

        {/* Subtitle */}
        {scene.subtitle && (
          <AnimatedSubtitle
            text={scene.subtitle}
            fontSize={subtitleSize}
            delay={10}
            color={
              scene.type === "cta" ? "rgba(255,255,255,0.8)" : theme.textMuted
            }
          />
        )}

        {/* Stat callout */}
        {scene.stat && (
          <AnimatedStat
            value={scene.stat.value}
            label={scene.stat.label}
            delay={14}
          />
        )}

        {/* Bullet points */}
        {scene.bullets && (
          <AnimatedBullets
            items={scene.bullets}
            delay={scene.stat ? 30 : 16}
            fontSize={Math.round(24 * scale)}
          />
        )}
      </SceneContainer>
    </div>
  );
};
