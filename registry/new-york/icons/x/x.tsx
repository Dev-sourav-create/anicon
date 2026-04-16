"use client";

import { motion, useAnimation } from "framer-motion";

interface Props {
  size?: number;
  color?: string;
  className?: string;
}

export function X({ size = 24, color, className = "" }: Props) {
  const line1 = useAnimation();
  const line2 = useAnimation();

  const handleHover = async () => {
    await Promise.all([
      line1.start({
        d: ["M18 6 L6 18", "M6 12 L18 12", "M18 6 L6 18"],
        transition: {
          duration: 0.7,
          ease: "easeInOut",
        },
      }),

      line2.start({
        d: ["M6 6 L18 18", "M6 12 L18 12", "M6 6 L18 18"],
        transition: {
          duration: 0.7,
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
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      onHoverStart={handleHover}
      style={{ cursor: "pointer" }}
    >
      <motion.path d="M18 6 L6 18" animate={line1} />

      <motion.path d="M6 6 L18 18" animate={line2} />
    </motion.svg>
  );
}

export default X;
