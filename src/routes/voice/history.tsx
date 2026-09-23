import { createFileRoute } from "@tanstack/react-router";
import { VoiceHistory } from "@/components/halo/VoiceHistory";

export const Route = createFileRoute("/voice/history")({
  head: () => ({
    meta: [
      { title: "Voice History — HALO" },
      {
        name: "description",
        content: "Review your recent HALO voice conversations, commands and transcriptions.",
      },
      { property: "og:title", content: "Voice History — HALO" },
      {
        property: "og:description",
        content: "Review your recent HALO voice conversations, commands and transcriptions.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: VoiceHistory,
});
