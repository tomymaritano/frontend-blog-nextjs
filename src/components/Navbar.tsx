"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaGithub, FaLinkedin } from "react-icons/fa";

export default function Navbar() {
  const pathname = usePathname();

  return (
    <nav className="sticky top-0 z-50 w-full backdrop-blur-lg ">
      <div className="max-w-7xl mx-auto px-6 py-6 flex items-center justify-between">
        {/* Logo */}
        <Link
          href="/"
          className="text-white text-lg font-semibold tracking-wide hover:opacity-80 transition"
        >
          <span className="text-white">hacklab</span>
          <span className="text-orange-400">.blog</span>
        </Link>

        {/* Right side */}
        <div className="flex items-center gap-4">
          <NavItem href="/" label="Home" active={pathname === "/"} />
          <div className="h-5 w-px bg-white/20" />
          <SocialIcon
            href="https://github.com/tomymaritano"
            icon={<FaGithub size={18} />}
            label="GitHub"
          />
          <SocialIcon
            href="https://linkedin.com/in/tomymaritano"
            icon={<FaLinkedin size={18} />}
            label="LinkedIn"
          />
        </div>
      </div>
    </nav>
  );
}

function NavItem({
  href,
  label,
  active,
}: {
  href: string;
  label: string;
  active: boolean;
}) {
  return (
    <Link
      href={href}
      className={`text-sm font-medium transition-all ${
        active ? "text-white underline underline-offset-4" : "text-gray-300 hover:text-white"
      }`}
    >
      {label}
    </Link>
  );
}

function SocialIcon({
  href,
  icon,
  label,
}: {
  href: string;
  icon: React.ReactNode;
  label: string;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="text-gray-300 hover:text-orange-400 transition"
      aria-label={label}
    >
      {icon}
    </a>
  );
}
