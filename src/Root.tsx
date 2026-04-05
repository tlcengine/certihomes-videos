import { Composition } from "remotion";
import { InvestorPitch } from "./compositions/InvestorPitch";
import { EducationExplainer } from "./compositions/EducationExplainer";
import { ProductDemo } from "./compositions/ProductDemo";
import { DataViz } from "./compositions/DataViz";

const FPS = 30;

export const RemotionRoot: React.FC = () => {
  return (
    <>
      {/* === Investor Pitch (202s) === */}
      <Composition
        id="InvestorPitch"
        component={InvestorPitch}
        durationInFrames={202 * FPS}
        fps={FPS}
        width={1920}
        height={1080}
        defaultProps={{ layout: "landscape" as const }}
      />
      <Composition
        id="InvestorPitchVertical"
        component={InvestorPitch}
        durationInFrames={202 * FPS}
        fps={FPS}
        width={1080}
        height={1920}
        defaultProps={{ layout: "vertical" as const }}
      />

      {/* === Education Explainer (60s) — TikTok/Reels vertical === */}
      <Composition
        id="EducationExplainer"
        component={EducationExplainer}
        durationInFrames={60 * FPS}
        fps={FPS}
        width={1080}
        height={1920}
      />

      {/* === Product Demo (45s) — YouTube/presentation landscape === */}
      <Composition
        id="ProductDemo"
        component={ProductDemo}
        durationInFrames={45 * FPS}
        fps={FPS}
        width={1920}
        height={1080}
      />

      {/* === Data Visualization Dashboard (45s) === */}
      <Composition
        id="DataViz"
        component={DataViz}
        durationInFrames={45 * FPS}
        fps={FPS}
        width={1920}
        height={1080}
      />
    </>
  );
};
