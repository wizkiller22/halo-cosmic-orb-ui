import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { useRive } from "@rive-app/react-canvas";

import { HaloButton, HaloLayout } from "@/components/halo/HaloChrome";

import orb from "@/assets/halo/ic_halo_orb.png.asset.json";
import assistant from "@/assets/halo/assistant.riv.asset.json";
import micIcon from "@/assets/halo/ic_voice_mic.png.asset.json";
import voiceHubIcon from "@/assets/halo/ic_library.png.asset.json";
import historyIcon from "@/assets/halo/ic_history.png.asset.json";
import chatIcon from "@/assets/halo/ic_chat.png.asset.json";
import chatSendIcon from "@/assets/halo/ic_chat_send.png.asset.json";
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

function VoiceAreas() {
  return (
    <section className="content-section voice-areas">
      <Link to="/voice/hub" className="area-card glass-panel">
        <img src={voiceHubIcon.url} alt="" aria-hidden="true" />
        <strong>Voice Hub</strong>
        <small>Create, manage and personalize HALO voices.</small>
        <em>Open →</em>
      </Link>
      <Link to="/voice/history" className="area-card glass-panel">
        <img src={historyIcon.url} alt="" aria-hidden="true" />
        <strong>Voice History</strong>
        <small>Review previous voice conversations and commands.</small>
        <em>Open →</em>
      </Link>
    </section>
  );
}

function TextEntry() {
  const [value, setValue] = useState("");
  const [sent, setSent] = useState<string | null>(null);
  const trimmed = value.trim();
  return (
    <section className="content-section text-entry-section">
      <form
        className="text-entry glass-panel"
        onSubmit={(event) => {
          event.preventDefault();
          if (!trimmed) return;
          setSent(trimmed);
          setValue("");
        }}
      >
        <img src={chatIcon.url} alt="" aria-hidden="true" />
        <input
          type="text"
          value={value}
          onChange={(event) => setValue(event.target.value)}
          placeholder="Type a message..."
          aria-label="Type a message"
        />
        <button
          type="submit"
          className="text-entry-send"
          disabled={!trimmed}
          aria-label="Send message"
        >
          <img src={chatSendIcon.url} alt="" aria-hidden="true" />
        </button>
      </form>
      {sent && (
        <p className="text-entry-echo" role="status">
          Sent to HALO: “{sent}”
        </p>
      )}
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

export function HaloVoice() {
  const [listening, setListening] = useState(true);
  const toggleListening = () => setListening((value) => !value);
  return (
    <HaloLayout>
      <div className="voice-top">
        <VoiceHero listening={listening} onToggle={toggleListening} />
        <ActivityPanel />
      </div>
      <VoiceAreas />
      <Suggestions />
      <Recent />
      <Brief />
    </HaloLayout>
  );
}
