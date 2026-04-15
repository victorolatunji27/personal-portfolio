import RevealSection from '../components/RevealSection';
import SectionTitle from '../components/SectionTitle';

export default function Profile() {
  return (
    <RevealSection id="profile">
      <SectionTitle eyebrow="01 — About" title="Profile" />
      <div className="space-y-5 rounded-2xl border border-white/5 bg-surface/60 p-8 shadow-xl backdrop-blur">
        <p className="text-lg leading-relaxed text-textm">
          I&apos;m <span className="font-semibold text-textp">Victor Olatunji</span>, a Computer Science
          student at the{' '}
          <span className="font-semibold text-textp">University of Maryland, College Park</span>, pursuing
          a B.S. with a minor in Business (expected May 2029).
        </p>
        <p className="text-lg leading-relaxed text-textm">
          I build things that matter. I am passionate about building meaningful products that make a
          societal difference and make an impact in my communities and those that surround me.
        </p>
        <p className="text-lg leading-relaxed text-textm">
          Outside the code editor, I&apos;m involved with{' '}
          <span className="text-accent">Code:BLACK</span>,{' '}
          <span className="text-accent">NSBE</span>,{' '}
          <span className="text-accent">ColorStack</span>, and the{' '}
          <span className="text-accent">Data Justice Scholars Program</span>, where I now serve as a
          student ambassador and peer mentor. I care about who technology reaches and who it leaves out.
        </p>
      </div>
    </RevealSection>
  );
}
