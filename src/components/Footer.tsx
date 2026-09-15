import React from 'react';
import { Mail, Phone, ArrowUpRight, MapPin } from 'lucide-react';
import { Instagram, Facebook } from './SocialIcons';
import { PageView } from '../types';

interface FooterProps {
  onNavigate: (page: PageView) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const handleNavClick = (page: PageView) => {
    onNavigate(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer id="site-footer" className="bg-[#12261D] text-[#D4E3DA] pt-16 pb-12 border-t border-[#1C382A]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-12 pb-14">
          {/* Brand Column */}
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <img
                src="/assets/Nurti Nova Logo.jpg"
                alt="Nutri Nova"
                className="w-10 h-10 rounded-full object-cover shadow-xs border border-[#2A4D39]"
              />
              <span className="font-serif text-2xl font-bold tracking-tight text-[#FAF8F5]">
                Nutri Nova
              </span>
            </div>

            <p className="font-serif italic text-base text-[#E59E2B] max-w-sm">
              Good food for better everyday living.
            </p>
            <p className="text-xs text-[#9BB5A6] max-w-sm leading-relaxed font-normal">
              A nutritious lifestyle brand born from the synergy of SIMCC scientific precision and Culina culinary pedigree. Curating the finest single-estate harvests, table waters, and pure foods.
            </p>

            {/* Social Channels */}
            <div className="pt-2 space-y-2">
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#9BB5A6] block">
                Connect With Us
              </span>
              <div className="flex items-center gap-3">
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                  className="w-9 h-9 rounded-full bg-[#1A382B] hover:bg-[#E59E2B] hover:text-[#12261D] flex items-center justify-center text-[#D4E3DA] transition-colors"
                >
                  <Instagram className="w-4 h-4" />
                </a>
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Facebook"
                  className="w-9 h-9 rounded-full bg-[#1A382B] hover:bg-[#E59E2B] hover:text-[#12261D] flex items-center justify-center text-[#D4E3DA] transition-colors"
                >
                  <Facebook className="w-4 h-4" />
                </a>
                <a
                  href="https://tiktok.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="TikTok"
                  className="w-9 h-9 rounded-full bg-[#1A382B] hover:bg-[#E59E2B] hover:text-[#12261D] flex items-center justify-center text-[#D4E3DA] transition-colors text-xs font-bold"
                >
                  <span className="font-sans font-black text-xs">Tk</span>
                </a>
              </div>
            </div>
          </div>

          {/* Menu Column */}
          <div className="lg:col-span-3 space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#FAF8F5]">Navigation</h3>
            <ul className="space-y-2.5 text-xs sm:text-sm text-[#A5C0B1]">
              <li>
                <button
                  onClick={() => handleNavClick('home')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Home
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNavClick('products')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Products Catalogue
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNavClick('about')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Our Story &amp; Standards
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNavClick('faq')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  FAQ &amp; Sourcing
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNavClick('contact')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Contact &amp; Wholesale
                </button>
              </li>
            </ul>
          </div>

          {/* Direct Contact & Service Desk */}
          <div className="lg:col-span-4 space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#FAF8F5]">Inquiries &amp; Wholesale</h3>
            <p className="text-xs text-[#9BB5A6] leading-relaxed">
              Reach our corporate sourcing desk for distribution, sample allocations, or commercial partnership.
            </p>

            <div className="space-y-2.5 pt-1 text-xs">
              <a
                href="mailto:custsvc@nutri-nova.org"
                className="flex items-center gap-2.5 text-[#E4EFE8] hover:text-[#E59E2B] transition-colors group"
              >
                <div className="w-7 h-7 rounded-lg bg-[#1A382B] flex items-center justify-center shrink-0 group-hover:bg-[#E59E2B] group-hover:text-[#12261D] transition-colors">
                  <Mail className="w-3.5 h-3.5" />
                </div>
                <span>custsvc@nutri-nova.org</span>
              </a>

              <a
                href="https://wa.me/6596894176"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2.5 text-[#E4EFE8] hover:text-[#E59E2B] transition-colors group"
              >
                <div className="w-7 h-7 rounded-lg bg-[#1A382B] flex items-center justify-center shrink-0 group-hover:bg-[#E59E2B] group-hover:text-[#12261D] transition-colors">
                  <Phone className="w-3.5 h-3.5" />
                </div>
                <span>WhatsApp: +65 96894176</span>
              </a>

              <div className="flex items-start gap-2.5 text-xs text-[#B2C7BC] pt-1 leading-relaxed">
                <div className="w-7 h-7 rounded-lg bg-[#1A382B] flex items-center justify-center shrink-0 text-[#E59E2B] mt-0.5">
                  <MapPin className="w-3.5 h-3.5" />
                </div>
                <span>5 Mandai Link, Mandai Foodlink, #06-03, Singapore 728654</span>
              </div>
            </div>
          </div>
        </div>

        {/* Copyright Bottom Bar */}
        <div className="pt-8 border-t border-[#1C382A] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#7A9687]">
          <p>© 2026 Nutri Nova Pte. Ltd. All rights reserved.</p>

          <div className="flex items-center gap-6">
            <button onClick={() => handleNavClick('faq')} className="hover:text-[#A8C2B3] transition-colors cursor-pointer">
              Privacy &amp; Terms
            </button>
            <button onClick={() => handleNavClick('contact')} className="hover:text-[#A8C2B3] transition-colors cursor-pointer">
              Distribution Partnerships
            </button>
            <a href="/admin" className="hover:text-[#A8C2B3] transition-colors cursor-pointer opacity-80 hover:opacity-100">
              Admin Portal
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
