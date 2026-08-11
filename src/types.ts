export interface LeadSubmissionPayload {
  created: string;          // Timestamp MM/DD/YYYY h:mma (e.g. 08/10/2026 9:33pm)
  name: string;             // Name from form
  email: string;            // Blank as form doesn't collect email
  source: string;           // "Paid"
  form: string;             // "gouthealth-combo-landing"
  channel: string;          // "Phone number"
  stage: string;            // "Intake"
  owner: string;            // "Unassigned"
  labels: string;           // Blank
  phone: string;            // +91 prefixed phone number
  secondaryPhone: string;   // Blank
  whatsappNumber: string;   // Blank
}

export interface LeadFormData {
  name: string;
  phone: string;
}

export interface LeadSubmissionResponse {
  success: boolean;
  message?: string;
  submissionId?: string;
  payload?: LeadSubmissionPayload;
  methodUsed?: 'google-sheets' | 'firebase' | 'local-storage';
}

export interface FormErrorState {
  name?: string;
  phone?: string;
  general?: string;
}
