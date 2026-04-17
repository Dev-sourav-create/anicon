"use client";

import { motion, useAnimation } from "framer-motion";

interface Props {
  size?: number;
  color?: string;
  className?: string;
  strokeWidth?: number;
}

export function ArrowDown({
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
        scaleY: [1, 1.18, 1],
        transition: {
          duration: 0.85,
          ease: "easeInOut",
        },
      }),

      headControls.start({
        scale: [1, 0.7, 1],
        scaleY: [1, 1.15, 1],
        y: [0, 4, 0],
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
        d="M12 5v14"
        animate={lineControls}
        style={{
          transformBox: "fill-box",
          transformOrigin: "center bottom",
        }}
      />

      {/* arrow head */}
      <motion.path
        d="m19 12-7 7-7-7"
        animate={headControls}
        style={{
          transformBox: "fill-box",
          transformOrigin: "center center",
        }}
      />
    </motion.svg>
  );
}

export default ArrowDown;
