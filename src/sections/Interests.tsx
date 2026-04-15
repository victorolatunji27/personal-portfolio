import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FiCode, FiGithub, FiMusic, FiTool, FiCompass, FiSearch } from 'react-icons/fi';
import { FaBasketballBall, FaFootballBall, FaDumbbell } from 'react-icons/fa';
import RevealSection from '../components/RevealSection';
import SectionTitle from '../components/SectionTitle';
import type { ReactNode } from 'react';

const items: { label: string; icon: ReactNode }[] = [
  { label: 'Music', icon: <FiMusic size={26} /> },
  { label: 'Football', icon: <FaFootballBall size={26} /> },
  { label: 'Basketball', icon: <FaBasketballBall size={26} /> },
  { label: 'Gym', icon: <FaDumbbell size={26} /> },
  { label: 'Building products', icon: <FiTool size={26} /> },
  { label: 'Hackathons', icon: <FiCode size={26} /> },
  { label: 'Open source', icon: <FiGithub size={26} /> },
  { label: 'Discovering new things', icon: <FiSearch size={26} /> },
  { label: 'Exploring', icon: <FiCompass size={26} /> },
];

function InterestCard({ label, icon, delay }: { label: string; icon: ReactNode; delay: number }) {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.2 });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30, scale: 0.9 }}
      animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ type: 'spring', stiffness: 220, damping: 14, delay }}
      whileHover={{ y: -5, rotate: -2 }}
      className="flex flex-col items-center gap-2 rounded-2xl border border-white/5 bg-surface p-6 text-center"
    >
      <span className="text-accent">{icon}</span>
      <span className="text-sm font-medium text-textp">{label}</span>
    </motion.div>
  );
}

export default function Interests() {
  return (
    <RevealSection id="interests">
      <SectionTitle eyebrow="09 — Outside" title="Interests" />
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3">
        {items.map((it, i) => (
          <InterestCard key={it.label} label={it.label} icon={it.icon} delay={i * 0.06} />
        ))}
      </div>
    </RevealSection>
  );
}
