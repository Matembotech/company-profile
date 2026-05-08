"use client";

import Link from "next/link";
import Typewriter from "typewriter-effect";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { useRef, useEffect, useCallback } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

export default function HeroPage() {
  const container = useRef(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // ── Snow & Stars Canvas ──
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;
    let width = 0;
    let height = 0;

    // ── Snowflakes (≥60)
    const SNOW_COUNT = 80;
    interface Snowflake {
      x: number;
      y: number;
      r: number;
      speed: number;
      wind: number;
      opacity: number;
    }
    const snowflakes: Snowflake[] = [];

    // ── Stars
    const STAR_COUNT = 45;
    interface Star {
      x: number;
      y: number;
      r: number;
      baseOpacity: number;
      twinkleSpeed: number;
      phase: number;
    }
    const stars: Star[] = [];

    function resize() {
      width = canvas!.parentElement?.offsetWidth || window.innerWidth;
      height = canvas!.parentElement?.offsetHeight || window.innerHeight;
      canvas!.width = width;
      canvas!.height = height;
    }

    function initSnow() {
      snowflakes.length = 0;
      for (let i = 0; i < SNOW_COUNT; i++) {
        snowflakes.push({
          x: Math.random() * width,
          y: Math.random() * height,
          r: Math.random() * 2.5 + 0.8,
          speed: Math.random() * 1.2 + 0.3,
          wind: Math.random() * 0.6 - 0.3,
          opacity: Math.random() * 0.6 + 0.3,
        });
      }
    }

    function initStars() {
      stars.length = 0;
      for (let i = 0; i < STAR_COUNT; i++) {
        stars.push({
          x: Math.random() * width,
          y: Math.random() * height * 0.6, // upper 60% of hero
          r: Math.random() * 1.4 + 0.4,
          baseOpacity: Math.random() * 0.5 + 0.3,
          twinkleSpeed: Math.random() * 0.03 + 0.01,
          phase: Math.random() * Math.PI * 2,
        });
      }
    }

    function draw(time: number) {
      ctx!.clearRect(0, 0, width, height);

      // ── Draw stars with twinkling
      for (const star of stars) {
        const opacity =
          star.baseOpacity +
          Math.sin(time * star.twinkleSpeed + star.phase) * 0.3;
        const clampedOpacity = Math.max(0.05, Math.min(1, opacity));

        // Outer glow
        ctx!.beginPath();
        ctx!.arc(star.x, star.y, star.r * 3, 0, Math.PI * 2);
        ctx!.fillStyle = `rgba(255, 255, 255, ${clampedOpacity * 0.1})`;
        ctx!.fill();

        // Core
        ctx!.beginPath();
        ctx!.arc(star.x, star.y, star.r, 0, Math.PI * 2);
        ctx!.fillStyle = `rgba(255, 255, 255, ${clampedOpacity})`;
        ctx!.fill();

        // Cross sparkle for brighter stars
        if (star.r > 1) {
          const sparkleLen = star.r * 2.5 * clampedOpacity;
          ctx!.strokeStyle = `rgba(255, 255, 255, ${clampedOpacity * 0.4})`;
          ctx!.lineWidth = 0.5;
          ctx!.beginPath();
          ctx!.moveTo(star.x - sparkleLen, star.y);
          ctx!.lineTo(star.x + sparkleLen, star.y);
          ctx!.moveTo(star.x, star.y - sparkleLen);
          ctx!.lineTo(star.x, star.y + sparkleLen);
          ctx!.stroke();
        }
      }

      // ── Draw & update snowflakes
      for (const flake of snowflakes) {
        ctx!.beginPath();
        ctx!.arc(flake.x, flake.y, flake.r, 0, Math.PI * 2);
        ctx!.fillStyle = `rgba(255, 255, 255, ${flake.opacity})`;
        ctx!.fill();

        // Move
        flake.y += flake.speed;
        flake.x += flake.wind + Math.sin(time * 0.001 + flake.y * 0.01) * 0.3;

        // Reset when out of bounds
        if (flake.y > height) {
          flake.y = -flake.r * 2;
          flake.x = Math.random() * width;
        }
        if (flake.x > width + 5) flake.x = -5;
        if (flake.x < -5) flake.x = width + 5;
      }

      animationId = requestAnimationFrame(draw);
    }

    resize();
    initSnow();
    initStars();
    animationId = requestAnimationFrame(draw);

    window.addEventListener("resize", () => {
      resize();
      initStars();
    });

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  useGSAP(
    () => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.from(".hero-sub", {
        y: 20,
        opacity: 0,
        duration: 0.8,
        delay: 0.2,
      })
        .from(
          ".hero-title",
          {
            y: 40,
            opacity: 0,
            duration: 1,
            stagger: 0.1,
          },
          "-=0.4",
        )
        .from(
          ".hero-p",
          {
            y: 20,
            opacity: 0,
            duration: 0.8,
          },
          "-=0.5",
        )
        .from(
          ".hero-btn",
          {
            scale: 0.8,
            opacity: 0,
            duration: 0.5,
          },
          "-=0.3",
        )
        .from(
          ".hero-img",
          {
            x: 50,
            opacity: 0,
            duration: 1.2,
          },
          "-=1",
        );
    },
    { scope: container },
  );

  return (
    <>
      <div
        ref={container}
        className="relative md:flex flex-row justify-between items-center min-h-[400px] sm:min-h-[500px] md:min-h-0 bg-black overflow-hidden"
      >
        {/* Snow & Stars Canvas */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full pointer-events-none z-[1]"
        />

        <div className="relative z-10 flex-1 flex flex-col justify-center md:ml-10 md:justify-start items-center md:items-start pt-12 sm:pt-20 pb-8 sm:pb-10 md:py-5 mb-10 px-4 sm:px-5">
          <h6 className="hero-sub text-[0.7rem] sm:text-[0.8rem] md:text-[0.85rem] lg:text-[0.9rem] xl:text-[0.95rem] font-bold lg:mt-1 text-center md:text-start text-[#b9b9b9] md:text-[#b9b9b9] tracking-wider bg-[#0F9BD0]/20 py-2.5 sm:py-3 px-4 sm:px-5 rounded-full">
            Changing Ideas Into Powerful Digital Solutions
          </h6>

          <h1 className="hero-title text-[2.25rem] sm:text-[3rem] md:text-[3.5rem] lg:text-[4.25rem] xl:text-[5rem] 2xl:text-[5.5rem] font-extrabold text-center md:text-start mb-0 text-white leading-[1.08] tracking-tighter">
            Transform Your <br className="hidden lg:block" /> Business with
          </h1>
          <h1 className="hero-title text-[#0F9BD0] text-[2.25rem] sm:text-[3rem] md:text-[3.5rem] lg:text-[4.25rem] xl:text-[5rem] 2xl:text-[5.5rem] font-extrabold text-center md:text-start mt-0 leading-[1.08] tracking-tighter">
            <Typewriter
              options={{
                strings: [
                  "Smart Solutions",
                  "Intelligent Tech",
                  "AI&Automation",
                ],
                autoStart: true,
                loop: true,
                deleteSpeed: 120,
                delay: 120,
              }}
            />
          </h1>

          <p className="hero-p text-[0.75rem] sm:text-[0.85rem] md:text-[0.95rem] lg:text-[1rem] xl:text-[1.1rem] 2xl:text-[1.15rem] mt-4 sm:mt-6 font-medium text-center md:text-start text-[#b9b9b9] leading-relaxed max-w-[550px] xl:max-w-[620px]">
            Authentication, Roles, and Modern Architecture—engineered for
            high-impact digital experiences from day one.
          </p>

          <div className="hero-btn flex flex-col sm:flex-row gap-4 sm:gap-5 mt-8 sm:mt-10 w-full sm:w-auto">
            <Link href="/contact">
              <button className="px-8 sm:px-10 py-3.5 sm:py-4 bg-[#0F9BD0] text-white font-bold block mx-auto md:mx-0 rounded-full hover:scale-105 transition-all duration-300 cursor-pointer shadow-xl shadow-[#0F9BD0]/20 text-sm sm:text-base w-full sm:w-auto">
                Start a Project{" "}
                <ArrowRight className="inline-block ml-2 w-5 h-5" />
              </button>
            </Link>
            <Link href="/projects">
              <button className="px-8 sm:px-10 py-3.5 sm:py-4 text-white font-bold block mx-auto md:mx-0 rounded-full hover:scale-105 transition-all duration-300 cursor-pointer shadow-xl shadow-[#0F9BD0]/20 hover:border-[#0F9BD0] hover:border-2 text-sm sm:text-base w-full sm:w-auto border border-white/20">
                View Our Work
              </button>
            </Link>
          </div>
        </div>

        {/* Display Hero Image on md screens and above */}
        <div className="hero-img flex-1 hidden md:flex flex-col items-center justify-center p-5 lg:p-10 mt-5 relative z-10 w-full">
          <div className="relative flex justify-center items-center w-full max-w-[500px] aspect-square">
            {/* SVG Blob Background */}
            <svg
              className="absolute inset-0 w-full h-full -z-10 drop-shadow-2xl"
              viewBox="0 0 200 200"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill="#ffffff"
                stroke="#0F9BD0"
                strokeWidth="5"
                d="M51.6,-61.6C66.5,-51.2,77.9,-34.5,84,-15.5C90.1,3.5,90.9,24.8,81.1,41.9C71.3,59,50.9,71.9,30,77.6C9.1,83.3,-12.3,81.8,-32.1,74C-51.9,66.2,-70.1,52.1,-79.8,33.5C-89.5,14.9,-90.7,-8.2,-83.4,-27.6C-76.1,-47,-60.3,-62.7,-43.3,-72C-26.3,-81.3,-8.1,-84.2,8.8,-80.6C25.7,-77,42.6,-66.9,51.6,-61.6Z"
                transform="translate(100 100) scale(0.95)"
              />
            </svg>

            {/* Layer 1: Bound entirely perfectly inside the SVG Blob. This handles the bottom parts so they tuck inside. */}
            <div
              className="absolute inset-0 w-full h-full flex justify-center items-center pointer-events-none"
              style={{
                WebkitMaskImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath fill='black' transform='translate(100 100) scale(0.95)' d='M51.6,-61.6C66.5,-51.2,77.9,-34.5,84,-15.5C90.1,3.5,90.9,24.8,81.1,41.9C71.3,59,50.9,71.9,30,77.6C9.1,83.3,-12.3,81.8,-32.1,74C-51.9,66.2,-70.1,52.1,-79.8,33.5C-89.5,14.9,-90.7,-8.2,-83.4,-27.6C-76.1,-47,-60.3,-62.7,-43.3,-72C-26.3,-81.3,-8.1,-84.2,8.8,-80.6C25.7,-77,42.6,-66.9,51.6,-61.6Z'/%3E%3C/svg%3E")`,
                WebkitMaskSize: "contain",
                WebkitMaskPosition: "center",
                WebkitMaskRepeat: "no-repeat",
                maskImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath fill='black' transform='translate(100 100) scale(0.95)' d='M51.6,-61.6C66.5,-51.2,77.9,-34.5,84,-15.5C90.1,3.5,90.9,24.8,81.1,41.9C71.3,59,50.9,71.9,30,77.6C9.1,83.3,-12.3,81.8,-32.1,74C-51.9,66.2,-70.1,52.1,-79.8,33.5C-89.5,14.9,-90.7,-8.2,-83.4,-27.6C-76.1,-47,-60.3,-62.7,-43.3,-72C-26.3,-81.3,-8.1,-84.2,8.8,-80.6C25.7,-77,42.6,-66.9,51.6,-61.6Z'/%3E%3C/svg%3E")`,
                maskSize: "contain",
                maskPosition: "center",
                maskRepeat: "no-repeat",
              }}
            >
              <Image
                src="/hero5_empty.png"
                alt="Hero Illustration Inner"
                width={700}
                height={700}
                className="w-[95%] h-auto object-contain scale-110 -translate-y-4 translate-x-3 drop-shadow-lg"
              />
            </div>

            {/* Layer 2: Top part popping out bounds. Clipped seamlessly at 85% before it reaches the bottom stroke. */}
            <div
              className="absolute inset-0 w-full h-full flex justify-center items-center pointer-events-none"
              style={{
                clipPath: "polygon(-20% -20%, 120% -20%, 120% 85%, -20% 85%)",
              }}
            >
              <Image
                src="/hero5_empty.png"
                alt="Hero Illustration Out of Bounds"
                width={700}
                height={700}
                className="w-[95%] h-auto object-contain scale-110 -translate-y-4 translate-x-3 drop-shadow-lg"
              />
            </div>
          </div>
        </div>

        {/* Glowing SVG Bottom Line */}
        <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none z-[5] pointer-events-none select-none">
          <svg
            className="relative block w-full h-[30px] sm:h-[50px] md:h-[80px]"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1200 120"
            preserveAspectRatio="none"
          >
            <path
              d="M0,120 L1200,120 L1200,80 Q600,-20 0,80 Z"
              fill="#242424"
            />
            <path
              d="M0,80 Q600,-20 1200,80"
              fill="none"
              stroke="#0F9BD0"
              strokeWidth="4"
              filter="drop-shadow(0 0 8px rgba(15,155,208,1))"
            />
            <path
              d="M0,80 Q600,-20 1200,80"
              fill="none"
              stroke="#ffffff"
              strokeWidth="1"
              opacity="0.6"
            />
          </svg>
        </div>
      </div>
    </>
  );
}
