export const BuilderIllustration = () => {
  return (
    <svg
      width="450"
      height="800"
      viewBox="0 0 450 800"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <filter id="surface-grain" x="-50%" y="-50%" width="200%" height="200%">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.8"
            numOctaves="3"
            result="noise"
          />
          <feColorMatrix
            type="matrix"
            values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 0.4 0"
            in="noise"
            result="softNoise"
          />
          <feBlend
            mode="overlay"
            in="softNoise"
            in2="SourceGraphic"
            result="textured"
          />
          <feComposite operator="in" in="textured" in2="SourceGraphic" />
        </filter>

        <filter id="glow-intense" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="6" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>

        <filter id="glow-soft" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="2" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>

        <radialGradient
          id="sphere-surface"
          cx="0.4"
          cy="0.4"
          r="0.6"
          fx="0.25"
          fy="0.25"
        >
          <stop offset="0%" stopColor="#487be0" />
          <stop offset="40%" stopColor="#1148b8" />
          <stop offset="85%" stopColor="#061a45" />
          <stop offset="100%" stopColor="#020815" />
        </radialGradient>

        <radialGradient id="outer-glass" cx="0.5" cy="0.5" r="0.5">
          <stop offset="60%" stopColor="#000000" stopOpacity="0.1" />
          <stop offset="90%" stopColor="#000000" stopOpacity="0.8" />
          <stop offset="100%" stopColor="#000000" stopOpacity="0.95" />
        </radialGradient>

        <linearGradient id="cube-wire-fill" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#1e3a8a" stopOpacity="0.1" />
          <stop offset="100%" stopColor="#111827" stopOpacity="0.3" />
        </linearGradient>

        <linearGradient
          id="cube-solid-side"
          x1="0%"
          y1="0%"
          x2="100%"
          y2="100%"
        >
          <stop offset="0%" stopColor="#1e3a8a" />
          <stop offset="100%" stopColor="#111827" />
        </linearGradient>
        <linearGradient id="cube-solid-top" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#487be0" />
          <stop offset="100%" stopColor="#1e3a8a" />
        </linearGradient>

        <linearGradient
          id="cube-glass-side"
          x1="0%"
          y1="0%"
          x2="100%"
          y2="100%"
        >
          <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.1" />
          <stop offset="50%" stopColor="#7da5f5" stopOpacity="0.05" />
          <stop offset="100%" stopColor="#487be0" stopOpacity="0.2" />
        </linearGradient>
        <linearGradient id="cube-glass-top" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.4" />
          <stop offset="100%" stopColor="#7da5f5" stopOpacity="0.1" />
        </linearGradient>

        <linearGradient id="beam-hologram" x1="0%" y1="100%" x2="0%" y2="0%">
          <stop offset="0%" stopColor="#487be0" stopOpacity="0.4" />
          <stop offset="40%" stopColor="#487be0" stopOpacity="0.05" />
          <stop offset="100%" stopColor="#487be0" stopOpacity="0" />
        </linearGradient>

        <linearGradient id="thread-glow" x1="0%" y1="100%" x2="0%" y2="0%">
          <stop offset="0%" stopColor="#487be0" stopOpacity="0" />
          <stop offset="30%" stopColor="#7da5f5" stopOpacity="0.3" />
          <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0.8" />
        </linearGradient>

        <linearGradient id="thread-faint" x1="0%" y1="100%" x2="0%" y2="0%">
          <stop offset="0%" stopColor="#487be0" stopOpacity="0" />
          <stop offset="40%" stopColor="#487be0" stopOpacity="0.1" />
          <stop offset="100%" stopColor="#7da5f5" stopOpacity="0.4" />
        </linearGradient>
      </defs>



      <g transform="translate(225, 350) scale(0.8, 1)" opacity="0.3">
        <path
          d="M-225 0 L 225 0"
          stroke="#487be0"
          strokeWidth="1"
          opacity="0.2"
        />
        <path
          d="M0 -350 L 0 450"
          stroke="#487be0"
          strokeWidth="1"
          opacity="0.2"
        />
        <ellipse
          cx="0"
          cy="200"
          rx="200"
          ry="300"
          fill="url(#beam-hologram)"
          opacity="0.1"
        />
      </g>

      <g transform="translate(225, 350)" fill="none" strokeLinecap="round">
        <path
          d="M-140 480 C -180 300, -80 150, -10 50"
          stroke="url(#thread-faint)"
          strokeWidth="1.5"
          opacity="0.2"
        />
        <path
          d="M140 480 C 180 300, 80 150, 10 50"
          stroke="url(#thread-faint)"
          strokeWidth="1.5"
          opacity="0.2"
        />

        <path
          d="M-90 500 C -120 350, -40 180, -5 55"
          stroke="url(#thread-faint)"
          strokeWidth="1"
          opacity="0.15"
        />
        <path
          d="M90 500 C 120 350, 40 180, 5 55"
          stroke="url(#thread-faint)"
          strokeWidth="1"
          opacity="0.15"
        />

        <path
          d="M0 520 C -20 380, 20 220, 0 52"
          stroke="url(#thread-faint)"
          strokeWidth="0.8"
          opacity="0.2"
        />

        <path
          d="M-110 450 C -160 320, -90 120, -12 45"
          stroke="url(#thread-glow)"
          strokeWidth="1.2"
          opacity="0.7"
        />
        <path
          d="M110 450 C 160 320, 90 120, 12 45"
          stroke="url(#thread-glow)"
          strokeWidth="1.2"
          opacity="0.7"
        />

        <path
          d="M-70 460 C -110 350, -50 140, -8 48"
          stroke="url(#thread-glow)"
          strokeWidth="1"
          opacity="0.6"
        />
        <path
          d="M70 460 C 110 350, 50 140, 8 48"
          stroke="url(#thread-glow)"
          strokeWidth="1"
          opacity="0.6"
        />

        <path
          d="M-40 470 C -70 380, -30 180, -5 50"
          stroke="url(#thread-glow)"
          strokeWidth="0.9"
          opacity="0.5"
        />
        <path
          d="M40 470 C 70 380, 30 180, 5 50"
          stroke="url(#thread-glow)"
          strokeWidth="0.9"
          opacity="0.5"
        />

        <path
          d="M-20 450 C -40 360, -20 200, -3 50"
          stroke="url(#thread-glow)"
          strokeWidth="0.7"
          opacity="0.8"
        />
        <path
          d="M20 450 C 40 360, 20 200, 3 50"
          stroke="url(#thread-glow)"
          strokeWidth="0.7"
          opacity="0.8"
        />

        <path
          d="M0 480 C -10 350, 10 200, 0 50"
          stroke="url(#thread-glow)"
          strokeWidth="0.6"
          opacity="0.9"
        />
      </g>

      <g transform="translate(225, 350)">
        <path
          d="M-80 -260 L 80 -260 L 0 0 Z"
          fill="url(#beam-hologram)"
          style={{ mixBlendMode: "screen" }}
          opacity="0.4"
        />

        <g fill="#7da5f5" opacity="0.6" filter="url(#glow-intense)">
          <circle cx="-50" cy="-120" r="1" />
          <circle cx="60" cy="-200" r="1.5" />
          <circle cx="-20" cy="-300" r="1.2" />
        </g>

        <g transform="translate(0, -90)">
          <path
            d="M-60 -10 L 0 -30 L 60 -10 L 0 10 Z"
            fill="none"
            stroke="#1e3a8a"
            strokeWidth="0.5"
            strokeDasharray="2 2"
            opacity="0.5"
          />

          <path
            d="M-60 -10 L 0 10 L 0 40 L -60 20 Z"
            fill="url(#cube-wire-fill)"
            stroke="#487be0"
            strokeWidth="0.5"
            opacity="0.4"
          />
          <path
            d="M0 10 L 60 -10 L 60 20 L 0 40 Z"
            fill="url(#cube-wire-fill)"
            stroke="#487be0"
            strokeWidth="0.5"
            opacity="0.4"
          />

          <path
            d="M-60 -10 L 0 -30 L 60 -10 L 0 10 Z"
            fill="none"
            stroke="#487be0"
            strokeWidth="1"
            opacity="0.6"
          />

          <path
            d="M0 40 L 0 10"
            stroke="#487be0"
            strokeWidth="0.5"
            opacity="0.3"
          />
        </g>

        <g transform="translate(0, -170)">
          <path
            d="M-70 -15 L 0 10 L 0 35 L -70 10 Z"
            fill="url(#cube-solid-side)"
            stroke="none"
            opacity="0.9"
          />
          <path
            d="M0 10 L 70 -15 L 70 10 L 0 35 Z"
            fill="#0d3890"
            stroke="none"
            opacity="0.9"
          />
          <path
            d="M-70 -15 L 0 -40 L 70 -15 L 0 10 Z"
            fill="url(#cube-solid-top)"
            stroke="none"
            opacity="0.9"
          />
          <path
            d="M0 10 L 0 35"
            stroke="#7da5f5"
            strokeWidth="0.5"
            opacity="0.3"
            fill="none"
          />
          <path
            d="M-70 -15 L 0 -40 L 70 -15"
            stroke="#7da5f5"
            strokeWidth="1"
            opacity="0.5"
            fill="none"
          />
        </g>

        <g transform="translate(0, -250)">
          <ellipse
            cx="0"
            cy="-15"
            rx="40"
            ry="15"
            fill="#487be0"
            opacity="0.4"
            filter="url(#glow-soft)"
          />

          <path
            d="M-80 -20 L 0 5 L 0 30 L -80 5 Z"
            fill="url(#cube-glass-side)"
            stroke="none"
          />
          <path
            d="M0 5 L 80 -20 L 80 5 L 0 30 Z"
            fill="url(#cube-glass-side)"
            stroke="none"
            style={{ mixBlendMode: "screen" }}
          />
          <path
            d="M-80 -20 L 0 -45 L 80 -20 L 0 5 Z"
            fill="url(#cube-glass-top)"
            stroke="none"
          />

          <path
            d="M-80 -20 L 0 5 L 80 -20"
            stroke="white"
            strokeWidth="1.5"
            opacity="0.9"
            fill="none"
          />
          <path
            d="M0 5 L 0 30"
            stroke="white"
            strokeWidth="1.5"
            opacity="0.8"
            fill="none"
          />
          <path
            d="M-80 -20 L 0 -45 L 80 -20"
            stroke="white"
            strokeWidth="2"
            opacity="1"
            fill="none"
            filter="url(#glow-soft)"
          />

          <path
            d="M-80 -20 L -75 -20 M -80 -25 L -80 -15"
            stroke="white"
            strokeWidth="1"
            opacity="0.8"
          />
        </g>
      </g>

      <g transform="translate(225, 350)">
        <circle cx="0" cy="0" r="50" fill="url(#outer-glass)" />
        <circle
          cx="0"
          cy="0"
          r="50"
          stroke="#000000"
          strokeWidth="3"
          strokeOpacity="0.9"
        />
        <g>
          <circle cx="0" cy="0" r="38" fill="url(#sphere-surface)" />
          <circle
            cx="0"
            cy="0"
            r="38"
            fill="#888"
            filter="url(#surface-grain)"
            opacity="0.5"
            style={{ mixBlendMode: "overlay" }}
          />

          <ellipse
            cx="0"
            cy="-35"
            rx="20"
            ry="8"
            fill="#FFFFFF"
            opacity="0.6"
            filter="url(#glow-intense)"
          />
        </g>

        <path
          d="M-30 -35 A 45 45 0 0 1 30 -35"
          stroke="white"
          strokeWidth="1.5"
          strokeOpacity="0.2"
          fill="none"
          strokeLinecap="round"
        />
        <path
          d="M-20 42 A 42 42 0 0 0 20 42"
          stroke="white"
          strokeWidth="1"
          strokeOpacity="0.15"
          fill="none"
          strokeLinecap="round"
        />
      </g>
    </svg>
  );
};
