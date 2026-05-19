"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils/cn";

type DepartmentMediaCarouselProps = {
  departmentName: string;
  images: string[];
};

export function DepartmentMediaCarousel({ departmentName, images }: DepartmentMediaCarouselProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeImage = images[activeIndex];

  function showPrevious() {
    setActiveIndex((current) => (current === 0 ? images.length - 1 : current - 1));
  }

  function showNext() {
    setActiveIndex((current) => (current === images.length - 1 ? 0 : current + 1));
  }

  if (images.length === 0) {
    return (
      <div className="rounded-lg border border-dashed border-[color:var(--border)] bg-white p-8 text-center text-sm font-semibold text-[color:var(--muted)]">
        No department media available.
      </div>
    );
  }

  return (
    <div className="grid gap-4">
      <div className="relative overflow-hidden rounded-lg border border-[color:var(--border-muted)] bg-white">
        <button type="button" className="block w-full" onClick={showNext} aria-label="Show next department media image">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={activeImage} alt={`${departmentName} media ${activeIndex + 1}`} className="h-72 w-full object-cover md:h-[420px]" />
        </button>

        {images.length > 1 ? (
          <>
            <button
              type="button"
              className="absolute left-4 top-1/2 inline-flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/70 bg-white/90 text-[color:var(--navy)] shadow-sm transition hover:bg-white"
              aria-label="Show previous department media image"
              onClick={showPrevious}
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              type="button"
              className="absolute right-4 top-1/2 inline-flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/70 bg-white/90 text-[color:var(--navy)] shadow-sm transition hover:bg-white"
              aria-label="Show next department media image"
              onClick={showNext}
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </>
        ) : null}
      </div>

      {images.length > 1 ? (
        <div className="flex justify-center">
          <div className="flex flex-wrap items-center justify-center gap-2">
            {images.map((imageUrl, index) => (
              <button
                key={imageUrl}
                type="button"
                className={cn(
                  "overflow-hidden rounded-md border-2 bg-white p-0.5 transition",
                  index === activeIndex
                    ? "border-[color:var(--blue-deep)] shadow-sm"
                    : "border-transparent opacity-70 hover:border-[color:var(--border)] hover:opacity-100"
                )}
                aria-label={`Show department media image ${index + 1}`}
                aria-current={index === activeIndex ? "true" : undefined}
                onClick={() => setActiveIndex(index)}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={imageUrl} alt="" className="h-10 w-14 rounded object-cover" />
              </button>
            ))}
          </div>
        </div>
      ) : null}
    </div>
  );
}
