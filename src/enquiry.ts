import { activities, workshops } from './data';

export interface EnquiryValues {
  name: string; email: string; institution: string; institutionType: string; audience: string;
  date: string; participants: string; message: string; consent: boolean;
}
export const emptyEnquiry: EnquiryValues = { name: '', email: '', institution: '', institutionType: '', audience: '', date: '', participants: '', message: '', consent: false };
export type EnquiryErrors = Partial<Record<keyof EnquiryValues | 'topics', string>>;
export function localDate() {
  const now = new Date();
  return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;
}
export function validateEnquiry(values: EnquiryValues, topics: string[]): EnquiryErrors {
  const errors: EnquiryErrors = {};
  if (!values.name.trim()) errors.name = 'Please enter your name.';
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim())) errors.email = 'Enter a valid email address, such as you@school.edu.';
  if (!values.institution.trim()) errors.institution = 'Please enter your institution’s name.';
  if (!values.institutionType) errors.institutionType = 'Choose an institution type.';
  if (!values.audience) errors.audience = 'Choose your student audience.';
  if (!topics.length) errors.topics = 'Select at least one workshop topic.';
  if (values.date && values.date < localDate()) errors.date = 'Choose today or a future date.';
  if (values.participants && (!/^\d+$/.test(values.participants) || Number(values.participants) < 1 || Number(values.participants) > 100000)) errors.participants = 'Enter a whole number between 1 and 100,000.';
  if (!values.consent) errors.consent = 'Please agree to be contacted about this enquiry.';
  return errors;
}
export function composeEnquiry(values: EnquiryValues, topics: string[], selectedActivities: string[]) {
  return `Hello TEAM DADA,\n\nWe would like to discuss a workshop for our institution.\n\nName: ${values.name.trim()}\nEmail: ${values.email.trim()}\nInstitution: ${values.institution.trim()}\nInstitution type: ${values.institutionType}\nStudent audience: ${values.audience}\n\nInterested workshops:\n${workshops.filter(w => topics.includes(w.id)).map(w => `- ${w.title}`).join('\n')}\n\nInterested activities:\n${activities.filter(a => selectedActivities.includes(a.id)).map(a => `- ${a.title}`).join('\n') || 'Open to suggestions'}\n\nPreferred date: ${values.date || 'To discuss'}\nExpected participants: ${values.participants || 'To discuss'}\n\nAdditional requirements:\n${values.message.trim() || 'None specified'}\n\nI agree to be contacted by TEAM DADA about this enquiry.\n\nThis is an enquiry, not a confirmed booking.`;
}

// Optional host-owned integration: POST JSON; only { success: true } confirms receipt.
// Never place service credentials in VITE_ variables; these are public build settings.
export async function deliverEnquiry(endpoint: string, payload: unknown, requestId: string) {
  try {
    const response = await fetch(endpoint, { method: 'POST', headers: { 'Content-Type': 'application/json', 'Idempotency-Key': requestId }, body: JSON.stringify(payload), signal: AbortSignal.timeout(15000) });
    const result = await response.json().catch(() => null);
    return response.ok && result?.success === true;
  } catch { return false; }
}
