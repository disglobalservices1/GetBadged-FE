import { Shield } from "lucide-react";
import { cn } from "@/lib/utils/cn";

type LogoProps = {
  inverted?: boolean;
};

export function Logo({ inverted = false }: LogoProps) {
  return (
    <div className="flex items-center gap-2" aria-label="GetBadged">
      <div
        className={cn(
          "flex h-10 w-10 items-center justify-center rounded-md text-white",
          inverted ? "border border-white/30 bg-white/10" : "bg-[color:var(--blue)]"
        )}
      >
        <Shield size={23} fill="white" strokeWidth={1.8} />
      </div>
      <div className="grid text-sm font-extrabold leading-none">
        <span className={inverted ? "text-white" : "text-[color:var(--navy)]"}>GET</span>
        <span className="text-[color:var(--gold)]">BADGED</span>
      </div>
    </div>
  );
}
