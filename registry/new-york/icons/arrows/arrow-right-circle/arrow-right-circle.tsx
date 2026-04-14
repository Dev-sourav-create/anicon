"use client";

import { motion, useAnimation } from "framer-motion";

interface Props {
  size?: number;
  color?: string;
  className?: string;
  strokeWidth?: number;
}

export function ArrowRightCircle({
  size = 24,
  color,
  className = "",
  strokeWidth = 2,
}: Props) {
  const arrow1 = useAnimation();
  const arrow2 = useAnimation();

  const handleHover = async () => {
    await Promise.all([
      arrow1.start({
        x: [0, 8],
        scaleX: [1, 0],
        scaleY: [1, 0.55],
        transition: {
          duration: 0.45,
          ease: [0.4, 0, 0.2, 1],
        },
      }),

      arrow2.start({
        x: [-9, 0],
        scaleX: [0, 1],
        scaleY: [0.25, 1],
        transition: {
          duration: 0.45,
          delay: 0.22,
          ease: [0.4, 0, 0.2, 1],
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
      <circle cx="12" cy="12" r="10" />

      {/* outgoing arrow */}
      <motion.path
        d="M11 16 L15 12 L11 8"
        animate={arrow1}
        style={{ originX: 1 }}
      />

      {/* incoming arrow */}
      <motion.path
        d="M11 16 L15 12 L11 8"
        animate={arrow2}
        initial={{ x: -2, scaleX: 0.1 }}
        style={{ originX: 0.5 }}
      />
    </motion.svg>
  );
}

export default ArrowRightCircle;
