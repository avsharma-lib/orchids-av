import { useEffect, useState, useRef } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import {
  ArrowRight, Plus, ChevronLeft, ChevronRight,
  Image as ImageIcon, Film, MessageCircle, Phone,
  Trash2, ArrowUp, ArrowDown, X,
  Smile, CheckCircle, Briefcase, Trophy,
  Facebook, Instagram
} from 'lucide-react';
import { saveMedia, getAllMedia, deleteMedia, updateMediaOrder, type MediaItem } from './utils/db';

const STATIC_MEDIA = [
  { url: '/gallery/0b098ce4-c11e-4f44-b879-b4c657e6170a.jpeg', type: 'image' as const },
  { url: '/gallery/2d174889-db50-48df-9d51-cfc8d1249d47.jpeg', type: 'image' as const },
  { url: '/gallery/4709e79f-c9ba-4535-b857-8ae0c719e8b5.jpeg', type: 'image' as const },
  { url: '/gallery/4c6285fb-2696-45af-aefa-85915ab62d0c.jpeg', type: 'image' as const },
  { url: '/gallery/53edfa1c-ba72-471b-9ed9-20d5ccd7b843.jpeg', type: 'image' as const },
  { url: '/gallery/6546c5ac-56db-42d7-bf0f-388c477019cf.jpeg', type: 'image' as const },
  { url: '/gallery/79529c19-8484-4869-8922-c4dc898b0833.jpeg', type: 'image' as const },
  { url: '/gallery/79e32a52-ec68-41fe-8c31-a3b0b56ef77b.jpeg', type: 'image' as const },
  { url: '/gallery/84a5401a-394a-458b-8995-2067d9eb99c9.jpeg', type: 'image' as const },
  { url: '/gallery/977ed0f5-d40d-4d5a-9639-9e48762aa67d.jpeg', type: 'image' as const },
  { url: '/gallery/9b4d1de4-515b-4b7d-87a1-c780e37d51cb.jpeg', type: 'image' as const },
  { url: '/gallery/a3ff7171-55e6-49c1-9d1d-bd81655bacec.jpeg', type: 'image' as const },
  { url: '/gallery/b1cdc669-94f6-4210-a880-150be03c9ef7.jpeg', type: 'image' as const },
  { url: '/gallery/bb0ee29e-7933-47ba-bf8d-6fd003a89781.jpeg', type: 'image' as const },
  { url: '/gallery/d6d76f32-460f-4b07-b057-b789c43b5df2.jpeg', type: 'image' as const },
  { url: '/gallery/e02c4e64-dc77-4e75-84ff-50ba4b624708.jpeg', type: 'image' as const },
  { url: '/gallery/e1657072-e7ee-4f17-98e9-b2367af2832f.jpeg', type: 'image' as const },
  { url: '/gallery/ec00be5f-3246-4a3b-9adb-93c63f06cc66 (1).jpeg', type: 'image' as const },
  { url: '/gallery/ec00be5f-3246-4a3b-9adb-93c63f06cc66.jpeg', type: 'image' as const },
  { url: '/gallery/IMG_20260629_224517_240.jpg', type: 'image' as const },
  { url: '/gallery/IMG_20260629_224517_242.jpg', type: 'image' as const },
  { url: '/gallery/IMG_20260629_224718_492.jpg', type: 'image' as const },
  { url: '/gallery/IMG_20260629_224720_986.jpg', type: 'image' as const },
  { url: '/gallery/IMG_20260629_224722_730.jpg', type: 'image' as const },
  { url: '/gallery/IMG_20260629_224728_120.jpg', type: 'image' as const }
];

function App() {
  const { scrollYProgress } = useScroll();
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -50]);

  const [isScrolled, setIsScrolled] = useState(false);
  const [galleryMedia, setGalleryMedia] = useState<MediaItem[]>([]);
  const [allMedia, setAllMedia] = useState<{url: string, type: 'image' | 'video', id?: number}[]>([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isGridOpen, setIsGridOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);

  // Form states
  const [formName, setFormName] = useState('');
  const [formPhone, setFormPhone] = useState('');
  const [formAddress, setFormAddress] = useState('');
  const [formConstituency, setFormConstituency] = useState('');
  const [formMessage, setFormMessage] = useState('');

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
    const combined = [
      ...STATIC_MEDIA.map((m, i) => ({ ...m, id: -1 - i })),
      ...galleryMedia.map(m => ({
        url: URL.createObjectURL(m.blob),
        type: m.type,
        id: m.id
      }))
    ];
    setAllMedia(combined);

    return () => {
      combined.forEach(m => {
        if (m.url.startsWith('blob:')) {
          URL.revokeObjectURL(m.url);
        }
      });
    };
  }, [galleryMedia]);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const type = file.type.startsWith('video') ? 'video' : 'image';

      const newItem: Omit<MediaItem, 'id' | 'order'> = {
        blob: file,
        type: type,
        timestamp: Date.now()
      };

      await saveMedia(newItem);
    }

    const media = await getAllMedia();
    setGalleryMedia(media);
    if (media.length > 0) {
      setCurrentSlide(media.length - 1);
    }
  };

  const handleDelete = async (id: number) => {
    if (window.confirm('क्या आप वाकई इसे हटाना चाहते हैं?')) {
      await deleteMedia(id);
      const media = await getAllMedia();
      setGalleryMedia(media);
      if (currentSlide >= media.length) {
        setCurrentSlide(Math.max(0, media.length - 1));
      }
    }
  };

  const moveItem = async (index: number, direction: 'up' | 'down') => {
    const newMedia = [...galleryMedia];
    const targetIndex = direction === 'up' ? index - 1 : index + 1;

    if (targetIndex < 0 || targetIndex >= newMedia.length) return;

    [newMedia[index], newMedia[targetIndex]] = [newMedia[targetIndex], newMedia[index]];
    await updateMediaOrder(newMedia);
    setGalleryMedia(await getAllMedia());
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formName === 'Aaryaveer' && !formPhone && !formAddress && !formConstituency && !formMessage) {
      setIsAdminOpen(true);
      setFormName('');
      return;
    }
    alert('पंजीकरण के लिए धन्यवाद! हम जल्द ही आपसे संपर्क करेंगे।');
    setFormName('');
    setFormPhone('');
    setFormAddress('');
    setFormConstituency('');
    setFormMessage('');
  };

  const nextSlide = () => {
    setIsAutoPlaying(false);
    if (allMedia.length === 0) return;
    setCurrentSlide((prev) => (prev + 1) % allMedia.length);
  };

  const prevSlide = () => {
    setIsAutoPlaying(false);
    if (allMedia.length === 0) return;
    setCurrentSlide((prev) => (prev - 1 + allMedia.length) % allMedia.length);
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
            <img src="/logo.png" alt="Congress Logo" className="h-12 w-auto object-contain" />
            <span className="font-display font-black text-2xl tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-black to-gray-600">कमलेश मिश्रा</span>
          </div>

          <div className="hidden md:flex items-center gap-8 text-[15px] font-medium text-odysser-muted">
            <a href="#gallery" className="hover:text-black transition-colors">फोटो गैलरी</a>
            <a href="#about" className="hover:text-black transition-colors">परिचय</a>
            <a href="#contact" className="hover:text-black transition-colors">संपर्क करें</a>
            <a href="#volunteer" className="hover:text-black transition-colors">हमसे जुड़ें</a>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsContactModalOpen(true)}
              className="btn-odysser px-5 py-2.5 text-[15px] group"
            >
              संपर्क करें
              <span className="absolute inset-0 shimmer-bg opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></span>
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Contact Modal */}
      <AnimatePresence>
        {isContactModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsContactModalOpen(false)}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-lg bg-white rounded-[2.5rem] shadow-2xl overflow-hidden"
            >
              <div className="p-8">
                <div className="flex justify-between items-center mb-8">
                  <h3 className="text-3xl font-display font-bold">संपर्क करें</h3>
                  <button onClick={() => setIsContactModalOpen(false)} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                    <X className="w-6 h-6" />
                  </button>
                </div>

                <div className="space-y-6">
                  {[
                    { label: 'संपर्क सूत्र 1', phone: '9406122222' },
                    { label: 'संपर्क सूत्र 2', phone: '9644950000' }
                  ].map((item, idx) => (
                    <div key={idx} className="p-6 rounded-3xl bg-gray-50 border border-gray-100">
                      <div className="text-odysser-muted font-bold text-sm uppercase tracking-wider mb-2">{item.label}</div>
                      <div className="text-3xl font-display font-black mb-6">{item.phone}</div>
                      <div className="flex gap-4">
                        <a href={`tel:${item.phone}`} className="flex-1 py-3 bg-black text-white rounded-2xl font-bold flex items-center justify-center gap-2 hover:opacity-90 transition-opacity">
                          <Phone className="w-4 h-4" /> कॉल करें
                        </a>
                        <a href={`https://wa.me/91${item.phone}`} target="_blank" rel="noopener noreferrer" className="flex-1 py-3 bg-[#25D366] text-white rounded-2xl font-bold flex items-center justify-center gap-2 hover:opacity-90 transition-opacity">
                          <MessageCircle className="w-4 h-4" /> व्हाट्सएप
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Admin Panel Modal */}
      <AnimatePresence>
        {isAdminOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsAdminOpen(false)}
              className="absolute inset-0 bg-black/80 backdrop-blur-md"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="relative w-full max-w-4xl bg-white rounded-[3rem] shadow-2xl overflow-hidden max-h-[80vh] flex flex-col"
            >
              <div className="p-8 border-b flex justify-between items-center bg-gray-50">
                <div>
                  <h3 className="text-3xl font-display font-bold">गैलरी प्रबंधन</h3>
                  <p className="text-odysser-muted">फोटो और वीडियो प्रबंधित करें</p>
                </div>
                <div className="flex gap-4">
                   <button
                    onClick={() => fileInputRef.current?.click()}
                    className="flex items-center gap-2 px-6 py-3 bg-odysser-primary text-white rounded-2xl font-bold hover:scale-105 transition-transform"
                  >
                    <Plus className="w-5 h-5" /> मीडिया जोड़ें
                  </button>
                  <button onClick={() => setIsAdminOpen(false)} className="p-3 hover:bg-gray-200 rounded-2xl transition-colors text-gray-500">
                    <X className="w-6 h-6" />
                  </button>
                </div>
              </div>

              <div className="p-8 overflow-y-auto flex-1">
                {galleryMedia.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {galleryMedia.map((item, index) => (
                      <div key={item.id} className="group relative rounded-[2rem] overflow-hidden border-2 border-gray-100 bg-gray-50 aspect-video">
                        {item.type === 'image' ? (
                          <img src={URL.createObjectURL(item.blob)} alt="" className="w-full h-full object-cover" />
                        ) : (
                          <video src={URL.createObjectURL(item.blob)} className="w-full h-full object-cover" />
                        )}
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
                          <button
                            onClick={() => moveItem(index, 'up')}
                            disabled={index === 0}
                            className="p-3 bg-white rounded-xl hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                          >
                            <ArrowUp className="w-5 h-5" />
                          </button>
                          <button
                            onClick={() => moveItem(index, 'down')}
                            disabled={index === galleryMedia.length - 1}
                            className="p-3 bg-white rounded-xl hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                          >
                            <ArrowDown className="w-5 h-5" />
                          </button>
                          <button
                            onClick={() => item.id && handleDelete(item.id)}
                            className="p-3 bg-red-500 text-white rounded-xl hover:bg-red-600 transition-all"
                          >
                            <Trash2 className="w-5 h-5" />
                          </button>
                        </div>
                        <div className="absolute top-4 left-4 px-3 py-1 bg-black/30 backdrop-blur-md rounded-full text-white text-xs font-bold">
                          {index + 1}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-20 text-odysser-muted">
                    <ImageIcon className="w-16 h-16 mx-auto mb-4 opacity-20" />
                    <p>कोई मीडिया नहीं मिला। नया जोड़ने के लिए ऊपर दिए गए बटन का उपयोग करें।</p>
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Grid Modal */}
      <AnimatePresence>
        {isGridOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsGridOpen(false)}
              className="absolute inset-0 bg-black/90 backdrop-blur-md"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="relative w-full max-w-6xl bg-white rounded-[3rem] shadow-2xl overflow-hidden max-h-[85vh] flex flex-col z-10"
            >
              <div className="p-8 border-b flex justify-between items-center bg-gray-50">
                <h3 className="text-3xl font-display font-bold">फोटो गैलरी</h3>
                <button onClick={() => setIsGridOpen(false)} className="p-3 hover:bg-gray-200 rounded-2xl transition-colors text-gray-500">
                  <X className="w-6 h-6" />
                </button>
              </div>
              <div className="p-8 overflow-y-auto flex-1 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {allMedia.map((item, idx) => (
                  <div
                    key={idx}
                    className="aspect-square rounded-2xl overflow-hidden cursor-zoom-in hover:scale-[1.02] transition-transform shadow-md border-2 border-gray-100"
                    onClick={() => setSelectedImage(item.url)}
                  >
                    {item.type === 'image' ? (
                      <img src={item.url} alt="" className="w-full h-full object-cover" />
                    ) : (
                      <video src={item.url} className="w-full h-full object-cover" />
                    )}
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Zoom Modal */}
      <AnimatePresence>
        {selectedImage && (
          <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedImage(null)}
              className="absolute inset-0 bg-black/95 backdrop-blur-xl"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.5 }}
              className="relative max-w-full max-h-full z-20"
            >
              <img src={selectedImage} alt="" className="max-w-full max-h-[90vh] rounded-2xl shadow-2xl" />
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute -top-12 right-0 p-2 text-white hover:text-gray-300 transition-colors"
              >
                <X className="w-8 h-8" />
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* 1. Photo Gallery Section */}
      <section id="gallery" className="pt-32 bg-white overflow-hidden">
        <div className="w-full">
          <div className="text-center mb-16 relative px-6">
            <p className="font-handwriting text-3xl md:text-4xl text-odysser-primary mb-4 transform -rotate-2">फोटो गैलरी</p>
            <h2 className="text-4xl md:text-6xl font-display font-bold tracking-tight">फोटो <span className="text-odysser-muted">गैलरी।</span></h2>

            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileUpload}
              multiple
              accept="image/*,video/*"
              className="hidden"
            />
          </div>

          <div className="relative aspect-[16/9] md:aspect-[21/9] w-full overflow-hidden shadow-2xl group cursor-pointer" onClick={() => setIsGridOpen(true)}>
            {allMedia.length > 0 ? (
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
                    {allMedia[currentSlide].type === 'image' ? (
                      <img
                        src={allMedia[currentSlide].url}
                        alt="गैलरी"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <video
                        src={allMedia[currentSlide].url}
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

                <button
                  onClick={(e) => { e.stopPropagation(); prevSlide(); }}
                  className="absolute left-6 top-1/2 -translate-y-1/2 w-14 h-14 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-white flex items-center justify-center hover:bg-white hover:text-black transition-all z-20 opacity-0 group-hover:opacity-100"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
                <button
                  onClick={(e) => { e.stopPropagation(); nextSlide(); }}
                  className="absolute right-6 top-1/2 -translate-y-1/2 w-14 h-14 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-white flex items-center justify-center hover:bg-white hover:text-black transition-all z-20 opacity-0 group-hover:opacity-100"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>

                <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2 z-20">
                  {allMedia.map((_, i) => (
                    <button
                      key={i}
                      onClick={(e) => {
                        e.stopPropagation();
                        setIsAutoPlaying(false);
                        setCurrentSlide(i);
                      }}
                      className={`h-1.5 rounded-full transition-all duration-500 ${
                        currentSlide === i ? 'w-8 bg-white' : 'w-2 bg-white/40 hover:bg-white/60'
                      }`}
                    />
                  ))}
                </div>

                <div className="absolute top-8 right-8 z-20 p-3 rounded-2xl bg-black/20 backdrop-blur-md border border-white/20 text-white">
                  {allMedia[currentSlide].type === 'image' ? <ImageIcon className="w-5 h-5" /> : <Film className="w-5 h-5" />}
                </div>
              </>
            ) : (
              <div className="absolute inset-0 flex flex-col items-center justify-center text-odysser-muted bg-gray-50">
                <ImageIcon className="w-16 h-16 mb-4 opacity-20" />
                <p className="text-xl font-medium">कोई फोटो या वीडियो नहीं है।</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* 2. Hero Section */}
      <section className="relative py-20 overflow-hidden px-6">
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
            कमलेश <span className="text-odysser-primary">मिश्रा</span>
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
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.35 }}
            className="mt-8 flex flex-col items-center gap-6"
          >
            <button
              onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
              className="btn-odysser px-8 py-3 text-sm font-bold uppercase tracking-wider"
            >
              अधिक जानकारी
            </button>

            <div className="flex gap-4">
              <a
                href="https://www.facebook.com/kamleshmishra_cg"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-5 py-2.5 bg-[#1877F2] text-white rounded-full hover:scale-105 transition-transform shadow-lg text-sm font-bold"
              >
                <Facebook className="w-4 h-4" /> फेसबुक
              </a>
              <a
                href="https://www.instagram.com/kamleshmishra_cg"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-tr from-[#f09433] via-[#e6683c] via-[#dc2743] via-[#cc2366] to-[#bc1888] text-white rounded-full hover:scale-105 transition-transform shadow-lg text-sm font-bold"
              >
                <Instagram className="w-4 h-4" /> इंस्टाग्राम
              </a>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.45 }}
            className="mt-12 space-y-4 max-w-xl mx-auto px-4"
          >
            {[
              { label: 'जुड़ें', color: 'bg-[#1e69a5]', icon: Smile, target: 'volunteer' },
              { label: 'शिकायत', color: 'bg-[#ffcc33]', text: 'text-black', icon: CheckCircle, target: 'volunteer' },
              { label: 'सुझाव', color: 'bg-[#21283d]', icon: Briefcase, target: 'volunteer' },
              { label: 'संपर्क', color: 'bg-[#d62839]', icon: Trophy, isModal: true }
            ].map((item, idx) => (
              <button
                key={idx}
                onClick={() => item.isModal ? setIsContactModalOpen(true) : document.getElementById(item.target!)?.scrollIntoView({ behavior: 'smooth' })}
                className={`w-full flex items-center justify-between p-6 ${item.color} ${item.text || 'text-white'} rounded-2xl transition-all hover:scale-[1.02] hover:shadow-xl group relative overflow-hidden shadow-md`}
              >
                <div className="flex items-center gap-4 relative z-10">
                  <item.icon className="w-12 h-12 opacity-20 absolute -left-4" />
                  <span className="text-2xl font-display font-black ml-8 uppercase tracking-wide">{item.label}</span>
                </div>
                <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
              </button>
            ))}
          </motion.div>
        </div>

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

      {/* Hero Image Container */}
      <section className="relative pb-20 px-6 z-20">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.5 }}
            className="w-full rounded-3xl overflow-hidden shadow-[0_30px_60px_rgba(0,0,0,0.15)] border-[8px] border-white bg-black relative group"
          >
             <img
                src="/politician.webp"
                alt="कमलेश मिश्रा"
                className="w-full h-auto object-cover"
             />
          </motion.div>
        </div>
      </section>

      {/* 3. About Section (परिचय) */}
      <section id="about" className="py-32 px-6 relative">
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
            <div className="mt-6 text-2xl md:text-3xl text-odysser-muted max-w-4xl mx-auto font-sans leading-relaxed">
              कमलेश मिश्रा छत्तीसगढ़ प्रदेश कांग्रेस कमेटी के सचिव हैं। वे मुंगेली विधानसभा के प्रभारी रह चुके हैं और पूर्व प्रदेश सचिव, छत्तीसगढ़ युवा कांग्रेस के रूप में भी अपनी सेवाएं दे चुके हैं। जनसेवा, संगठन निर्माण और क्षेत्रीय विकास के लिए वे निरंतर कार्यरत हैं।
            </div>
            <div className="mt-8 p-6 bg-white rounded-3xl border border-gray-100 shadow-sm inline-block">
              <div className="text-odysser-muted font-bold text-sm uppercase tracking-wider mb-2">पता</div>
              <div className="text-xl font-display font-bold">
                भनपुरी मिश्रा कॉम्प्लेक्स, सुंदर नगर
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 4. Contact Section (संपर्क करें) */}
      <section id="contact" className="py-32 px-6 bg-odysser-surface text-white text-center relative overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-20" style={{ background: 'radial-gradient(circle at center, var(--color-odysser-primary) 0%, transparent 70%)' }}></div>
        <div className="max-w-3xl mx-auto relative z-10">
          <p className="font-handwriting text-3xl md:text-4xl text-blue-400 mb-4">संपर्क करें</p>
          <h2 className="text-5xl md:text-7xl font-display font-bold tracking-tight mb-8">
            संपर्क सूत्र
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-8 bg-white/5 rounded-[2rem] backdrop-blur-md border border-white/10 flex flex-col items-center gap-6">
               <div className="w-16 h-16 rounded-2xl bg-blue-500/20 flex items-center justify-center text-blue-400">
                 <Phone className="w-8 h-8" />
               </div>
               <div>
                 <div className="text-blue-400 font-bold mb-1 uppercase tracking-wider text-sm">संपर्क सूत्र 1</div>
                 <div className="text-3xl md:text-4xl font-display font-black">9406122222</div>
               </div>
               <div className="flex gap-4 w-full">
                 <a href="tel:9406122222" className="flex-1 py-3 bg-white text-black rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-blue-50 transition-colors">
                   <Phone className="w-4 h-4" /> कॉल करें
                 </a>
                 <a href="https://wa.me/919406122222" target="_blank" rel="noopener noreferrer" className="flex-1 py-3 bg-[#25D366] text-white rounded-xl font-bold flex items-center justify-center gap-2 hover:opacity-90 transition-opacity">
                   <MessageCircle className="w-4 h-4" /> व्हाट्सएप
                 </a>
               </div>
            </div>

            <div className="p-8 bg-white/5 rounded-[2rem] backdrop-blur-md border border-white/10 flex flex-col items-center gap-6">
               <div className="w-16 h-16 rounded-2xl bg-blue-500/20 flex items-center justify-center text-blue-400">
                 <Phone className="w-8 h-8" />
               </div>
               <div>
                 <div className="text-blue-400 font-bold mb-1 uppercase tracking-wider text-sm">संपर्क सूत्र 2</div>
                 <div className="text-3xl md:text-4xl font-display font-black">9644950000</div>
               </div>
               <div className="flex gap-4 w-full">
                 <a href="tel:9644950000" className="flex-1 py-3 bg-white text-black rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-blue-50 transition-colors">
                   <Phone className="w-4 h-4" /> कॉल करें
                 </a>
                 <a href="https://wa.me/919644950000" target="_blank" rel="noopener noreferrer" className="flex-1 py-3 bg-[#25D366] text-white rounded-xl font-bold flex items-center justify-center gap-2 hover:opacity-90 transition-opacity">
                   <MessageCircle className="w-4 h-4" /> व्हाट्सएप
                 </a>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Volunteer Form (हमसे जुड़ें) */}
      <section id="volunteer" className="py-32 px-6 bg-[#f0ece7] border-y border-gray-200">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
             <p className="font-handwriting text-3xl md:text-4xl text-odysser-primary mb-4">हमसे जुड़ें</p>
            <h2 className="text-4xl md:text-6xl font-display font-bold tracking-tight">विकास की यात्रा में जुड़ें</h2>
          </div>

          <div className="glass-card overflow-hidden border-2 border-white shadow-[0_30px_60px_rgba(0,0,0,0.08)]">
            <div className="p-8 md:p-12">
              <form onSubmit={handleFormSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-odysser-muted uppercase tracking-wider">नाम</label>
                    <input
                      type="text"
                      value={formName}
                      onChange={(e) => setFormName(e.target.value)}
                      placeholder="आपका नाम लिखें"
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-odysser-primary/20 transition-all"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-odysser-muted uppercase tracking-wider">मोबाइल नंबर</label>
                    <input
                      type="tel"
                      value={formPhone}
                      onChange={(e) => setFormPhone(e.target.value)}
                      placeholder="अपना मोबाइल नंबर लिखें"
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-odysser-primary/20 transition-all"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                    <label className="text-sm font-bold text-odysser-muted uppercase tracking-wider">पता</label>
                    <input
                      type="text"
                      value={formAddress}
                      onChange={(e) => setFormAddress(e.target.value)}
                      placeholder="आपका पता लिखें"
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-odysser-primary/20 transition-all"
                    />
                </div>
                <div className="space-y-2">
                    <label className="text-sm font-bold text-odysser-muted uppercase tracking-wider">विधानसभा क्षेत्र</label>
                    <input
                      type="text"
                      value={formConstituency}
                      onChange={(e) => setFormConstituency(e.target.value)}
                      placeholder="अपने विधानसभा क्षेत्र का नाम लिखें"
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-odysser-primary/20 transition-all"
                    />
                </div>
                <div className="space-y-2">
                    <label className="text-sm font-bold text-odysser-muted uppercase tracking-wider">संदेश</label>
                    <textarea
                      rows={4}
                      value={formMessage}
                      onChange={(e) => setFormMessage(e.target.value)}
                      placeholder="अपना संदेश लिखें"
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-odysser-primary/20 transition-all"
                    ></textarea>
                </div>

                <div className="pt-4">
                  <button
                    type="submit"
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

      {/* 6. Footer */}
      <footer className="py-12 px-6 border-t border-gray-200">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <img src="/logo.png" alt="Congress Logo" className="h-10 w-auto object-contain" />
            <span className="font-display font-black text-2xl tracking-tight">कमलेश मिश्रा</span>
          </div>

          <div className="flex items-center gap-6">
            <a href="#gallery" className="text-sm font-bold text-odysser-muted hover:text-black transition-colors">फोटो गैलरी</a>
            <a href="#about" className="text-sm font-bold text-odysser-muted hover:text-black transition-colors">परिचय</a>
            <a href="#contact" onClick={(e) => { e.preventDefault(); setIsContactModalOpen(true); }} className="text-sm font-bold text-odysser-muted hover:text-black transition-colors">संपर्क करें</a>
            <a href="#volunteer" className="text-sm font-bold text-odysser-muted hover:text-black transition-colors">हमसे जुड़ें</a>
          </div>

          <div className="flex flex-col items-center md:items-center gap-2">
            <div className="text-sm font-bold text-odysser-muted">संपर्क: 9406122222, 9644950000</div>
            <div className="text-sm text-odysser-muted font-bold">
              © {new Date().getFullYear()} कमलेश मिश्रा। सर्वाधिकार सुरक्षित।
            </div>
            <div className="flex gap-4">
              <span className="text-xs font-bold text-gray-400">फेसबुक</span>
              <span className="text-xs font-bold text-gray-400">एक्स (ट्विटर)</span>
              <span className="text-xs font-bold text-gray-400">इंस्टाग्राम</span>
            </div>
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
