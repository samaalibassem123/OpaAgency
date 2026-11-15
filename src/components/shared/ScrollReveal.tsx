"use client";

import React, { useEffect, useState } from "react";
import { motion, HTMLMotionProps } from "framer-motion";

export type RevealDirection = "up" | "down" | "left" | "right" | "scale" | "fade";

export interface ScrollRevealProps extends HTMLMotionProps<"div"> {
  children: React.ReactNode;
  direction?: RevealDirection;
  delay?: number;
  duration?: number;
  distance?: number;
  amount?: number | "some" | "all";
  once?: boolean;
  className?: string;
}

export function ScrollReveal({
  children,
  direction = "up",
  delay = 0,
  duration = 0.55,
  distance = 24,
  amount = 0.15,
  once = false,
  className,
  ...props
}: ScrollRevealProps) {
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setReduceMotion(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
    }
  }, []);

  const getInitial = () => {
    if (reduceMotion) return { opacity: 0 };
    switch (direction) {
      case "up":
        return { opacity: 0, y: distance };
      case "down":
        return { opacity: 0, y: -distance };
      case "left":
        return { opacity: 0, x: distance };
      case "right":
        return { opacity: 0, x: -distance };
      case "scale":
        return { opacity: 0, scale: 0.95, y: distance * 0.5 };
      case "fade":
      default:
        return { opacity: 0 };
    }
  };

  const getAnimate = () => {
    if (reduceMotion) return { opacity: 1 };
    return {
      opacity: 1,
      x: 0,
      y: 0,
      scale: 1,
    };
  };

  return (
    <motion.div
      initial={getInitial()}
      whileInView={getAnimate()}
      viewport={{ once, amount }}
      transition={{
        duration: reduceMotion ? 0.2 : duration,
        delay: reduceMotion ? 0 : delay,
        ease: [0.16, 1, 0.3, 1], // Signature fluid cubic bezier
      }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
}

export default ScrollReveal;
