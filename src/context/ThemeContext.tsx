import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import type { ReactNode } from 'react';

export type ThemeKey =
  | 'midnight'
  | 'daylight'
  | 'ocean'
  | 'sunset'
  | 'forest'
  | 'cyberpunk'
  | 'terracotta'
  | 'mono';

export type ThemeDef = {
  key: ThemeKey;
  label: string;
  mode: 'dark' | 'light';
  swatch: [string, string]; // two-color preview gradient
};

export const THEMES: ThemeDef[] = [
  { key: 'midnight', label: 'Midnight', mode: 'dark', swatch: ['#7c3aed', '#06b6d4'] },
  { key: 'daylight', label: 'Daylight', mode: 'light', swatch: ['#7c3aed', '#0891b2'] },
  { key: 'ocean', label: 'Ocean', mode: 'dark', swatch: ['#38bdf8', '#22d3ee'] },
  { key: 'sunset', label: 'Sunset', mode: 'dark', swatch: ['#f97316', '#ec4899'] },
  { key: 'forest', label: 'Forest', mode: 'dark', swatch: ['#22c55e', '#84cc16'] },
  { key: 'cyberpunk', label: 'Cyberpunk', mode: 'dark', swatch: ['#ff006e', '#00f5ff'] },
  { key: 'terracotta', label: 'Terracotta', mode: 'dark', swatch: ['#ea580c', '#eab308'] },
  { key: 'mono', label: 'Monochrome', mode: 'dark', swatch: ['#e5e5e5', '#737373'] },
];

interface ThemeContextValue {
  theme: ThemeKey;
  setTheme: (t: ThemeKey) => void;
  themes: ThemeDef[];
}

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState<ThemeKey>(() => {
    if (typeof window === 'undefined') return 'midnight';
    const stored = localStorage.getItem('theme') as ThemeKey | null;
    if (stored && THEMES.some((t) => t.key === stored)) return stored;
    return 'midnight';
  });

  useEffect(() => {
    const root = document.documentElement;
    root.setAttribute('data-theme', theme);
    const def = THEMES.find((t) => t.key === theme);
    root.classList.remove('mode-light', 'mode-dark');
    root.classList.add(def?.mode === 'light' ? 'mode-light' : 'mode-dark');
    localStorage.setItem('theme', theme);
  }, [theme]);

  const value = useMemo<ThemeContextValue>(
    () => ({ theme, setTheme: setThemeState, themes: THEMES }),
    [theme],
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error('useTheme must be used inside ThemeProvider');
  return ctx;
}
