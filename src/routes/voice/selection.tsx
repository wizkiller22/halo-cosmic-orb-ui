import { createFileRoute } from "@tanstack/react-router";
import { VoiceSubPage } from "@/components/halo/VoiceSubPage";
import icon from "@/assets/halo/ic_voice.png.asset.json";

export const Route = createFileRoute("/voice/selection")({
  head: () => ({
    meta: [
      { title: "Voice Selection — HALO" },
      { name: "description", content: "Choose the active HALO voice." },
      { property: "og:title", content: "Voice Selection — HALO" },
      { property: "og:description", content: "Choose the active HALO voice." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: () => (
    <VoiceSubPage
      title="Voice Selection"
      subtitle="Choose the active HALO voice."
      icon={icon}
      backTo="/voice/hub"
      parent={{ label: "Voice Hub", to: "/voice/hub" }}
      points={[
        "HALO — default voice · English.",
        "Aurora — designed voice · English / French.",
        "The active voice is used across every HALO module.",
      ]}
    />
  ),
});
