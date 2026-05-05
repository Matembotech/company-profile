"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

const services = [
  {
    title: "App Design",
    description:
      "We craft intuitive, scalable mobile experiences tailored to your audience, ensuring flawless performance across all devices.",
    image: "/thumbnail-13.jpg",
  },
  {
    title: "Website Design",
    description:
      "Build high-performance, responsive web applications that captivate users and accelerate your business growth.",
    image: "/thumbail-15.jpg",
  },
  {
    title: "UI/UX Solution",
    description:
      "Designing engaging interface workflows and stunning visuals that transform ideas into seamless user journeys.",
    image: "/thumbnail-14.jpg",
  },
];

export default function Services() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" as const },
    },
  };

  return (
    <section className="relative bg-[#181818] px-4 sm:px-6 md:px-10 pt-16 pb-32 sm:pt-24 sm:pb-36 overflow-hidden">
      {/* Header */}
      <div className="flex flex-col items-center justify-center mb-16 relative z-10">
        <motion.h6
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-[0.85rem] font-semibold text-center text-[#0F9BD0] tracking-[0.2em] uppercase mb-4"
        >
          Our Services
        </motion.h6>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-[2.25rem] sm:text-[3.5rem] font-extrabold text-[#FFFFFF] tracking-tighter leading-tight text-center max-w-2xl"
        >
          Transforming Ideas <br className="md:hidden" /> into Reality
        </motion.h2>
      </div>

      {/* Grid */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 max-w-7xl mx-auto"
      >
        {services.map((svc, idx) => (
          <motion.div
            key={idx}
            variants={cardVariants}
            whileHover={{ y: -10, transition: { duration: 0.3 } }}
            className="flex flex-col bg-[#ffffff]/5 backdrop-blur-md border border-white/10 rounded-2xl p-8 hover:border-[#0F9BD0]/50 transition-colors duration-300 shadow-2xl relative overflow-hidden group gap-1.5"
          >
            {/* Glossy overlay effect built into the card */}
            <div className="absolute inset-0 bg-gradient-to-b from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

            {/* Service Image */}
            <div className="w-full h-48 mb-8 rounded-xl overflow-hidden border border-white/5 relative">
              <Image
                src={svc.image}
                alt={svc.title}
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>

            <h3 className="text-2xl font-bold text-white tracking-tight mb-3">
              {svc.title}
            </h3>
            <p className="text-[#b9b9b9] text-sm leading-relaxed mb-8 flex-grow">
              {svc.description}
            </p>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="mt-auto bg-transparent border border-[#0F9BD0]/50 hover:bg-[#0F9BD0] text-white font-bold py-2.5 px-5 rounded-full text-sm inline-flex items-center justify-between transition-all duration-300 w-fit group"
            >
              Let&apos;s Build
              <span className="ml-3 bg-white/10 group-hover:bg-white/20 p-1 rounded-full inline-flex items-center justify-center transition-colors">
                <ArrowRight className="w-4 h-4 text-[#0F9BD0] group-hover:text-white transition-colors" />
              </span>
            </motion.button>
          </motion.div>
        ))}
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="max-w-7xl mx-auto mt-12 flex justify-center relative z-10"
      >
        <Link href="/services" className="border border-[#0F9BD0] py-3 px-8 text-[#0F9BD0] font-bold text-sm rounded-full transition-all duration-500 hover:bg-[#0F9BD0] hover:text-white shadow-[0_0_15px_rgba(15,155,208,0.15)] hover:shadow-[0_0_25px_rgba(15,155,208,0.4)]">
          View All Services{" "}
          <span className="ml-2 text-lg inline-block align-middle pb-0.5">
            →
          </span>
        </Link >
      </motion.div>

      {/* Dynamic Footer Ribbon */}
      <div className="absolute bottom-6 sm:bottom-8 left-0 right-0 w-full overflow-hidden py-4 z-0">
        <div className="bg-[#0F9BD0] transform -rotate-2 scale-110 shadow-2xl border-y border-white/20">
        <motion.div
          animate={{ x: "-50%" }}
          transition={{ repeat: Infinity, ease: "linear", duration: 25 }}
          className="flex whitespace-nowrap w-fit"
        >
          {/* Double set to allow infinite 50% scroll jump without visible seams */}
          {[...Array(2)].map((_, idx) => (
            <div key={idx} className="flex items-center min-w-max">
              <span className="text-black font-black text-lg sm:text-2xl uppercase tracking-[0.15em] mx-6">
                Matembo Tech - Bringing Technology into Life
              </span>
              <span className="text-white select-none text-xl sm:text-2xl">
                ✦
              </span>
              <span className="text-white font-black text-lg sm:text-2xl uppercase tracking-[0.15em] mx-6">Trust Us - To make your digital way Smart</span>
              <span className="text-black select-none text-xl sm:text-2xl">
                ✦
              </span>
              <span className="text-black font-black text-lg sm:text-2xl uppercase tracking-[0.15em] mx-6">
                Matembo Tech - Bringing Technology into Life
              </span>
              <span className="text-white select-none text-xl sm:text-2xl">
                ✦
              </span>
              <span className="text-white font-black text-lg sm:text-2xl uppercase tracking-[0.15em] mx-6">
                Trust Us - To make your digital way Smart
              </span>
              <span className="text-black select-none text-xl sm:text-2xl">
                ✦
              </span>
            </div>
          ))}
        </motion.div>
        </div>
      </div>
    </section>
  );
}
