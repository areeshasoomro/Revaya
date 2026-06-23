"use client"

import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"

const NAV_LINKS = ["About", "Services", "Case Studies", "Insights", "Contact us"]

export default function Navbar() {
  return (
    <motion.header
      initial={{ opacity: 0, y: -18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
      className="relative z-50 transition-all duration-500 bg-transparent"
    >
      <div className="max-w-360 mx-auto px-8 sm:px-12 lg:px-16 h-20 flex items-center justify-between">

        {/* ── Logo (slightly larger) ── */}
        <Link href="/" aria-label="Revaya home" className="shrink-0">
          <Image
            src="/loogo.png"
            alt="Revaya"
            width={120}
            height={120}
            className="h-20 w-auto object-contain"
            priority
          />
        </Link>

        {/* ── Nav links + CTA grouped on the right ── */}
        <div className="hidden md:flex items-center gap-8">
          <nav className="flex items-center gap-8" aria-label="Main navigation">
            {NAV_LINKS.map((link) => (
              <Link
                key={link}
                href="#"
                className="text-white text-[15px] font-medium transition-colors duration-200"
                style={{ fontFamily: "var(--font-inter)" }}
              >
                {link}
              </Link>
            ))}
          </nav>

          <Link
            href="#"
            className="btn-liquid inline-flex items-center text-white font-semibold text-[15px] rounded-full px-7 py-2.5 transition-all duration-200 shrink-0"
            style={{
              fontFamily: "var(--font-space-grotesk)",
              background: "linear-gradient(to right, #1d9bff 0%, #0040e0 100%)",
              border: "1.5px solid rgba(255,255,255,0.65)",
              boxShadow: "0 0 22px rgba(1,144,249,0.35)",
            }}
          >
            Get Started
          </Link>
        </div>
      </div>
    </motion.header>
  )
}
