import { createFileRoute } from "@tanstack/react-router";
import { VoiceSubPage } from "@/components/halo/VoiceSubPage";
import icon from "@/assets/halo/ic_play.png.asset.json";

export const Route = createFileRoute("/voice/preview")({
  head: () => ({
    meta: [
      { title: "Voice Preview — HALO" },
      { name: "description", content: "Listen to a HALO voice before using it." },
      { property: "og:title", content: "Voice Preview — HALO" },
      { property: "og:description", content: "Listen to a HALO voice before using it." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: () => (
    <VoiceSubPage
      title="Voice Preview"
      subtitle="Listen before using a voice."
      icon={icon}
      backTo="/voice/hub"
      parent={{ label: "Voice Hub", to: "/voice/hub" }}
      points={[
        "Play a sample sentence with any saved voice.",
        "Compare voices side by side.",
        "Keep the one that fits your conversations best.",
      ]}
    />
  ),
});
