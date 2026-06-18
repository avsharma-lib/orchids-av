import { useEffect, useState, useRef } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { CheckCircle2, ArrowRight, Plus, ChevronLeft, ChevronRight, Image as ImageIcon, Film } from 'lucide-react';
import { saveMedia, getAllMedia, type MediaItem } from './utils/db';

function App() {
  const { scrollYProgress } = useScroll();
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -50]);

  const [isScrolled, setIsScrolled] = useState(false);
  const [galleryMedia, setGalleryMedia] = useState<MediaItem[]>([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [currentBlobUrl, setCurrentBlobUrl] = useState<string>('');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const autoPlayRef = useRef<number | null>(null);

  useEffect(() => {
    const loadGallery = async () => {
      const media = await getAllMedia();
      setGalleryMedia(media);
    };
    loadGallery();
  }, []);

  useEffect(() => {
    if (isAutoPlaying && galleryMedia.length > 0) {
      autoPlayRef.current = window.setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % galleryMedia.length);
      }, 5000);
    }
    return () => {
      if (autoPlayRef.current) {
        window.clearInterval(autoPlayRef.current);
        autoPlayRef.current = null;
      }
    };
  }, [isAutoPlaying, galleryMedia.length]);

  useEffect(() => {
    if (galleryMedia.length > 0 && galleryMedia[currentSlide]) {
      const url = URL.createObjectURL(galleryMedia[currentSlide].blob);
      setCurrentBlobUrl(url);
      return () => URL.revokeObjectURL(url);
    }
  }, [galleryMedia, currentSlide]);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const type = file.type.startsWith('video') ? 'video' : 'image';

      const newItem: Omit<MediaItem, 'id'> = {
        blob: file,
        type: type,
        timestamp: Date.now()
      };

      await saveMedia(newItem);
    }

    // Reload gallery
    const media = await getAllMedia();
    setGalleryMedia(media);
    if (media.length > 0) {
      setCurrentSlide(media.length - 1);
    }
  };

  const nextSlide = () => {
    setIsAutoPlaying(false);
    setCurrentSlide((prev) => (prev + 1) % galleryMedia.length);
  };

  const prevSlide = () => {
    setIsAutoPlaying(false);
    setCurrentSlide((prev) => (prev - 1 + galleryMedia.length) % galleryMedia.length);
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-odysser-bg text-odysser-text selection:bg-black selection:text-white">
      {/* Navigation */}
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled ? 'bg-white/80 backdrop-blur-md shadow-sm py-4' : 'bg-transparent py-6'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 rounded bg-gradient-to-br from-odysser-primary to-blue-400 flex items-center justify-center">
              <span className="text-white font-bold text-sm tracking-tighter">जन</span>
            </div>
            <span className="font-display font-bold text-lg tracking-tight">जनसेवक</span>
          </div>

          <div className="hidden md:flex items-center gap-8 text-[15px] font-medium text-odysser-muted">
            <a href="#features" className="hover:text-black transition-colors">परिचय</a>
            <a href="#gallery" className="hover:text-black transition-colors">फोटो गैलरी</a>
            <a href="#process" className="hover:text-black transition-colors">प्राथमिकताएं</a>
            <a href="#pricing" className="hover:text-black transition-colors">स्वयंसेवक बनें</a>
            <a href="#testimonials" className="hover:text-black transition-colors">जनमत</a>
          </div>

          <div className="flex items-center gap-4">
            <a href="#pricing" className="btn-odysser px-5 py-2.5 text-[15px] group">
              स्वयंसेवक बनें
              <span className="absolute inset-0 shimmer-bg opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></span>
            </a>
          </div>
        </div>
      </motion.nav>

      {/* Hero Section */}
      <section className="relative pt-40 pb-20 md:pt-48 md:pb-32 overflow-hidden px-6">
        <div className="max-w-7xl mx-auto text-center relative z-10">

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.1 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-gray-200 shadow-sm mb-8"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex h-2 w-2 rounded-full bg-green-400"></span>
            </span>
            <span className="text-[13px] font-medium text-odysser-muted tracking-wide uppercase">
              विकास और सेवा के लिए समर्पित
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
            className="text-5xl md:text-7xl lg:text-8xl font-display font-bold tracking-[-0.03em] leading-[1.05] max-w-[1000px] mx-auto text-balance"
          >
            जनता की सेवा,
            <br />
            क्षेत्र का <span className="text-odysser-primary">विकास।</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
            className="mt-8 text-xl md:text-2xl text-odysser-muted max-w-3xl mx-auto leading-relaxed text-balance font-sans"
          >
            छत्तीसगढ़ प्रदेश कांग्रेस कमेटी के सचिव के रूप में जनसेवा, संगठन निर्माण और क्षेत्रीय विकास के लिए निरंतर कार्यरत।
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.4 }}
            className="mt-12 flex flex-col items-center justify-center gap-4"
          >
            <a href="#pricing" className="btn-odysser px-8 py-4 text-lg w-full sm:w-auto group">
              <span className="relative z-10 flex items-center gap-2">
                स्वयंसेवक के रूप में जुड़ें
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </span>
              <span className="absolute inset-0 shimmer-bg pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity"></span>
            </a>
            <p className="text-sm text-odysser-muted font-medium flex items-center gap-3">
              <span>समर्पित नेतृत्व</span>
              <span className="w-1 h-1 rounded-full bg-gray-300"></span>
              <span>ईमानदार प्रयास</span>
              <span className="w-1 h-1 rounded-full bg-gray-300"></span>
              <span>उज्जवल भविष्य</span>
            </p>
          </motion.div>

        </div>

        {/* Floating Abstract Elements */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden -z-10">
          <motion.div
            style={{ y: y1 }}
            className="absolute top-1/4 -left-20 w-[600px] h-[600px] bg-gradient-to-tr from-blue-100 to-transparent rounded-full blur-3xl opacity-60"
          />
          <motion.div
            style={{ y: y2 }}
            className="absolute top-1/3 -right-20 w-[500px] h-[500px] bg-gradient-to-bl from-gray-100 to-transparent rounded-full blur-3xl opacity-80"
          />
        </div>
      </section>

      {/* Floating Image Previews */}
      <section className="relative -mt-10 pb-32 px-6 z-20">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-center gap-8 md:gap-16">
          <motion.div
            initial={{ opacity: 0, rotate: -10, y: 40 }}
            animate={{ opacity: 1, rotate: -4, y: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.5 }}
            whileHover={{ y: -10, rotate: -2, transition: { duration: 0.4 } }}
            className="w-full max-w-[280px] rounded-2xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.1)] border-4 border-white bg-white origin-bottom"
          >
            <img src="/politician.webp" alt="जनसेवक" className="w-full h-auto object-cover" />
          </motion.div>

          {/* Central Image */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.55 }}
            className="w-full max-w-[320px] rounded-3xl overflow-hidden shadow-[0_30px_60px_rgba(0,0,0,0.15)] border-[6px] border-white bg-black relative group z-10"
          >
             <img
                src="/politician.webp"
                alt="जनसेवक"
                className="w-full h-auto object-cover"
             />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, rotate: 10, y: 40 }}
            animate={{ opacity: 1, rotate: 4, y: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.6 }}
            whileHover={{ y: -10, rotate: 2, transition: { duration: 0.4 } }}
            className="w-full max-w-[280px] rounded-2xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.1)] border-4 border-white bg-white origin-bottom"
          >
            <img src="/politician.webp" alt="जनसेवक" className="w-full h-auto object-cover" />
          </motion.div>
        </div>
      </section>

      {/* Marquee Section */}
      <section className="py-12 border-y border-gray-200 bg-white overflow-hidden flex flex-col">
        <div className="flex w-fit animate-[marquee_30s_linear_infinite]">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="flex gap-16 px-8 min-w-max items-center">
                {['जनसेवा ही संकल्प', 'क्षेत्रीय विकास', 'मज़बूत नेतृत्व', 'ईमानदार प्रयास', 'शिक्षा और स्वास्थ्य', 'सबका साथ, सबका विकास'].map((text, j) => (
                  <span key={j} className="text-xl font-display font-medium text-odysser-muted whitespace-nowrap">
                    {text}
                  </span>
                ))}
              </div>
            ))}
        </div>
      </section>

      {/* About Section */}
      <section id="features" className="py-32 px-6 relative">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="text-center mb-20"
          >
            <p className="font-handwriting text-3xl md:text-4xl text-odysser-primary mb-4 transform -rotate-2">परिचय</p>
            <h2 className="text-4xl md:text-6xl font-display font-bold tracking-tight text-balance leading-tight">
              समर्पण और सेवा का<br/>
              <span className="text-odysser-muted">एक नया अध्याय।</span>
            </h2>
            <p className="mt-6 text-xl text-odysser-muted max-w-2xl mx-auto">
              छत्तीसगढ़ प्रदेश कांग्रेस कमेटी के सचिव और मुंगेली विधानसभा के पूर्व प्रभारी। जनसेवा, संगठन निर्माण और क्षेत्रीय विकास के लिए सदैव तत्पर।
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8">
            {[
              { stat: 'सचिव', label: 'छत्तीसगढ़ प्रदेश कांग्रेस कमेटी' },
              { stat: 'मुंगेली', label: 'पूर्व विधानसभा प्रभारी' },
              { stat: 'पूर्व प्रदेश सचिव', label: 'छत्तीसगढ़ युवा कांग्रेस' },
              { stat: 'क्षेत्रीय विकास', label: 'निरंतर कार्यरत' }
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="glass-card p-6 md:p-8 text-center border-t-4 border-t-odysser-primary hover:shadow-[0_20px_40px_rgba(0,0,0,0.08)] transition-shadow"
              >
                <div className="text-3xl md:text-4xl font-display font-bold text-black mb-2">{item.stat}</div>
                <div className="text-sm font-bold text-odysser-muted uppercase tracking-wider">{item.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Honest Question / Regional Challenges */}
      <section className="py-32 px-6 bg-odysser-surfaceLight relative overflow-hidden">
        <div className="max-w-4xl mx-auto">
          <div className="mb-16">
            <p className="font-handwriting text-3xl md:text-4xl text-odysser-primary mb-4">क्षेत्रीय चुनौतियाँ</p>
            <h2 className="text-4xl md:text-5xl font-display font-bold tracking-tight mb-6">
              क्या आप अपने क्षेत्र में<br/>बदलाव के लिए तैयार हैं?
            </h2>
            <p className="text-xl text-odysser-muted text-balance">
              हमारा लक्ष्य है क्षेत्र की समस्याओं का समाधान करना और हर नागरिक तक विकास की पहुँच सुनिश्चित करना।
            </p>
          </div>

          <div className="space-y-4">
            {[
              "बेहतर स्वास्थ्य सुविधाओं का अभाव",
              "युवाओं के लिए रोज़गार के सीमित अवसर",
              "किसानों की समस्याओं का उचित समाधान",
              "बुनियादी ढांचे और सड़कों का विकास"
            ].map((point, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="flex items-start gap-4 p-5 md:p-6 bg-white rounded-2xl shadow-sm border border-gray-100"
              >
                <div className="min-w-[32px] h-8 rounded-full bg-red-50 text-red-500 flex items-center justify-center font-bold text-lg">×</div>
                <p className="text-lg md:text-xl font-medium text-gray-800 leading-snug">{point}</p>
              </motion.div>
            ))}
          </div>

          <div className="mt-16 text-center">
            <p className="font-handwriting text-3xl md:text-4xl text-black transform rotate-2">
              यह केवल वादों की बात नहीं है। यह सही प्रयासों और मज़बूत इरादों की बात है।
            </p>
          </div>
        </div>
      </section>

      {/* Our Priorities */}
      <section id="process" className="py-32 px-6 relative border-b border-gray-200">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-24">
            <p className="font-handwriting text-3xl md:text-4xl text-odysser-primary mb-4">हमारी प्राथमिकताएं</p>
            <h2 className="text-4xl md:text-6xl font-display font-bold tracking-tight">
              समृद्ध क्षेत्र। सशक्त नागरिक।<br/>
              <span className="text-odysser-muted">हर कदम आपके साथ।</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-16 md:gap-24 mb-24 items-center">
            <div className="order-2 md:order-1">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="bg-gray-100 rounded-3xl p-4 md:p-8 aspect-[4/3] flex items-center justify-center border border-gray-200"
              >
                <div className="w-full h-full bg-white rounded-xl shadow-sm border border-gray-200 flex flex-col overflow-hidden">
                  <div className="h-10 bg-gray-50 border-b border-gray-200 flex items-center px-4 gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-400"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                    <div className="w-3 h-3 rounded-full bg-green-400"></div>
                    <div className="ml-4 h-4 w-32 bg-gray-200 rounded"></div>
                  </div>
                  <div className="p-4 flex-1 flex flex-col gap-3">
                    <div className="h-6 w-full bg-blue-50 rounded"></div>
                    <div className="flex gap-2"><div className="h-8 w-1/4 bg-gray-100 rounded"></div><div className="h-8 flex-1 bg-gray-100 rounded"></div><div className="h-8 w-1/6 bg-green-100 rounded"></div></div>
                    <div className="flex gap-2"><div className="h-8 w-1/4 bg-gray-100 rounded"></div><div className="h-8 flex-1 bg-gray-100 rounded"></div><div className="h-8 w-1/6 bg-yellow-100 rounded"></div></div>
                    <div className="flex gap-2"><div className="h-8 w-1/4 bg-gray-100 rounded"></div><div className="h-8 flex-1 bg-gray-100 rounded"></div><div className="h-8 w-1/6 bg-green-100 rounded"></div></div>
                  </div>
                </div>
              </motion.div>
            </div>
            <div className="order-1 md:order-2 space-y-12">
              <div>
                <h3 className="text-3xl font-bold mb-4 font-display">जनसंपर्क और सेवा</h3>
                <p className="text-xl font-handwriting text-odysser-primary mb-4 transform -rotate-2">हर व्यक्ति की बात। एक आवाज़।</p>
                <p className="text-lg text-odysser-muted mb-6">हमारा उद्देश्य है कि क्षेत्र के हर व्यक्ति की समस्या सुनी जाए और उसका त्वरित समाधान निकाला जाए।</p>
                <ul className="space-y-3 font-bold text-gray-800 text-lg">
                  <li className="flex items-center gap-3"><CheckCircle2 className="w-5 h-5 text-odysser-primary" /> नियमित जन चौपाल का आयोजन</li>
                  <li className="flex items-center gap-3"><CheckCircle2 className="w-5 h-5 text-odysser-primary" /> त्वरित शिकायत निवारण तंत्र</li>
                  <li className="flex items-center gap-3"><CheckCircle2 className="w-5 h-5 text-odysser-primary" /> निरंतर जनसंपर्क और संवाद</li>
                  <li className="flex items-center gap-3"><CheckCircle2 className="w-5 h-5 text-odysser-primary" /> सामुदायिक विकास के प्रति प्रतिबद्धता</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-16 md:gap-24 mb-24 items-center">
            <div className="space-y-12">
              <div>
                <h3 className="text-3xl font-bold mb-4 font-display">विकास कार्य डैशबोर्ड</h3>
                <p className="text-xl font-handwriting text-odysser-primary mb-4 transform -rotate-2">प्रगति की निगरानी। हर पल।</p>
                <p className="text-lg text-odysser-muted mb-6">क्षेत्र में चल रहे विकास कार्यों, स्वीकृत बजट और पूर्ण योजनाओं का पूरा विवरण। पारदर्शिता और जवाबदेही के साथ।</p>
                <ul className="space-y-3 font-bold text-gray-800 text-lg">
                  <li className="flex items-center gap-3"><CheckCircle2 className="w-5 h-5 text-odysser-primary" /> कुल स्वीकृत विकास योजनाएं</li>
                  <li className="flex items-center gap-3"><CheckCircle2 className="w-5 h-5 text-odysser-primary" /> पूर्ण बनाम जारी कार्यों का विवरण</li>
                  <li className="flex items-center gap-3"><CheckCircle2 className="w-5 h-5 text-odysser-primary" /> बजट आवंटन में पारदर्शिता</li>
                  <li className="flex items-center gap-3"><CheckCircle2 className="w-5 h-5 text-odysser-primary" /> मासिक प्रगति रिपोर्ट</li>
                </ul>
              </div>
            </div>
            <div>
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="bg-gray-100 rounded-3xl p-4 md:p-8 aspect-[4/3] flex items-center justify-center border border-gray-200"
              >
                 <div className="w-full h-full bg-white rounded-xl shadow-sm border border-gray-200 flex flex-col overflow-hidden p-6 gap-6">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-green-50 rounded-lg p-4 border border-green-100"><div className="text-sm text-green-700 font-medium mb-1">कुल स्वीकृत राशि</div><div className="text-2xl font-bold">₹12.4 Cr</div></div>
                      <div className="bg-orange-50 rounded-lg p-4 border border-orange-100"><div className="text-sm text-orange-700 font-medium mb-1">जारी कार्य</div><div className="text-2xl font-bold">₹3.2 Cr</div></div>
                    </div>
                    <div className="flex-1 bg-gray-50 rounded-lg border border-gray-100 p-4">
                      <div className="h-full w-full flex items-end gap-2">
                        {[40, 70, 45, 90, 65, 80].map((h, i) => (
                          <div key={i} className="flex-1 bg-odysser-primary rounded-t-sm" style={{ height: `${h}%` }}></div>
                        ))}
                      </div>
                    </div>
                 </div>
              </motion.div>
            </div>
          </div>

           <div className="grid md:grid-cols-2 gap-16 md:gap-24 items-center">
            <div className="order-2 md:order-1">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="bg-gray-100 rounded-3xl p-4 md:p-8 aspect-[4/3] flex items-center justify-center border border-gray-200"
              >
                 <div className="w-full h-full bg-white rounded-xl shadow-sm border border-gray-200 flex overflow-hidden p-4 gap-4">
                   {['प्रस्ताव', 'योजना', 'समीक्षा', 'पूर्ण'].map((col, i) => (
                      <div key={i} className="flex-1 bg-gray-50 rounded border border-gray-100 p-2 flex flex-col gap-2">
                        <div className="text-xs font-bold text-gray-500 uppercase">{col}</div>
                        <div className="bg-white p-2 rounded shadow-sm border border-gray-100 h-16"></div>
                        {i % 2 === 0 && <div className="bg-white p-2 rounded shadow-sm border border-gray-100 h-20"></div>}
                      </div>
                   ))}
                 </div>
              </motion.div>
            </div>
            <div className="order-1 md:order-2 space-y-12">
              <div>
                <h3 className="text-3xl font-bold mb-4 font-display">कार्य प्रगति पाइपलाइन</h3>
                <p className="text-xl font-handwriting text-odysser-primary mb-4 transform -rotate-2">प्रस्ताव से पूर्णता तक।</p>
                <p className="text-lg text-odysser-muted mb-6">हर कार्य को उसके विभिन्न चरणों में ट्रैक करें — प्रस्ताव से लेकर योजना, समीक्षा और अंत में सफलतापूर्वक पूर्ण होने तक।</p>
                <ul className="space-y-3 font-bold text-gray-800 text-lg">
                  <li className="flex items-center gap-3"><CheckCircle2 className="w-5 h-5 text-odysser-primary" /> 4-चरणीय कार्य ट्रैकिंग</li>
                  <li className="flex items-center gap-3"><CheckCircle2 className="w-5 h-5 text-odysser-primary" /> क्षेत्रवार कार्यों का वर्गीकरण</li>
                  <li className="flex items-center gap-3"><CheckCircle2 className="w-5 h-5 text-odysser-primary" /> समय सीमा की स्पष्टता</li>
                  <li className="flex items-center gap-3"><CheckCircle2 className="w-5 h-5 text-odysser-primary" /> चरणबद्ध प्रगति की निगरानी</li>
                </ul>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Photo Gallery Section */}
      <section id="gallery" className="py-32 px-6 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 relative">
            <p className="font-handwriting text-3xl md:text-4xl text-odysser-primary mb-4 transform -rotate-2">फोटो गैलरी</p>
            <h2 className="text-4xl md:text-6xl font-display font-bold tracking-tight">क्षेत्र की <span className="text-odysser-muted">झलकियाँ।</span></h2>

            {/* Upload Button */}
            <button
              onClick={() => fileInputRef.current?.click()}
              className="mt-8 mx-auto h-16 w-16 rounded-full bg-odysser-primary text-white flex items-center justify-center shadow-lg hover:scale-110 transition-transform cursor-pointer group relative overflow-hidden"
            >
              <Plus className="w-8 h-8 relative z-10" />
              <span className="absolute inset-0 shimmer-bg opacity-0 group-hover:opacity-100 transition-opacity"></span>
            </button>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileUpload}
              multiple
              accept="image/*,video/*"
              className="hidden"
            />
          </div>

          <div className="relative aspect-[16/9] md:aspect-[21/9] w-full max-w-6xl mx-auto rounded-[2rem] md:rounded-[3rem] overflow-hidden glass-card border-4 border-white shadow-2xl group">
            {galleryMedia.length > 0 ? (
              <>
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentSlide}
                    initial={{ opacity: 0, x: 100 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -100 }}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    className="absolute inset-0"
                  >
                    {galleryMedia[currentSlide].type === 'image' ? (
                      <img
                        src={currentBlobUrl}
                        alt="Gallery"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <video
                        src={currentBlobUrl}
                        autoPlay
                        muted
                        loop
                        playsInline
                        className="w-full h-full object-cover"
                      />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                  </motion.div>
                </AnimatePresence>

                {/* Navigation Buttons */}
                <button
                  onClick={prevSlide}
                  className="absolute left-6 top-1/2 -translate-y-1/2 w-14 h-14 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-white flex items-center justify-center hover:bg-white hover:text-black transition-all z-20 opacity-0 group-hover:opacity-100"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
                <button
                  onClick={nextSlide}
                  className="absolute right-6 top-1/2 -translate-y-1/2 w-14 h-14 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-white flex items-center justify-center hover:bg-white hover:text-black transition-all z-20 opacity-0 group-hover:opacity-100"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>

                {/* Indicators */}
                <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2 z-20">
                  {galleryMedia.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => {
                        setIsAutoPlaying(false);
                        setCurrentSlide(i);
                      }}
                      className={`h-1.5 rounded-full transition-all duration-500 ${
                        currentSlide === i ? 'w-8 bg-white' : 'w-2 bg-white/40 hover:bg-white/60'
                      }`}
                    />
                  ))}
                </div>

                {/* Media Type Icon */}
                <div className="absolute top-8 right-8 z-20 p-3 rounded-2xl bg-black/20 backdrop-blur-md border border-white/20 text-white">
                  {galleryMedia[currentSlide].type === 'image' ? <ImageIcon className="w-5 h-5" /> : <Film className="w-5 h-5" />}
                </div>
              </>
            ) : (
              <div className="absolute inset-0 flex flex-col items-center justify-center text-odysser-muted bg-gray-50">
                <ImageIcon className="w-16 h-16 mb-4 opacity-20" />
                <p className="text-xl font-medium">कोई फोटो या वीडियो नहीं है।</p>
                <p className="text-sm">ऊपर दिए गए बटन से मीडिया जोड़ें।</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Janmat (Testimonials) */}
      <section id="testimonials" className="py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <p className="font-handwriting text-3xl md:text-4xl text-odysser-primary mb-4">जनता की आवाज़</p>
            <h2 className="text-4xl md:text-5xl font-display font-bold tracking-tight">हमारे कार्यों की झलक।</h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { text: "क्षेत्र में सड़कों और बिजली की समस्या का जो समाधान हुआ है, वह काबिले तारीफ है।", author: "रामेश्वर साहू", role: "किसान", rev: "मुंगेली" },
              { text: "युवाओं के कौशल विकास के लिए किए गए प्रयास हमारे भविष्य के लिए बहुत महत्वपूर्ण हैं।", author: "अमित कुमार", role: "छात्र", rev: "बिलासपुर" },
              { text: "हर सुख-दुख में हमारे साथ खड़े रहने वाले नेता की हमें ज़रूरत थी, जो आज हमारे पास है।", author: "सुनीता बाई", role: "गृहिणी", rev: "पथरिया" },
              { text: "संगठन निर्माण और जनसेवा के प्रति इनका समर्पण प्रेरणादायक है।", author: "राजेश गुप्ता", role: "व्यापारी", rev: "मुंगेली" },
              { text: "विकास कार्यों में पारदर्शिता और ईमानदारी ही इनकी असली पहचान है।", author: "विमल पटेल", role: "समाजसेवी", rev: "लोरमी" },
              { text: "शिक्षा के क्षेत्र में जो सुधार हुए हैं, उससे हमारे बच्चों का भविष्य सुरक्षित हो रहा है।", author: "डॉ. सीमा वर्मा", role: "शिक्षक", rev: "मुंगेली" },
            ].map((t, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="bg-white p-8 rounded-3xl shadow-sm border border-gray-200 flex flex-col justify-between"
              >
                <p className="text-lg text-gray-800 font-medium mb-8 leading-relaxed">"{t.text}"</p>
                <div className="flex items-center justify-between border-t border-gray-100 pt-4 mt-auto">
                  <div>
                    <div className="font-bold text-black">{t.author}</div>
                    <div className="text-sm text-odysser-muted">{t.role}</div>
                  </div>
                  <div className="text-sm font-bold bg-gray-50 border border-gray-200 px-3 py-1 rounded-full text-odysser-muted">
                    {t.rev}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Volunteer Form */}
      <section id="pricing" className="py-32 px-6 bg-[#f0ece7] border-y border-gray-200">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
             <p className="font-handwriting text-3xl md:text-4xl text-odysser-primary mb-4">भागीदारी</p>
            <h2 className="text-4xl md:text-6xl font-display font-bold tracking-tight">स्वयंसेवक बनें</h2>
          </div>

          <div className="glass-card overflow-hidden border-2 border-white shadow-[0_30px_60px_rgba(0,0,0,0.08)]">
            <div className="p-8 md:p-12">
              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-odysser-muted uppercase tracking-wider">नाम</label>
                    <input type="text" placeholder="आपका नाम लिखें" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-odysser-primary/20 transition-all" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-odysser-muted uppercase tracking-wider">मोबाइल नंबर</label>
                    <input type="tel" placeholder="अपना मोबाइल नंबर लिखें" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-odysser-primary/20 transition-all" />
                  </div>
                </div>
                <div className="space-y-2">
                    <label className="text-sm font-bold text-odysser-muted uppercase tracking-wider">पता</label>
                    <input type="text" placeholder="आपका पता लिखें" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-odysser-primary/20 transition-all" />
                </div>
                <div className="space-y-2">
                    <label className="text-sm font-bold text-odysser-muted uppercase tracking-wider">विधानसभा क्षेत्र</label>
                    <input type="text" placeholder="अपने विधानसभा क्षेत्र का नाम लिखें" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-odysser-primary/20 transition-all" />
                </div>
                <div className="space-y-2">
                    <label className="text-sm font-bold text-odysser-muted uppercase tracking-wider">संदेश</label>
                    <textarea rows={4} placeholder="अपना संदेश लिखें" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-odysser-primary/20 transition-all"></textarea>
                </div>

                <div className="pt-4">
                  <button
                    type="submit"
                    onClick={(e) => {
                      e.preventDefault();
                      console.log('Volunteer registration submitted');
                      alert('पंजीकरण के लिए धन्यवाद! हम जल्द ही आपसे संपर्क करेंगे।');
                    }}
                    className="btn-odysser w-full px-12 py-5 text-xl group relative"
                  >
                    <span className="relative z-10 flex items-center justify-center gap-2">
                      स्वयंसेवक के रूप में जुड़ें
                      <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </span>
                    <span className="absolute inset-0 shimmer-bg pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity"></span>
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-32 px-6 bg-odysser-surface text-white text-center relative overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-20" style={{ background: 'radial-gradient(circle at center, var(--color-odysser-primary) 0%, transparent 70%)' }}></div>
        <div className="max-w-3xl mx-auto relative z-10">
          <p className="font-handwriting text-3xl md:text-4xl text-blue-400 mb-4">संपर्क करें</p>
          <h2 className="text-5xl md:text-7xl font-display font-bold tracking-tight mb-8">
            क्षेत्र के विकास के लिए<br/>हमसे जुड़ें।
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <div className="p-6 bg-white/5 rounded-2xl backdrop-blur-sm border border-white/10">
               <div className="text-blue-400 font-bold mb-2">मोबाइल नंबर 1</div>
               <div className="text-3xl font-display font-bold">9406122222</div>
            </div>
            <div className="p-6 bg-white/5 rounded-2xl backdrop-blur-sm border border-white/10">
               <div className="text-blue-400 font-bold mb-2">मोबाइल नंबर 2</div>
               <div className="text-3xl font-display font-bold">9644950000</div>
            </div>
          </div>
          <div className="flex flex-col items-center gap-4">
            <button className="btn-odysser bg-white text-black px-10 py-5 text-lg group hover:bg-gray-50 w-full sm:w-auto shadow-none border-0">
              <span className="relative z-10 font-bold">संपर्क सूत्र</span>
            </button>
            <div className="text-sm text-gray-400 font-bold flex flex-wrap items-center justify-center gap-x-4 gap-y-2">
              <span>निरंतर उपलब्ध</span>
              <span>•</span>
              <span>जनसेवा प्रथम</span>
              <span>•</span>
              <span>सकारात्मक बदलाव</span>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-gray-200">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 rounded bg-odysser-surface flex items-center justify-center">
              <span className="text-white font-bold text-sm tracking-tighter">जन</span>
            </div>
            <span className="font-display font-bold text-lg tracking-tight">जनसेवक</span>
          </div>

          <div className="flex items-center gap-6">
            <a href="#features" className="text-sm font-bold text-odysser-muted hover:text-black transition-colors">परिचय</a>
            <a href="#gallery" className="text-sm font-bold text-odysser-muted hover:text-black transition-colors">फोटो गैलरी</a>
            <a href="#process" className="text-sm font-bold text-odysser-muted hover:text-black transition-colors">प्राथमिकताएं</a>
            <a href="#pricing" className="text-sm font-bold text-odysser-muted hover:text-black transition-colors">स्वयंसेवक बनें</a>
            <a href="#testimonials" className="text-sm font-bold text-odysser-muted hover:text-black transition-colors">जनमत</a>
          </div>

          <div className="text-sm text-odysser-muted font-bold">
            © {new Date().getFullYear()} जनसेवक। सर्वाधिकार सुरक्षित।
          </div>
        </div>
      </footer>

      <style dangerouslySetInnerHTML={{__html: `
        @keyframes marquee {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-50%); }
        }
      `}} />
    </div>
  );
}

export default App;
