import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import RevealSection from '../components/RevealSection';
import SectionTitle from '../components/SectionTitle';

const roles = [
  {
    org: 'University of Maryland — Department of IT, Classroom Support',
    title: 'Student Field Technician',
    location: 'College Park, MD',
    period: 'March 2026 – Present',
    bullets: [
      'Diagnose and resolve AV system, projector, networking, and lecture-capture issues across 50+ classrooms and event spaces under time-critical SLAs.',
      'Triage real-time support tickets from faculty and staff, applying systematic root-cause analysis to restore classroom technology.',
      'Collaborate with full-time IT engineers on recurring infrastructure audits and preventive equipment inspections.',
    ],
  },
  {
    org: 'Hack4Impact',
    title: 'Full-Stack Developer & Project Designer',
    location: 'Remote',
    period: 'September 2025 – Present',
    bullets: [
      'Deliver full-stack web applications using React.js, Firebase, Node.js, and REST APIs in a client-facing Agile/Scrum environment, shipping features on two-week sprint cycles.',
      'Translate client requirements into high-fidelity Figma prototypes, streamlining developer handoff and reducing design-iteration cycles.',
    ],
  },
];

function TimelineItem({ role, idx }: { role: (typeof roles)[number]; idx: number }) {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.2 });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: 30 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.55, delay: idx * 0.1 }}
      className="relative pl-10"
    >
      <div className="absolute left-0 top-2 h-4 w-4 rounded-full border-4 border-bg bg-accent shadow-glow" />
      <div className="rounded-xl border border-white/5 bg-surface/70 p-6 backdrop-blur transition-colors hover:border-accent/40">
        <div className="flex flex-wrap items-baseline justify-between gap-2">
          <h3 className="text-lg font-semibold text-textp">{role.title}</h3>
          <span className="text-xs uppercase tracking-wider text-textm">{role.period}</span>
        </div>
        <div className="mt-1 text-sm text-accent">{role.org}</div>
        <div className="text-xs text-textm">{role.location}</div>
        <ul className="mt-4 space-y-2 text-sm text-textm">
          {role.bullets.map((b, i) => (
            <li key={i} className="flex gap-2">
              <span className="mt-1 block h-1.5 w-1.5 shrink-0 rounded-full bg-accent-secondary" />
              <span>{b}</span>
            </li>
          ))}
        </ul>
      </div>
    </motion.div>
  );
}

export default function Experience() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });
  return (
    <RevealSection id="experience">
      <SectionTitle eyebrow="04 — Work" title="Experience" />
      <div ref={ref} className="relative space-y-8">
        <motion.div
          initial={{ scaleY: 0 }}
          animate={inView ? { scaleY: 1 } : {}}
          transition={{ duration: 1.2, ease: 'easeOut' }}
          style={{ transformOrigin: '0% 0%' }}
          className="absolute left-[7px] top-2 bottom-2 w-[2px] bg-gradient-to-b from-accent via-accent-secondary to-transparent"
        />
        {roles.map((r, i) => (
          <TimelineItem key={r.title} role={r} idx={i} />
        ))}
      </div>
    </RevealSection>
  );
}
