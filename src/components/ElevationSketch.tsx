type Props = {
  variant?: "chair" | "sofa";
  className?: string;
};

/** Fine-line technical elevation sketch — the repeated brass motif. */
export function ElevationSketch({ variant = "chair", className }: Props) {
  const common = {
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.25,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    vectorEffect: "non-scaling-stroke" as const,
  };

  return (
    <svg
      viewBox="0 0 240 200"
      className={className}
      aria-hidden="true"
      role="presentation"
      preserveAspectRatio="xMidYMid meet"
    >
      {/* construction guides */}
      <g {...common} strokeWidth={0.5} strokeDasharray="4 5" opacity={0.7}>
        <line x1="10" y1="176" x2="230" y2="176" />
        <line x1="24" y1="14" x2="24" y2="190" />
      </g>

      {variant === "chair" ? (
        <g {...common}>
          <path d="M70 176V92c0-30 8-52 22-62 12-8 34-8 46 0 14 10 22 32 22 62v16" />
          <path d="M70 108h90" />
          <path d="M62 118h106c6 0 10 4 10 10v12H52v-12c0-6 4-10 10-10z" />
          <path d="M62 140l-6 36" />
          <path d="M168 140l6 36" />
          <path d="M78 140v36" />
          <path d="M152 140v36" />
          <path d="M52 128h-8" />
          <path d="M178 128h8" />
          <path d="M92 92c14-6 32-6 46 0" />
        </g>
      ) : (
        <g {...common}>
          <path d="M32 176v-58c0-10 6-16 15-16s15 6 15 16v18" />
          <path d="M208 176v-58c0-10-6-16-15-16s-15 6-15 16v18" />
          <path d="M62 136h116" />
          <path d="M62 120h116c6 0 10 4 10 10v22H52v-22c0-6 4-10 10-10z" />
          <path d="M120 120v16" />
          <path d="M62 100c18-8 38-12 58-12s40 4 58 12" />
          <path d="M52 152l-6 24" />
          <path d="M188 152l6 24" />
          <path d="M78 152v24" />
          <path d="M162 152v24" />
        </g>
      )}
    </svg>
  );
}
