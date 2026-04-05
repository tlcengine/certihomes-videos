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
  LineChart,
  AnimatedCounter,
  DonutChart,
} from "../components/AnimatedChart";
import { ProgressBar } from "../components/ProgressBar";

/**
 * Weekly Market Report — automated content for social media.
 * Feed it market data and it generates a branded report video.
 *
 * 45 seconds, vertical (1080x1920) for TikTok/Reels.
 */

export interface MarketReportProps {
  region: string;
  week: string;
  medianPrice: number;
  priceChangePercent: number;
  daysOnMarket: number;
  domChange: number;
  newListings: number;
  closedSales: number;
  inventory: number;
  monthsSupply: number;
  priceHistory: number[]; // 12 data points (months)
  priceLabels: string[];
}

const defaultProps: MarketReportProps = {
  region: "North Jersey",
  week: "March 28 – April 4, 2026",
  medianPrice: 625000,
  priceChangePercent: 4.2,
  daysOnMarket: 28,
  domChange: -5,
  newListings: 342,
  closedSales: 287,
  inventory: 1845,
  monthsSupply: 3.2,
  priceHistory: [540, 555, 568, 575, 582, 590, 598, 605, 610, 615, 620, 625],
  priceLabels: ["Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec", "Jan", "Feb", "Mar"],
};

export const MarketReport: React.FC<Partial<MarketReportProps>> = (props) => {
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
      {/* Scene 1: Title (0-5s) */}
      <Sequence from={0} durationInFrames={5 * fps}>
        <TitleScene region={p.region} week={p.week} />
      </Sequence>

      {/* Scene 2: Price + trend (5-17s) */}
      <Sequence from={5 * fps} durationInFrames={12 * fps}>
        <PriceTrendScene {...p} />
      </Sequence>

      {/* Scene 3: Market activity (17-29s) */}
      <Sequence from={17 * fps} durationInFrames={12 * fps}>
        <ActivityScene {...p} />
      </Sequence>

      {/* Scene 4: Supply + inventory (29-39s) */}
      <Sequence from={29 * fps} durationInFrames={10 * fps}>
        <SupplyScene {...p} />
      </Sequence>

      {/* Scene 5: CTA (39-45s) */}
      <Sequence from={39 * fps} durationInFrames={6 * fps}>
        <ReportCtaScene region={p.region} />
      </Sequence>

      <ProgressBar />
    </div>
  );
};

const Fade: React.FC<{ children: React.ReactNode; dur: number }> = ({ children, dur }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const fadeIn = spring({ frame, fps, config: { damping: 20, stiffness: 100 } });
  const fadeOut = interpolate(frame, [dur - 8, dur], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  return <div style={{ width: "100%", height: "100%", opacity: Math.min(fadeIn, fadeOut) }}>{children}</div>;
};

const TitleScene: React.FC<{ region: string; week: string }> = ({ region, week }) => {
  const { fps } = useVideoConfig();
  return (
    <Fade dur={5 * fps}>
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
          }}
        >
          WEEKLY MARKET REPORT
        </div>
        <AnimatedTitle text={region} fontSize={56} />
        <AnimatedSubtitle text={week} delay={8} color="rgba(255,255,255,0.7)" fontSize={22} />
      </div>
    </Fade>
  );
};

const PriceTrendScene: React.FC<MarketReportProps> = (p) => {
  const { fps } = useVideoConfig();
  const isUp = p.priceChangePercent > 0;

  return (
    <Fade dur={12 * fps}>
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
          MEDIAN SALE PRICE
        </div>

        <AnimatedCounter
          to={p.medianPrice}
          prefix="$"
          delay={6}
          fontSize={64}
          color={theme.accent}
        />

        <div
          style={{
            fontSize: 24,
            fontWeight: 700,
            color: isUp ? theme.primaryLight : "#FF6B6B",
            fontFamily: theme.fontFamily,
            opacity: spring({ frame: useCurrentFrame() - 12, fps, config: { damping: 20, stiffness: 100 } }),
          }}
        >
          {isUp ? "▲" : "▼"} {Math.abs(p.priceChangePercent)}% YoY
        </div>

        <div style={{ marginTop: 20, width: "100%" }}>
          <LineChart
            points={p.priceHistory}
            labels={p.priceLabels}
            color={theme.accent}
            delay={14}
            title="12-Month Price Trend ($K)"
            width={960}
            height={400}
          />
        </div>
      </div>
    </Fade>
  );
};

const ActivityScene: React.FC<MarketReportProps> = (p) => {
  const { fps } = useVideoConfig();
  return (
    <Fade dur={12 * fps}>
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
          gap: 30,
        }}
      >
        <AnimatedTitle text="Market Activity" fontSize={42} color={theme.accent} />

        <div style={{ display: "flex", gap: 40, marginTop: 10 }}>
          <AnimatedCounter to={p.newListings} delay={6} fontSize={56} label="New Listings" />
          <AnimatedCounter to={p.closedSales} delay={10} fontSize={56} label="Closed Sales" />
        </div>

        <div style={{ display: "flex", gap: 40, marginTop: 10 }}>
          <AnimatedCounter
            to={p.daysOnMarket}
            delay={14}
            fontSize={48}
            label="Avg Days on Market"
            suffix=" days"
          />
        </div>

        <div
          style={{
            fontSize: 20,
            fontWeight: 600,
            color: p.domChange < 0 ? theme.primaryLight : "#FF6B6B",
            fontFamily: theme.fontFamily,
            opacity: spring({ frame: useCurrentFrame() - 20, fps, config: { damping: 20, stiffness: 100 } }),
          }}
        >
          {p.domChange < 0 ? "↓" : "↑"} {Math.abs(p.domChange)} days vs last week
        </div>
      </div>
    </Fade>
  );
};

const SupplyScene: React.FC<MarketReportProps> = (p) => {
  const { fps } = useVideoConfig();
  const isBuyerMarket = p.monthsSupply > 6;

  return (
    <Fade dur={10 * fps}>
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
        <AnimatedTitle text="Supply & Inventory" fontSize={42} color={theme.accent} />

        <div style={{ display: "flex", gap: 50, marginTop: 20 }}>
          <DonutChart
            value={p.monthsSupply * 10}
            maxValue={100}
            label="Months Supply"
            sublabel={`${p.monthsSupply}`}
            color={isBuyerMarket ? theme.primaryLight : theme.accent}
            size={200}
            delay={8}
          />
          <AnimatedCounter
            to={p.inventory}
            delay={12}
            fontSize={56}
            label="Active Listings"
          />
        </div>

        <div
          style={{
            marginTop: 20,
            padding: "12px 24px",
            borderRadius: 10,
            background: isBuyerMarket
              ? "rgba(42, 122, 95, 0.2)"
              : "rgba(212, 175, 55, 0.2)",
            border: `1px solid ${isBuyerMarket ? theme.primaryLight : theme.accent}40`,
            opacity: spring({ frame: useCurrentFrame() - 18, fps, config: { damping: 20, stiffness: 100 } }),
          }}
        >
          <span
            style={{
              fontSize: 18,
              fontWeight: 700,
              color: isBuyerMarket ? theme.primaryLight : theme.accent,
            }}
          >
            {isBuyerMarket ? "Buyer's Market" : p.monthsSupply < 3 ? "Strong Seller's Market" : "Balanced Market"}
          </span>
        </div>
      </div>
    </Fade>
  );
};

const ReportCtaScene: React.FC<{ region: string }> = ({ region }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  return (
    <Fade dur={6 * fps}>
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
        <AnimatedTitle text="CertiHomes" fontSize={56} color={theme.accent} />
        <AnimatedSubtitle
          text={`Your ${region} market expert`}
          delay={6}
          color="rgba(255,255,255,0.8)"
        />
        <div
          style={{
            marginTop: 30,
            padding: "16px 40px",
            background: "rgba(255,255,255,0.15)",
            borderRadius: 12,
            opacity: spring({ frame: frame - 12, fps, config: { damping: 20, stiffness: 100 } }),
          }}
        >
          <span style={{ fontSize: 20, fontWeight: 700, color: theme.white }}>
            certihomes.com
          </span>
        </div>
      </div>
    </Fade>
  );
};
