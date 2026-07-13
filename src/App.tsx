import { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowRight,
  CheckCircle2,
  MapPin,
  Mail,
  Phone,
  Menu,
  X,
  ChevronDown,
  MessageSquare,
  Users,
  Calendar,
  Globe,
  Award,
  ShieldCheck,
  Check,
  ChevronRight,
  Briefcase,
  Search,
  ChevronLeft,
  Info,
  DollarSign,
  TrendingUp,
  Hash,
  FileSpreadsheet,
  Home
} from 'lucide-react';

// Types
interface Product {
  id: string;
  name: string;
  category: 'silico-manganese' | 'pig-iron';
  categoryLabel: string;
  price: string;
  moq: string;
  imageUrl: string;
  specs: Record<string, string>;
  description: string;
  features: string[];
}

// 5 exact products with full specifications, images, and prices from Sai Chemicals India
const PRODUCTS: Product[] = [
  {
    id: 'silico-manganese-lumps',
    name: 'Silico Manganese Lumps',
    category: 'silico-manganese',
    categoryLabel: 'Silico Manganese',
    price: 'Rs. 80,000.00',
    moq: '30 Ton',
    imageUrl: 'https://2.wlimg.com/product_images/bc-500/2022/8/6819962/silico-manganese-lumps-1660735377-6494420.jpeg',
    description: 'High-quality Silico Manganese Lumps procured from trusted vendors, rich in silicon and manganese, ideal for steel manufacturing to provide toughness and hardness.',
    features: ['Provides excellent toughness & hardness', 'Acts as a critical deoxidizer', 'Premium Grade specifications'],
    specs: {
      'Business Type': 'Manufacturer, Exporter, Supplier',
      'Country of Origin': 'India',
      'Packaging Type': 'Loose',
      'Grade': '60/15',
      'Silicon': '15% Min',
      'Manganese': '60% min',
      'Phosphorus': '0.35% Max',
      'Sulphur': '0.05%',
      'Size': '100mm',
      'Carbon': '2.50% Max'
    }
  },
  {
    id: 'ferro-silico-manganese-lumps',
    name: 'Ferro Silico Manganese Lumps',
    category: 'silico-manganese',
    categoryLabel: 'Silico Manganese',
    price: 'Rs. 69,000.00 / Metric Ton',
    moq: '30 Metric Tons',
    imageUrl: 'https://2.wlimg.com/product_images/bc-500/2022/8/6819962/ferro-silico-manganese-lumps-1660735501-6494430.jpeg',
    description: 'Specially engineered Ferro Silico Manganese Lumps, perfect for industrial metallurgy. Used as a high-performance alloy in steelmaking.',
    features: ['High-grade industrial application', 'Standard size distribution', 'Consistent chemical composition'],
    specs: {
      'Business Type': 'Manufacturer, Exporter, Supplier',
      'Country of Origin': 'India',
      'Material': 'Ferro Silico',
      'Shape': 'Lumps',
      'Size': '150 mm',
      'Application': 'Industrial',
      'Grade': '60/14',
      'Packaging Type': 'Loose',
      'Silicon': '14% Max',
      'Manganese': '60% Min',
      'Phosphorus': '0.35% max',
      'Sulphur': '0.05% max'
    }
  },
  {
    id: 'grade-65-16-silico-manganese',
    name: 'Grade 65-16 Silico Manganese',
    category: 'silico-manganese',
    categoryLabel: 'Silico Manganese',
    price: 'Rs. 80,000.00 / Ton',
    moq: '30 Ton',
    imageUrl: 'https://2.wlimg.com/product_images/bc-500/2022/8/6819962/grade-65-16-silico-manganese-1660735684-6494448.jpeg',
    description: 'Premium-grade Silico Manganese with rich 65% manganese content. Safe to use with accurate chemical and physical compositions.',
    features: ['Pure & accurate composition', 'Low ash content (10%)', 'Safe and efficient for complex steel mills'],
    specs: {
      'Business Type': 'Manufacturer, Exporter, Supplier',
      'Country of Origin': 'India',
      'Material': 'Manganese',
      'Shape': 'Lump',
      'Feature': 'Pure Accurate, Physical And Chemical Composition, Safe To Use',
      'Ash': '10%',
      'Moisture': '20%',
      'Grade': '65/16',
      'Size': '25 to 150mm or as per buyer specification'
    }
  },
  {
    id: 'pig-iron-lumps',
    name: 'Pig Iron Lumps',
    category: 'pig-iron',
    categoryLabel: 'Pig Iron Lumps',
    price: 'Rs. 30,000.00 / Metric Ton',
    moq: '30 Ton',
    imageUrl: 'https://2.wlimg.com/product_images/bc-500/2022/8/6819962/pig-iron-lumps-1660735795-6494459.jpeg',
    description: 'Excellent Grade A Pig Iron Lumps designed for high-end metallurgical processes. Helps in crafting superior steel castings and other iron alloy products.',
    features: ['Consistent solid lumps format', 'Highly pure metallurgical iron', 'Ensures high quality in finished castings'],
    specs: {
      'Business Type': 'Manufacturer, Exporter, Supplier',
      'Country of Origin': 'India',
      'Material': 'Pig Iron',
      'Packaging Type': 'Loose',
      'Grade': 'A',
      'Form': 'Solid Lumps',
      'Usage/Application': 'Industrial',
      'Silicon': '3.5% Min',
      'Manganese': '0.5% Min',
      'Phosphorus': '0.120% Max',
      'Sulphur': '0.05% Max'
    }
  },
  {
    id: 'high-carbon-silico-manganese',
    name: 'High Carbon Silico Manganese',
    category: 'silico-manganese',
    categoryLabel: 'Silico Manganese',
    price: 'Rs. 78,000.00 - 85,000.00 / Metric Ton',
    moq: '30 Ton',
    imageUrl: 'https://2.wlimg.com/product_images/bc-full/2022/8/6819962/high-carbon-silico-manganese-1659978112-2879958.jpg',
    description: 'High Carbon Silico Manganese of natural grey color with a minimum of 60% manganese, manufactured to deliver maximum efficiency in high-temperature blast furnaces.',
    features: ['Natural-grey premium aesthetics', 'Minimum 60% Manganese richness', 'Perfect for heavy duty alloy applications'],
    specs: {
      'Business Type': 'Manufacturer, Exporter, Supplier',
      'Country of Origin': 'India',
      'Type': 'Silico Manganese',
      'Application': 'Industrial',
      'Color': 'Natural-grey',
      'Manganese': '60% Min',
      'Silicon': '14% Min',
      'Carbon': '2.5% Max',
      'Phosphorus': '0.35% Max',
      'Sulphur': '0.05% Max'
    }
  }
];

const TESTIMONIALS = [
  {
    text: "Quality customer service that helps you to get what you want, a pleasure to use your products, thank you",
    author: "Basudev Mondal",
    role: "Steel Mill Procurement Lead"
  },
  {
    text: "Sai Chemicals Private Limited has an excellent staff for assistance",
    author: "Venkata Lakshmi Thatiparti",
    role: "Industrial Chemist"
  },
  {
    text: "Products are made up with the standard quality raw materials, one should try their product",
    author: "Shravya Yagain",
    role: "Metallurgical Director"
  },
  {
    text: "A go-to destination for premium products. Highly recommended",
    author: "Mahadevi Mangrule",
    role: "Quality Assurance Head"
  },
  {
    text: "Stellar presentation, elevating the aesthetic experience",
    author: "Aman Kumar",
    role: "Foundry Operations Manager"
  },
  {
    text: "This company is serving clients with good quality materials",
    author: "Manoj Kumar",
    role: "Steel Production Consultant"
  },
  {
    text: "Remarkable product, the epitome of innovation and reliability",
    author: "S SANJAY",
    role: "Senior Metallurgist"
  },
  {
    text: "Kudos to the team behind this remarkable product",
    author: "Mitesh Rathod",
    role: "Supply Chain Head"
  }
];

function App() {
  const [currentPage, setCurrentPage] = useState<'home' | 'about' | 'products' | 'contact'>('home');
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'silico-manganese' | 'pig-iron'>('all');
  const [selectedProductId, setSelectedProductId] = useState<string | null>(null);

  // Modals & Dynamic UI states
  const [isEnquiryModalOpen, setIsEnquiryModalOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [productsDropdownOpen, setProductsDropdownOpen] = useState(false);

  // Form states
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterSubscribed, setNewsletterSubscribed] = useState(false);
  const [quickEnquiryForm, setQuickEnquiryForm] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
    city: '',
    productName: 'General Query'
  });
  const [enquirySuccess, setEnquirySuccess] = useState(false);

  // Product Search State
  const [searchQuery, setSearchQuery] = useState('');

  // Slideshow States
  const [activeSlide, setActiveSlide] = useState(0);
  const autoSlideTimer = useRef<number | null>(null);

  // Touch handlers for mobile swipe
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.targetTouches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return;
    const diffX = touchStartX.current - touchEndX.current;
    if (diffX > 50) {
      handleNextSlide();
    } else if (diffX < -50) {
      handlePrevSlide();
    }
    touchStartX.current = null;
    touchEndX.current = null;
  };

  // Scroll detection for Navbar styling (adjusted threshold for brand header height)
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 150);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Handle Slideshow auto-rotation
  useEffect(() => {
    autoSlideTimer.current = window.setInterval(() => {
      setActiveSlide(prev => (prev + 1) % PRODUCTS.length);
    }, 5000);

    return () => {
      if (autoSlideTimer.current) {
        window.clearInterval(autoSlideTimer.current);
      }
    };
  }, []);

  const handleNextSlide = () => {
    setActiveSlide(prev => (prev + 1) % PRODUCTS.length);
  };

  const handlePrevSlide = () => {
    setActiveSlide(prev => (prev - 1 + PRODUCTS.length) % PRODUCTS.length);
  };

  // Custom function to navigate to pages and reset top view scroll
  const navigateTo = (page: 'home' | 'about' | 'products' | 'contact', category?: 'all' | 'silico-manganese' | 'pig-iron', productId?: string | null) => {
    setCurrentPage(page);
    if (category) setSelectedCategory(category);
    setSelectedProductId(productId || null);
    setIsMenuOpen(false);
    setProductsDropdownOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Trigger enquiry modal with specific product prefilled
  const openEnquiryModal = (productName: string) => {
    setQuickEnquiryForm(prev => ({ ...prev, productName }));
    setIsEnquiryModalOpen(true);
  };

  // Handle Enquiry submission
  const handleEnquirySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setEnquirySuccess(true);
    setTimeout(() => {
      setEnquirySuccess(false);
      setIsEnquiryModalOpen(false);
      setQuickEnquiryForm({
        name: '',
        email: '',
        phone: '',
        message: '',
        city: '',
        productName: 'General Query'
      });
    }, 2500);
  };

  // Handle Newsletter submission
  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newsletterEmail) {
      setNewsletterSubscribed(true);
      setTimeout(() => {
        setNewsletterSubscribed(false);
        setNewsletterEmail('');
      }, 3000);
    }
  };

  // Handle Search Submission
  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      // Find matches
      const query = searchQuery.toLowerCase();
      const match = PRODUCTS.find(p => p.name.toLowerCase().includes(query) || p.description.toLowerCase().includes(query));
      if (match) {
        // Direct to that product
        navigateTo('products', match.category, match.id);
      } else {
        // Direct to products tab
        navigateTo('products', 'all');
      }
    }
  };

  return (
    <div className="min-h-screen bg-[#fafafb] text-[#111111] font-sans antialiased overflow-x-hidden selection:bg-[#0099ff] selection:text-white pb-20 md:pb-0">
      {/* Decorative Orbs in background to capture the gorgeous "Orchids-AV" / "Lumora" premium vibe */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden -z-10">
        <div className="absolute top-[10%] left-[-10%] w-[500px] h-[500px] bg-gradient-to-tr from-blue-200/40 to-transparent rounded-full blur-[100px] opacity-70 animate-[pulse_10s_infinite]" />
        <div className="absolute top-[40%] right-[-10%] w-[600px] h-[600px] bg-gradient-to-bl from-blue-100/40 to-transparent rounded-full blur-[120px] opacity-80" />
        <div className="absolute bottom-[10%] left-[5%] w-[450px] h-[450px] bg-gradient-to-r from-gray-200/55 to-transparent rounded-full blur-[90px] opacity-60" />
      </div>

      {/* SEARCH PRODUCTS BAR AT THE VERY TOP */}
      <div className="bg-gray-950 text-white py-3.5 px-6 border-b border-gray-900 relative z-50">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-xs font-semibold tracking-wider text-gray-400 uppercase">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-blue-400 opacity-75"></span>
              <span className="relative inline-flex h-2 w-2 rounded-full bg-[#0099ff]"></span>
            </span>
            <span>Welcome to Sai Chemicals Private Limited</span>
          </div>

          <form onSubmit={handleSearchSubmit} className="relative flex items-center w-full max-w-xs shrink-0">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search Products..."
              className="w-full bg-gray-900 text-xs text-white rounded-full pl-4 pr-10 py-2 focus:outline-none focus:ring-1 focus:ring-[#0099ff] border border-gray-800"
            />
            <button
              type="submit"
              className="absolute right-1 p-1 bg-[#0099ff] hover:bg-blue-600 rounded-full transition-all text-white cursor-pointer"
            >
              <Search className="w-3.5 h-3.5" />
            </button>
          </form>
        </div>
      </div>

      {/* PROMINENT BRAND HEADER IN THE WHITE SPACE BELOW SEARCH BAR */}
      <div className="bg-white border-b border-gray-100 py-6 px-6 relative z-30 shadow-xs">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4.5 text-center md:text-left flex-col md:flex-row">
            <img
              src="/favicon.jpg"
              alt="Sai Chemicals Logo"
              className="w-20 h-20 rounded-full object-contain shadow-md border border-gray-50 bg-white p-1"
            />
            <div>
              <h1 className="text-2xl md:text-3.5xl font-extrabold tracking-tight text-gray-950 uppercase leading-none">
                Sai Chemicals Private Limited
              </h1>
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mt-1.5">
                ISO 9001:2015 Certified Manufacturer, Exporter & Supplier
              </p>
            </div>
          </div>

          {/* Quick Stats / Info Details */}
          <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-8 text-xs text-gray-500 font-semibold border-t sm:border-t-0 border-gray-100 pt-4 sm:pt-0 w-full md:w-auto justify-center md:justify-end">
            <div className="flex items-center gap-2">
              <div className="p-2 bg-blue-50 text-[#0099ff] rounded-xl">
                <MapPin className="w-4 h-4" />
              </div>
              <div>
                <span className="block text-[10px] text-gray-400 uppercase tracking-wider font-bold">Location</span>
                <span className="text-gray-800 font-bold">Rajnandgaon, Chhattisgarh</span>
              </div>
            </div>

            <div className="flex items-center gap-2 border-t sm:border-t-0 sm:border-l border-gray-100 pt-3 sm:pt-0 sm:pl-8 w-full sm:w-auto">
              <div className="p-2 bg-blue-50 text-[#0099ff] rounded-xl">
                <Hash className="w-4 h-4" />
              </div>
              <div>
                <span className="block text-[10px] text-gray-400 uppercase tracking-wider font-bold">GSTIN No.</span>
                <span className="text-gray-800 font-bold">22AADCS3777J1Z6</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Bar - Changed to sticky with dynamic top-0 to anchor touch roof of screen with no gaps */}
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className={`sticky top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled
            ? 'bg-white/95 backdrop-blur-md shadow-md py-3.5 border-b border-gray-100'
            : 'bg-white/90 backdrop-blur-md py-4 border-b border-gray-100/50'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">

          {/* Logo Brand area */}
          <div className="flex items-center cursor-pointer animate-fade-in" onClick={() => navigateTo('home')}>
            <div className="relative flex items-center gap-3">
              <img
                src="/favicon.jpg"
                alt="Sai Chemicals Logo"
                className="h-10 w-10 object-contain rounded-full"
              />
              <div>
                <span className="font-display font-bold text-lg md:text-xl tracking-tight text-gray-900 block leading-tight">
                  SAI CHEMICALS
                </span>
                <span className="text-[10px] text-gray-500 uppercase tracking-widest font-semibold block leading-none">
                  Private Limited
                </span>
              </div>
            </div>
          </div>

          {/* Desktop Navigation Links with animated hover lines */}
          <div className="hidden md:flex items-center gap-8 text-[15px] font-medium text-gray-600">
            <button
              onClick={() => navigateTo('home')}
              className={`relative py-2 hover:text-black transition-colors cursor-pointer ${currentPage === 'home' ? 'text-black font-semibold' : ''}`}
            >
              Home
              {currentPage === 'home' && (
                <motion.span layoutId="navIndicator" className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#0099ff] rounded-full" />
              )}
            </button>
            <button
              onClick={() => navigateTo('about')}
              className={`relative py-2 hover:text-black transition-colors cursor-pointer ${currentPage === 'about' ? 'text-black font-semibold' : ''}`}
            >
              About Us
              {currentPage === 'about' && (
                <motion.span layoutId="navIndicator" className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#0099ff] rounded-full" />
              )}
            </button>

            {/* Products Interactive Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setProductsDropdownOpen(true)}
              onMouseLeave={() => setProductsDropdownOpen(false)}
            >
              <button
                onClick={() => navigateTo('products')}
                className={`relative py-2 hover:text-black flex items-center gap-1 transition-colors cursor-pointer ${currentPage === 'products' ? 'text-black font-semibold' : ''}`}
              >
                Products
                <ChevronDown className="w-4 h-4 transition-transform duration-200" style={{ transform: productsDropdownOpen ? 'rotate(180deg)' : 'none' }} />
                {currentPage === 'products' && (
                  <motion.span layoutId="navIndicator" className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#0099ff] rounded-full" />
                )}
              </button>

              <AnimatePresence>
                {productsDropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ duration: 0.2 }}
                    className="absolute left-0 mt-1 w-64 bg-white/95 backdrop-blur-md rounded-2xl shadow-xl border border-gray-100 p-3 flex flex-col gap-1 z-50"
                  >
                    <div className="text-[11px] uppercase font-bold tracking-wider text-gray-400 px-3 py-1 border-b border-gray-50 mb-1">
                      Categories
                    </div>
                    <button
                      onClick={() => navigateTo('products', 'silico-manganese')}
                      className="text-left w-full px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-xl transition-colors flex items-center justify-between group cursor-pointer"
                    >
                      <span>Silico Manganese</span>
                      <ChevronRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all text-[#0099ff]" />
                    </button>
                    <button
                      onClick={() => navigateTo('products', 'pig-iron')}
                      className="text-left w-full px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-xl transition-colors flex items-center justify-between group cursor-pointer"
                    >
                      <span>Pig Iron Lumps</span>
                      <ChevronRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all text-[#0099ff]" />
                    </button>

                    <div className="border-t border-gray-100 my-1 pt-1">
                      <button
                        onClick={() => navigateTo('products', 'all')}
                        className="text-left w-full px-3 py-2 text-xs font-semibold text-[#0099ff] hover:bg-blue-50 rounded-xl transition-colors flex items-center justify-between cursor-pointer"
                      >
                        <span>View All Products</span>
                        <ArrowRight className="w-3 h-3" />
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <button
              onClick={() => navigateTo('contact')}
              className={`relative py-2 hover:text-black transition-colors cursor-pointer ${currentPage === 'contact' ? 'text-black font-semibold' : ''}`}
            >
              Contact Us
              {currentPage === 'contact' && (
                <motion.span layoutId="navIndicator" className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#0099ff] rounded-full" />
              )}
            </button>
          </div>

          {/* Action Buttons */}
          <div className="hidden md:flex items-center gap-4">
            <button
              onClick={() => openEnquiryModal('General Query')}
              className="btn-odysser px-5 py-2.5 text-[14px] font-semibold tracking-wide cursor-pointer text-white bg-black hover:bg-black/90 transition-all rounded-xl relative overflow-hidden group shadow-lg"
            >
              <span className="relative z-10 flex items-center gap-1.5">
                Quick Quote <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </span>
              <span className="absolute inset-0 shimmer-bg opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></span>
            </button>
          </div>

          {/* Mobile menu trigger */}
          <button
            className="md:hidden p-2 rounded-xl bg-gray-50 text-gray-800 cursor-pointer"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation Drawer with staggered animations */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="md:hidden bg-white/95 backdrop-blur-md border-b border-gray-100 overflow-hidden"
            >
              <div className="px-6 py-5 flex flex-col gap-4">
                <button
                  onClick={() => navigateTo('home')}
                  className={`text-left text-lg font-semibold py-1.5 border-b border-gray-50 cursor-pointer ${currentPage === 'home' ? 'text-[#0099ff]' : 'text-gray-800'}`}
                >
                  Home
                </button>
                <button
                  onClick={() => navigateTo('about')}
                  className={`text-left text-lg font-semibold py-1.5 border-b border-gray-50 cursor-pointer ${currentPage === 'about' ? 'text-[#0099ff]' : 'text-gray-800'}`}
                >
                  About Us
                </button>

                {/* Mobile products list */}
                <div className="flex flex-col gap-2">
                  <div className="text-sm font-bold uppercase tracking-wider text-gray-400">Our Products</div>
                  <button
                    onClick={() => navigateTo('products', 'silico-manganese')}
                    className="text-left text-base text-gray-700 pl-4 py-1 flex items-center gap-2 cursor-pointer"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-[#0099ff]" /> Silico Manganese
                  </button>
                  <button
                    onClick={() => navigateTo('products', 'pig-iron')}
                    className="text-left text-base text-gray-700 pl-4 py-1 flex items-center gap-2 cursor-pointer"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-[#0099ff]" /> Pig Iron Lumps
                  </button>
                  <button
                    onClick={() => navigateTo('products', 'all')}
                    className="text-left text-sm text-[#0099ff] pl-4 font-semibold py-1 cursor-pointer"
                  >
                    View All Products &rarr;
                  </button>
                </div>

                <button
                  onClick={() => navigateTo('contact')}
                  className={`text-left text-lg font-semibold py-1.5 border-b border-gray-50 cursor-pointer ${currentPage === 'contact' ? 'text-[#0099ff]' : 'text-gray-800'}`}
                >
                  Contact Us
                </button>

                <button
                  onClick={() => openEnquiryModal('General Query')}
                  className="btn-odysser w-full mt-2 py-3 bg-[#0099ff] hover:bg-blue-600 text-white rounded-xl font-semibold text-center cursor-pointer"
                >
                  Enquiry Now
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      {/* Main Dynamic Viewport Container - Reduced top padding because navigation bar is sticky instead of fixed */}
      <div className="pt-8 pb-10">

        {/* ================= HOME PAGE ================= */}
        {currentPage === 'home' && selectedProductId === null && (
          <div>
            {/* Hero Header Area Reorganized */}
            <section className="relative pt-6 pb-12 px-6 text-center">
              <div className="max-w-4xl mx-auto space-y-6">

                {/* Certified Manufacturer badge */}
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 border border-blue-100 shadow-sm animate-pulse-slow">
                  <span className="relative flex h-2.5 w-2.5">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-blue-400 opacity-75"></span>
                    <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-[#0099ff]"></span>
                  </span>
                  <span className="text-xs font-semibold uppercase tracking-wider text-blue-800">
                    ISO 9001:2015 Certified Manufacturer
                  </span>
                </div>

                <p className="text-gray-500 max-w-2xl mx-auto text-sm md:text-base leading-relaxed">
                  Leading manufacturer, exporter, and supplier of high-grade Ferro Silico Manganese Lumps and Pig Iron Lumps based in Rajnandgaon, Chhattisgarh. We deliver superior chemical consistency and metallurgy toughness globally.
                </p>

                {/* Call to Actions Only below */}
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
                  <button
                    onClick={() => navigateTo('products')}
                    className="btn-odysser px-8 py-3.5 bg-black text-white hover:bg-black/90 font-semibold text-base w-full sm:w-auto shadow-xl group cursor-pointer"
                  >
                    <span className="relative z-10 flex items-center justify-center gap-2">
                      Explore Products
                      <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </span>
                    <span className="absolute inset-0 shimmer-bg opacity-0 group-hover:opacity-100 pointer-events-none"></span>
                  </button>

                  <button
                    onClick={() => navigateTo('about')}
                    className="px-8 py-3.5 bg-white hover:bg-gray-50 border border-gray-200 text-gray-700 font-semibold text-base w-full sm:w-auto rounded-xl shadow-sm transition-all cursor-pointer"
                  >
                    Learn About Us
                  </button>
                </div>

              </div>
            </section>

            {/* SMOOTH PRODUCT SLIDESHOW - TEXT AND BUTTONS REMOVED AS REQUESTED, ADDED MOBILE SWIPE EVENT HANDLERS */}
            <section className="py-6 px-6 max-w-5xl mx-auto">
              <div
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
                className="relative glass-card overflow-hidden rounded-3xl min-h-[480px] md:h-[520px] flex items-center justify-center group shadow-2xl border-0 bg-gray-50 select-none touch-pan-y"
              >

                {/* Slide Viewport */}
                <div className="absolute inset-0 z-0">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={activeSlide}
                      initial={{ opacity: 0, scale: 1.02 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.98 }}
                      transition={{ duration: 0.6 }}
                      className="absolute inset-0 bg-contain bg-center bg-no-repeat bg-gray-50 cursor-pointer"
                      style={{ backgroundImage: `url(${PRODUCTS[activeSlide].imageUrl})` }}
                      onClick={() => navigateTo('products', PRODUCTS[activeSlide].category, PRODUCTS[activeSlide].id)}
                    />
                  </AnimatePresence>
                </div>

                {/* Slider UI controls (Arrows and Dots) */}
                <div className="absolute bottom-6 right-6 z-20 flex gap-2">
                  <button
                    onClick={handlePrevSlide}
                    className="p-3 rounded-full bg-black/50 hover:bg-black/70 text-white transition-all cursor-pointer shadow-md backdrop-blur-md"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button
                    onClick={handleNextSlide}
                    className="p-3 rounded-full bg-black/50 hover:bg-black/70 text-white transition-all cursor-pointer shadow-md backdrop-blur-md"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>

                {/* Top indicators: Navigation Dots */}
                <div className="absolute bottom-8 left-8 z-20 flex gap-2">
                  {PRODUCTS.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveSlide(idx)}
                      className={`h-2 rounded-full transition-all cursor-pointer ${activeSlide === idx ? 'bg-[#0099ff] w-8' : 'bg-black/30 w-2'}`}
                    />
                  ))}
                </div>

              </div>
            </section>

            {/* Brief About Section */}
            <section className="py-12 px-6">
              <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
                <div className="space-y-6">
                  <div className="inline-block px-3 py-1 bg-blue-50 border border-blue-100 rounded-full text-xs font-bold text-[#0099ff] uppercase tracking-wider">
                    REPUTED MANUFACTURER
                  </div>
                  <h2 className="text-3xl md:text-4xl font-display font-bold text-gray-900 tracking-tight">
                    About Sai Chemicals Private Limited
                  </h2>
                  <p className="text-gray-600 leading-relaxed">
                    SAI Chemicals Private Limited is a renowned and reputed manufacturer and supplier of Silico Manganese and Pig Iron lumps at market-competitive prices. Our products are rich in silicon and manganese made by the heating mixture of oxides. Our product acts as a deoxidizer and also acts as an alloy in steel.
                  </p>
                  <p className="text-gray-600 leading-relaxed">
                    We are known for offering superior quality throughout the process. We are procuring high-quality raw materials from reliable vendors in the market at cost-effective prices.
                  </p>
                  <div>
                    <button
                      onClick={() => navigateTo('about')}
                      className="btn-odysser px-6 py-3 bg-black text-white hover:bg-black/90 font-semibold rounded-xl text-sm flex items-center gap-2 group shadow-md cursor-pointer"
                    >
                      Read More <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </div>

                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-tr from-[#0099ff]/10 to-transparent rounded-3xl blur-2xl transform rotate-3" />
                  <div className="relative glass-card bg-white p-8 border border-gray-100 flex flex-col gap-6 shadow-xl">
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center text-[#0099ff] shrink-0">
                        <Award className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="font-bold text-lg text-gray-900">Product Assurance</h4>
                        <p className="text-sm text-gray-500 mt-1">We maintain strict checks to ensure the highest specifications follow the industry norms.</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4 border-t border-gray-50 pt-6">
                      <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center text-[#0099ff] shrink-0">
                        <ShieldCheck className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="font-bold text-lg text-gray-900">Premium Raw Materials</h4>
                        <p className="text-sm text-gray-500 mt-1">Sourced only from industry reliable vendors for continuous high yield and toughness.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Latest Products Grid section - Displays all 5 products */}
            <section className="py-16 px-6 bg-gradient-to-b from-transparent to-gray-50">
              <div className="max-w-6xl mx-auto">
                <div className="text-center mb-12">
                  <span className="text-[#0099ff] font-bold text-xs uppercase tracking-widest block mb-2">Our Offerings</span>
                  <h2 className="text-3xl md:text-5xl font-display font-bold tracking-tight text-gray-900">Latest Products</h2>
                  <p className="text-gray-500 mt-4 max-w-2xl mx-auto">Explore our range of Silico Manganese and Pig Iron Lumps designed for high-performance metallurgy.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {PRODUCTS.map((prod) => (
                    <motion.div
                      key={prod.id}
                      whileHover={{ y: -8 }}
                      className="bg-white rounded-3xl border border-gray-100/60 shadow-[0_10px_35px_rgba(0,0,0,0.03)] overflow-hidden flex flex-col h-full"
                    >
                      {/* Product Visual Area */}
                      <div className="h-48 bg-gray-100 relative overflow-hidden">
                        <img
                          src={prod.imageUrl}
                          alt={prod.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                        <span className="absolute top-4 left-4 px-3 py-1 bg-white/25 backdrop-blur-md rounded-full text-[10px] uppercase tracking-wider font-bold text-white">
                          {prod.categoryLabel}
                        </span>

                        <div className="absolute bottom-4 left-4 right-4 z-10">
                          <h3 className="text-lg font-bold font-display text-white tracking-tight leading-tight">
                            {prod.name}
                          </h3>
                        </div>
                      </div>

                      {/* Details & Specs */}
                      <div className="p-6 flex-1 flex flex-col justify-between">
                        <div className="space-y-4">
                          <p className="text-sm text-gray-500 line-clamp-2">
                            {prod.description}
                          </p>

                          <div className="flex justify-between items-center bg-blue-50/50 rounded-xl px-4 py-2 text-xs">
                            <span className="text-blue-700 font-bold uppercase tracking-wider">Price</span>
                            <span className="text-gray-800 font-extrabold">{prod.price}</span>
                          </div>

                          {/* Quick spec table */}
                          <div className="bg-gray-50 rounded-2xl p-4 space-y-2 text-xs">
                            {Object.entries(prod.specs).slice(0, 4).map(([key, value]) => (
                              <div key={key} className="flex justify-between border-b border-gray-100 pb-1.5 last:border-0 last:pb-0">
                                <span className="text-gray-400 font-medium">{key}</span>
                                <span className="text-gray-800 font-semibold text-right">{value}</span>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Interactive Buttons */}
                        <div className="grid grid-cols-2 gap-3 mt-6">
                          <button
                            onClick={() => openEnquiryModal(prod.name)}
                            className="px-4 py-2.5 bg-black hover:bg-gray-900 text-white font-semibold text-xs rounded-xl transition-all shadow-sm text-center cursor-pointer"
                          >
                            Enquiry Now
                          </button>
                          <button
                            onClick={() => navigateTo('products', prod.category, prod.id)}
                            className="px-4 py-2.5 bg-gray-50 hover:bg-gray-100 border border-gray-200 text-gray-700 font-semibold text-xs rounded-xl transition-all text-center cursor-pointer"
                          >
                            Read More
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </section>

            {/* Quality, Product Assurance, Why us? Key Insights Tabs/Cards */}
            <section className="py-16 px-6">
              <div className="max-w-6xl mx-auto">
                <div className="text-center mb-12">
                  <span className="text-[#0099ff] font-bold text-xs uppercase tracking-widest block mb-2">Our Pillars</span>
                  <h2 className="text-3xl md:text-5xl font-display font-bold tracking-tight text-gray-900">Why Partner With Us?</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {[
                    {
                      title: "Quality",
                      text: "Our product acts as a deoxidizer and also acts as an alloy in steel. We are known for offering superior quality throughout the process. We are procuring highest quality standards throughout our entire manufacturing process.",
                      highlight: "Superior Steel Alloying"
                    },
                    {
                      title: "Product Assurance",
                      text: "We are maintaining our product quality to be used in other industries. Our products are widely used for alloying for the manufacture of steel. The silicon manganese provides toughness and hardness to the steel. Our Pig Iron also helps in making high-quality steel products.",
                      highlight: "Certified Specifications"
                    },
                    {
                      title: "Why Us?",
                      text: "Established in Rajnandgaon, we are operating since 2014, we are into the manufacturing of high-quality manganese and pig iron with an annual production of 14000 MT effectively. We are offering a wide range of quality raw materials at hassle-free rates.",
                      highlight: "14,000 MT Annual Capacity"
                    }
                  ].map((pillar, idx) => (
                    <div
                      key={idx}
                      className="glass-card bg-white p-8 border border-gray-100 relative flex flex-col justify-between h-full hover:shadow-[0_15px_40px_rgba(0,0,0,0.05)] transition-all"
                    >
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <h3 className="text-2xl font-bold font-display text-gray-900">{pillar.title}</h3>
                          <span className="w-2.5 h-2.5 rounded-full bg-[#0099ff]" />
                        </div>
                        <p className="text-gray-500 text-sm leading-relaxed">{pillar.text}</p>
                      </div>
                      <div className="mt-6 pt-4 border-t border-gray-50">
                        <span className="text-xs font-bold uppercase text-[#0099ff] tracking-wider bg-blue-50 px-3 py-1 rounded-full">
                          {pillar.highlight}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* Testimonials section */}
            <section className="py-16 px-6 bg-gray-50/50">
              <div className="max-w-6xl mx-auto">
                <div className="text-center mb-12">
                  <span className="text-[#0099ff] font-bold text-xs uppercase tracking-widest block mb-2">Feedbacks</span>
                  <h2 className="text-3xl md:text-5xl font-display font-bold tracking-tight text-gray-900">Client Testimonials</h2>
                  <p className="text-gray-500 mt-4">Hear from standard steel mill complexes and exporters who trust our chemicals.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {TESTIMONIALS.map((t, idx) => (
                    <motion.div
                      key={idx}
                      whileHover={{ y: -4 }}
                      className="bg-white p-8 rounded-3xl border border-gray-100/80 shadow-[0_5px_20px_rgba(0,0,0,0.015)] flex flex-col justify-between"
                    >
                      <p className="text-gray-600 italic text-sm leading-relaxed">
                        "{t.text}"
                      </p>
                      <div className="mt-6 pt-4 border-t border-gray-50 flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-[#0099ff] font-bold text-sm shrink-0">
                          {t.author.charAt(0)}
                        </div>
                        <div>
                          <h4 className="font-bold text-sm text-gray-800">{t.author}</h4>
                          <p className="text-xs text-gray-400">{t.role}</p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </section>
          </div>
        )}

        {/* ================= ABOUT US PAGE ================= */}
        {currentPage === 'about' && selectedProductId === null && (
          <div className="px-6 py-8 md:py-12">
            <div className="max-w-6xl mx-auto">

              {/* Breadcrumb & Header */}
              <div className="mb-10 text-center md:text-left">
                <div className="flex justify-center md:justify-start items-center gap-2 text-xs text-gray-400 font-medium uppercase tracking-wider mb-3">
                  <button onClick={() => navigateTo('home')} className="hover:text-black cursor-pointer">Home</button>
                  <ChevronRight className="w-3 h-3" />
                  <span className="text-gray-900 font-semibold">About Us</span>
                </div>
                <h1 className="text-4xl md:text-6xl font-display font-bold text-gray-900 tracking-tight leading-tight">
                  About Us
                </h1>
              </div>

              {/* Main Content Sections */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">

                {/* Left Area: Comprehensive corporate texts */}
                <div className="lg:col-span-2 space-y-10">
                  <div className="glass-card bg-white p-8 md:p-10 border border-gray-100 shadow-xl space-y-6">
                    <h2 className="text-2xl font-bold font-display text-[#0099ff]">Sai Chemicals Private Limited</h2>
                    <p className="text-gray-600 leading-relaxed text-base">
                      SAI Chemicals Private Limited is a renowned and reputed manufacturer and supplier of Silico Manganese and Pig Iron lumps at market-competitive prices. Our products are rich in silicon and manganese made by the heating mixture of oxides. Our product acts as a deoxidizer and also acts as an alloy in steel. We are known for offering superior quality throughout the process. We are procuring high-quality raw materials from reliable vendors in the market at cost-effective prices.
                    </p>
                  </div>

                  <div className="glass-card bg-white p-8 md:p-10 border border-gray-100 shadow-xl space-y-6">
                    <h2 className="text-2xl font-bold font-display text-gray-900">Product Assurance</h2>
                    <p className="text-gray-600 leading-relaxed text-base">
                      We are maintaining our product quality to be used in other industries. Our products are widely used for alloying for the manufacture of steel. The silicon manganese provides toughness and hardness to the steel. Our Pig Iron also helps in making high-quality steel products. Our experienced professionals that are self-sufficient in the industry ensure specifications are carried out following the industry norms. We are utilizing and equipped with modern and advanced pieces of machinery for providing the best quality products to the customers.
                    </p>
                  </div>

                  <div className="glass-card bg-white p-8 md:p-10 border border-gray-100 shadow-xl space-y-6">
                    <h2 className="text-2xl font-bold font-display text-gray-900">Why us?</h2>
                    <p className="text-gray-600 leading-relaxed text-base">
                      Established in Rajnandgaon, we are operating since 2014, we are into the manufacturing of high-quality manganese and pig iron with an annual production of 14000 MT effectively. We are offering a wide range of quality raw materials at hassle-free rates. Due to our excellent products, our products are popularly used in iron castings, and steel mill complexes to ensure a flawless range of dispatch in the market. We are offering a one-stop solution for silicon manganese and pig iron to ensure products are as per industry standards.
                    </p>
                  </div>
                </div>

                {/* Right Area: Corporate Profile Specs - REMOVED BOXES AND MADE IT A BEAUTIFUL VERTICAL TEXT FORMAT LIST */}
                <div className="space-y-6">
                  <div className="glass-card bg-white p-8 border border-gray-100 shadow-xl">
                    <h3 className="text-xl font-bold font-display mb-6 pb-3 border-b border-gray-100 text-gray-900">Corporate Details</h3>

                    <div className="space-y-5">
                      {[
                        { icon: <Briefcase className="w-5 h-5 text-[#0099ff]" />, label: 'Nature of Business', value: 'Manufacturers, Exporters, Wholesaler' },
                        { icon: <Users className="w-5 h-5 text-[#0099ff]" />, label: 'Number of Employees', value: '11 to 25 People' },
                        { icon: <Calendar className="w-5 h-5 text-[#0099ff]" />, label: 'Year of Establishment', value: '1994' },
                        { icon: <Globe className="w-5 h-5 text-[#0099ff]" />, label: 'Market Covered', value: 'Globally' },
                        { icon: <Info className="w-5 h-5 text-[#0099ff]" />, label: 'Name of CEO', value: 'Mr. Rahul Sial' },
                        { icon: <Hash className="w-5 h-5 text-[#0099ff]" />, label: 'GST Number', value: '22AADCS3777J1Z6' },
                        { icon: <DollarSign className="w-5 h-5 text-[#0099ff]" />, label: 'Annual Turnover', value: 'Rs. 25 - 50 Crore' },
                        { icon: <TrendingUp className="w-5 h-5 text-[#0099ff]" />, label: 'Legal Status of Firm', value: 'Limited Company (Ltd./Pvt.Ltd.)' }
                      ].map((item, idx) => (
                        <div key={idx} className="flex items-start gap-3.5 border-b border-gray-50 pb-4 last:border-0 last:pb-0">
                          <div className="p-2 bg-blue-50/50 rounded-xl shrink-0">
                            {item.icon}
                          </div>
                          <div>
                            <span className="block text-[11px] font-bold text-gray-400 uppercase tracking-widest">{item.label}</span>
                            <span className="block font-bold text-gray-800 text-sm mt-0.5 leading-snug">{item.value}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="bg-gradient-to-tr from-gray-900 to-slate-800 rounded-3xl p-8 text-white relative overflow-hidden shadow-xl">
                    <div className="absolute top-0 right-0 w-24 h-24 bg-[#0099ff]/20 rounded-full blur-xl" />
                    <h4 className="text-lg font-bold font-display mb-2 text-[#0099ff]">Need Custom Specs?</h4>
                    <p className="text-xs text-gray-300 leading-relaxed mb-6">We provide custom alloy combinations. Submit an enquiry specifying the Silicon, Manganese, and Ash proportions required.</p>
                    <button
                      onClick={() => openEnquiryModal('Custom Spec Request')}
                      className="w-full py-3 bg-[#0099ff] hover:bg-blue-600 transition-all font-semibold rounded-xl text-xs text-center text-white cursor-pointer"
                    >
                      Enquire Custom Grades
                    </button>
                  </div>
                </div>

              </div>

            </div>
          </div>
        )}

        {/* ================= PRODUCTS PAGE ================= */}
        {currentPage === 'products' && selectedProductId === null && (
          <div className="px-6 py-8 md:py-12">
            <div className="max-w-6xl mx-auto">

              {/* Header */}
              <div className="mb-10 text-center md:text-left">
                <div className="flex justify-center md:justify-start items-center gap-2 text-xs text-gray-400 font-medium uppercase tracking-wider mb-3">
                  <button onClick={() => navigateTo('home')} className="hover:text-black cursor-pointer">Home</button>
                  <ChevronRight className="w-3 h-3" />
                  <span className="text-gray-900 font-semibold">Products</span>
                </div>
                <h1 className="text-4xl md:text-6xl font-display font-bold text-gray-900 tracking-tight leading-tight">
                  Our Products
                </h1>
                <p className="text-gray-500 mt-2">Filter products and inspect technical properties below.</p>
              </div>

              {/* Category Filters */}
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 mb-10 pb-4 border-b border-gray-100">
                <button
                  onClick={() => setSelectedCategory('all')}
                  className={`px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                    selectedCategory === 'all'
                      ? 'bg-[#0099ff] text-white shadow-md'
                      : 'bg-white hover:bg-gray-50 text-gray-600 border border-gray-200'
                  }`}
                >
                  All Products
                </button>
                <button
                  onClick={() => setSelectedCategory('silico-manganese')}
                  className={`px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                    selectedCategory === 'silico-manganese'
                      ? 'bg-[#0099ff] text-white shadow-md'
                      : 'bg-white hover:bg-gray-50 text-gray-600 border border-gray-200'
                  }`}
                >
                  Silico Manganese
                </button>
                <button
                  onClick={() => setSelectedCategory('pig-iron')}
                  className={`px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                    selectedCategory === 'pig-iron'
                      ? 'bg-[#0099ff] text-white shadow-md'
                      : 'bg-white hover:bg-gray-50 text-gray-600 border border-gray-200'
                  }`}
                >
                  Pig Iron Lumps
                </button>
              </div>

              {/* Products Dynamic Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {PRODUCTS.filter(p => selectedCategory === 'all' || p.category === selectedCategory).map((prod) => (
                  <motion.div
                    key={prod.id}
                    layout
                    whileHover={{ y: -8 }}
                    className="bg-white rounded-3xl border border-gray-100 shadow-[0_10px_35px_rgba(0,0,0,0.03)] overflow-hidden flex flex-col h-full"
                  >
                    {/* Visual Area */}
                    <div className="h-44 relative overflow-hidden">
                      <img src={prod.imageUrl} alt={prod.name} className="w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

                      <span className="absolute top-4 left-4 px-3 py-1 bg-white/20 backdrop-blur-md rounded-full text-[10px] uppercase tracking-wider font-bold text-white">
                        {prod.categoryLabel}
                      </span>

                      <h3 className="absolute bottom-4 left-4 right-4 text-lg font-bold font-display text-white tracking-tight leading-tight z-10">
                        {prod.name}
                      </h3>
                    </div>

                    <div className="p-6 flex-1 flex flex-col justify-between">
                      <div className="space-y-4">
                        <p className="text-sm text-gray-500 leading-relaxed line-clamp-2">
                          {prod.description}
                        </p>

                        <div className="flex justify-between items-center bg-blue-50/50 rounded-xl px-4 py-1.5 text-xs">
                          <span className="text-blue-700 font-bold uppercase tracking-wider">Price</span>
                          <span className="text-gray-800 font-extrabold">{prod.price}</span>
                        </div>

                        {/* Complete Specifications Grid */}
                        <div className="bg-gray-50 rounded-2xl p-4 space-y-2">
                          <div className="text-[10px] uppercase font-bold text-gray-400 tracking-wider mb-2 flex items-center gap-1">
                            <FileSpreadsheet className="w-3.5 h-3.5 text-[#0099ff]" /> Technical Properties
                          </div>

                          <div className="flex justify-between border-b border-gray-100 pb-1.5 text-xs">
                            <span className="text-gray-400 font-medium">MOQ</span>
                            <span className="text-gray-800 font-bold">{prod.moq}</span>
                          </div>

                          {Object.entries(prod.specs).slice(0, 5).map(([key, value]) => (
                            <div key={key} className="flex justify-between border-b border-gray-100 pb-1.5 last:border-0 last:pb-0 text-xs">
                              <span className="text-gray-400 font-medium">{key}</span>
                              <span className="text-gray-800 font-semibold text-right">{value}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Interactive Buttons */}
                      <div className="grid grid-cols-2 gap-3 mt-6">
                        <button
                          onClick={() => openEnquiryModal(prod.name)}
                          className="px-4 py-2.5 bg-black hover:bg-gray-900 text-white font-semibold text-xs rounded-xl transition-all shadow-sm text-center cursor-pointer"
                        >
                          Enquiry Now
                        </button>
                        <button
                          onClick={() => navigateTo('products', prod.category, prod.id)}
                          className="px-4 py-2.5 bg-gray-50 hover:bg-gray-100 border border-gray-200 text-gray-700 font-semibold text-xs rounded-xl transition-all text-center cursor-pointer"
                        >
                          View Details
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

            </div>
          </div>
        )}

        {/* ================= PRODUCT DETAIL PAGE ================= */}
        {selectedProductId !== null && (
          (() => {
            const prod = PRODUCTS.find(p => p.id === selectedProductId);
            if (!prod) return <div className="text-center py-20">Product not found.</div>;
            return (
              <div className="px-6 py-8 md:py-12">
                <div className="max-w-5xl mx-auto">

                  {/* Breadcrumb */}
                  <div className="flex items-center gap-2 text-xs text-gray-400 font-medium uppercase tracking-wider mb-6">
                    <button onClick={() => navigateTo('home')} className="hover:text-black cursor-pointer">Home</button>
                    <ChevronRight className="w-3 h-3" />
                    <button onClick={() => navigateTo('products', 'all')} className="hover:text-black cursor-pointer">Products</button>
                    <ChevronRight className="w-3 h-3" />
                    <span className="text-gray-900 font-semibold">{prod.name}</span>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
                    {/* Visual representation */}
                    <div className="glass-card overflow-hidden text-white relative aspect-[4/3] flex flex-col justify-between shadow-xl min-h-[300px]">
                      <img src={prod.imageUrl} alt={prod.name} className="absolute inset-0 w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />

                      <span className="absolute top-6 left-6 px-3 py-1 bg-white/20 backdrop-blur-md rounded-full text-xs uppercase tracking-wider font-bold text-white">
                        {prod.categoryLabel}
                      </span>

                      <div className="relative z-10 p-6 md:p-8">
                        <h1 className="text-3xl md:text-4xl font-display font-extrabold leading-tight tracking-tight text-white uppercase">
                          {prod.name}
                        </h1>
                        <p className="text-gray-300 text-xs mt-3 leading-relaxed max-w-md">Sai Chemicals Private Limited Grade Metallurgy specifications verified.</p>
                      </div>
                    </div>

                    {/* Specifications table - MOUNTING EVERY SINGLE PROPERTY */}
                    <div className="space-y-6">
                      <div className="glass-card bg-white p-6 md:p-8 border border-gray-100 shadow-xl">
                        <h2 className="text-xl font-bold font-display mb-4">Technical Specifications</h2>

                        <div className="space-y-3.5">
                          <div className="flex justify-between items-center border-b border-gray-50 pb-3 text-sm">
                            <span className="text-gray-400 font-bold uppercase text-[11px] tracking-wider">Price</span>
                            <span className="text-[#0099ff] font-extrabold text-base text-right">{prod.price}</span>
                          </div>

                          <div className="flex justify-between items-center border-b border-gray-50 pb-3 text-sm">
                            <span className="text-gray-400 font-bold uppercase text-[11px] tracking-wider">Minimum Order Quantity (MOQ)</span>
                            <span className="text-gray-800 font-bold text-right">{prod.moq}</span>
                          </div>

                          {Object.entries(prod.specs).map(([key, value]) => (
                            <div key={key} className="flex justify-between items-center border-b border-gray-50 pb-3 last:border-0 last:pb-0 text-sm">
                              <span className="text-gray-400 font-bold uppercase text-[11px] tracking-wider">{key}</span>
                              <span className="text-gray-800 font-semibold text-right">{value}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Product features / highlights */}
                      <div className="glass-card bg-white p-6 md:p-8 border border-gray-100 shadow-xl">
                        <h3 className="text-sm font-bold uppercase tracking-wider text-[#0099ff] mb-4">Key Properties</h3>
                        <ul className="space-y-3 text-sm text-gray-600">
                          {prod.features.map((feat, idx) => (
                            <li key={idx} className="flex items-start gap-3">
                              <Check className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                              <span>{feat}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Call to Actions */}
                      <div className="flex gap-4">
                        <button
                          onClick={() => openEnquiryModal(prod.name)}
                          className="btn-odysser flex-1 py-4 bg-black text-white hover:bg-gray-900 font-semibold text-center rounded-xl transition-all shadow-md cursor-pointer"
                        >
                          Enquiry For {prod.name}
                        </button>
                        <button
                          onClick={() => navigateTo('products', 'all')}
                          className="px-6 py-4 bg-white hover:bg-gray-50 border border-gray-200 text-gray-700 font-semibold rounded-xl text-sm transition-all text-center cursor-pointer"
                        >
                          All Products
                        </button>
                      </div>
                    </div>
                  </div>

                </div>
              </div>
            );
          })()
        )}

        {/* ================= CONTACT US PAGE ================= */}
        {currentPage === 'contact' && selectedProductId === null && (
          <div className="px-6 py-8 md:py-12">
            <div className="max-w-6xl mx-auto">

              {/* Header */}
              <div className="mb-10 text-center md:text-left">
                <div className="flex justify-center md:justify-start items-center gap-2 text-xs text-gray-400 font-medium uppercase tracking-wider mb-3">
                  <button onClick={() => navigateTo('home')} className="hover:text-black cursor-pointer">Home</button>
                  <ChevronRight className="w-3 h-3" />
                  <span className="text-gray-900 font-semibold">Contact Us</span>
                </div>
                <h1 className="text-4xl md:text-6xl font-display font-bold text-gray-900 tracking-tight leading-tight">
                  Contact Us
                </h1>
                <p className="text-gray-500 mt-2">Get in touch directly with our sales team for bulk quotes.</p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">

                {/* Contact forms */}
                <div className="glass-card bg-white p-8 md:p-10 border border-gray-100 shadow-xl">
                  <h2 className="text-2xl font-bold font-display text-gray-900 mb-6">Quick Enquiry</h2>

                  <form onSubmit={handleEnquirySubmit} className="space-y-5">
                    <div>
                      <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Full Name</label>
                      <input
                        type="text"
                        required
                        value={quickEnquiryForm.name}
                        onChange={(e) => setQuickEnquiryForm(prev => ({ ...prev, name: e.target.value }))}
                        placeholder="Your Name"
                        className="w-full px-4 py-3 bg-gray-50 rounded-xl border border-gray-100 text-sm focus:outline-none focus:ring-2 focus:ring-[#0099ff] focus:bg-white transition-all"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Email Address</label>
                        <input
                          type="email"
                          required
                          value={quickEnquiryForm.email}
                          onChange={(e) => setQuickEnquiryForm(prev => ({ ...prev, email: e.target.value }))}
                          placeholder="your.email@gmail.com"
                          className="w-full px-4 py-3 bg-gray-50 rounded-xl border border-gray-100 text-sm focus:outline-none focus:ring-2 focus:ring-[#0099ff] focus:bg-white transition-all"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Phone Number</label>
                        <input
                          type="tel"
                          required
                          value={quickEnquiryForm.phone}
                          onChange={(e) => setQuickEnquiryForm(prev => ({ ...prev, phone: e.target.value }))}
                          placeholder="Your Mobile"
                          className="w-full px-4 py-3 bg-gray-50 rounded-xl border border-gray-100 text-sm focus:outline-none focus:ring-2 focus:ring-[#0099ff] focus:bg-white transition-all"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Select Product Interest</label>
                      <select
                        value={quickEnquiryForm.productName}
                        onChange={(e) => setQuickEnquiryForm(prev => ({ ...prev, productName: e.target.value }))}
                        className="w-full px-4 py-3 bg-gray-50 rounded-xl border border-gray-100 text-sm focus:outline-none focus:ring-2 focus:ring-[#0099ff] focus:bg-white transition-all appearance-none"
                      >
                        <option value="General Query">General Query / Quote Request</option>
                        {PRODUCTS.map(p => (
                          <option key={p.id} value={p.name}>{p.name}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">City / Location</label>
                      <input
                        type="text"
                        value={quickEnquiryForm.city}
                        onChange={(e) => setQuickEnquiryForm(prev => ({ ...prev, city: e.target.value }))}
                        placeholder="Your City"
                        className="w-full px-4 py-3 bg-gray-50 rounded-xl border border-gray-100 text-sm focus:outline-none focus:ring-2 focus:ring-[#0099ff] focus:bg-white transition-all"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Enquiry Message</label>
                      <textarea
                        required
                        rows={4}
                        value={quickEnquiryForm.message}
                        onChange={(e) => setQuickEnquiryForm(prev => ({ ...prev, message: e.target.value }))}
                        placeholder="Please describe your volume requirements and specs here..."
                        className="w-full px-4 py-3 bg-gray-50 rounded-xl border border-gray-100 text-sm focus:outline-none focus:ring-2 focus:ring-[#0099ff] focus:bg-white transition-all"
                      ></textarea>
                    </div>

                    {enquirySuccess && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="p-4 bg-green-50 border border-green-100 text-green-800 text-sm rounded-xl flex items-center gap-3 font-semibold"
                      >
                        <CheckCircle2 className="w-5 h-5 text-green-500" />
                        Thank you! Your Enquiry has been sent successfully.
                      </motion.div>
                    )}

                    <button
                      type="submit"
                      className="btn-odysser w-full py-4 bg-black text-white hover:bg-gray-900 font-semibold rounded-xl text-center shadow-lg cursor-pointer"
                    >
                      Send Message
                    </button>
                  </form>
                </div>

                {/* Contact Specs & Address */}
                <div className="space-y-8">
                  <div className="glass-card bg-white p-8 border border-gray-100 shadow-xl space-y-6">
                    <h3 className="text-xl font-bold font-display">Office & Plant Location</h3>

                    <div className="flex gap-4">
                      <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#0099ff] flex items-center justify-center shrink-0">
                        <MapPin className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="font-bold text-sm text-gray-400 uppercase tracking-wider mb-1">Address</h4>
                        <p className="text-gray-800 font-medium text-sm leading-relaxed">
                          Sai Chemicals Private Limited <br />
                          63 3.49, Mudipar Road, Tedesara, <br />
                          Rajnandgaon, Chhattisgarh - 491441, India
                        </p>
                      </div>
                    </div>

                    <div className="flex gap-4 border-t border-gray-50 pt-6">
                      <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#0099ff] flex items-center justify-center shrink-0">
                        <Mail className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="font-bold text-sm text-gray-400 uppercase tracking-wider mb-1">E-mail</h4>
                        <a href="mailto:saichemicalsprivatelimited@gmail.com" className="text-[#0099ff] font-semibold text-sm hover:underline">
                          saichemicalsprivatelimited@gmail.com
                        </a>
                      </div>
                    </div>

                    <div className="flex gap-4 border-t border-gray-50 pt-6">
                      <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#0099ff] flex items-center justify-center shrink-0">
                        <Phone className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="font-bold text-sm text-gray-400 uppercase tracking-wider mb-1">Phone & WhatsApp</h4>
                        <div className="space-y-1">
                          <p className="text-gray-800 font-semibold text-sm">+91-9425234682</p>
                          <p className="text-xs text-gray-400">CEO: Mr. Rahul Sial</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-blue-50 border border-blue-100 p-8 flex flex-col gap-4 rounded-3xl">
                    <h4 className="font-bold text-lg text-blue-900 flex items-center gap-2">
                      <MessageSquare className="w-5 h-5 text-[#0099ff]" /> Raise your Query
                    </h4>
                    <p className="text-sm text-blue-700 leading-relaxed">
                      Hi! Simply click below to chat with us directly on WhatsApp. Our experts will reply to you very soon.
                    </p>
                    <a
                      href="https://api.whatsapp.com/send?phone=919425234682&text=Hello!+I+found+your+website+https://www.saichemicalsindia.in+and+am+interested+in+your+products."
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full py-3.5 bg-[#25D366] hover:bg-green-600 transition-all text-white font-bold rounded-xl text-center text-sm flex items-center justify-center gap-2 shadow-md cursor-pointer"
                    >
                      Click Here to Chat on WhatsApp
                    </a>
                  </div>
                </div>

              </div>

            </div>
          </div>
        )}

      </div>

      {/* QUICK ACTIONS BOTTOM NAVIGATION BAR */}
      <div className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-gray-100 py-2.5 px-6 shadow-[0_-5px_15px_rgba(0,0,0,0.03)] md:hidden flex justify-around items-center">
        <button
          onClick={() => navigateTo('home')}
          className="flex flex-col items-center gap-1 text-gray-600 hover:text-[#0099ff] transition-all cursor-pointer"
        >
          <Home className="w-5 h-5 text-[#0099ff]" />
          <span className="text-[9px] font-bold tracking-wider uppercase">Home</span>
        </button>
        <button
          onClick={() => navigateTo('about')}
          className="flex flex-col items-center gap-1 text-gray-600 hover:text-[#0099ff] transition-all cursor-pointer"
        >
          <Info className="w-5 h-5 text-[#0099ff]" />
          <span className="text-[9px] font-bold tracking-wider uppercase">Profile</span>
        </button>
        <button
          onClick={() => navigateTo('products')}
          className="flex flex-col items-center gap-1 text-gray-600 hover:text-[#0099ff] transition-all cursor-pointer"
        >
          <Briefcase className="w-5 h-5 text-[#0099ff]" />
          <span className="text-[9px] font-bold tracking-wider uppercase">Products</span>
        </button>
        <button
          onClick={() => navigateTo('contact')}
          className="flex flex-col items-center gap-1 text-gray-600 hover:text-[#0099ff] transition-all cursor-pointer"
        >
          <MessageSquare className="w-5 h-5 text-[#0099ff]" />
          <span className="text-[9px] font-bold tracking-wider uppercase">Contact</span>
        </button>
        <a
          href="tel:+919425234682"
          className="flex flex-col items-center gap-1 text-gray-600 hover:text-[#0099ff] transition-all cursor-pointer"
        >
          <Phone className="w-5 h-5 text-[#0099ff]" />
          <span className="text-[9px] font-bold tracking-wider uppercase">Call Us</span>
        </a>
      </div>

      {/* Interactive Quick Quote Modal PopUp */}
      <AnimatePresence>
        {isEnquiryModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsEnquiryModalOpen(false)}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />

            {/* Modal Body */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 30 }}
              transition={{ duration: 0.3 }}
              className="relative bg-white rounded-3xl w-full max-w-lg overflow-hidden border border-gray-100 shadow-2xl z-10"
            >
              {/* Header */}
              <div className="p-6 bg-gradient-to-tr from-[#0099ff] to-blue-600 text-white flex justify-between items-center">
                <div>
                  <h3 className="text-xl font-bold font-display">Raise your Query</h3>
                  <p className="text-xs text-blue-100 mt-1">Sai Chemicals Private Limited enquiry Desk</p>
                </div>
                <button
                  onClick={() => setIsEnquiryModalOpen(false)}
                  className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-all text-white cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Form Content */}
              <form onSubmit={handleEnquirySubmit} className="p-6 space-y-4">

                <div>
                  <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1.5">Product Name</label>
                  <input
                    type="text"
                    readOnly
                    value={quickEnquiryForm.productName}
                    className="w-full px-4 py-2.5 bg-gray-50 rounded-xl border border-gray-100 text-xs font-semibold text-gray-800 focus:outline-none"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1.5">Full Name</label>
                    <input
                      type="text"
                      required
                      value={quickEnquiryForm.name}
                      onChange={(e) => setQuickEnquiryForm(prev => ({ ...prev, name: e.target.value }))}
                      placeholder="Your Name"
                      className="w-full px-4 py-2.5 bg-gray-50 rounded-xl border border-gray-100 text-xs focus:outline-none focus:ring-2 focus:ring-[#0099ff] focus:bg-white transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1.5">Email</label>
                    <input
                      type="email"
                      required
                      value={quickEnquiryForm.email}
                      onChange={(e) => setQuickEnquiryForm(prev => ({ ...prev, email: e.target.value }))}
                      placeholder="Email ID"
                      className="w-full px-4 py-2.5 bg-gray-50 rounded-xl border border-gray-100 text-xs focus:outline-none focus:ring-2 focus:ring-[#0099ff] focus:bg-white transition-all"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1.5">Country Code</label>
                    <input
                      type="text"
                      readOnly
                      value="India (+91)"
                      className="w-full px-4 py-2.5 bg-gray-50 rounded-xl border border-gray-100 text-xs text-gray-500 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1.5">Mobile Number</label>
                    <input
                      type="tel"
                      required
                      value={quickEnquiryForm.phone}
                      onChange={(e) => setQuickEnquiryForm(prev => ({ ...prev, phone: e.target.value }))}
                      placeholder="Your Mobile"
                      className="w-full px-4 py-2.5 bg-gray-50 rounded-xl border border-gray-100 text-xs focus:outline-none focus:ring-2 focus:ring-[#0099ff] focus:bg-white transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1.5">Enquiry Details</label>
                  <textarea
                    required
                    rows={3}
                    value={quickEnquiryForm.message}
                    onChange={(e) => setQuickEnquiryForm(prev => ({ ...prev, message: e.target.value }))}
                    placeholder="Enter specs needed or bulk tonnage requirements..."
                    className="w-full px-4 py-2.5 bg-gray-50 rounded-xl border border-gray-100 text-xs focus:outline-none focus:ring-2 focus:ring-[#0099ff] focus:bg-white transition-all"
                  ></textarea>
                </div>

                {enquirySuccess && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-3 bg-green-50 border border-green-100 text-green-800 text-xs rounded-xl flex items-center gap-2 font-semibold"
                  >
                    <CheckCircle2 className="w-4 h-4 text-green-500" />
                    Your Enquiry has been sent successfully.
                  </motion.div>
                )}

                <button
                  type="submit"
                  className="w-full py-3 bg-[#0099ff] hover:bg-blue-600 transition-all text-white font-bold rounded-xl text-xs text-center shadow-lg cursor-pointer"
                >
                  Send Now
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Page Footer */}
      <footer className="mt-20 border-t border-gray-100 bg-white">

        {/* Top footer columns */}
        <div className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">

          {/* Brand col */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <img
                src="/favicon.jpg"
                alt="Sai Chemicals Logo"
                className="h-8 w-8 object-contain rounded-full"
              />
              <span className="font-display font-bold text-base tracking-tight text-gray-900 uppercase">
                Sai Chemicals
              </span>
            </div>
            <p className="text-xs text-gray-400 leading-relaxed">
              Renowned manufacturer and supplier of high-grade Silico Manganese Lumps and Pig Iron Lumps based in Rajnandgaon, Chhattisgarh. Established in 1994.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="font-bold text-xs uppercase tracking-wider text-gray-400">General Links</h4>
            <div className="flex flex-col gap-2.5 text-xs text-gray-500">
              <button onClick={() => navigateTo('home')} className="text-left hover:text-[#0099ff] transition-colors cursor-pointer">Home</button>
              <button onClick={() => navigateTo('about')} className="text-left hover:text-[#0099ff] transition-colors cursor-pointer">About Us</button>
              <button onClick={() => navigateTo('products')} className="text-left hover:text-[#0099ff] transition-colors cursor-pointer">Products</button>
              <button onClick={() => navigateTo('contact')} className="text-left hover:text-[#0099ff] transition-colors cursor-pointer">Contact Us</button>
            </div>
          </div>

          {/* Category Links */}
          <div className="space-y-4">
            <h4 className="font-bold text-xs uppercase tracking-wider text-gray-400">Products</h4>
            <div className="flex flex-col gap-2.5 text-xs text-gray-500">
              <button onClick={() => navigateTo('products', 'silico-manganese')} className="text-left hover:text-[#0099ff] transition-colors cursor-pointer">Silico Manganese</button>
              <button onClick={() => navigateTo('products', 'pig-iron')} className="text-left hover:text-[#0099ff] transition-colors cursor-pointer">Pig Iron Lumps</button>
            </div>
          </div>

          {/* Newsletter Column */}
          <div className="space-y-4">
            <h4 className="font-bold text-xs uppercase tracking-wider text-gray-400">Newsletter</h4>
            <p className="text-xs text-gray-400 leading-relaxed">Subscribe to stay updated with product listings and pricing alerts.</p>

            <form onSubmit={handleNewsletterSubmit} className="flex gap-2">
              <input
                type="email"
                required
                value={newsletterEmail}
                onChange={(e) => setNewsletterEmail(e.target.value)}
                placeholder="Enter Email"
                className="flex-1 px-3 py-2 bg-gray-50 rounded-xl border border-gray-100 text-xs focus:outline-none focus:ring-1 focus:ring-[#0099ff] transition-all"
              />
              <button
                type="submit"
                className="px-4 py-2 bg-black text-white hover:bg-gray-900 rounded-xl text-xs font-bold transition-all cursor-pointer"
              >
                Submit
              </button>
            </form>

            {newsletterSubscribed && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-[11px] text-green-600 font-semibold"
              >
                Thank you! Subscribed successfully.
              </motion.p>
            )}
          </div>

        </div>

        {/* Bottom copyright line */}
        <div className="border-t border-gray-50 py-6 px-6 bg-gray-50/50">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-[11px] text-gray-400 font-semibold">
            <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
              <span>All Rights Reserved. © {new Date().getFullYear()} Sai Chemicals Private Limited</span>
              <span>•</span>
              <a href="https://www.saichemicalsindia.in" className="hover:underline text-gray-500">saichemicalsindia.in</a>
            </div>
            <div className="flex items-center gap-2">
              <span>Developed & Managed By sovereignsites.in</span>
            </div>
          </div>
        </div>

      </footer>

    </div>
  );
}

export default App;
