"use client";

interface CTAButtonProps {
  label: string;
  href?: string;
  onClick?: () => void;
  variant: "primary" | "secondary";
  download?: boolean;
}

export function CTAButton({
  label,
  href,
  onClick,
  variant,
  download,
}: CTAButtonProps) {
  const baseStyles =
    "inline-flex items-center justify-center rounded-md px-8 py-3 min-h-[44px] min-w-[44px] text-lg font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-[#0a0a0a]";

  const variantStyles =
    variant === "primary"
      ? "text-white hover:opacity-90 focus:ring-purple-900"
      : "border border-white/30 bg-transparent text-white hover:bg-white/10 focus:ring-white/50";

  const className = `${baseStyles} ${variantStyles}`;

  const style =
    variant === "primary"
      ? { background: "linear-gradient(to right, rgb(15, 23, 42), rgb(88, 28, 135), rgb(15, 23, 42))" }
      : undefined;

  if (href) {
    return (
      <a
        href={href}
        className={className}
        style={style}
        {...(download ? { download: true } : {})}
      >
        {label}
      </a>
    );
  }

  return (
    <button type="button" onClick={onClick} className={className} style={style}>
      {label}
    </button>
  );
}
