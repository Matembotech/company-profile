"use client";

import Image from "next/image";
import NavBar from "../components/NavBar";
import HeroPage from "../components/HeroPage";
import TechStack from "../components/TechStack";
import Projects from "../components/Projects";
import FAQ from "../components/FAQ";
import ReadyToStart from "../components/ReadyToStart";
import Footer from "../components/Footer";
import Services from "../components/Services";
import { useRef } from "react";
import { ArrowRight } from "lucide-react";
import gsap from "gsap";
import Link from "next/link";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Home() {
  const mainContainer = useRef(null);

  useGSAP(
    () => {
      // Achievement Section Animation
      gsap.from(".achievement-item", {
        scrollTrigger: {
          trigger: ".achievement-section",
          start: "top 80%",
        },
        y: 50,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: "power3.out",
      });

      // Achievement Counters
      const counters = gsap.utils.toArray(".counter") as HTMLElement[];
      counters.forEach((counter) => {
        const target = parseInt(counter.getAttribute("data-target") || "0");
        gsap.to(counter, {
          scrollTrigger: {
            trigger: ".achievement-section",
            start: "top 80%",
          },
          innerText: target,
          duration: 2,
          snap: { innerText: 1 },
          ease: "power1.inOut",
        });
      });

      // About Section Animation
      const aboutTl = gsap.timeline({
        scrollTrigger: {
          trigger: ".about-section",
          start: "top 75%",
        },
      });

      aboutTl
        .from(".about-img", {
          x: -100,
          opacity: 0,
          duration: 1,
          ease: "power3.out",
        })
        .from(
          ".about-content",
          {
            x: 100,
            opacity: 0,
            duration: 1,
            ease: "power3.out",
          },
          "-=0.8",
        );

      // Projects Section Animation
      gsap.to(".projects-reveal", {
        scrollTrigger: {
          trigger: ".projects-section",
          start: "top 80%",
        },
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.2,
        ease: "power3.out",
      });

      gsap.to(".project-card", {
        scrollTrigger: {
          trigger: ".projects-grid",
          start: "top 75%",
        },
        y: 0,
        opacity: 1,
        duration: 1,
        stagger: 0.2,
        ease: "power4.out",
      });

      // FAQ Section Animation
      gsap.to(".faq-reveal-left", {
        scrollTrigger: {
          trigger: ".faq-section",
          start: "top 80%",
        },
        x: 0,
        opacity: 1,
        duration: 1,
        ease: "power3.out",
      });

      gsap.to(".faq-reveal-right", {
        scrollTrigger: {
          trigger: ".faq-section",
          start: "top 80%",
        },
        x: 0,
        opacity: 1,
        duration: 1,
        ease: "power3.out",
      });

      gsap.from(".faq-item", {
        scrollTrigger: {
          trigger: ".faq-section",
          start: "top 70%",
        },
        y: 20,
        opacity: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: "power2.out",
      });

      // ReadyToStart Section Animation
      gsap.from(".ready-reveal-item", {
        scrollTrigger: {
          trigger: ".ready-to-start-section",
          start: "top 75%",
        },
        y: 40,
        opacity: 0,
        duration: 1,
        stagger: 0.2,
        ease: "power4.out",
      });
    },
    { scope: mainContainer },
  );

  return (
    <div ref={mainContainer}>
      <NavBar />
      <hr className="w-full border-[#0F9BD0] border-t-1 rounded-full" />
      <HeroPage />

      {/* Our achievement */}
      <div className="achievement-section flex flex-col justify-between md:flex-row dark:bg-transparent px-4 sm:px-6 md:px-10 py-10 mx-auto w-full max-w-7xl">
        <figure className="achievement-item flex-1">
          <Image
            src="/24113.png"
            alt="Achievement"
            width={700}
            height={700}
            className="w-full rounded-2xl hover:scale-105 transition duration-1000 mb-5"
          />
        </figure>

        <div className="achievement-item flex-1 lg:ml-10">
          <h2 className="text-[2.25rem] sm:text-[3rem] font-extrabold text-[#FFFFFF] leading-tight mb-4">
            Our Achievement
          </h2>
          <div className="w-[60px] h-1 bg-[#0F9BD0] rounded-full mb-6" />
          <p className="text-[1rem] text-[#b9b9b9] mt-3 text-sm/7">
            From its early beginnings,{" "}
            <strong className="text-white font-semibold italic">
              Matembo Tech
            </strong>{" "}
            was driven by a single bold vision: to empower individuals and
            organizations through intelligent digital solutions that solve
            real-world problems. What began as a handful of passionate
            developers and thinkers has grown into a dynamic technology company
            known for innovation, creativity, and meaningful impact.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 pt-10">
            <div className="flex items-center gap-4 bg-[#ffffff] border-2 border-[#0F9BD0] rounded-md p-3 sm:p-4">
              <Image
                src="/experience.png"
                alt="experience"
                width={70}
                height={70}
                className="w-[70px]"
              />
              <div className="flex flex-col">
                <p className="text-[#0F9BD0] font-extrabold text-[2.5rem] leading-none mb-1">
                  <span className="counter" data-target="2">
                    0
                  </span>
                  +
                </p>
                <p className="text-[#181818] text-[0.7rem] font-semibold uppercase tracking-wider">
                  Years of Experience
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4 bg-[#ffffff] border-2 border-[#0F9BD0] rounded-md p-3 sm:p-4">
              <Image
                src="/icon1.png"
                alt="projects"
                width={50}
                height={50}
                className="w-[50px]"
              />
              <div className="flex flex-col">
                <p className="text-[#0F9BD0] font-extrabold text-[2.5rem] leading-none mb-1">
                  <span className="counter" data-target="20">
                    0
                  </span>
                  +
                </p>
                <p className="text-[#181818] text-[0.7rem] font-semibold uppercase tracking-wider">
                  Projects Done
                </p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 pt-4">
            <div className="flex items-center gap-4 bg-[#ffffff] border-2 border-[#0F9BD0] rounded-md p-3 sm:p-4">
              <Image
                src="/review.png"
                alt="reviews"
                width={55}
                height={55}
                className="w-[55px]"
              />
              <div className="flex flex-col">
                <p className="text-[#0F9BD0] font-extrabold text-[2.5rem] leading-none mb-1">
                  <span className="counter" data-target="10">
                    0
                  </span>
                  +
                </p>
                <p className="text-[#181818] text-[0.7rem] font-semibold uppercase tracking-wider">
                  Client Reviews
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4 bg-[#ffffff] border-2 border-[#0F9BD0] rounded-md p-3 sm:p-4">
              <Image
                src="/team members.png"
                alt="team"
                width={55}
                height={55}
                className="w-[55px]"
              />
              <div className="flex flex-col">
                <p className="text-[#0F9BD0] font-extrabold text-[2.5rem] leading-none mb-1">
                  <span className="counter" data-target="2">
                    0
                  </span>
                  +
                </p>
                <p className="text-[#181818] text-[0.7rem] font-semibold uppercase tracking-wider">
                  Team Members
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* About us */}
      <div className="about-section flex flex-col justify-between md:flex-row dark:bg-transparent px-4 sm:px-6 md:px-10 py-10 mx-auto w-full max-w-7xl overflow-hidden">
        <div className="about-content flex-1">
          <h2 className="text-[2.25rem] sm:text-[3rem] font-extrabold text-[#FFFFFF] leading-tight mb-4">
            About Our Company
          </h2>
          <div className="w-[60px] h-1 bg-[#0F9BD0] rounded-full mb-6" />
          <p className="text-[1rem] text-[#b9b9b9] mt-3 text-sm/7">
            Matembo Tech is a technology company built around one clear goal:
            using smart, scalable digital solutions to solve real-world
            challenges. We specialize in software development, AI automation,
            and digital transformation, helping businesses adapt and thrive in a
            rapidly changing technological landscape. Our focus is on quality,
            efficiency, and innovation. At Matembo Tech, we don’t just build
            technology—we create tools that empower progress....
          </p>

          <div className="flex justify-start gap-10 mt-5">
            <Link href="/about" className="text-[#0F9BD0] font-bold rounded-lg cursor-pointer transition duration-700 hover:scale-110">
              Read More <ArrowRight className="inline-block ml-2 w-5 h-5" />
            </Link>
          </div>
        </div>

        <figure className="about-img flex-1 pt-10 md:pt-0 relative">
          <Image
            src="/24114.png"
            alt="About us"
            width={400}
            height={400}
            className="w-[90%] block mx-auto rounded-xl hover:scale-105 transition duration-1000 lg:ml-5"
          />
        </figure>
      </div>

      <Services />

      <Projects />

      <FAQ />

      <ReadyToStart />

      <TechStack />

      <Footer />
    </div>
  );
}
