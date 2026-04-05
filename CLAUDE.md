# CLAUDE.md

## Project

- **Name:** certihomes-videos
- **GitHub:** tlcengine/certihomes-videos
- **Purpose:** Programmatic video generation for CertiHomes using Remotion

## Key Directories

| Path | Contents |
|------|----------|
| `src/compositions/` | Video compositions (InvestorPitch, etc.) |
| `src/components/` | Reusable animated components (transitions, overlays, text) |
| `src/lib/` | Theme, scene data, utilities |
| `public/` | Audio, images, static assets |
| `out/` | Rendered output (.mp4) |

## Commands

```bash
npm run dev              # Launch Remotion Studio (port 3040)
npm run render           # Render landscape 1920x1080
npm run render:vertical  # Render vertical 1080x1920
```

## Infrastructure

- Remotion Studio runs on port 3040
- Proxied via nginx at videos.certihomes.com
- PM2 process name: `certihomes-videos`

## Audio Pipeline

- Audio assets generated on geo2 via Kokoro TTS
- Scene timings in `src/lib/scenes.ts` must match audio timestamps exactly
- Narration files stored in `public/audio/`

## Theme

- Brand colors and typography defined in `src/lib/theme.ts`
- All compositions should use theme constants for consistency
