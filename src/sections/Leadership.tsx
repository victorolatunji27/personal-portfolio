import { motion } from 'framer-motion';
import { FiAward } from 'react-icons/fi';
import RevealSection from '../components/RevealSection';
import SectionTitle from '../components/SectionTitle';

export default function Leadership() {
  return (
    <RevealSection id="leadership">
      <SectionTitle eyebrow="07 — Service" title="Leadership" />
      <motion.div
        whileHover={{ y: -4 }}
        transition={{ type: 'spring', stiffness: 260, damping: 18 }}
        className="rounded-2xl border border-white/5 bg-surface/70 p-6 backdrop-blur"
      >
        <div className="flex items-start gap-4">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-accent/15 text-accent">
            <FiAward size={22} />
          </div>
          <div className="flex-1">
            <div className="flex flex-wrap items-baseline justify-between gap-2">
              <h3 className="text-lg font-semibold text-textp">Student Ambassador</h3>
              <span className="rounded-full bg-accent/15 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-accent">
                March 2026 – Present
              </span>
            </div>
            <p className="mt-1 text-sm text-accent-secondary">Data Justice Scholars Program</p>
            <p className="mt-4 text-sm leading-relaxed text-textm">
              Represents the program to prospective students, parents, and university stakeholders.
              Drives engagement through outreach events and advocacy initiatives.
            </p>
          </div>
        </div>
      </motion.div>
    </RevealSection>
  );
}
