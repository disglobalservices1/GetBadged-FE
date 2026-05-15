import Link from "next/link";
import type { ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils/cn";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  href?: string;
  variant?: "primary" | "secondary" | "ghost";
  iconLeft?: ReactNode;
  iconRight?: ReactNode;
};

export function Button({ href, variant = "primary", iconLeft, iconRight, className, children, ...props }: ButtonProps) {
  const classes = cn(
    "inline-flex min-h-11 items-center justify-center gap-2 rounded-md px-5 py-2 text-sm font-semibold transition focus:outline-none focus:ring-2 focus:ring-[color:var(--blue)] focus:ring-offset-2",
    variant === "primary" && "bg-[color:var(--blue-deep)] text-white hover:bg-[color:var(--navy)]",
    variant === "secondary" && "border border-[color:var(--blue-deep)] bg-white text-[color:var(--blue-deep)] hover:bg-[color:var(--surface-muted)]",
    variant === "ghost" && "bg-transparent text-[color:var(--blue-deep)] hover:bg-[color:var(--surface-muted)]",
    className
  );

  const content = (
    <>
      {iconLeft}
      <span>{children}</span>
      {iconRight}
    </>
  );

  if (href) {
    return (
      <Link href={href} className={classes}>
        {content}
      </Link>
    );
  }

  return (
    <button className={classes} {...props}>
      {content}
    </button>
  );
}
