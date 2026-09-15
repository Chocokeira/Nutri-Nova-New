import React, { useState, useEffect, useCallback } from 'react';
import { PageView, Product, CategoryId, AdminRoute, AdminUser } from './types';
import { PRODUCTS } from './data/products';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { ProductQuickView } from './components/ProductQuickView';
import { ProductInquiryModal } from './components/ProductInquiryModal';
import { SearchModal } from './components/SearchModal';
import { ToastContainer, ToastMessage } from './components/Toast';
import { HomeView } from './views/HomeView';
import { ProductsView } from './views/ProductsView';
import { ProductDetailView } from './views/ProductDetailView';
import { AboutView } from './views/AboutView';
import { FaqView } from './views/FaqView';
import { ContactView } from './views/ContactView';

// Admin CMS Views & Services
import { AdminLayout } from './views/admin/AdminLayout';
import { AdminLoginView } from './views/admin/AdminLoginView';
import { AdminAccessDeniedView } from './views/admin/AdminAccessDeniedView';
import { AdminDashboardOverview } from './views/admin/AdminDashboardOverview';
import { AdminProductsListView } from './views/admin/AdminProductsListView';
import { AdminProductFormView } from './views/admin/AdminProductFormView';
import { AdminFaqView } from './views/admin/AdminFaqView';
import { AdminAboutView } from './views/admin/AdminAboutView';
import { authService } from './services/authService';
import { productService } from './services/productService';
import { Loader2 } from 'lucide-react';

interface ParsedAdminPath {
  isInAdmin: boolean;
  isLogin: boolean;
  route: AdminRoute;
  productId?: string;
}

function parseLocation(): ParsedAdminPath {
  const path = window.location.pathname;
  const hash = window.location.hash.replace(/^#/, '');
  const target = path.startsWith('/admin') ? path : hash.startsWith('/admin') ? hash : '';

  if (!target.startsWith('/admin')) {
    return { isInAdmin: false, isLogin: false, route: 'dashboard' };
  }

  if (target === '/admin/login') {
    return { isInAdmin: true, isLogin: true, route: 'dashboard' };
  }

  if (target === '/admin/products/new') {
    return { isInAdmin: true, isLogin: false, route: 'product-new' };
  }

  const editMatch = target.match(/^\/admin\/products\/([^/]+)\/edit$/);
  if (editMatch) {
    return { isInAdmin: true, isLogin: false, route: 'product-edit', productId: editMatch[1] };
  }

  if (target === '/admin/products') {
    return { isInAdmin: true, isLogin: false, route: 'products' };
  }

  if (target === '/admin/faq') {
    return { isInAdmin: true, isLogin: false, route: 'faq' };
  }

  if (target === '/admin/about') {
    return { isInAdmin: true, isLogin: false, route: 'about' };
  }

  return { isInAdmin: true, isLogin: false, route: 'dashboard' };
}

export default function App() {
  // Public Website State
  const [currentPage, setCurrentPage] = useState<PageView>('home');
  const [selectedCatalogCategory, setSelectedCatalogCategory] = useState<CategoryId>('all');
  const [selectedDetailProduct, setSelectedDetailProduct] = useState<Product>(PRODUCTS[0]);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [inquiryProduct, setInquiryProduct] = useState<Product | null>(null);
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  // Products state (loaded dynamically from Supabase, fallback to PRODUCTS)
  const [products, setProducts] = useState<Product[]>(PRODUCTS);
  const [adminProducts, setAdminProducts] = useState<Product[]>(PRODUCTS);

  // Admin Area State
  const initialPath = parseLocation();
  const [isInAdminArea, setIsInAdminArea] = useState(initialPath.isInAdmin);
  const [isAdminLogin, setIsAdminLogin] = useState(initialPath.isLogin);
  const [adminRoute, setAdminRoute] = useState<AdminRoute>(initialPath.route);
  const [adminEditProductId, setAdminEditProductId] = useState<string | undefined>(initialPath.productId);

  // Auth & Authorization State
  const [adminUser, setAdminUser] = useState<AdminUser | null>(null);
  const [authChecking, setAuthChecking] = useState(initialPath.isInAdmin);
  const [accessDeniedUserEmail, setAccessDeniedUserEmail] = useState<string | null>(null);
  const [accessDeniedUserId, setAccessDeniedUserId] = useState<string | null>(null);
  const [accessDeniedError, setAccessDeniedError] = useState<string | null>(null);

  // Clear legacy cart/auth keys from localStorage if present
  useEffect(() => {
    try {
      localStorage.removeItem('nutri_nova_cart');
      localStorage.removeItem('nutrinova_cart');
      localStorage.removeItem('nutri_nova_user_email');
      localStorage.removeItem('nutrinova_user_email');
    } catch {
      // Safe ignore
    }
  }, []);

  // Fetch published products for public site
  const fetchPublishedProducts = useCallback(async () => {
    try {
      const res = await productService.getPublishedProducts();
      setProducts(res.products);
      if (res.products.length > 0 && !selectedDetailProduct) {
        setSelectedDetailProduct(res.products[0]);
      }
    } catch (err) {
      console.warn('Failed to load published products:', err);
    }
  }, [selectedDetailProduct]);

  // Fetch all products (published + drafts) for Admin
  const fetchAdminProducts = useCallback(async () => {
    try {
      const res = await productService.getAllAdminProducts();
      setAdminProducts(res.products);
    } catch (err) {
      console.warn('Failed to load admin products:', err);
    }
  }, []);

  useEffect(() => {
    fetchPublishedProducts();
    if (isInAdminArea) {
      fetchAdminProducts();
    }
  }, [fetchPublishedProducts, fetchAdminProducts, isInAdminArea]);

  // Check auth & verify admin_users table
  const checkAdminAuth = useCallback(async () => {
    setAuthChecking(true);
    try {
      // Use getCurrentUser (supabase.auth.getUser) for secure server-validated authentication
      const user = await authService.getCurrentUser();
      if (!user) {
        setAdminUser(null);
        setAccessDeniedUserEmail(null);
        setAccessDeniedUserId(null);
        setAccessDeniedError(null);
        // If inside admin area and not already on /admin/login, redirect to /admin/login
        if (isInAdminArea && !isAdminLogin) {
          window.history.replaceState({}, '', '/admin/login');
          setIsAdminLogin(true);
        }
        setAuthChecking(false);
        return;
      }

      // Check admin_users table comparing user_id/id with authenticated user ID
      const { isAdmin, adminRecord, error: adminError } = await authService.verifyAdminStatus(
        user.id,
        user.email
      );

      if (isAdmin && adminRecord) {
        setAdminUser(adminRecord);
        setAccessDeniedUserEmail(null);
        setAccessDeniedUserId(null);
        setAccessDeniedError(null);
        // If user logged in and was on /admin/login, redirect to /admin
        if (isAdminLogin) {
          window.history.replaceState({}, '', '/admin');
          setIsAdminLogin(false);
          setAdminRoute('dashboard');
        }
      } else {
        // Authenticated with Supabase, but authorization failed or was blocked
        setAdminUser(null);
        setAccessDeniedUserEmail(user.email || 'User');
        setAccessDeniedUserId(user.id);
        setAccessDeniedError(adminError || null);
      }
    } catch (err) {
      console.warn('Auth check error:', err);
      setAdminUser(null);
    } finally {
      setAuthChecking(false);
    }
  }, [isInAdminArea, isAdminLogin]);

  useEffect(() => {
    if (isInAdminArea) {
      checkAdminAuth();
    }

    const sub = authService.onAuthStateChange((session) => {
      if (!session) {
        setAdminUser(null);
        setAccessDeniedUserEmail(null);
        if (isInAdminArea) {
          window.history.replaceState({}, '', '/admin/login');
          setIsAdminLogin(true);
        }
      } else if (isInAdminArea) {
        checkAdminAuth();
      }
    });

    return () => {
      sub.unsubscribe();
    };
  }, [isInAdminArea, checkAdminAuth]);

  // Handle browser back/forward buttons
  useEffect(() => {
    const handlePopState = () => {
      const parsed = parseLocation();
      setIsInAdminArea(parsed.isInAdmin);
      setIsAdminLogin(parsed.isLogin);
      setAdminRoute(parsed.route);
      setAdminEditProductId(parsed.productId);
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Admin Navigation handler
  const handleAdminNavigate = (route: AdminRoute, productId?: string) => {
    let url = `/admin`;
    if (route === 'products') url = `/admin/products`;
    else if (route === 'product-new') url = `/admin/products/new`;
    else if (route === 'product-edit' && productId) url = `/admin/products/${productId}/edit`;
    else if (route === 'faq') url = `/admin/faq`;
    else if (route === 'about') url = `/admin/about`;

    window.history.pushState({}, '', url);
    setAdminRoute(route);
    setAdminEditProductId(productId);
    setIsAdminLogin(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Switch to Public Site
  const handleViewPublicSite = (page: PageView = 'home') => {
    window.history.pushState({}, '', '/');
    setIsInAdminArea(false);
    setIsAdminLogin(false);
    setCurrentPage(page);
    fetchPublishedProducts();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Open Admin from Public Site
  const handleOpenAdminFromPublic = () => {
    const targetUrl = adminUser ? '/admin' : '/admin/login';
    window.history.pushState({}, '', targetUrl);
    setIsInAdminArea(true);
    setIsAdminLogin(!adminUser);
    setAdminRoute('dashboard');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Admin Logout
  const handleAdminLogout = async () => {
    await authService.signOut();
    setAdminUser(null);
    setAccessDeniedUserEmail(null);
    setAccessDeniedUserId(null);
    setAccessDeniedError(null);
    setIsAdminLogin(true);
    window.history.replaceState({}, '', '/admin/login');
  };

  // Login Success callback
  const handleLoginSuccess = (admin: AdminUser) => {
    setAdminUser(admin);
    setAccessDeniedUserEmail(null);
    setAccessDeniedUserId(null);
    setAccessDeniedError(null);
    setIsAdminLogin(false);
    setAdminRoute('dashboard');
    window.history.pushState({}, '', '/admin');
    fetchAdminProducts();
  };

  // Toast Helper
  const addToast = (type: 'success' | 'info', title: string, message: string) => {
    const id = Date.now().toString();
    const newToast: ToastMessage = { id, type, title, message };
    setToasts((prev) => [...prev, newToast]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4000);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const handleNavigate = (page: PageView) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenProductDetail = (product: Product) => {
    setSelectedDetailProduct(product);
    setCurrentPage('product-detail');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenInquiry = (product: Product) => {
    setInquiryProduct(product);
  };

  const handleCategorySelectFromHome = (categoryId: string) => {
    setSelectedCatalogCategory(categoryId as CategoryId);
    setCurrentPage('products');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // =========================================================================
  // ADMIN DASHBOARD RENDERING
  // =========================================================================
  if (isInAdminArea) {
    // 1. Loading state during auth check
    if (authChecking) {
      return (
        <div className="min-h-screen bg-[#F4F1EB] flex flex-col items-center justify-center font-sans">
          <div className="flex items-center gap-3 text-xs font-semibold text-[#18261E]">
            <Loader2 className="w-5 h-5 animate-spin text-[#2E543F]" />
            <span>Verifying Admin Authorization...</span>
          </div>
        </div>
      );
    }

    // 2. Access Denied: User is authenticated in Supabase but not in admin_users table
    if (accessDeniedUserEmail) {
      return (
        <AdminAccessDeniedView
          userEmail={accessDeniedUserEmail}
          userId={accessDeniedUserId || undefined}
          errorMessage={accessDeniedError || undefined}
          onLogout={handleAdminLogout}
          onViewPublicSite={() => handleViewPublicSite('home')}
        />
      );
    }

    // 3. Login Page (/admin/login or unauthenticated)
    if (isAdminLogin || !adminUser) {
      return (
        <AdminLoginView
          onLoginSuccess={handleLoginSuccess}
          onViewPublicSite={() => handleViewPublicSite('home')}
        />
      );
    }

    // 4. Authorized Admin Dashboard Layout
    return (
      <AdminLayout
        currentRoute={adminRoute}
        onNavigate={handleAdminNavigate}
        onLogout={handleAdminLogout}
        adminUser={adminUser}
        onViewPublicSite={() => handleViewPublicSite('home')}
      >
        {adminRoute === 'dashboard' && (
          <AdminDashboardOverview
            products={adminProducts}
            onNavigate={handleAdminNavigate}
            onRefreshProducts={() => {
              fetchAdminProducts();
              fetchPublishedProducts();
            }}
          />
        )}

        {adminRoute === 'products' && (
          <AdminProductsListView
            products={adminProducts}
            onNavigate={handleAdminNavigate}
            onRefreshProducts={() => {
              fetchAdminProducts();
              fetchPublishedProducts();
            }}
          />
        )}

        {adminRoute === 'product-new' && (
          <AdminProductFormView
            onBack={() => handleAdminNavigate('products')}
            onSaved={() => {
              fetchAdminProducts();
              fetchPublishedProducts();
              handleAdminNavigate('products');
            }}
          />
        )}

        {adminRoute === 'product-edit' && (
          <AdminProductFormView
            productId={adminEditProductId}
            existingProduct={
              adminProducts.find((p) => p.id === adminEditProductId) ||
              products.find((p) => p.id === adminEditProductId) ||
              PRODUCTS.find((p) => p.id === adminEditProductId)
            }
            onBack={() => handleAdminNavigate('products')}
            onSaved={() => {
              fetchAdminProducts();
              fetchPublishedProducts();
              handleAdminNavigate('products');
            }}
          />
        )}

        {adminRoute === 'faq' && <AdminFaqView />}

        {adminRoute === 'about' && <AdminAboutView />}
      </AdminLayout>
    );
  }

  // =========================================================================
  // PUBLIC WEBSITE RENDERING (100% Preserved Design & Functionality)
  // =========================================================================
  return (
    <div className="min-h-screen flex flex-col bg-[#FAF8F5] text-[#202521]">
      {/* Sticky Main Navigation */}
      <Navbar
        currentPage={currentPage}
        onNavigate={handleNavigate}
        onOpenSearch={() => setIsSearchOpen(true)}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        {currentPage === 'home' && (
          <HomeView
            products={products}
            onNavigate={handleNavigate}
            onSelectCategory={handleCategorySelectFromHome}
            onSelectProduct={handleOpenProductDetail}
            onInquireProduct={handleOpenInquiry}
          />
        )}

        {currentPage === 'products' && (
          <ProductsView
            products={products}
            initialCategory={selectedCatalogCategory}
            onSelectProduct={handleOpenProductDetail}
            onInquireProduct={handleOpenInquiry}
          />
        )}

        {currentPage === 'product-detail' && (
          <ProductDetailView
            products={products}
            product={selectedDetailProduct}
            onBack={() => handleNavigate('products')}
            onSelectProduct={handleOpenProductDetail}
            onInquire={handleOpenInquiry}
            onNavigate={handleNavigate}
          />
        )}

        {currentPage === 'about' && <AboutView onNavigate={handleNavigate} />}

        {currentPage === 'faq' && <FaqView onNavigate={handleNavigate} />}

        {currentPage === 'contact' && (
          <ContactView
            onSubmitSuccess={() =>
              addToast(
                'success',
                'Message Addressed to custsvc@nutri-nova.org',
                'Your inquiry has been formulated and dispatched to custsvc@nutri-nova.org.'
              )
            }
          />
        )}
      </main>

      {/* Footer with discreet Admin Portal access */}
      <Footer onNavigate={handleNavigate} />

      {/* Product Quick View Modal */}
      <ProductQuickView
        product={quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
        onInquire={(p) => {
          setQuickViewProduct(null);
          handleOpenInquiry(p);
        }}
        onViewFullDetails={(p) => {
          setQuickViewProduct(null);
          handleOpenProductDetail(p);
        }}
      />

      {/* Dedicated Product Inquiry Modal directed to custsvc@nutri-nova.org */}
      <ProductInquiryModal
        product={inquiryProduct}
        isOpen={Boolean(inquiryProduct)}
        onClose={() => setInquiryProduct(null)}
      />

      {/* Search Modal with dynamic Supabase products */}
      <SearchModal
        products={products}
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onSelectProduct={(p) => {
          setIsSearchOpen(false);
          handleOpenProductDetail(p);
        }}
        onInquireProduct={(p) => {
          setIsSearchOpen(false);
          handleOpenInquiry(p);
        }}
      />

      {/* Floating Notifications */}
      <ToastContainer toasts={toasts} onDismiss={removeToast} />
    </div>
  );
}
