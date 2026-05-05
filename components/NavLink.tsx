"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

type NavLinkProps = {
  href: string;
  children: React.ReactNode;
  onClick?: () => void;
};

export default function NavLink({ href, children, onClick }: NavLinkProps) {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link
      href={href}
      onClick={onClick}
      className={`relative px-3 py-2.5 text-sm font-medium transition-all duration-200 group
        ${isActive ? "text-[#0F9BD0]" : "text-white/50 hover:text-[#ffffff]"}
      `}
    >
      {children}
      {isActive && (
        <span className="absolute bottom-1.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-[#0F9BD0]" />
      )}
    </Link>
  );
}

// "use client";

// import Link from "next/link";
// import { usePathname } from "next/navigation";

// type NavLinkProps = {
//   href: string;
//   label: string;
// };

// export default function NavLink({ href, label }: NavLinkProps) {
//   const pathname = usePathname();
//   const isActive = pathname === href;
//   return (
//     <Link href={href} className={`
//       transition-colors
//       ${
//         isActive
//         ? "text-[#0F9BD0] font-bold" : "text-gray-500 hover:text-gray-700"
//       }
//     `}
//     >
//       {label}
//     </Link>
//   );
// };
