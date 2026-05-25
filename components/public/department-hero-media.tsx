"use client";

import { useMemo, useState } from "react";
import { cn } from "@/lib/utils/cn";

type DepartmentHeroMediaProps = {
  departmentName: string;
  coverImageUrl: string;
  media: string[];
};

export function DepartmentHeroMedia({ departmentName, coverImageUrl, media }: DepartmentHeroMediaProps) {
  const images = useMemo(() => Array.from(new Set([coverImageUrl, ...media].filter(Boolean))), [coverImageUrl, media]);
  const [activeIndex, setActiveIndex] = useState(0);
  const activeImage = images[activeIndex] ?? coverImageUrl;

  return (
    <div className="relative h-64 overflow-hidden rounded-lg border border-[color:var(--border-muted)] bg-white shadow-sm sm:h-80 lg:h-[420px]">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={activeImage} alt={`${departmentName} media ${activeIndex + 1}`} className="h-full w-full object-cover" />

      {images.length > 1 ? (
        <div className="absolute bottom-5 left-1/2 flex -translate-x-1/2 items-center gap-3">
          {images.map((imageUrl, index) => (
            <button
              key={imageUrl}
              type="button"
              className={cn(
                "h-3 w-3 rounded-full shadow-sm transition focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-black/40",
                index === activeIndex ? "bg-white" : "bg-white/70 hover:bg-white"
              )}
              aria-label={`Show department media image ${index + 1}`}
              aria-current={index === activeIndex ? "true" : undefined}
              onClick={() => setActiveIndex(index)}
            />
          ))}
        </div>
      ) : null}

      <span className="absolute bottom-4 right-4 rounded-md bg-black/70 px-3 py-1.5 text-sm font-bold text-white">
        {activeIndex + 1} / {images.length || 1}
      </span>
    </div>
  );
}
