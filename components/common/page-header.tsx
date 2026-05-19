type PageHeaderProps = {
  eyebrow?: string;
  eyebrowClassName?: string;
  title: string;
  description?: string;
};

export function PageHeader({ eyebrow, eyebrowClassName, title, description }: PageHeaderProps) {
  return (
    <div className="grid gap-2">
      {eyebrow ? <p className={eyebrowClassName ?? "text-xs font-bold uppercase text-[color:var(--blue)]"}>{eyebrow}</p> : null}
      <h1 className="text-3xl font-bold text-[color:var(--navy)]">{title}</h1>
      {description ? <p className="max-w-3xl text-sm leading-6 text-[color:var(--muted)]">{description}</p> : null}
    </div>
  );
}
