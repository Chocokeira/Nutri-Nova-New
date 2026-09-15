import React, { useState, useEffect } from 'react';
import {
  X,
  Mail,
  Send,
  Copy,
  ExternalLink,
  MapPin,
} from 'lucide-react';
import { Product } from '../types';
import {
  OFFICIAL_CONTACT_EMAIL,
  formatProductInquiryMessage,
  openEmailClient,
  buildGmailWebmailUrl,
  copyToClipboard,
} from '../services/emailService';

interface ProductInquiryModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
}

export const ProductInquiryModal: React.FC<ProductInquiryModalProps> = ({
  product,
  isOpen,
  onClose,
}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [inquiryType, setInquiryType] = useState('Wholesale & Retail Distribution');
  const [desiredQuantity, setDesiredQuantity] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [generatedPayload, setGeneratedPayload] = useState<{ subject: string; body: string }>({
    subject: '',
    body: '',
  });
  const [copied, setCopied] = useState(false);

  // Initialize or reset draft when product changes
  useEffect(() => {
    if (product) {
      setIsSubmitted(false);
      setCopied(false);
      const initialMsg = `Hello Nutri Nova Customer Service Team,\n\nI would like to inquire about ${product.name}${
        product.origin ? ` (Provenance: ${product.origin})` : ''
      }. Please provide details on current allocation availability, minimum order quantities, and delivery timelines.\n\nThank you!`;
      setMessage(initialMsg);
    }
  }, [product]);

  if (!isOpen || !product) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim()) return;

    const payload = formatProductInquiryMessage({
      productName: product.name,
      productId: product.id,
      productOrigin: product.origin,
      productCategory: product.categoryLabel || product.category,
      senderName: name.trim(),
      senderEmail: email.trim(),
      senderPhone: phone.trim() || undefined,
      inquiryType,
      desiredQuantity: desiredQuantity.trim() || undefined,
      message: message.trim(),
    });

    setGeneratedPayload(payload);
    setIsSubmitted(true);

    // Trigger user's mail client with prefilled parameters
    openEmailClient({
      to: OFFICIAL_CONTACT_EMAIL,
      subject: payload.subject,
      body: payload.body,
    });
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
    <div
      id="product-inquiry-modal-overlay"
      className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6"
    >
      <div
        id="product-inquiry-modal-card"
        className="relative bg-[#FAF8F5] w-full max-w-2xl rounded-3xl shadow-xl border border-[#EBE4D8] overflow-hidden animate-in zoom-in-95 duration-200"
      >
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 text-[#47574D] hover:text-[#18261E] bg-white/90 hover:bg-white rounded-full transition-colors shadow-xs cursor-pointer"
          aria-label="Close inquiry dialog"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header Strip */}
        <div className="bg-[#1A382B] text-[#FAF8F5] px-6 sm:px-8 py-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center">
              <Mail className="w-5 h-5 text-[#E59E2B]" />
            </div>
            <div>
              <span className="text-[10px] font-bold uppercase tracking-widest text-[#D0E2D6] block">
                Direct Product Inquiry
              </span>
              <h2 className="font-serif text-lg sm:text-xl font-bold">
                Send Inquiry to Nutri Nova
              </h2>
            </div>
          </div>
          <span className="text-[11px] font-mono bg-white/10 text-white/90 px-3 py-1 rounded-full hidden sm:inline-block">
            {OFFICIAL_CONTACT_EMAIL}
          </span>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8 max-h-[80vh] overflow-y-auto space-y-6">
          {/* Selected Product Summary Box */}
          <div className="p-4 rounded-2xl bg-white border border-[#EBE4D8] flex items-center gap-4">
            <img
              src={product.image}
              alt={product.name}
              className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl object-cover border border-[#EAE3D6] shrink-0"
            />
            <div className="flex-1 min-w-0">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#1A382B] block">
                {product.categoryLabel || product.category}
              </span>
              <h3 className="font-serif text-base sm:text-lg font-bold text-[#18261E] truncate">
                {product.name}
              </h3>
              {product.origin && (
                <p className="text-xs text-[#718477] flex items-center gap-1 mt-0.5 font-normal">
                  <MapPin className="w-3 h-3 text-[#1A382B] shrink-0" />
                  <span className="truncate">{product.origin}</span>
                </p>
              )}
            </div>
          </div>

          {isSubmitted ? (
            /* Success State */
            <div className="py-4 space-y-5 text-center">
              <div className="w-16 h-16 rounded-full bg-[#EDF3EF] text-[#1A382B] flex items-center justify-center mx-auto text-2xl font-bold">
                ✓
              </div>

              <div className="space-y-1">
                <h3 className="font-serif text-2xl font-bold text-[#18261E]">
                  Inquiry Created &amp; Directed
                </h3>
                <p className="text-xs sm:text-sm text-[#47574D] max-w-md mx-auto font-normal">
                  Your inquiry has been formulated and addressed to{' '}
                  <span className="font-bold text-[#18261E] underline">
                    {OFFICIAL_CONTACT_EMAIL}
                  </span>
                  .
                </p>
              </div>

              {/* Destination & Action Box */}
              <div className="p-4 sm:p-5 rounded-2xl bg-white border border-[#EBE4D8] text-left space-y-3">
                <div className="flex items-center justify-between text-xs border-b border-[#F2EDE4] pb-2">
                  <span className="text-[#718477] font-semibold">Recipient:</span>
                  <span className="font-mono font-bold text-[#1A382B]">
                    {OFFICIAL_CONTACT_EMAIL}
                  </span>
                </div>
                <div className="text-xs text-[#47574D] space-y-1 font-normal">
                  <p>
                    <strong className="text-[#18261E]">Subject:</strong> {generatedPayload.subject}
                  </p>
                  <p>
                    <strong className="text-[#18261E]">From:</strong> {name} ({email})
                  </p>
                </div>

                <div className="pt-3 border-t border-[#F2EDE4] grid grid-cols-1 sm:grid-cols-2 gap-2.5">
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
                    className="py-2.5 px-4 rounded-xl border border-[#E0D7C8] bg-[#FAF8F5] hover:bg-[#F2ECE3] text-xs font-bold text-[#18261E] transition-colors flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Copy className="w-3.5 h-3.5 text-[#1A382B]" />
                    <span>{copied ? 'Copied Message!' : 'Copy Message Text'}</span>
                  </button>
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-8 py-3 rounded-full bg-[#EDF3EF] hover:bg-[#E2ECE6] text-[#1A382B] text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer"
                >
                  Close Window
                </button>
              </div>
            </div>
          ) : (
            /* Inquiry Form */
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#47574D] mb-1.5">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g., Alexander Lee"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-white border border-[#E0D7C8] rounded-xl px-4 py-2.5 text-xs sm:text-sm text-[#18261E] placeholder-[#8A988F] focus:outline-hidden focus:border-[#1A382B]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#47574D] mb-1.5">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="name@company.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-white border border-[#E0D7C8] rounded-xl px-4 py-2.5 text-xs sm:text-sm text-[#18261E] placeholder-[#8A988F] focus:outline-hidden focus:border-[#1A382B]"
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
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full bg-white border border-[#E0D7C8] rounded-xl px-4 py-2.5 text-xs sm:text-sm text-[#18261E] placeholder-[#8A988F] focus:outline-hidden focus:border-[#1A382B]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#47574D] mb-1.5">
                    Inquiry Nature
                  </label>
                  <select
                    value={inquiryType}
                    onChange={(e) => setInquiryType(e.target.value)}
                    className="w-full bg-white border border-[#E0D7C8] rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-[#18261E] focus:outline-hidden focus:border-[#1A382B] cursor-pointer"
                  >
                    <option value="Wholesale & Retail Distribution">Wholesale &amp; Retail Distribution</option>
                    <option value="Foodservice & Hospitality">Foodservice &amp; Hospitality</option>
                    <option value="Private Allocation & Orders">Private Allocation &amp; Orders</option>
                    <option value="Sample Request">Sample Request</option>
                    <option value="Product Specifications & Certifications">Specifications &amp; Testing</option>
                    <option value="General Question">General Product Question</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#47574D] mb-1.5">
                  Target Quantity / Volume (Optional)
                </label>
                <input
                  type="text"
                  placeholder="e.g., 10 cartons, 1 pallet, sample pack, or monthly allocation"
                  value={desiredQuantity}
                  onChange={(e) => setDesiredQuantity(e.target.value)}
                  className="w-full bg-white border border-[#E0D7C8] rounded-xl px-4 py-2.5 text-xs sm:text-sm text-[#18261E] placeholder-[#8A988F] focus:outline-hidden focus:border-[#1A382B]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#47574D] mb-1.5">
                  Message / Specifications *
                </label>
                <textarea
                  required
                  rows={4}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full bg-white border border-[#E0D7C8] rounded-xl px-4 py-2.5 text-xs sm:text-sm text-[#18261E] placeholder-[#8A988F] focus:outline-hidden focus:border-[#1A382B] resize-none"
                />
              </div>

              {/* Destination assurance note */}
              <div className="p-3 rounded-xl bg-[#EDF3EF] text-[#1A382B] text-xs">
                <span>
                  This message will be created and sent directly to{' '}
                  <strong className="underline">{OFFICIAL_CONTACT_EMAIL}</strong>.
                </span>
              </div>

              <button
                type="submit"
                className="w-full py-4 rounded-full bg-[#1A382B] hover:bg-[#12261D] text-[#FAF8F5] text-xs sm:text-sm font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-xs hover:shadow-md cursor-pointer"
              >
                <span>Send Inquiry to custsvc@nutri-nova.org</span>
                <Send className="w-4 h-4 text-[#E59E2B]" />
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
