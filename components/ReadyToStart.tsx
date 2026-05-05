"use client";
import React from "react";
import { ArrowRight, Sparkles } from "lucide-react";
import Link from "next/link";
import BookCallButton from "./BookCallButton";

const ReadyToStart = () => {
  return (
    <section className="ready-to-start-section px-4 sm:px-6 py-12 sm:py-16 lg:py-20 max-w-7xl mx-auto">
      <div className="relative overflow-hidden rounded-2xl sm:rounded-3xl bg-[#101828] border border-[#1A3A35] p-6 sm:p-10 md:p-16 text-center shadow-2xl">
        {/* Grid Overlay */}
        <div
          className="absolute inset-0 opacity-[0.07]"
          style={{
            backgroundImage: `linear-gradient(#4ADE80 1px, transparent 1px), linear-gradient(90deg, #4ADE80 1px, transparent 1px)`,
            backgroundSize: "45px 45px",
          }}
        />

        {/* Ambient Glows */}
        <div className="absolute top-0 left-0 w-[400px] h-[400px] bg-[#4ADE80] blur-[120px] opacity-[0.03] pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-[#0F9BD0] blur-[120px] opacity-[0.03] pointer-events-none" />

        <div className="relative z-10 flex flex-col items-center">
          {/* Badge */}
          <div className="flex items-center gap-2 px-3 sm:px-4 py-1.5 rounded-full border border-[#1A3A35] bg-white text-xs sm:text-sm font-medium text-black mb-6 sm:mb-8 ready-reveal-item backdrop-blur-sm">
            <Sparkles className="w-4 h-4 text-[#4ADE80]" />
            <span>Ready to transform your business?</span>
          </div>

          {/* Heading */}
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-6xl font-extrabold text-white mb-4 sm:mb-6 tracking-tight ready-reveal-item">
            Ready to Start{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400">
              Your Projects
            </span>
          </h2>

          {/* Description */}
          <p className="max-w-2xl text-sm sm:text-base md:text-[1.1rem] text-gray-400 mb-8 sm:mb-10 leading-relaxed ready-reveal-item">
            Elevate your operations with intelligent systems. We&apos;ll guide
            you through the process and build automation that supports your
            long-term growth.
          </p>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-12 sm:mb-20 mt-3 sm:mt-5 ready-reveal-item w-full sm:w-auto">
            <Link href="/contact" className="flex items-center justify-center gap-2 px-6 sm:px-8 py-3 sm:py-4 bg-white text-black font-extrabold rounded-full hover:bg-[#f0f0f0] transition-all duration-300 hover:scale-105 active:scale-95 group shadow-lg text-sm sm:text-base w-full sm:w-auto">
              Start a project
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <BookCallButton className="px-6 sm:px-8 py-3 sm:py-4 bg-[#0F9BD0] border border-[#1A3A35] text-white font-extrabold rounded-full hover:bg-[#1A3A35] transition-all duration-300 hover:scale-105 active:scale-95 shadow-lg text-sm sm:text-base w-full sm:w-auto" />
          </div>

          {/* Stats Row */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 sm:gap-12 border-t border-[#1A3A35] pt-8 sm:pt-12 w-full max-w-4xl ready-reveal-item">
            <div className="flex flex-col items-center">
              <p className="text-2xl sm:text-3xl md:text-4xl font-black text-white mb-2">
                <span className="counter" data-target="30">
                  0
                </span>
                min
              </p>
              <p className="text-[0.8rem] text-gray-500 font-bold uppercase tracking-[0.2em] text-center">
                Free Consultation
              </p>
            </div>
            <div className="flex flex-col items-center border-y sm:border-y-0 sm:border-x border-[#1A3A35] py-8 sm:py-0">
              <p className="text-2xl sm:text-3xl md:text-4xl font-black text-white mb-2">
                <span className="counter" data-target="20">
                  0
                </span>
                +
              </p>
              <p className="text-[0.8rem] text-gray-500 font-bold uppercase tracking-[0.2em] text-center">
                projects done
              </p>
            </div>
            <div className="flex flex-col items-center">
              <p className="text-2xl sm:text-3xl md:text-4xl font-black text-white mb-2">
                <span className="counter" data-target="24">
                  0
                </span>
                h
              </p>
              <p className="text-[0.8rem] text-gray-500 font-bold uppercase tracking-[0.2em] text-center">
                Response Time
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ReadyToStart;
