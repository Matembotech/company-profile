"use client";

import Link from "next/link";
import { useAuth } from "@/app/context/AuthContext";
import { Avatar } from "reshaped";
import { useState, useRef, useEffect } from "react";
import { User, Settings, LogOut, Menu, X } from "lucide-react";
import LogoutModal from "../Auth/LogoutModal";
import NavLink from "../NavLink";
import BookCallButton from "../BookCallButton";

export default function NavBar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [logoutOpen, setLogoutOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const { token, user, signout } = useAuth();

  // Portfolio dropdown state
  const [portfolioOpen, setPortfolioOpen] = useState(false);
  const portfolioRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Close portfolio dropdown on outside click
  useEffect(() => {
    function handlePortfolioClickOutside(event: MouseEvent) {
      if (portfolioRef.current && !portfolioRef.current.contains(event.target as Node)) {
        setPortfolioOpen(false);
      }
    }
    document.addEventListener("mousedown", handlePortfolioClickOutside);
    return () => document.removeEventListener("mousedown", handlePortfolioClickOutside);
  }, []);

  const handleConfirmLogout = () => {
    setLogoutOpen(false);
    signout();
  };

  return (
    <>
      {/* ── Main Navbar ── */}
      <header className="sticky top-0 z-50 w-full">
        {/* Backdrop */}
        <div className="absolute inset-0 bg-[#242424] backdrop-blur-xl" />

        <div className="relative flex items-center justify-between px-5 h-16 max-w-7xl mx-auto">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <span className="text-white font-bold text-base tracking-tight">
              MatemboTech
            </span>
          </Link>

          {/* Nav links */}
          <div className="hidden md:flex items-center gap-4">
            <NavLink href="/">Home</NavLink>
            <NavLink href="/about">About</NavLink>
            <NavLink href="/services">Services</NavLink>
            {/* Portfolio Dropdown */}
            <div className="relative" ref={portfolioRef}>
              <button
                onClick={() => setPortfolioOpen(!portfolioOpen)}
                className="relative px-3 py-2.5 text-sm font-medium transition-all duration-200 text-white/50 hover:text-[#ffffff] cursor-pointer flex items-center gap-1"
              >
                Projects
                <svg
                  className={`w-3 h-3 transition-transform duration-200 ${portfolioOpen ? "rotate-180" : ""}`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {portfolioOpen && (
                <div className="absolute left-0 mt-2 w-56 rounded-2xl shadow-2xl bg-[#0f0f0f] border border-white/[0.08] overflow-hidden z-[60] animate-in fade-in zoom-in-95 duration-150">
                  <div className="p-1.5">
                    <Link
                      href="/portfolio/website-design"
                      onClick={() => setPortfolioOpen(false)}
                      className="flex items-center px-3 py-2.5 text-sm text-white/60 hover:bg-white/[0.05] hover:text-white rounded-xl transition-colors"
                    >
                      Web Designs
                    </Link>
                    <Link
                      href="/portfolio/app-design"
                      onClick={() => setPortfolioOpen(false)}
                      className="flex items-center px-3 py-2.5 text-sm text-white/60 hover:bg-white/[0.05] hover:text-white rounded-xl transition-colors"
                    >
                      App Designs
                    </Link>

                    <Link
                      href="/portfolio/graphics-design"
                      onClick={() => setPortfolioOpen(false)}
                      className="flex items-center px-3 py-2.5 text-sm text-white/60 hover:bg-white/[0.05] hover:text-white rounded-xl transition-colors"
                    >
                      Graphics Designs
                    </Link>
                  </div>
                </div>
              )}
            </div>
            <NavLink href="/contact">Contact</NavLink>
          </div>

          {/* Right side */}
          <div className="flex items-center gap-2">
            <BookCallButton className="px-4 py-1 bg-gradient-to-br from-[#0F9BD0] via-[#0A6FA1] to-[#063A57] text-white font-bold block mx-auto md:mx-0 rounded-full hover:scale-105 transition duration-500 cursor-pointer" />
            {/* Hamburger */}
            <button
              onClick={() => setMobileOpen(true)}
              className="md:hidden w-8 h-8 flex items-center justify-center rounded-lg hover:bg-white/[0.06] text-white/50 hover:text-white transition-colors cursor-pointer"
            >
              <Menu size={18} />
            </button>
          </div>
        </div>
      </header>

      {/* ── Mobile Sidebar ── */}
      {/* Overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-[90] bg-black/60 backdrop-blur-sm md:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      <nav
        className={`md:hidden fixed top-0 left-0 h-full w-72 z-[100] flex flex-col bg-[#0a0a0a] border-r border-white/[0.07] shadow-2xl transform transition-transform duration-300 ease-in-out
          ${mobileOpen ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        <div className="flex items-center justify-between p-5 border-b border-white/[0.06]">
          <Link
            href="/"
            className="flex items-center gap-2"
            onClick={() => setMobileOpen(false)}
          >
            <div className="w-7 h-7 rounded-lg bg-[#0F9BD0]/20 border border-[#0F9BD0]/40 flex items-center justify-center">
              <span className="text-[#0F9BD0] text-xs font-bold">M</span>
            </div>
            <span className="text-white font-bold text-base tracking-tight">
              MatemboDev<span className="text-[#0F9BD0]">+</span>
            </span>
          </Link>
          <button
            onClick={() => setMobileOpen(false)}
            className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-white/[0.06] text-white/50 hover:text-white transition-colors"
          >
            <X size={16} />
          </button>
        </div>

        {token && user && (
          <div className="px-4 py-4 border-b border-white/[0.06]">
            <div className="flex items-center gap-3 p-3 rounded-xl bg-white/[0.03] border border-white/[0.06]">
              <Avatar
                initials={user?.firstName?.[0]}
                src={user?.image}
                size={9}
                className="w-8 h-8"
              />
              <div className="flex flex-col min-w-0">
                <span className="text-sm font-semibold text-white truncate">
                  {user?.firstName} {user?.lastName}
                </span>
                <span className="text-[11px] text-white/35 truncate">
                  {user?.email}
                </span>
              </div>
            </div>
          </div>
        )}

        <div className="flex-1 flex flex-col p-4 gap-1 overflow-y-auto">
          {/* Main Navigation Links */}
          <NavLink href="/" onClick={() => setMobileOpen(false)}>
            Home
          </NavLink>
          <NavLink href="/about" onClick={() => setMobileOpen(false)}>
            About
          </NavLink>
          <NavLink href="/services" onClick={() => setMobileOpen(false)}>
            Services
          </NavLink>
          {/* Portfolio Accordion */}
          <div>
            <button
              onClick={() => setPortfolioOpen(!portfolioOpen)}
              className="w-full flex items-center justify-between px-3 py-2.5 text-sm font-medium transition-all duration-200 text-white/50 hover:text-[#ffffff] rounded-xl hover:bg-white/[0.05] cursor-pointer"
            >
              Portfolio
              <svg
                className={`w-3 h-3 transition-transform duration-200 ${portfolioOpen ? "rotate-180" : ""}`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {portfolioOpen && (
              <div className="ml-3 mt-1 flex flex-col gap-0.5">
                <Link
                  href="/portfolio/website-design"
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center px-3 py-2.5 text-sm text-white/60 hover:text-white hover:bg-white/[0.05] rounded-xl transition-colors"
                >
                  Website Design
                </Link>
                <Link
                  href="/portfolio/app-design"
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center px-3 py-2.5 text-sm text-white/60 hover:text-white hover:bg-white/[0.05] rounded-xl transition-colors"
                >
                  App Design
                </Link>

                <Link
                  href="/portfolio/graphics-design"
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center px-3 py-2.5 text-sm text-white/60 hover:text-white hover:bg-white/[0.05] rounded-xl transition-colors"
                >
                  Graphics Design
                </Link>
              </div>
            )}
          </div>
          <NavLink href="/blog" onClick={() => setMobileOpen(false)}>
            Blog
          </NavLink>
          <NavLink href="/contact" onClick={() => setMobileOpen(false)}>
            Contact
          </NavLink>

          {token && (
            <>
              <div className="h-px bg-white/[0.06] my-2" />
              <Link
                href="/profile"
                className="flex items-center gap-2.5 px-3 py-2.5 text-sm text-white/60 hover:text-white hover:bg-white/[0.05] rounded-xl transition-colors"
                onClick={() => setMobileOpen(false)}
              >
                <User size={15} className="text-[#0F9BD0]" /> Profile
              </Link>
              <Link
                href="/settings"
                className="flex items-center gap-2.5 px-3 py-2.5 text-sm text-white/60 hover:text-white hover:bg-white/[0.05] rounded-xl transition-colors"
                onClick={() => setMobileOpen(false)}
              >
                <Settings size={15} className="text-[#0F9BD0]" /> Settings
              </Link>
            </>
          )}
        </div>

        {!token && (
          <div className="p-4 border-t border-white/[0.06] flex flex-col gap-2">
            <Link
              href="/signin"
              className="w-full py-2.5 text-center text-white/80 border border-white/[0.1] rounded-xl text-sm font-medium hover:bg-white/[0.05] transition-colors"
              onClick={() => setMobileOpen(false)}
            >
              Sign in
            </Link>
            <Link
              href="/signup"
              className="w-full py-2.5 text-center bg-[#0F9BD0] text-white rounded-xl text-sm font-semibold hover:bg-[#0F9BD0]/90 transition-colors"
              onClick={() => setMobileOpen(false)}
            >
              Get started
            </Link>
          </div>
        )}

        {token && (
          <div className="p-4 border-t border-white/[0.06]">
            <button
              onClick={() => {
                setMobileOpen(false);
                setLogoutOpen(true);
              }}
              className="w-full flex items-center justify-center gap-2 py-2.5 text-sm text-red-400 hover:bg-red-500/[0.08] rounded-xl transition-colors font-medium"
            >
              <LogOut size={15} /> Sign out
            </button>
          </div>
        )}
      </nav>

      <LogoutModal
        isOpen={logoutOpen}
        onClose={() => setLogoutOpen(false)}
        onConfirm={handleConfirmLogout}
      />
    </>
  );
}
