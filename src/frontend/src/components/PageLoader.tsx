export default function PageLoader() {
  return (
    <div
      className="flex items-center justify-center min-h-[200px] w-full"
      aria-live="polite"
      aria-label="Loading page"
      data-ocid="page.loading_state"
    >
      <div className="flex flex-col items-center gap-3">
        <div className="relative h-9 w-9">
          <div className="absolute inset-0 h-9 w-9 rounded-full border-2 border-primary/20" />
          <div className="absolute inset-0 h-9 w-9 rounded-full border-2 border-transparent border-t-primary animate-spin" />
        </div>
        <span className="text-xs text-muted-foreground tracking-wide">
          Loading…
        </span>
      </div>
    </div>
  );
}
