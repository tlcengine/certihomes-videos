# CertiHomes Videos

Programmatic video generation platform using Remotion (React) + Claude AI. Replaces GPU-dependent pipelines (SadTalker, CogVideoX) with deterministic, high-quality, CPU-rendered video compositions.

## Architecture

```
Kokoro/F5-TTS (geo2) ──> Audio narration (.wav)
FLUX (image gen)       ──> Scene backgrounds (.png)
Whisper (transcription)──> Auto-captions (.srt)
         │
         v
┌─────────────────────────────┐
│  Remotion (React/TypeScript)│
│  ├─ Scene compositions      │
│  ├─ Animated components     │
│  ├─ Audio sync              │
│  └─ H.264/AAC render        │
└─────────────────────────────┘
         │
         v
    Final .mp4 output
```

## Available Compositions

| Composition | Aspect Ratio | Resolution | Use Case |
|-------------|-------------|------------|----------|
| InvestorPitch | 16:9 | 1920x1080 | Presentations, YouTube, website |
| InvestorPitchVertical | 9:16 | 1080x1920 | TikTok, Reels, Shorts |

## Commands

```bash
npm run dev              # Launch Remotion Studio (port 3040)
npm run render           # Render landscape 1920x1080 .mp4
npm run render:vertical  # Render vertical 1080x1920 .mp4
```

## Tech Stack

- Remotion 4 (programmatic video framework)
- React 19
- TypeScript
- H.264/AAC output via Remotion renderer

## Studio

Live studio available at: https://videos.certihomes.com
