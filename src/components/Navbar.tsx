import React, { useState, useEffect } from 'react';
import { Search, Menu, X, ArrowRight } from 'lucide-react';
import { PageView } from '../types';

interface NavbarProps {
  currentPage: PageView;
  onNavigate: (page: PageView) => void;
  onOpenSearch: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentPage,
  onNavigate,
  onOpenSearch,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems: { label: string; page: PageView }[] = [
    { label: 'Home', page: 'home' },
    { label: 'Products', page: 'products' },
    { label: 'Our Story', page: 'about' },
    { label: 'FAQ', page: 'faq' },
    { label: 'Contact', page: 'contact' },
  ];

  const handleNavClick = (page: PageView) => {
    onNavigate(page);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header
      id="main-navigation-header"
      className={`sticky top-0 z-40 w-full transition-all duration-300 ${
        isScrolled
          ? 'bg-[#FAF8F5]/95 backdrop-blur-md shadow-xs border-b border-[#E7DFC8]/70'
          : 'bg-[#FAF8F5] border-b border-[#EFE8DC]'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Brand Logo & Wordmark */}
        <button
          id="brand-logo-btn"
          onClick={() => handleNavClick('home')}
          className="flex items-center gap-3 text-left group focus:outline-hidden cursor-pointer"
        >
          <img
            src="/assets/Nurti Nova Logo.jpg"
            alt="Nutri Nova - Good Food. Better Living."
            className="w-10 h-10 sm:w-11 sm:h-11 rounded-full object-cover shadow-2xs border border-[#DFD6C7]"
          />
          <div className="flex flex-col">
            <span className="font-serif text-2xl sm:text-[26px] font-bold tracking-tight text-[#18261E] leading-none">
              Nutri Nova
            </span>
            <span className="text-[10px] tracking-[0.2em] uppercase font-semibold text-[#6C7E72] mt-0.5">
              Nutritious Lifestyle
            </span>
          </div>
        </button>

        {/* Desktop Navigation Links */}
        <nav id="desktop-nav-menu" className="hidden md:flex items-center gap-1 lg:gap-2">
          {navItems.map((item) => {
            const active = currentPage === item.page;
            return (
              <button
                key={item.page}
                id={`nav-link-${item.page}`}
                onClick={() => handleNavClick(item.page)}
                className={`text-xs uppercase tracking-wider font-semibold transition-all px-4 py-2 rounded-full focus:outline-hidden cursor-pointer ${
                  active
                    ? 'bg-[#1A382B] text-[#FAF8F5] font-bold shadow-2xs'
                    : 'text-[#415347] hover:text-[#1A382B] hover:bg-[#F2ECE1]'
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* Right Actions */}
        <div id="nav-actions-group" className="flex items-center gap-2 sm:gap-3">
          {/* Search Trigger */}
          <button
            id="nav-search-btn"
            onClick={onOpenSearch}
            aria-label="Search catalogue"
            className="p-2 text-[#3D4F43] hover:text-[#1A382B] hover:bg-[#EFE7D8] rounded-full transition-colors focus:outline-hidden cursor-pointer"
            title="Search Products"
          >
            <Search className="w-5 h-5" />
          </button>

          {/* Inquiries CTA Button */}
          <button
            id="nav-contact-btn"
            onClick={() => handleNavClick('contact')}
            className="hidden sm:inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#1A382B] text-[#FAF8F5] hover:bg-[#12261D] text-xs font-bold uppercase tracking-wider transition-all duration-200 shadow-2xs focus:outline-hidden cursor-pointer group"
          >
            <span>Get in Touch</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform text-[#E59E2B]" />
          </button>

          {/* Mobile Menu Toggle */}
          <button
            id="nav-mobile-menu-btn"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle Navigation Menu"
            className="md:hidden p-2 text-[#18261E] hover:bg-[#EFE7D8] rounded-lg focus:outline-hidden cursor-pointer"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div
          id="mobile-nav-panel"
          className="md:hidden border-t border-[#E8E1D5] bg-[#FAF8F5] px-6 py-6 space-y-4 shadow-lg animate-in slide-in-from-top-2 duration-200"
        >
          <div className="flex items-center gap-3 pb-3 border-b border-[#E8E1D5]">
            <img
              src="/assets/Nurti Nova Logo.jpg"
              alt="Nutri Nova"
              className="w-9 h-9 rounded-full object-cover border border-[#DFD6C7]"
            />
            <div>
              <span className="font-serif text-lg font-bold text-[#18261E] block">
                Nutri Nova
              </span>
              <span className="text-[10px] tracking-widest uppercase text-[#6C7E72]">
                Nutritious Lifestyle
              </span>
            </div>
          </div>

          <div className="flex flex-col space-y-1.5">
            {navItems.map((item) => (
              <button
                key={item.page}
                id={`mobile-nav-link-${item.page}`}
                onClick={() => handleNavClick(item.page)}
                className={`text-left text-sm uppercase tracking-wider font-semibold py-2.5 px-3 rounded-xl transition-colors cursor-pointer ${
                  currentPage === item.page
                    ? 'bg-[#1A382B] text-[#FAF8F5]'
                    : 'text-[#3E4F43] hover:bg-[#F2ECE1]'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>

          <div className="pt-4 border-t border-[#E8E1D5] flex flex-col gap-3">
            <button
              id="mobile-nav-contact-btn"
              onClick={() => handleNavClick('contact')}
              className="w-full py-3 rounded-full bg-[#1A382B] text-[#FAF8F5] text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 shadow-xs cursor-pointer"
            >
              <span>Contact Us &amp; Sourcing Inquiries</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#E59E2B]" />
            </button>

            <div className="text-center text-xs text-[#6C7E72] pt-1">
              <span>custsvc@nutri-nova.org • Singapore</span>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
