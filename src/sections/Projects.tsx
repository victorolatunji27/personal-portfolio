import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FiExternalLink } from 'react-icons/fi';
import RevealSection from '../components/RevealSection';
import SectionTitle from '../components/SectionTitle';

type Project = {
  title: string;
  subtitle: string;
  meta: string;
  description: string;
  tags: string[];
  live?: string;
  wip?: boolean;
  accolade?: string;
};

const projects: Project[] = [
  {
    title: 'EchoSense',
    subtitle: 'Real-Time ASL Interpreter',
    meta: 'April 2026',
    accolade: '5th Place — Machine Learning Track · Bitcamp 2026',
    description:
      "Browser-native ASL interpreter tracking 21 hand landmarks at 30 fps via Google MediaPipe WebAssembly, supporting three translation modes. A custom ASL grammar pipeline powered by Anthropic Claude Sonnet converts ASL syntax to grammatically correct English. Integrated UMD's TerpAI gateway on Microsoft Azure for real-time contextual sentence suggestions.",
    tags: ['MediaPipe', 'WebAssembly', 'Claude Sonnet', 'ElevenLabs', 'Azure'],
    live: 'https://echosense-lyart.vercel.app/',
  },
  {
    title: '202 Connect',
    subtitle: 'AI-Powered Civic Resource Platform',
    meta: 'February 2026',
    accolade: 'BisonHacks · Howard University',
    description:
      'Multilingual civic resource platform deployed on Firebase, built to serve 116,000+ DC residents. Includes a ward-level demand heatmap using Leaflet.js and a five-factor AI Trust Score system via Google AI Studio API.',
    tags: ['Node.js', 'Firebase', 'Leaflet.js', 'Google AI Studio'],
    live: 'https://202connect.base44.app/',
  },
  {
    title: 'AspectAI',
    subtitle: 'AI-Powered Video Summarizer',
    meta: 'September 2025',
    description:
      'Full-stack app that accepts YouTube URLs and returns AI-generated summaries with clickable timestamps.',
    tags: ['React', 'Node.js', 'Firebase', 'YouTube Data API'],
    wip: true,
  },
];

function ProjectCard({ project, idx }: { project: Project; idx: number }) {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.15 });
  return (
    <motion.article
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, delay: idx * 0.1 }}
      whileHover={{ y: -6, rotateX: 2, rotateY: -2 }}
      style={{ transformPerspective: 1000 }}
      className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-white/5 bg-surface/70 p-6 backdrop-blur transition-shadow hover:shadow-glow"
    >
      {project.wip && (
        <>
          <div className="pointer-events-none absolute inset-0 z-10 flex items-center justify-center bg-bg/80 backdrop-blur-[2px]">
            <div className="rounded-full bg-surface px-4 py-2 text-sm font-semibold text-accent shadow-xl border border-accent/40">
              🚧 Coming Soon
            </div>
          </div>
          <div className="pointer-events-none absolute inset-0 shimmer-bg animate-shimmer" />
        </>
      )}

      <div className="flex items-baseline justify-between gap-3">
        <div>
          <h3 className="font-display text-2xl">{project.title}</h3>
          <p className="mt-1 text-sm text-accent">{project.subtitle}</p>
        </div>
        <span className="text-xs uppercase tracking-wider text-textm">{project.meta}</span>
      </div>

      {project.accolade && (
        <p className="mt-3 text-xs font-medium uppercase tracking-widest text-accent-secondary">
          🏆 {project.accolade}
        </p>
      )}

      <p className="mt-4 flex-1 text-sm leading-relaxed text-textm">{project.description}</p>

      <div className="mt-5 flex flex-wrap gap-2">
        {project.tags.map((t) => (
          <span
            key={t}
            className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-[11px] text-textp"
          >
            {t}
          </span>
        ))}
      </div>

      {project.live && (
        <a
          href={project.live}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-6 inline-flex w-fit items-center gap-2 rounded-full bg-accent px-5 py-2 text-sm font-semibold text-white transition-transform hover:scale-[1.03]"
        >
          Live demo <FiExternalLink />
        </a>
      )}
    </motion.article>
  );
}

export default function Projects() {
  return (
    <RevealSection id="projects">
      <SectionTitle eyebrow="06 — Built" title="Projects" />
      <div className="grid gap-6 md:grid-cols-2">
        {projects.map((p, i) => (
          <ProjectCard key={p.title} project={p} idx={i} />
        ))}
      </div>
    </RevealSection>
  );
}
