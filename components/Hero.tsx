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
      const wrap = wrapRef.current
      const brain = brainRef.current
      const cardRefs = [c1Ref.current, c2Ref.current, c3Ref.current]
      if (!wrap || !brain || cardRefs.some((c) => !c)) return

      const wr = wrap.getBoundingClientRect()
      const br = brain.getBoundingClientRect()

      const bcx = br.left + br.width * 0.5
      const bcy = br.top + br.height * 0.44

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
        const bax = bcx + (dx / d) * br.width * 0.48
        const bay = bcy + (dy / d) * br.height * 0.48

        const [fx, fy] = toSvg(px, py)
        const [tx, ty] = toSvg(bax, bay)

        newPaths.push(
          `M ${fx} ${fy} C ${fx + (tx - fx) * 0.5} ${fy}, ${fx + (tx - fx) * 0.5} ${ty}, ${tx} ${ty}`
        )
      })

      setPaths(newPaths)
    }

    calc()
    const ro = new ResizeObserver(calc)
    ro.observe(document.documentElement)
    window.addEventListener("resize", calc)
    window.addEventListener("scroll", calc, { passive: true })
    return () => {
      ro.disconnect()
      window.removeEventListener("resize", calc)
      window.removeEventListener("scroll", calc)
    }
  }, [])

  return (
    <section
      id="hero"
      ref={wrapRef}
      className="relative w-full overflow-hidden bg-black flex items-center justify-center"
      style={{ minHeight: "calc(100vh - 5rem)" }}
      onMouseMove={handleMouseMove}
    >
      <ParticleCanvas />

      {/* ── SVG Connector Network Lines ── */}
      <svg
        aria-hidden
        className="absolute inset-0 w-full h-full pointer-events-none"
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
        {/* Adjusted Grid Split: Gives left-side text explicit space advantages */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "52% 48%",
            alignItems: "center",
            minHeight: "calc(100vh - 8rem)",
          }}
        >
          {/* ── LEFT SIDE: Fixed Width Typography Core ── */}
          <motion.div
            variants={stagger}
            initial="hidden"
            animate="show"
            style={{ 
              paddingRight: "1.5rem",
              paddingLeft: "0rem",
              paddingTop: "0rem",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
            }}
          >
            <motion.h1
              variants={fadeUp}
              style={{
                fontFamily: "var(--font-space-grotesk)",
                fontSize: "clamp(2.3rem, 3.4vw, 4rem)",
                fontWeight: 700,
                lineHeight: 1.12,
                letterSpacing: "-0.03em",
                margin: -2,
              }}
            >
              {/* Prevents premature wrap breaks via explicit nowrap mechanics */}
              <span style={{ display: "block", color: "#fff", whiteSpace: "nowrap" }}>
                We Build Software That
              </span>
              <span
                style={{
                  display: "block",
                  color: "#0190F9",
                  marginTop: "0.2em",
                  whiteSpace: "nowrap",
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
                marginTop: "3rem",
                maxWidth: "460px",
              }}
            >
              From ERP and HRMS to SaaS platforms and business automation, we deliver
              scalable technology solutions that streamline operations and accelerate
              success.
            </motion.p>

            <motion.div
              variants={fadeUp}
              style={{
                marginTop: "2.4rem",
                display: "flex",
                flexWrap: "wrap",
                gap: "1rem",
                alignItems: "center",
              }}
            >
              <PillButton href="#" solid>Start Your Project</PillButton>
              <PillButton href="#">View Case Studies</PillButton>
            </motion.div>
          </motion.div>

          {/* ── RIGHT SIDE: Protected Image & Node Space Canvas ── */}
          <div style={{ position: "relative", height: "100%", minHeight: "580px", overflow: "visible" }}>

            {/* Centralized Brain Vector Cluster */}
            <motion.div
              ref={brainRef}
              style={{
                x: bx,
                y: by,
                position: "absolute",
                right: "-6%",
                top: "40%",
                transform: "translate(0%, -50%)",
                width: "clamp(320px, 92%, 460px)",
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
                
                {/* Fixed Image Contain parameters ensuring total system visibility */}
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
              style={{ position: "absolute", left: "2%", top: "16%", zIndex: 30 }}
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
              style={{ position: "absolute", right: "-4%", top: "6%", zIndex: 30 }}
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
              style={{ position: "absolute", left: "-16%", top: "52%", zIndex: 30 }}
            >
              <AnnotationCard
                title="Scalable Platforms"
                desc="Technology built to grow with your organization."
              />
            </motion.div>

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
      style={{
        width: "205px",
        background: "rgba(5,8,20,0.85)",
        backdropFilter: "blur(16px)",
        WebkitBackdropFilter: "blur(16px)",
        border: "1px solid rgba(255,255,255,0.09)",
        borderRadius: "14px",
        padding: "12px 14px",
        boxShadow: "0 12px 32px rgba(0,0,0,0.7), 0 0 0 0.5px rgba(1,144,249,0.15)",
      }}
    >
      <p
        style={{
          fontFamily: "var(--font-space-grotesk)", fontSize: "13px",
          fontWeight: 700, color: "#fff", margin: 0,
        }}
      >
        {title}
      </p>
      <p
        style={{
          fontFamily: "var(--font-inter)", fontSize: "12px",
          color: "rgba(255,255,255,0.5)", lineHeight: 1.5, margin: "4px 0 0",
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
      className="btn-liquid inline-flex items-center rounded-full select-none"
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
        style={{
          fontFamily: "var(--font-space-grotesk)", fontSize: "15px",
          fontWeight: 600, color: "#fff",
          padding: "0.7rem 0.9rem 0.7rem 1.3rem", lineHeight: 1,
        }}
      >
        {children}
      </span>
      <span
        style={{
          margin: "0 5px 0 0", width: 36, height: 36, borderRadius: "50%",
          background: "#fff", display: "flex", alignItems: "center",
          justifyContent: "center", flexShrink: 0,
        }}
      >
        <svg width="15" height="15" viewBox="0 0 15 15" fill="none" aria-hidden>
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