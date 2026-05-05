"use client";

import Image from "next/image";
import { Github, ExternalLink } from "lucide-react";
import { title } from "process";

const projects = [
  {
    title: "Laki Construction co. ltd",
    description:
      "A professional and responsive construction company website built with HTML, CSS, and JavaScript. Features a clean design, service showcase, contact form, and optimized performance across all devices",
    image: "/laki.png",
    tech: ["HTML", "CSS", "JavaScript"],
    liveDemo: "https://matembotech.github.io/Laki-construction-site/",
    github: "https://github.com/Matembotech/Laki-construction-site",
  },
  {
    title: "QuizzApp",
    description:
      "A full-stack quiz platform with user authentication, real-time scoring, and admin controls. Built with TypeScript and deployed on Vercel — supports creating, managing, and taking quizzes for learning and engagement.",
    image: "/quizz-app.png",
    tech: ["TypeScript", "React", "Next.js", "expressjs", "node.js"],
    liveDemo: "https://quizz-app-eight-dun.vercel.app/",
    github: "https://github.com/Matembotech/QuizzApp",
  },
  {
    title: "Bakery Site",
    description:
      "A modern bakery website built with TypeScript and deployed on Vercel. Features a clean product showcase, elegant design, and responsive layout tailored for a small business online presence.",
    image: "/bakery.png",
    tech: ["TypeScript", "React", "Next.js"],
    liveDemo: "https://bakery-site-nine.vercel.app/",
    github: "https://github.com/Matembotech/Bakery-site",
  },
  // {
  //   title: "Birthday Wishes",
  //   description:
  //     "A simple birthday wishes app built with React and deployed on Vercel. Allows users to select a birthday boy or girl, choose a theme, and generate a personalized birthday wishes message.",
  //   image: "/birthday.png",
  //   tech: ["React", "Next.js"],
  //   liveDemo: "https://birthday-wishes-seven-rho.vercel.app/",
  //   github: "https://github.com/Matembotech/birthday_wishes",
  // }
];

export default function Projects() {
  return (
    <section className="projects-section bg-[#121212] py-12 sm:py-16 lg:py-20 px-4 sm:px-6 md:px-10 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="projects-header flex flex-col items-center justify-center mb-16">
          <h6 className="text-[0.85rem] font-semibold text-[#0F9BD0] tracking-[0.2em] uppercase mb-4 opacity-0 projects-reveal">
            Our Work
          </h6>
          <h2 className="text-[2.25rem] sm:text-[3.5rem] font-extrabold text-[#FFFFFF] tracking-tighter leading-tight text-center max-w-2xl opacity-0 projects-reveal">
            Feature Projects
          </h2>
          <div className="w-[80px] h-1.5 bg-[#0F9BD0] rounded-full mt-6 opacity-0 projects-reveal" />
        </div>

        <div className="projects-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <div
              key={index}
              className="project-card group bg-[#1c1c1c] border border-white/5 rounded-2xl overflow-hidden hover:border-[#0F9BD0]/50 transition-all duration-500 hover:shadow-[0_20px_50px_rgba(15,155,208,0.15)] opacity-0 translate-y-20"
            >
              <div className="relative h-40 sm:h-48 md:h-56 overflow-hidden">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1c1c1c] to-transparent opacity-60" />
              </div>

              <div className="p-4 sm:p-5 flex flex-col gap-2">
                <h3 className="text-[1.2rem] sm:text-[1.5rem] font-bold text-white mb-4 sm:mb-6 group-hover:text-[#0F9BD0] transition-colors duration-300">
                  {project.title}
                </h3>

                <p className="text-[#b9b9b9] text-sm leading-relaxed mb-4 sm:mb-6 mt-3 sm:mt-5">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-2 mb-6 sm:mb-8 mt-3 sm:mt-5">
                  {project.tech.map((tech, i) => (
                    <span
                      key={i}
                      className="text-[0.7rem] font-bold text-[#0F9BD0] bg-[#0F9BD0]/10 px-3 py-1 rounded-full uppercase tracking-wider"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="flex gap-4">
                  <a
                    href={project.liveDemo}
                    className="flex-1 flex items-center justify-center gap-2 bg-[#0F9BD0] hover:bg-[#0c7ea9] text-white py-3 px-4 rounded-xl text-sm font-bold transition-all duration-300 transform hover:-translate-y-1"
                  >
                    <span>Live Demo</span>
                    <ExternalLink size={16} />
                  </a>
                  <a
                    href={project.github}
                    className="flex items-center justify-center gap-2 border border-white/10 hover:border-[#0F9BD0] hover:text-[#0F9BD0] text-white/70 py-3 px-4 rounded-xl text-sm font-bold transition-all duration-300 transform hover:-translate-y-1"
                  >
                    <Github size={18} />
                    <span className="sr-only">GitHub</span>
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
