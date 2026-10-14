'use client';

/* Bloom 3D Double-Layer Rolling Flip Button */
export function Action({
  href,
  children,
  muted = false,
  dark = false,
  onClick,
  className = '',
}) {
  const variantClass = dark
    ? 'bg-neutral-900 text-white hover:bg-black hover:shadow-lg'
    : muted
    ? 'bg-white/15 text-white backdrop-blur-md border border-white/20 hover:bg-white/25 hover:border-white/40'
    : 'bg-white text-neutral-900 shadow-sm hover:shadow-md hover:bg-neutral-50';

  return (
    <a
      className={`group relative inline-flex items-center justify-center rounded-full overflow-hidden h-[52px] px-7 text-[14.5px] font-medium tracking-tight whitespace-nowrap cursor-pointer transition-all duration-300 ${variantClass} ${className}`}
      href={href}
      onClick={onClick}
    >
      <div className="relative flex flex-col overflow-hidden h-5">
        <span className="inline-flex items-center gap-2 h-5 leading-5 transition-transform duration-500 ease-out group-hover:-translate-y-[120%]">
          <span>{children}</span>
          <span
            className="inline-block text-[15px] transition-transform duration-300 ease-out group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            aria-hidden="true"
          >
            ↗
          </span>
        </span>
        <span className="absolute top-0 left-0 inline-flex items-center gap-2 h-5 leading-5 translate-y-[120%] transition-transform duration-500 ease-out group-hover:translate-y-0">
          <span>{children}</span>
          <span
            className="inline-block text-[15px] transition-transform duration-300 ease-out group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            aria-hidden="true"
          >
            ↗
          </span>
        </span>
      </div>
    </a>
  );
}

export default Action;
