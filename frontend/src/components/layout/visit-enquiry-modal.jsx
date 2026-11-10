'use client';

import { useEffect, useRef, useState } from 'react';

const DISMISS_KEY = 'zxi-visit-enquiry-dismissed';
const PROJECT_TYPES = ['Residential interiors', 'Commercial fitout', 'Hospitality / retail', 'Custom furniture', 'Turnkey contracting'];

export function VisitEnquiryModal() {
  const dialogRef = useRef(null);
  const firstFieldRef = useRef(null);
  const projectTypeRef = useRef(null);
  const [open, setOpen] = useState(false);
  const [sent, setSent] = useState(false);
  const [projectType, setProjectType] = useState('');
  const [projectMenuOpen, setProjectMenuOpen] = useState(false);
  const [projectTypeError, setProjectTypeError] = useState(false);

  useEffect(() => {
    if (sessionStorage.getItem(DISMISS_KEY)) return undefined;

    const timer = window.setTimeout(() => setOpen(true), 4000);
    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog || !open) return undefined;

    dialog.showModal();
    const previousHtmlOverflow = document.documentElement.style.overflow;
    const previousBodyOverflow = document.body.style.overflow;
    document.documentElement.style.overflow = 'hidden';
    document.body.style.overflow = 'hidden';
    window.__lenis?.stop();
    const focusTimer = window.setTimeout(() => firstFieldRef.current?.focus(), 80);
    return () => {
      window.clearTimeout(focusTimer);
      document.documentElement.style.overflow = previousHtmlOverflow;
      document.body.style.overflow = previousBodyOverflow;
      window.__lenis?.start();
    };
  }, [open]);

  useEffect(() => {
    if (!projectMenuOpen) return undefined;
    const revealMenu = window.requestAnimationFrame(() => {
      projectTypeRef.current?.scrollIntoView({ block: 'nearest' });
    });
    const closeMenu = (event) => {
      if (!projectTypeRef.current?.contains(event.target)) setProjectMenuOpen(false);
    };
    document.addEventListener('pointerdown', closeMenu);
    return () => {
      window.cancelAnimationFrame(revealMenu);
      document.removeEventListener('pointerdown', closeMenu);
    };
  }, [projectMenuOpen]);

  const close = () => {
    sessionStorage.setItem(DISMISS_KEY, 'true');
    const dialog = dialogRef.current;
    if (dialog?.open) dialog.close();
    setOpen(false);
  };

  const submitEnquiry = (event) => {
    event.preventDefault();
    if (!projectType) {
      setProjectTypeError(true);
      setProjectMenuOpen(true);
      return;
    }
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
      }}
    >
      <div className={`visit-enquiry-panel${sent ? ' is-sent' : ''}`}>
        <button type="button" className="visit-enquiry-close" onClick={close} aria-label="Close enquiry form">
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M5 5l14 14M19 5 5 19" />
          </svg>
        </button>
        {sent ? (
          <div className="visit-enquiry-success" role="status">
            <p>Enquiry received</p>
            <h2 id="visit-enquiry-title">Thank you.</h2>
            <span>We&rsquo;ll continue the conversation on WhatsApp.</span>
          </div>
        ) : (
          <>
            <header className="visit-enquiry-intro">
              <h2 id="visit-enquiry-title">Let&rsquo;s begin with your space.</h2>
            </header>
            <form className="visit-enquiry-form" onSubmit={submitEnquiry}>
              <label><span>Your name</span><input ref={firstFieldRef} name="name" type="text" autoComplete="name" required placeholder="Full name" /></label>
              <label><span>Email address</span><input name="email" type="email" autoComplete="email" required placeholder="you@company.com" /></label>
              <label><span>Phone <em>optional</em></span><input name="phone" type="tel" autoComplete="tel" placeholder="+971" /></label>
              <label className="visit-enquiry-project"><span>Project type</span><input type="hidden" name="projectType" value={projectType} /><div className="visit-enquiry-select" ref={projectTypeRef}><button type="button" className="visit-enquiry-select__trigger" aria-haspopup="listbox" aria-expanded={projectMenuOpen} aria-controls="visit-project-types" aria-describedby={projectTypeError ? 'visit-project-type-error' : undefined} onClick={() => setProjectMenuOpen((current) => !current)} onKeyDown={(event) => { if (event.key === 'ArrowDown') { event.preventDefault(); setProjectMenuOpen(true); } if (event.key === 'Escape') setProjectMenuOpen(false); }}><span>{projectType || 'Select an option'}</span><svg viewBox="0 0 12 8" aria-hidden="true"><path d="m1 1 5 5 5-5" /></svg></button>{projectMenuOpen && <ul id="visit-project-types" className="visit-enquiry-select__menu" role="listbox" aria-label="Project type">{PROJECT_TYPES.map((option) => <li role="option" aria-selected={projectType === option} key={option}><button type="button" onClick={() => { setProjectType(option); setProjectTypeError(false); setProjectMenuOpen(false); }}>{option}</button></li>)}</ul>}</div>{projectTypeError && <small id="visit-project-type-error" className="visit-enquiry-select__error">Please select a project type.</small>}</label>
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
