"use client";

import { motion } from "framer-motion";

type Variant = "hover" | "click";

interface Props {
  size?: number;
  color?: string;
  className?: string;
  strokeWidth?: number;
  variant?: Variant;
  open?: boolean;
}

export default function ChevronDown({
  size = 20,
  color,
  className = "",
  strokeWidth = 1.5,
  variant = "hover",
  open = false,
}: Props) {
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
      initial={false}
      animate={
        variant === "click"
          ? {
              rotate: open ? 180 : 0,
            }
          : {}
      }
      whileHover={
        variant === "hover"
          ? {
              y: [0, 2, 0],
            }
          : {}
      }
      transition={{
        duration: 0.3,
        ease: "easeInOut",
      }}
    >
      <motion.path d="m6 9 6 6 6-6" />
    </motion.svg>
  );
}
