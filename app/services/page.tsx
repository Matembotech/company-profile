"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ChevronDown, ArrowRight, ExternalLink, Star } from "lucide-react";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import BookCallButton from "@/components/BookCallButton";

/* ─────────────────────────────────────────────
   DATA
   ───────────────────────────────────────────── */

type ServiceBlock = {
  heading: string;
  description: string;
  accordion: { title: string; body: string }[];
  image: string;
};

const serviceBlocks: ServiceBlock[] = [
  {
    heading: "Web Design & Application",
    description:
      "From concept to deployment, we build high-performance web applications that are fast, secure, and built to scale with your business growth.",
    accordion: [
      {
        title: "Custom Website Design",
        body: "No templates, no shortcuts. Every site we build is designed from scratch to match your brand and business goals — with pixel-perfect precision and modern aesthetics.",
      },
      {
        title: "Frontend & Backend Development",
        body: "We build full-stack solutions using modern frameworks like Next.js, React, and Node.js — delivering fast, responsive, and maintainable codebases.",
      },
      {
        title: "E-commerce Development",
        body: "From product catalogs to secure checkout flows, we build e-commerce platforms that convert visitors into customers and scale with your inventory.",
      },
      {
        title: "CMS Integration",
        body: "We integrate headless CMS platforms like WordPress, Strapi, and Webflow — giving you full control over your content without touching code.",
      },
    ],
    image: "/thumbail-15.jpg",
  },
  {
    heading: "App Design",
    description:
      "We design native mobile apps for iOS and Android that are fast, responsive, and built to scale with your business growth.",
    accordion: [
      {
        title: "Native App Development",
        body: "We build custom native apps for iOS and Android using the latest tools and technologies — delivering fast, responsive, and high-performing mobile experiences.",
      },
      {
        title: "Cross-Platform App Development",
        body: "We build cross-platform apps using frameworks like React Native and Flutter — delivering fast, responsive, and high-performing mobile experiences on iOS and Android.",
      },
    ],
    image: "/thumbnail-13.jpg",
  },
  {
    heading: "UI/UX Design",
    description:
      "We craft intuitive, scalable mobile and web experiences tailored to your audience, ensuring flawless performance across all devices.",
    accordion: [
      {
        title: "Wireframing & Prototyping",
        body: "We transform rough ideas into interactive prototypes that capture the full user journey. Our wireframes serve as the blueprint for every pixel, ensuring clarity before development begins.",
      },
      {
        title: "User Interface (UI) Design",
        body: "Every button, card, and layout is crafted with intent. We design interfaces that are visually stunning, accessible, and optimized for conversion across every screen size.",
      },
      {
        title: "User Experience (UX) Research",
        body: "We dive deep into user behavior, pain points, and goals through interviews, usability testing, and data analysis — so every design decision is grounded in real insight.",
      },
      {
        title: "Web & Mobile App Design",
        body: "From responsive web apps to native mobile experiences, we design cohesive product ecosystems that feel natural on every device and platform.",
      },
    ],
    image: "/thumbnail-14.jpg",
  },
  {
    heading: "Graphics Designs",
    description:
      "We create stunning graphics that capture your brand's essence and resonate with your target audience.",
    accordion: [
      {
        title: "Logo & Visual Identity",
        body: "Your logo is the face of your brand. We design distinctive marks and comprehensive visual systems that make you instantly recognizable across every touchpoint.",
      },
      {
        title: "Brand Strategy & Positioning",
        body: "We define your unique value proposition, target audience, and market position — creating a strategic foundation that guides every brand decision and campaign.",
      },
      {
        title: "Posters & Flyers",
        body: "We create detailed graphics for posters and flyers that capture your brand's essence and resonate with your target audience. Whether it's a vibrant poster for a local event or a professional flyer for a business meeting, our graphics are designed to make a lasting impression.",
      },
      {
        title: "Business Cards",
        body: "We design detailed graphics for business cards and letterheads that capture your brand's essence and resonate with your target audience. Whether it's a professional business card for a meeting or a high-quality letterhead for a letter, our graphics are designed to make a lasting impression.",
      },
      {
        title: "Social Media Posts",
        body: "We create detailed graphics for social media posts that capture your brand's essence and resonate with your target audience. Whether it's a vibrant poster for a local event or a professional flyer for a business meeting, our graphics are designed to make a lasting impression.",
      },
    ],
    image: "/24114.png",
  },
  
];

const featuredWork = [
  {
    title: "QuizzApp Platform",
    tags: ["TypeScript", "React", "Full-Stack"],
    image: "/quizz-app.png",
    link: "https://quizz-app-eight-dun.vercel.app/",
  },
  {
    title: "Bakery Website",
    tags: ["Next.js", "TypeScript", "E-commerce"],
    image: "/bakery.png",
    link: "https://bakery-site-nine.vercel.app/",
  },
  {
    title: "Birthday wishes",
    tags: ["react", "tailwindcss", "supabase", "cloudinary"],
    image: "/birthday.png",
    link: "https://matembotech.github.io/Birthday-wishes/",
  },
];

/* ─────────────────────────────────────────────
   ACCORDION ITEM COMPONENT
   ───────────────────────────────────────────── */

function AccordionItem({
  title,
  body,
  isOpen,
  onToggle,
}: {
  title: string;
  body: string;
  isOpen: boolean;
  onToggle: () => void;
}) {
  return (
    <div
      className="border-b"
      style={{ borderColor: "rgba(255,255,255,0.06)" }}
    >
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between py-4 text-left cursor-pointer group"
      >
        <span
          className="text-sm font-medium transition-colors duration-200"
          style={{ color: isOpen ? "#FFFFFF" : "#b9b9b9" }}
        >
          {title}
        </span>
        <motion.span
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.25, ease: "easeInOut" }}
          style={{ color: isOpen ? "#0F9BD0" : "rgba(185,185,185,0.3)" }}
        >
          <ChevronDown size={16} />
        </motion.span>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <p
              className="pb-4 text-sm leading-relaxed"
              style={{ color: "rgba(185,185,185,0.6)" }}
            >
              {body}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ─────────────────────────────────────────────
   PAGE
   ───────────────────────────────────────────── */

export default function ServicesPage() {
  // Independent accordion state per block
  const [openIndices, setOpenIndices] = useState<number[]>([0, 0, 0]);

  const toggleAccordion = (blockIdx: number, itemIdx: number) => {
    setOpenIndices((prev) => {
      const next = [...prev];
      next[blockIdx] = next[blockIdx] === itemIdx ? -1 : itemIdx;
      return next;
    });
  };

  return (
    <div className="relative bg-[#242424] min-h-screen overflow-x-hidden">
      <NavBar />
      <hr className="w-full border-[#0F9BD0] border-t-1 rounded-full" />

      {/* ═══════════════════════════════════════════
          HERO
          ═══════════════════════════════════════════ */}
      <section className="relative pt-24 pb-16 sm:pt-32 sm:pb-24 px-4 sm:px-6 md:px-10">
        <div className="max-w-3xl mx-auto text-center">
          <motion.h6
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-[0.85rem] font-semibold text-[#0F9BD0] tracking-[0.2em] uppercase mb-4"
          >
            Our Services
          </motion.h6>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-[2.5rem] sm:text-[3.75rem] font-extrabold text-[#FFFFFF] tracking-tighter leading-tight mb-6"
          >
            Our Services
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-[#b9b9b9] text-base sm:text-lg leading-relaxed mx-auto"
          >
            We craft world-class digital experiences that elevate your brand and
            drive results. From strategy to execution, we bring your vision to
            life with creativity and precision.
          </motion.p>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          SERVICE BLOCKS
          ═══════════════════════════════════════════ */}

      {serviceBlocks.map((block, blockIdx) => {
        const isReversed = blockIdx === 1; // Block 2: image left, text right

        return (
          <section
            key={blockIdx}
            className="relative py-16 sm:py-24 px-4 sm:px-6 md:px-10"
            style={{
              backgroundColor:
                blockIdx % 2 === 1 ? "#181818" : "transparent",
            }}
          >
            <div className="max-w-7xl mx-auto">
              <div
                className={`flex flex-col ${
                  isReversed ? "lg:flex-row-reverse" : "lg:flex-row"
                } gap-10 lg:gap-16 items-center`}
              >
                {/* ── TEXT SIDE ── */}
                <div className="flex-1 w-full lg:w-1/2">
                  <h2 className="text-[1.75rem] sm:text-[2.25rem] font-extrabold text-[#FFFFFF] tracking-tight mb-4">
                    {block.heading}
                  </h2>

                  <div className="w-10 h-[3px] bg-[#0F9BD0] rounded-full mb-5" />

                  <p className="text-[#b9b9b9] text-sm leading-relaxed mb-8">
                    {block.description}
                  </p>

                  {/* Accordion */}
                  <div className="rounded-xl border overflow-hidden" style={{ borderColor: "rgba(255,255,255,0.06)", backgroundColor: "rgba(255,255,255,0.02)" }}>
                    <div className="px-5">
                      {block.accordion.map((item, itemIdx) => (
                        <AccordionItem
                          key={itemIdx}
                          title={item.title}
                          body={item.body}
                          isOpen={openIndices[blockIdx] === itemIdx}
                          onToggle={() =>
                            toggleAccordion(blockIdx, itemIdx)
                          }
                        />
                      ))}
                    </div>
                  </div>
                </div>

                {/* ── IMAGE SIDE ── */}
                <div className="flex-1 w-full lg:w-1/2">
                  <div
                    className="rounded-2xl border overflow-hidden"
                    style={{
                      borderColor: "rgba(255,255,255,0.08)",
                    }}
                  >
                    <div className="relative w-full aspect-[4/3]">
                      <Image
                        src={block.image}
                        alt={block.heading}
                        fill
                        sizes="(max-width: 768px) 100vw, 50vw"
                        className="object-cover hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        );
      })}

      {/* ═══════════════════════════════════════════
          CTA BANNER
          ═══════════════════════════════════════════ */}
      <section className="relative py-16 sm:py-20 px-4 sm:px-6 md:px-10">
        <div className="max-w-5xl mx-auto">
          <div
            className="relative rounded-2xl overflow-hidden p-8 sm:p-12 flex flex-col lg:flex-row items-center justify-between gap-8"
            style={{
              backgroundColor: "#181818",
              border: "1px solid rgba(15,155,208,0.15)",
            }}
          >
            {/* Glow effect on left edge */}
            <div
              className="absolute left-0 top-0 bottom-0 w-1"
              style={{
                background:
                  "linear-gradient(to bottom, #0F9BD0, transparent)",
                boxShadow: "0 0 20px rgba(15,155,208,0.4)",
              }}
            />

            <div className="flex-1">
              <h2 className="text-[1.75rem] sm:text-[2.5rem] font-extrabold text-[#FFFFFF] tracking-tight leading-tight">
                Let&apos;s Create Something
                <br />
                Amazing Together!
              </h2>
            </div>

            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              className=""
            >
              <BookCallButton className="mr-2 cursor-pointer shrink-0 bg-[#0F9BD0] hover:bg-[#0c7ea9] text-white font-bold py-3.5 px-8 rounded-full flex items-center gap-2.5 transition-colors duration-300 shadow-[0_0_20px_rgba(15,155,208,0.25)] cursor-pointer" />
            </motion.button>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          FEATURED WORK
          ═══════════════════════════════════════════ */}
      <section className="relative py-16 sm:py-24 px-4 sm:px-6 md:px-10" style={{ backgroundColor: "#181818" }}>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <motion.h6
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-[0.85rem] font-semibold text-[#0F9BD0] tracking-[0.2em] uppercase mb-4"
            >
              Our Featured Work
            </motion.h6>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-[2rem] sm:text-[2.75rem] font-extrabold text-[#FFFFFF] tracking-tight mb-4"
            >
              Our Featured Work
            </motion.h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {featuredWork.map((work, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group rounded-2xl overflow-hidden border cursor-pointer"
                style={{
                  borderColor: "rgba(255,255,255,0.06)",
                  backgroundColor: "rgba(255,255,255,0.03)",
                }}
                whileHover={{
                  borderColor: "rgba(15,155,208,0.4)",
                  transition: { duration: 0.3 },
                }}
              >
                {/* Image */}
                <div className="relative h-48 sm:h-56 overflow-hidden">
                  <Image
                    src={work.image}
                    alt={work.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>

                <div className="p-5 flex flex-col gap-3">
                  {/* Tags */}
                  <div className="flex flex-wrap gap-2">
                    {work.tags.map((tag, j) => (
                      <span
                        key={j}
                        className="text-[0.65rem] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full"
                        style={{
                          color: "#0F9BD0",
                          backgroundColor: "rgba(15,155,208,0.1)",
                        }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Visit link */}
                  <a
                    href={work.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-medium transition-colors w-fit"
                    style={{ color: "rgba(185,185,185,0.5)" }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.color = "#0F9BD0")
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.color = "rgba(185,185,185,0.5)")
                    }
                  >
                    Visit Website
                    <ExternalLink size={12} />
                  </a>

                  {/* Title */}
                  <h3 className="text-lg font-bold text-[#FFFFFF] group-hover:text-[#0F9BD0] transition-colors duration-300 mt-1">
                    {work.title}
                  </h3>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          FOOTER
          ═══════════════════════════════════════════ */}
      <Footer />
    </div>
  );
}
