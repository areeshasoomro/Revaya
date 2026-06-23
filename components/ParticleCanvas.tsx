"use client"

import { useEffect, useRef } from "react"

interface Node {
  x: number
  y: number
  vx: number
  vy: number
  r: number
  phase: number
  speed: number
}

export default function ParticleCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const mouse = { x: -9999, y: -9999 }
    let raf = 0
    const COUNT = 85
    const LINK_DIST = 155
    const MOUSE_RADIUS = 130
    let nodes: Node[] = []

    function init() {
      canvas!.width = window.innerWidth
      canvas!.height = window.innerHeight
      nodes = Array.from({ length: COUNT }, () => ({
        x: Math.random() * canvas!.width,
        y: Math.random() * canvas!.height,
        vx: (Math.random() - 0.5) * 0.45,
        vy: (Math.random() - 0.5) * 0.45,
        r: Math.random() * 1.6 + 0.7,
        phase: Math.random() * Math.PI * 2,
        speed: 0.018 + Math.random() * 0.018,
      }))
    }

    function draw(ts: number) {
      const W = canvas!.width
      const H = canvas!.height
      ctx!.clearRect(0, 0, W, H)

      for (let i = 0; i < nodes.length; i++) {
        const n = nodes[i]

        // Subtle mouse repulsion
        const mdx = n.x - mouse.x
        const mdy = n.y - mouse.y
        const md = Math.sqrt(mdx * mdx + mdy * mdy)
        if (md < MOUSE_RADIUS) {
          const f = ((MOUSE_RADIUS - md) / MOUSE_RADIUS) * 0.018
          n.vx += (mdx / md) * f
          n.vy += (mdy / md) * f
        }

        n.vx *= 0.997
        n.vy *= 0.997
        n.x += n.vx
        n.y += n.vy
        n.phase += n.speed

        if (n.x < 0) { n.x = 0; n.vx = Math.abs(n.vx) }
        if (n.x > W) { n.x = W; n.vx = -Math.abs(n.vx) }
        if (n.y < 0) { n.y = 0; n.vy = Math.abs(n.vy) }
        if (n.y > H) { n.y = H; n.vy = -Math.abs(n.vy) }

        const pulse = n.r + Math.sin(n.phase) * 0.6

        // Outer glow halo
        const grd = ctx!.createRadialGradient(n.x, n.y, 0, n.x, n.y, pulse * 5)
        grd.addColorStop(0, "rgba(1,144,249,0.55)")
        grd.addColorStop(0.5, "rgba(1,144,249,0.12)")
        grd.addColorStop(1, "rgba(1,144,249,0)")
        ctx!.beginPath()
        ctx!.arc(n.x, n.y, pulse * 5, 0, Math.PI * 2)
        ctx!.fillStyle = grd
        ctx!.fill()

        // Core dot
        ctx!.beginPath()
        ctx!.arc(n.x, n.y, pulse, 0, Math.PI * 2)
        ctx!.fillStyle = `rgba(1,144,249,${0.7 + Math.sin(n.phase) * 0.25})`
        ctx!.fill()

        // Connections
        for (let j = i + 1; j < nodes.length; j++) {
          const n2 = nodes[j]
          const dx = n.x - n2.x
          const dy = n.y - n2.y
          const d = Math.sqrt(dx * dx + dy * dy)
          if (d < LINK_DIST) {
            const a = (1 - d / LINK_DIST) * 0.13
            ctx!.beginPath()
            ctx!.moveTo(n.x, n.y)
            ctx!.lineTo(n2.x, n2.y)
            ctx!.strokeStyle = `rgba(1,144,249,${a})`
            ctx!.lineWidth = 0.65
            ctx!.stroke()
          }
        }
      }

      raf = requestAnimationFrame(draw)
    }

    const onResize = () => init()
    const onMouse = (e: MouseEvent) => {
      mouse.x = e.clientX
      mouse.y = e.clientY
    }
    const onLeave = () => {
      mouse.x = -9999
      mouse.y = -9999
    }

    init()
    raf = requestAnimationFrame(draw)
    window.addEventListener("resize", onResize, { passive: true })
    window.addEventListener("mousemove", onMouse, { passive: true })
    window.addEventListener("mouseleave", onLeave)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener("resize", onResize)
      window.removeEventListener("mousemove", onMouse)
      window.removeEventListener("mouseleave", onLeave)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="particle-bg"
      aria-hidden
    />
  )
}
