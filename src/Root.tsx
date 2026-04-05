import { Composition } from "remotion";
import { InvestorPitch } from "./compositions/InvestorPitch";
import { EducationExplainer } from "./compositions/EducationExplainer";
import { ProductDemo } from "./compositions/ProductDemo";
import { DataViz } from "./compositions/DataViz";
import { ListingVideo } from "./compositions/ListingVideo";
import { MarketReport } from "./compositions/MarketReport";
import { SocialClip } from "./compositions/SocialClip";

const FPS = 30;

export const RemotionRoot: React.FC = () => {
  return (
    <>
      {/* ====== INVESTOR PITCH (202s) ====== */}
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

      {/* ====== DEMO COMPOSITIONS ====== */}
      <Composition
        id="EducationExplainer"
        component={EducationExplainer}
        durationInFrames={60 * FPS}
        fps={FPS}
        width={1080}
        height={1920}
      />
      <Composition
        id="ProductDemo"
        component={ProductDemo}
        durationInFrames={45 * FPS}
        fps={FPS}
        width={1920}
        height={1080}
      />
      <Composition
        id="DataViz"
        component={DataViz}
        durationInFrames={45 * FPS}
        fps={FPS}
        width={1920}
        height={1080}
      />

      {/* ====== REAL CONTENT TEMPLATES ====== */}

      {/* Property Listing Video — 30s vertical for agent social media */}
      <Composition
        id="ListingVideo"
        component={ListingVideo}
        durationInFrames={30 * FPS}
        fps={FPS}
        width={1080}
        height={1920}
      />

      {/* Weekly Market Report — 45s vertical for social media */}
      <Composition
        id="MarketReport"
        component={MarketReport}
        durationInFrames={45 * FPS}
        fps={FPS}
        width={1080}
        height={1920}
      />

      {/* Social Clip — 15s vertical quick-hit stats */}
      <Composition
        id="SocialClip"
        component={SocialClip}
        durationInFrames={15 * FPS}
        fps={FPS}
        width={1080}
        height={1920}
      />
    </>
  );
};
