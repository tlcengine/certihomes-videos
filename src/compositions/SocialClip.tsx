import React from "react";
import {
  useCurrentFrame,
  useVideoConfig,
  Sequence,
  spring,
  interpolate,
} from "remotion";
import { theme } from "../lib/theme";
import { AnimatedTitle, AnimatedSubtitle } from "../components/AnimatedText";
import { AnimatedCounter } from "../components/AnimatedChart";
import { ProgressBar } from "../components/ProgressBar";

/**
 * Social Media Clip — short-form content for daily posting.
 * Quick stat-based videos: "Did you know?" format.
 *
 * 15 seconds, vertical (1080x1920) for TikTok/Reels/Shorts.
 */

export interface SocialClipProps {
  hook: string;
  stat: string;
  statValue: number;
  statPrefix?: string;
  statSuffix?: string;
  explanation: string;
  cta: string;
}

const defaultProps: SocialClipProps = {
  hook: "Your bank is lying\nto you.",
  stat: "hidden costs",
  statValue: 2050,
  statPrefix: "$",
  statSuffix: "/mo",
  explanation: "The average homeowner pays $2,050/month\nin costs their bank never mentioned.",
  cta: "CertiCost shows ALL 25 line items\nbefore you make an offer.",
};

export const SocialClip: React.FC<Partial<SocialClipProps>> = (props) => {
  const p = { ...defaultProps, ...props };
  const { fps } = useVideoConfig();

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        background: theme.dark,
        position: "relative",
        overflow: "hidden",
        fontFamily: theme.fontFamily,
      }}
    >
      {/* Hook (0-4s) */}
      <Sequence from={0} durationInFrames={4 * fps}>
        <HookScene hook={p.hook} />
      </Sequence>

      {/* Stat reveal (4-9s) */}
      <Sequence from={4 * fps} durationInFrames={5 * fps}>
        <StatScene {...p} />
      </Sequence>

      {/* CTA (9-15s) */}
      <Sequence from={9 * fps} durationInFrames={6 * fps}>
        <ClipCtaScene cta={p.cta} />
      </Sequence>

      <ProgressBar />
    </div>
  );
};

const HookScene: React.FC<{ hook: string }> = ({ hook }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Shake effect on entry
  const shake = Math.sin(frame * 0.8) * Math.max(0, 5 - frame * 0.3);

  const fadeIn = spring({ frame, fps, config: { damping: 12, stiffness: 200, mass: 0.5 } });
  const fadeOut = interpolate(frame, [4 * fps - 8, 4 * fps], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        background: `linear-gradient(135deg, #1A0A0A 0%, #2E1A1A 50%, #1A0A0A 100%)`,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "80px 60px",
        opacity: Math.min(fadeIn, fadeOut),
      }}
    >
      <div style={{ transform: `translateX(${shake}px)` }}>
        <AnimatedTitle text={hook} fontSize={56} color="#FF6B6B" />
      </div>
    </div>
  );
};

const StatScene: React.FC<SocialClipProps> = (p) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const fadeIn = spring({ frame, fps, config: { damping: 20, stiffness: 100 } });
  const fadeOut = interpolate(frame, [5 * fps - 8, 5 * fps], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        background: theme.gradientDark,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "80px 50px",
        gap: 30,
        opacity: Math.min(fadeIn, fadeOut),
      }}
    >
      <AnimatedCounter
        to={p.statValue}
        prefix={p.statPrefix}
        suffix={p.statSuffix}
        delay={4}
        fontSize={80}
        label={p.stat}
      />
      <AnimatedSubtitle
        text={p.explanation}
        delay={12}
        fontSize={22}
        color={theme.lightGray}
      />
    </div>
  );
};

const ClipCtaScene: React.FC<{ cta: string }> = ({ cta }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const fadeIn = spring({ frame, fps, config: { damping: 20, stiffness: 100 } });

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        background: theme.gradientGreen,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "80px 50px",
        gap: 30,
        opacity: fadeIn,
      }}
    >
      <AnimatedSubtitle text={cta} delay={4} fontSize={26} color={theme.white} />

      <div style={{ marginTop: 20 }}>
        <AnimatedTitle text="CertiHomes" fontSize={52} color={theme.accent} />
      </div>

      <div
        style={{
          marginTop: 20,
          padding: "14px 36px",
          background: "rgba(255,255,255,0.15)",
          borderRadius: 12,
          opacity: spring({ frame: frame - 14, fps, config: { damping: 20, stiffness: 100 } }),
        }}
      >
        <span style={{ fontSize: 18, fontWeight: 700, color: theme.white }}>
          Know Before You Owe
        </span>
      </div>
    </div>
  );
};
