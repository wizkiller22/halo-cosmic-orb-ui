import { createFileRoute } from "@tanstack/react-router";
import { HaloVoice } from "@/components/halo/HaloVoice";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "HALO Voice — Premium AI Assistant" },
      { name: "description", content: "Speak naturally with HALO, your premium multimodal AI assistant." },
      { property: "og:title", content: "HALO Voice — Premium AI Assistant" },
      { property: "og:description", content: "Speak naturally with HALO, your premium multimodal AI assistant." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: HaloVoice,
});
