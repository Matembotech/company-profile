"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Smartphone } from "lucide-react";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";

export default function AppDesignsPage() {
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
            App Design Portfolio
          </motion.h6>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-[2.5rem] sm:text-[3.5rem] font-extrabold text-[#FFFFFF] tracking-tighter leading-tight mb-6"
          >
            App Designs
          </motion.h1>
        </div>
      </section>

      {/* Empty State */}
      <section className="relative py-16 sm:py-24 px-4 sm:px-6 md:px-10">
        <div className="max-w-lg mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="rounded-2xl border p-10 sm:p-14"
            style={{
              backgroundColor: "rgba(255,255,255,0.02)",
              borderColor: "rgba(255,255,255,0.06)",
            }}
          >
            <div className="w-16 h-16 rounded-full bg-[#0F9BD0]/10 border border-[#0F9BD0]/20 flex items-center justify-center mx-auto mb-6">
              <Smartphone size={28} className="text-[#0F9BD0]" />
            </div>

            <h2 className="text-[1.5rem] sm:text-[1.75rem] font-extrabold text-[#FFFFFF] tracking-tight mb-3">
              No Projects Yet
            </h2>

            <p className="text-[#b9b9b9] text-sm leading-relaxed mb-8">
              We don&apos;t have any app design projects to showcase right now.
              But we&apos;re actively working on exciting mobile experiences —
              check back soon or reach out to start a project together!
            </p>

            <Link
              href="/contact"
              className="inline-flex items-center gap-2 bg-[#0F9BD0] hover:bg-[#0c7ea9] text-white font-bold py-3 px-7 rounded-full transition-colors duration-300 shadow-[0_0_20px_rgba(15,155,208,0.25)] cursor-pointer"
            >
              Start a Project
              <ArrowRight size={16} />
            </Link>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
