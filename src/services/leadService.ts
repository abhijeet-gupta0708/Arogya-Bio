import { LeadFormData, LeadSubmissionPayload, LeadSubmissionResponse } from '../types';

const LOCAL_STORAGE_WEBHOOK_KEY = 'gouthealth_webhook_url';
const LOCAL_STORAGE_LEADS_KEY = 'gouthealth_saved_leads_history';

/**
 * Formats current Date into MM/DD/YYYY h:mma (e.g. 08/10/2026 9:33pm)
 */
export function formatLeadTimestamp(date: Date = new Date()): string {
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');
  const year = date.getFullYear();
  
  let hours = date.getHours();
  const minutes = date.getMinutes().toString().padStart(2, '0');
  const ampm = hours >= 12 ? 'pm' : 'am';
  
  hours = hours % 12;
  hours = hours ? hours : 12; // '0' becomes '12'
  
  return `${month}/${day}/${year} ${hours}:${minutes}${ampm}`;
}

/**
 * Validates 10-digit Indian mobile number
 */
export function validateIndianPhone(phoneInput: string): { isValid: boolean; cleaned: string; formatted: string } {
  // Strip all non-digit characters
  const digits = phoneInput.replace(/\D/g, '');
  
  // If user entered 12 digits starting with 91 (e.g., 919876543210)
  if (digits.length === 12 && digits.startsWith('91')) {
    const core10 = digits.substring(2);
    const isValidCore = /^[6-9]\d{9}$/.test(core10);
    return {
      isValid: isValidCore,
      cleaned: core10,
      formatted: `+91${core10}`
    };
  }
  
  // If user entered 11 digits starting with 0 (e.g., 09876543210)
  if (digits.length === 11 && digits.startsWith('0')) {
    const core10 = digits.substring(1);
    const isValidCore = /^[6-9]\d{9}$/.test(core10);
    return {
      isValid: isValidCore,
      cleaned: core10,
      formatted: `+91${core10}`
    };
  }
  
  // Standard 10 digits
  if (digits.length === 10) {
    const isValid = /^[6-9]\d{9}$/.test(digits);
    return {
      isValid,
      cleaned: digits,
      formatted: `+91${digits}`
    };
  }
  
  return {
    isValid: false,
    cleaned: digits,
    formatted: digits ? `+91${digits}` : ''
  };
}

/**
 * Retrieves configured Webhook URL from localStorage or env variable
 */
export function getActiveWebhookUrl(): string {
  const customUrl = localStorage.getItem(LOCAL_STORAGE_WEBHOOK_KEY);
  if (customUrl && customUrl.trim().length > 0) {
    return customUrl.trim();
  }
  return import.meta.env.VITE_LEADS_WEBHOOK_URL || '';
}

/**
 * Saves custom Webhook URL in localStorage
 */
export function setActiveWebhookUrl(url: string): void {
  localStorage.setItem(LOCAL_STORAGE_WEBHOOK_KEY, url.trim());
}

/**
 * Resets Webhook URL to default from env
 */
export function resetActiveWebhookUrl(): void {
  localStorage.removeItem(LOCAL_STORAGE_WEBHOOK_KEY);
}

/**
 * Saves a lead to local storage backup history
 */
function saveLeadToLocalStorage(payload: LeadSubmissionPayload): void {
  try {
    const existingRaw = localStorage.getItem(LOCAL_STORAGE_LEADS_KEY);
    const existing: LeadSubmissionPayload[] = existingRaw ? JSON.parse(existingRaw) : [];
    existing.unshift(payload);
    localStorage.setItem(LOCAL_STORAGE_LEADS_KEY, JSON.stringify(existing.slice(0, 50)));
  } catch (err) {
    console.error('Failed to write lead to localStorage:', err);
  }
}

/**
 * Reads local lead history
 */
export function getStoredLeadsHistory(): LeadSubmissionPayload[] {
  try {
    const existingRaw = localStorage.getItem(LOCAL_STORAGE_LEADS_KEY);
    return existingRaw ? JSON.parse(existingRaw) : [];
  } catch (err) {
    return [];
  }
}

/**
 * Primary lead submission method
 */
export async function submitLead(formData: LeadFormData): Promise<LeadSubmissionResponse> {
  const phoneValidation = validateIndianPhone(formData.phone);
  
  if (!formData.name || formData.name.trim().length < 2) {
    throw new Error('कृपया अपना सही नाम लिखें');
  }
  
  if (!phoneValidation.isValid) {
    throw new Error('कृपया 10 अंकों का सही भारतीय मोबाइल नंबर दर्ज करें (उदा. 9876543210)');
  }

  // Construct CRM mapping payload
  const payload: LeadSubmissionPayload = {
    created: formatLeadTimestamp(new Date()),
    name: formData.name.trim(),
    email: '',
    source: 'Paid',
    form: 'gouthealth-combo-landing',
    channel: 'Phone number',
    stage: 'Intake',
    owner: 'Unassigned',
    labels: '',
    phone: phoneValidation.formatted,
    secondaryPhone: '',
    whatsappNumber: ''
  };

  // Always back up lead locally first
  saveLeadToLocalStorage(payload);

  const webhookUrl = getActiveWebhookUrl();

  // If a valid Google Apps Script WebApp URL is available
  if (webhookUrl && webhookUrl.startsWith('https://script.google.com/')) {
    try {
      // POST payload as JSON or text/plain to avoid CORS preflight issues with Google Apps Script
      const response = await fetch(webhookUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'text/plain;charset=utf-8'
        },
        body: JSON.stringify(payload)
      });

      if (response.ok) {
        const resText = await response.text();
        let parsedRes: any = {};
        try {
          parsedRes = JSON.parse(resText);
        } catch (e) {
          // If non-JSON text returned by script, treat 200 OK as success
        }

        return {
          success: true,
          message: 'धन्यवाद! हमारी टीम जल्द आपसे संपर्क करेगी',
          submissionId: `sub_${Date.now()}`,
          payload,
          methodUsed: 'google-sheets'
        };
      } else {
        console.warn('Webhook returned non-200 status:', response.status);
      }
    } catch (error) {
      console.warn('Direct fetch to Google Apps Script failed (possibly CORS or network issue):', error);
      
      // Attempt no-cors fetch mode as fallback for Google Apps Script WebApp
      try {
        await fetch(webhookUrl, {
          method: 'POST',
          mode: 'no-cors',
          headers: {
            'Content-Type': 'text/plain'
          },
          body: JSON.stringify(payload)
        });

        return {
          success: true,
          message: 'धन्यवाद! हमारी टीम जल्द आपसे संपर्क करेगी',
          submissionId: `sub_${Date.now()}`,
          payload,
          methodUsed: 'google-sheets'
        };
      } catch (noCorsErr) {
        console.error('Fallback submit error:', noCorsErr);
      }
    }
  }

  // If no live WebApp URL is configured yet or network fails, treat local storage capture as successful
  // and inform the user or prompt setup.
  return {
    success: true,
    message: 'धन्यवाद! हमारी टीम जल्द आपसे संपर्क करेगी',
    submissionId: `local_${Date.now()}`,
    payload,
    methodUsed: 'local-storage'
  };
}
