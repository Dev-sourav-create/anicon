"use client";

import { motion, useAnimation } from "framer-motion";

type Variant = "hover" | "click";

interface Props {
  size?: number;
  color?: string;
  className?: string;
  variant?: Variant;
}

export function Check({
  size = 24,
  color,
  className = "",
  variant = "click",
}: Props) {
  const controls = useAnimation();

  const play = async () => {
    controls.set({
      pathLength: 0,
      opacity: 0,
    });

    await controls.start({
      pathLength: 1,
      opacity: 1,
      transition: {
        duration: 0.4,
      },
    });
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
      style={{ cursor: "pointer" }}
      onHoverStart={variant === "hover" ? play : undefined}
      onClick={variant === "click" ? play : undefined}
    >
      <motion.path
        d="M4 12 L9 17 L20 6"
        initial={{
          pathLength: 1,
          opacity: 1,
        }}
        animate={controls}
      />
    </motion.svg>
  );
}

export default Check;
