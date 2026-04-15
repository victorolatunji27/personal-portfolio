import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { FiArrowDown } from 'react-icons/fi';

const ROLES = ['Full-Stack Developer', 'Hackathon Builder', 'IT Technician', 'Civic Tech Enthusiast'];

function StarField() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let raf = 0;
    let width = 0;
    let height = 0;
    const dpr = window.devicePixelRatio || 1;

    const resize = () => {
      width = canvas.clientWidth;
      height = canvas.clientHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();

    const stars = Array.from({ length: 80 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      r: Math.random() * 1.3 + 0.3,
      vx: (Math.random() - 0.5) * 0.15,
      vy: (Math.random() - 0.5) * 0.15,
      alpha: Math.random() * 0.6 + 0.2,
    }));

    const draw = () => {
      ctx.clearRect(0, 0, width, height);
      for (const s of stars) {
        s.x += s.vx;
        s.y += s.vy;
        if (s.x < 0) s.x = width;
        if (s.x > width) s.x = 0;
        if (s.y < 0) s.y = height;
        if (s.y > height) s.y = 0;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(148, 163, 184, ${s.alpha})`;
        ctx.fill();
      }
      raf = requestAnimationFrame(draw);
    };
    draw();

    window.addEventListener('resize', resize);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return <canvas ref={ref} className="absolute inset-0 h-full w-full" aria-hidden="true" />;
}

function Typewriter() {
  const [index, setIndex] = useState(0);
  const [sub, setSub] = useState('');
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = ROLES[index];
    const step = deleting ? 40 : 85;

    const timer = setTimeout(() => {
      if (!deleting) {
        const next = current.slice(0, sub.length + 1);
        setSub(next);
        if (next === current) {
          setTimeout(() => setDeleting(true), 1400);
        }
      } else {
        const next = current.slice(0, sub.length - 1);
        setSub(next);
        if (next.length === 0) {
          setDeleting(false);
          setIndex((i) => (i + 1) % ROLES.length);
        }
      }
    }, step);

    return () => clearTimeout(timer);
  }, [sub, deleting, index]);

  return (
    <span className="gradient-text">
      {sub}
      <span className="ml-0.5 inline-block w-[2px] -translate-y-0.5 animate-pulse bg-accent align-middle" style={{ height: '1em' }} />
    </span>
  );
}

export default function Hero() {
  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) window.scrollTo({ top: el.offsetTop - 20, behavior: 'smooth' });
  };

  return (
    <section
      id="hero"
      className="relative flex min-h-screen items-center justify-center overflow-hidden px-6 pt-20 lg:pl-56"
    >
      <StarField />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-bg pointer-events-none" />

      <div className="relative z-10 mx-auto max-w-4xl text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7 }}
          className="mx-auto mb-10 flex h-44 w-44 items-center justify-center sm:h-56 sm:w-56"
        >
          <div className="relative h-full w-full">
            <div
              className="absolute inset-0 rounded-full"
              style={{
                background:
                  'conic-gradient(from 0deg, var(--color-accent), var(--color-accent-secondary), var(--color-accent))',
                filter: 'blur(2px)',
                animation: 'ring-spin 8s linear infinite',
              }}
            />
            <div className="absolute inset-[6px] overflow-hidden rounded-full bg-bg animate-pulse-ring">
              <img
                src={`${import.meta.env.BASE_URL}assets/profile.png`}
                alt="Victor Olatunji"
                className="h-full w-full object-cover"
              />
            </div>
          </div>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="font-display text-5xl sm:text-7xl"
        >
          Victor <span className="gradient-text">Olatunji</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="mt-4 text-lg text-textm sm:text-xl"
        >
          CS Student @ University of Maryland
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.45 }}
          className="mt-6 text-xl font-medium sm:text-2xl"
        >
          I&apos;m a <Typewriter />
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.65 }}
          className="mt-10 flex flex-wrap items-center justify-center gap-4"
        >
          <button
            onClick={() => scrollTo('projects')}
            className="group relative overflow-hidden rounded-full bg-accent px-7 py-3 text-sm font-semibold text-white transition-transform hover:scale-[1.03] shadow-glow"
          >
            <span className="relative z-10 flex items-center gap-2">
              See my work <FiArrowDown className="transition-transform group-hover:translate-y-0.5" />
            </span>
          </button>
          <button
            onClick={() => scrollTo('links')}
            className="rounded-full border border-white/15 px-7 py-3 text-sm font-semibold text-textp transition-colors hover:border-accent hover:text-accent"
          >
            Get in touch
          </button>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.6 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 text-xs uppercase tracking-[0.3em] text-textm"
      >
        scroll
      </motion.div>
    </section>
  );
}
