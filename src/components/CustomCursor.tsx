import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export default function CustomCursor() {
  const [hovered, setHovered] = useState(false);
  const [visible, setVisible] = useState(false);

  const dotX = useMotionValue(-100);
  const dotY = useMotionValue(-100);
  const ringX = useSpring(dotX, { stiffness: 220, damping: 22, mass: 0.5 });
  const ringY = useSpring(dotY, { stiffness: 220, damping: 22, mass: 0.5 });

  useEffect(() => {
    if (window.matchMedia('(hover: none)').matches) return;

    const move = (e: MouseEvent) => {
      dotX.set(e.clientX);
      dotY.set(e.clientY);
      if (!visible) setVisible(true);
    };

    const over = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;
      const interactive = target.closest('a, button, [role="button"], input, textarea, select, .cursor-grow');
      setHovered(Boolean(interactive));
    };

    const leave = () => setVisible(false);

    window.addEventListener('mousemove', move);
    window.addEventListener('mouseover', over);
    window.addEventListener('mouseout', leave);
    window.addEventListener('mouseleave', leave);
    return () => {
      window.removeEventListener('mousemove', move);
      window.removeEventListener('mouseover', over);
      window.removeEventListener('mouseout', leave);
      window.removeEventListener('mouseleave', leave);
    };
  }, [dotX, dotY, visible]);

  return (
    <>
      <motion.div
        className="pointer-events-none fixed top-0 left-0 z-[9999] hidden md:block"
        style={{ x: dotX, y: dotY, opacity: visible ? 1 : 0 }}
      >
        <div
          className="-translate-x-1/2 -translate-y-1/2 rounded-full"
          style={{
            width: 8,
            height: 8,
            backgroundColor: 'var(--color-accent)',
            boxShadow: '0 0 12px var(--color-accent)',
          }}
        />
      </motion.div>
      <motion.div
        className="pointer-events-none fixed top-0 left-0 z-[9998] hidden md:block"
        style={{ x: ringX, y: ringY, opacity: visible ? 1 : 0 }}
      >
        <motion.div
          animate={{
            width: hovered ? 44 : 32,
            height: hovered ? 44 : 32,
            backgroundColor: hovered ? 'rgba(124, 58, 237, 0.18)' : 'rgba(124, 58, 237, 0)',
            borderColor: hovered ? 'var(--color-accent)' : 'rgba(124, 58, 237, 0.6)',
          }}
          transition={{ type: 'spring', stiffness: 260, damping: 20 }}
          className="-translate-x-1/2 -translate-y-1/2 rounded-full border-2"
        />
      </motion.div>
    </>
  );
}
