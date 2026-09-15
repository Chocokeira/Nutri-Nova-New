/**
 * Nutri Nova Email & Customer Inquiry Service
 * Formats, addresses, and dispatches inquiries directly to custsvc@nutri-nova.org
 */

export const OFFICIAL_CONTACT_EMAIL = 'custsvc@nutri-nova.org';

export interface EmailPayload {
  to?: string;
  subject: string;
  body: string;
}

export function buildMailtoUrl({
  to = OFFICIAL_CONTACT_EMAIL,
  subject,
  body,
}: EmailPayload): string {
  const encSubject = encodeURIComponent(subject);
  const encBody = encodeURIComponent(body);
  return `mailto:${to}?subject=${encSubject}&body=${encBody}`;
}

export function buildGmailWebmailUrl({
  to = OFFICIAL_CONTACT_EMAIL,
  subject,
  body,
}: EmailPayload): string {
  const encSubject = encodeURIComponent(subject);
  const encBody = encodeURIComponent(body);
  return `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(to)}&su=${encSubject}&body=${encBody}`;
}

/**
 * Triggers opening the default mail client with the prefilled message
 */
export function openEmailClient(payload: EmailPayload): void {
  const mailto = buildMailtoUrl(payload);
  try {
    const link = document.createElement('a');
    link.href = mailto;
    link.style.display = 'none';
    document.body.appendChild(link);
    link.click();
    setTimeout(() => {
      if (document.body.contains(link)) {
        document.body.removeChild(link);
      }
    }, 500);
  } catch {
    window.location.href = mailto;
  }
}

export interface ProductInquiryData {
  productName: string;
  productId: string;
  productOrigin?: string;
  productCategory?: string;
  senderName: string;
  senderEmail: string;
  senderPhone?: string;
  inquiryType: string;
  desiredQuantity?: string;
  message: string;
}

export function formatProductInquiryMessage(data: ProductInquiryData): {
  subject: string;
  body: string;
} {
  const subject = `[Nutri Nova Product Inquiry] ${data.productName} - ${data.inquiryType} (from ${data.senderName})`;
  const body = `Dear Nutri Nova Customer Service Team,

I would like to inquire about the following product from the Nutri Nova catalogue:

--- PRODUCT DETAILS ---
Product Name: ${data.productName}
Catalogue ID: ${data.productId}
${data.productOrigin ? `Provenance / Terroir: ${data.productOrigin}\n` : ''}${data.productCategory ? `Category: ${data.productCategory}\n` : ''}${data.desiredQuantity ? `Target Quantity / Order Format: ${data.desiredQuantity}\n` : ''}Inquiry Nature: ${data.inquiryType}

--- CLIENT CONTACT INFORMATION ---
Name: ${data.senderName}
Email: ${data.senderEmail}
${data.senderPhone ? `Phone / WhatsApp: ${data.senderPhone}\n` : ''}Date: ${new Date().toLocaleString()}

--- CLIENT MESSAGE & QUESTIONS ---
${data.message}

--------------------------------------------------
Official Destination: ${OFFICIAL_CONTACT_EMAIL}
Sent via Nutri Nova Product Catalogue Inquiry Desk
`;

  return { subject, body };
}

export interface GeneralContactData {
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
}

export function formatGeneralContactMessage(data: GeneralContactData): {
  subject: string;
  body: string;
} {
  const subject = `[Nutri Nova Contact] ${data.subject} - from ${data.name}`;
  const body = `Dear Nutri Nova Customer Service Team,

A message has been submitted through the Nutri Nova contact desk:

--- CONTACT DETAILS ---
From: ${data.name}
Email: ${data.email}
${data.phone ? `Phone / WhatsApp: ${data.phone}\n` : ''}Subject: ${data.subject}
Date: ${new Date().toLocaleString()}

--- MESSAGE ---
${data.message}

--------------------------------------------------
Official Destination: ${OFFICIAL_CONTACT_EMAIL}
Sent via Nutri Nova Official Website Contact Form
`;

  return { subject, body };
}

export function createProductInquiryMailto(data: {
  productName: string;
  productId?: string;
  productOrigin?: string;
  productCategory?: string;
  senderName: string;
  senderEmail: string;
  senderPhone?: string;
  inquiryType: string;
  quantity?: string;
  message: string;
}): string {
  const { subject, body } = formatProductInquiryMessage({
    productName: data.productName,
    productId: data.productId || 'SELECTION-INQUIRY',
    productOrigin: data.productOrigin,
    productCategory: data.productCategory,
    senderName: data.senderName,
    senderEmail: data.senderEmail,
    senderPhone: data.senderPhone,
    inquiryType: data.inquiryType,
    desiredQuantity: data.quantity,
    message: data.message,
  });
  return buildMailtoUrl({ subject, body });
}

export async function copyToClipboard(text: string): Promise<boolean> {
  try {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      await navigator.clipboard.writeText(text);
      return true;
    }
  } catch (err) {
    console.error('Clipboard write failed', err);
  }
  // Fallback for iframe restrictions
  try {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.position = 'fixed';
    textArea.style.left = '-999999px';
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    const successful = document.execCommand('copy');
    document.body.removeChild(textArea);
    return successful;
  } catch (err) {
    console.error('Fallback clipboard copy failed', err);
    return false;
  }
}
