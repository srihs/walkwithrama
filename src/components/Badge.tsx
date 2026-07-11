export default function Badge({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-3">
      <span aria-hidden className="size-2.5 rounded-full bg-accent" />
      <span className="text-xs font-semibold uppercase tracking-[0.25em] text-foam">
        {children}
      </span>
    </span>
  );
}
