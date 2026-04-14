"use client";

import { motion, useAnimation } from "framer-motion";

interface Props {
  size?: number;
  color?: string;
  className?: string;
  strokeWidth?: number;
}

export function ArrowRight({
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
        scaleX: [1, 1.25, 1],
        originX: 0,
        transition: {
          duration: 0.85,
          ease: "easeInOut",
        },
      }),

      headControls.start({
        scale: [1, 0.7, 1],
        x: [0, 3, 0],
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
      <motion.path d="M5 12h12" animate={lineControls} />

      {/* arrow head */}
      <motion.path d="m12 5 7 7-7 7" animate={headControls} />
    </motion.svg>
  );
}

export default ArrowRight;
{
  /* <svg
  xmlns="http://www.w3.org/2000/svg"
  width="24"
  height="24"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round"
  class="lucide lucide-arrow-right-icon lucide-arrow-right"
>
  <path d="M5 12h14" />
  <path d="m12 5 7 7-7 7" />
</svg>; */
}
