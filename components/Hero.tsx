// "use client"

// import React, { useRef, useEffect, useState } from "react"
// import Image from "next/image"
// import Link from "next/link"
// import { motion, useMotionValue, useSpring, useTransform, type Variants } from "framer-motion"
// import ParticleCanvas from "./ParticleCanvas"

// const stagger: Variants = {
//   hidden: {},
//   show: { transition: { staggerChildren: 0.14, delayChildren: 0.2 } },
// }
// const fadeUp: Variants = {
//   hidden: { opacity: 0, y: 24 },
//   show: { opacity: 1, y: 0, transition: { duration: 0.65, ease: "easeOut" } },
// }

// export default function Hero() {
//   const mouseX = useMotionValue(0)
//   const mouseY = useMotionValue(0)

//   const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
//     const r = e.currentTarget.getBoundingClientRect()
//     mouseX.set((e.clientX - r.left - r.width / 2) / r.width)
//     mouseY.set((e.clientY - r.top - r.height / 2) / r.height)
//   }

//   const bx = useSpring(useTransform(mouseX, [-0.5, 0.5], [-8, 8]), { stiffness: 50, damping: 22 })
//   const by = useSpring(useTransform(mouseY, [-0.5, 0.5], [-5, 5]), { stiffness: 50, damping: 22 })

//   const [hovered, setHovered] = useState<number | null>(null)
//   const [mounted, setMounted] = useState(false)

//   const wrapRef = useRef<HTMLDivElement>(null)
//   const brainRef = useRef<HTMLDivElement>(null)
//   const c1Ref = useRef<HTMLDivElement>(null)
//   const c2Ref = useRef<HTMLDivElement>(null)
//   const c3Ref = useRef<HTMLDivElement>(null)

//   const [paths, setPaths] = useState<(string | null)[]>([null, null, null])

//   useEffect(() => {
//     const t = setTimeout(() => setMounted(true), 120)
//     return () => clearTimeout(t)
//   }, [])

//   useEffect(() => {
//     const calc = () => {
//       const wrap = wrapRef.current
//       const brain = brainRef.current
//       const cardRefs = [c1Ref.current, c2Ref.current, c3Ref.current]
//       if (!wrap || !brain || cardRefs.some((c) => !c)) return

//       const wr = wrap.getBoundingClientRect()
//       const br = brain.getBoundingClientRect()

//       const bcx = br.left + br.width * 0.5
//       const bcy = br.top + br.height * 0.44

//       const toSvg = (x: number, y: number): [number, number] => [
//         ((x - wr.left) / wr.width) * 100,
//         ((y - wr.top) / wr.height) * 100,
//       ]

//       const newPaths: (string | null)[] = []

//       cardRefs.forEach((card) => {
//         if (!card) { newPaths.push(null); return }

//         const cr = card.getBoundingClientRect()
//         const px = cr.left + cr.width / 2
//         const py = cr.top + cr.height / 2

//         const dx = px - bcx
//         const dy = py - bcy
//         const d = Math.hypot(dx, dy) || 1
//         const bax = bcx + (dx / d) * br.width * 0.48
//         const bay = bcy + (dy / d) * br.height * 0.48

//         const [fx, fy] = toSvg(px, py)
//         const [tx, ty] = toSvg(bax, bay)

//         newPaths.push(
//           `M ${fx} ${fy} C ${fx + (tx - fx) * 0.5} ${fy}, ${fx + (tx - fx) * 0.5} ${ty}, ${tx} ${ty}`
//         )
//       })

//       setPaths(newPaths)
//     }

//     calc()
//     const ro = new ResizeObserver(calc)
//     ro.observe(document.documentElement)
//     window.addEventListener("resize", calc)
//     window.addEventListener("scroll", calc, { passive: true })
//     return () => {
//       ro.disconnect()
//       window.removeEventListener("resize", calc)
//       window.removeEventListener("scroll", calc)
//     }
//   }, [])

//   return (
//     <section
//       id="hero"
//       ref={wrapRef}
//       className="relative w-full overflow-hidden bg-black flex items-center justify-center"
//       style={{ minHeight: "calc(100vh - 5rem)" }}
//       onMouseMove={handleMouseMove}
//     >
//       <ParticleCanvas />

//       {/* ── SVG Connector Network Lines ── */}
//       <svg
//         aria-hidden
//         className="absolute inset-0 w-full h-full pointer-events-none"
//         viewBox="0 0 100 100"
//         preserveAspectRatio="none"
//         style={{
//           zIndex: 5,
//           overflow: "visible",
//         }}
//       >
//         {paths.map((path, i) =>
//           path ? (
//             <g key={i}>
//               <path
//                 d={path}
//                 fill="none"
//                 stroke="#0190F9"
//                 strokeWidth={hovered === i + 1 ? 0.9 : 0.55}
//                 strokeLinecap="round"
//                 vectorEffect="non-scaling-stroke"
//                 style={{
//                   filter:
//                     "drop-shadow(0 0 6px rgba(1,144,249,0.8)) drop-shadow(0 0 12px rgba(1,144,249,0.5))",
//                   opacity: mounted ? 1 : 0,
//                 }}
//               />

//               <motion.path
//                 d={path}
//                 fill="none"
//                 stroke="#8FD6FF"
//                 strokeWidth="0.8"
//                 strokeDasharray="1 3"
//                 strokeLinecap="round"
//                 animate={{
//                   strokeDashoffset: [0, -20],
//                 }}
//                 transition={{
//                   duration: 2,
//                   repeat: Infinity,
//                   ease: "linear",
//                 }}
//               />
//             </g>
//           ) : null
//         )}
//       </svg>

//       {/* ── Central Production Shell Boundary ── */}
//       <div 
//         className="w-full px-6 md:px-12 xl:px-20 mx-auto" 
//         style={{ maxWidth: "1340px", zIndex: 10 }}
//       >
//         {/* Adjusted split to 45% / 55% to clear wide gaps between columns */}
//         <div
//           style={{
//             display: "grid",
//             gridTemplateColumns: "45% 55%",
//             alignItems: "center",
//             minHeight: "calc(100vh - 8rem)",
//           }}
//         >
//           {/* ── LEFT SIDE: Fixed Width Typography Core ── */}
//           <motion.div
//             variants={stagger}
//             initial="hidden"
//             animate="show"
//             style={{ 
//               paddingRight: "1.5rem", 
//               paddingLeft: "0rem",
//               display: "flex",
//               flexDirection: "column",
//               justifyContent: "center",
//             }}
//           >
//             <motion.h1
//               variants={fadeUp}
//               style={{
//                 fontFamily: "var(--font-space-grotesk)",
//                 fontSize: "clamp(2.3rem, 3.4vw, 4rem)",
//                 fontWeight: 700,
//                 lineHeight: 1.12,
//                 letterSpacing: "-0.03em",
//                 margin: 0,
//               }}
//             >
//               <span style={{ display: "block", color: "#fff", whiteSpace: "nowrap" }}>
//                 We Build Software That
//               </span>
//               <span
//                 style={{
//                   display: "block",
//                   color: "#0190F9",
//                   marginTop: "0.1em",
//                   whiteSpace: "nowrap",
//                   textShadow:
//                     "0 0 38px rgba(1,144,249,0.4), 0 0 80px rgba(1,144,249,0.15)",
//                 }}
//               >
//                 Runs Businesses
//               </span>
//             </motion.h1>

//             <motion.p
//               variants={fadeUp}
//               style={{
//                 fontFamily: "var(--font-inter)",
//                 fontSize: "clamp(0.92rem, 0.98vw, 1.05rem)",
//                 color: "rgba(255,255,255,0.55)",
//                 lineHeight: 1.75,
//                 marginTop: "3rem",
//                 maxWidth: "460px",
//               }}
//             >
//               From ERP and HRMS to SaaS platforms and business automation, we deliver
//               scalable technology solutions that streamline operations and accelerate
//               success.
//             </motion.p>

//             <motion.div
//               variants={fadeUp}
//               style={{
//                 marginTop: "2.4rem",
//                 display: "flex",
//                 flexWrap: "wrap",
//                 gap: "1rem",
//                 alignItems: "center",
//               }}
//             >
//               <PillButton href="#" solid>Start Your Project</PillButton>
//               <PillButton href="#">View Case Studies</PillButton>
//             </motion.div>
//           </motion.div>

//           {/* ── RIGHT SIDE: Protected Image & Node Space Canvas ── */}
//           <div style={{ position: "relative", height: "100%", minHeight: "580px", overflow: "visible" }}>

//             {/* Centralized Brain Vector Cluster shifted out to right viewport edge */}
//             <motion.div
//               ref={brainRef}
//               style={{
//                 x: bx,
//                 y: by,
//                 position: "absolute",
//                 right: "-6%", 
//                 top: "28%",
//                 transform: "translate(0%, -50%)",
//                 width: "clamp(320px, 92%, 460px)",
//                 zIndex: 3,
//                 pointerEvents: "none",
//               }}
//             >
//               <div style={{ position: "relative", width: "100%", height: "100%" }}>
//                 <motion.div
//                   animate={{ opacity: [0.2, 0.42, 0.2], scale: [1, 1.07, 1] }}
//                   transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
//                   style={{
//                     position: "absolute",
//                     inset: 0,
//                     borderRadius: "50%",
//                     background:
//                       "radial-gradient(ellipse at 55% 42%, rgba(1,144,249,0.35), transparent 65%)",
//                     filter: "blur(48px)",
//                   }}
//                 />
//                 <PulseRing delay={0} />
//                 <PulseRing delay={1.6} />
//                 <PulseRing delay={3.2} />
                
//                 <motion.div
//                   animate={{ rotate: 360 }}
//                   transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
//                   style={{
//                     position: "absolute", inset: "12%", borderRadius: "50%",
//                     border: "1px solid rgba(1,144,249,0.11)",
//                   }}
//                 />
//                 <motion.div
//                   animate={{ rotate: -360 }}
//                   transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
//                   style={{
//                     position: "absolute", inset: "4%", borderRadius: "50%",
//                     border: "1px dashed rgba(1,144,249,0.06)",
//                   }}
//                 />
                
//                 <Image
//                   src="/brain.png"
//                   alt="AI brain"
//                   width={600}
//                   height={900}
//                   style={{
//                     width: "100%",
//                     height: "auto",
//                     objectFit: "contain",
//                     position: "relative",
//                     zIndex: 2,
//                     filter:
//                       "drop-shadow(0 0 30px rgba(1,144,249,0.55)) drop-shadow(0 0 65px rgba(1,144,249,0.18))",
//                   }}
//                   priority
//                 />
                
//                 <ScanLine />
//                 <FloatingParticles />
//               </div>
//             </motion.div>

//             {/* Automation Interface Label */}
//             <motion.div
//               ref={c1Ref}
//               initial={{ opacity: 0, y: 10 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.55, delay: 0.85 }}
//               onMouseEnter={() => setHovered(1)}
//               onMouseLeave={() => setHovered(null)}
//               style={{ position: "absolute", left: "13%", top: "16%", zIndex: 30 }}
//             >
//               <AnnotationCard
//                 title="Automation"
//                 desc="Automate repetitive workflows and streamline operations to save time."
//               />
//             </motion.div>

//             {/* Intelligent Solutions Label */}
//             <motion.div
//               ref={c2Ref}
//               initial={{ opacity: 0, y: 10 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.55, delay: 1.0 }}
//               onMouseEnter={() => setHovered(2)}
//               onMouseLeave={() => setHovered(null)}
//               style={{ position: "absolute", right: "-12%", top: "6%", zIndex: 30 }}
//             >
//               <AnnotationCard
//                 title="Intelligent Solutions"
//                 desc="AI-powered systems designed to solve complex business challenges."
//               />
//             </motion.div>

//             {/* Scalable Platforms Label */}
//             <motion.div
//               ref={c3Ref}
//               initial={{ opacity: 0, y: 10 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.55, delay: 1.15 }}
//               onMouseEnter={() => setHovered(3)}
//               onMouseLeave={() => setHovered(null)}
//               style={{ position: "absolute", left: "-4%", top: "52%", zIndex: 30 }}
//             >
//               <AnnotationCard
//                 title="Scalable Platforms"
//                 desc="Technology built to grow with your organization."
//               />
//             </motion.div>

//           </div>
//         </div>
//       </div>
//     </section>
//   )
// }

// /* ─── Atomic UI Utilities ─── */
// function PulseRing({ delay }: { delay: number }) {
//   return (
//     <motion.div
//       aria-hidden
//       initial={{ scale: 0.7, opacity: 0.7 }}
//       animate={{ scale: 1.4, opacity: 0 }}
//       transition={{ duration: 3.8, repeat: Infinity, delay, ease: "easeOut" }}
//       style={{
//         position: "absolute", inset: "18%", borderRadius: "50%",
//         border: "1.5px solid rgba(1,144,249,0.44)", pointerEvents: "none",
//       }}
//     />
//   )
// }

// function ScanLine() {
//   return (
//     <motion.div
//       aria-hidden
//       initial={{ top: "8%", opacity: 0 }}
//       animate={{ top: ["8%", "75%", "75%"], opacity: [0, 0.5, 0] }}
//       transition={{ duration: 3.5, repeat: Infinity, repeatDelay: 2.5, ease: "linear" }}
//       style={{
//         position: "absolute", left: "8%", right: "8%", height: "1.5px",
//         zIndex: 20, pointerEvents: "none",
//         background:
//           "linear-gradient(90deg,transparent,rgba(1,144,249,0.7) 30%,rgba(140,210,255,0.9) 50%,rgba(1,144,249,0.7) 70%,transparent)",
//         boxShadow: "0 0 8px rgba(1,144,249,0.5)",
//       }}
//     />
//   )
// }

// const PARTICLES = [
//   { left: "28%", delay: 0, dur: 3.2 },
//   { left: "46%", delay: 0.8, dur: 2.8 },
//   { left: "58%", delay: 1.6, dur: 3.6 },
//   { left: "40%", delay: 2.4, dur: 3.0 },
//   { left: "66%", delay: 0.4, dur: 4.0 },
//   { left: "34%", delay: 3.0, dur: 2.6 },
// ]

// function FloatingParticles() {
//   return (
//     <>
//       {PARTICLES.map((p, i) => (
//         <motion.div
//           key={i}
//           aria-hidden
//           initial={{ bottom: "40%", opacity: 0.9, scale: 1 }}
//           animate={{ bottom: "80%", opacity: 0, scale: 0.3 }}
//           transition={{ duration: p.dur, repeat: Infinity, delay: p.delay, ease: "easeOut" }}
//           style={{
//             position: "absolute", left: p.left, width: 6, height: 6,
//             borderRadius: "50%", zIndex: 20, pointerEvents: "none",
//             background: "#0190F9", boxShadow: "0 0 6px 2px rgba(1,144,249,0.7)",
//           }}
//         />
//       ))}
//     </>
//   )
// }

// function AnnotationCard({ title, desc }: { title: string; desc: string }) {
//   return (
//     <div
//       style={{
//         width: "205px",
//         background: "rgba(5,8,20,0.85)",
//         backdropFilter: "blur(16px)",
//         WebkitBackdropFilter: "blur(16px)",
//         border: "1px solid rgba(255,255,255,0.09)",
//         borderRadius: "14px",
//         padding: "12px 14px",
//         boxShadow: "0 12px 32px rgba(0,0,0,0.7), 0 0 0 0.5px rgba(1,144,249,0.15)",
//       }}
//     >
//       <p
//         style={{
//           fontFamily: "var(--font-space-grotesk)", fontSize: "13px",
//           fontWeight: 700, color: "#fff", margin: 0,
//         }}
//       >
//         {title}
//       </p>
//       <p
//         style={{
//           fontFamily: "var(--font-inter)", fontSize: "12px",
//           color: "rgba(255,255,255,0.5)", lineHeight: 1.5, margin: "4px 0 0",
//         }}
//       >
//         {desc}
//       </p>
//     </div>
//   )
// }

// function PillButton({
//   href,
//   children,
//   solid = false,
// }: {
//   href: string
//   children: React.ReactNode
//   solid?: boolean
// }) {
//   const ref = useRef<HTMLAnchorElement>(null)
//   const onMove = (e: React.MouseEvent) => {
//     const el = ref.current
//     if (!el) return
//     const r = el.getBoundingClientRect()
//     el.style.setProperty("--mx", `${e.clientX - r.left}px`)
//     el.style.setProperty("--my", `${e.clientY - r.top}px`)
//   }
//   return (
//     <Link
//       ref={ref}
//       href={href}
//       onMouseMove={onMove}
//       className="btn-liquid inline-flex items-center rounded-full select-none"
//       style={{
//         transition: "all 200ms ease",
//         ...(solid
//           ? {
//               background: "linear-gradient(to right,#1d9bff,#0040e0)",
//               boxShadow: "0 0 24px rgba(1,144,249,0.4)",
//             }
//           : {
//               background: "rgba(0,0,0,0.55)",
//               border: "1.8px solid #1a50ee",
//             }),
//       }}
//     >
//       <span
//         style={{
//           fontFamily: "var(--font-space-grotesk)", fontSize: "15px",
//           fontWeight: 600, color: "#fff",
//           padding: "0.7rem 0.9rem 0.7rem 1.3rem", lineHeight: 1,
//         }}
//       >
//         {children}
//       </span>
//       <span
//         style={{
//           margin: "0 5px 0 0", width: 36, height: 36, borderRadius: "50%",
//           background: "#fff", display: "flex", alignItems: "center",
//           justifyContent: "center", flexShrink: 0,
//         }}
//       >
//         <svg width="15" height="15" viewBox="0 0 15 15" fill="none" aria-hidden>
//           <path
//             d="M3 7.5h9M8 3.5l4 4-4 4"
//             stroke="#111"
//             strokeWidth="1.9"
//             strokeLinecap="round"
//             strokeLinejoin="round"
//           />
//         </svg>
//       </span>
//     </Link>
//   )
// }





"use client"

import React, { useRef, useEffect, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion, useMotionValue, useSpring, useTransform, type Variants } from "framer-motion"
import ParticleCanvas from "./ParticleCanvas"

const stagger: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.14, delayChildren: 0.2 } },
}
const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.65, ease: "easeOut" } },
}

export default function Hero() {
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const r = e.currentTarget.getBoundingClientRect()
    mouseX.set((e.clientX - r.left - r.width / 2) / r.width)
    mouseY.set((e.clientY - r.top - r.height / 2) / r.height)
  }

  const bx = useSpring(useTransform(mouseX, [-0.5, 0.5], [-8, 8]), { stiffness: 50, damping: 22 })
  const by = useSpring(useTransform(mouseY, [-0.5, 0.5], [-5, 5]), { stiffness: 50, damping: 22 })

  const [hovered, setHovered] = useState<number | null>(null)
  const [mounted, setMounted] = useState(false)

  const wrapRef = useRef<HTMLDivElement>(null)
  const brainRef = useRef<HTMLDivElement>(null)
  const c1Ref = useRef<HTMLDivElement>(null)
  const c2Ref = useRef<HTMLDivElement>(null)
  const c3Ref = useRef<HTMLDivElement>(null)

  const [paths, setPaths] = useState<(string | null)[]>([null, null, null])

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 120)
    return () => clearTimeout(t)
  }, [])

  useEffect(() => {
    const calc = () => {
      if (window.innerWidth < 768) return

      const wrap = wrapRef.current
      const brain = brainRef.current
      const cardRefs = [c1Ref.current, c2Ref.current, c3Ref.current]
      if (!wrap || !brain || cardRefs.some((c) => !c)) return

      const wr = wrap.getBoundingClientRect()
      const br = brain.getBoundingClientRect()

      // Dynamically calculate the precise absolute center of the adjusted brain container
      const bcx = br.left + br.width * 0.5
      const bcy = br.top + br.height * 0.5

      const toSvg = (x: number, y: number): [number, number] => [
        ((x - wr.left) / wr.width) * 100,
        ((y - wr.top) / wr.height) * 100,
      ]

      const newPaths: (string | null)[] = []

      cardRefs.forEach((card) => {
        if (!card) { newPaths.push(null); return }

        const cr = card.getBoundingClientRect()
        const px = cr.left + cr.width / 2
        const py = cr.top + cr.height / 2

        const dx = px - bcx
        const dy = py - bcy
        const d = Math.hypot(dx, dy) || 1
        
        // Dynamic projection lines tracking clean outer shell anchor points
        const bax = bcx + (dx / d) * br.width * 0.35
        const bay = bcy + (dy / d) * br.height * 0.35

        const [fx, fy] = toSvg(px, py)
        const [tx, ty] = toSvg(bax, bay)

        newPaths.push(
          `M ${fx} ${fy} C ${fx + (tx - fx) * 0.5} ${fy}, ${fx + (tx - fx) * 0.5} ${ty}, ${tx} ${ty}`
        )
      })

      setPaths(newPaths)
    }

    calc()
    
    // Wire listeners to maintain line integrity across viewport shifts
    const ro = new ResizeObserver(calc)
    if (document.documentElement) {
      ro.observe(document.documentElement)
    }
    
    window.addEventListener("resize", calc)
    window.addEventListener("scroll", calc, { passive: true })
    
    const t = setTimeout(calc, 300)

    return () => {
      ro.disconnect()
      clearTimeout(t)
      window.removeEventListener("resize", calc)
      window.removeEventListener("scroll", calc)
    }
  }, [])

  return (
    <section
      id="hero"
      ref={wrapRef}
      className="relative w-full overflow-hidden bg-black flex items-center justify-center py-6 md:py-0"
      style={{ minHeight: "calc(100vh - 5rem)" }}
      onMouseMove={handleMouseMove}
    >
      {/* Turbopack Compliant Global Style Injections */}
      <style jsx global>{`
        @media (max-width: 767px) {
          .mobile-brain-container {
            width: 100% !important;
            max-width: 340px !important;
            height: 360px !important;
            margin: 0 auto !important;
            position: relative !important;
          }
          .card-anchor-1 { position: absolute !important; left: -10px !important; top: 12% !important; z-index: 30; }
          .card-anchor-2 { position: absolute !important; right: -10px !important; top: 2% !important; z-index: 30; }
          .card-anchor-3 { position: absolute !important; left: -5px !important; bottom: 8% !important; z-index: 30; }
        }
        @media (min-width: 768px) {
          .desktop-grid-layout { display: grid !important; grid-template-columns: 45% 55% !important; }
          .desktop-container-height { min-height: 580px !important; }
          .card-anchor-1 { position: absolute !important; left: 13% !important; top: 16% !important; right: auto !important; bottom: auto !important; z-index: 30; }
          .card-anchor-2 { position: absolute !important; right: -12% !important; top: 6% !important; left: auto !important; bottom: auto !important; z-index: 30; }
          .card-anchor-3 { position: absolute !important; left: -4% !important; top: 52% !important; right: auto !important; bottom: auto !important; z-index: 30; }
        }
      `}</style>

      <ParticleCanvas />

      {/* ── SVG Connector Network Lines (Hidden on Mobile) ── */}
      <svg
        aria-hidden
        className="absolute inset-0 w-full h-full pointer-events-none hidden md:block"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        style={{
          zIndex: 5,
          overflow: "visible",
        }}
      >
        {paths.map((path, i) =>
          path ? (
            <g key={i}>
              <path
                d={path}
                fill="none"
                stroke="#0190F9"
                strokeWidth={hovered === i + 1 ? 0.9 : 0.55}
                strokeLinecap="round"
                vectorEffect="non-scaling-stroke"
                style={{
                  filter:
                    "drop-shadow(0 0 6px rgba(1,144,249,0.8)) drop-shadow(0 0 12px rgba(1,144,249,0.5))",
                  opacity: mounted ? 1 : 0,
                }}
              />

              <motion.path
                d={path}
                fill="none"
                stroke="#8FD6FF"
                strokeWidth="0.8"
                strokeDasharray="1 3"
                strokeLinecap="round"
                animate={{
                  strokeDashoffset: [0, -20],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "linear",
                }}
              />
            </g>
          ) : null
        )}
      </svg>

      {/* ── Central Production Shell Boundary ── */}
      <div 
        className="w-full px-6 md:px-12 xl:px-20 mx-auto" 
        style={{ maxWidth: "1340px", zIndex: 10 }}
      >
        <div
          className="flex flex-col desktop-grid-layout gap-12 md:gap-0"
          style={{
            alignItems: "center",
            minHeight: "calc(100vh - 8rem)",
          }}
        >
          {/* ── LEFT SIDE: Typography Core (Updated to order-1 on mobile, order-1 on desktop via grid layout) ── */}
          <motion.div
            variants={stagger}
            initial="hidden"
            animate="show"
            className="order-1 md:order-none items-center md:items-start text-center md:text-left"
            style={{ 
              paddingRight: "0rem",
              paddingLeft: "0rem",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              width: "100%"
            }}
          >
            <motion.h1
              variants={fadeUp}
              style={{
                fontFamily: "var(--font-space-grotesk)",
                fontSize: "clamp(2.1rem, 3.4vw, 4rem)",
                fontWeight: 700,
                lineHeight: 1.12,
                letterSpacing: "-0.03em",
                margin: 0,
              }}
            >
              <span className="block text-white whitespace-normal md:whitespace-nowrap">
                We Build Software That
              </span>
              <span
                className="block mt-[0.1em] whitespace-normal md:whitespace-nowrap"
                style={{
                  color: "#0190F9",
                  textShadow:
                    "0 0 38px rgba(1,144,249,0.4), 0 0 80px rgba(1,144,249,0.15)",
                }}
              >
                Runs Businesses
              </span>
            </motion.h1>

            <motion.p
              variants={fadeUp}
              style={{
                fontFamily: "var(--font-inter)",
                fontSize: "clamp(0.92rem, 0.98vw, 1.05rem)",
                color: "rgba(255,255,255,0.55)",
                lineHeight: 1.75,
                marginTop: "1.5rem",
                maxWidth: "460px",
              }}
            >
              From ERP and HRMS to SaaS platforms and business automation, we deliver
              scalable technology solutions that streamline operations and accelerate
              success.
            </motion.p>

            <motion.div
              variants={fadeUp}
              className="flex flex-row flex-wrap gap-4 items-center justify-center md:justify-start"
              style={{
                marginTop: "2rem",
              }}
            >
              <PillButton href="#" solid>Start Your Project</PillButton>
              <PillButton href="#">View Case Studies</PillButton>
            </motion.div>
          </motion.div>

          {/* ── RIGHT SIDE: Image Canvas Area (Updated to order-2 on mobile, order-2 on desktop via grid layout) ── */}
          <div 
            className="order-2 md:order-none w-full h-auto md:h-full desktop-container-height relative"
            style={{ overflow: "visible" }}
          >
            {/* Unified Mobile Coordinate Context Boundary */}
            <div className="mobile-brain-container">
              
              {/* Centralized Brain Asset */}
              <motion.div
                ref={brainRef}
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 md:left-auto md:right-[6%] md:top-[63%] md:translate-x-0 md:-translate-y-1/2 w-[240px] sm:w-[280px] md:w-[clamp(320px,92%,460px)]"
                style={{
                  x: bx,
                  y: by,
                  zIndex: 3,
                  pointerEvents: "none",
                }}
              >
                <div style={{ position: "relative", width: "100%", height: "100%" }}>
                  <motion.div
                    animate={{ opacity: [0.2, 0.42, 0.2], scale: [1, 1.07, 1] }}
                    transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
                    style={{
                      position: "absolute",
                      inset: 0,
                      borderRadius: "50%",
                      background:
                        "radial-gradient(ellipse at 55% 42%, rgba(1,144,249,0.35), transparent 65%)",
                      filter: "blur(48px)",
                    }}
                  />
                  <PulseRing delay={0} />
                  <PulseRing delay={1.6} />
                  <PulseRing delay={3.2} />
                  
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    style={{
                      position: "absolute", inset: "12%", borderRadius: "50%",
                      border: "1px solid rgba(1,144,249,0.11)",
                    }}
                  />
                  <motion.div
                    animate={{ rotate: -360 }}
                    transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                    style={{
                      position: "absolute", inset: "4%", borderRadius: "50%",
                      border: "1px dashed rgba(1,144,249,0.06)",
                    }}
                  />
                  
                  <Image
                    src="/brain.png"
                    alt="AI brain"
                    width={600}
                    height={900}
                    style={{
                      width: "100%",
                      height: "auto",
                      objectFit: "contain",
                      position: "relative",
                      zIndex: 2,
                      filter:
                        "drop-shadow(0 0 30px rgba(1,144,249,0.55)) drop-shadow(0 0 65px rgba(1,144,249,0.18))",
                    }}
                    priority
                  />
                  
                  <ScanLine />
                  <FloatingParticles />
                </div>
              </motion.div>

              {/* Automation Interface Label */}
              <motion.div
                ref={c1Ref}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.55, delay: 0.85 }}
                onMouseEnter={() => setHovered(1)}
                onMouseLeave={() => setHovered(null)}
                className="card-anchor-1"
              >
                <AnnotationCard
                  title="Automation"
                  desc="Automate repetitive workflows and streamline operations to save time."
                />
              </motion.div>

              {/* Intelligent Solutions Label */}
              <motion.div
                ref={c2Ref}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.55, delay: 1.0 }}
                onMouseEnter={() => setHovered(2)}
                onMouseLeave={() => setHovered(null)}
                className="card-anchor-2"
              >
                <AnnotationCard
                  title="Intelligent Solutions"
                  desc="AI-powered systems designed to solve complex business challenges."
                />
              </motion.div>

              {/* Scalable Platforms Label */}
              <motion.div
                ref={c3Ref}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.55, delay: 1.15 }}
                onMouseEnter={() => setHovered(3)}
                onMouseLeave={() => setHovered(null)}
                className="card-anchor-3"
              >
                <AnnotationCard
                  title="Scalable Platforms"
                  desc="Technology built to grow with your organization."
                />
              </motion.div>

            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ─── Atomic UI Utilities ─── */
function PulseRing({ delay }: { delay: number }) {
  return (
    <motion.div
      aria-hidden
      initial={{ scale: 0.7, opacity: 0.7 }}
      animate={{ scale: 1.4, opacity: 0 }}
      transition={{ duration: 3.8, repeat: Infinity, delay, ease: "easeOut" }}
      style={{
        position: "absolute", inset: "18%", borderRadius: "50%",
        border: "1.5px solid rgba(1,144,249,0.44)", pointerEvents: "none",
      }}
    />
  )
}

function ScanLine() {
  return (
    <motion.div
      aria-hidden
      initial={{ top: "8%", opacity: 0 }}
      animate={{ top: ["8%", "75%", "75%"], opacity: [0, 0.5, 0] }}
      transition={{ duration: 3.5, repeat: Infinity, repeatDelay: 2.5, ease: "linear" }}
      style={{
        position: "absolute", left: "8%", right: "8%", height: "1.5px",
        zIndex: 20, pointerEvents: "none",
        background:
          "linear-gradient(90deg,transparent,rgba(1,144,249,0.7) 30%,rgba(140,210,255,0.9) 50%,rgba(1,144,249,0.7) 70%,transparent)",
        boxShadow: "0 0 8px rgba(1,144,249,0.5)",
      }}
    />
  )
}

const PARTICLES = [
  { left: "28%", delay: 0, dur: 3.2 },
  { left: "46%", delay: 0.8, dur: 2.8 },
  { left: "58%", delay: 1.6, dur: 3.6 },
  { left: "40%", delay: 2.4, dur: 3.0 },
  { left: "66%", delay: 0.4, dur: 4.0 },
  { left: "34%", delay: 3.0, dur: 2.6 },
]

function FloatingParticles() {
  return (
    <>
      {PARTICLES.map((p, i) => (
        <motion.div
          key={i}
          aria-hidden
          initial={{ bottom: "40%", opacity: 0.9, scale: 1 }}
          animate={{ bottom: "80%", opacity: 0, scale: 0.3 }}
          transition={{ duration: p.dur, repeat: Infinity, delay: p.delay, ease: "easeOut" }}
          style={{
            position: "absolute", left: p.left, width: 6, height: 6,
            borderRadius: "50%", zIndex: 20, pointerEvents: "none",
            background: "#0190F9", boxShadow: "0 0 6px 2px rgba(1,144,249,0.7)",
          }}
        />
      ))}
    </>
  )
}

function AnnotationCard({ title, desc }: { title: string; desc: string }) {
  return (
    <div
      className="w-[145px] sm:w-[165px] md:w-[205px] p-[8px_10px] md:p-[12px_14px]"
      style={{
        background: "rgba(5,8,20,0.85)",
        backdropFilter: "blur(16px)",
        WebkitBackdropFilter: "blur(16px)",
        border: "1px solid rgba(255,255,255,0.09)",
        borderRadius: "12px md:14px",
        boxShadow: "0 12px 32px rgba(0,0,0,0.7), 0 0 0 0.5px rgba(1,144,249,0.15)",
      }}
    >
      <p
        className="text-[11.5px] md:text-[13px]"
        style={{
          fontFamily: "var(--font-space-grotesk)",
          fontWeight: 700, color: "#fff", margin: 0,
        }}
      >
        {title}
      </p>
      <p
        className="text-[10px] md:text-[12px]"
        style={{
          fontFamily: "var(--font-inter)",
          color: "rgba(255,255,255,0.5)", lineHeight: 1.35, margin: "4px 0 0",
        }}
      >
        {desc}
      </p>
    </div>
  )
}

function PillButton({
  href,
  children,
  solid = false,
}: {
  href: string
  children: React.ReactNode
  solid?: boolean
}) {
  const ref = useRef<HTMLAnchorElement>(null)
  const onMove = (e: React.MouseEvent) => {
    const el = ref.current
    if (!el) return
    const r = el.getBoundingClientRect()
    el.style.setProperty("--mx", `${e.clientX - r.left}px`)
    el.style.setProperty("--my", `${e.clientY - r.top}px`)
  }
  return (
    <Link
      ref={ref}
      href={href}
      onMouseMove={onMove}
      className="btn-liquid inline-flex items-center rounded-full select-none justify-center"
      style={{
        transition: "all 200ms ease",
        ...(solid
          ? {
              background: "linear-gradient(to right,#1d9bff,#0040e0)",
              boxShadow: "0 0 24px rgba(1,144,249,0.4)",
            }
          : {
              background: "rgba(0,0,0,0.55)",
              border: "1.8px solid #1a50ee",
            }),
      }}
    >
      <span
        className="text-[14px] md:text-[15px] p-[0.6rem_0.8rem_0.6rem_1.1rem] md:p-[0.7rem_0.9rem_0.7rem_1.3rem]"
        style={{
          fontFamily: "var(--font-space-grotesk)",
          fontWeight: 600, color: "#fff",
          lineHeight: 1,
        }}
      >
        {children}
      </span>
      <span
        className="w-[32px] h-[32px] md:w-[36px] md:h-[36px]"
        style={{
          margin: "0 5px 0 0", borderRadius: "50%",
          background: "#fff", display: "flex", alignItems: "center",
          justifyContent: "center", flexShrink: 0,
        }}
      >
        <svg width="13" height="13" viewBox="0 0 15 15" fill="none" aria-hidden className="md:w-[15px] md:h-[15px]">
          <path
            d="M3 7.5h9M8 3.5l4 4-4 4"
            stroke="#111"
            strokeWidth="1.9"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </span>
    </Link>
  )
}