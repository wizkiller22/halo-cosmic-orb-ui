import { useEffect, useState } from "react";
import { useRive } from "@rive-app/react-canvas";

import logo from "@/assets/halo/ic_logo_hal.png.asset.json";
import orb from "@/assets/halo/ic_halo_orb.png.asset.json";
import assistant from "@/assets/halo/assistant.riv.asset.json";
import menuIcon from "@/assets/halo/ic_menu.png.asset.json";
import micIcon from "@/assets/halo/ic_voice_mic.png.asset.json";
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
import suggestionSummarize from "@/assets/halo/ic_suggestion_summarize.png.asset.json";
import suggestionTranslate from "@/assets/halo/ic_suggestion_translate.png.asset.json";
import suggestionAnalyze from "@/assets/halo/ic_suggestion_analyze.png.asset.json";
import suggestionMusic from "@/assets/halo/ic_suggestion_create_music.png.asset.json";
import suggestionSearch from "@/assets/halo/ic_suggestion_search.png.asset.json";
import recentPdf from "@/assets/halo/ic_recent_pdf.png.asset.json";
import recentSpreadsheet from "@/assets/halo/ic_recent_spreadsheet.png.asset.json";
import recentImage from "@/assets/halo/ic_recent_image.png.asset.json";
import recentDocument from "@/assets/halo/ic_recent_document.png.asset.json";
import recentViewAll from "@/assets/halo/ic_recent_view_all.png.asset.json";
import briefToday from "@/assets/halo/ic_brief_today.png.asset.json";
import briefMeetings from "@/assets/halo/ic_brief_meetings.png.asset.json";
import briefTasks from "@/assets/halo/ic_brief_tasks.png.asset.json";
import briefDocuments from "@/assets/halo/ic_brief_documents.png.asset.json";
import activityReady from "@/assets/halo/ic_activity_ready_to_listen.png.asset.json";
import activityMemory from "@/assets/halo/ic_activity_memory_active.png.asset.json";
import activityOnline from "@/assets/halo/ic_activity_systems_online.png.asset.json";
import activityContext from "@/assets/halo/ic_activity_context_preserved.png.asset.json";

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
  { title: "Summarize", detail: "this document", icon: suggestionSummarize, tone: "violet" },
  { title: "Translate", detail: "this to French", icon: suggestionTranslate, tone: "blue" },
  { title: "Analyze", detail: "this image", icon: suggestionAnalyze, tone: "blue" },
  { title: "Create", detail: "music for focus", icon: suggestionMusic, tone: "pink" },
  { title: "Search", detail: "the latest AI news", icon: suggestionSearch, tone: "green" },
] as const;

const recentItems = [
  { icon: recentPdf, name: "Annual Report.pdf", detail: "Summarized · 10:30 AM" },
  { icon: recentSpreadsheet, name: "Q2 Financial Data.xlsx", detail: "Analyzed · Yesterday" },
  { icon: recentImage, name: "Product Design.png", detail: "Analyzed · 2 days ago" },
  { icon: recentDocument, name: "Marketing Plan.docx", detail: "Extracted · 2 days ago" },
] as const;

const activityRows = [
  { icon: activityReady, label: "Ready to listen", kind: "ready" },
  { icon: activityMemory, label: "Memory active", kind: "memory" },
  { icon: activityOnline, label: "All systems online", kind: "online" },
  { icon: activityContext, label: "Context preserved", kind: "context" },
] as const;

const briefItems = [
  { icon: briefMeetings, title: "Next up", detail: "Project review", time: "11:00 AM" },
  { icon: briefTasks, title: "Tasks", detail: "3 tasks in progress", time: "" },
  { icon: briefDocuments, title: "Documents", detail: "3 recently opened", time: "" },
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
    <div className="halo-topbar">
      <header className="halo-header">
        <HaloButton
          label="Open menu"
          image={menuIcon}
          className="header-icon menu-button"
          onClick={onMenu}
        />
        <Brand />
        <HaloButton
          label="Search HALO"
          image={searchIcon}
          className="header-icon search-button"
        />
      </header>
      <div className="pro-row">
        <button type="button" className="pro-badge" aria-label="View Pro plan">
          Pro
        </button>
      </div>
    </div>
  );
}

function Orb({ listening }: { listening: boolean }) {
  const { RiveComponent } = useRive({
    src: assistant.url,
    stateMachines: "Assistant_SM",
    autoplay: true,
  });
  return (
    <div className={`orb-stage ${listening ? "is-listening" : "is-paused"}`}>
      <div className="orb-animation">
        <RiveComponent aria-label="HALO assistant orb" />
      </div>
      <img className="orb-fallback" src={orb.url} alt="HALO assistant orb" />
    </div>
  );
}

function ActivityPanel() {
  return (
    <aside className="activity-panel glass-panel">
      <div className="activity-title">
        <span>HALO Activity</span>
        <i />
      </div>
      <div className="activity-list">
        {activityRows.map((row) => (
          <div className={`activity-row ${row.kind}`} key={row.label}>
            <img src={row.icon.url} alt="" aria-hidden="true" />
            <span>{row.label}</span>
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
        <p>
          {listening
            ? "Speak naturally, I’m here to help."
            : "Tap the microphone when you’re ready."}
        </p>
      </div>
      <Orb listening={listening} />
      <HaloButton
        className={`voice-mic ${listening ? "active" : ""}`}
        onClick={onToggle}
        label={listening ? "Stop listening" : "Start listening"}
        aria-pressed={listening}
        image={micIcon}
      />
      <span role="status" className={`voice-state ${listening ? "active" : ""}`}>
        {listening ? "Listening…" : "Tap to speak"}
      </span>
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
        <button type="button" className="view-all">
          <span>View all</span>
          <img src={recentViewAll.url} alt="" aria-hidden="true" />
        </button>
      </div>
      <div className="recent-grid">
        {recentItems.map((item) => (
          <button type="button" className="recent-card glass-panel" key={item.name}>
            <img className="recent-icon" src={item.icon.url} alt="" aria-hidden="true" />
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
  return (
    <section className="brief glass-panel">
      <div className="section-heading brief-heading">
        <h2>
          <img src={briefToday.url} alt="" aria-hidden="true" /> Today’s brief
        </h2>
        <button type="button" className="view-all">
          <span>View all</span>
          <img src={recentViewAll.url} alt="" aria-hidden="true" />
        </button>
      </div>
      <div className="brief-grid">
        {briefItems.map((item) => (
          <button type="button" className="brief-card" key={item.title}>
            <img className="brief-icon" src={item.icon.url} alt="" aria-hidden="true" />
            <span className="brief-text">
              <strong>{item.title}</strong>
              <small>{item.detail}</small>
            </span>
            {item.time && <em className="brief-time">{item.time}</em>}
          </button>
        ))}
      </div>
    </section>
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
      <Drawer open={drawerOpen} onClose={() => setDrawerOpen(false)} />
    </main>
  );
}
