"use client";

import { useRef, useCallback, useEffect } from "react";

// Paths from lucide-react loader-circle
// path[0] → d="M21 12a9 9 0 1 1-6.219-8.56" = the spinning arc
// No second path — single arc element on a transparent circle

type Variant = "spin" | "pulse" | "ping";

const VARIANTS: Record<
  Variant,
  {
    trigger: "loop";
    duration: number;
    easing: string;
    keyframes: {
      arc?: Keyframe[];
      track?: Keyframe[];
    };
  }
> = {
  spin: {
    trigger: "loop",
    duration: 800,
    easing: "linear",
    keyframes: {
      arc: [
        { transform: "rotate(0deg)", offset: 0 },
        { transform: "rotate(360deg)", offset: 1 },
      ],
    },
  },

  pulse: {
    trigger: "loop",
    duration: 1200,
    easing: "ease-in-out",
    keyframes: {
      arc: [
        { opacity: 1, offset: 0 },
        { opacity: 0.1, offset: 0.5 },
        { opacity: 1, offset: 1 },
      ],
      track: [
        { opacity: 0.25, offset: 0 },
        { opacity: 0.05, offset: 0.5 },
        { opacity: 0.25, offset: 1 },
      ],
    },
  },

  ping: {
    trigger: "loop",
    duration: 1000,
    easing: "ease-out",
    keyframes: {
      arc: [
        { transform: "rotate(0deg)", opacity: 1, offset: 0 },
        { transform: "rotate(270deg)", opacity: 0.4, offset: 0.7 },
        { transform: "rotate(360deg)", opacity: 1, offset: 1 },
      ],
    },
  },
};

interface Props {
  size?: number;
  variant?: Variant;
  color?: string;
  className?: string;
  playing?: boolean;
}

export function LoaderCircle({
  size = 24,
  variant = "spin",
  color,
  className = "",
  playing = true,
}: Props) {
  const svgRef = useRef<SVGSVGElement>(null);
  const animsRef = useRef<Animation[]>([]);
  const cfg = VARIANTS[variant];

  // Start animations
  useEffect(() => {
    if (!svgRef.current) return;

    animsRef.current.forEach((a) => a.cancel());
    animsRef.current = [];

    for (const [id, frames] of Object.entries(cfg.keyframes)) {
      const el = svgRef.current.querySelector<SVGElement>(`[data-id="${id}"]`);
      if (!el || !frames) continue;
      const anim = el.animate(frames, {
        duration: cfg.duration,
        easing: cfg.easing,
        iterations: Infinity,
        fill: "forwards",
      });
      animsRef.current.push(anim);
    }

    return () => animsRef.current.forEach((a) => a.cancel());
  }, [variant]);

  // Pause / resume from outside
  useEffect(() => {
    animsRef.current.forEach((a) => {
      if (playing) a.play();
      else a.pause();
    });
  }, [playing]);

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
    >
      {/* faint full circle as track */}
      <circle data-id="track" cx={12} cy={12} r={9} strokeOpacity={0.25} />
      {/* lucide loader-circle arc — the animated spinner */}
      <path
        data-id="arc"
        d="M21 12a9 9 0 1 1-6.219-8.56"
        style={{ transformOrigin: "12px 12px" }}
      />
    </svg>
  );
}

export default LoaderCircle;
