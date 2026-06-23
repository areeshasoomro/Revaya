"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import styles from "./ProcessSection.module.css";

/* ---------------------------------------------------------
   Tiny inline icons (no extra npm packages needed)
--------------------------------------------------------- */
function IconX() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <path d="M6 6l12 12M18 6L6 18" />
    </svg>
  );
}
function IconCheck() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 13l4 4L19 7" />
    </svg>
  );
}
function IconDoc() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
      <path d="M7 3h7l4 4v13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1Z" />
      <path d="M14 3v4h4M9 13h6M9 17h6" />
    </svg>
  );
}
function IconSheet() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3.5" y="4" width="17" height="16" rx="1.5" />
      <path d="M3.5 9.5h17M9 9.5V20M14.5 9.5V20" />
    </svg>
  );
}
function IconDb() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
      <ellipse cx="12" cy="5.5" rx="7.5" ry="2.8" />
      <path d="M4.5 5.5V12c0 1.5 3.4 2.8 7.5 2.8s7.5-1.3 7.5-2.8V5.5" />
      <path d="M4.5 12v6.5c0 1.5 3.4 2.8 7.5 2.8s7.5-1.3 7.5-2.8V12" />
    </svg>
  );
}
function IconWarn() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 3.5 21.5 20h-19L12 3.5Z" />
      <path d="M12 10v4M12 17h.01" />
    </svg>
  );
}
function IconGear() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="3.2" />
      <path d="M19.4 13.5a7.6 7.6 0 0 0 0-3l1.8-1.4-1.7-3-2.1.6a7.7 7.7 0 0 0-2.6-1.5L14.4 3h-4.8l-.4 2.2a7.7 7.7 0 0 0-2.6 1.5l-2.1-.6-1.7 3L4.6 10.5a7.6 7.6 0 0 0 0 3L2.8 14.9l1.7 3 2.1-.6c.76.66 1.64 1.17 2.6 1.5l.4 2.2h4.8l.4-2.2a7.7 7.7 0 0 0 2.6-1.5l2.1.6 1.7-3-1.8-1.4Z" />
    </svg>
  );
}
function IconChart() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 19h16" />
      <path d="M7 16V9M12 16V5M17 16v-7" />
    </svg>
  );
}
function IconBolt() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
      <path d="M13 2 4 14h6l-1 8 9-12h-6l1-8Z" />
    </svg>
  );
}

/* ---------------------------------------------------------
   Content — edit copy here, layout stays the same
--------------------------------------------------------- */
const MARQUEE_ITEMS = [
  "Custom ERP",
  "Web Applications",
  "SaaS Platforms",
  "Automation Systems",
  "UI/UX Design",
  "Mobile Development",
  "Integrations",
];

const PAIN_POINTS = [
  { label: "Manual Work", icon: <IconDoc /> },
  { label: "Excel Sheets", icon: <IconSheet /> },
  { label: "Duplicate Data", icon: <IconDb /> },
  { label: "Human Errors", icon: <IconWarn /> },
];

const GAINS = [
  { label: "Automation", icon: <IconGear /> },
  { label: "Centralized Data", icon: <IconDb /> },
  { label: "Real Time Insights", icon: <IconChart /> },
  { label: "Faster Operations", icon: <IconBolt /> },
];

type LinePoint = { x1: number; y1: number; x2: number; y2: number };

export default function ProcessSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const diagramRef = useRef<HTMLDivElement>(null);
  const sphereRef = useRef<HTMLDivElement>(null);
  const leftPillRefs = useRef<(HTMLDivElement | null)[]>([]);
  const rightPillRefs = useRef<(HTMLDivElement | null)[]>([]);

  const [lines, setLines] = useState<{ left: LinePoint[]; right: LinePoint[] }>({
    left: [],
    right: [],
  });
  const [svgSize, setSvgSize] = useState({ w: 0, h: 0 });

  // Measure pill badges + sphere, draw straight connector lines between them
  useEffect(() => {
    function computeLines() {
      const container = diagramRef.current;
      const sphere = sphereRef.current;
      if (!container || !sphere) return;

      const containerRect = container.getBoundingClientRect();
      // sphereRef is on the STATIC wrapper (.sphereWrap), not the rotating
      // inner element — measuring a spinning element gives a bounding box
      // that balloons in size as it rotates (a square rotated 45° measures
      // wider than at 0°), which is what was sending the lines off to
      // random wrong points.
      const sphereRect = sphere.getBoundingClientRect();
      setSvgSize({ w: containerRect.width, h: containerRect.height });

      const sphereCenter = {
        x: sphereRect.left + sphereRect.width / 2 - containerRect.left,
        y: sphereRect.top + sphereRect.height / 2 - containerRect.top,
      };
      const sphereRadius = Math.min(sphereRect.width, sphereRect.height) / 2;
      if (!sphereRadius) return;
      const spread = 0.5; // how far up/down the lines fan across the sphere

      function buildSide(
        refs: (HTMLDivElement | null)[],
        side: "left" | "right",
        total: number
      ): LinePoint[] {
        // total is passed in explicitly (PAIN_POINTS.length / GAINS.length)
        // rather than read from refs.length — the ref array is mutable and
        // isn't a reliable source of truth for "how many items should
        // there be", which was throwing off the fan spacing for every row
        // after the first.
        return refs
          .map((el, i) => {
            if (!el) return null;
            const r = el.getBoundingClientRect();
            const x1 = side === "left" ? r.right - containerRect.left : r.left - containerRect.left;
            const y1 = r.top + r.height / 2 - containerRect.top;

            const t = total > 1 ? i / (total - 1) : 0.5;
            // clamp defensively — offsetY can never legitimately exceed
            // spread * radius, so if it ever does, something upstream is
            // wrong and we cap it instead of letting the line fly off.
            const rawOffsetY = (t - 0.5) * 2 * spread * sphereRadius;
            const offsetY = Math.max(-spread * sphereRadius, Math.min(spread * sphereRadius, rawOffsetY));
            const dx = Math.sqrt(Math.max(sphereRadius * sphereRadius - offsetY * offsetY, 0));
            const x2 = side === "left" ? sphereCenter.x - dx : sphereCenter.x + dx;
            const y2 = sphereCenter.y + offsetY;

            return { x1, y1, x2, y2 };
          })
          .filter((v): v is LinePoint => v !== null);
      }

      setLines({
        left: buildSide(leftPillRefs.current, "left", PAIN_POINTS.length),
        right: buildSide(rightPillRefs.current, "right", GAINS.length),
      });
    }

    computeLines();

    // Recompute on any size change in the diagram (covers font swaps,
    // image loads, and the responsive breakpoint) instead of guessing
    // with fixed timeouts.
    const ro = new ResizeObserver(() => computeLines());
    if (diagramRef.current) ro.observe(diagramRef.current);
    if (sphereRef.current) ro.observe(sphereRef.current);

    window.addEventListener("resize", computeLines);

    if (typeof document !== "undefined" && "fonts" in document) {
      document.fonts.ready.then(computeLines).catch(() => {});
    }

    // Cheap safety net for anything ResizeObserver doesn't catch.
    const t1 = setTimeout(computeLines, 300);
    const t2 = setTimeout(computeLines, 1200);

    return () => {
      ro.disconnect();
      window.removeEventListener("resize", computeLines);
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, []);

  // Fade/slide in the pills as they scroll into view
  useEffect(() => {
    const rows = sectionRef.current?.querySelectorAll<HTMLElement>("[data-reveal]");
    if (!rows || rows.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.setAttribute("data-visible", "true");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2 }
    );

    rows.forEach((row) => observer.observe(row));
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className={styles.section}>
      {/* Top scrolling marquee */}
      <div className={styles.marqueeOuter}>
        <div className={styles.marqueeTrack}>
          {[0, 1].map((copy) => (
            <div className={styles.marqueeGroup} key={copy} aria-hidden={copy === 1}>
              {MARQUEE_ITEMS.map((item) => (
                <span className={styles.marqueeItem} key={item}>
                  {item}
                  <span className={styles.marqueeDash}>-</span>
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

      <div className={styles.inner}>
        <h2 className={styles.heading}>
          Your Business Has Grown.
          <br />
          Your Processes <span className={styles.highlight}>Haven&apos;t.</span>
        </h2>

        <p className={styles.subtext}>
          Disconnected tools, manual workflows, and scattered data create bottlenecks that limit
          growth. Revaya transforms complexity into a streamlined, intelligent operation.
        </p>

        <div className={styles.diagram} ref={diagramRef}>
          {/* connector lines, sit behind the pills + sphere */}
          <svg
            className={styles.linesSvg}
            width={svgSize.w}
            height={svgSize.h}
            aria-hidden="true"
          >
            {lines.left.map((l, i) => (
              <line key={`l-${i}`} x1={l.x1} y1={l.y1} x2={l.x2} y2={l.y2} className={styles.lineRed} />
            ))}
            {lines.right.map((l, i) => (
              <line key={`r-${i}`} x1={l.x1} y1={l.y1} x2={l.x2} y2={l.y2} className={styles.lineGreen} />
            ))}
          </svg>

          {/* Left column — pain points */}
          <div className={`${styles.col} ${styles.colLeft}`}>
            <div className={styles.topTagWrapper}>
              <span className={styles.sideTag}>What&apos;s holding you Back</span>
            </div>
            <ul className={styles.pillList}>
              {PAIN_POINTS.map((item, i) => (
                <li
                  key={item.label}
                  className={styles.pillRow}
                  data-reveal=""
                  style={{ transitionDelay: `${i * 90}ms` }}
                >
                  <div
                    className={styles.pillBody}
                    ref={(el) => {
                      leftPillRefs.current[i] = el;
                    }}
                  >
                    <span className={`${styles.badge} ${styles.badgeRed}`}>
                      <IconX />
                    </span>
                    <span className={styles.pillLabel}>{item.label}</span>
                    <span className={styles.pillIcon}>{item.icon}</span>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* Center — glowing sphere */}
          <div className={styles.sphereWrap} ref={sphereRef}>
            <div className={styles.sphereGlow} />
            <div className={styles.sphereSpin}>
              <Image
                src="/Ball.png"
                alt=""
                fill
                sizes="(max-width: 880px) 220px, 300px"
                className={styles.sphereImg}
                priority
              />
            </div>
            <Image
              src="/loogo.png"
              alt="Revaya"
              width={120}
              height={120}
              className={styles.logoImg}
            />
          </div>

          {/* Right column — gains */}
          <div className={`${styles.col} ${styles.colRight}`}>
            <div className={styles.topTagWrapper}>
              <span className={`${styles.sideTag} ${styles.sideTagRight}`}>What you Gain</span>
            </div>
            <ul className={styles.pillList}>
              {GAINS.map((item, i) => (
                <li
                  key={item.label}
                  className={styles.pillRow}
                  data-reveal=""
                  style={{ transitionDelay: `${i * 90}ms` }}
                >
                  <div
                    className={styles.pillBody}
                    ref={(el) => {
                      rightPillRefs.current[i] = el;
                    }}
                  >
                    <span className={`${styles.badge} ${styles.badgeGreen}`}>
                      <IconCheck />
                    </span>
                    <span className={styles.pillLabel}>{item.label}</span>
                    <span className={styles.pillIcon}>{item.icon}</span>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}