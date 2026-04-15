import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FiAward, FiBriefcase } from 'react-icons/fi';
import type { ReactNode } from 'react';
import RevealSection from '../components/RevealSection';
import SectionTitle from '../components/SectionTitle';

type Entry = {
  title: string;
  org: string;
  period: string;
  description: string;
  icon: ReactNode;
};

const entries: Entry[] = [
  {
    title: 'Student Ambassador',
    org: 'Data Justice Scholars Program',
    period: 'March 2026 – Present',
    description:
      'Represents the program to prospective students, parents, and university stakeholders. Drives engagement through outreach events and advocacy initiatives.',
    icon: <FiAward size={22} />,
  },
  {
    title: '2026 Goldman Sachs Possibilities Series Cohort',
    org: 'Goldman Sachs',
    period: 'April 2026',
    description:
      "Selective early-career program that connects high-potential undergraduate students with Goldman Sachs professionals, offering exposure to the firm's core business divisions, mentorship, and insight into how technology and finance intersect at one of the world's largest investment banks.",
    icon: <FiBriefcase size={22} />,
  },
];

function LeadershipCard({ entry, idx }: { entry: Entry; idx: number }) {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.15 });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, delay: idx * 0.1 }}
      whileHover={{ y: -4 }}
      className="rounded-2xl border border-white/5 bg-surface/70 p-6 backdrop-blur"
    >
      <div className="flex items-start gap-4">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-accent/15 text-accent">
          {entry.icon}
        </div>
        <div className="flex-1">
          <div className="flex flex-wrap items-baseline justify-between gap-2">
            <h3 className="text-lg font-semibold text-textp">{entry.title}</h3>
            <span className="rounded-full bg-accent/15 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-accent">
              {entry.period}
            </span>
          </div>
          <p className="mt-1 text-sm text-accent-secondary">{entry.org}</p>
          <p className="mt-4 text-sm leading-relaxed text-textm">{entry.description}</p>
        </div>
      </div>
    </motion.div>
  );
}

export default function Leadership() {
  return (
    <RevealSection id="leadership">
      <SectionTitle eyebrow="07 — Service" title="Leadership + Community Involvement" />
      <div className="grid gap-5 md:grid-cols-2">
        {entries.map((e, i) => (
          <LeadershipCard key={e.title} entry={e} idx={i} />
        ))}
      </div>
    </RevealSection>
  );
}
