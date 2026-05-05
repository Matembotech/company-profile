"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ExternalLink } from "lucide-react";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";

/* ─────────────────────────────────────────────
   DATA
   ───────────────────────────────────────────── */

const webProjects = [
  {
    title: "QuizzApp Platform",
    description:
      "An interactive quiz platform built with TypeScript and React, featuring real-time scoring, leaderboards, and a sleek responsive interface.",
    tags: ["TypeScript", "React", "Full-Stack"],
    image: "/quizz-app.png",
    link: "https://quizz-app-eight-dun.vercel.app/",
  },
  {
    title: "Bakery website",
    description:
      "A complete e-commerce website for a bakery business, built with Next.js and TypeScript. Features product catalog, shopping cart, and secure checkout.",
    tags: ["Next.js", "TypeScript"],
    image: "/bakery.png",
    link: "https://bakery-site-nine.vercel.app/",
  },
  {
    title: "Laki Construction",
    description:
      "A responsive construction company website with project galleries, service descriptions, and a contact inquiry form.",
    tags: ["HTML", "CSS", "JavaScript"],
    image: "/Laki.png",
    link: "https://matembotech.github.io/Laki-construction-site/",
  },
  {
    title: "Birthday Wishes",
    description:
      "A fun interactive birthday wishes app built with React and Tailwind CSS, featuring animated cards and message sharing.",
    tags: ["React", "TailwindCSS", "Supabase"],
    image: "/birthday.png",
    link: "https://birthday-wishes-seven-rho.vercel.app",
  },
];

/* ─────────────────────────────────────────────
   PAGE
   ───────────────────────────────────────────── */

export default function WebDesignsPage() {
  return (
    <div className="relative bg-[#242424] min-h-screen overflow-x-hidden">
      <NavBar />
      <hr className="w-full border-[#0F9BD0] border-t-1 rounded-full" />

      {/* Hero */}
      <section className="relative pt-20 sm:pt-28 pb-12 sm:pb-16 px-4 sm:px-6 md:px-10">
        <div className="max-w-7xl mx-auto text-center">
          <motion.h6
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-[0.85rem] font-semibold text-[#0F9BD0] tracking-[0.2em] uppercase mb-4"
          >
            Web Design Portfolio
          </motion.h6>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-[2.5rem] sm:text-[3.5rem] font-extrabold text-[#FFFFFF] tracking-tighter leading-tight mb-6"
          >
            Web Designs
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-[#b9b9b9] text-base sm:text-lg leading-relaxed text-center"
          >
            From concept to deployment, we build high-performance websites that
            are fast, responsive, and crafted to convert visitors into customers.
          </motion.p>
        </div>
      </section>

      {/* Project Grid */}
      <section className="relative py-12 sm:py-20 px-4 sm:px-6 md:px-10">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {webProjects.map((project, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="group rounded-2xl overflow-hidden border flex flex-col"
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
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="relative h-48 sm:h-56 overflow-hidden block"
                >
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </a>

                <div className="p-5 flex flex-col gap-3 flex-1">
                  {/* Tags */}
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag, j) => (
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

                  {/* Title */}
                  <h3 className="text-lg font-bold text-[#FFFFFF] group-hover:text-[#0F9BD0] transition-colors duration-300">
                    {project.title}
                  </h3>

                  {/* Description */}
                  <p className="text-sm leading-relaxed flex-1" style={{ color: "rgba(185,185,185,0.7)" }}>
                    {project.description}
                  </p>

                  {/* Visit Link */}
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-medium transition-colors w-fit mt-auto"
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
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative py-16 sm:py-20 px-4 sm:px-6 md:px-10">
        <div className="max-w-3xl mx-auto text-center">
          <div
            className="rounded-2xl overflow-hidden p-8 sm:p-12"
            style={{
              backgroundColor: "#181818",
              border: "1px solid rgba(15,155,208,0.15)",
            }}
          >
            <h2 className="text-[1.75rem] sm:text-[2.25rem] font-extrabold text-[#FFFFFF] tracking-tight mb-4">
              Have a Web Project in Mind?
            </h2>
            <p className="text-[#b9b9b9] text-sm leading-relaxed mb-8">
              Let&apos;s discuss your ideas and build something amazing
              together. We&apos;ll help you every step of the way.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 bg-[#0F9BD0] hover:bg-[#0c7ea9] text-white font-bold py-3 px-8 rounded-full transition-colors duration-300 shadow-[0_0_20px_rgba(15,155,208,0.25)] cursor-pointer"
            >
              Start a Project
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
