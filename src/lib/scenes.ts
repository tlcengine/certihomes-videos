/**
 * Scene definitions for the Investor Pitch.
 * Each scene maps to a segment of the 202-second pitch audio.
 * Timings derived from the script's natural paragraph breaks.
 */

export interface Scene {
  id: string;
  startSec: number;
  endSec: number;
  title: string;
  subtitle?: string;
  bullets?: string[];
  stat?: { value: string; label: string };
  type: "intro" | "problem" | "solution" | "product" | "metric" | "cta";
}

export const scenes: Scene[] = [
  // 0-3s: Title card
  {
    id: "title",
    startSec: 0,
    endSec: 3,
    title: "CertiHomes",
    subtitle: "Know Before You Owe. Live Your Life.",
    type: "intro",
  },
  // 3-17s: "Everyone thinks buying a home is the hard part..."
  {
    id: "problem-hidden",
    startSec: 3,
    endSec: 17,
    title: "The Hard Part",
    subtitle: "Everything you don't see coming",
    bullets: [
      "$800/mo commute",
      "$400/mo water heater fund",
      "School district drops value",
      "HOA doubles in year 3",
    ],
    type: "problem",
  },
  // 17-30s: "A home isn't a purchase. It's a Rubik's cube..."
  {
    id: "problem-rubiks",
    startSec: 17,
    endSec: 30,
    title: "A Rubik's Cube",
    subtitle: "of hidden costs touching every part of your life",
    bullets: ["Budget", "Education", "Retirement", "Commute", "Lifestyle"],
    type: "problem",
  },
  // 30-40s: "CertiHomes solves the whole cube."
  {
    id: "solution-intro",
    startSec: 30,
    endSec: 40,
    title: "CertiHomes Solves\nthe Whole Cube",
    subtitle: "Pre-Certified homes — like Carvana did for cars",
    type: "solution",
  },
  // 40-58s: "Inspection done. Appraisal done..."
  {
    id: "pre-certified",
    startSec: 40,
    endSec: 58,
    title: "Pre-Certified",
    bullets: [
      "✓ Inspection done",
      "✓ Appraisal done",
      "✓ Title cleared",
      "✓ Mortgage pre-approved",
    ],
    subtitle: "Before the home hits the market",
    type: "solution",
  },
  // 58-72s: "15-day close. Zero contingencies..."
  {
    id: "result",
    startSec: 58,
    endSec: 72,
    title: "The Result",
    bullets: [
      "15-day close",
      "Zero contingencies",
      "Seller saves $35K vs traditional agent",
      "Buyer gets certainty",
    ],
    type: "metric",
  },
  // 72-92s: "Our W2 agents... close 8-10 transactions per month"
  {
    id: "w2-agents",
    startSec: 72,
    endSec: 92,
    title: "W2 Agents",
    subtitle: "Not contractors — employees with benefits & stock options",
    stat: { value: "8-10", label: "transactions/month vs industry avg of 3" },
    type: "product",
  },
  // 92-115s: "CertiCost... CertiScore... CertiPredict..."
  {
    id: "ai-platform",
    startSec: 92,
    endSec: 115,
    title: "Actionable Intelligence",
    bullets: [
      "CertiCost — TRUE monthly cost, 25 line items",
      "CertiScore — life-to-home match, 0-100",
      "CertiPredict — detect life events, find sellers early",
    ],
    type: "product",
  },
  // 115-132s: "Our mortgage is powered by UWM..."
  {
    id: "mortgage",
    startSec: 115,
    endSec: 132,
    title: "Best Rate. Period.",
    subtitle: "Powered by UWM — #1 wholesale lender in America",
    bullets: ["Proprietary rate buydown strategy", "Buyers get the best rate in the market"],
    type: "product",
  },
  // 132-158s: "1,250 transactions per month by year 3..."
  {
    id: "scale",
    startSec: 132,
    endSec: 158,
    title: "Scale",
    bullets: [
      "1,250 transactions/month by Year 3",
      "Only 125 agents needed",
      "Realty of America needed 3,000 agents to do less",
    ],
    stat: { value: "$400M", label: "annual revenue target" },
    type: "metric",
  },
  // 158-185s: "$400M in annual revenue... Actionable Intelligence..."
  {
    id: "revenue",
    startSec: 158,
    endSec: 185,
    title: "$400M Annual Revenue",
    subtitle: "Built on millions of data points of Actionable Intelligence",
    bullets: ["Entire homeownership lifecycle", "Data-driven decisions at every step"],
    type: "metric",
  },
  // 185-202s: "Know Before You Owe. Live Your Life. CertiHomes."
  {
    id: "cta",
    startSec: 185,
    endSec: 202,
    title: "CertiHomes",
    subtitle: "Know Before You Owe.\nLive Your Life.",
    type: "cta",
  },
];
