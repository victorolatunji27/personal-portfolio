import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { FiCheck, FiDroplet } from 'react-icons/fi';
import { useTheme } from '../context/ThemeContext';

const MENU_HEIGHT_PX = 380; // approximate — used only to decide drop direction
const MENU_WIDTH_PX = 224; // matches w-56

export default function ThemeToggle() {
  const { theme, setTheme, themes } = useTheme();
  const [open, setOpen] = useState(false);
  const [dropUp, setDropUp] = useState(false);
  const [alignRight, setAlignRight] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const btnRef = useRef<HTMLButtonElement>(null);

  const handleToggle = () => {
    setOpen((wasOpen) => {
      const nextOpen = !wasOpen;
      if (nextOpen && btnRef.current) {
        const rect = btnRef.current.getBoundingClientRect();
        const spaceBelow = window.innerHeight - rect.bottom;
        const spaceAbove = rect.top;
        setDropUp(spaceBelow < MENU_HEIGHT_PX && spaceAbove > spaceBelow);
        // Flip menu alignment if opening to the right would overflow the viewport.
        setAlignRight(rect.left + MENU_WIDTH_PX > window.innerWidth - 8);
      }
      return nextOpen;
    });
  };

  useEffect(() => {
    if (!open) return;
    const onDocClick = (e: MouseEvent) => {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    window.addEventListener('mousedown', onDocClick);
    window.addEventListener('keydown', onKey);
    return () => {
      window.removeEventListener('mousedown', onDocClick);
      window.removeEventListener('keydown', onKey);
    };
  }, [open]);

  const active = themes.find((t) => t.key === theme) ?? themes[0];

  return (
    <div ref={rootRef} className="relative">
      <button
        ref={btnRef}
        onClick={handleToggle}
        aria-label="Pick a color theme"
        aria-expanded={open}
        className="relative flex h-10 w-10 items-center justify-center rounded-full border text-textp transition-colors hairline hover:border-accent hover:text-accent"
        style={{ backgroundColor: 'var(--color-surface)' }}
      >
        <span
          aria-hidden
          className="absolute inset-1 rounded-full"
          style={{
            background: `linear-gradient(135deg, ${active.swatch[0]}, ${active.swatch[1]})`,
            opacity: 0.35,
          }}
        />
        <FiDroplet size={16} className="relative z-10" />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: dropUp ? 6 : -6, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: dropUp ? 6 : -6, scale: 0.98 }}
            transition={{ duration: 0.18 }}
            className={`absolute z-50 w-56 overflow-hidden rounded-2xl border shadow-2xl hairline-strong ${
              dropUp ? 'bottom-full mb-2' : 'top-full mt-2'
            } ${alignRight ? 'right-0' : 'left-0'}`}
            style={{ backgroundColor: 'var(--color-surface)' }}
            role="menu"
          >
            <div className="px-4 py-3 text-[11px] font-semibold uppercase tracking-[0.25em] text-textm hairline border-b">
              Theme
            </div>
            <ul className="max-h-80 overflow-y-auto p-1.5">
              {themes.map((t) => {
                const selected = t.key === theme;
                return (
                  <li key={t.key}>
                    <button
                      onClick={() => {
                        setTheme(t.key);
                        setOpen(false);
                      }}
                      className="group flex w-full items-center gap-3 rounded-lg px-2.5 py-2 text-left text-sm text-textp transition-colors hover:bg-accent/10"
                      role="menuitemradio"
                      aria-checked={selected}
                    >
                      <span
                        className="h-5 w-5 shrink-0 rounded-full border"
                        style={{
                          borderColor: 'var(--hairline-strong)',
                          background: `linear-gradient(135deg, ${t.swatch[0]}, ${t.swatch[1]})`,
                        }}
                      />
                      <span className="flex-1">{t.label}</span>
                      {selected && <FiCheck size={16} className="text-accent" />}
                    </button>
                  </li>
                );
              })}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
