import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ChevronLeft,
  ChevronRight,
  Brain,
  ShoppingCart,
  BarChart3,
  Truck,
  Users,
  ShieldCheck,
  MessageSquare,
  Zap,
  Search,
  Settings,
  Target,
  TrendingUp,
  Cpu,
  Globe,
  Sparkles
} from 'lucide-react';

const SLIDES = [
  {
    id: 1,
    title: "AI in Management & E-commerce Operations",
    description: "An in-depth exploration of how artificial intelligence is reshaping strategic management and modern e-commerce paradigms.",
    icon: <Globe className="w-20 h-20 text-odysser-primary" />,
    content: (
      <div className="mt-12 space-y-6">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 max-w-2xl mx-auto">
          {[
            "Aaryaveer Sharma",
            "Aayush Balkishore",
            "Anshika Sharma",
            "Team Member 4",
            "Team Member 5",
            "Team Member 6"
          ].map((name, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 + (i * 0.1) }}
              className="glass-card py-3 px-4 text-sm font-bold border-white/50 shadow-[0_4px_12px_rgba(0,0,0,0.03)] hover:shadow-md transition-shadow"
            >
              {name}
            </motion.div>
          ))}
        </div>
      </div>
    )
  },
  {
    id: 2,
    title: "Strategic AI Management",
    description: "Leveraging neural networks to process big data, allowing leadership to move from intuitive to evidence-based strategic planning.",
    icon: <Brain className="w-20 h-20 text-odysser-primary" />
  },
  {
    id: 3,
    title: "Supply Chain Intelligence",
    description: "Predictive logistics systems that optimize cargo routes and warehouse allocation, reducing carbon footprints and operational overhead.",
    icon: <Truck className="w-20 h-20 text-odysser-primary" />
  },
  {
    id: 4,
    title: "Hyper-Personalization",
    description: "Deep learning algorithms that understand consumer psychology to deliver one-to-one shopping experiences at global scale.",
    icon: <Target className="w-20 h-20 text-odysser-primary" />
  },
  {
    id: 5,
    title: "Cognitive Customer Service",
    description: "Natural Language Processing (NLP) enables virtual assistants to resolve complex disputes with human-like empathy and machine-like speed.",
    icon: <MessageSquare className="w-20 h-20 text-odysser-primary" />
  },
  {
    id: 6,
    title: "Algorithmic Pricing",
    description: "Dynamic pricing engines that adjust for market volatility, historical demand, and competitive real-time data to optimize yield.",
    icon: <TrendingUp className="w-20 h-20 text-odysser-primary" />
  },
  {
    id: 7,
    title: "AI-Enhanced Recruitment",
    description: "Removing bias from hiring and using behavioral analytics to build high-performance teams that stay longer and achieve more.",
    icon: <Users className="w-20 h-20 text-odysser-primary" />
  },
  {
    id: 8,
    title: "Automated Cybersecurity",
    description: "Self-learning security protocols that detect zero-day threats and fraudulent transactions before they can impact the bottom line.",
    icon: <ShieldCheck className="w-20 h-20 text-odysser-primary" />
  },
  {
    id: 9,
    title: "Optimized Last-Mile Logistics",
    description: "Using drone delivery integration and smart city data to solve the most expensive part of the e-commerce journey.",
    icon: <Zap className="w-20 h-20 text-odysser-primary" />
  },
  {
    id: 10,
    title: "Smart Inventory Nodes",
    description: "Decentralized inventory management that places products closer to the customer before they even place an order.",
    icon: <ShoppingCart className="w-20 h-20 text-odysser-primary" />
  },
  {
    id: 11,
    title: "Predictive Ad Tech",
    description: "Shifting from reactive advertising to proactive intent-based marketing using advanced customer lifecycle value (CLV) prediction.",
    icon: <BarChart3 className="w-20 h-20 text-odysser-primary" />
  },
  {
    id: 12,
    title: "Visual & Voice Commerce",
    description: "Next-gen discovery tools that allow users to shop with a photo or a whisper, making commerce truly invisible and frictionless.",
    icon: <Search className="w-20 h-20 text-odysser-primary" />
  },
  {
    id: 13,
    title: "Industrial IoT & AI",
    description: "Connecting warehouse hardware with AI brains to create fully autonomous 'dark warehouses' that operate 24/7 without error.",
    icon: <Settings className="w-20 h-20 text-odysser-primary" />
  },
  {
    id: 14,
    title: "Generative Operations",
    description: "Automating the creation of thousands of unique product videos, descriptions, and marketing assets in minutes, not months.",
    icon: <Cpu className="w-20 h-20 text-odysser-primary" />
  },
  {
    id: 15,
    title: "The Future of Digital Enterprise",
    description: "In the AI era, the most successful e-commerce managers will be those who master the synergy between human creativity and machine scale.",
    icon: <Sparkles className="w-20 h-20 text-odysser-primary" />
  }
];

function App() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [direction, setDirection] = useState(0);

  const paginate = (newDirection: number) => {
    if (currentSlide + newDirection >= 0 && currentSlide + newDirection < SLIDES.length) {
      setDirection(newDirection);
      setCurrentSlide(currentSlide + newDirection);
    }
  };

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
      scale: 0.95
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
      scale: 1
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
      scale: 0.95
    })
  };

  return (
    <div className="min-h-screen bg-odysser-bg text-odysser-text flex flex-col items-center justify-center p-6 md:p-12 selection:bg-black selection:text-white overflow-hidden relative">
      {/* Background Abstract Glows */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden -z-10">
        <div className="absolute top-1/4 -left-20 w-[600px] h-[600px] bg-gradient-to-tr from-blue-100/40 to-transparent rounded-full blur-3xl opacity-60" />
        <div className="absolute bottom-1/3 -right-20 w-[500px] h-[500px] bg-gradient-to-bl from-gray-100/60 to-transparent rounded-full blur-3xl opacity-80" />
      </div>

      <main className="flex-1 w-full max-w-5xl flex items-center justify-center relative">
        <AnimatePresence initial={false} custom={direction} mode="wait">
          <motion.div
            key={currentSlide}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: "spring", stiffness: 300, damping: 30 },
              opacity: { duration: 0.2 }
            }}
            className="w-full flex flex-col items-center text-center"
          >
            <motion.div
              initial={{ rotate: -10, scale: 0.5, opacity: 0 }}
              animate={{ rotate: 0, scale: 1, opacity: 1 }}
              transition={{
                type: "spring",
                stiffness: 260,
                damping: 20,
                delay: 0.1
              }}
              className="mb-10 relative"
            >
              <div className="absolute inset-0 bg-odysser-primary/10 blur-3xl rounded-full scale-150" />
              <div className="relative glass-card p-10 shadow-[0_20px_50px_rgba(0,0,0,0.08)] border-white border-2">
                {SLIDES[currentSlide].icon}
              </div>
            </motion.div>

            <motion.h1
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="text-4xl md:text-6xl lg:text-7xl font-display font-bold tracking-[-0.03em] leading-[1.05] max-w-[900px] mb-8"
            >
              {SLIDES[currentSlide].title}
            </motion.h1>

            <motion.p
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="text-xl md:text-2xl text-odysser-muted max-w-3xl leading-relaxed font-sans"
            >
              {SLIDES[currentSlide].description}
            </motion.p>

            {SLIDES[currentSlide].content && (
              <div className="w-full">
                {SLIDES[currentSlide].content}
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Navigation Controls */}
      <div className="mt-8 flex items-center gap-12 pb-8">
        <button
          onClick={() => paginate(-1)}
          disabled={currentSlide === 0}
          className={`group p-6 rounded-full bg-white shadow-[0_4px_20px_rgba(0,0,0,0.08)] border border-gray-100 transition-all duration-300 ${
            currentSlide === 0
              ? 'opacity-20 cursor-not-allowed'
              : 'hover:scale-110 active:scale-95 hover:shadow-xl'
          }`}
        >
          <ChevronLeft className="w-8 h-8 text-black group-hover:text-odysser-primary transition-colors" />
        </button>

        <button
          onClick={() => paginate(1)}
          disabled={currentSlide === SLIDES.length - 1}
          className={`group p-6 rounded-full bg-white shadow-[0_4px_20px_rgba(0,0,0,0.08)] border border-gray-100 transition-all duration-300 ${
            currentSlide === SLIDES.length - 1
              ? 'opacity-20 cursor-not-allowed'
              : 'hover:scale-110 active:scale-95 hover:shadow-xl'
          }`}
        >
          <ChevronRight className="w-8 h-8 text-black group-hover:text-odysser-primary transition-colors" />
        </button>
      </div>

      <style dangerouslySetInnerHTML={{__html: `
        body {
          background: radial-gradient(50% 50% at 50% 50%, rgba(255, 255, 255, 0.4) 0%, rgba(255, 255, 255, 1) 100%), #fafafb;
        }
      `}} />
    </div>
  );
}

export default App;
