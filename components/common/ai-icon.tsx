export const AiIcon = ({ size = 24, className = "" }) => {
    return (
        <svg
            width={size}
            height={size}
            viewBox="340 140 120 120"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={className}
        >
            <defs>
                <filter
                    id="surface-grain"
                    x="-50%"
                    y="-50%"
                    width="200%"
                    height="200%"
                >
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
                    <feComposite
                        operator="in"
                        in="textured"
                        in2="SourceGraphic"
                    />
                </filter>
                <radialGradient
                    id="sphere-surface"
                    cx="0.4"
                    cy="0.4"
                    r="0.6"
                    fx="0.25"
                    fy="0.25"
                >
                    <stop offset="0%" stopColor="#87b0ff" />
                    <stop offset="40%" stopColor="#1148b8" />
                    <stop offset="85%" stopColor="#0a2a70" />
                    <stop offset="100%" stopColor="#05153a" />
                </radialGradient>
                <radialGradient id="outer-glass" cx="0.5" cy="0.5" r="0.5">
                    <stop offset="50%" stopColor="#eef2ff" stopOpacity="0.2" />
                    <stop offset="90%" stopColor="#dbeafe" stopOpacity="0.6" />
                    <stop offset="100%" stopColor="#bfdbfe" stopOpacity="0.8" />
                </radialGradient>
                <filter
                    id="glow-rope"
                    x="-50%"
                    y="-50%"
                    width="200%"
                    height="200%"
                >
                    <feGaussianBlur stdDeviation="4" result="coloredBlur" />
                    <feMerge>
                        <feMergeNode in="coloredBlur" />
                        <feMergeNode in="SourceGraphic" />
                    </feMerge>
                </filter>
                <linearGradient
                    id="chaos-fade"
                    x1="0%"
                    y1="0%"
                    x2="100%"
                    y2="0%"
                >
                    <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0" />
                    <stop offset="40%" stopColor="#FFFFFF" stopOpacity="0.3" />
                    <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0.7" />
                </linearGradient>
                <linearGradient
                    id="rope-fade"
                    x1="0%"
                    y1="0%"
                    x2="100%"
                    y2="0%"
                >
                    <stop offset="0%" stopColor="#FFFFFF" stopOpacity="1" />
                    <stop offset="85%" stopColor="#FFFFFF" stopOpacity="1" />
                    <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
                </linearGradient>
            </defs>
            <g transform="translate(400, 200)">
                <circle cx="0" cy="0" r="50" fill="url(#outer-glass)" />
                <circle
                    cx="0"
                    cy="0"
                    r="50"
                    stroke="#1148b8"
                    strokeWidth="2"
                    strokeOpacity="0.1"
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
