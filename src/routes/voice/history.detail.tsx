import { createFileRoute } from "@tanstack/react-router";

import { HaloLayout, VoicePageTitle, VoiceTrail } from "@/components/halo/HaloChrome";
import playIcon from "@/assets/halo/ic_play.png.asset.json";
import voiceIcon from "@/assets/halo/ic_voice.png.asset.json";
import moreIcon from "@/assets/halo/ic_more.png.asset.json";

const facts = [
  ["Duration", "04:32"],
  ["Language", "English"],
  ["Voice", "HALO"],
] as const;

function HistoryDetail() {
  return (
    <HaloLayout>
      <VoiceTrail
        backTo="/voice/history"
        crumbs={[
          { label: "Voice", to: "/" },
          { label: "Voice History", to: "/voice/history" },
          { label: "Session" },
        ]}
      />
      <VoicePageTitle title="Voice Conversation" subtitle="Today · 10:42" />
      <section className="content-section detail-facts">
        {facts.map(([label, value]) => (
          <div className="fact-card glass-panel" key={label}>
            <small>{label}</small>
            <strong>{value}</strong>
          </div>
        ))}
      </section>
      <section className="content-section">
        <div className="section-heading">
          <h2>Transcript</h2>
          <button type="button" className="view-all">
            <img src={moreIcon.url} alt="" aria-hidden="true" />
          </button>
        </div>
        <div className="transcript glass-panel">
          <p>
            <b>You</b> Summarize the annual report and highlight the revenue trend.
          </p>
          <p>
            <b>HALO</b> Revenue grew 18% year over year, driven by subscriptions. I saved a short
            summary to your documents.
          </p>
          <p>
            <b>You</b> Remind me about it before the project review.
          </p>
          <p>
            <b>HALO</b> Noted for 11:00 AM today.
          </p>
        </div>
      </section>
      <section className="content-section detail-actions">
        <button type="button" className="ghost-action">
          <img src={playIcon.url} alt="" aria-hidden="true" />
          <span>Playback</span>
        </button>
        <button type="button" className="ghost-action">
          <img src={voiceIcon.url} alt="" aria-hidden="true" />
          <span>Share</span>
        </button>
        <button type="button" className="ghost-action danger">
          <span>Delete</span>
        </button>
      </section>
    </HaloLayout>
  );
}

export const Route = createFileRoute("/voice/history/detail")({
  head: () => ({
    meta: [
      { title: "Voice session — HALO" },
      {
        name: "description",
        content: "Transcript, playback and details of a HALO voice session.",
      },
      { property: "og:title", content: "Voice session — HALO" },
      {
        property: "og:description",
        content: "Transcript, playback and details of a HALO voice session.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: HistoryDetail,
});
