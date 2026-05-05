"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Facebook,
  Instagram,
  Linkedin,
  Github,
  ArrowRight,
  ChevronDown,
} from "lucide-react";

export default function Footer() {
  const [projectsOpen, setProjectsOpen] = useState(false);

  return (
    <footer className="bg-[#101828] text-white pt-12 sm:pt-16 pb-8 px-4 sm:px-8 md:px-16 border-t border-white/10 text-sm">
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 sm:gap-10 lg:gap-8">
        {/* Brand Section */}
        <div className="sm:col-span-2 lg:col-span-1">
          <div className="flex items-center gap-2 mb-6">
            <div className="w-10 h-10 rounded-lg flex items-center justify-center font-bold text-xl">
              <Image
                src="/matembo logo.jpg"
                alt="Logo"
                width={30}
                height={30}
                className="rounded-full"
              />
            </div>
            <span className="text-[18px] font-bold tracking-tight text-[#D1D5DC]">
              Matembo Tech
            </span>
          </div>
          <p className="text-[#b9b9b9] mb-10">
            Building intelligent automation systems that streamline operations
            and drive business growth.
          </p>
          <div className="flex gap-4 mt-4">
            <Link
              href="https://www.facebook.com/MatemboTech" target="_blank"
              className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-[#0F9BD0] transition-colors duration-300"
            >
              <Facebook size={18} />
            </Link>
            <Link
              href="https://www.instagram.com/matembo_dev/" target="_blank"
              className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-[#0F9BD0] transition-colors duration-300"
            >
              <Instagram size={18} />
            </Link>
            <Link
              href="https://www.linkedin.com/in/ibrahim-abdulrahman-maulid-458211368/" target="_blank"
              className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-[#0F9BD0] transition-colors duration-300"
            >
              <Linkedin size={18} />
            </Link>
            <Link
              href="https://github.com/Matembotech" target="_blank"
              className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-[#0F9BD0] transition-colors duration-300"
            >
              <Github size={18} />
            </Link>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="text-lg font-bold text-[#D1D5DC]">
            Quick Links
          </h4>
          <div className="w-8 h-[3px] bg-[#0F9BD0] rounded-full mb-7 mt-3" />
          <ul className="flex flex-col gap-5 text-[#b9b9b9]">
            <li>
              <Link href="/" className="hover:text-white transition-colors">
                Home
              </Link>
            </li>
            <li>
              <Link
                href="/about"
                className="hover:text-white transition-colors"
              >
                About
              </Link>
            </li>
              <li>
                <Link href="/services" className="hover:text-white transition-colors">
                  Services
                </Link>
              </li>
            <li>
              <div>
                <button
                  onClick={() => setProjectsOpen(!projectsOpen)}
                  className="flex items-center gap-1.5 hover:text-white transition-colors cursor-pointer w-full text-left"
                >
                  Projects
                  <ChevronDown
                    size={14}
                    className={`transition-transform duration-200 ${projectsOpen ? "rotate-180" : ""}`}
                  />
                </button>
                {projectsOpen && (
                  <ul className="mt-3 ml-2 flex flex-col gap-3 border-l border-white/[0.08] pl-3">
                    <li>
                      <Link
                        href="/portfolio/website-design"
                        className="text-[#b9b9b9]/80 hover:text-white transition-colors text-sm"
                      >
                        Web Designs
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/portfolio/app-design"
                        className="text-[#b9b9b9]/80 hover:text-white transition-colors text-sm"
                      >
                        App Designs
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/portfolio/graphics-design"
                        className="text-[#b9b9b9]/80 hover:text-white transition-colors text-sm"
                      >
                        Graphics Designs
                      </Link>
                    </li>
                  </ul>
                )}
              </div>
            </li>
            <li>
              <Link
                href="/contact"
                className="hover:text-white transition-colors"
              >
                Contact
              </Link>
            </li>
          </ul>
        </div>

        {/* Resources */}
        <div>
          <h4 className="text-lg font-bold text-[#D1D5DC]">
            Resources
          </h4>
          <div className="w-8 h-[3px] bg-[#0F9BD0] rounded-full mb-7 mt-3" />
          <ul className="flex flex-col gap-5 text-[#b9b9b9]">
            <li>
              <Link href="#" className="hover:text-white transition-colors">
                Workflows
              </Link>
            </li>
            <li>
              <Link href="#" className="hover:text-white transition-colors">
                AI Tools
              </Link>
            </li>
            <li>
              <Link
                href="/#faq"
                className="hover:text-white transition-colors"
              >
                FAQ
              </Link>
            </li>
          </ul>
        </div>

        {/* Legal */}
        <div>
          <div>
            <h4 className="text-lg font-bold text-[#D1D5DC]">
              Legal
            </h4>
            <div className="w-8 h-[3px] bg-[#0F9BD0] rounded-full mb-7 mt-3" />
            <ul className="flex flex-col gap-5 text-[#b9b9b9]">
              <li>
                <Link
                  href="/privacy-policy"
                  className="hover:text-white transition-colors"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  href="/terms-and-conditions"
                  className="hover:text-white transition-colors"
                >
                  Terms & Conditions
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Newsletter Section */}
        <div>
          <h4 className="text-lg font-bold text-[#D1D5DC]">
            Newsletter
          </h4>
          <div className="w-8 h-[3px] bg-[#0F9BD0] rounded-full mb-7 mt-3" />
          <p className="text-[#b9b9b9] mb-6">
            Get updates on AI automation tips.
          </p>
          <div className="relative mb-4">
            <input
              type="email"
              placeholder="Your email"
              className="w-full bg-white/5 border border-white/10 rounded-lg py-3 px-4 focus:outline-none focus:border-[#0F9BD0] transition-colors text-[#D1D5DC]"
            />
          </div>
          <button className="w-full bg-[#0F9BD0] hover:opacity-90 text-white font-bold py-3 rounded-lg flex items-center justify-center gap-2 transition-colors mb-4 cursor-pointer">
            Subscribe <ArrowRight size={16} />
          </button>
          <div className="flex items-start gap-2">
            <input
              type="checkbox"
              id="terms"
              className="mt-1 accent-[#0F9BD0]"
            />
            <label htmlFor="terms" className="text-xs text-[#b9b9b9]">
              I agree to the{" "}
              <Link href="#" className="text-[#0F9BD0] hover:underline">
                Terms
              </Link>
            </label>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="max-w-7xl mx-auto mt-20 sm:mt-28 pt-8 sm:pt-10 border-t border-white/[0.06] flex flex-col sm:flex-row justify-between items-center gap-4 text-[#b9b9b9] text-xs">
        <p>© {new Date().getFullYear()} Matembo Tech. All rights reserved.</p>
        <div className="flex gap-6">
          <Link
            href="/privacy-policy"
            className="hover:text-white transition-colors"
          >
            Privacy
          </Link>
          <Link
            href="/terms-and-conditions"
            className="hover:text-white transition-colors"
          >
            Terms
          </Link>
        </div>
      </div>
    </footer>
  );
}
