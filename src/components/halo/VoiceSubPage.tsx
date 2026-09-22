import type { Asset } from "@/components/halo/HaloChrome";
import { HaloLayout, VoicePageTitle, VoiceTrail } from "@/components/halo/HaloChrome";

export type VoiceSubPageProps = {
  title: string;
  subtitle: string;
  icon: Asset;
  backTo: string;
  parent: { label: string; to: string };
  points: string[];
};

export function VoiceSubPage({
  title,
  subtitle,
  icon,
  backTo,
  parent,
  points,
}: VoiceSubPageProps) {
  return (
    <HaloLayout>
      <VoiceTrail
        backTo={backTo}
        crumbs={[{ label: "Voice", to: "/" }, { label: parent.label, to: parent.to }, { label: title }]}
      />
      <VoicePageTitle title={title} subtitle={subtitle} />
      <section className="sub-page glass-panel">
        <img src={icon.url} alt="" aria-hidden="true" />
        <div className="sub-page-points">
          {points.map((point) => (
            <p key={point}>{point}</p>
          ))}
        </div>
        <span className="sub-page-note">Coming soon in this preview.</span>
      </section>
    </HaloLayout>
  );
}
