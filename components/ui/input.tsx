"use client";

import type { InputEvent, InputHTMLAttributes } from "react";
import { cn } from "@/lib/utils/cn";

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  error?: string;
  format?: "phone";
};

function formatPhoneValue(value: string) {
  let digits = value.replace(/\D/g, "");

  if (digits.length > 10 && digits.startsWith("1")) {
    digits = digits.slice(1);
  }

  digits = digits.slice(0, 10);

  if (digits.length <= 3) {
    return digits ? `(${digits}` : "";
  }

  if (digits.length <= 6) {
    return `(${digits.slice(0, 3)}) ${digits.slice(3)}`;
  }

  return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`;
}

export function Input({ label, error, format, className, id, onInput, ...props }: InputProps) {
  const inputId = id ?? props.name ?? label?.toLowerCase().replace(/\s+/g, "-");
  const errorId = error ? `${inputId}-error` : undefined;
  const describedBy = [props["aria-describedby"], errorId].filter(Boolean).join(" ") || undefined;

  function handleInput(event: InputEvent<HTMLInputElement>) {
    if (format === "phone") {
      event.currentTarget.value = formatPhoneValue(event.currentTarget.value);
    }

    onInput?.(event);
  }

  return (
    <label className="grid content-start gap-2 text-sm font-semibold text-slate-700" htmlFor={inputId}>
      {label}
      <input
        id={inputId}
        className={cn(
          "h-11 rounded-md border border-[color:var(--border)] bg-white px-3 text-sm text-slate-950 outline-none transition placeholder:text-slate-400 focus:border-[color:var(--blue)] focus:ring-2 focus:ring-[rgba(27,51,181,0.12)]",
          error && "border-[color:var(--danger)] focus:border-[color:var(--danger)]",
          className
        )}
        {...props}
        aria-invalid={Boolean(error)}
        aria-describedby={describedBy}
        onInput={handleInput}
      />
      {error ? (
        <span id={errorId} className="text-xs font-medium text-[color:var(--danger)]">
          {error}
        </span>
      ) : null}
    </label>
  );
}
