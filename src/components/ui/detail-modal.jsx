'use client';

import { Photo } from './photo';
import { Action } from './action';

export function DetailModal({ dialogRef, item, onClose }) {
  return (
    <dialog
      ref={dialogRef}
      className="fixed inset-0 m-auto w-[92vw] max-w-4xl max-h-[90dvh] border-0 rounded-2xl overflow-hidden shadow-2xl bg-white text-neutral-900 z-50 backdrop:bg-black/75 backdrop:backdrop-blur-md"
      onClick={(e) => {
        if (e.target === e.currentTarget && onClose) onClose();
      }}
    >
      <div className="relative max-h-[90dvh] overflow-y-auto">
        <button
          className="absolute right-5 top-5 z-20 w-10 h-10 rounded-full bg-white/20 hover:bg-white/40 text-white grid place-items-center text-xl transition-all cursor-pointer"
          aria-label="Close details"
          onClick={onClose}
        >
          ×
        </button>
        {item && (
          <>
            <div className="relative h-[40vh] sm:h-[48vh] min-h-[260px] bg-neutral-900">
              <Photo
                image={item.image}
                alt={item.title}
                sizes="(max-width: 767px) 100vw, 70vw"
              />
            </div>
            <div className="p-6 sm:p-10 md:p-12">
              <p className="text-xs uppercase tracking-widest text-neutral-500 font-medium">
                {item.category || 'ZXI Interior Services'}
              </p>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-normal tracking-tight my-3 text-neutral-900">
                {item.title}
              </h2>
              <p className="text-sm sm:text-base text-neutral-600 leading-relaxed max-w-2xl">
                {item.description ||
                  item.location ||
                  'Bespoke design, contracting, and space execution crafted with utmost precision.'}
              </p>
              <div className="mt-8">
                <Action
                  href={`mailto:info@zxi.ae?subject=${encodeURIComponent(
                    `Enquiry: ${item.title}`
                  )}`}
                  dark
                >
                  Discuss a similar project
                </Action>
              </div>
            </div>
          </>
        )}
      </div>
    </dialog>
  );
}

export default DetailModal;
