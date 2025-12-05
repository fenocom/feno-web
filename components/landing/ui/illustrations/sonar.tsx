export const SonarIllustration = () => {
  return (
    <svg
      width="100%"
      height="100%"
      viewBox="0 0 800 400"
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
          <stop offset="50%" stopColor="#000000" stopOpacity="0.2" />
          <stop offset="90%" stopColor="#000000" stopOpacity="0.8" />
          <stop offset="100%" stopColor="#000000" stopOpacity="0.95" />
        </radialGradient>

        <radialGradient id="zone-inner" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0%" stopColor="#1148b8" stopOpacity="0" />
          <stop offset="80%" stopColor="#1148b8" stopOpacity="0.1" />{" "}
          <stop offset="100%" stopColor="#1148b8" stopOpacity="0.2" />{" "}
        </radialGradient>

        <radialGradient id="zone-mid" cx="0.5" cy="0.5" r="0.5">
          <stop offset="50%" stopColor="#1148b8" stopOpacity="0" />{" "}
          <stop offset="90%" stopColor="#487be0" stopOpacity="0.08" />{" "}
          <stop offset="100%" stopColor="#487be0" stopOpacity="0.15" />
        </radialGradient>

        <radialGradient id="zone-outer" cx="0.5" cy="0.5" r="0.5">
          <stop offset="60%" stopColor="#1148b8" stopOpacity="0" />
          <stop offset="95%" stopColor="#1148b8" stopOpacity="0.05" />{" "}
          <stop offset="100%" stopColor="#1148b8" stopOpacity="0" />
        </radialGradient>

        <radialGradient id="sonar-beam" cx="0.5" cy="0.5" r="0.5">
          <stop offset="30%" stopColor="#1148b8" stopOpacity="0" />
          <stop offset="90%" stopColor="#487be0" stopOpacity="0.15" />
          <stop offset="100%" stopColor="#1148b8" stopOpacity="0" />
        </radialGradient>

        <radialGradient id="blip-glow" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0%" stopColor="#FFFFFF" stopOpacity="1" />
          <stop offset="40%" stopColor="#7da5f5" stopOpacity="0.5" />
          <stop offset="100%" stopColor="#1148b8" stopOpacity="0" />
        </radialGradient>

        <filter id="glow-strong" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="3" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>



      <g transform="translate(400, 200)">
        <circle cx="0" cy="0" r="280" fill="url(#zone-outer)" />
        <circle cx="0" cy="0" r="180" fill="url(#zone-mid)" />
        <circle cx="0" cy="0" r="100" fill="url(#zone-inner)" />
      </g>

      <g transform="translate(400, 200)">
        <circle
          cx="0"
          cy="0"
          r="100"
          stroke="#1148b8"
          strokeWidth="1"
          opacity="0.3"
        />
        <circle
          cx="0"
          cy="0"
          r="180"
          stroke="#487be0"
          strokeWidth="1"
          opacity="0.4"
          strokeDasharray="4 4"
        />
        <circle
          cx="0"
          cy="0"
          r="280"
          stroke="#1148b8"
          strokeWidth="1"
          opacity="0.2"
        />
        <line
          x1="-300"
          y1="0"
          x2="300"
          y2="0"
          stroke="#1148b8"
          strokeWidth="1"
          opacity="0.1"
        />
        <line
          x1="0"
          y1="-200"
          x2="0"
          y2="200"
          stroke="#1148b8"
          strokeWidth="1"
          opacity="0.1"
        />
      </g>

      <g filter="url(#glow-strong)">
        <g transform="translate(580, 120)">
          <circle cx="0" cy="0" r="4" fill="#FFFFFF" />
          <circle
            cx="0"
            cy="0"
            r="12"
            stroke="#7da5f5"
            strokeWidth="1.5"
            opacity="0.6"
          />
          <line
            x1="0"
            y1="0"
            x2="-180"
            y2="80"
            stroke="#7da5f5"
            strokeWidth="0.5"
            opacity="0.3"
            strokeDasharray="2 4"
          />
        </g>
        <g transform="translate(250, 280)">
          <circle cx="0" cy="0" r="3" fill="#a5c4ff" />
          <circle
            cx="0"
            cy="0"
            r="8"
            stroke="#487be0"
            strokeWidth="1"
            opacity="0.4"
          />
        </g>
        <g transform="translate(680, 200)">
          <circle cx="0" cy="0" r="2.5" fill="#FFFFFF" opacity="0.8" />
          <path
            d="M-8 -8 L -4 -8 M 4 -8 L 8 -8 M 8 8 L 4 8 M -4 8 L -8 8"
            stroke="#FFFFFF"
            strokeWidth="1"
            opacity="0.5"
            fill="none"
          />
          <path
            d="M-8 -8 L -8 -4 M 8 -8 L 8 -4 M 8 8 L 8 4 M -8 8 L -8 4"
            stroke="#FFFFFF"
            strokeWidth="1"
            opacity="0.5"
            fill="none"
          />
        </g>
        <g transform="translate(280, 140)">
          <circle cx="0" cy="0" r="6" fill="url(#blip-glow)" />
        </g>
      </g>

      <g transform="translate(400, 200)">
        <circle
          cx="0"
          cy="0"
          r="180"
          stroke="url(#sonar-beam)"
          strokeWidth="2"
          opacity="0.5"
        />
      </g>

      <g transform="translate(400, 200)">
        <circle cx="0" cy="0" r="50" fill="url(#outer-glass)" />
        <circle
          cx="0"
          cy="0"
          r="50"
          stroke="#000000"
          strokeWidth="2"
          strokeOpacity="0.8"
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
          <path
            d="M-4 0 L 4 0 M 0 -4 L 0 4"
            stroke="#050505"
            strokeWidth="1"
            opacity="0.4"
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
          strokeOpacity="0.1"
          fill="none"
          strokeLinecap="round"
        />
      </g>
    </svg>
  );
};
