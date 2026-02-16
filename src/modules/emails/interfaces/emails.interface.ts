export interface Email {
  to: string;
  subject: string;
  html: string;
}

export type BatchEmail = Email[];
