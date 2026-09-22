import React from 'react';

/**
 * LightHut inline SVG logo — black "L", red "H", house roofline.
 * Using inline SVG avoids any path/MIME loading issues.
 */
export const LHLogo = ({ className = 'h-10 w-auto' }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 200 200"
    className={className}
    aria-label="LightHut Logo"
  >
    {/* White circle background */}
    <circle cx="100" cy="100" r="98" fill="#ffffff" />

    {/* Roof left slope */}
    <line x1="16" y1="112" x2="100" y2="36" stroke="#111111" strokeWidth="9" strokeLinecap="round" />
    {/* Roof right slope */}
    <line x1="184" y1="112" x2="100" y2="36" stroke="#111111" strokeWidth="9" strokeLinecap="round" />
    {/* Arch bottom curve */}
    <path d="M 16 112 Q 100 182 184 112" fill="none" stroke="#111111" strokeWidth="9" strokeLinecap="round" />

    {/* Black "L" */}
    <text
      x="28"
      y="170"
      fontFamily="Georgia, 'Times New Roman', serif"
      fontSize="118"
      fontWeight="900"
      fill="#111111"
    >
      L
    </text>

    {/* Red "H" */}
    <text
      x="90"
      y="170"
      fontFamily="Georgia, 'Times New Roman', serif"
      fontSize="118"
      fontWeight="900"
      fill="#CC1F1F"
    >
      H
    </text>
  </svg>
);
