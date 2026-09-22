import { Link } from "@tanstack/react-router";

import { HaloLayout, VoicePageTitle, VoiceTrail } from "@/components/halo/HaloChrome";

import voiceIcon from "@/assets/halo/ic_voice.png.asset.json";
import commandIcon from "@/assets/halo/ic_voice_commands.png.asset.json";
import transcriptionIcon from "@/assets/halo/ic_voice_keyboard.png.asset.json";
import handsFreeIcon from "@/assets/halo/ic_voice_mic.png.asset.json";

const groups = [
  {
    label: "Today",
    items: [
      { icon: voiceIcon, title: "Voice Conversation", detail: "English · 04:32", time: "10:42" },
      { icon: commandIcon, title: "Voice Command", detail: "Open my documents", time: "09:18" },
      {
        icon: transcriptionIcon,
        title: "Voice Transcription",
        detail: "English · 00:42",
        time: "08:51",
      },
    ],
  },
  {
    label: "Yesterday",
    items: [
      { icon: voiceIcon, title: "Voice Conversation", detail: "French · 07:15", time: "18:26" },
      { icon: handsFreeIcon, title: "Hands-Free Session", detail: "English · 12:08", time: "15:04" },
    ],
  },
  {
    label: "Earlier",
    items: [
      { icon: transcriptionIcon, title: "Voice Transcription", detail: "French · 02:18", time: "" },
      { icon: commandIcon, title: "Voice Command", detail: "Search the web", time: "" },
    ],
  },
] as const;

export function VoiceHistory() {
  return (
    <HaloLayout>
      <VoiceTrail backTo="/" crumbs={[{ label: "Voice", to: "/" }, { label: "Voice History" }]} />
      <VoicePageTitle
        title="Voice History"
        subtitle="Your recent conversations, commands and transcriptions."
      />
      {groups.map((group) => (
        <section className="content-section history-group" key={group.label}>
          <div className="section-heading">
            <h2 className="history-group-title">{group.label}</h2>
          </div>
          <div className="history-list">
            {group.items.map((item, index) => (
              <Link
                to="/voice/history/detail"
                className="history-card glass-panel"
                key={`${group.label}-${item.title}-${index}`}
              >
                <img src={item.icon.url} alt="" aria-hidden="true" />
                <span className="history-text">
                  <strong>{item.title}</strong>
                  <small>{item.detail}</small>
                </span>
                {item.time && <em>{item.time}</em>}
                <i aria-hidden="true">›</i>
              </Link>
            ))}
          </div>
        </section>
      ))}
    </HaloLayout>
  );
}
