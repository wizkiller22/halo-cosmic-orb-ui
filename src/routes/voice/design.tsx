import { createFileRoute } from "@tanstack/react-router";
import { VoiceSubPage } from "@/components/halo/VoiceSubPage";
import icon from "@/assets/halo/ic_voice_wave.png.asset.json";

export const Route = createFileRoute("/voice/design")({
  head: () => ({
    meta: [
      { title: "Voice Design — HALO" },
      { name: "description", content: "Build a HALO voice from your preferences." },
      { property: "og:title", content: "Voice Design — HALO" },
      { property: "og:description", content: "Build a HALO voice from your preferences." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: () => (
    <VoiceSubPage
      title="Voice Design"
      subtitle="Build a voice from your preferences."
      icon={icon}
      backTo="/voice/hub"
      parent={{ label: "Voice Hub", to: "/voice/hub" }}
      points={[
        "Describe the tone, age and accent you have in mind.",
        "Shape warmth, energy and expression.",
        "Save the result as a designed voice in My Voices.",
      ]}
    />
  ),
});
