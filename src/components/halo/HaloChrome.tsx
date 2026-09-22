import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";

import logo from "@/assets/halo/ic_logo_hal.png.asset.json";
import orb from "@/assets/halo/ic_halo_orb.png.asset.json";
import menuIcon from "@/assets/halo/ic_menu.png.asset.json";
import searchIcon from "@/assets/halo/ic_search.png.asset.json";
import backIcon from "@/assets/halo/ic_back_home.png.asset.json";
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

export type Asset = { url: string };
export type HaloButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
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

export function HaloButton({ label, image, className = "", children, ...props }: HaloButtonProps) {
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

export function Brand() {
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

export function Header({ onMenu }: { onMenu: () => void }) {
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
        <HaloButton label="Search HALO" image={searchIcon} className="header-icon search-button" />
      </header>
      <div className="pro-row">
        <button type="button" className="pro-badge" aria-label="View Pro plan">
          Pro
        </button>
      </div>
    </div>
  );
}

export function Drawer({ open, onClose }: { open: boolean; onClose: () => void }) {
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

export function HaloLayout({ children }: { children: React.ReactNode }) {
  const [drawerOpen, setDrawerOpen] = useState(false);
  return (
    <main className="halo-shell">
      <div className="star-field" aria-hidden="true" />
      <div className="halo-page">
        <Header onMenu={() => setDrawerOpen(true)} />
        {children}
      </div>
      <Drawer open={drawerOpen} onClose={() => setDrawerOpen(false)} />
    </main>
  );
}

export function VoiceTrail({
  crumbs,
  backTo,
}: {
  crumbs: { label: string; to?: string }[];
  backTo: string;
}) {
  return (
    <div className="voice-trail">
      <Link to={backTo} className="trail-back" aria-label="Go back">
        <img src={backIcon.url} alt="" aria-hidden="true" />
      </Link>
      <nav className="trail-crumbs" aria-label="Breadcrumb">
        {crumbs.map((crumb, index) => (
          <span key={crumb.label}>
            {index > 0 && <i aria-hidden="true">/</i>}
            {crumb.to ? <Link to={crumb.to}>{crumb.label}</Link> : <b>{crumb.label}</b>}
          </span>
        ))}
      </nav>
    </div>
  );
}

export function VoicePageTitle({ title, subtitle }: { title: string; subtitle: string }) {
  return (
    <div className="voice-page-title">
      <h1>{title}</h1>
      <p>{subtitle}</p>
    </div>
  );
}
