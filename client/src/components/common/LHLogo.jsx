import React from 'react';

/**
 * NiceLamp inline SVG logo — Elegant golden lamp icon with sleek typography.
 */
export const LHLogo = ({ className = 'h-10 w-auto' }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 240 60"
    className={className}
    aria-label="NiceLamp Logo"
    fill="none"
  >
    {/* Glowing Lamp Icon Mark */}
    <g transform="translate(4, 6)">
      {/* Ceiling canopy & cord */}
      <line x1="24" y1="0" x2="24" y2="8" stroke="#D4AF37" strokeWidth="2.5" strokeLinecap="round" />
      
      {/* Lamp Shade Dome */}
      <path
        d="M 6 26 C 6 15 14 10 24 10 C 34 10 42 15 42 26 Z"
        fill="url(#goldGradientIcon)"
      />

      {/* Radiant warm light bulb glow */}
      <circle cx="24" cy="30" r="4.5" fill="#FFFBEB" filter="drop-shadow(0 0 6px #F59E0B)" />

      {/* Decorative base ring */}
      <line x1="4" y1="26" x2="44" y2="26" stroke="#FDE68A" strokeWidth="2" strokeLinecap="round" />

      {/* Subtle light rays */}
      <path
        d="M 12 36 L 6 44 M 24 38 L 24 46 M 36 36 L 42 44"
        stroke="#D4AF37"
        strokeWidth="1.5"
        strokeLinecap="round"
        opacity="0.8"
      />
    </g>

    {/* Typography: "NICELAMP" */}
    <text
      x="62"
      y="32"
      fontFamily="'Plus Jakarta Sans', 'Playfair Display', sans-serif"
      fontSize="22"
      fontWeight="800"
      letterSpacing="2.5"
      fill="#FFFFFF"
    >
      NICE<tspan fill="#D4AF37">LAMP</tspan>
    </text>

    {/* Subtitle: "DECORATIVE LIGHTING" */}
    <text
      x="63"
      y="44"
      fontFamily="'Plus Jakarta Sans', sans-serif"
      fontSize="7.5"
      fontWeight="600"
      letterSpacing="3.5"
      fill="#94A3B8"
    >
      DECORATIVE LIGHTING
    </text>

    <defs>
      <linearGradient id="goldGradientIcon" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#F59E0B" />
        <stop offset="60%" stopColor="#D4AF37" />
        <stop offset="100%" stopColor="#B8860B" />
      </linearGradient>
    </defs>
  </svg>
);
