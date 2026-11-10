'use client';

import { useEffect, useRef, useState } from 'react';

const DISMISS_KEY = 'zxi-visit-enquiry-dismissed';

export function VisitEnquiryModal() {
  const dialogRef = useRef(null);
  const firstFieldRef = useRef(null);
  const [open, setOpen] = useState(false);
  const [sent, setSent] = useState(false);

  useEffect(() => {
    if (sessionStorage.getItem(DISMISS_KEY)) return undefined;

    const timer = window.setTimeout(() => setOpen(true), 4000);
    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog || !open) return undefined;

    dialog.showModal();
    const focusTimer = window.setTimeout(() => firstFieldRef.current?.focus(), 80);
    return () => window.clearTimeout(focusTimer);
  }, [open]);

  const close = () => {
    sessionStorage.setItem(DISMISS_KEY, 'true');
    const dialog = dialogRef.current;
    if (dialog?.open) dialog.close();
    setOpen(false);
  };

  const submitEnquiry = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const message = [
      'Hello ZXI, I would like to discuss an interior project.',
      `Name: ${data.get('name')}`,
      `Email: ${data.get('email')}`,
      `Phone: ${data.get('phone') || 'Not provided'}`,
      `Project type: ${data.get('projectType')}`,
    ].join('\n');
    window.open(`https://wa.me/971565499766?text=${encodeURIComponent(message)}`, '_blank', 'noopener,noreferrer');
    setSent(true);
    sessionStorage.setItem(DISMISS_KEY, 'true');
  };

  return (
    <dialog
      ref={dialogRef}
      className="visit-enquiry-dialog"
      aria-labelledby="visit-enquiry-title"
      onCancel={(event) => {
        event.preventDefault();
        close();
      }}
      onClick={(event) => {
        if (event.target === event.currentTarget) close();
      }}
    >
      <div className={`visit-enquiry-panel${sent ? ' is-sent' : ''}`}>
        <button type="button" className="visit-enquiry-close" onClick={close} aria-label="Close enquiry form">×</button>
        {sent ? (
          <div className="visit-enquiry-success" role="status">
            <p>Enquiry received</p>
            <h2 id="visit-enquiry-title">Thank you.</h2>
            <span>We&rsquo;ll continue the conversation on WhatsApp.</span>
            <button type="button" onClick={close}>Return to the site <b aria-hidden="true">↗</b></button>
          </div>
        ) : (
          <>
            <header className="visit-enquiry-intro">
              <p>ZXI Interiors &amp; Contracting · Dubai</p>
              <h2 id="visit-enquiry-title">Let&rsquo;s begin with your space.</h2>
              <span>A few details are all we need to start a considered conversation.</span>
            </header>
            <form className="visit-enquiry-form" onSubmit={submitEnquiry}>
              <label><span>Your name</span><input ref={firstFieldRef} name="name" type="text" autoComplete="name" required placeholder="Full name" /></label>
              <label><span>Email address</span><input name="email" type="email" autoComplete="email" required placeholder="you@company.com" /></label>
              <label><span>Phone <em>optional</em></span><input name="phone" type="tel" autoComplete="tel" placeholder="+971" /></label>
              <label><span>Project type</span><select name="projectType" defaultValue="" required><option value="" disabled>Select an option</option><option>Residential interiors</option><option>Commercial fitout</option><option>Hospitality / retail</option><option>Custom furniture</option><option>Turnkey contracting</option></select></label>
              <button type="submit" className="visit-enquiry-submit"><span>Start an enquiry</span><b aria-hidden="true">↗</b></button>
            </form>
            <p className="visit-enquiry-note">Prefer a direct conversation? <a href="tel:+971565499766">+971 565 499 766</a></p>
          </>
        )}
      </div>
    </dialog>
  );
}

export default VisitEnquiryModal;
