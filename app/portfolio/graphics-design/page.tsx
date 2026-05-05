"use client";

import { useState, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Palette, X, ChevronLeft, ChevronRight } from "lucide-react";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";

/* ─────────────────────────────────────────────
   DATA
   ───────────────────────────────────────────── */

const BASE = "/graphics design";

type Category = {
  id: string;
  label: string;
  images: { src: string; alt: string }[];
};

const categories: Category[] = [
  {
    id: "logo",
    label: "Logo",
    images: [
      { src: `${BASE}/matembo logo.jpg`, alt: "Matembo Logo" },
      { src: `${BASE}/1000144311.jpg`, alt: "Logo Design 396" },
      { src: `${BASE}/1000140696.jpg`, alt: "Logo Design 22096" },
      { src: `${BASE}/24114-2.png`, alt: "Logo Design 22141" },
    ],
  },
  {
    id: "flyers",
    label: "Flyers & Posters",
    images: [
      { src: `${BASE}/file_0000000026cc71fdb2d82868fcdb096c.png`, alt: "Poster Design 2" },
      { src: `${BASE}/20260426_210455.jpg`, alt: "Flyer Design 3" },
      { src: `${BASE}/22574.jpg`, alt: "Poster Design 3" },
      { src: `${BASE}/22141_with_bgc.png`, alt: "Flyer Design 4" },
      { src: `${BASE}/22071 (1).png`, alt: "Flyer Design 4" },
    ],
  },
  {
    id: "photo",
    label: "Photo Design",
    images: [
      { src: `${BASE}/092a33dd11806f5a5a47ead307a52754.jpg`, alt: "Photo Design 1" },
      { src: `${BASE}/396.png`, alt: "Photo Design 2" },
      { src: `${BASE}/Gemini_Generated_Image_o0dh58o0dh58o0dh.png`, alt: "AI Generated Art 1" },
      { src: `${BASE}/Gemini_Generated_Image_o6w84qo6w84qo6w8.png`, alt: "AI Generated Art 2" },
      { src: `${BASE}/22836.jpg`, alt: "Photo Design 2" },
      { src: `${BASE}/22096.png`, alt: "Photo Design 2" },
      { src: `${BASE}/1000144003.jpg`, alt: "Photo Design 2" }
    ],
  },
];

/* ─────────────────────────────────────────────
   PAGE
   ───────────────────────────────────────────── */

export default function GraphicsDesignsPage() {
  const [activeTab, setActiveTab] = useState("logo");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const activeCategory = categories.find((c) => c.id === activeTab)!;

  const openLightbox = (index: number) => setLightboxIndex(index);
  const closeLightbox = () => setLightboxIndex(null);

  const goToPrev = useCallback(() => {
    setLightboxIndex((prev) => {
      if (prev === null) return null;
      return prev === 0 ? activeCategory.images.length - 1 : prev - 1;
    });
  }, [activeCategory.images.length]);

  const goToNext = useCallback(() => {
    setLightboxIndex((prev) => {
      if (prev === null) return null;
      return prev === activeCategory.images.length - 1 ? 0 : prev + 1;
    });
  }, [activeCategory.images.length]);

  // Keyboard navigation
  useEffect(() => {
    if (lightboxIndex === null) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowLeft") goToPrev();
      if (e.key === "ArrowRight") goToNext();
    };
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [lightboxIndex, goToPrev, goToNext]);

  // Lock scroll when lightbox open
  useEffect(() => {
    if (lightboxIndex !== null) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [lightboxIndex]);

  const currentLightboxImage =
    lightboxIndex !== null ? activeCategory.images[lightboxIndex] : null;

  return (
    <div className="relative bg-[#242424] min-h-screen overflow-x-hidden">
      <NavBar />
      <hr className="w-full border-[#0F9BD0] border-t-1 rounded-full" />

      {/* Hero */}
      <section className="relative pt-20 sm:pt-28 pb-10 sm:pb-14 px-4 sm:px-6 md:px-10">
        <div className="max-w-7xl mx-auto text-center">
          <motion.h6
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-[0.85rem] font-semibold text-[#0F9BD0] tracking-[0.2em] uppercase mb-4"
          >
            Graphics Design Portfolio
          </motion.h6>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-[2.5rem] sm:text-[3.5rem] font-extrabold text-[#FFFFFF] tracking-tighter leading-tight mb-6"
          >
            Graphics Designs
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-[#b9b9b9] text-base sm:text-lg leading-relaxed mx-auto"
          >
            Explore our collection of logo designs, posters, flyers, and photo
            creations — each crafted to capture your brand&apos;s unique identity.
          </motion.p>
        </div>
      </section>

      {/* Category Tabs */}
      <section className="relative pb-6 px-4 sm:px-6 md:px-10">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-wrap justify-center gap-3"
          >
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveTab(cat.id)}
                className={`px-6 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 cursor-pointer border flex items-center gap-2 ${
                  activeTab === cat.id
                    ? "bg-[#0F9BD0] text-white border-[#0F9BD0] shadow-[0_0_12px_rgba(15,155,208,0.3)]"
                    : "bg-transparent text-[#b9b9b9] border-white/[0.15] hover:border-[#0F9BD0] hover:text-white"
                }`}
              >
                <Palette size={14} />
                {cat.label}
              </button>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Image Grid */}
      <section className="relative py-10 sm:py-16 px-4 sm:px-6 md:px-10">
        <div className="max-w-7xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
            >
              {activeCategory.images.map((img, i) => (
                <motion.div
                  key={img.src}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.06 }}
                  className="group rounded-2xl overflow-hidden border cursor-pointer"
                  style={{
                    borderColor: "rgba(255,255,255,0.06)",
                    backgroundColor: "rgba(255,255,255,0.02)",
                  }}
                  whileHover={{
                    borderColor: "rgba(15,155,208,0.4)",
                    transition: { duration: 0.3 },
                  }}
                  onClick={() => openLightbox(i)}
                >
                  <div className="relative w-full aspect-[4/3] overflow-hidden">
                    <Image
                      src={img.src}
                      alt={img.alt}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    {/* Overlay on hover */}
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-300 flex items-center justify-center">
                      <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-[#0F9BD0] text-white text-xs font-semibold px-4 py-2 rounded-full flex items-center gap-1.5">
                        View
                        <ArrowRight size={12} />
                      </span>
                    </div>
                  </div>

                  <div className="p-4">
                    <p className="text-sm font-medium text-[#FFFFFF] group-hover:text-[#0F9BD0] transition-colors duration-300 truncate">
                      {img.alt}
                    </p>
                    <p className="text-xs mt-1" style={{ color: "rgba(185,185,185,0.45)" }}>
                      {activeCategory.label}
                    </p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>

          {/* Count */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-center text-xs mt-8"
            style={{ color: "rgba(185,185,185,0.35)" }}
          >
            Showing {activeCategory.images.length}{" "}
            {activeCategory.images.length === 1 ? "item" : "items"} in{" "}
            {activeCategory.label}
          </motion.p>
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
            <div className="w-14 h-14 rounded-full bg-[#0F9BD0]/10 border border-[#0F9BD0]/20 flex items-center justify-center mx-auto mb-5">
              <Palette size={24} className="text-[#0F9BD0]" />
            </div>
            <h2 className="text-[1.75rem] sm:text-[2.25rem] font-extrabold text-[#FFFFFF] tracking-tight mb-4">
              Need Custom Graphics?
            </h2>
            <p className="text-[#b9b9b9] text-sm leading-relaxed mb-8 mx-auto">
              Whether it&apos;s a logo, poster, flyer, or social media graphics
              — we create designs that make your brand stand out.
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

      {/* ═══════════════════════════════════════════
          LIGHTBOX
          ═══════════════════════════════════════════ */}
      <AnimatePresence>
        {lightboxIndex !== null && currentLightboxImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[200] flex items-center justify-center"
            onClick={closeLightbox}
          >
            {/* Backdrop */}
            <div className="absolute inset-0 bg-black/90 backdrop-blur-md" />

            {/* Close button */}
            <button
              onClick={closeLightbox}
              className="absolute top-4 right-4 sm:top-6 sm:right-6 z-10 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 border border-white/[0.12] flex items-center justify-center text-white transition-colors cursor-pointer"
            >
              <X size={20} />
            </button>

            {/* Prev button */}
            {activeCategory.images.length > 1 && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  goToPrev();
                }}
                className="absolute left-2 sm:left-4 z-10 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/10 hover:bg-white/20 border border-white/[0.12] flex items-center justify-center text-white transition-colors cursor-pointer"
              >
                <ChevronLeft size={22} />
              </button>
            )}

            {/* Next button */}
            {activeCategory.images.length > 1 && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  goToNext();
                }}
                className="absolute right-2 sm:right-4 z-10 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/10 hover:bg-white/20 border border-white/[0.12] flex items-center justify-center text-white transition-colors cursor-pointer"
              >
                <ChevronRight size={22} />
              </button>
            )}

            {/* Image container */}
            <motion.div
              key={currentLightboxImage.src}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="relative z-10 max-w-[92vw] max-h-[88vh] flex flex-col items-center"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative w-[85vw] h-[70vh] sm:w-[70vw] sm:h-[75vh] max-w-5xl rounded-xl overflow-hidden shadow-2xl">
                <Image
                  src={currentLightboxImage.src}
                  alt={currentLightboxImage.alt}
                  fill
                  sizes="90vw"
                  className="object-contain"
                  priority
                />
              </div>

              {/* Caption */}
              <div className="mt-4 text-center">
                <p className="text-white text-sm sm:text-base font-semibold">
                  {currentLightboxImage.alt}
                </p>
                <p className="text-xs mt-0.5" style={{ color: "rgba(185,185,185,0.5)" }}>
                  {activeCategory.label} &middot;{" "}
                  {lightboxIndex + 1} / {activeCategory.images.length}
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
