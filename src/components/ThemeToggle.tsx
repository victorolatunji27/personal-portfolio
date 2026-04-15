import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { FiCheck, FiDroplet } from 'react-icons/fi';
import { useTheme } from '../context/ThemeContext';

const MENU_WIDTH_PX = 224;
const GAP_PX = 8;
const VIEWPORT_MARGIN = 12;

type Pos = { top: number; left: number; transformOrigin: string };

export default function ThemeToggle() {
  const { theme, setTheme, themes } = useTheme();
  const [open, setOpen] = useState(false);
  const [pos, setPos] = useState<Pos | null>(null);
  const btnRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  const computePosition = () => {
    const btn = btnRef.current;
    if (!btn) return;
    const rect = btn.getBoundingClientRect();
    const menuH = menuRef.current?.offsetHeight ?? 380;
    const vw = window.innerWidth;
    const vh = window.innerHeight;

    // Horizontal: default to aligning menu's left with button's left.
    let left = rect.left;
    if (left + MENU_WIDTH_PX > vw - VIEWPORT_MARGIN) {
      // Align the menu's right edge with the button's right edge instead.
      left = rect.right - MENU_WIDTH_PX;
    }
    left = Math.max(VIEWPORT_MARGIN, left);

    // Vertical: prefer below; flip above when there isn't room.
    const spaceBelow = vh - rect.bottom;
    const spaceAbove = rect.top;
    const placeAbove = spaceBelow < menuH + GAP_PX && spaceAbove > spaceBelow;
    const top = placeAbove ? rect.top - menuH - GAP_PX : rect.bottom + GAP_PX;

    setPos({
      top,
      left,
      transformOrigin: placeAbove ? 'bottom center' : 'top center',
    });
  };

  const handleToggle = () => {
    setOpen((v) => {
      const next = !v;
      if (next) computePosition();
      return next;
    });
  };

  // Recompute once the menu has rendered so we use its real height.
  useLayoutEffect(() => {
    if (open) computePosition();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onDocClick = (e: MouseEvent) => {
      const target = e.target as Node;
      if (btnRef.current?.contains(target)) return;
      if (menuRef.current?.contains(target)) return;
      setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    const onReflow = () => computePosition();
    window.addEventListener('mousedown', onDocClick);
    window.addEventListener('keydown', onKey);
    window.addEventListener('resize', onReflow);
    window.addEventListener('scroll', onReflow, { passive: true });
    return () => {
      window.removeEventListener('mousedown', onDocClick);
      window.removeEventListener('keydown', onKey);
      window.removeEventListener('resize', onReflow);
      window.removeEventListener('scroll', onReflow);
    };
  }, [open]);

  const active = themes.find((t) => t.key === theme) ?? themes[0];

  const menu =
    open && typeof document !== 'undefined'
      ? createPortal(
          <AnimatePresence>
            <motion.div
              ref={menuRef}
              key="theme-menu"
              initial={{ opacity: 0, y: -4, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -4, scale: 0.98 }}
              transition={{ duration: 0.16 }}
              className="fixed z-[1000] w-56 overflow-hidden rounded-2xl border shadow-2xl hairline-strong"
              style={{
                top: pos?.top ?? -9999,
                left: pos?.left ?? -9999,
                transformOrigin: pos?.transformOrigin,
                backgroundColor: 'var(--color-surface)',
                visibility: pos ? 'visible' : 'hidden',
              }}
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
          </AnimatePresence>,
          document.body,
        )
      : null;

  return (
    <>
      <button
        ref={btnRef}
        onClick={handleToggle}
        aria-label="Pick a color theme"
        aria-expanded={open}
        className="relative flex h-10 items-center gap-2 rounded-full border pl-1.5 pr-3.5 text-textp transition-colors hairline hover:border-accent hover:text-accent"
        style={{ backgroundColor: 'var(--color-surface)' }}
      >
        <span
          className="flex h-7 w-7 items-center justify-center rounded-full border hairline-strong"
          style={{
            background: `linear-gradient(135deg, ${active.swatch[0]}, ${active.swatch[1]})`,
          }}
          aria-hidden
        >
          <FiDroplet size={13} className="text-white drop-shadow" />
        </span>
        <span className="text-xs font-semibold uppercase tracking-[0.18em]">Themes</span>
      </button>
      {menu}
    </>
  );
}
