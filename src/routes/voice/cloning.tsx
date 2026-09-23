import { createFileRoute } from "@tanstack/react-router";
import { VoiceSubPage } from "@/components/halo/VoiceSubPage";
import icon from "@/assets/halo/ic_voice_recording.png.asset.json";

export const Route = createFileRoute("/voice/cloning")({
  head: () => ({
    meta: [
      { title: "Voice Cloning — HALO" },
      { name: "description", content: "Create a HALO voice from a short sample." },
      { property: "og:title", content: "Voice Cloning — HALO" },
      { property: "og:description", content: "Create a HALO voice from a short sample." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: () => (
    <VoiceSubPage
      title="Voice Cloning"
      subtitle="Create a voice from a sample."
      icon={icon}
      backTo="/voice/hub"
      parent={{ label: "Voice Hub", to: "/voice/hub" }}
      points={[
        "Record or upload a clean voice sample.",
        "Review the generated voice before saving.",
        "Use the cloned voice anywhere in HALO.",
      ]}
    />
  ),
});
