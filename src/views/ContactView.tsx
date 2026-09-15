import React, { useState, useEffect } from 'react';
import {
  Mail,
  Send,
  MessageCircle,
  MapPin,
  Copy,
  ExternalLink,
} from 'lucide-react';
import { Product } from '../types';
import {
  OFFICIAL_CONTACT_EMAIL,
  formatGeneralContactMessage,
  openEmailClient,
  buildGmailWebmailUrl,
  copyToClipboard,
} from '../services/emailService';

interface ContactViewProps {
  onSubmitSuccess: () => void;
  initialProduct?: Product | null;
  initialSubject?: string;
}

export const ContactView: React.FC<ContactViewProps> = ({
  onSubmitSuccess,
  initialProduct,
  initialSubject,
}) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: initialSubject || (initialProduct ? `Inquiry: ${initialProduct.name}` : 'Corporate Sourcing & Product Inquiries'),
    message: initialProduct
      ? `Hello Nutri Nova Team,\n\nI would like to inquire about ${initialProduct.name} (${initialProduct.origin || 'Curated Harvest'}). Please provide allocation and sourcing details.\n\nThank you!`
      : '',
  });

  const [submitted, setSubmitted] = useState(false);
  const [generatedPayload, setGeneratedPayload] = useState<{ subject: string; body: string }>({
    subject: '',
    body: '',
  });
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (initialProduct) {
      setFormData((prev) => ({
        ...prev,
        subject: `Inquiry: ${initialProduct.name}`,
        message: `Hello Nutri Nova Team,\n\nI would like to inquire about ${initialProduct.name} (${initialProduct.origin || 'Curated Harvest'}). Please provide allocation and purchasing details.\n\nThank you!`,
      }));
    }
  }, [initialProduct]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      return;
    }

    const payload = formatGeneralContactMessage({
      name: formData.name.trim(),
      email: formData.email.trim(),
      phone: formData.phone.trim() || undefined,
      subject: formData.subject.trim() || 'Product Inquiries & Orders',
      message: formData.message.trim(),
    });

    setGeneratedPayload(payload);
    setSubmitted(true);

    // Automatically trigger user's email client addressed to custsvc@nutri-nova.org
    openEmailClient({
      to: OFFICIAL_CONTACT_EMAIL,
      subject: payload.subject,
      body: payload.body,
    });

    onSubmitSuccess();
  };

  const handleCopy = async () => {
    if (!generatedPayload.body) return;
    const fullText = `Subject: ${generatedPayload.subject}\nTo: ${OFFICIAL_CONTACT_EMAIL}\n\n${generatedPayload.body}`;
    const success = await copyToClipboard(fullText);
    if (success) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const gmailUrl = buildGmailWebmailUrl({
    to: OFFICIAL_CONTACT_EMAIL,
    subject: generatedPayload.subject,
    body: generatedPayload.body,
  });

  return (
    <div id="contact-page" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20 space-y-12">
      {/* Editorial Header */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-[#F3ECE1] text-[#1A382B] text-xs font-semibold tracking-wider uppercase border border-[#E3DACB]">
          <span>GET IN TOUCH</span>
        </div>

        <h1 className="font-serif text-3xl sm:text-5xl font-bold text-[#18261E] tracking-tight">
          Have a Question? We'd Love to Hear From You.
        </h1>
        <p className="text-sm sm:text-base text-[#47574D] leading-relaxed font-normal">
          Whether you have inquiries regarding seasonal allocations, wholesale distribution, or serving inspiration, the Nutri Nova team is at your service.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
        {/* Contact Information Left */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white rounded-3xl p-8 border border-[#EBE4D8] shadow-xs space-y-6">
            <div>
              <h2 className="font-serif text-2xl font-bold text-[#18261E]">
                Direct Contacts
              </h2>
              <p className="text-xs sm:text-sm text-[#6C7E72] mt-1 font-normal">
                Official channels for corporate procurement, specialty grocer stockists, and customer care.
              </p>
            </div>

            <div className="space-y-5 text-xs sm:text-sm text-[#47574D]">
              {/* WhatsApp */}
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-[#EDF3EF] flex items-center justify-center text-[#1A382B] shrink-0">
                  <MessageCircle className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-[#18261E]">WhatsApp Support</h3>
                  <a
                    href="https://wa.me/6596894176"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#18261E] font-bold text-base hover:text-[#1A382B] hover:underline mt-0.5 block"
                  >
                    +65 96894176
                  </a>
                  <p className="text-[11px] text-[#718477]">Direct messaging &amp; wholesale desk</p>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-[#EDF3EF] flex items-center justify-center text-[#1A382B] shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-[#18261E]">Official Inquiries Email</h3>
                  <a
                    href={`mailto:${OFFICIAL_CONTACT_EMAIL}`}
                    className="text-[#18261E] font-bold text-base hover:text-[#1A382B] hover:underline mt-0.5 block"
                  >
                    {OFFICIAL_CONTACT_EMAIL}
                  </a>
                  <p className="text-[11px] text-[#718477]">Inquiries answered within 24 business hours</p>
                </div>
              </div>

              {/* Official Address */}
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-[#EDF3EF] flex items-center justify-center text-[#1A382B] shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-[#18261E]">Location &amp; Facility</h3>
                  <p className="text-[#18261E] font-medium text-sm leading-relaxed mt-0.5">
                    5 Mandai Link, Mandai Foodlink, #06-03, Singapore 728654
                  </p>
                  <p className="text-[11px] text-[#718477]">Headquarters &amp; Distribution Operations</p>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-[#F2EDE4] text-xs text-[#526458]">
              <span>Nutri Nova Pte. Ltd. • Good Food. Better Living.</span>
            </div>
          </div>
        </div>

        {/* Form Right */}
        <div className="lg:col-span-7 bg-white rounded-3xl p-8 sm:p-10 border border-[#EBE4D8] shadow-xs">
          {submitted ? (
            <div className="text-center py-6 sm:py-8 space-y-6">
              <div className="w-16 h-16 rounded-full bg-[#EDF3EF] text-[#1A382B] flex items-center justify-center mx-auto text-2xl font-bold">
                ✓
              </div>

              <div className="space-y-2">
                <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#18261E]">
                  Message Formatted &amp; Dispatched!
                </h2>
                <p className="text-xs sm:text-sm text-[#47574D] max-w-md mx-auto leading-relaxed font-normal">
                  Your message has been addressed directly to{' '}
                  <span className="font-bold text-[#18261E] underline">
                    {OFFICIAL_CONTACT_EMAIL}
                  </span>
                  .
                </p>
              </div>

              {/* Dispatch Verification Panel */}
              <div className="p-5 rounded-2xl bg-[#FAF8F5] border border-[#EBE4D8] text-left space-y-3">
                <div className="flex items-center justify-between text-xs border-b border-[#EAE3D6] pb-2.5">
                  <span className="text-[#718477] font-medium">Addressed to:</span>
                  <span className="font-mono font-bold text-[#1A382B]">
                    {OFFICIAL_CONTACT_EMAIL}
                  </span>
                </div>

                <div className="text-xs text-[#47574D] space-y-1.5 font-normal">
                  <p>
                    <strong className="text-[#18261E]">Subject:</strong> {generatedPayload.subject}
                  </p>
                  <p>
                    <strong className="text-[#18261E]">Sender:</strong> {formData.name} ({formData.email})
                  </p>
                  {formData.phone && (
                    <p>
                      <strong className="text-[#18261E]">Contact Phone:</strong> {formData.phone}
                    </p>
                  )}
                </div>

                <div className="pt-3 border-t border-[#EAE3D6] grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <a
                    href={gmailUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="py-2.5 px-4 rounded-xl bg-[#1A382B] hover:bg-[#12261D] text-[#FAF8F5] text-xs font-bold transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-xs text-center"
                  >
                    <span>Open in Gmail Webmail</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>

                  <button
                    type="button"
                    onClick={handleCopy}
                    className="py-2.5 px-4 rounded-xl border border-[#E0D7C8] bg-white hover:bg-[#FAF8F5] text-xs font-bold text-[#18261E] transition-colors flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Copy className="w-3.5 h-3.5 text-[#1A382B]" />
                    <span>{copied ? 'Copied Message!' : 'Copy Message Text'}</span>
                  </button>
                </div>
              </div>

              <button
                onClick={() => {
                  setSubmitted(false);
                  setFormData({
                    name: '',
                    email: '',
                    phone: '',
                    subject: 'Corporate Sourcing & Product Inquiries',
                    message: '',
                  });
                }}
                className="px-6 py-2.5 rounded-full border border-[#D5CFBF] text-xs font-semibold text-[#18261E] hover:bg-[#FAF8F5] cursor-pointer transition-colors"
              >
                Send Another Message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <h2 className="font-serif text-2xl font-bold text-[#18261E]">
                  Send an Inquiry
                </h2>
                <p className="text-xs text-[#6C7E72] mt-1 font-normal">
                  Fill out the form below and your message will be dispatched directly to{' '}
                  <span className="font-semibold text-[#1A382B]">{OFFICIAL_CONTACT_EMAIL}</span>.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#47574D] mb-1.5">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g., Alexandra Wright"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-[#FAF8F5] border border-[#E0D7C8] rounded-xl px-4 py-3 text-xs sm:text-sm text-[#18261E] placeholder-[#8A988F] focus:outline-hidden focus:border-[#1A382B] transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#47574D] mb-1.5">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="alexandra@domain.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full bg-[#FAF8F5] border border-[#E0D7C8] rounded-xl px-4 py-3 text-xs sm:text-sm text-[#18261E] placeholder-[#8A988F] focus:outline-hidden focus:border-[#1A382B] transition-colors"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#47574D] mb-1.5">
                    Phone / WhatsApp (Optional)
                  </label>
                  <input
                    type="tel"
                    placeholder="e.g., +65 9123 4567"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full bg-[#FAF8F5] border border-[#E0D7C8] rounded-xl px-4 py-3 text-xs sm:text-sm text-[#18261E] placeholder-[#8A988F] focus:outline-hidden focus:border-[#1A382B] transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#47574D] mb-1.5">
                    Subject *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Subject of your message"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full bg-[#FAF8F5] border border-[#E0D7C8] rounded-xl px-4 py-3 text-xs sm:text-sm text-[#18261E] placeholder-[#8A988F] focus:outline-hidden focus:border-[#1A382B] transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#47574D] mb-1.5">
                  Message *
                </label>
                <textarea
                  required
                  rows={5}
                  placeholder="Share details regarding your request, volume requirements, or questions..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full bg-[#FAF8F5] border border-[#E0D7C8] rounded-xl px-4 py-3 text-xs sm:text-sm text-[#18261E] placeholder-[#8A988F] focus:outline-hidden focus:border-[#1A382B] resize-none transition-colors"
                />
              </div>

              {/* Recipient note */}
              <div className="p-3 rounded-xl bg-[#EDF3EF] text-[#1A382B] text-xs flex items-center gap-2">
                <Mail className="w-4 h-4 text-[#1A382B] shrink-0" />
                <span>
                  Dispatches directly to Nutri Nova Corporate Care:{' '}
                  <strong className="underline">{OFFICIAL_CONTACT_EMAIL}</strong>
                </span>
              </div>

              <button
                type="submit"
                className="w-full py-4 rounded-full bg-[#1A382B] hover:bg-[#12261D] text-[#FAF8F5] text-xs sm:text-sm font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-xs hover:shadow-md cursor-pointer"
              >
                <span>Send Message to custsvc@nutri-nova.org</span>
                <Send className="w-4 h-4 text-[#E59E2B]" />
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
