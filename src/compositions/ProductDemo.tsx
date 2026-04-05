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
import { DonutChart, AnimatedCounter } from "../components/AnimatedChart";
import { ProgressBar } from "../components/ProgressBar";

/**
 * Product Demo — Simulated walkthrough of CertiHomes platform.
 * 45 seconds, landscape (1920x1080).
 * Shows: CertiCost, CertiScore, CertiPredict in action.
 */

interface DemoScene {
  id: string;
  startSec: number;
  endSec: number;
}

const demoScenes: DemoScene[] = [
  { id: "intro", startSec: 0, endSec: 5 },
  { id: "certicost", startSec: 5, endSec: 18 },
  { id: "certiscore", startSec: 18, endSec: 30 },
  { id: "certipredict", startSec: 30, endSec: 40 },
  { id: "outro", startSec: 40, endSec: 45 },
];

export const ProductDemo: React.FC = () => {
  const { fps } = useVideoConfig();

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        background: theme.dark,
        position: "relative",
        overflow: "hidden",
      }}
    >
      {demoScenes.map((scene) => {
        const startFrame = Math.round(scene.startSec * fps);
        const dur = Math.round((scene.endSec - scene.startSec) * fps);
        return (
          <Sequence key={scene.id} from={startFrame} durationInFrames={dur}>
            <DemoSceneRenderer sceneId={scene.id} durationFrames={dur} />
          </Sequence>
        );
      })}
      <ProgressBar />
    </div>
  );
};

const DemoSceneRenderer: React.FC<{
  sceneId: string;
  durationFrames: number;
}> = ({ sceneId, durationFrames }) => {
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
        opacity,
        position: "relative",
      }}
    >
      {sceneId === "intro" && <IntroScene />}
      {sceneId === "certicost" && <CertiCostScene />}
      {sceneId === "certiscore" && <CertiScoreScene />}
      {sceneId === "certipredict" && <CertiPredictScene />}
      {sceneId === "outro" && <OutroScene />}
    </div>
  );
};

const IntroScene: React.FC = () => (
  <div
    style={{
      width: "100%",
      height: "100%",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      background: theme.gradientGreen,
    }}
  >
    <AnimatedTitle text="Product Demo" fontSize={64} />
    <AnimatedSubtitle text="See CertiHomes in action" delay={8} color="rgba(255,255,255,0.8)" />
  </div>
);

const CertiCostScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const costItems = [
    { label: "Mortgage P&I", amount: 2450 },
    { label: "Property Tax", amount: 680 },
    { label: "Home Insurance", amount: 180 },
    { label: "HOA Fees", amount: 350 },
    { label: "Commute Cost", amount: 420 },
    { label: "Maintenance", amount: 380 },
    { label: "Utilities", amount: 290 },
    { label: "School Premium", amount: 150 },
  ];

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        padding: 80,
        gap: 60,
        background: theme.gradientDark,
      }}
    >
      {/* Left side — title + total */}
      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            fontSize: 14,
            fontFamily: theme.fontMono,
            color: theme.primaryLight,
            letterSpacing: "0.15em",
            textTransform: "uppercase",
            marginBottom: 12,
          }}
        >
          CERTIHOMES PLATFORM
        </div>
        <AnimatedTitle text="CertiCost" fontSize={56} color={theme.accent} />
        <AnimatedSubtitle
          text="The TRUE monthly cost of 742 Maple Drive"
          delay={8}
          fontSize={22}
        />
        <div style={{ marginTop: 40 }}>
          <AnimatedCounter
            to={4900}
            prefix="$"
            suffix="/mo"
            delay={15}
            fontSize={56}
            label="Total real monthly cost"
          />
        </div>
        <div style={{ marginTop: 16 }}>
          <AnimatedCounter
            to={2450}
            prefix="$"
            suffix="/mo"
            delay={20}
            fontSize={28}
            color="#FF6B6B"
            label="vs $2,450 the bank shows you"
          />
        </div>
      </div>

      {/* Right side — cost breakdown */}
      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          gap: 12,
        }}
      >
        {costItems.map((item, i) => {
          const progress = spring({
            frame: frame - 10 - i * 4,
            fps,
            config: { damping: 18, stiffness: 80 },
          });
          const barWidth = interpolate(progress, [0, 1], [0, (item.amount / 2450) * 100]);
          const isAboveMortgage = i > 2;

          return (
            <div
              key={i}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 10,
                opacity: interpolate(progress, [0, 0.3], [0, 1], {
                  extrapolateRight: "clamp",
                }),
              }}
            >
              <div
                style={{
                  width: 120,
                  fontSize: 13,
                  fontFamily: theme.fontFamily,
                  color: isAboveMortgage ? "#FF8E8E" : theme.lightGray,
                  textAlign: "right",
                  fontWeight: isAboveMortgage ? 600 : 400,
                }}
              >
                {item.label}
              </div>
              <div
                style={{
                  flex: 1,
                  height: 24,
                  backgroundColor: "rgba(255,255,255,0.04)",
                  borderRadius: 4,
                  overflow: "hidden",
                }}
              >
                <div
                  style={{
                    width: `${barWidth}%`,
                    height: "100%",
                    background: isAboveMortgage
                      ? "linear-gradient(90deg, #FF6B6B, #FF8E8E)"
                      : theme.gradientGold,
                    borderRadius: 4,
                  }}
                />
              </div>
              <div
                style={{
                  width: 60,
                  fontSize: 13,
                  fontFamily: theme.fontMono,
                  color: isAboveMortgage ? "#FF6B6B" : theme.accent,
                  fontWeight: 700,
                }}
              >
                ${Math.round(item.amount * progress)}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

const CertiScoreScene: React.FC = () => (
  <div
    style={{
      width: "100%",
      height: "100%",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      gap: 80,
      padding: 80,
      background: theme.gradientDark,
    }}
  >
    <div style={{ display: "flex", flexDirection: "column", gap: 16, flex: 1 }}>
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
      <AnimatedTitle text="CertiScore" fontSize={56} color={theme.accent} />
      <AnimatedSubtitle
        text="How well does this home fit YOUR life?"
        delay={8}
        fontSize={22}
      />
      <div style={{ marginTop: 20 }}>
        <AnimatedSubtitle
          text={"Commute: 12 min to office\nSchools: A+ district (top 5%)\nBudget fit: 28% of income\nLifestyle: Walk score 82"}
          delay={14}
          fontSize={18}
          color={theme.lightGray}
        />
      </div>
    </div>
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 20 }}>
      <DonutChart
        value={87}
        maxValue={100}
        label="742 Maple Drive"
        sublabel="/ 100"
        color={theme.primaryLight}
        size={240}
        delay={10}
      />
      <DonutChart
        value={52}
        maxValue={100}
        label="118 Oak Street"
        sublabel="/ 100"
        color="#FF6B6B"
        size={180}
        delay={18}
      />
    </div>
  </div>
);

const CertiPredictScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const events = [
    { icon: "🎓", label: "Graduation detected", detail: "3 kids aging out → downsizer", confidence: 94 },
    { icon: "💍", label: "Recent divorce filing", detail: "Property likely to list within 6mo", confidence: 87 },
    { icon: "🏖️", label: "Retirement pattern", detail: "Age 63, pension vesting complete", confidence: 91 },
  ];

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: 80,
        gap: 30,
        background: theme.gradientDark,
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
        PREDICTIVE INTELLIGENCE
      </div>
      <AnimatedTitle text="CertiPredict" fontSize={56} color={theme.accent} />
      <AnimatedSubtitle text="Find sellers before they list" delay={6} fontSize={22} />

      <div style={{ display: "flex", gap: 30, marginTop: 30 }}>
        {events.map((event, i) => {
          const progress = spring({
            frame: frame - 12 - i * 10,
            fps,
            config: { damping: 18, stiffness: 80 },
          });
          const translateY = interpolate(progress, [0, 1], [30, 0]);

          return (
            <div
              key={i}
              style={{
                background: "rgba(255,255,255,0.04)",
                borderRadius: 16,
                padding: "30px 24px",
                width: 280,
                opacity: interpolate(progress, [0, 0.3], [0, 1], {
                  extrapolateRight: "clamp",
                }),
                transform: `translateY(${translateY}px)`,
                border: "1px solid rgba(255,255,255,0.08)",
              }}
            >
              <div style={{ fontSize: 36, marginBottom: 12 }}>{event.icon}</div>
              <div
                style={{
                  fontSize: 18,
                  fontWeight: 700,
                  color: theme.white,
                  fontFamily: theme.fontFamily,
                  marginBottom: 6,
                }}
              >
                {event.label}
              </div>
              <div
                style={{
                  fontSize: 14,
                  color: theme.textMuted,
                  fontFamily: theme.fontFamily,
                  marginBottom: 12,
                  lineHeight: 1.4,
                }}
              >
                {event.detail}
              </div>
              <div
                style={{
                  fontSize: 14,
                  fontFamily: theme.fontMono,
                  color: theme.primaryLight,
                  fontWeight: 700,
                }}
              >
                {Math.round(event.confidence * progress)}% confidence
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

const OutroScene: React.FC = () => (
  <div
    style={{
      width: "100%",
      height: "100%",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      background: theme.gradientGreen,
    }}
  >
    <AnimatedTitle text="CertiHomes" fontSize={72} />
    <AnimatedSubtitle
      text="Actionable Intelligence for every home decision"
      delay={8}
      color="rgba(255,255,255,0.8)"
    />
  </div>
);
