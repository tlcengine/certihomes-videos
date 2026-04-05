import React from "react";
import {
  useCurrentFrame,
  useVideoConfig,
  Sequence,
  spring,
  interpolate,
} from "remotion";
import { theme } from "../lib/theme";
import { AnimatedTitle, AnimatedSubtitle, AnimatedBullets } from "../components/AnimatedText";
import { AnimatedCounter } from "../components/AnimatedChart";
import { ProgressBar } from "../components/ProgressBar";

/**
 * Education Explainer — Kurzgesagt/Fireship style.
 * Topic: "The True Cost of Homeownership"
 * 60 seconds, vertical (1080x1920) optimized for TikTok/Reels.
 */

interface ExplainerScene {
  id: string;
  startSec: number;
  endSec: number;
  type: "hook" | "explain" | "stat" | "reveal" | "cta";
}

const explainerScenes: ExplainerScene[] = [
  { id: "hook", startSec: 0, endSec: 5, type: "hook" },
  { id: "mortgage-myth", startSec: 5, endSec: 15, type: "explain" },
  { id: "hidden-costs", startSec: 15, endSec: 30, type: "stat" },
  { id: "certicost", startSec: 30, endSec: 45, type: "reveal" },
  { id: "cta", startSec: 45, endSec: 60, type: "cta" },
];

export const EducationExplainer: React.FC = () => {
  const { fps } = useVideoConfig();

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        background: theme.gradientDark,
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Background animated gradient orb */}
      <BackgroundOrb />

      {explainerScenes.map((scene) => {
        const startFrame = Math.round(scene.startSec * fps);
        const durationFrames = Math.round((scene.endSec - scene.startSec) * fps);
        return (
          <Sequence key={scene.id} from={startFrame} durationInFrames={durationFrames}>
            <ExplainerSceneRenderer scene={scene} durationFrames={durationFrames} />
          </Sequence>
        );
      })}

      <ProgressBar />
    </div>
  );
};

const BackgroundOrb: React.FC = () => {
  const frame = useCurrentFrame();
  const x = 540 + Math.sin(frame * 0.01) * 100;
  const y = 960 + Math.cos(frame * 0.008) * 150;

  return (
    <div
      style={{
        position: "absolute",
        width: 600,
        height: 600,
        borderRadius: "50%",
        background: `radial-gradient(circle, ${theme.primary}40 0%, transparent 70%)`,
        left: x - 300,
        top: y - 300,
        filter: "blur(80px)",
      }}
    />
  );
};

const ExplainerSceneRenderer: React.FC<{
  scene: ExplainerScene;
  durationFrames: number;
}> = ({ scene, durationFrames }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const fadeIn = spring({ frame, fps, config: { damping: 20, stiffness: 100 } });
  const fadeOut = interpolate(frame, [durationFrames - 8, durationFrames], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const opacity = Math.min(fadeIn, fadeOut);

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "120px 60px",
        opacity,
        position: "relative",
      }}
    >
      {scene.type === "hook" && (
        <>
          <AnimatedTitle
            text={"Your mortgage\nis a LIE."}
            fontSize={64}
            color="#FF6B6B"
          />
          <AnimatedSubtitle
            text="(Well, not exactly. But it's only 60% of your real cost.)"
            fontSize={24}
            delay={15}
          />
        </>
      )}

      {scene.type === "explain" && (
        <>
          <AnimatedTitle text={"The Mortgage\nMyth"} fontSize={52} />
          <div style={{ marginTop: 40 }}>
            <AnimatedBullets
              items={[
                "Banks show you the monthly mortgage",
                "Maybe property tax",
                "Maybe insurance",
                "That's 3 out of 25 real costs",
              ]}
              fontSize={22}
              delay={8}
            />
          </div>
        </>
      )}

      {scene.type === "stat" && (
        <>
          <AnimatedTitle text="Hidden Costs" fontSize={48} />
          <div
            style={{
              marginTop: 40,
              display: "flex",
              flexDirection: "column",
              gap: 24,
              width: "100%",
            }}
          >
            <CostBar label="Commute" amount={800} delay={8} maxAmount={800} />
            <CostBar label="Maintenance" amount={400} delay={14} maxAmount={800} />
            <CostBar label="HOA" amount={350} delay={20} maxAmount={800} />
            <CostBar label="Utilities" amount={300} delay={26} maxAmount={800} />
            <CostBar label="Insurance gap" amount={200} delay={32} maxAmount={800} />
          </div>
          <div style={{ marginTop: 30 }}>
            <AnimatedCounter
              to={2050}
              prefix="$"
              suffix="/mo"
              delay={38}
              fontSize={48}
              label="hidden costs you never planned for"
            />
          </div>
        </>
      )}

      {scene.type === "reveal" && (
        <>
          <AnimatedTitle text={"CertiCost\nshows it ALL"} fontSize={52} color={theme.primaryLight} />
          <div style={{ marginTop: 30 }}>
            <AnimatedCounter to={25} delay={10} fontSize={96} label="line items" />
          </div>
          <AnimatedSubtitle
            text="Before you make an offer.\nNot after you're stuck."
            fontSize={22}
            delay={20}
          />
        </>
      )}

      {scene.type === "cta" && (
        <>
          <AnimatedTitle text="CertiHomes" fontSize={72} color={theme.accent} />
          <AnimatedSubtitle
            text={"Know Before You Owe.\nLive Your Life."}
            fontSize={28}
            delay={8}
            color={theme.white}
          />
          <div
            style={{
              marginTop: 40,
              padding: "16px 40px",
              background: theme.gradientGreen,
              borderRadius: 12,
              opacity: spring({
                frame: frame - 18,
                fps,
                config: { damping: 20, stiffness: 100 },
              }),
            }}
          >
            <span
              style={{
                fontSize: 20,
                fontWeight: 700,
                color: theme.white,
                fontFamily: theme.fontFamily,
              }}
            >
              certihomes.com
            </span>
          </div>
        </>
      )}
    </div>
  );
};

const CostBar: React.FC<{
  label: string;
  amount: number;
  delay: number;
  maxAmount: number;
}> = ({ label, amount, delay, maxAmount }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const progress = spring({
    frame: frame - delay,
    fps,
    config: { damping: 18, stiffness: 80 },
  });

  const width = interpolate(progress, [0, 1], [0, (amount / maxAmount) * 100]);
  const opacity = interpolate(progress, [0, 0.2], [0, 1], { extrapolateRight: "clamp" });

  return (
    <div style={{ display: "flex", alignItems: "center", gap: 12, opacity }}>
      <div
        style={{
          width: 110,
          fontSize: 16,
          fontFamily: theme.fontFamily,
          color: theme.lightGray,
          textAlign: "right",
          flexShrink: 0,
        }}
      >
        {label}
      </div>
      <div
        style={{
          flex: 1,
          height: 28,
          backgroundColor: "rgba(255,255,255,0.05)",
          borderRadius: 6,
          overflow: "hidden",
        }}
      >
        <div
          style={{
            width: `${width}%`,
            height: "100%",
            background: "linear-gradient(90deg, #FF6B6B, #FF8E8E)",
            borderRadius: 6,
          }}
        />
      </div>
      <div
        style={{
          width: 80,
          fontSize: 16,
          fontFamily: theme.fontMono,
          color: "#FF6B6B",
          fontWeight: 700,
        }}
      >
        ${Math.round(amount * progress)}
      </div>
    </div>
  );
};
