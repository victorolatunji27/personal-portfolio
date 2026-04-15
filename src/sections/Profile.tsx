import RevealSection from '../components/RevealSection';
import SectionTitle from '../components/SectionTitle';

export default function Profile() {
  return (
    <RevealSection id="profile">
      <SectionTitle eyebrow="01 — About" title="Profile" />
      <div className="rounded-2xl border border-white/5 bg-surface/60 p-8 shadow-xl backdrop-blur">
        <p className="text-lg leading-relaxed text-textm">
          Computer Science student at the{' '}
          <span className="font-semibold text-textp">University of Maryland, College Park</span> (Expected
          May 2029), with a minor in Business. Member of the{' '}
          <span className="text-accent">Data Justice Scholars Program</span> and the{' '}
          <span className="text-accent">Goldman Sachs Possibilities Series</span>. Active in Code:BLACK,
          NSBE, ColorStack, Claude Builder Club, and the Black Business Association.
        </p>
      </div>
    </RevealSection>
  );
}
