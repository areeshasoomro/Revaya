// "use client"

// import Image from "next/image"
// import Link from "next/link"
// import { motion } from "framer-motion"

// const NAV_LINKS = ["About", "Services", "Case Studies", "Insights", "Contact us"]

// export default function Navbar() {
//   return (
//     <motion.header
//       initial={{ opacity: 0, y: -18 }}
//       animate={{ opacity: 1, y: 0 }}
//       transition={{ duration: 0.7, ease: "easeOut" }}
//       className="relative z-50 transition-all duration-500 bg-transparent"
//     >
//       <div className="max-w-360 mx-auto px-8 sm:px-12 lg:px-16 h-20 flex items-center justify-between">

//         {/* ── Logo (slightly larger) ── */}
//         <Link href="/" aria-label="Revaya home" className="shrink-0">
//           <Image
//             src="/loogo.png"
//             alt="Revaya"
//             width={120}
//             height={120}
//             className="h-20 w-auto object-contain"
//             priority
//           />
//         </Link>

//         {/* ── Nav links + CTA grouped on the right ── */}
//         <div className="hidden md:flex items-center gap-8">
//           <nav className="flex items-center gap-8" aria-label="Main navigation">
//             {NAV_LINKS.map((link) => (
//               <Link
//                 key={link}
//                 href="#"
//                 className="text-white text-[15px] font-medium transition-colors duration-200"
//                 style={{ fontFamily: "var(--font-inter)" }}
//               >
//                 {link}
//               </Link>
//             ))}
//           </nav>

//           <Link
//             href="#"
//             className="btn-liquid inline-flex items-center text-white font-semibold text-[15px] rounded-full px-7 py-2.5 transition-all duration-200 shrink-0"
//             style={{
//               fontFamily: "var(--font-space-grotesk)",
//               background: "linear-gradient(to right, #1d9bff 0%, #0040e0 100%)",
//               border: "1.5px solid rgba(255,255,255,0.65)",
//               boxShadow: "0 0 22px rgba(1,144,249,0.35)",
//             }}
//           >
//             Get Started
//           </Link>
//         </div>
//       </div>
//     </motion.header>
//   )
// }


"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"

const NAV_LINKS = ["About", "Services", "Case Studies", "Insights", "Contact us"]

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <motion.header
      initial={{ opacity: 0, y: -18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
      className="relative z-50 transition-all duration-500 bg-transparent"
    >
      <div className="max-w-360 mx-auto px-8 sm:px-12 lg:px-16 h-20 flex items-center justify-between">

        {/* ── Logo ── */}
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

        {/* ── Desktop Nav Links + CTA ── */}
        <div className="hidden md:flex items-center gap-8">
          <nav className="flex items-center gap-8" aria-label="Main navigation">
            {NAV_LINKS.map((link) => (
              <Link
                key={link}
                href="#"
                className="text-white text-[15px] font-medium transition-colors duration-200 hover:text-[#0190F9]"
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

        {/* ── Mobile Menu Trigger ── */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex md:hidden flex-col justify-center items-center w-8 h-8 space-y-1.5 z-50 relative focus:outline-none"
          aria-label="Toggle navigation menu"
        >
          <span
            className={`block h-0.5 w-6 bg-white transform transition duration-300 ease-in-out ${
              isOpen ? "rotate-45 translate-y-2" : ""
            }`}
          />
          <span
            className={`block h-0.5 w-6 bg-white transition duration-300 ease-in-out ${
              isOpen ? "opacity-0" : "opacity-100"
            }`}
          />
          <span
            className={`block h-0.5 w-6 bg-white transform transition duration-300 ease-in-out ${
              isOpen ? "-rotate-45 -translate-y-2" : ""
            }`}
          />
        </button>

      </div>

      {/* ── Mobile Overlay Menu ── */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="absolute top-20 left-0 w-full bg-black/95 backdrop-blur-xl border-b border-white/10 flex flex-col items-center py-8 px-6 md:hidden z-40"
          >
            <nav className="flex flex-col items-center gap-6 w-full" aria-label="Mobile navigation">
              {NAV_LINKS.map((link, idx) => (
                <motion.div
                  key={link}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  className="w-full text-center"
                >
                  <Link
                    href="#"
                    onClick={() => setIsOpen(false)}
                    className="block text-white text-[17px] font-medium py-2 transition-colors duration-200 active:text-[#0190F9]"
                    style={{ fontFamily: "var(--font-inter)" }}
                  >
                    {link}
                  </Link>
                </motion.div>
              ))}
            </nav>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: NAV_LINKS.length * 0.05 }}
              className="mt-8 w-full max-w-[260px]"
            >
              <Link
                href="#"
                onClick={() => setIsOpen(false)}
                className="btn-liquid flex items-center justify-center text-white font-semibold text-[15px] rounded-full py-3 transition-all duration-200"
                style={{
                  fontFamily: "var(--font-space-grotesk)",
                  background: "linear-gradient(to right, #1d9bff 0%, #0040e0 100%)",
                  border: "1.5px solid rgba(255,255,255,0.65)",
                  boxShadow: "0 0 22px rgba(1,144,249,0.35)",
                }}
              >
                Get Started
              </Link>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}