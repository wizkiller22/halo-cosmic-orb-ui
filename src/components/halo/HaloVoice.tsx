import { useEffect, useState, type CSSProperties } from "react";
import { Alignment, Fit, Layout, useRive } from "@rive-app/react-canvas";

import logo from "@/assets/halo/ic_logo_hal.png.asset.json";
import orb from "@/assets/halo/ic_halo_orb.png.asset.json";
import assistant from "@/assets/halo/assistant.riv.asset.json";
import menuIcon from "@/assets/halo/ic_menu.png.asset.json";
import settingsIcon from "@/assets/halo/ic_voice_settings.png.asset.json";
import keyboardIcon from "@/assets/halo/ic_voice_keyboard.png.asset.json";
import micIcon from "@/assets/halo/ic_voice_mic.png.asset.json";
import stopIcon from "@/assets/halo/ic_voice_stop.png.asset.json";
import voiceWaveIcon from "@/assets/halo/ic_voice_wave.png.asset.json";
import commandsIcon from "@/assets/halo/ic_voice_commands.png.asset.json";
import searchIcon from "@/assets/halo/ic_search.png.asset.json";
import voiceNavIcon from "@/assets/halo/ic_drawer_voice.png.asset.json";
import chatNavIcon from "@/assets/halo/ic_drawer_chat.png.asset.json";
import visionNavIcon from "@/assets/halo/ic_drawer_vision.png.asset.json";
import docsNavIcon from "@/assets/halo/ic_drawer_documents.png.asset.json";
import translateNavIcon from "@/assets/halo/ic_drawer_translate.png.asset.json";
import musicNavIcon from "@/assets/halo/ic_drawer_music.png.asset.json";
import imagesNavIcon from "@/assets/halo/ic_drawer_images.png.asset.json";
import memoryNavIcon from "@/assets/halo/ic_drawer_memory.png.asset.json";
import profileNavIcon from "@/assets/halo/ic_drawer_profile.png.asset.json";
import plansNavIcon from "@/assets/halo/ic_drawer_plans.png.asset.json";
import drawerSettingsIcon from "@/assets/halo/ic_drawer_settings.png.asset.json";

type Asset = { url: string };
type HaloButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  label: string;
  image?: Asset;
};

const navItems = [
  ["Voice", voiceNavIcon],
  ["Chat", chatNavIcon],
  ["Vision", visionNavIcon],
  ["Documents", docsNavIcon],
  ["Translate", translateNavIcon],
  ["Music", musicNavIcon],
  ["Images", imagesNavIcon],
  ["Memory", memoryNavIcon],
  ["Profile", profileNavIcon],
  ["Plans & Pricing", plansNavIcon],
  ["Settings", drawerSettingsIcon],
] as const;

const suggestions = [
  { title: "Summarize", detail: "this document", icon: docsNavIcon, tone: "violet" },
  { title: "Translate", detail: "this to French", icon: translateNavIcon, tone: "blue" },
  { title: "Analyze", detail: "this image", icon: visionNavIcon, tone: "blue" },
  { title: "Create", detail: "music for focus", icon: musicNavIcon, tone: "pink" },
  { title: "Search", detail: "the latest AI news", icon: searchIcon, tone: "green" },
] as const;

const recentItems = [
  { ext: "PDF", name: "Annual Report.pdf", detail: "Summarized · 10:30 AM", tone: "red" },
  { ext: "XLS", name: "Q2 Financial Data.xlsx", detail: "Analyzed · Yesterday", tone: "green" },
  { ext: "IMG", name: "Product Design.png", detail: "Analyzed · 2 days ago", tone: "cyan" },
  { ext: "DOC", name: "Marketing Plan.docx", detail: "Extracted · 2 days ago", tone: "blue" },
] as const;

function HaloButton({ label, image, className = "", children, ...props }: HaloButtonProps) {
  return (
    <button
      type="button"
      aria-label={label}
      title={label}
      className={`halo-button ${className}`}
      {...props}
    >
      {image ? <img src={image.url} alt="" aria-hidden="true" /> : children}
    </button>
  );
}

function Brand() {
  return (
    <div className="halo-brand" aria-label="HALO AI Assistant">
      <div className="halo-wordmark">
        <img src={logo.url} alt="HAL" />
        <img src={orb.url} alt="O" />
      </div>
      <span>AI Assistant</span>
    </div>
  );
}

function Header({ onMenu }: { onMenu: () => void }) {
  return (
    <header className="halo-header">
      <HaloButton
        label="Open menu"
        image={menuIcon}
        className="header-icon menu-button"
        onClick={onMenu}
      />
      <Brand />
      <div className="header-actions">
        <HaloButton label="View Pro plan" className="pro-button">
          <span aria-hidden="true">♛</span>
          <b>Pro</b>
        </HaloButton>
        <HaloButton label="Voice settings" image={settingsIcon} className="header-icon" />
      </div>
    </header>
  );
}

function Orb({ listening }: { listening: boolean }) {
  const { RiveComponent } = useRive({
    src: assistant.url,
    stateMachines: "Assistant_SM",
    autoplay: true,
    layout: new Layout({ fit: Fit.Contain, alignment: Alignment.Center }),
  });
  return (
    <div className={`orb-stage ${listening ? "is-listening" : "is-paused"}`}>
      <div className="wave-line" aria-hidden="true">
        <span />
        <span />
      </div>
      <div className="orb-glow" />
      <div className="orb-animation">
        <RiveComponent aria-label="HALO assistant orb" />
      </div>
      <img className="orb-fallback" src={orb.url} alt="HALO assistant orb" />
      <div className="orb-shadow" />
    </div>
  );
}

function ActivityPanel() {
  const rows = [
    ["♩", "Ready to listen", "ready"],
    ["♧", "Memory active", "memory"],
    ["◇", "All systems online", "online"],
    ["▢", "Context preserved", "context"],
  ];
  return (
    <aside className="activity-panel glass-panel">
      <div className="activity-title">
        <span>HALO Activity</span>
        <i />
      </div>
      <div className="activity-list">
        {rows.map(([symbol, label, kind]) => (
          <div className={`activity-row ${kind}`} key={label}>
            <b>{symbol}</b>
            <span>{label}</span>
          </div>
        ))}
      </div>
    </aside>
  );
}

function VoiceHero({ listening, onToggle }: { listening: boolean; onToggle: () => void }) {
  return (
    <section className="voice-hero">
      <div className="voice-copy">
        <h1>{listening ? "I’m listening" : "Voice paused"}</h1>
        <p>{listening ? "Speak naturally, I’m here to help." : "Tap the Orb when you’re ready."}</p>
      </div>
      <Orb listening={listening} />
      <button
        type="button"
        className={`listen-pill ${listening ? "active" : ""}`}
        onClick={onToggle}
        aria-label={listening ? "Stop listening" : "Start listening"}
      >
        <img src={(listening ? voiceWaveIcon : stopIcon).url} alt="" />
        <span>{listening ? "Listening…" : "Paused"}</span>
      </button>
      <span className="tap-hint">Tap to {listening ? "stop" : "listen"}</span>
    </section>
  );
}

function Suggestions() {
  return (
    <section className="content-section suggestions-section">
      <div className="section-heading">
        <h2>You can say</h2>
        <span>Suggestions&nbsp; ↻</span>
      </div>
      <div className="suggestion-grid">
        {suggestions.map((item) => (
          <button
            type="button"
            className={`suggestion-card glass-panel ${item.tone}`}
            key={item.title}
          >
            <img src={item.icon.url} alt="" />
            <strong>{item.title}</strong>
            <span>{item.detail}</span>
          </button>
        ))}
      </div>
    </section>
  );
}

function Recent() {
  return (
    <section className="content-section">
      <div className="section-heading">
        <h2>Recent</h2>
        <button type="button">View all&nbsp; ›</button>
      </div>
      <div className="recent-grid">
        {recentItems.map((item) => (
          <button type="button" className="recent-card glass-panel" key={item.name}>
            <span className={`file-badge ${item.tone}`}>{item.ext}</span>
            <span className="recent-text">
              <strong>{item.name}</strong>
              <small>{item.detail}</small>
            </span>
            <b aria-hidden="true">⋮</b>
          </button>
        ))}
      </div>
    </section>
  );
}

function Brief() {
  const items = [
    ["▣", "2", "Meetings", "Next: Project review", "11:00 AM"],
    ["✓", "5", "Tasks", "3 in progress", ""],
    ["▱", "3", "Documents", "Opened recently", ""],
  ];
  return (
    <section className="brief glass-panel">
      <div className="section-heading brief-heading">
        <h2>
          <span>☀</span> Today’s brief
        </h2>
        <button type="button">View all&nbsp; ›</button>
      </div>
      <div className="brief-grid">
        {items.map(([icon, number, title, detail, extra]) => (
          <button type="button" className="brief-card" key={title}>
            <span className="brief-icon">{icon}</span>
            <span>
              <b>{number}</b>
              <strong>{title}</strong>
              <small>
                {detail}
                {extra && (
                  <>
                    <br />
                    {extra}
                  </>
                )}
              </small>
            </span>
          </button>
        ))}
      </div>
    </section>
  );
}

function CommandBar({ listening, onToggle }: { listening: boolean; onToggle: () => void }) {
  return (
    <div className="command-dock">
      <div className="command-bar">
        <HaloButton label="Open keyboard" image={keyboardIcon} className="command-side" />
        <div className="command-center">
          <span>{listening ? "Speak now…" : "Tap microphone to begin"}</span>
          <div className={`mini-wave ${listening ? "active" : ""}`}>
            {Array.from({ length: 45 }, (_, i) => (
              <i key={i} style={{ "--i": i } as CSSProperties} />
            ))}
          </div>
        </div>
        <HaloButton
          label={listening ? "Stop listening" : "Start listening"}
          image={listening ? stopIcon : micIcon}
          className="command-mic"
          onClick={onToggle}
        />
      </div>
    </div>
  );
}

function BottomNav() {
  const items = [
    ["Home", "⌂"],
    ["Chat", "◌"],
    ["Orb", ""],
    ["Documents", "□"],
    ["Settings", "⚙"],
  ] as const;
  return (
    <nav className="bottom-nav" aria-label="Primary navigation">
      {items.map(([label, glyph], index) =>
        index === 2 ? (
          <button type="button" className="nav-orb" aria-label="Voice" key={label}>
            <img src={orb.url} alt="" />
          </button>
        ) : (
          <button type="button" className={`nav-item ${index === 0 ? "active" : ""}`} key={label}>
            <b aria-hidden="true">{glyph}</b>
            <span>{label}</span>
          </button>
        ),
      )}
    </nav>
  );
}

function Drawer({ open, onClose }: { open: boolean; onClose: () => void }) {
  useEffect(() => {
    if (!open) return;
    const close = (event: KeyboardEvent) => event.key === "Escape" && onClose();
    window.addEventListener("keydown", close);
    return () => window.removeEventListener("keydown", close);
  }, [open, onClose]);
  return (
    <div className={`drawer-layer ${open ? "open" : ""}`} aria-hidden={!open}>
      <button
        type="button"
        aria-label="Close menu"
        className="drawer-backdrop"
        onClick={onClose}
        tabIndex={open ? 0 : -1}
      />
      <aside className="halo-drawer" aria-label="HALO modules">
        <div className="drawer-brand">
          <Brand />
          <HaloButton label="Close menu" className="drawer-close" onClick={onClose}>
            ×
          </HaloButton>
        </div>
        <nav>
          {navItems.map(([name, icon], index) => (
            <button
              type="button"
              className={`${name === "Voice" ? "active" : ""} ${index === 8 ? "drawer-divider" : ""}`}
              disabled={name !== "Voice"}
              key={name}
            >
              <img src={icon.url} alt="" />
              <span>{name}</span>
              {name === "Voice" && <i />}
            </button>
          ))}
        </nav>
      </aside>
    </div>
  );
}

export function HaloVoice() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [listening, setListening] = useState(true);
  const toggleListening = () => setListening((value) => !value);
  return (
    <main className="halo-shell">
      <div className="star-field" aria-hidden="true" />
      <div className="halo-page">
        <Header onMenu={() => setDrawerOpen(true)} />
        <div className="voice-top">
          <VoiceHero listening={listening} onToggle={toggleListening} />
          <ActivityPanel />
        </div>
        <Suggestions />
        <Recent />
        <Brief />
      </div>
      <div className="bottom-stack">
        <CommandBar listening={listening} onToggle={toggleListening} />
        <BottomNav />
      </div>
      <Drawer open={drawerOpen} onClose={() => setDrawerOpen(false)} />
    </main>
  );
}
