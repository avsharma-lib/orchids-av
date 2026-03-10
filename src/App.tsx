import { useState, cloneElement } from 'react';
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
    description: `Artificial Intelligence is a foundational pillar of modern enterprise. In management, AI enhances decision-making by processing vast datasets beyond human capability. For e-commerce, it drives everything from storefront optimization to warehouse automation. This presentation explores how machine learning leads to unprecedented efficiency and customer satisfaction.

The digital economy requires more than traditional strategies. By leveraging AI, businesses gain deep insights into consumer behavior and optimize supply chains in real-time. We will examine the transformative power of AI across fifteen key domains, from strategic planning to last-mile delivery.`,
    icon: <Globe className="w-16 h-16 text-odysser-primary" />,
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=1200",
    insight: "AI is the central nervous system of modern digital commerce.",
    content: (
      <div className="mt-8 space-y-6">
        <div className="mt-8">
          <motion.h3
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="text-xs font-extrabold uppercase tracking-[0.3em] text-odysser-primary/60 mb-4"
          >
            Presented by
          </motion.h3>
          <div className="flex flex-col gap-y-1.5">
            {[
              "Aaryaveer sharma",
              "Aashi chaudhary",
              "Aayush balkishore",
              "Anjani gupta",
              "Anjali sahu",
              "Anshika sharma",
              "Anshu nirvan",
              "Anushka shrivas"
            ].map((name, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.7 + (i * 0.05) }}
                className="text-[13px] md:text-sm font-bold text-odysser-muted flex items-center gap-3"
              >
                <span className="text-odysser-primary/50 tabular-nums w-4">{i + 1}.</span>
                {name}
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    )
  },
  {
    id: 2,
    title: "Strategic AI Management",
    description: `Strategic AI Management shifts the paradigm from 'gut feeling' to real-time, predictive insights. By utilizing neural networks, executives can simulate business scenarios and predict market shifts before they occur. This proactive stance is vital in competitive markets where timing is everything.

AI identifies operational bottlenecks and suggests resource reallocation to maximize ROI. By automating complex data analysis, management can focus on creative and ethical decision-making, ensuring the organization remains agile and resilient.`,
    icon: <Brain className="w-16 h-16 text-odysser-primary" />,
    image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&q=80&w=800",
    insight: "Data-driven strategy replaces intuition with precision."
  },
  {
    id: 3,
    title: "Supply Chain Intelligence",
    description: `AI is the central nervous system of modern supply chains. Predictive analytics forecast demand with surgical precision, minimizing risks of overstocking or stockouts. Algorithms analyze historical sales and external factors like weather to optimize global logistics.

Real-time tracking and automated risk assessment enhance transparency. If a shipping route is blocked, AI triggers alternative plans instantly. This optimization reduces costs and lowers the carbon footprint of the entire logistics network.`,
    icon: <Truck className="w-16 h-16 text-odysser-primary" />,
    image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&q=80&w=1200",
    insight: "Predictive logistics ensures products are always where they need to be."
  },
  {
    id: 4,
    title: "Hyper-Personalization",
    description: `In e-commerce, relevance is currency. Hyper-personalization leverages deep learning to understand every shopper's unique profile—from browsing speed to price sensitivity. AI creates a 'segment of one,' dynamically generating every touchpoint in real-time.

By predicting needs before a search occurs, AI-driven platforms provide a frictionless experience. This technology fosters deep brand loyalty and significantly higher conversion rates by making every digital storefront feel uniquely tailored to the individual.`,
    icon: <Target className="w-16 h-16 text-odysser-primary" />,
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=1200",
    insight: "Moving from mass marketing to a 'segment of one' at scale."
  },
  {
    id: 5,
    title: "Cognitive Customer Service",
    description: `Modern service demands instant, empathetic responses. Cognitive Customer Service uses NLP and Large Language Models to provide assistants that process returns and resolve disputes with remarkable accuracy. They understand context and intent, providing human-like support.

When human intervention is needed, AI provides agents with full customer context and suggests the best resolution path. This reduces handle times and improves satisfaction, allowing talent to focus on high-value emotional interactions.`,
    icon: <MessageSquare className="w-16 h-16 text-odysser-primary" />,
    image: "https://images.unsplash.com/photo-1549923746-c502d488b3ea?auto=format&fit=crop&q=80&w=800",
    insight: "AI provides the scale of automation with the touch of empathy."
  },
  {
    id: 6,
    title: "Algorithmic Pricing",
    description: `Dynamic pricing is essential in the digital world. AI adjusts prices in milliseconds based on competitor data, inventory levels, and real-time demand. This ensures the optimal price point to maximize profit or market share.

Businesses capture additional revenue during peak periods and remain competitive during slow intervals through automated discounts. This data-driven approach perfectly aligns pricing with the market's willingness to pay at any given moment.`,
    icon: <TrendingUp className="w-16 h-16 text-odysser-primary" />,
    image: "https://images.unsplash.com/photo-1543286386-2e659306cd6c?auto=format&fit=crop&q=80&w=1200",
    insight: "Optimizing margins through real-time market responsiveness."
  },
  {
    id: 7,
    title: "AI-Enhanced Recruitment",
    description: `AI is revolutionizing human capital management. Algorithms scan thousands of resumes to identify best-fit candidates while minimizing unconscious bias. This allows recruitment teams to focus on relationship building and deep-dive interviews.

AI also plays a role in talent retention by analyzing engagement data to identify turnover patterns early. Personalized learning platforms recommend training based on career goals, creating a more data-driven and supportive employee experience.`,
    icon: <Users className="w-16 h-16 text-odysser-primary" />,
    image: "https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&q=80&w=1200",
    insight: "Finding and retaining the best talent through algorithmic insight."
  },
  {
    id: 8,
    title: "Automated Cybersecurity",
    description: `As e-commerce grows, so do cyber threats. AI establishes a baseline of 'normal' behavior and takes autonomous action to neutralize anomalies instantly. This proactive defense is essential for protecting sensitive customer data and brand trust.

In payment processing, AI analyzes hundreds of data points per transaction to detect fraud patterns invisible to humans. This protects the business from financial loss and ensures customers can shop with total confidence in the platform's security.`,
    icon: <ShieldCheck className="w-16 h-16 text-odysser-primary" />,
    image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=1200",
    insight: "Proactive, autonomous defense in an era of sophisticated threats."
  },
  {
    id: 9,
    title: "Optimized Last-Mile Logistics",
    description: `The 'last mile' is the most complex part of e-commerce. AI calculates efficient delivery routes by accounting for traffic, delivery windows, and vehicle capacity. This speeds up fulfillment while reducing fuel costs and vehicle wear.

AI also drives the integration of autonomous delivery robots and drones. Predictive analytics suggest the placement of 'micro-fulfillment' centers in high-demand neighborhoods, ensuring popular products are always just minutes away from the customer.`,
    icon: <Zap className="w-16 h-16 text-odysser-primary" />,
    image: "https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&q=80&w=800",
    insight: "Turning the most expensive logistics challenge into a competitive edge."
  },
  {
    id: 10,
    title: "Smart Inventory Nodes",
    description: `Smart Inventory Nodes represent a shift to decentralized, intelligent warehousing. AI analyzes regional demand to decide exactly where stock should be placed. Some systems even trigger 'anticipatory shipping' before a purchase is finalized.

By keeping inventory moving and in the right place, AI helps businesses maintain lean operations. This strategy reduces waste and ensures that popular products aren't sitting idle in low-demand areas, maximizing both speed and profitability.`,
    icon: <ShoppingCart className="w-16 h-16 text-odysser-primary" />,
    image: "https://images.unsplash.com/photo-1553413077-190dd305871c?auto=format&fit=crop&q=80&w=1200",
    insight: "Decentralized intelligence for faster, leaner inventory management."
  },
  {
    id: 11,
    title: "Predictive Ad Tech",
    description: `Predictive Ad Tech uses AI to shift from broad advertising to precision-targeted campaigns. By analyzing historical data, AI predicts the Customer Lifetime Value (CLV) and determines the exact spend needed for acquisition.

Algorithms automate bidding in real-time auctions, ensuring budget is allocated to channels with the highest conversion potential. This results in a higher return on ad spend (ROAS) and allows teams to focus on creative strategy.`,
    icon: <BarChart3 className="w-16 h-16 text-odysser-primary" />,
    image: "https://images.unsplash.com/photo-1534452203293-494d7ddbf7e0?auto=format&fit=crop&q=80&w=800",
    insight: "Maximizing marketing ROI through predictive acquisition models."
  },
  {
    id: 12,
    title: "Visual & Voice Commerce",
    description: `Discovery is being transformed by computer vision and natural language understanding. Visual search allows customers to find products via photos, while voice commerce enables purchases through simple commands to smart assistants.

These technologies make commerce truly 'omnichannel' and frictionless, meeting the customer wherever they are. By lowering barriers to discovery, they broaden the sales funnel and create a more natural, integrated shopping experience.`,
    icon: <Search className="w-16 h-16 text-odysser-primary" />,
    image: "https://images.unsplash.com/photo-1550009158-9ebf69173e03?auto=format&fit=crop&q=80&w=1200",
    insight: "Natural, frictionless interfaces for the next generation of shoppers."
  },
  {
    id: 13,
    title: "Industrial IoT & AI",
    description: `In modern warehouses, Industrial IoT devices collect data analyzed by AI for predictive maintenance. Instead of waiting for a breakdown, the AI identifies early wear signs and schedules repairs during off-peak hours, preventing costly downtime.

AI also orchestrates autonomous mobile robots (AMRs) to optimize picking paths. This integration of hardware and software allows for a level of speed and accuracy in fulfillment that was once thought impossible, helping businesses scale globally.`,
    icon: <Settings className="w-16 h-16 text-odysser-primary" />,
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=1200",
    insight: "The fusion of physical hardware and algorithmic optimization."
  },
  {
    id: 14,
    title: "Generative Operations",
    description: `Generative AI is a disruptive force in e-commerce. It automatically generates SEO-optimized product descriptions and high-quality images in seconds. This allows businesses to test marketing messages at a fraction of the traditional cost.

In management, Generative AI acts as a force multiplier by summarizing reports and drafting communications. This allows businesses to scale their creative output exponentially without a linear increase in overhead, redefining operational efficiency.`,
    icon: <Cpu className="w-16 h-16 text-odysser-primary" />,
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=1200",
    insight: "Scaling creativity and operations through generative models."
  },
  {
    id: 15,
    title: "The Future of Digital Enterprise",
    description: `AI integration is a survival mandate. It provides the scale and precision human teams alone cannot achieve, transforming everything from long-term planning to last-mile delivery. The future of enterprise is data-driven and algorithmic.

The competitive edge belongs to those who view AI as a partner that amplifies human creativity. By embracing these technologies, organizations can build the resilient, customer-centric enterprises that will define the global economy of tomorrow.`,
    icon: <Sparkles className="w-16 h-16 text-odysser-primary" />,
    image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&q=80&w=1200",
    insight: "Building the AI-powered enterprises of the future."
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
    <div className="min-h-screen bg-odysser-bg text-odysser-text flex flex-col items-center selection:bg-black selection:text-white overflow-x-hidden relative font-sans">
      {/* Background Abstract Glows & Pattern */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden -z-10">
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%230099ff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2v-4h4v-2h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2v-4h4v-2H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")` }} />
        <div className="absolute top-1/4 -left-20 w-[600px] h-[600px] bg-gradient-to-tr from-blue-100/40 to-transparent rounded-full blur-3xl opacity-60" />
        <div className="absolute bottom-1/3 -right-20 w-[500px] h-[500px] bg-gradient-to-bl from-gray-100/60 to-transparent rounded-full blur-3xl opacity-80" />
      </div>

      <main className="flex-1 w-full max-w-7xl px-6 py-12 md:py-16 flex flex-col items-center justify-center min-h-[90vh]">
        <AnimatePresence initial={false} custom={direction} mode="wait">
          <motion.div
            key={currentSlide}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: "spring", stiffness: 300, damping: 35 },
              opacity: { duration: 0.4 }
            }}
            className="w-full max-w-5xl mx-auto"
          >
            <div className="glass-card p-8 md:p-12 border-white/80 shadow-2xl relative overflow-hidden">
              {/* Background Icon Accent */}
              <div className="absolute -top-12 -right-12 opacity-[0.03] pointer-events-none">
                {SLIDES[currentSlide].icon}
              </div>

              <div className="flex flex-col gap-10">
                <header className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                  <div className="flex-1">
                    <motion.div
                      initial={{ x: -20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      className="flex items-center gap-4 mb-4"
                    >
                      <div className="p-2.5 glass-card border-white shadow-sm inline-block text-odysser-primary">
                        {cloneElement(SLIDES[currentSlide].icon as React.ReactElement<any>, { className: "w-8 h-8" })}
                      </div>
                      <div className="h-px flex-1 bg-gradient-to-r from-odysser-primary/20 to-transparent" />
                    </motion.div>

                    <motion.h1
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.1 }}
                      className="text-4xl md:text-5xl lg:text-6xl font-display font-bold tracking-tight leading-[1.1] text-balance text-odysser-primary"
                    >
                      {SLIDES[currentSlide].title}
                    </motion.h1>
                  </div>
                </header>

                <div className="grid md:grid-cols-12 gap-10 items-start">
                  <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="md:col-span-7 space-y-6"
                  >
                    <div className="text-odysser-muted font-sans leading-relaxed space-y-6 max-h-[40vh] overflow-y-auto pr-6 custom-scrollbar">
                      {SLIDES[currentSlide].description.split('\n\n').map((para, i) => (
                        <p key={i} className="text-xl md:text-2xl text-balance font-medium opacity-90 leading-snug">
                          {para}
                        </p>
                      ))}
                    </div>

                    {(SLIDES[currentSlide] as any).insight && (
                      <motion.div
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.4 }}
                        className="flex items-center gap-4 p-4 bg-odysser-primary/5 border-l-4 border-odysser-primary rounded-r-xl"
                      >
                        <Sparkles className="w-5 h-5 text-odysser-primary shrink-0" />
                        <span className="text-sm font-bold uppercase tracking-wider text-odysser-primary/80">
                          {(SLIDES[currentSlide] as any).insight}
                        </span>
                      </motion.div>
                    )}
                  </motion.div>

                  <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="md:col-span-5 space-y-6"
                  >
                    <div className="relative aspect-square rounded-2xl overflow-hidden shadow-xl border-2 border-white">
                      <img
                        src={SLIDES[currentSlide].image}
                        alt={SLIDES[currentSlide].title}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent pointer-events-none" />
                    </div>

                    {SLIDES[currentSlide].content && (
                      <div className="w-full">
                        {SLIDES[currentSlide].content}
                      </div>
                    )}
                  </motion.div>
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Navigation Controls */}
      <div className="fixed bottom-10 left-1/2 -translate-x-1/2 flex items-center gap-12 z-50">
        <button
          onClick={() => paginate(-1)}
          disabled={currentSlide === 0}
          className={`group w-16 h-16 rounded-full bg-white shadow-2xl flex items-center justify-center border border-gray-100 transition-all duration-500 ${
            currentSlide === 0
              ? 'opacity-20 cursor-not-allowed'
              : 'hover:scale-110 active:scale-90 hover:bg-odysser-primary hover:text-white'
          }`}
          aria-label="Previous slide"
        >
          <ChevronLeft className="w-7 h-7" />
        </button>

        <div className="text-[11px] font-extrabold text-odysser-primary uppercase tracking-[0.4em] bg-white/95 backdrop-blur-lg px-8 py-3.5 rounded-full shadow-xl border border-white/50 min-w-[180px] text-center">
          <span className="opacity-40 mr-2">SLIDE</span>
          {String(currentSlide + 1).padStart(2, '0')} / {SLIDES.length}
        </div>

        <button
          onClick={() => paginate(1)}
          disabled={currentSlide === SLIDES.length - 1}
          className={`group w-16 h-16 rounded-full bg-white shadow-2xl flex items-center justify-center border border-gray-100 transition-all duration-500 ${
            currentSlide === SLIDES.length - 1
              ? 'opacity-20 cursor-not-allowed'
              : 'hover:scale-110 active:scale-90 hover:bg-odysser-primary hover:text-white'
          }`}
          aria-label="Next slide"
        >
          <ChevronRight className="w-7 h-7" />
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
