'use client';

import { useState } from 'react';

export function FAQ({ items }) {
  const [openIndex, setOpenIndex] = useState(0);

  const toggle = (index) => {
    setOpenIndex(openIndex === index ? -1 : index);
  };

  return (
    <section
      id="faq"
      className="bg-[#f7f7f7] max-w-[1720px] mx-auto px-5 sm:px-10 lg:px-16 py-24 md:py-36"
    >
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-14">
        <div className="md:col-span-1">
          <p className="text-xs uppercase tracking-widest text-neutral-500 font-medium mb-3">
            Clarity & Trust
          </p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-normal tracking-tight text-neutral-900 md:sticky md:top-36 leading-tight">
            You asked,
            <br />
            we answered
          </h2>
        </div>
        <div className="md:col-span-2 flex flex-col divide-y divide-neutral-200 border-y border-neutral-200">
          {items.map((item, index) => {
            const isOpen = openIndex === index;
            return (
              <div key={item.question} className="transition-colors duration-200">
                <button
                  className="w-full py-6 sm:py-7 flex justify-between items-center gap-6 text-left text-lg sm:text-xl font-normal tracking-tight text-neutral-900 hover:text-amber-800 transition-colors cursor-pointer"
                  onClick={() => toggle(index)}
                  aria-expanded={isOpen}
                >
                  <span>{item.question}</span>
                  <span
                    className={`text-2xl transition-transform duration-300 text-neutral-700 ${isOpen ? 'rotate-45' : 'rotate-0'
                      }`}
                    aria-hidden="true"
                  >
                    +
                  </span>
                </button>
                <div
                  className={`overflow-hidden transition-all duration-400 ease-out ${isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                    }`}
                >
                  <p className="text-neutral-600 leading-relaxed max-w-2xl pb-7 text-sm sm:text-base">
                    {item.answer}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default FAQ;
