import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import RevealSection from '../components/RevealSection';
import SectionTitle from '../components/SectionTitle';

const groups: { label: string; items: string[] }[] = [
  {
    label: 'Languages & Frameworks',
    items: ['Java', 'JavaScript', 'Python', 'TypeScript', 'React.js', 'Node.js', 'TailwindCSS', 'Vite'],
  },
  {
    label: 'Cloud & Infrastructure',
    items: ['AWS (EC2, S3, VPC)', 'Microsoft Azure', 'Google Cloud Platform', 'Firebase', 'Vercel'],
  },
  {
    label: 'Networking & Systems',
    items: ['DNS', 'TCP/IP', 'HTTP', 'REST APIs', 'Linux/Unix', 'AV/IT Systems'],
  },
  {
    label: 'Tools & Methods',
    items: ['Git/GitHub', 'Postman', 'Figma', 'Agile/Scrum', 'CI/CD'],
  },
];

function Pill({ label, delay }: { label: string; delay: number }) {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.2 });
  return (
    <motion.span
      ref={ref}
      initial={{ opacity: 0, y: 10 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.35, delay }}
      whileHover={{ y: -3, boxShadow: '0 10px 25px -10px rgba(124, 58, 237, 0.6)' }}
      className="cursor-grow rounded-full border border-white/10 bg-surface px-3.5 py-1.5 text-sm text-textp hover:border-accent"
    >
      {label}
    </motion.span>
  );
}

export default function Skills() {
  return (
    <RevealSection id="skills">
      <SectionTitle eyebrow="08 — Kit" title="Technical Skills" />
      <div className="space-y-7">
        {groups.map((g) => (
          <div key={g.label}>
            <h3 className="mb-3 text-sm font-semibold uppercase tracking-[0.25em] text-textm">
              {g.label}
            </h3>
            <div className="flex flex-wrap gap-2">
              {g.items.map((item, i) => (
                <Pill key={item} label={item} delay={i * 0.04} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </RevealSection>
  );
}
