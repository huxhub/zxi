'use client';

/* Bloom 3D Double-Layer Rolling Flip Button */
export function Action({
  href,
  children,
  muted = false,
  dark = false,
  light = false,
  onClick,
  className = '',
}) {
  const variantClass = light
    ? 'bg-[#F5F0E7] text-[#282722] hover:bg-[#F7F3ED]'
    : dark
    ? 'bg-[#E8DDCC] text-[#282722] hover:bg-[#F5F0E7]'
    : muted
    ? 'bg-[#F5F0E7] text-[#282722] hover:bg-[#E8DDCC]'
    : 'bg-[#E8DDCC] text-[#282722] hover:bg-[#F5F0E7]';

  return (
    <a
      className={`group relative inline-flex items-center justify-center rounded-none overflow-hidden h-[52px] px-7 text-[14.5px] font-semibold tracking-tight whitespace-nowrap cursor-pointer transition-all duration-300 border-0 focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-[#282722] ${variantClass} ${className}`}
      href={href}
      onClick={onClick}
    >
      <div className="relative flex flex-col overflow-hidden h-5">
        <span className="inline-flex items-center gap-2 h-5 leading-5 transition-transform duration-500 ease-out group-hover:-translate-y-[120%] font-semibold">
          <span>{children}</span>
          <span
            className="inline-block text-[15px] transition-transform duration-300 ease-out group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            aria-hidden="true"
          >
            ↗
          </span>
        </span>
        <span className="absolute top-0 left-0 inline-flex items-center gap-2 h-5 leading-5 translate-y-[120%] transition-transform duration-500 ease-out group-hover:translate-y-0 font-semibold">
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
