import Link from "next/link";

type LogoProps = {
  inverted?: boolean;
  href?: string;
};

export function Logo({ inverted = false, href = "/" }: LogoProps) {
  return (
    <Link
      href={href}
      className="flex w-fit items-center gap-2 rounded-md focus:outline-none focus:ring-2 focus:ring-[color:var(--blue)] focus:ring-offset-2"
      aria-label="GetBadged home"
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/images/getbadged-mark.png" alt="" className="h-10 w-10 object-contain" />
      <div className="grid text-sm font-extrabold leading-none">
        <span className={inverted ? "text-white" : "text-[color:var(--navy)]"}>GET</span>
        <span className="text-[color:var(--gold)]">BADGED</span>
      </div>
    </Link>
  );
}
