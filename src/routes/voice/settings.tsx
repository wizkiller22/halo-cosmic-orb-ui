import { createFileRoute } from "@tanstack/react-router";
import { VoiceSubPage } from "@/components/halo/VoiceSubPage";
import icon from "@/assets/halo/ic_audio_settings.png.asset.json";

export const Route = createFileRoute("/voice/settings")({
  head: () => ({
    meta: [
      { title: "Voice Customization — HALO" },
      { name: "description", content: "Adjust speed, pitch, expression and emotion." },
      { property: "og:title", content: "Voice Customization — HALO" },
      { property: "og:description", content: "Adjust speed, pitch, expression and emotion." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: () => (
    <VoiceSubPage
      title="Voice Customization"
      subtitle="Speed, pitch, expression and emotion."
      icon={icon}
      backTo="/voice/hub"
      parent={{ label: "Voice Hub", to: "/voice/hub" }}
      points={[
        "Fine-tune speaking speed and pitch.",
        "Set how expressive HALO sounds.",
        "Choose an emotional range for replies.",
      ]}
    />
  ),
});
