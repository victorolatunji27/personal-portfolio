import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { FiMenu, FiX } from 'react-icons/fi';
import ThemeToggle from './ThemeToggle';

const LINKS = [
  { id: 'hero', label: 'Home' },
  { id: 'profile', label: 'Profile' },
  { id: 'links', label: 'Connect' },
  { id: 'stack', label: 'Tech Stack' },
  { id: 'experience', label: 'Experience' },
  { id: 'education', label: 'Education' },
  { id: 'projects', label: 'Projects' },
  { id: 'leadership', label: 'Leadership' },
  { id: 'skills', label: 'Skills' },
  { id: 'interests', label: 'Interests' },
];

export default function Navbar() {
  const [active, setActive] = useState('hero');
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handler = () => {
      const y = window.scrollY + window.innerHeight * 0.35;
      let current = LINKS[0].id;
      for (const { id } of LINKS) {
        const el = document.getElementById(id);
        if (!el) continue;
        if (el.offsetTop <= y) current = id;
      }
      setActive(current);
    };
    handler();
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);

  const scrollTo = (id: string) => {
    setMobileOpen(false);
    const el = document.getElementById(id);
    if (el) {
      window.scrollTo({ top: el.offsetTop - 20, behavior: 'smooth' });
    }
  };

  return (
    <>
      {/* Desktop side nav */}
      <aside className="fixed left-0 top-0 z-40 hidden h-screen w-56 flex-col justify-between border-r border-white/5 bg-bg/60 px-6 py-10 backdrop-blur-md lg:flex">
        <div>
          <button onClick={() => scrollTo('hero')} className="font-display text-xl gradient-text">
            Victor&nbsp;O.
          </button>
          <nav className="mt-12 space-y-1">
            {LINKS.map((link) => {
              const isActive = active === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => scrollTo(link.id)}
                  className="relative flex w-full items-center py-2 text-sm font-medium text-textm transition-colors hover:text-textp"
                >
                  <span
                    className={`mr-3 h-px transition-all ${
                      isActive ? 'w-8 bg-accent' : 'w-4 bg-textm/40'
                    }`}
                  />
                  <span className={isActive ? 'text-textp' : ''}>{link.label}</span>
                  {isActive && (
                    <motion.span
                      layoutId="nav-active"
                      className="absolute -left-6 top-1/2 h-6 w-[3px] -translate-y-1/2 rounded-full bg-accent"
                    />
                  )}
                </button>
              );
            })}
          </nav>
        </div>
        <div className="flex items-center gap-3">
          <ThemeToggle />
          <span className="text-xs text-textm">{new Date().getFullYear()}</span>
        </div>
      </aside>

      {/* Mobile top bar */}
      <header className="fixed top-0 left-0 right-0 z-40 flex items-center justify-between border-b border-white/5 bg-bg/70 px-5 py-3 backdrop-blur-md lg:hidden">
        <button onClick={() => scrollTo('hero')} className="font-display text-lg gradient-text">
          Victor&nbsp;O.
        </button>
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <button
            onClick={() => setMobileOpen((v) => !v)}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-surface text-textp"
            aria-label="Toggle navigation menu"
          >
            {mobileOpen ? <FiX size={18} /> : <FiMenu size={18} />}
          </button>
        </div>
      </header>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.25 }}
            className="fixed top-16 left-0 right-0 z-40 mx-4 rounded-2xl border border-white/10 bg-surface p-4 shadow-2xl lg:hidden"
          >
            <nav className="grid grid-cols-2 gap-2">
              {LINKS.map((link) => (
                <button
                  key={link.id}
                  onClick={() => scrollTo(link.id)}
                  className={`rounded-lg px-3 py-2 text-left text-sm transition-colors ${
                    active === link.id
                      ? 'bg-accent/15 text-accent'
                      : 'text-textm hover:bg-white/5 hover:text-textp'
                  }`}
                >
                  {link.label}
                </button>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
