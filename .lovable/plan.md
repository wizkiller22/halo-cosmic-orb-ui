# HALO Voice UI

## Goal
Build the first-screen HALO Voice experience to closely match the supplied mobile reference, while scaling cleanly to tablet and desktop.

## What will be built
- A centered HALO header with the official logo, menu control, Pro badge, and settings control.
- The Voice listening area with the canonical animated HALO Orb, waveform treatment, listening state, and stop hint.
- A HALO Activity panel with the four status indicators shown in the reference.
- Five suggestion cards, the recent-file strip, and Today’s brief summary.
- A fixed voice command bar and bottom navigation matching the supplied composition.
- A working slide-out drawer containing Voice, Chat, Vision, Documents, Translate, Music, Images, Memory, Profile, Plans & Pricing, and Settings; only Voice is active in this version.
- Polished mobile, tablet, and desktop arrangements that preserve the reference hierarchy.

## Visual foundation
- Use only the supplied HALO logo, Orb, Voice, and navigation artwork for HALO-specific visuals.
- Define reusable cosmic surfaces, luminous borders, blue/violet glow, typography, spacing, and motion tokens.
- Keep the interface dark, compact, glass-like, and restrained; no generic substitute icons for HALO modules.

## Interaction scope
- Menu opens and closes the drawer, including backdrop dismissal and Escape support.
- Voice controls switch between listening and paused visual states locally.
- Suggestion and recent-item controls provide polished pressed/focus feedback without implementing AI or document processing.
- Other module entries remain unavailable rather than creating unfinished screens.

## Technical details
- Organize the screen into reusable React components and typed local data collections.
- Use the supplied Rive file with state machine `Assistant_SM`, with the canonical static Orb as a resilient fallback.
- Keep all colors and effects in semantic design tokens.
- Add route-specific metadata for the Voice screen.
- Validate desktop and mobile rendering, drawer behavior, and basic controls in the live preview.

## Not included
Backend services, authentication, persistent data, real voice capture, AI processing, or additional module screens.
