"use client";

import { useRef, useCallback } from "react";

// Paths from lucide-react x (close/dismiss icon)
// path[0] → d="M18 6 6 18" = diagonal line top-right to bottom-left
// path[1] → d="m6 6 12 12" = diagonal line top-left to bottom-right

type Variant = "spin" | "shake" | "shrink";

const VARIANTS: Record<
  Variant,
  {
    trigger: "hover" | "click";
    duration: number;
    easing: string;
    keyframes: {
      line1: Keyframe[];
      line2: Keyframe[];
    };
  }
> = {
  // Both lines rotate 90deg together — looks like a spinning X
  spin: {
    trigger: "hover",
    duration: 350,
    easing: "ease-in-out",
    keyframes: {
      line1: [
        { transform: "rotate(0deg)", offset: 0 },
        { transform: "rotate(90deg)", offset: 1 },
      ],
      line2: [
        { transform: "rotate(0deg)", offset: 0 },
        { transform: "rotate(90deg)", offset: 1 },
      ],
    },
  },

  // Rapid side-to-side shake — "no" gesture
  shake: {
    trigger: "hover",
    duration: 420,
    easing: "ease-in-out",
    keyframes: {
      line1: [
        { transform: "translateX(0)", offset: 0 },
        { transform: "translateX(-3px)", offset: 0.2 },
        { transform: "translateX(3px)", offset: 0.4 },
        { transform: "translateX(-3px)", offset: 0.6 },
        { transform: "translateX(2px)", offset: 0.8 },
        { transform: "translateX(0)", offset: 1 },
      ],
      line2: [
        { transform: "translateX(0)", offset: 0 },
        { transform: "translateX(-3px)", offset: 0.2 },
        { transform: "translateX(3px)", offset: 0.4 },
        { transform: "translateX(-3px)", offset: 0.6 },
        { transform: "translateX(2px)", offset: 0.8 },
        { transform: "translateX(0)", offset: 1 },
      ],
    },
  },

  // Shrinks to zero then pops back — satisfying dismiss feel
  shrink: {
    trigger: "click",
    duration: 380,
    easing: "cubic-bezier(0.34, 1.56, 0.64, 1)",
    keyframes: {
      line1: [
        { transform: "scale(1)", offset: 0 },
        { transform: "scale(0)", offset: 0.4 },
        { transform: "scale(1.15)", offset: 0.7 },
        { transform: "scale(1)", offset: 1 },
      ],
      line2: [
        { transform: "scale(1)", offset: 0 },
        { transform: "scale(0)", offset: 0.4 },
        { transform: "scale(1.15)", offset: 0.7 },
        { transform: "scale(1)", offset: 1 },
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

export function X({
  size = 24,
  variant = "spin",
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
      {/* lucide x: top-right to bottom-left diagonal */}
      <path
        data-id="line1"
        d="M18 6 6 18"
        style={{ transformOrigin: "12px 12px" }}
      />
      {/* lucide x: top-left to bottom-right diagonal */}
      <path
        data-id="line2"
        d="m6 6 12 12"
        style={{ transformOrigin: "12px 12px" }}
      />
    </svg>
  );
}

export default X;
