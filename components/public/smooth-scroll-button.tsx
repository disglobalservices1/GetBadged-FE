"use client";

import { Button } from "@/components/ui/button";

type SmoothScrollButtonProps = {
  children: React.ReactNode;
  className?: string;
  targetId: string;
  variant?: "primary" | "secondary" | "ghost";
};

export function SmoothScrollButton({ children, className, targetId, variant = "secondary" }: SmoothScrollButtonProps) {
  function handleClick() {
    const target = document.getElementById(targetId);

    if (!target) return;

    target.scrollIntoView({ behavior: "smooth", block: "start" });
    window.history.replaceState(null, "", `#${targetId}`);
  }

  return (
    <Button type="button" variant={variant} className={className} onClick={handleClick}>
      {children}
    </Button>
  );
}
