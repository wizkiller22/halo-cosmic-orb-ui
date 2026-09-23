import { createFileRoute } from "@tanstack/react-router";
import { VoiceSubPage } from "@/components/halo/VoiceSubPage";
import icon from "@/assets/halo/ic_library.png.asset.json";

export const Route = createFileRoute("/voice/my_voices")({
  head: () => ({
    meta: [
      { title: "My Voices — HALO" },
      { name: "description", content: "Your HALO voice library." },
      { property: "og:title", content: "My Voices — HALO" },
      { property: "og:description", content: "Your HALO voice library." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: () => (
    <VoiceSubPage
      title="My Voices"
      subtitle="Your HALO voice library."
      icon={icon}
      backTo="/voice/hub"
      parent={{ label: "Voice Hub", to: "/voice/hub" }}
      points={[
        "HALO — default voice · English · active.",
        "Aurora — designed voice · English / French.",
        "Designed and cloned voices appear here automatically.",
      ]}
    />
  ),
});
