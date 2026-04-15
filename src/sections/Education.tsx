import { motion } from 'framer-motion';
import { FaUniversity } from 'react-icons/fa';
import RevealSection from '../components/RevealSection';
import SectionTitle from '../components/SectionTitle';

export default function Education() {
  return (
    <RevealSection id="education">
      <SectionTitle eyebrow="05 — School" title="Education" />
      <motion.div
        whileHover={{ y: -4 }}
        transition={{ type: 'spring', stiffness: 240, damping: 18 }}
        className="overflow-hidden rounded-2xl border border-white/5 bg-surface/70 backdrop-blur"
      >
        <div className="relative h-28 bg-gradient-to-r from-[#e21833] via-[#ffd520] to-[#e21833]">
          <div className="absolute inset-0 bg-black/30" />
          <div className="absolute -bottom-8 left-6 flex h-20 w-20 items-center justify-center rounded-full border-4 border-bg bg-surface text-accent">
            <FaUniversity size={36} />
          </div>
        </div>
        <div className="px-6 pb-6 pt-12">
          <div className="flex flex-wrap items-baseline justify-between gap-2">
            <h3 className="font-display text-2xl">University of Maryland, College Park</h3>
            <span className="text-xs uppercase tracking-wider text-textm">Expected May 2029</span>
          </div>
          <p className="mt-1 text-accent">B.S. Computer Science &nbsp;·&nbsp; Minor: Business</p>

          <div className="mt-6 grid gap-5 md:grid-cols-2">
            <div>
              <h4 className="mb-2 text-xs font-semibold uppercase tracking-[0.25em] text-textm">Honors</h4>
              <ul className="space-y-1 text-sm text-textp">
                <li>Data Justice Scholars Program</li>
                <li>Goldman Sachs Possibilities Series (April 2026)</li>
              </ul>
            </div>
            <div>
              <h4 className="mb-2 text-xs font-semibold uppercase tracking-[0.25em] text-textm">
                Coursework
              </h4>
              <ul className="space-y-1 text-sm text-textp">
                <li>Object-Oriented Programming I & II</li>
                <li>Calculus I & II</li>
                <li>Networking Concepts</li>
              </ul>
            </div>
          </div>

          <div className="mt-6">
            <h4 className="mb-3 text-xs font-semibold uppercase tracking-[0.25em] text-textm">
              Organizations
            </h4>
            <div className="flex flex-wrap gap-2">
              {['Code:BLACK', 'NSBE', 'ColorStack', 'Claude Builder Club', 'Black Business Association'].map(
                (org) => (
                  <span
                    key={org}
                    className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-textp"
                  >
                    {org}
                  </span>
                ),
              )}
            </div>
          </div>
        </div>
      </motion.div>
    </RevealSection>
  );
}
