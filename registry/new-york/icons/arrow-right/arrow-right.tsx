"use client";

import { motion, useAnimation } from "framer-motion";

interface Props {
  size?: number;
  color?: string;
  className?: string;
  strokeWidth?: number;
}

export function ArrowRight({
  size = 34,
  color,
  className = "",
  strokeWidth = 2,
}: Props) {
  const lineControls = useAnimation();
  const headControls = useAnimation();

  const handleHover = async () => {
    await Promise.all([
      lineControls.start({
        scaleX: [1, 1.35, 1],
        originX: 0,
        transition: {
          duration: 0.85,
          ease: "easeInOut",
        },
      }),

      headControls.start({
        scale: [1, 0.8, 1],
        x: [0, 6, 0],
        originX: 1,
        originY: 0.5,
        transition: {
          duration: 0.85,
          ease: "easeInOut",
        },
      }),
    ]);
  };

  return (
    <motion.svg
      width={size}
      height={size}
      viewBox="0 0 34 28"
      fill="none"
      stroke={color ?? "currentColor"}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      onHoverStart={handleHover}
    >
      {/* line */}
      <motion.path d="M5 12h19" animate={lineControls} />

      {/* arrow head */}
      <motion.path d="m19 5 7 7-7 7" animate={headControls} />
    </motion.svg>
  );
}

export default ArrowRight;
