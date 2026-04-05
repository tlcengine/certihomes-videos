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
import { DonutChart, AnimatedCounter, BarChart } from "../components/AnimatedChart";
import { ProgressBar } from "../components/ProgressBar";

/**
 * Property Listing Video — real content template.
 * Feed it a property address, CertiCost data, CertiScore, and photos
 * to generate a branded listing video automatically.
 *
 * 30 seconds, vertical (1080x1920) for Instagram/TikTok.
 * Designed for W2 agents to share on social media.
 */

// Default props — replace with real data per listing
export interface ListingProps {
  address: string;
  city: string;
  price: number;
  beds: number;
  baths: number;
  sqft: number;
  certiScore: number;
  certiCostTotal: number;
  mortgageOnly: number;
  costBreakdown: { label: string; amount: number }[];
  daysToClose: number;
  agentName: string;
}

const defaultProps: ListingProps = {
  address: "742 Maple Drive",
  city: "Montclair, NJ",
  price: 685000,
  beds: 4,
  baths: 3,
  sqft: 2450,
  certiScore: 87,
  certiCostTotal: 4900,
  mortgageOnly: 2450,
  costBreakdown: [
    { label: "Mortgage", amount: 2450 },
    { label: "Property Tax", amount: 680 },
    { label: "Insurance", amount: 180 },
    { label: "HOA", amount: 350 },
    { label: "Commute", amount: 420 },
    { label: "Maintenance", amount: 380 },
    { label: "Utilities", amount: 290 },
    { label: "School Premium", amount: 150 },
  ],
  daysToClose: 15,
  agentName: "Sarah Chen",
};

export const ListingVideo: React.FC<Partial<ListingProps>> = (props) => {
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
      {/* Scene 1: Hero card (0-7s) */}
      <Sequence from={0} durationInFrames={7 * fps}>
        <HeroScene {...p} />
      </Sequence>

      {/* Scene 2: CertiScore (7-14s) */}
      <Sequence from={7 * fps} durationInFrames={7 * fps}>
        <ScoreScene {...p} />
      </Sequence>

      {/* Scene 3: CertiCost breakdown (14-23s) */}
      <Sequence from={14 * fps} durationInFrames={9 * fps}>
        <CostScene {...p} />
      </Sequence>

      {/* Scene 4: CTA (23-30s) */}
      <Sequence from={23 * fps} durationInFrames={7 * fps}>
        <CtaScene {...p} />
      </Sequence>

      <ProgressBar />
    </div>
  );
};

const FadeWrapper: React.FC<{
  children: React.ReactNode;
  durationFrames: number;
}> = ({ children, durationFrames }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const fadeIn = spring({ frame, fps, config: { damping: 20, stiffness: 100 } });
  const fadeOut = interpolate(frame, [durationFrames - 8, durationFrames], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        opacity: Math.min(fadeIn, fadeOut),
      }}
    >
      {children}
    </div>
  );
};

const HeroScene: React.FC<ListingProps> = (p) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  return (
    <FadeWrapper durationFrames={7 * fps}>
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
          gap: 20,
        }}
      >
        {/* Pre-Certified badge */}
        <div
          style={{
            background: "rgba(255,255,255,0.15)",
            borderRadius: 30,
            padding: "8px 24px",
            fontSize: 14,
            fontWeight: 700,
            color: theme.accent,
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            opacity: spring({ frame, fps, config: { damping: 20, stiffness: 100 } }),
          }}
        >
          PRE-CERTIFIED
        </div>

        <AnimatedTitle text={p.address} fontSize={48} />
        <AnimatedSubtitle text={p.city} delay={6} fontSize={24} color="rgba(255,255,255,0.7)" />

        {/* Price */}
        <div style={{ marginTop: 20 }}>
          <AnimatedCounter
            to={p.price}
            prefix="$"
            delay={10}
            fontSize={64}
            color={theme.accent}
          />
        </div>

        {/* Specs row */}
        <div
          style={{
            display: "flex",
            gap: 30,
            marginTop: 20,
            opacity: spring({ frame: frame - 15, fps, config: { damping: 20, stiffness: 100 } }),
          }}
        >
          {[
            { val: p.beds, label: "Beds" },
            { val: p.baths, label: "Baths" },
            { val: p.sqft.toLocaleString(), label: "Sq Ft" },
            { val: `${p.daysToClose}`, label: "Day Close" },
          ].map((spec, i) => (
            <div key={i} style={{ textAlign: "center" }}>
              <div style={{ fontSize: 32, fontWeight: 800, color: theme.white }}>{spec.val}</div>
              <div style={{ fontSize: 13, color: "rgba(255,255,255,0.6)" }}>{spec.label}</div>
            </div>
          ))}
        </div>
      </div>
    </FadeWrapper>
  );
};

const ScoreScene: React.FC<ListingProps> = (p) => {
  const { fps } = useVideoConfig();

  return (
    <FadeWrapper durationFrames={7 * fps}>
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
        }}
      >
        <div
          style={{
            fontSize: 14,
            fontFamily: theme.fontMono,
            color: theme.primaryLight,
            letterSpacing: "0.15em",
            textTransform: "uppercase",
          }}
        >
          LIFE-TO-HOME MATCH
        </div>
        <AnimatedTitle text="CertiScore" fontSize={42} color={theme.accent} />

        <DonutChart
          value={p.certiScore}
          maxValue={100}
          label={p.address}
          sublabel="/ 100"
          color={p.certiScore >= 80 ? theme.primaryLight : p.certiScore >= 60 ? theme.accent : "#FF6B6B"}
          size={260}
          delay={8}
        />

        <AnimatedSubtitle
          text={p.certiScore >= 80 ? "Excellent match for your lifestyle" : "Good match — review details"}
          delay={16}
          fontSize={20}
        />
      </div>
    </FadeWrapper>
  );
};

const CostScene: React.FC<ListingProps> = (p) => {
  const { fps } = useVideoConfig();

  return (
    <FadeWrapper durationFrames={9 * fps}>
      <div
        style={{
          width: "100%",
          height: "100%",
          background: theme.gradientDark,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "60px 40px",
          gap: 20,
        }}
      >
        <div
          style={{
            fontSize: 14,
            fontFamily: theme.fontMono,
            color: theme.primaryLight,
            letterSpacing: "0.15em",
            textTransform: "uppercase",
          }}
        >
          TRUE MONTHLY COST
        </div>
        <AnimatedTitle text="CertiCost" fontSize={42} color={theme.accent} />

        <div style={{ display: "flex", gap: 30, marginTop: 10 }}>
          <AnimatedCounter
            to={p.certiCostTotal}
            prefix="$"
            suffix="/mo"
            delay={6}
            fontSize={42}
            label="Real total cost"
          />
          <AnimatedCounter
            to={p.mortgageOnly}
            prefix="$"
            suffix="/mo"
            delay={10}
            fontSize={28}
            color="#FF6B6B"
            label="Bank shows only this"
          />
        </div>

        <div style={{ width: "100%", marginTop: 10 }}>
          <BarChart
            data={p.costBreakdown.map((c) => ({
              label: c.label,
              value: c.amount,
              color: c.label === "Mortgage" ? theme.gradientGold : undefined,
            }))}
            delay={14}
          />
        </div>
      </div>
    </FadeWrapper>
  );
};

const CtaScene: React.FC<ListingProps> = (p) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  return (
    <FadeWrapper durationFrames={7 * fps}>
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
          gap: 20,
        }}
      >
        <AnimatedTitle text={`${p.daysToClose}-Day Close`} fontSize={56} />
        <AnimatedSubtitle text="Zero contingencies. Pre-Certified." delay={6} color="rgba(255,255,255,0.8)" />

        <div style={{ marginTop: 20 }}>
          <AnimatedSubtitle text={`Agent: ${p.agentName}`} delay={12} fontSize={20} color="rgba(255,255,255,0.6)" />
        </div>

        <div
          style={{
            marginTop: 30,
            padding: "16px 40px",
            background: "rgba(255,255,255,0.15)",
            borderRadius: 12,
            opacity: spring({ frame: frame - 18, fps, config: { damping: 20, stiffness: 100 } }),
          }}
        >
          <span style={{ fontSize: 20, fontWeight: 700, color: theme.white }}>
            certihomes.com
          </span>
        </div>
      </div>
    </FadeWrapper>
  );
};
