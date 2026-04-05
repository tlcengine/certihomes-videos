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
import {
  BarChart,
  DonutChart,
  LineChart,
  AnimatedCounter,
} from "../components/AnimatedChart";
import { ProgressBar } from "../components/ProgressBar";

/**
 * Data Visualization Dashboard — animated business metrics.
 * 45 seconds, landscape (1920x1080).
 * Shows: Revenue projections, market size, agent productivity, transaction volume.
 */

interface VizScene {
  id: string;
  startSec: number;
  endSec: number;
}

const vizScenes: VizScene[] = [
  { id: "title", startSec: 0, endSec: 4 },
  { id: "revenue", startSec: 4, endSec: 15 },
  { id: "market", startSec: 15, endSec: 26 },
  { id: "agents", startSec: 26, endSec: 37 },
  { id: "summary", startSec: 37, endSec: 45 },
];

export const DataViz: React.FC = () => {
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
      {vizScenes.map((scene) => {
        const startFrame = Math.round(scene.startSec * fps);
        const dur = Math.round((scene.endSec - scene.startSec) * fps);
        return (
          <Sequence key={scene.id} from={startFrame} durationInFrames={dur}>
            <VizSceneRenderer sceneId={scene.id} durationFrames={dur} />
          </Sequence>
        );
      })}
      <ProgressBar />
    </div>
  );
};

const VizSceneRenderer: React.FC<{
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
      }}
    >
      {sceneId === "title" && <TitleScene />}
      {sceneId === "revenue" && <RevenueScene />}
      {sceneId === "market" && <MarketScene />}
      {sceneId === "agents" && <AgentsScene />}
      {sceneId === "summary" && <SummaryScene />}
    </div>
  );
};

const TitleScene: React.FC = () => (
  <div
    style={{
      width: "100%",
      height: "100%",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      background: theme.gradientDark,
    }}
  >
    <div
      style={{
        fontSize: 14,
        fontFamily: theme.fontMono,
        color: theme.accent,
        letterSpacing: "0.2em",
        textTransform: "uppercase",
        marginBottom: 20,
      }}
    >
      CERTIHOMES INVESTOR METRICS
    </div>
    <AnimatedTitle text="By The Numbers" fontSize={72} />
    <AnimatedSubtitle text="Q1 2026 → Year 3 Projections" delay={10} />
  </div>
);

const RevenueScene: React.FC = () => (
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
          fontSize: 13,
          fontFamily: theme.fontMono,
          color: theme.primaryLight,
          letterSpacing: "0.15em",
          textTransform: "uppercase",
          marginBottom: 12,
        }}
      >
        REVENUE TRAJECTORY
      </div>
      <AnimatedTitle text="$400M" fontSize={80} color={theme.accent} />
      <AnimatedSubtitle text="Annual revenue by Year 3" delay={8} />
      <div style={{ marginTop: 30 }}>
        <BarChart
          title="Revenue by Year ($M)"
          data={[
            { label: "Year 1", value: 48, color: theme.gradientGold },
            { label: "Year 2", value: 180, color: theme.gradientGold },
            { label: "Year 3", value: 400, color: theme.gradientGold },
          ]}
          delay={12}
        />
      </div>
    </div>
    <div
      style={{
        flex: 1,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <LineChart
        points={[0, 4, 12, 28, 48, 75, 110, 145, 180, 240, 310, 400]}
        labels={["Q1", "Q2", "Q3", "Q4", "Y2Q1", "Q2", "Q3", "Q4", "Y3Q1", "Q2", "Q3", "Q4"]}
        color={theme.accent}
        delay={8}
        title="Quarterly Revenue Growth ($M)"
        width={700}
        height={350}
      />
    </div>
  </div>
);

const MarketScene: React.FC = () => (
  <div
    style={{
      width: "100%",
      height: "100%",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      gap: 60,
      padding: 80,
      background: theme.gradientDark,
    }}
  >
    <div style={{ display: "flex", flexDirection: "column", gap: 16, flex: 1 }}>
      <div
        style={{
          fontSize: 13,
          fontFamily: theme.fontMono,
          color: theme.primaryLight,
          letterSpacing: "0.15em",
          textTransform: "uppercase",
        }}
      >
        MARKET OPPORTUNITY
      </div>
      <AnimatedTitle text={"$2.3T\nMarket"} fontSize={64} color={theme.accent} />
      <AnimatedSubtitle
        text="US residential real estate annual transaction volume"
        delay={8}
      />
      <div style={{ marginTop: 20 }}>
        <BarChart
          data={[
            { label: "Traditional", value: 92, color: "linear-gradient(90deg, #555, #777)" },
            { label: "iBuyer", value: 5 },
            { label: "CertiHomes", value: 3, color: theme.gradientGreen },
          ]}
          title="Market Share (%)"
          delay={14}
          maxValue={100}
        />
      </div>
    </div>
    <div
      style={{
        flex: 1,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 20,
      }}
    >
      <DonutChart
        value={15000}
        maxValue={15000}
        label="Annual Transactions (Year 3)"
        sublabel="target"
        color={theme.accent}
        size={220}
        delay={10}
      />
      <AnimatedCounter
        to={35000}
        prefix="$"
        suffix=""
        delay={18}
        fontSize={42}
        label="avg seller savings vs traditional agent"
      />
    </div>
  </div>
);

const AgentsScene: React.FC = () => (
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
          fontSize: 13,
          fontFamily: theme.fontMono,
          color: theme.primaryLight,
          letterSpacing: "0.15em",
          textTransform: "uppercase",
        }}
      >
        AGENT PRODUCTIVITY
      </div>
      <AnimatedTitle text={"3x Industry\nProductivity"} fontSize={52} />
      <div style={{ marginTop: 20 }}>
        <BarChart
          data={[
            { label: "Industry Avg", value: 3, color: "linear-gradient(90deg, #555, #777)" },
            { label: "CertiHomes", value: 10, color: theme.gradientGreen },
          ]}
          title="Transactions per Agent per Month"
          delay={10}
        />
      </div>
    </div>
    <div
      style={{
        flex: 1,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 30,
      }}
    >
      <AnimatedCounter
        to={125}
        delay={8}
        fontSize={80}
        label="W2 agents needed"
      />
      <AnimatedCounter
        to={3000}
        delay={16}
        fontSize={48}
        color="#FF6B6B"
        label="agents Realty of America needed to do less"
      />
    </div>
  </div>
);

const SummaryScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const metrics = [
    { value: "$400M", label: "Revenue" },
    { value: "15K", label: "Transactions" },
    { value: "125", label: "Agents" },
    { value: "15", label: "Day Close" },
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
        gap: 50,
        background: theme.gradientGreen,
      }}
    >
      <AnimatedTitle text="CertiHomes" fontSize={64} />
      <div style={{ display: "flex", gap: 50 }}>
        {metrics.map((m, i) => {
          const progress = spring({
            frame: frame - 6 - i * 5,
            fps,
            config: { damping: 18, stiffness: 80 },
          });
          return (
            <div
              key={i}
              style={{
                textAlign: "center",
                opacity: interpolate(progress, [0, 0.3], [0, 1], {
                  extrapolateRight: "clamp",
                }),
                transform: `translateY(${interpolate(progress, [0, 1], [20, 0])}px)`,
              }}
            >
              <div
                style={{
                  fontSize: 48,
                  fontWeight: 900,
                  color: theme.accent,
                  fontFamily: theme.fontFamily,
                }}
              >
                {m.value}
              </div>
              <div
                style={{
                  fontSize: 16,
                  color: "rgba(255,255,255,0.7)",
                  fontFamily: theme.fontFamily,
                  marginTop: 4,
                }}
              >
                {m.label}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
