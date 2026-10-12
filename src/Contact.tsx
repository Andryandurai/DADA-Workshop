import { useEffect, useRef, useState, type FormEvent } from 'react';
import { ArrowUpRight, Check, Copy, Download, Mail } from 'lucide-react';
import { activities, asset, contactEmail, workshops } from './data';
import { composeEnquiry, deliverEnquiry, emptyEnquiry, localDate, validateEnquiry, type EnquiryErrors, type EnquiryValues } from './enquiry';

interface Props { topics: string[]; setTopics: (ids: string[]) => void; selectedActivities: string[]; setActivities: (ids: string[]) => void }
export default function Contact({ topics, setTopics, selectedActivities, setActivities }: Props) {
  const [values, setValues] = useState<EnquiryValues>(emptyEnquiry);
  const [errors, setErrors] = useState<EnquiryErrors>({});
  const [draft, setDraft] = useState('');
  const [status, setStatus] = useState('');
  const [busy, setBusy] = useState(false);
  const [topicsOpen, setTopicsOpen] = useState(false);
  const form = useRef<HTMLFormElement>(null);
  const output = useRef<HTMLDivElement>(null);
  const inFlight = useRef(false);
  const request = useRef({ payload: '', id: '' });
  const endpoint = import.meta.env.VITE_ENQUIRY_ENDPOINT || '';
  useEffect(() => { setDraft(''); setStatus(''); setErrors(old => ({ ...old, topics: undefined })); }, [topics, selectedActivities]);
  function update<K extends keyof EnquiryValues>(key: K, value: EnquiryValues[K]) {
    setValues(old => ({ ...old, [key]: value })); setErrors(old => ({ ...old, [key]: undefined })); setDraft(''); setStatus('');
  }
  const props = (key: Exclude<keyof EnquiryValues, 'consent'>) => ({ id: `enquiry-${key}`, name: key, value: values[key], onChange: (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => update(key, event.target.value), 'aria-invalid': !!errors[key], 'aria-describedby': errors[key] ? `error-${key}` : undefined });
  const error = (key: keyof EnquiryErrors) => errors[key] && <span className="field-error" id={`error-${key}`}>{errors[key]}</span>;
  const toggle = (ids: string[], id: string) => ids.includes(id) ? ids.filter(value => value !== id) : [...ids, id];
  async function submit(event: FormEvent) {
    event.preventDefault(); if (inFlight.current) return;
    const next = validateEnquiry(values, topics); setErrors(next); setStatus('');
    if (Object.keys(next).length) {
      if (next.topics) setTopicsOpen(true);
      requestAnimationFrame(() => form.current?.querySelector<HTMLElement>('[aria-invalid="true"]')?.focus());
      return;
    }
    const text = composeEnquiry(values, topics, selectedActivities);
    if (!endpoint) { setDraft(text); requestAnimationFrame(() => output.current?.focus()); return; }
    inFlight.current = true; setBusy(true);
    const payload = { ...values, topics: workshops.filter(w => topics.includes(w.id)).map(w => w.title), activities: activities.filter(a => selectedActivities.includes(a.id)).map(a => a.title) };
    const serialised = JSON.stringify(payload);
    if (request.current.payload !== serialised) request.current = { payload: serialised, id: crypto.randomUUID() };
    try {
      const success = await deliverEnquiry(endpoint, payload, request.current.id);
      if (success) {
        setValues(emptyEnquiry); setTopics([]); setActivities([]); setDraft(''); request.current = { payload: '', id: '' };
        // Let selection effects settle before announcing the server-confirmed result.
        setTimeout(() => setStatus('Your enquiry has been received. This is not a booking confirmation; the team will discuss the details with you.'), 0);
      } else { setDraft(text); setStatus('Delivery could not be confirmed. Your details are still here. You can send the email draft below.'); }
    } finally { setBusy(false); inFlight.current = false; }
  }
  async function copy() {
    try { await navigator.clipboard.writeText(draft); setStatus('Enquiry copied. Paste it into an email to TEAM DADA and send it when ready.'); }
    catch { setStatus('Clipboard access is unavailable. Select the draft text below to copy it, or download it.'); }
  }
  function download() {
    const url = URL.createObjectURL(new Blob([draft], { type: 'text/plain;charset=utf-8' }));
    const a = document.createElement('a'); a.href = url; a.download = 'team-dada-workshop-enquiry.txt'; a.click(); setTimeout(() => URL.revokeObjectURL(url), 1000);
    setStatus('Draft downloaded. It has not been sent. Email it to TEAM DADA when ready.');
  }
  return <section id="contact" className="section contact-section" tabIndex={-1}>
    <div className="container"><div className="chapter"><span>[ 07 / LET’S CONNECT ]</span><span className="chapter-line" /></div>
      <div className="contact-layout"><div className="contact-copy">
        <h2>LET’S BRING<br />TECHNOLOGY<br /><span className="outline green-outline">TO YOUR CAMPUS.</span></h2>
        <p>Planning a school session, college workshop, or interactive technology event? Tell us about your audience and the topics you’re interested in. Let’s explore what TEAM DADA can create together.</p>
        <a className="contact-email" href={`mailto:${contactEmail}`}><Mail size={18} />{contactEmail}<ArrowUpRight size={18} /></a>
        <div className="contact-art"><img src={asset('mascot/dada-mature-waving.png')} alt="DADA mascot waving hello" width="1024" height="1536" loading="lazy" /><span className="sticker mono">GOOD IDEAS START<br />WITH A HELLO.</span></div>
      </div>
      <form ref={form} className="enquiry-form" onSubmit={submit} noValidate aria-busy={busy}>
        <div className="form-heading mono"><span>YOUR NEXT LEARNING EXPERIENCE</span><span>↗ DADA</span></div>
        <p className="form-note">Fields marked <span aria-hidden="true">*</span> are required.</p>
        <fieldset disabled={busy} className="form-fields"><legend className="sr-only">Institutional workshop enquiry</legend>
          <div className="form-row"><div className="field"><label htmlFor="enquiry-name">Your name *</label><input {...props('name')} required autoComplete="name" maxLength={120} placeholder="Your full name" />{error('name')}</div><div className="field"><label htmlFor="enquiry-email">Email address *</label><input {...props('email')} required autoComplete="email" type="email" maxLength={254} placeholder="you@institution.edu" />{error('email')}</div></div>
          <div className="field"><label htmlFor="enquiry-institution">School or college name *</label><input {...props('institution')} required autoComplete="organization" maxLength={180} placeholder="Your institution" />{error('institution')}</div>
          <div className="form-row"><div className="field"><label htmlFor="enquiry-institutionType">Institution type *</label><select {...props('institutionType')} required><option value="">Select type</option><option>School</option><option>College</option><option>Other</option></select>{error('institutionType')}</div><div className="field"><label htmlFor="enquiry-audience">Student audience *</label><select {...props('audience')} required><option value="">Select audience</option><option>Classes 8–10</option><option>Classes 11–12</option><option>College</option><option>Mixed audience</option></select>{error('audience')}</div></div>
          <fieldset className="selection-field"><legend>Interested workshop topics *</legend><details open={topicsOpen} onToggle={e => setTopicsOpen(e.currentTarget.open)}><summary>{topics.length ? `${topics.length} topic${topics.length > 1 ? 's' : ''} selected` : 'Choose your workshops'}<span>Multiple selections</span></summary><div className="check-list">{workshops.map((workshop, index) => <label key={workshop.id}><input type="checkbox" checked={topics.includes(workshop.id)} onChange={() => setTopics(toggle(topics, workshop.id))} aria-invalid={index === 0 && !!errors.topics} aria-describedby={errors.topics ? 'error-topics' : undefined} />{workshop.title}</label>)}</div></details>{error('topics')}</fieldset>
          <fieldset className="selection-field"><legend>Interested activities <small>Optional</small></legend><details><summary>{selectedActivities.length ? `${selectedActivities.length} ${selectedActivities.length === 1 ? 'activity' : 'activities'} selected` : 'Add a creative challenge'}<span>Optional</span></summary><div className="check-list">{activities.map(activity => <label key={activity.id}><input type="checkbox" checked={selectedActivities.includes(activity.id)} onChange={() => setActivities(toggle(selectedActivities, activity.id))} />{activity.title}</label>)}</div></details></fieldset>
          <div className="form-row"><div className="field"><label htmlFor="enquiry-date">Preferred date <small>Optional</small></label><input {...props('date')} type="date" min={localDate()} />{error('date')}</div><div className="field"><label htmlFor="enquiry-participants">Participants <small>Optional</small></label><input {...props('participants')} type="number" min="1" max="100000" step="1" placeholder="Estimated group size" />{error('participants')}</div></div>
          <div className="field"><label htmlFor="enquiry-message">Anything else? <small>Optional</small></label><textarea {...props('message')} rows={4} maxLength={3000} placeholder="Learning goals, facilities, accessibility needs, or questions…" /></div>
          <label className="consent"><input id="enquiry-consent" type="checkbox" checked={values.consent} onChange={e => update('consent', e.target.checked)} required aria-invalid={!!errors.consent} aria-describedby={errors.consent ? 'error-consent' : undefined} />I agree to be contacted by TEAM DADA about this enquiry. *</label>{error('consent')}
          <p className="delivery-note">{endpoint ? 'Your details will be shared with TEAM DADA to respond to this enquiry.' : 'This form prepares an email draft. Your details stay in this page until you open your email app, copy, or download the draft. You send the email yourself.'}</p>
          <button className="button form-submit" type="submit" disabled={busy}>{busy ? 'Sending enquiry…' : endpoint ? 'Send enquiry' : 'Prepare email enquiry'}<ArrowUpRight size={20} /></button>
        </fieldset>
        {status && <p className="form-status" role="status">{status}</p>}
        {draft && <div ref={output} tabIndex={-1} className="draft-panel" aria-label="Prepared email enquiry"><h3><Check size={20} />Your enquiry is ready to send.</h3><p>No message has been sent yet. Open the draft in your email app and send it to <strong>{contactEmail}</strong>. If it does not open, copy or download the draft.</p><div className="draft-actions"><a className="button" href={`mailto:${contactEmail}?subject=${encodeURIComponent(`Workshop enquiry — ${values.institution.trim()}`)}&body=${encodeURIComponent(draft)}`}>Open in email app<Mail size={18} /></a><button type="button" className="subtle-button" onClick={copy}><Copy size={16} />Copy draft</button><button type="button" className="subtle-button" onClick={download}><Download size={16} />Download</button></div><details><summary>Read your email draft</summary><pre>{draft}</pre></details></div>}
      </form></div>
    </div>
  </section>;
}
