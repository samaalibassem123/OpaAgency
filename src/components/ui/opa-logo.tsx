import React from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface OpaLogoProps {
  variant?: "light" | "dark";
  className?: string;
  width?: number;
  height?: number;
  priority?: boolean;
}

export function OpaLogo({
  variant = "light",
  className,
  width = 140,
  height = 42,
  priority = false,
}: OpaLogoProps) {
  const src = variant === "light" ? "/images/opa-logo-light.png" : "/images/opa-logo-dark.png";

  return (
    <div className={cn("inline-flex items-center select-none", className)}>
      <Image
        src={src}
        alt="OPA Imprimerie — Our Print Agency"
        width={width}
        height={height}
        priority={priority}
        className="h-9 sm:h-10 w-auto object-contain"
      />
    </div>
  );
}
