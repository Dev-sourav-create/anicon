"use client";

import { motion, useAnimation } from "framer-motion";

interface Props {
  size?: number;
  color?: string;
  className?: string;
  strokeWidth?: number;
}

function ArrowLeft({
  size = 24,
  color,
  className = "",
  strokeWidth = 2,
}: Props) {
  const lineControls = useAnimation();
  const headControls = useAnimation();

  const handleHover = async () => {
    await Promise.all([
      lineControls.start({
        scaleX: [1, 1.22, 1],
        x: [0, -4, 0],
        transition: {
          duration: 0.85,
          ease: "easeInOut",
        },
      }),

      headControls.start({
        scale: [1, 0.7, 1],
        x: [0, -6, 0],
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
      viewBox="0 0 24 24"
      fill="none"
      stroke={color ?? "currentColor"}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      onHoverStart={handleHover}
    >
      {/* line */}
      <motion.path
        d="M19 12H6"
        animate={lineControls}
        style={{
          transformBox: "fill-box",
          transformOrigin: "right center",
        }}
      />
      {/* arrow head */}
      <motion.path d="m11 19-7-7 7-7" animate={headControls} />
    </motion.svg>
  );
}

export default ArrowLeft;
