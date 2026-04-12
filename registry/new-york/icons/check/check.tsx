"use client";
import { useRef, useCallback } from "react";

type Variant = "draw" | "bounce" | "pop";

const VARIANTS: Record<
  Variant,
  {
    trigger: "hover" | "click";
    duration: number;
    easing: string;
    keyframes: {
      check: Keyframe[];
    };
  }
> = {
  // Scales in from nothing — feels like "confirming"
  draw: {
    trigger: "click",
    duration: 450,
    easing: "cubic-bezier(0.34, 1.56, 0.64, 1)", // spring
    keyframes: {
      check: [
        { opacity: 0, transform: "scale(0.4) rotate(-10deg)", offset: 0 },
        { opacity: 1, transform: "scale(1.1) rotate(2deg)", offset: 0.7 },
        { opacity: 1, transform: "scale(1)   rotate(0deg)", offset: 1 },
      ],
    },
  },

  // Classic rubber-band bounce
  bounce: {
    trigger: "click",
    duration: 500,
    easing: "ease-in-out",
    keyframes: {
      check: [
        { transform: "scale(1)", offset: 0 },
        { transform: "scale(1.4)", offset: 0.3 },
        { transform: "scale(0.8)", offset: 0.6 },
        { transform: "scale(1.1)", offset: 0.8 },
        { transform: "scale(1)", offset: 1 },
      ],
    },
  },

  // Hover: quick upward pop
  pop: {
    trigger: "hover",
    duration: 320,
    easing: "cubic-bezier(0.34, 1.56, 0.64, 1)",
    keyframes: {
      check: [
        { transform: "scale(1)   translateY(0)", offset: 0 },
        { transform: "scale(1.2) translateY(-3px)", offset: 0.5 },
        { transform: "scale(1)   translateY(0)", offset: 1 },
      ],
    },
  },
};

interface Props {
  size?: number;
  variant?: Variant;
  color?: string;
  className?: string;
}

export function Check({
  size = 24,
  variant = "draw",
  color,
  className = "",
}: Props) {
  const svgRef = useRef<SVGSVGElement>(null);
  const animsRef = useRef<Animation[]>([]);
  const cfg = VARIANTS[variant];

  const play = useCallback(() => {
    if (!svgRef.current) return;
    animsRef.current.forEach((a) => a.cancel());
    animsRef.current = [];

    for (const [id, frames] of Object.entries(cfg.keyframes)) {
      const el = svgRef.current.querySelector<SVGElement>(`[data-id="${id}"]`);
      if (!el) continue;
      animsRef.current.push(
        el.animate(frames, {
          duration: cfg.duration,
          easing: cfg.easing,
          fill: "forwards",
        }),
      );
    }
  }, [cfg]);

  const handlers =
    cfg.trigger === "hover" ? { onMouseEnter: play } : { onClick: play };

  return (
    <svg
      ref={svgRef}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color ?? "currentColor"}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      style={{ cursor: "pointer" }}
      {...handlers}
    >
      {/* lucide check: single stroke path */}
      <path
        data-id="check"
        d="M20 6 9 17 4 12"
        style={{ transformOrigin: "12px 12px" }}
      />
    </svg>
  );
}

export default Check;
