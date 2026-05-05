import Image from "next/image";

const technologies = [
  {
    name: "Python",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg",
  },
  {
    name: "Node.js",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg",
  },
  {
    name: "React",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
  },
  {
    name: "Next.js",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg",
  },
  {
    name: "TypeScript",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg",
  },
  {
    name: "Docker",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg",
  },
  {
    name: "PostgreSQL",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg",
  },
  {
    name: "Tailwind CSS",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg",
  },
  {
    name: "MongoDB",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg",
  },
  {
    name: "GraphQL",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/graphql/graphql-plain.svg",
  },
  {
    name: "AWS",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-original-wordmark.svg",
  },
  {
    name: "Firebase",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg",
  },
  {
    name: "Figma",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg",
  },
  {
    name: "Git",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg",
  },
  {
    name: "Go",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/go/go-original-wordmark.svg",
  },
  {
    name: "Kubernetes",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/kubernetes/kubernetes-plain.svg",
  },
  {
    name: "Redis",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redis/redis-original.svg",
  },
  {
    name: "Sass",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/sass/sass-original.svg",
  },
  {
    name: "Three.js",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/threejs/threejs-original.svg",
  },
  {
    name: "Prisma",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/prisma/prisma-original.svg",
  },
];

const MarqueeRow = ({
  items,
  direction,
}: {
  items: typeof technologies;
  direction: "left" | "right";
}) => (
  <div className="flex overflow-hidden group py-3 sm:py-4 select-none">
    <div
      className={`flex gap-12 items-center whitespace-nowrap min-w-full shrink-0 ${direction === "left" ? "animate-marquee-left" : "animate-marquee-right"}`}
    >
      {items.map((tech, idx) => (
        <div
          key={`${tech.name}-${idx}`}
          className="flex items-center gap-2.5 sm:gap-4 px-3 sm:px-6 py-2 sm:py-3 bg-[#ffffff05] rounded-xl border border-[#ffffff10] backdrop-blur-sm hover:border-[#0F9BD0]/50 transition-colors duration-300"
        >
          <Image
            src={tech.icon}
            alt={tech.name}
            width={40}
            height={40}
            className="object-contain w-7 h-7 sm:w-10 sm:h-10"
          />
          <span className="text-white font-medium text-sm sm:text-lg">{tech.name}</span>
        </div>
      ))}
      {/* Duplicate for seamless loop */}
      {items.map((tech, idx) => (
        <div
          key={`${tech.name}-dup-${idx}`}
          className="flex items-center gap-2.5 sm:gap-4 px-3 sm:px-6 py-2 sm:py-3 bg-[#ffffff05] rounded-xl border border-[#ffffff10] backdrop-blur-sm hover:border-[#0F9BD0]/50 transition-colors duration-300"
        >
          <Image
            src={tech.icon}
            alt={tech.name}
            width={40}
            height={40}
            className="object-contain w-7 h-7 sm:w-10 sm:h-10"
          />
          <span className="text-white font-medium text-sm sm:text-lg">{tech.name}</span>
        </div>
      ))}
    </div>
  </div>
);

export default function TechStack() {
  const row1 = technologies.slice(0, 10);
  const row2 = technologies.slice(10, 20);

  return (
    <section className="tech-stack-section py-12 sm:py-16 lg:py-24 px-4 overflow-hidden bg-[#242424]">
      <div className="max-w-7xl mx-auto text-center mb-10 sm:mb-14 lg:mb-20 px-2">
        <h6 className="tech-title-small text-[0.85rem] font-semibold text-[#0F9BD0] tracking-[0.2em] uppercase mb-4">
          Tech Stack
        </h6>
        <h2 className="tech-title-main text-[2.25rem] sm:text-[3.5rem] font-extrabold text-white leading-tight mb-4 tracking-tighter">
          Powerful Languages & Tools
        </h2>
        <div className="w-[100px] h-1 bg-[#0F9BD0] rounded-full mx-auto mb-6" />
        <p className="tech-description text-[#b9b9b9] text-center text-sm sm:text-base leading-relaxed max-w-2xl mx-auto">
          We use industry-leading technologies and modern tools to build secure,
          scalable, and high-performance digital solutions tailored to your
          needs.
        </p>
      </div>

      <div className="flex flex-col gap-4">
        <MarqueeRow items={row1} direction="left" />
        <MarqueeRow items={row2} direction="right" />
      </div>
    </section>
  );
}
