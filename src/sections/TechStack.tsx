import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import {
  SiJavascript,
  SiTypescript,
  SiPython,
  SiReact,
  SiNodedotjs,
  SiTailwindcss,
  SiVite,
  SiGooglecloud,
  SiFirebase,
  SiVercel,
  SiGit,
  SiGithub,
  SiPostman,
  SiFigma,
  SiLinux,
} from 'react-icons/si';
import { FaJava, FaMicrosoft, FaAws } from 'react-icons/fa';
import RevealSection from '../components/RevealSection';
import SectionTitle from '../components/SectionTitle';
import type { ReactNode } from 'react';

type Tech = { name: string; icon: ReactNode; color: string };

const groups: { label: string; items: Tech[] }[] = [
  {
    label: 'Languages',
    items: [
      { name: 'Java', icon: <FaJava />, color: '#f89820' },
      { name: 'JavaScript', icon: <SiJavascript />, color: '#f7df1e' },
      { name: 'Python', icon: <SiPython />, color: '#3776ab' },
      { name: 'TypeScript', icon: <SiTypescript />, color: '#3178c6' },
    ],
  },
  {
    label: 'Frameworks & UI',
    items: [
      { name: 'React.js', icon: <SiReact />, color: '#61dafb' },
      { name: 'Node.js', icon: <SiNodedotjs />, color: '#8cc84b' },
      { name: 'TailwindCSS', icon: <SiTailwindcss />, color: '#38bdf8' },
      { name: 'Vite', icon: <SiVite />, color: '#a855f7' },
    ],
  },
  {
    label: 'Cloud & Infra',
    items: [
      { name: 'AWS', icon: <FaAws />, color: '#ff9900' },
      { name: 'Microsoft Azure', icon: <FaMicrosoft />, color: '#0078d4' },
      { name: 'Google Cloud', icon: <SiGooglecloud />, color: '#4285f4' },
      { name: 'Firebase', icon: <SiFirebase />, color: '#ffca28' },
      { name: 'Vercel', icon: <SiVercel />, color: '#ffffff' },
    ],
  },
  {
    label: 'Tools',
    items: [
      { name: 'Git', icon: <SiGit />, color: '#f05032' },
      { name: 'GitHub', icon: <SiGithub />, color: '#ffffff' },
      { name: 'Postman', icon: <SiPostman />, color: '#ff6c37' },
      { name: 'Figma', icon: <SiFigma />, color: '#f24e1e' },
      { name: 'Linux', icon: <SiLinux />, color: '#fcc21b' },
    ],
  },
];

function IconTile({ tech, delay }: { tech: Tech; delay: number }) {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.2 });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20, scale: 0.8 }}
      animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ duration: 0.4, delay }}
      whileHover={{ y: -6, scale: 1.08 }}
      className="group relative flex h-20 w-20 flex-col items-center justify-center rounded-xl border border-white/5 bg-surface text-3xl"
      style={{ color: tech.color }}
    >
      {tech.icon}
      <span className="pointer-events-none absolute -bottom-8 scale-0 whitespace-nowrap rounded-md bg-surface px-2 py-1 text-xs text-textp shadow-lg transition-transform group-hover:scale-100 border border-white/10">
        {tech.name}
      </span>
    </motion.div>
  );
}

export default function TechStack() {
  return (
    <RevealSection id="stack">
      <SectionTitle eyebrow="03 — Toolbelt" title="Tech Stack" />
      <div className="space-y-8">
        {groups.map((group) => (
          <div key={group.label}>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-[0.25em] text-textm">
              {group.label}
            </h3>
            <div className="flex flex-wrap gap-4">
              {group.items.map((tech, i) => (
                <IconTile key={tech.name} tech={tech} delay={i * 0.05} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </RevealSection>
  );
}
