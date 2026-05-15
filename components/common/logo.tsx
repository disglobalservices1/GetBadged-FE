import { Shield } from "lucide-react";

export function Logo() {
  return (
    <div className="flex items-center gap-2" aria-label="GetBadged">
      <div className="flex h-10 w-10 items-center justify-center rounded-md bg-[color:var(--blue)] text-white">
        <Shield size={23} fill="white" strokeWidth={1.8} />
      </div>
      <div className="grid text-sm font-extrabold leading-none">
        <span className="text-[color:var(--navy)]">GET</span>
        <span className="text-[color:var(--gold)]">BADGED</span>
      </div>
    </div>
  );
}
