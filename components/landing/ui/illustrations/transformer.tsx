export const TransformIllustration = () => {
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

        <filter id="glow-rope" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="4" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>

        <linearGradient id="chaos-fade" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0" />
          <stop offset="40%" stopColor="#FFFFFF" stopOpacity="0.3" />
          <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0.7" />
        </linearGradient>

        <linearGradient id="rope-fade" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#FFFFFF" stopOpacity="1" />
          <stop offset="85%" stopColor="#FFFFFF" stopOpacity="1" />
          <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
        </linearGradient>
      </defs>



      <g stroke="url(#chaos-fade)" fill="none" strokeLinecap="round">
        <path
          d="M-50 80 C 100 100, 250 180, 390 195"
          strokeWidth="0.5"
          opacity="0.4"
        />
        <path
          d="M-20 120 C 120 130, 280 190, 390 198"
          strokeWidth="1"
          opacity="0.6"
        />
        <path
          d="M50 50 C 150 100, 220 170, 380 192"
          strokeWidth="0.5"
          opacity="0.3"
        />
        <path
          d="M0 150 C 100 150, 250 195, 390 200"
          strokeWidth="0.8"
          opacity="0.5"
        />
        <path
          d="M-60 200 C 50 200, 200 200, 380 200"
          strokeWidth="1.5"
          opacity="0.2"
        />
        <path
          d="M-40 220 C 100 210, 250 200, 390 200"
          strokeWidth="0.5"
          opacity="0.4"
        />
        <path
          d="M-50 320 C 100 300, 250 220, 390 205"
          strokeWidth="0.5"
          opacity="0.4"
        />
        <path
          d="M-20 280 C 120 270, 280 210, 390 202"
          strokeWidth="1"
          opacity="0.6"
        />
        <path
          d="M50 350 C 150 300, 220 230, 380 208"
          strokeWidth="0.5"
          opacity="0.3"
        />
        <path
          d="M0 250 C 100 250, 250 205, 390 200"
          strokeWidth="0.8"
          opacity="0.5"
        />
      </g>

      <mask id="rope-mask">
        <rect x="400" y="150" width="400" height="100" fill="url(#rope-fade)" />
      </mask>
      <g
        mask="url(#rope-mask)"
        filter="url(#glow-rope)"
        fill="none"
        strokeLinecap="round"
      >
        <path
          d="M430 200 Q 530 225 630 200 T 830 200"
          stroke="#1148b8"
          strokeWidth="4"
          opacity="1"
        />
        <path
          d="M430 200 Q 530 175 630 200 T 830 200"
          stroke="#487be0"
          strokeWidth="3"
          opacity="0.9"
        />
        <path
          d="M430 200 Q 540 215 640 200 T 840 200"
          stroke="#0d3890"
          strokeWidth="2"
          opacity="0.8"
        />
        <path
          d="M430 200 Q 520 190 610 200 T 790 200"
          stroke="#7da5f5"
          strokeWidth="1.5"
          opacity="0.7"
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
