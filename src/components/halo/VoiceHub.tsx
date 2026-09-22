import { Link } from "@tanstack/react-router";

import { HaloLayout, VoicePageTitle, VoiceTrail } from "@/components/halo/HaloChrome";

import waveIcon from "@/assets/halo/ic_voice_wave.png.asset.json";
import recordingIcon from "@/assets/halo/ic_voice_recording.png.asset.json";
import libraryIcon from "@/assets/halo/ic_library.png.asset.json";
import voiceIcon from "@/assets/halo/ic_voice.png.asset.json";
import crownIcon from "@/assets/halo/ic_crown.png.asset.json";
import playIcon from "@/assets/halo/ic_play.png.asset.json";
import audioSettingsIcon from "@/assets/halo/ic_audio_settings.png.asset.json";

const createCards = [
  {
    to: "/voice/design",
    icon: waveIcon,
    title: "Voice Design",
    detail: "Build a voice from your preferences.",
  },
  {
    to: "/voice/cloning",
    icon: recordingIcon,
    title: "Voice Cloning",
    detail: "Create a voice from a sample.",
  },
] as const;

const voices = [
  {
    icon: libraryIcon,
    name: "HALO",
    detail: "Default voice · English",
    active: true,
  },
  {
    icon: voiceIcon,
    name: "Aurora",
    detail: "Designed voice · English / French",
    active: false,
  },
] as const;

const settingsRows = [
  {
    to: "/voice/selection",
    icon: voiceIcon,
    title: "Voice Selection",
    detail: "Choose the active HALO voice.",
  },
  {
    to: "/voice/preview",
    icon: playIcon,
    title: "Voice Preview",
    detail: "Listen before using a voice.",
  },
  {
    to: "/voice/settings",
    icon: audioSettingsIcon,
    title: "Voice Customization",
    detail: "Speed, pitch, expression and emotion.",
  },
] as const;

export function VoiceHub() {
  return (
    <HaloLayout>
      <VoiceTrail backTo="/" crumbs={[{ label: "Voice", to: "/" }, { label: "Voice Hub" }]} />
      <VoicePageTitle title="Voice Hub" subtitle="Create, manage and personalize HALO voices." />

      <section className="content-section">
        <div className="section-heading">
          <h2>Create your voice</h2>
        </div>
        <div className="feature-grid">
          {createCards.map((card) => (
            <Link to={card.to} className="feature-card glass-panel" key={card.title}>
              <img src={card.icon.url} alt="" aria-hidden="true" />
              <strong>{card.title}</strong>
              <small>{card.detail}</small>
              <em>Open →</em>
            </Link>
          ))}
        </div>
      </section>

      <section className="content-section">
        <div className="section-heading">
          <h2>My Voices</h2>
          <Link to="/voice/my_voices" className="view-all">
            <span>Voice library</span>
          </Link>
        </div>
        <div className="voice-card-grid">
          {voices.map((voice) => (
            <article className="voice-card glass-panel" key={voice.name}>
              <img className="voice-card-icon" src={voice.icon.url} alt="" aria-hidden="true" />
              <div className="voice-card-text">
                <strong>
                  {voice.name}
                  {voice.active && (
                    <img className="voice-active-mark" src={crownIcon.url} alt="Active voice" />
                  )}
                </strong>
                <small>{voice.detail}</small>
              </div>
              <div className="voice-card-actions">
                <button type="button" className="ghost-action">
                  <img src={playIcon.url} alt="" aria-hidden="true" />
                  <span>Preview</span>
                </button>
                <button type="button" className="ghost-action" disabled={voice.active}>
                  <span>{voice.active ? "Active" : "Select"}</span>
                </button>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="content-section">
        <div className="section-heading">
          <h2>Voice Settings</h2>
        </div>
        <div className="setting-rows">
          {settingsRows.map((row) => (
            <Link to={row.to} className="setting-row glass-panel" key={row.title}>
              <img src={row.icon.url} alt="" aria-hidden="true" />
              <span className="setting-text">
                <strong>{row.title}</strong>
                <small>{row.detail}</small>
              </span>
              <i aria-hidden="true">›</i>
            </Link>
          ))}
        </div>
      </section>
    </HaloLayout>
  );
}
