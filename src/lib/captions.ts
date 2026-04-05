/**
 * Cleaned caption segments for the investor pitch.
 * Based on Whisper word-level timestamps, with hallucinations removed
 * and text corrected to match the actual pitch script.
 *
 * Each caption shows ~6-12 words at a time (readable pacing).
 */

export interface Caption {
  text: string;
  start: number; // seconds
  end: number;
}

export const pitchCaptions: Caption[] = [
  // 0-11s: Opening
  { text: "Everyone thinks buying a home is the hard part.", start: 0, end: 2.88 },
  { text: "It's not.", start: 2.88, end: 5.78 },
  { text: "The hard part is everything you don't see coming.", start: 5.78, end: 11.26 },

  // 11-28s: Hidden costs
  { text: "The $800 commute.", start: 12.5, end: 14.58 },
  { text: "The $400 water heater fund.", start: 14.58, end: 18.84 },
  { text: "The school district that drops your home's value.", start: 18.84, end: 24.64 },
  { text: "The HOA that doubles in year three.", start: 24.64, end: 27.48 },

  // 28-38s: Rubik's cube
  { text: "A home isn't a purchase.", start: 29.48, end: 30.82 },
  { text: "It's a Rubik's Cube of hidden costs", start: 30.82, end: 34.24 },
  { text: "that touch every part of your life.", start: 34.24, end: 37.74 },
  { text: "Your budget. Your kids' education.", start: 37.74, end: 42.06 },
  { text: "Your retirement. Your daily commute.", start: 42.06, end: 45.06 },
  { text: "Your lifestyle.", start: 45.06, end: 47.64 },

  // 47-56s: Solution
  { text: "CertiHomes solves the whole cube.", start: 47.64, end: 50.9 },
  { text: "We are the only platform that Pre-Certifies homes,", start: 50.9, end: 55.92 },

  // 56-86s: Pre-certification details (audio continues through here)
  { text: "like Carvana did for cars.", start: 56, end: 60 },
  { text: "Inspection done. Appraisal done.", start: 60, end: 66 },
  { text: "Title cleared. Mortgage pre-approved.", start: 66, end: 72 },
  { text: "Before the home even hits the market.", start: 72, end: 78 },

  // 78-86s: Result
  { text: "The result? Fifteen-day close.", start: 78, end: 82 },
  { text: "Zero contingencies.", start: 82, end: 85 },
  { text: "The seller saves $35,000 versus a traditional agent.", start: 85, end: 92 },

  // 92-110s: W2 Agents
  { text: "Our W2 agents — not contractors —", start: 92, end: 98 },
  { text: "employees with health insurance and stock options,", start: 98, end: 104 },
  { text: "close 8 to 10 transactions per month.", start: 104, end: 110 },
  { text: "The industry average is three.", start: 110, end: 115 },

  // 115-141s: AI Platform
  { text: "CertiCost shows the TRUE monthly cost.", start: 115.94, end: 119.32 },
  { text: "25 line items, not just the mortgage.", start: 119.32, end: 121.74 },
  { text: "CertiScore matches your life to a home, 0 to 100.", start: 122.16, end: 127.96 },
  { text: "CertiPredict detects life events —", start: 128.6, end: 131.44 },
  { text: "graduation, divorce, retirement —", start: 131.74, end: 135.22 },
  { text: "and identifies sellers before they even call an agent.", start: 135.22, end: 140.66 },

  // 141-159s: Mortgage
  { text: "Our mortgage is powered by UWM,", start: 141.64, end: 144.5 },
  { text: "the #1 wholesale lender in America,", start: 144.64, end: 149.32 },
  { text: "plus our proprietary rate buydown strategy.", start: 149.32, end: 153.42 },
  { text: "Buyers get the best rate in the market. Period.", start: 154.58, end: 158.54 },

  // 159-179s: Scale
  { text: "We are targeting 1,250 transactions per month", start: 159.88, end: 165.04 },
  { text: "by year three.", start: 165.04, end: 165.86 },
  { text: "With only 125 agents.", start: 167.78, end: 172.78 },
  { text: "Realty of America needed 3,000 agents to do less.", start: 174.62, end: 178.92 },

  // 179-195s: Revenue
  { text: "$400 million in annual revenue.", start: 181.3, end: 183.96 },
  { text: "All built on millions of data points", start: 185.18, end: 189.52 },
  { text: "of Actionable Intelligence", start: 189.52, end: 190.92 },
  { text: "across the entire homeownership lifecycle.", start: 190.92, end: 194.86 },

  // 195-202s: CTA
  { text: "Know before you owe.", start: 196.0, end: 197.54 },
  { text: "Live your life.", start: 197.74, end: 199.04 },
  { text: "CertiHomes. We are ready.", start: 200.34, end: 201.8 },
];
