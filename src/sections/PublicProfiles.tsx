import { motion } from 'framer-motion';
import { FiMail } from 'react-icons/fi';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import RevealSection from '../components/RevealSection';
import SectionTitle from '../components/SectionTitle';

const profiles = [
  {
    icon: <FaGithub size={30} />,
    label: 'GitHub',
    value: 'victorolatunji27',
    href: 'https://github.com/victorolatunji27',
  },
  {
    icon: <FaLinkedin size={30} />,
    label: 'LinkedIn',
    value: 'victor-olatunji-914320345',
    href: 'https://www.linkedin.com/in/victor-olatunji-914320345/',
  },
];

export default function PublicProfiles() {
  return (
    <RevealSection id="links">
      <SectionTitle eyebrow="02 — Connect" title="Public Profiles" />
      <div className="grid gap-5 md:grid-cols-3">
        {profiles.map((p, i) => (
          <motion.a
            key={p.label}
            href={p.href}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ y: -6 }}
            transition={{ type: 'spring', stiffness: 260, damping: 18, delay: i * 0.05 }}
            className="group block rounded-2xl border border-white/5 bg-surface p-6 transition-shadow hover:shadow-glow"
          >
            <div className="mb-3 text-accent transition-colors group-hover:text-accent-secondary">
              {p.icon}
            </div>
            <div className="text-xs uppercase tracking-widest text-textm">{p.label}</div>
            <div className="mt-1 truncate text-base font-medium text-textp">{p.value}</div>
          </motion.a>
        ))}
        <motion.div
          whileHover={{ y: -6 }}
          transition={{ type: 'spring', stiffness: 260, damping: 18 }}
          className="rounded-2xl border border-white/5 bg-surface p-6 hover:shadow-glow-cyan"
        >
          <div className="mb-3 text-accent-secondary">
            <FiMail size={30} />
          </div>
          <div className="text-xs uppercase tracking-widest text-textm">Email</div>
          <a
            href="mailto:volatunj@terpmail.umd.edu"
            className="mt-1 block truncate text-sm font-medium text-textp hover:text-accent"
          >
            volatunj@terpmail.umd.edu
          </a>
          <a
            href="mailto:victor.olatunji27@gmail.com"
            className="block truncate text-sm font-medium text-textp hover:text-accent"
          >
            victor.olatunji27@gmail.com
          </a>
        </motion.div>
      </div>
    </RevealSection>
  );
}
