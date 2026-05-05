"use client";

import { useEffect, useRef, useState } from "react";
import {
  motion,
  useInView,
  useScroll,
  useTransform,
  useSpring,
  AnimatePresence,
} from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import NavBar from "../../components/NavBar";
import Footer from "../../components/Footer";

// ── Brand Palette ──────────────────────────────────────────
// #0F9BD0  → Brand blue  (CTAs, links, accent highlights)
// #242424  → Global background
// #FFFFFF  → Headings / white text
// #b9b9b9  → Body / paragraph text
// #181818  → Secondary section background
// rgba(0,0,0,0.7) → image overlays
// ──────────────────────────────────────────────────────────

const skills = {
  code: ["React", "Next.js", "TypeScript", "Node.js", "Tailwind CSS", "REST APIs"],
  graphics: ["Figma", "Adobe Illustrator", "Photoshop", "Motion Design", "Brand Identity", "UI/UX"],
};

const expertiseBars = [
  // System Design & Architecture
  { label: "System Design", sub: "Distributed, event-driven, microservices", percent: 92, level: "Advanced" },
  { label: "Scalability Patterns", sub: "Horizontal scaling, load balancing, caching", percent: 88, level: "Advanced" },
  { label: "API Design", sub: "REST, GraphQL, rate limiting, versioning", percent: 94, level: "Advanced" },
  { label: "Database Architecture", sub: "SQL, NoSQL, indexing, replication", percent: 87, level: "Advanced" },

  // DevOps & Infrastructure
  { label: "Docker & Containers", sub: "Compose, multi-stage builds, networking", percent: 90, level: "Advanced" },
  { label: "CI/CD Pipelines", sub: "GitHub Actions, automated deployments", percent: 85, level: "Proficient" },
  { label: "Nginx & Reverse Proxy", sub: "SSL, routing, multi-app VPS hosting", percent: 86, level: "Proficient" },

  // AI & Intelligent Systems
  { label: "AI Integration & LLM APIs", sub: "Prompt engineering, Replicate, OpenRouter", percent: 91, level: "Advanced" },
  { label: "AI Automation Workflows", sub: "Agentic pipelines, task orchestration", percent: 88, level: "Advanced" },
  { label: "RAG & Vector Search", sub: "Retrieval-augmented generation, embeddings", percent: 78, level: "Growing" },

  // Full-Stack Engineering
  { label: "Backend Systems", sub: "Node.js, Express, auth, queues, cron", percent: 93, level: "Advanced" },
  { label: "SaaS Product Architecture", sub: "Multi-tenancy, billing, usage limits", percent: 89, level: "Advanced" },
  { label: "Security & Auth", sub: "JWT, OAuth, Clerk, RBAC, rate limiting", percent: 87, level: "Proficient" },
];

const companyStats = [
  { target: 10, label: "Projects Delivered" },
  { target: 5, label: "Client Reviews" },
  { target: 2, label: "Years Experience" },
  { target: 2, label: "Team Members" },
];

const visions = [
  {
    icon: "✦",
    title: "Empower Through Technology",
    body: "We envision a world where every business — regardless of size — can harness cutting-edge AI and automation to scale efficiently and compete globally.",
  },
  {
    icon: "◈",
    title: "Design-Driven Engineering",
    body: "Great software isn't just functional — it's beautiful. We believe the future belongs to products where design and engineering are inseparable disciplines.",
  },
  {
    icon: "∞",
    title: "Sustainable Innovation",
    body: "Building for tomorrow means building responsibly. We craft systems that are scalable, maintainable, and environmentally conscious.",
  },
  {
    icon: "⌥",
    title: "Community-First Growth",
    body: "Technology should uplift communities. We're committed to knowledge-sharing, mentorship, and creating digital ecosystems that benefit everyone.",
  },
];

const timeline = [
  {
    date: "May 2025",
    title: "My-Portifolio",
    desc: "Knew nothing about web development. Started from scratch with HTML and CSS — built a personal portfolio one line at a time. Learned how to push code to GitHub and deploy with Pages. This was the moment it clicked: I could actually build things for the web.",
    tech: "HTML",
  },
  {
    date: "Sep 2025",
    title: "Laki Construction",
    desc: "Landed the first paying client. Built a complete construction company site from the ground up. Learned to translate real business needs into working code — deadlines, feedback loops, and the pressure of delivering for someone counting on you.",
    tech: "HTML",
  },
  {
    date: "Oct 2025",
    title: "MY-BLOGS",
    desc: "Static sites weren't enough anymore. Dived into EJS and server-side rendering — built a blog that could serve dynamic content. Started thinking like a full-stack developer. The boundaries between frontend and backend began to blur.",
    tech: "EJS",
  },
  {
    date: "Jan 2026",
    title: "Ecommerce Startup",
    desc: "Wanted to understand how real products are built. Explored e-commerce architecture — product catalogs, page flows, checkout patterns. Learned that structure matters more than clever tricks when you're building something meant to scale.",
    tech: "HTML",
  },
  {
    date: "Feb 2026",
    title: "matembo-dev-CLI",
    desc: "Built a command-line tool in JavaScript — not for a client, not for a tutorial, just because I wanted to automate my own workflow. This was the shift from 'learning to code' to 'building with code.' Started thinking in terms of developer experience.",
    tech: "JavaScript",
  },
  {
    date: "Apr 2026",
    title: "QuizzApp + Auth Starter",
    desc: "Made the leap to TypeScript. Built a real-time quiz platform — authentication, admin dashboards, live scoring. Then built a reusable auth starter. Went from coding features to designing systems. The gap between student and engineer closed here.",
    tech: "TypeScript",
  },
];

// ── Reusable animation variants ────────────────────────────
const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  show: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] } },
};

const stagger = (staggerChildren = 0.08, delayChildren = 0) => ({
  hidden: {},
  show: { transition: { staggerChildren, delayChildren } },
});

const slideInLeft = {
  hidden: { opacity: 0, x: -40 },
  show: { opacity: 1, x: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] } },
};

const slideInRight = {
  hidden: { opacity: 0, x: 40 },
  show: { opacity: 1, x: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] } },
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.88 },
  show: { opacity: 1, scale: 1, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] } },
};

// ── Scroll-triggered wrapper ────────────────────────────────
function Reveal({
  children,
  variants = fadeUp,
  className = "",
  delay = 0,
}: {
  children: React.ReactNode;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  variants?: any;
  className?: string;
  delay?: number;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={inView ? "show" : "hidden"}
      variants={variants}
      transition={{ delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// ── Glitch text on hover ────────────────────────────────────
function GlitchText({ text }: { text: string }) {
  return (
    <motion.span
      className="relative inline-block cursor-default"
      whileHover="hover"
      initial="rest"
    >
      <span className="relative z-10">{text}</span>
      <motion.span
        className="absolute inset-0"
        style={{ color: "#0F9BD0", clipPath: "inset(25% 0 45% 0)" }}
        variants={{
          rest: { opacity: 0, x: 0 },
          hover: { opacity: 0.55, x: -3, transition: { duration: 0.05 } },
        }}
        aria-hidden
      >
        {text}
      </motion.span>
      <motion.span
        className="absolute inset-0"
        style={{ color: "#b9b9b9", clipPath: "inset(60% 0 10% 0)" }}
        variants={{
          rest: { opacity: 0, x: 0 },
          hover: { opacity: 0.3, x: 3, transition: { duration: 0.05 } },
        }}
        aria-hidden
      >
        {text}
      </motion.span>
    </motion.span>
  );
}

// ── Skill tag with spring hover ─────────────────────────────
function SkillTag({ label, accent }: { label: string; accent?: boolean }) {
  return (
    <motion.span
      variants={fadeUp}
      whileHover={{ scale: 1.08, transition: { type: "spring", stiffness: 400, damping: 20 } }}
      className="font-mono text-xs px-3 py-1 rounded-sm border cursor-default"
      style={{
        color: accent ? "#0F9BD0" : "#b9b9b9",
        borderColor: accent ? "rgba(15,155,208,0.35)" : "rgba(185,185,185,0.12)",
        backgroundColor: accent ? "rgba(15,155,208,0.06)" : "rgba(185,185,185,0.04)",
      }}
    >
      {label}
    </motion.span>
  );
}

// ── Dot grid canvas background ──────────────────────────────
function DotGrid() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const draw = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = "rgba(15,155,208,0.07)";
      const gap = 36;
      for (let x = 0; x < canvas.width; x += gap)
        for (let y = 0; y < canvas.height; y += gap) {
          ctx.beginPath();
          ctx.arc(x, y, 1, 0, Math.PI * 2);
          ctx.fill();
        }
    };
    draw();
    window.addEventListener("resize", draw);
    return () => window.removeEventListener("resize", draw);
  }, []);
  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none" aria-hidden />;
}

// ── Pulsing "=" sign ────────────────────────────────────────
function PulsingEquals() {
  return (
    <motion.div
      className="font-black leading-none mb-2"
      style={{ fontSize: "5rem", color: "#0F9BD0" }}
      animate={{
        textShadow: [
          "0 0 0px rgba(15,155,208,0)",
          "0 0 20px rgba(15,155,208,0.6)",
          "0 0 0px rgba(15,155,208,0)",
        ],
      }}
      transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
    >
      =
    </motion.div>
  );
}

// ── Animated counter for stats ──────────────────────────────
function AnimatedCounter({ target, label, suffix = "+" }: { target: number; label: string; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  useEffect(() => {
    if (!inView) return;
    const duration = 2000;
    const step = Math.max(1, Math.ceil(target / (duration / 16)));
    let current = 0;
    const timer = setInterval(() => {
      current += step;
      if (current >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(current);
      }
    }, 16);
    return () => clearInterval(timer);
  }, [inView, target]);

  return (
    <motion.div
      ref={ref}
      className="flex flex-col items-start p-6 rounded-[8px]"
      style={{ backgroundColor: "rgba(255,255,255,0.03)" }}
      whileHover={{ backgroundColor: "rgba(15,155,208,0.06)", scale: 1.03 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      <div className="flex items-baseline mb-2">
        <span
          className="font-bold text-white leading-none tracking-tight"
          style={{ fontSize: "clamp(2.5rem, 5vw, 3.5rem)" }}
        >
          {count}{suffix}
        </span>
      </div>
      <span className="font-mono text-xs tracking-wider uppercase" style={{ color: "#b9b9b9" }}>
        {label}
      </span>
    </motion.div>
  );
}

// ── Animated progress bar ───────────────────────────────────
function ProgressBar({ label, percent }: { label: string; percent: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <div ref={ref}>
      <div className="flex justify-between items-end mb-2">
        <span className="font-mono text-[13px] tracking-wide" style={{ color: "#FFFFFF" }}>
          {label}
        </span>
        <motion.span
          className="font-mono text-[13px]"
          style={{ color: "#0F9BD0" }}
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.3, delay: 0.6 }}
        >
          {percent}%
        </motion.span>
      </div>
      <div className="w-full h-1.5 rounded-[4px] overflow-hidden" style={{ backgroundColor: "rgba(255,255,255,0.06)" }}>
        <motion.div
          className="h-full rounded-[4px]"
          style={{ backgroundColor: "#0F9BD0" }}
          initial={{ width: 0 }}
          animate={inView ? { width: `${percent}%` } : { width: 0 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
        />
      </div>
    </div>
  );
}

export default function AboutPage() {
  const { scrollY } = useScroll();
  const heroY = useTransform(scrollY, [0, 500], [0, -80]);
  const heroOpacity = useTransform(scrollY, [0, 400], [1, 0.2]);
  const smoothHeroY = useSpring(heroY, { stiffness: 80, damping: 20 });
  const [visionOpen, setVisionOpen] = useState(false);

  return (
    <main
      className="relative min-h-screen overflow-x-hidden"
      style={{ backgroundColor: "#242424", color: "#FFFFFF" }}
    >
      <DotGrid />

      {/* Animated brand blue top bar */}
      <motion.div
        className="absolute top-0 left-0 right-0 h-[3px] z-[60]"
        style={{ backgroundColor: "#0F9BD0" }}
        initial={{ scaleX: 0, originX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
      />

      {/* ── NAV ── */}
      <motion.div
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <NavBar />
      </motion.div>

      {/* ── HERO (Full-Bleed Image + Parallax) ── */}
      <section className="relative w-full h-[85vh] min-h-[600px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/faqimages.jpg"
            alt="Hero Background"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/70" />
        </div>

        <motion.div
          className="relative z-10 text-center px-6"
          style={{ y: smoothHeroY, opacity: heroOpacity }}
        >
          {/* Breadcrumb */}
          <motion.div
            className="flex items-center justify-center gap-2 font-mono text-xs tracking-[0.3em] uppercase mb-8"
            style={{ color: "rgba(255,255,255,0.5)" }}
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <Link
              href="/"
              className="hover:text-[#0F9BD0] transition-colors"
              style={{ color: "rgba(255,255,255,0.5)" }}
            >
              Home
            </Link>
            <span style={{ color: "rgba(255,255,255,0.2)" }}>/</span>
            <span style={{ color: "#0F9BD0" }}>About Us</span>
          </motion.div>

          {/* Staggered headline */}
          <motion.h1
            className="font-black leading-none tracking-tighter mb-8"
            style={{ fontSize: "clamp(3.5rem, 10vw, 9rem)", color: "#FFFFFF" }}
            initial="hidden"
            animate="show"
            variants={stagger(0.15, 0.3)}
          >
            <motion.span className="block" variants={fadeUp}>
              <GlitchText text="Web" />
            </motion.span>
            <motion.span className="block" style={{ color: "#0F9BD0" }} variants={fadeUp}>
              Design
            </motion.span>
            <motion.span className="block" style={{ color: "rgba(255,255,255,0.25)" }} variants={fadeUp}>
              Engineer.
            </motion.span>
          </motion.h1>

          {/* Animated slogan divider */}
          <motion.div
            className="flex items-center gap-6 mb-6 mt-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.9 }}
          >
            <motion.div
              className="flex-1 h-px"
              style={{ backgroundColor: "rgba(255,255,255,0.1)" }}
              initial={{ scaleX: 0, originX: 1 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.8, delay: 1.0, ease: [0.22, 1, 0.36, 1] }}
            />
            <p className="font-mono text-sm whitespace-nowrap tracking-widest uppercase" style={{ color: "#b9b9b9" }}>
              Programming + Graphics = Perfect Design
            </p>
            <motion.div
              className="flex-1 h-px"
              style={{ backgroundColor: "rgba(255,255,255,0.1)" }}
              initial={{ scaleX: 0, originX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.8, delay: 1.0, ease: [0.22, 1, 0.36, 1] }}
            />
          </motion.div>

          <motion.p
            className="font-mono text-[11px] tracking-[0.25em] uppercase"
            style={{ color: "rgba(185,185,185,0.35)" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.3, duration: 0.8 }}
          >
            [ 01 ] — Who We Are
          </motion.p>
        </motion.div>
      </section>

      {/* ── MAIN CONTENT ── */}
      <div className="relative z-10 max-w-6xl mx-auto px-6">

        {/* ── ABOUT / OUR STORY (Two-Column) ── */}
        <section className="py-24 md:py-32">
          <Reveal className="mb-10">
            <p className="text-xs tracking-[0.4em] uppercase mb-6" style={{ color: "#0F9BD0" }}>
              [ 02 ] — Our Story
            </p>
          </Reveal>

          <div className="flex flex-col md:flex-row gap-12 lg:gap-20 items-center">
            {/* Left — Image */}
            <Reveal variants={slideInLeft} className="w-full md:w-[42%] flex justify-center" delay={0}>
              <motion.div
                className="relative w-full max-w-[400px] aspect-[3/4] overflow-hidden rounded-[8px]"
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                <Image
                  src="/aboutpic2.jpg"
                  alt="About Matembo Tech"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(0,0,0,0.5) 0%, transparent 50%)" }} />
              </motion.div>
            </Reveal>

            {/* Right — Content */}
            <Reveal variants={slideInRight} className="w-full md:w-[58%] flex flex-col items-start text-left gap-5" delay={0.1}>
              <motion.span
                className="font-mono text-xs tracking-[0.25em] uppercase mb-4 block"
                style={{ color: "rgba(185,185,185,0.45)" }}
              >
                Behind the Innovation
              </motion.span>
              <h2
                className="font-bold text-white leading-[1.15] mb-6"
                style={{ fontSize: "clamp(1.8rem, 4vw, 2.5rem)" }}
              >
                Embracing Technology<br />To Elevate Business
              </h2>
              <p
                className="mb-5 leading-[1.8]"
                style={{ color: "#b9b9b9", fontSize: "1rem" }}
              >
             At Matembo Tech, we focus on building solutions that solve real problems using AI and automation. The goal is clear. Help businesses scale with systems that work in real conditions, not demos. We design with intent and build with discipline. Every decision ties back to performance, usability, and impact. We avoid complexity that does not add value. We ship fast, but we keep standards high.
              </p>
              <p
                className="mb-8 leading-[1.8]"
                style={{ color: "rgba(185,185,185,0.55)", fontSize: "0.9rem" }}
              >
                We work where design meets engineering. We build products that are clean, usable, and reliable. Every interface serves a purpose. Every function supports a clear outcome. We treat design and development as one process, not separate steps. That alignment leads to systems that scale, stay maintainable, and perform under load. The result is software that solves real needs and remains stable over time.
              </p>
              <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
                <button
                  onClick={() => setVisionOpen(!visionOpen)}
                  className="inline-flex items-center gap-2 font-mono text-sm px-8 py-3 tracking-widest uppercase cursor-pointer"
                  style={{
                    border: `1px solid ${visionOpen ? "#0F9BD0" : "rgba(15,155,208,0.5)"}`,
                    color: visionOpen ? "#FFFFFF" : "#0F9BD0",
                    backgroundColor: visionOpen ? "rgba(15,155,208,0.2)" : "rgba(15,155,208,0.06)",
                    transition: "all 0.3s ease",
                  }}
                >
                  {visionOpen ? "Close Vision" : "Our Vision"}
                  <motion.span
                    animate={{ rotate: visionOpen ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                    className="inline-block"
                  >
                    ↓
                  </motion.span>
                </button>
              </motion.div>

              {/* Vision Carousel Panel */}
              <AnimatePresence>
                {visionOpen && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                    className="overflow-hidden w-full"
                  >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                      {visions.map((v, i) => (
                        <motion.div
                          key={v.title}
                          initial={{ opacity: 0, y: 24 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: i * 0.1, duration: 0.45, ease: "easeOut" }}
                          whileHover={{ scale: 1.02, backgroundColor: "rgba(15,155,208,0.08)" }}
                          className="p-5 rounded-[8px] cursor-default"
                          style={{
                            backgroundColor: "rgba(15,155,208,0.03)",
                            border: "1px solid rgba(15,155,208,0.1)",
                            transition: "background-color 0.25s ease",
                          }}
                        >
                          <div className="flex items-center gap-3 mb-3">
                            <motion.span
                              className="font-mono text-lg"
                              style={{ color: "#0F9BD0" }}
                              whileHover={{ scale: 1.3, rotate: 10 }}
                              transition={{ type: "spring", stiffness: 300, damping: 15 }}
                            >
                              {v.icon}
                            </motion.span>
                            <h4
                              className="font-bold text-sm"
                              style={{ color: "#FFFFFF" }}
                            >
                              {v.title}
                            </h4>
                          </div>
                          <p className="leading-[1.75]" style={{ color: "#b9b9b9", fontSize: "0.85rem" }}>
                            {v.body}
                          </p>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </Reveal>
          </div>
        </section>

        {/* ── STATS GRID ── */}
        <section className="py-24 md:py-32">
          <Reveal className="mb-10">
            <p className="font-mono text-xs tracking-[0.4em] uppercase mb-6" style={{ color: "#0F9BD0" }}>
              [ 03 ] — Numbers Talk
            </p>
          </Reveal>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {companyStats.map((stat) => (
              <AnimatedCounter
                key={stat.label}
                target={stat.target}
                label={stat.label}
                suffix="+"
              />
            ))}
          </div>
        </section>

        {/* ── SKILLS FUSION ── */}
        <section className="py-24 md:py-32">
          <Reveal className="mb-10">
            <p className="text-xs tracking-[0.4em] uppercase mb-6" style={{ color: "#0F9BD0" }}>
              [ 04 ] — The Slogan
            </p>
          </Reveal>

          <div
            className="grid grid-cols-1 md:grid-cols-3 border mb-16"
            style={{ borderColor: "rgba(255,255,255,0.07)" }}
          >
            {/* Programming */}
            <Reveal variants={slideInLeft} className="p-8 border-r" delay={0}>
              <div style={{ borderColor: "rgba(255,255,255,0.07)" }}>
                <div className="flex items-center gap-3 mb-6">
                  <motion.div
                    className="w-2 h-2 rounded-full"
                    style={{ backgroundColor: "#0F9BD0" }}
                    animate={{ scale: [1, 1.4, 1], opacity: [1, 0.6, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                  <span className="font-mono text-xs tracking-widest uppercase" style={{ color: "#0F9BD0" }}>
                    Programming
                  </span>
                </div>
                <motion.div
                  className="flex flex-wrap gap-2"
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true }}
                  variants={stagger(0.06, 0.1)}
                >
                  {skills.code.map((s) => (
                    <SkillTag key={s} label={`<${s} />`} accent />
                  ))}
                </motion.div>
              </div>
            </Reveal>

            {/* = center */}
            <Reveal variants={scaleIn} className="p-8 border-r" delay={0.1}>
              <div
                className="flex flex-col items-center justify-center h-full"
                style={{ backgroundColor: "rgba(15,155,208,0.05)", borderColor: "rgba(255,255,255,0.07)" }}
              >
                <PulsingEquals />
                <p className="font-mono text-xs text-center tracking-widest uppercase" style={{ color: "rgba(15,155,208,0.55)" }}>
                  Perfect<br />Design
                </p>
              </div>
            </Reveal>

            {/* Graphics */}
            <Reveal variants={slideInRight} className="p-8" delay={0}>
              <div className="flex items-center gap-3 mb-6">
                <motion.div
                  className="w-2 h-2 rounded-full"
                  style={{ backgroundColor: "#b9b9b9" }}
                  animate={{ scale: [1, 1.4, 1], opacity: [1, 0.5, 1] }}
                  transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
                />
                <span className="font-mono text-xs tracking-widest uppercase" style={{ color: "#b9b9b9" }}>Graphics</span>
              </div>
              <motion.div
                className="flex flex-wrap gap-2"
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                variants={stagger(0.06, 0.1)}
              >
                {skills.graphics.map((s) => (
                  <SkillTag key={s} label={`✦ ${s}`} />
                ))}
              </motion.div>
            </Reveal>
          </div>

          {/* ── Progress Bars ── */}
          <Reveal>
            <p className="font-mono text-xs tracking-[0.25em] uppercase mb-6" style={{ color: "rgba(185,185,185,0.35)" }}>
              Expertise Levels
            </p>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-8">
            {expertiseBars.map((bar) => (
              <ProgressBar key={bar.label} label={bar.label} percent={bar.percent} />
            ))}
          </div>
        </section>

        {/* ── TIMELINE ── */}
        <section className="py-24 md:py-32">
          <Reveal className="mb-10">
            <p className="font-mono text-xs tracking-[0.4em] uppercase mb-6" style={{ color: "#0F9BD0" }}>
              [ 05 ] — Timeline
            </p>
          </Reveal>

          <div className="relative">
            {/* Animated vertical line */}
            <motion.div
              className="absolute top-0 bottom-0 w-px"
              style={{ left: "6.5rem", backgroundColor: "rgba(255,255,255,0.05)" }}
              initial={{ scaleY: 0, originY: 0 }}
              whileInView={{ scaleY: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
            />

            <motion.div
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-60px" }}
              variants={stagger(0.12)}
            >
              {timeline.map((item) => (
                <motion.div
                  key={item.date}
                  variants={fadeUp}
                  className="group flex gap-8 items-start py-7 -mx-4 px-4 border-b"
                  style={{ borderColor: "rgba(255,255,255,0.04)", cursor: "default" }}
                  whileHover={{ backgroundColor: "rgba(15,155,208,0.04)", transition: { duration: 0.2 } }}
                >
                  {/* Date */}
                  <motion.span
                    className="font-mono text-xs w-20 shrink-0 pt-1 tracking-wide"
                    style={{ color: "rgba(185,185,185,0.3)" }}
                    whileHover={{ color: "#0F9BD0" }}
                    transition={{ duration: 0.2 }}
                  >
                    {item.date}
                  </motion.span>

                  {/* Animated dot */}
                  <motion.div
                    className="relative shrink-0 mt-1.5"
                    whileHover={{ scale: 1.8 }}
                    transition={{ type: "spring", stiffness: 400, damping: 20 }}
                  >
                    <div className="w-2 h-2 rounded-full" style={{ backgroundColor: "rgba(15,155,208,0.5)" }} />
                  </motion.div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-3 mb-1.5">
                      <h3
                        className="font-bold"
                        style={{ fontSize: "1.05rem", color: "#FFFFFF" }}
                      >
                        {item.title}
                      </h3>

                      {/* Tech badge */}
                      <span
                        className="font-mono text-[10px] px-2 py-0.5 rounded-sm tracking-wider uppercase"
                        style={{
                          color: "#0F9BD0",
                          border: "1px solid rgba(15,155,208,0.25)",
                          backgroundColor: "rgba(15,155,208,0.08)",
                        }}
                      >
                        {item.tech}
                      </span>
                    </div>
                    <p style={{ color: "#b9b9b9", fontSize: "0.875rem", lineHeight: "1.75" }}>{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>
      </div>

      {/* ── FULL-BLEED CTA ── */}
      <section className="relative w-full py-28 md:py-36 flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/24114.png"
            alt="CTA Background"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-black/80" />
        </div>

        <div className="relative z-10 text-center px-6 w-full flex flex-col items-center gap-5">
          <motion.span
            className="font-mono text-xs tracking-[0.3em] uppercase mb-4 block"
            style={{ color: "rgba(185,185,185,0.5)" }}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Ready to scale your vision?
          </motion.span>

          <motion.h2
            className="font-bold text-white leading-[1.15] mb-8"
            style={{ fontSize: "clamp(2rem, 5vw, 3rem)" }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
          >
            Let&apos;s Build Something<br />Extraordinary Together
          </motion.h2>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
          >
            <Link
              href="/contact"
              className="inline-block font-mono text-sm px-10 py-4 tracking-widest uppercase"
              style={{
                backgroundColor: "#0F9BD0",
                color: "#FFFFFF",
                boxShadow: "0 0 40px rgba(15,155,208,0.25)",
              }}
            >
              Hire Us →
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <Footer />
    </main>
  );
}
