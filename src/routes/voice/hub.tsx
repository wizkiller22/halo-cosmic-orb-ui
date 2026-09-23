import { createFileRoute } from "@tanstack/react-router";
import { VoiceHub } from "@/components/halo/VoiceHub";

export const Route = createFileRoute("/voice/hub")({
  head: () => ({
    meta: [
      { title: "Voice Hub — HALO" },
      {
        name: "description",
        content: "Create, manage and personalize HALO voices in the HALO Voice Hub.",
      },
      { property: "og:title", content: "Voice Hub — HALO" },
      {
        property: "og:description",
        content: "Create, manage and personalize HALO voices in the HALO Voice Hub.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: VoiceHub,
});
