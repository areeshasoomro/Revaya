"use client"

import React from "react"
import Image from "next/image"
import Link from "next/link"

export default function Footer() {
  const currentYear = new Date().getFullYear()

  const corporateLinks = [
    { label: "About", href: "#hero" },
    { label: "Services", href: "#services" },
    { label: "Case Studies", href: "#cases" },
    { label: "Insights", href: "#insights" },
    { label: "Contact us", href: "#contact" },
  ]

  const serviceLinks = [
    { label: "Custom ERP Solutions", href: "#" },
    { label: "SaaS Platforms", href: "#" },
    { label: "Web Applications", href: "#" },
    { label: "Automation Systems", href: "#" },
    { label: "UI/UX Design", href: "#" },
    { label: "Mobile Development", href: "#" },
  ]

  const legalLinks = [
    { label: "Privacy Policy", href: "#" },
    { label: "Terms of Service", href: "#" },
  ]

  return (
    <footer 
      style={{
        width: "100%",
        backgroundColor: "#000000",
        borderTop: "1px solid rgba(255, 255, 255, 0.08)",
        position: "relative",
        zIndex: 50,
      }}
    >
      {/* Central Wrapper Grid */}
      <div
        style={{
          maxWidth: "1340px",
          margin: "0 auto",
          padding: "5rem 2rem 2.5rem 2rem",
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
            gap: "3.5rem",
            marginBottom: "4rem",
          }}
        >
          {/* Logo & Corporate Vision Block */}
          <div style={{ display: "flex", flexDirection: "column", gap: "1.4rem" }}>
            <Link href="/" style={{ display: "inline-block" }}>
              <Image
                src="/loogo.png" 
                alt="Revaya Logo"
                width={124}
                height={42}
                style={{ objectFit: "contain" }}
                priority
              />
            </Link>
            <p
              style={{
                fontFamily: "var(--font-inter)",
                fontSize: "14px",
                color: "rgba(255, 255, 255, 0.52)",
                lineHeight: "1.65",
                maxWidth: "280px",
                margin: 0,
              }}
            >
              Architecting production-ready custom business platforms, automations, and enterprise frameworks.
            </p>
          </div>

          {/* Navigation Links Column */}
          <div>
            <h4
              style={{
                fontFamily: "var(--font-space-grotesk)",
                fontSize: "15px",
                fontWeight: 600,
                color: "#ffffff",
                letterSpacing: "0.06em",
                textTransform: "uppercase",
                marginBottom: "1.25rem",
                marginTop: 0,
              }}
            >
              Navigation
            </h4>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "0.8rem" }}>
              {corporateLinks.map((link, idx) => (
                <li key={idx}>
                  <Link
                    href={link.href}
                    style={{
                      fontFamily: "var(--font-inter)",
                      fontSize: "14px",
                      color: "rgba(255, 255, 255, 0.6)",
                      textDecoration: "none",
                      transition: "color 0.2s ease, transform 0.2s ease",
                      display: "inline-block"
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.color = "#0190F9"
                      e.currentTarget.style.transform = "translateX(3px)"
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.color = "rgba(255, 255, 255, 0.6)"
                      e.currentTarget.style.transform = "translateX(0px)"
                    }}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Targeted System Solutions Column */}
          <div>
            <h4
              style={{
                fontFamily: "var(--font-space-grotesk)",
                fontSize: "15px",
                fontWeight: 600,
                color: "#ffffff",
                letterSpacing: "0.06em",
                textTransform: "uppercase",
                marginBottom: "1.25rem",
                marginTop: 0,
              }}
            >
              Services
            </h4>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "0.8rem" }}>
              {serviceLinks.map((link, idx) => (
                <li key={idx}>
                  <Link
                    href={link.href}
                    style={{
                      fontFamily: "var(--font-inter)",
                      fontSize: "14px",
                      color: "rgba(255, 255, 255, 0.6)",
                      textDecoration: "none",
                      transition: "color 0.2s ease, transform 0.2s ease",
                      display: "inline-block"
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.color = "#0190F9"
                      e.currentTarget.style.transform = "translateX(3px)"
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.color = "rgba(255, 255, 255, 0.6)"
                      e.currentTarget.style.transform = "translateX(0px)"
                    }}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Clean Isolation Border Line */}
        <div 
          style={{ 
            width: "100%", 
            height: "1px", 
            backgroundColor: "rgba(255, 255, 255, 0.08)",
            marginBottom: "1.75rem"
          }} 
        />

        {/* Copyright Metadata and Legal Links */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "space-between",
            alignItems: "center",
            gap: "1.5rem",
          }}
        >
          <p
            style={{
              fontFamily: "var(--font-inter)",
              fontSize: "13px",
              color: "rgba(255, 255, 255, 0.45)",
              margin: 0,
            }}
          >
            &copy; {currentYear} Revaya. All rights reserved.
          </p>

          <div style={{ display: "flex", gap: "1.75rem" }}>
            {legalLinks.map((link, idx) => (
              <Link
                key={idx}
                href={link.href}
                style={{
                  fontFamily: "var(--font-inter)",
                  fontSize: "13px",
                  color: "rgba(255, 255, 255, 0.45)",
                  textDecoration: "none",
                  transition: "color 0.2s ease",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "#ffffff")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255, 255, 255, 0.45)")}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}