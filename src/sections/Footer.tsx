import { FaGithub, FaLinkedin } from 'react-icons/fa';
import { FiMail } from 'react-icons/fi';

export default function Footer() {
  return (
    <footer className="border-t border-white/5 bg-bg/80 px-6 py-10 lg:pl-56">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 sm:flex-row">
        <div>
          <div className="font-display text-lg gradient-text">Victor Olatunji</div>
          <div className="text-xs text-textm">© {new Date().getFullYear()} — Built with React + Vite.</div>
        </div>
        <div className="flex items-center gap-3">
          <a
            href="https://github.com/victorolatunji27"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-textp transition-colors hover:border-accent hover:text-accent"
          >
            <FaGithub />
          </a>
          <a
            href="https://www.linkedin.com/in/victor-olatunji-914320345/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-textp transition-colors hover:border-accent hover:text-accent"
          >
            <FaLinkedin />
          </a>
          <a
            href="mailto:volatunj@terpmail.umd.edu"
            aria-label="Email"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-textp transition-colors hover:border-accent hover:text-accent"
          >
            <FiMail />
          </a>
        </div>
      </div>
    </footer>
  );
}
