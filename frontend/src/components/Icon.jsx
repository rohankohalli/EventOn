import React from "react";

// Ultra-Premium EventOn Logo
// Concept: "Unlocking the Experience"
// A perfect 3D isometric structure representing the platform bringing together the 3 key roles.
// - Left Wall: The Venue Owners (Foundation)
// - Right Wall: The Organizers (Structure)
// - Floating Lid: The Users (Access/Discovery)
// - Glowing Core: The Event itself, radiating from the convergence of the three.
const AppIcon = ({ size = 28, className = "" }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 100 100"
    fill="none"
    className={className}
    xmlns="http://www.w3.org/2000/svg"
  >
    <defs>
      <linearGradient id="eventon-core" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#10b981" /> {/* Emerald 500 */}
        <stop offset="100%" stopColor="#0d9488" /> {/* Teal 600 */}
      </linearGradient>
    </defs>
    
    {/* Left Wall (Venue) */}
    <path d="M 12 56 L 48 74 V 94 L 12 76 Z" fill="currentColor" opacity="0.4" />
    
    {/* Right Wall (Organizer) */}
    <path d="M 52 74 L 88 56 V 76 L 52 94 Z" fill="currentColor" opacity="0.15" />
    
    {/* Glowing Core (The Event) */}
    <path d="M 50 35 L 86 53 L 50 71 L 14 53 Z" fill="url(#eventon-core)" />

    {/* Floating Lid (The User) */}
    <path d="M 50 10 L 88 29 L 50 48 L 12 29 Z" fill="currentColor" opacity="0.9" />
  </svg>
);

export default AppIcon;
