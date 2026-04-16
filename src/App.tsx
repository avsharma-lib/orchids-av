import { useEffect, useState, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

interface Product {
  id: number;
  image: string;
  name: string;
  description: string;
  price: string;
  features: string[];
}

function App() {
  const { scrollYProgress } = useScroll();
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -50]);

  const [isScrolled, setIsScrolled] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Product State
  const [products, setProducts] = useState<Product[]>([]);
  const [isAddingProduct, setIsAddingProduct] = useState(false);
  const [newProduct, setNewProduct] = useState({
    image: '',
    name: '',
    description: '',
    price: '',
    features: ['']
  });

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const handleAddFeature = () => {
    setNewProduct({ ...newProduct, features: [...newProduct.features, ''] });
  };

  const handleFeatureChange = (index: number, value: string) => {
    const updatedFeatures = [...newProduct.features];
    updatedFeatures[index] = value;
    setNewProduct({ ...newProduct, features: updatedFeatures });
  };

  const handleSaveProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (products.length < 4) {
      setProducts([...products, { ...newProduct, id: Date.now() }]);
      setIsAddingProduct(false);
      setNewProduct({ image: '', name: '', description: '', price: '', features: [''] });
    }
  };

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
            <div className="h-8 w-8 rounded bg-gradient-to-br from-black to-gray-700 flex items-center justify-center">
              <span className="text-white font-bold text-sm tracking-tighter">V</span>
            </div>
            <span className="font-display font-bold text-lg tracking-tight uppercase">vampiies</span>
          </div>

          <div className="hidden md:flex items-center gap-8 text-[15px] font-medium text-odysser-muted">
            <a href="#about" className="hover:text-black transition-colors">About</a>
            <a href="#shop" className="hover:text-black transition-colors">Shop</a>
            <a href="#gallery" className="hover:text-black transition-colors">Gallery</a>
          </div>

          <div className="flex items-center gap-4">
            <a href="https://instagram.com/vampiies" target="_blank" rel="noopener noreferrer" className="btn-odysser px-5 py-2.5 text-[15px] group bg-black">
              Follow on IG
              <span className="absolute inset-0 shimmer-bg opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></span>
            </a>
          </div>
        </div>
      </motion.nav>

      {/* Hero Section / Profile Header */}
      <section className="relative pt-40 pb-20 md:pt-48 md:pb-32 overflow-hidden px-6">
        <div className="max-w-7xl mx-auto text-center relative z-10">

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.1 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-gray-200 shadow-sm mb-8"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-400 opacity-75"></span>
              <span className="relative inline-flex h-2 w-2 rounded-full bg-red-400"></span>
            </span>
            <span className="text-[13px] font-medium text-odysser-muted tracking-wide uppercase">
              Undefeated
            </span>
          </motion.div>

          <div className="flex flex-col items-center mb-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="w-32 h-32 md:w-40 md:h-40 rounded-full border-4 border-white shadow-2xl overflow-hidden mb-6"
            >
              <img
                src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=400&auto=format&fit=crop"
                alt="vampiies profile"
                className="w-full h-full object-cover"
              />
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
              className="text-5xl md:text-7xl font-display font-bold tracking-[-0.03em] leading-tight"
            >
              vampiies
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.4 }}
              className="text-2xl md:text-3xl font-handwriting text-red-600 mt-2"
            >
              - salvatore
            </motion.p>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.5 }}
            className="flex flex-wrap justify-center gap-8 md:gap-16 mb-12"
          >
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-display font-bold">596</div>
              <div className="text-sm font-bold text-odysser-muted uppercase tracking-wider">posts</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-display font-bold">50K</div>
              <div className="text-sm font-bold text-odysser-muted uppercase tracking-wider">followers</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-display font-bold">1,743</div>
              <div className="text-sm font-bold text-odysser-muted uppercase tracking-wider">following</div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.6 }}
            className="flex flex-col items-center gap-6"
          >
            <div className="flex flex-wrap justify-center gap-4">
              <button className="btn-odysser px-8 py-3 text-lg bg-black text-white group">
                Follow
                <span className="absolute inset-0 shimmer-bg opacity-0 group-hover:opacity-100 transition-opacity"></span>
              </button>
              <button className="btn-odysser px-8 py-3 text-lg bg-white text-black border border-gray-200 group">
                Message
              </button>
              <button className="btn-odysser px-8 py-3 text-lg bg-white text-black border border-gray-200 group">
                Contact
              </button>
            </div>

            <a
              href="https://linktr.ee/vampiies"
              target="_blank"
              rel="noopener noreferrer"
              className="text-lg font-medium text-blue-600 hover:underline flex items-center gap-2"
            >
              <ExternalLink className="w-4 h-4" /> linktr.ee/vampiies
            </a>

            <p className="text-sm text-odysser-muted font-medium flex items-center gap-3">
              <span>Followed by <span className="text-black font-bold">amartyaahh</span></span>
              <span className="w-1 h-1 rounded-full bg-gray-300"></span>
              <span><span className="text-black font-bold">aliferrous._</span></span>
            </p>
          </motion.div>

        </div>

        {/* Floating Abstract Elements */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden -z-10">
          <motion.div
            style={{ y: y1 }}
            className="absolute top-1/4 -left-20 w-[600px] h-[600px] bg-gradient-to-tr from-gray-200 to-transparent rounded-full blur-3xl opacity-60"
          />
          <motion.div
            style={{ y: y2 }}
            className="absolute top-1/3 -right-20 w-[500px] h-[500px] bg-gradient-to-bl from-red-50 to-transparent rounded-full blur-3xl opacity-80"
          />
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-32 px-6 bg-odysser-surfaceLight relative overflow-hidden">
        <div className="max-w-4xl mx-auto text-center">
          <p className="font-handwriting text-3xl md:text-4xl text-red-600 mb-4 transform -rotate-2">About vampiies</p>
          <h2 className="text-4xl md:text-6xl font-display font-bold tracking-tight mb-8">
            The Dark Side of Mystic Falls
          </h2>
          <p className="text-xl md:text-2xl text-odysser-muted leading-relaxed max-w-2xl mx-auto font-sans">
            "A TVD fan page focused on Damon Salvatore, edits, quotes, and dark aesthetics."
          </p>

          <div className="mt-16 flex justify-center gap-4 flex-wrap">
            {['Damon Salvatore', 'Edits', 'Quotes', 'Aesthetics'].map((tag, i) => (
              <span key={i} className="px-6 py-2 bg-white rounded-full border border-gray-200 text-sm font-bold uppercase tracking-wider text-odysser-muted shadow-sm">
                #{tag}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Shop Section */}
      <section id="shop" className="py-32 px-6 relative border-b border-gray-200">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-end justify-between mb-24 gap-8">
            <div className="flex-1">
              <p className="font-handwriting text-3xl md:text-4xl text-black mb-4">The Collection</p>
              <h2 className="text-4xl md:text-7xl font-display font-bold tracking-tight">Shop</h2>
              <p className="mt-6 text-xl text-odysser-muted max-w-2xl">
                Exclusive merchandise and digital assets for the true TVD fans. Limited editions available.
              </p>
            </div>

            {products.length < 4 && (
              <button
                onClick={() => setIsAddingProduct(true)}
                className="btn-odysser px-10 py-5 text-xl group bg-black flex items-center gap-3"
              >
                <Plus className="w-6 h-6" />
                Add Product
                <span className="absolute inset-0 shimmer-bg opacity-0 group-hover:opacity-100 transition-opacity"></span>
              </button>
            )}
          </div>

          {/* Product Form Modal-like */}
          {isAddingProduct && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="glass-card p-8 md:p-12 mb-24 max-w-3xl mx-auto border-2 border-black/5"
            >
              <div className="flex justify-between items-center mb-10">
                <h3 className="text-3xl font-bold font-display">Create New Product</h3>
                <button onClick={() => setIsAddingProduct(false)} className="p-3 hover:bg-gray-100 rounded-full transition-colors">
                  <X className="w-8 h-8" />
                </button>
              </div>
              <form onSubmit={handleSaveProduct} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-bold mb-2 uppercase tracking-widest text-odysser-muted">Product Image URL</label>
                    <input
                      type="text"
                      required
                      placeholder="https://images.unsplash.com/..."
                      className="w-full p-4 rounded-2xl border border-gray-200 focus:ring-2 focus:ring-black outline-none transition-all"
                      value={newProduct.image}
                      onChange={e => setNewProduct({...newProduct, image: e.target.value})}
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold mb-2 uppercase tracking-widest text-odysser-muted">Product Name</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Salvatore Ring"
                      className="w-full p-4 rounded-2xl border border-gray-200 focus:ring-2 focus:ring-black outline-none transition-all"
                      value={newProduct.name}
                      onChange={e => setNewProduct({...newProduct, name: e.target.value})}
                    />
                  </div>
                </div>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-bold mb-2 uppercase tracking-widest text-odysser-muted">Price</label>
                    <input
                      type="text"
                      required
                      placeholder="$29.99"
                      className="w-full p-4 rounded-2xl border border-gray-200 focus:ring-2 focus:ring-black outline-none transition-all"
                      value={newProduct.price}
                      onChange={e => setNewProduct({...newProduct, price: e.target.value})}
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold mb-2 uppercase tracking-widest text-odysser-muted">Short Description</label>
                    <input
                      type="text"
                      required
                      placeholder="Describe your product..."
                      className="w-full p-4 rounded-2xl border border-gray-200 focus:ring-2 focus:ring-black outline-none transition-all"
                      value={newProduct.description}
                      onChange={e => setNewProduct({...newProduct, description: e.target.value})}
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-bold mb-2 uppercase tracking-widest text-odysser-muted">Key Features</label>
                  <div className="space-y-3">
                    {newProduct.features.map((feature, idx) => (
                      <input
                        key={idx}
                        type="text"
                        placeholder={`Feature ${idx + 1}`}
                        className="w-full p-4 rounded-2xl border border-gray-200 focus:ring-2 focus:ring-black outline-none transition-all"
                        value={feature}
                        onChange={e => handleFeatureChange(idx, e.target.value)}
                      />
                    ))}
                  </div>
                  <button
                    type="button"
                    onClick={handleAddFeature}
                    className="text-sm font-bold text-odysser-muted hover:text-black flex items-center gap-2 mt-4 transition-colors"
                  >
                    <Plus className="w-4 h-4" /> Add another feature
                  </button>
                </div>
                <button type="submit" className="w-full btn-odysser py-5 bg-black text-white font-bold text-xl mt-8">
                  Save Product to Collection
                </button>
              </form>
            </motion.div>
          )}

          {/* Product Display Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {products.map((product) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="glass-card overflow-hidden flex flex-col group hover:shadow-2xl transition-all duration-500"
              >
                <div className="aspect-[4/5] overflow-hidden bg-gray-100 relative">
                  <img
                    src={product.image || "https://images.unsplash.com/photo-1514516348920-f5d8951c51b2?q=80&w=400&auto=format&fit=crop"}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-md px-4 py-2 rounded-full font-bold text-sm shadow-sm">
                    {product.price}
                  </div>
                </div>
                <div className="p-8 flex-1 flex flex-col">
                  <h3 className="text-2xl font-bold mb-3 font-display">{product.name}</h3>
                  <p className="text-odysser-muted mb-8 flex-1 leading-relaxed">{product.description}</p>

                  <div className="space-y-3 mb-10">
                    {product.features.filter(f => f.trim() !== '').map((feature, i) => (
                      <div key={i} className="flex items-start gap-3">
                        <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5 shrink-0" />
                        <span className="text-sm font-medium leading-tight">{feature}</span>
                      </div>
                    ))}
                  </div>

                  <button className="w-full py-4 bg-black text-white rounded-2xl font-bold hover:bg-gray-800 transition-colors shadow-lg shadow-black/5">
                    View Details
                  </button>
                </div>
              </motion.div>
            ))}

            {products.length === 0 && !isAddingProduct && (
              <div className="col-span-full py-32 text-center border-2 border-dashed border-gray-200 rounded-[40px] bg-gray-50/50">
                <div className="max-w-md mx-auto">
                  <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm">
                    <Plus className="w-8 h-8 text-gray-300" />
                  </div>
                  <h3 className="text-2xl font-bold mb-2">No products yet</h3>
                  <p className="text-odysser-muted mb-8">Start building your collection of TVD inspired merchandise.</p>
                  <button
                    onClick={() => setIsAddingProduct(true)}
                    className="btn-odysser px-8 py-3 bg-black text-white"
                  >
                    Add First Product
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Aesthetic Video Section */}
      <section className="relative py-32 px-6 z-20 overflow-hidden">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-center gap-12 md:gap-20">
          <motion.div
            initial={{ opacity: 0, rotate: -10, y: 40 }}
            whileInView={{ opacity: 1, rotate: -4, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="w-full max-w-[300px] rounded-3xl overflow-hidden shadow-2xl border-8 border-white bg-white origin-bottom"
          >
            <img src="https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?q=80&w=400&auto=format&fit=crop" alt="TVD aesthetic 1" className="w-full h-auto" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="w-full max-w-[350px] rounded-[40px] overflow-hidden shadow-[0_50px_100px_rgba(0,0,0,0.2)] border-[8px] border-white bg-black relative group z-10"
          >
             <video
                ref={videoRef}
                src="https://www.lumorasocials.com/demo.mp4"
                className="w-full h-auto object-cover opacity-70"
                autoPlay
                loop
                muted
                playsInline
             />
             <div className="absolute inset-0 flex items-center justify-center bg-black/20">
               <div className="text-center px-8">
                 <h3 className="text-white font-display font-bold text-3xl mb-3 tracking-tight">Salvatore Legacy</h3>
                 <p className="text-gray-200 text-sm font-medium uppercase tracking-[0.2em]">Dark Aesthetic</p>
               </div>
             </div>
             <button
                onClick={toggleMute}
                className="absolute bottom-6 right-6 bg-white/20 hover:bg-white/40 backdrop-blur-md text-white p-3 rounded-full transition-all"
              >
                {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
             </button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, rotate: 10, y: 40 }}
            whileInView={{ opacity: 1, rotate: 4, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="w-full max-w-[300px] rounded-3xl overflow-hidden shadow-2xl border-8 border-white bg-white origin-bottom"
          >
            <img src="https://images.unsplash.com/photo-1533154683836-84ea7a0bc310?q=80&w=400&auto=format&fit=crop" alt="TVD aesthetic 2" className="w-full h-auto" />
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-24 px-6 border-t border-gray-100 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-16 mb-20">
            <div className="md:col-span-6">
              <div className="flex items-center gap-4 mb-8">
                <div className="h-12 w-12 rounded-2xl bg-black flex items-center justify-center shadow-lg shadow-black/10">
                  <span className="text-white font-bold text-2xl tracking-tighter">V</span>
                </div>
                <span className="font-display font-bold text-3xl tracking-tight uppercase">vampiies</span>
              </div>
              <p className="text-xl text-odysser-muted max-w-md leading-relaxed mb-10">
                A TVD fan page dedicated to the Salvatore brothers and the eternal world of Mystic Falls.
              </p>
              <div className="flex items-center gap-4">
                <a href="https://instagram.com/vampiies" target="_blank" rel="noopener noreferrer" className="w-14 h-14 rounded-2xl bg-gray-50 border border-gray-100 flex items-center justify-center hover:bg-black hover:text-white hover:-translate-y-1 transition-all duration-300">
                  <Instagram className="w-6 h-6" />
                </a>
                <a href="#" className="w-14 h-14 rounded-2xl bg-gray-50 border border-gray-100 flex items-center justify-center hover:bg-black hover:text-white hover:-translate-y-1 transition-all duration-300">
                  <MessageCircle className="w-6 h-6" />
                </a>
              </div>
            </div>

            <div className="md:col-span-3">
              <h4 className="font-bold uppercase tracking-[0.2em] text-xs text-black/40 mb-8">Explore</h4>
              <ul className="space-y-5 font-bold text-lg">
                <li><a href="#about" className="hover:text-red-600 transition-colors">About</a></li>
                <li><a href="#shop" className="hover:text-red-600 transition-colors">Shop</a></li>
                <li><a href="#" className="hover:text-red-600 transition-colors">Gallery</a></li>
                <li><a href="#" className="hover:text-red-600 transition-colors">Quotes</a></li>
              </ul>
            </div>

            <div className="md:col-span-3">
              <h4 className="font-bold uppercase tracking-[0.2em] text-xs text-black/40 mb-8">Fan base</h4>
              <ul className="space-y-5 font-bold text-lg">
                <li className="flex items-center gap-3"><MessageCircle className="w-5 h-5 text-gray-300" /> Direct Message</li>
                <li className="flex items-center gap-3"><Phone className="w-5 h-5 text-gray-300" /> Business Inquiry</li>
                <li className="flex items-center gap-3"><UserPlus className="w-5 h-5 text-gray-300" /> Community</li>
              </ul>
            </div>
          </div>

          <div className="pt-12 border-t border-gray-100 flex flex-col md:flex-row items-center justify-between gap-6 text-sm font-bold text-odysser-muted uppercase tracking-[0.1em]">
            <div>© {new Date().getFullYear()} vampiies. inspired by TVD.</div>
            <div className="flex items-center gap-12">
              <a href="#" className="hover:text-black transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-black transition-colors">Terms of Service</a>
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
