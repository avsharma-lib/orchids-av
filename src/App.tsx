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
    description: `Artificial Intelligence is no longer a futuristic concept but a foundational pillar of modern enterprise. In the realm of management, AI serves as an augmented intelligence layer that enhances human decision-making by processing datasets too vast for the human mind to comprehend. For e-commerce, it is the engine of growth, driving everything from storefront optimization to warehouse automation. This presentation explores the symbiotic relationship between machine learning algorithms and business operations, demonstrating how the integration of AI leads to unprecedented levels of efficiency, cost reduction, and customer satisfaction.

The digital economy is evolving at a breakneck pace, and staying competitive requires more than just traditional strategies. By leveraging AI, businesses can gain deep insights into consumer behavior, optimize their supply chains in real-time, and provide personalized experiences that were previously impossible at scale. Throughout these fifteen slides, we will examine the transformative power of AI across various domains of management and e-commerce operations. From strategic planning to last-mile delivery, we will see how AI is not just changing the game, but rewriting the rules of engagement for the 21st-century enterprise.`,
    icon: <Globe className="w-16 h-16 text-odysser-primary" />,
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=1200",
    content: (
      <div className="mt-8 space-y-6">
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
              className="glass-card py-2 px-4 text-xs font-bold border-white/50 shadow-sm"
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
    description: `Traditional management often relied on 'gut feeling' and retrospective reporting, which can be slow and prone to human error. Strategic AI Management shifts this paradigm toward real-time, predictive insights. By utilizing neural networks and advanced data modeling, executives can simulate various business scenarios and predict market shifts before they occur. This allows for a proactive stance in competitive markets, where timing is often everything. AI systems can analyze global economic indicators, social media sentiment, and internal performance metrics simultaneously to suggest the most viable strategic paths for growth and sustainability.

Furthermore, AI helps in identifying hidden operational bottlenecks and suggesting resource reallocation strategies that maximize ROI. By automating the analysis of complex data streams, management can focus on high-level creative and ethical decision-making. This synergy between human intuition and machine precision ensures that the organization remains agile and resilient in an ever-changing global landscape. As AI continues to evolve, its role in strategic management will only deepen, providing even more sophisticated tools for risk assessment, long-term forecasting, and organizational optimization.`,
    icon: <Brain className="w-16 h-16 text-odysser-primary" />,
    image: "https://images.unsplash.com/photo-1551288049-bbbda536339a?auto=format&fit=crop&q=80&w=1200"
  },
  {
    id: 3,
    title: "Supply Chain Intelligence",
    description: `Supply chains are the lifeblood of e-commerce, and AI is rapidly becoming their central nervous system. Supply Chain Intelligence involves using predictive analytics to forecast demand with surgical precision, thereby minimizing the risks of both overstocking and stockouts. AI algorithms analyze historical sales data, seasonal trends, and even external factors like weather patterns or social media trends to optimize logistics. This high level of foresight allows companies to maintain leaner inventories while ensuring that products are always available when and where the customer needs them.

Beyond demand forecasting, AI enhances supply chain transparency through real-time tracking and automated risk assessment. If a major shipping route is blocked or a key supplier faces a delay, AI systems can automatically trigger alternative logistics plans to ensure business continuity. This level of optimization not only reduces operational costs but also significantly lowers the carbon footprint of the entire logistics network. By making supply chains more efficient and responsive, AI is helping e-commerce businesses build more sustainable and reliable foundations for global trade.`,
    icon: <Truck className="w-16 h-16 text-odysser-primary" />,
    image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&q=80&w=1200"
  },
  {
    id: 4,
    title: "Hyper-Personalization",
    description: `In the crowded e-commerce marketplace, relevance is the ultimate currency. Hyper-personalization goes beyond simple 'you might also like' widgets. It leverages deep learning to understand the unique psychological profile of every shopper, including their browsing speed, color preferences, and price sensitivity. AI creates a 'segment of one,' where every touchpoint—from email marketing to the homepage layout—is dynamically generated for the individual user in real-time. This level of tailored experience results in significantly higher conversion rates and fosters a deep, lasting sense of brand loyalty among consumers.

By predicting what a customer needs before they even search for it, AI-driven platforms provide a frictionless shopping experience that feels intuitive and personalized. This technology also allows for 'smart' content generation, where product descriptions and images can be adapted to match the specific interests and aesthetic tastes of each visitor. As hyper-personalization becomes the industry standard, e-commerce businesses that fail to adopt these AI-driven strategies risk being left behind in a sea of generic, uninspiring digital storefronts.`,
    icon: <Target className="w-16 h-16 text-odysser-primary" />,
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=1200"
  },
  {
    id: 5,
    title: "Cognitive Customer Service",
    description: `Modern customer service demands instant, accurate, and empathetic responses twenty-four hours a day. Cognitive Customer Service utilizes Natural Language Processing (NLP) and Large Language Models (LLMs) to provide virtual assistants that can do much more than just answer basic FAQs. These next-generation AI agents can process returns, track complex orders, and resolve billing disputes with remarkable accuracy. They can understand context, sentiment, and intent, allowing them to provide a level of service that was previously only possible through human interaction.

When a human agent is eventually required for more complex issues, AI provides them with a full context of the customer's history and suggests the best possible resolution path. This reduces 'average handle time' and significantly improves 'first contact resolution' rates. By automating routine inquiries and providing intelligent support to human staff, businesses can focus their talent on high-value interactions that require deep emotional intelligence and complex problem-solving. This balanced approach ensures that customer satisfaction remains high even as the volume of interactions grows.`,
    icon: <MessageSquare className="w-16 h-16 text-odysser-primary" />,
    image: "https://images.unsplash.com/photo-1521791136368-7d8b519539b0?auto=format&fit=crop&q=80&w=1200"
  },
  {
    id: 6,
    title: "Algorithmic Pricing",
    description: `Static pricing is rapidly becoming a relic of the past in the dynamic world of digital commerce. Algorithmic pricing, or dynamic pricing, allows e-commerce businesses to adjust their prices in milliseconds based on a vast multitude of variables. AI monitors competitor prices, real-time inventory levels, current market demand, and even specific user attributes to determine the optimal price point that maximizes either profit margin or total market share. This technology is particularly effective in high-velocity sectors where market conditions can fluctuate several times within a single day.

By using AI, businesses can capture additional revenue during peak demand periods while remaining competitive during slower intervals through automated, targeted discounts. This data-driven approach ensures that the business is always perfectly aligned with the market's willingness to pay at any given moment. Furthermore, algorithmic pricing can help in managing inventory cycles by adjusting prices to clear out old stock or promote new arrivals. It represents a level of financial precision and agility that is impossible to achieve through manual pricing strategies.`,
    icon: <TrendingUp className="w-16 h-16 text-odysser-primary" />,
    image: "https://images.unsplash.com/photo-1543286386-2e659306cd6c?auto=format&fit=crop&q=80&w=1200"
  },
  {
    id: 7,
    title: "AI-Enhanced Recruitment",
    description: `Human capital is any company's most valuable asset, and AI is completely revolutionizing how it is acquired and managed. AI-Enhanced Recruitment uses sophisticated algorithms to scan thousands of resumes, identifying the best-fit candidates based on skills, experience, and even cultural alignment, all while working to minimize unconscious human bias. This automation allows recruitment teams to focus on the human elements of the hiring process, such as conducting deep-dive interviews and building relationships with top-tier talent.

Beyond the initial hiring phase, AI plays a crucial role in talent management by analyzing employee engagement data and identifying patterns that often precede turnover. This allows HR managers to intervene early with personalized retention strategies and support. Furthermore, AI-driven learning and development platforms can recommend specific training modules to employees based on their unique career goals and performance gaps. By creating a more data-driven and personalized employee experience, AI is helping organizations build stronger, more committed teams that are better equipped for the challenges of the future.`,
    icon: <Users className="w-16 h-16 text-odysser-primary" />,
    image: "https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&q=80&w=1200"
  },
  {
    id: 8,
    title: "Automated Cybersecurity",
    description: `As the e-commerce sector continues to grow, so does the sophistication and frequency of cyber threats. Automated Cybersecurity uses advanced machine learning to establish a detailed baseline of 'normal' behavior for both users and internal systems. When an anomaly occurs—such as a login from an unusual location or a sudden, unexpected spike in data transfer—the AI system can take immediate, autonomous action to neutralize the threat before it can cause significant damage. This proactive defense is essential for protecting sensitive customer data and maintaining trust.

In the specific context of e-commerce, AI is particularly effective at detecting and preventing payment fraud. It analyzes hundreds of unique data points for every single transaction in real-time to identify fraudulent patterns that would be virtually impossible for human moderators to catch. This protects the business from direct financial loss and ensures that customers can shop with total confidence in the platform's security. By staying one step ahead of cybercriminals, AI-driven security systems are providing the essential foundation of trust upon which the entire digital economy is built.`,
    icon: <ShieldCheck className="w-16 h-16 text-odysser-primary" />,
    image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=1200"
  },
  {
    id: 9,
    title: "Optimized Last-Mile Logistics",
    description: `The 'last mile' is often cited as the most expensive and complex part of the entire e-commerce journey. AI optimizes this critical process by calculating the most efficient delivery routes, accounting for real-time traffic conditions, specific delivery windows, and vehicle capacity. This not only speeds up delivery times for the end customer but also significantly reduces fuel costs and vehicle wear and tear for the business. By making every delivery more efficient, AI is turning one of the biggest operational challenges into a competitive advantage.

Furthermore, AI is the driving force behind the integration of autonomous delivery robots and drones, which promise to further reduce costs and increase delivery density in crowded urban areas. By using predictive analytics, AI can also suggest the placement of 'micro-fulfillment' centers located directly in high-demand neighborhoods, ensuring that popular products are always just minutes away from the customer. These innovations are not only improving the customer experience but are also making e-commerce logistics more sustainable by reducing the total distance traveled by delivery vehicles.`,
    icon: <Zap className="w-16 h-16 text-odysser-primary" />,
    image: "https://images.unsplash.com/photo-1519003722824-192d992a6023?auto=format&fit=crop&q=80&w=1200"
  },
  {
    id: 10,
    title: "Smart Inventory Nodes",
    description: `Smart Inventory Nodes represent a fundamental shift from traditional centralized warehousing to a decentralized, highly intelligent network. AI analyzes regional demand patterns to decide exactly where inventory should be placed across a vast network of warehouses. In some advanced cases, AI can even trigger 'anticipatory shipping,' where products are moved toward a customer's location before they have even completed their purchase, based on their high statistical probability of buying. This drastically reduces total delivery times and minimizes the need for expensive air freight.

By keeping inventory moving and ensuring it is always in the right place at the right time, AI helps e-commerce businesses maintain lean operations while still meeting the high expectations of modern consumers. This intelligent distribution strategy also helps in reducing waste by ensuring that products aren't sitting idle in areas with low demand. As e-commerce continues to expand globally, the ability to manage inventory through these smart, AI-driven nodes will be a key factor in maintaining both profitability and customer satisfaction across different markets.`,
    icon: <ShoppingCart className="w-16 h-16 text-odysser-primary" />,
    image: "https://images.unsplash.com/photo-1553413077-190dd305871c?auto=format&fit=crop&q=80&w=1200"
  },
  {
    id: 11,
    title: "Predictive Ad Tech",
    description: `The world of digital advertising is becoming increasingly complex and expensive, making efficient ad spend more important than ever. Predictive Ad Tech uses AI to shift from broad-spectrum advertising to precision-targeted campaigns that deliver real results. By analyzing vast amounts of historical data and real-time signals, AI can predict the Customer Lifetime Value (CLV) of an individual user and determine exactly how much should be spent to acquire them. This ensures that marketing budgets are always used in the most effective way possible.

Algorithms automate the bidding process in real-time ad auctions, ensuring that ad spend is always allocated to the channels and audiences with the highest conversion potential. This results in a much higher return on ad spend (ROAS) and allows marketing teams to focus their energy on creative strategy and brand building rather than manual campaign adjustments. By making advertising more relevant to the consumer and more efficient for the business, predictive ad tech is creating a more sustainable and effective digital marketing ecosystem for e-commerce.`,
    icon: <BarChart3 className="w-16 h-16 text-odysser-primary" />,
    image: "https://images.unsplash.com/photo-1533750516457-a7f992034fce?auto=format&fit=crop&q=80&w=1200"
  },
  {
    id: 12,
    title: "Visual & Voice Commerce",
    description: `The way people discover and interact with products online is undergoing a massive transformation. Visual search allows customers to upload a photo of an item they like and find identical or similar products in an e-commerce catalog almost instantly. Similarly, voice commerce enables users to search for and purchase products using simple voice commands via smart speakers or mobile assistants. AI is the core technology behind both of these innovations, using advanced computer vision for visual search and natural language understanding (NLU) for voice interaction.

These technologies make commerce truly 'omnichannel' and frictionless, meeting the customer wherever they are and however they choose to express their shopping intent. By lowering the barrier to product discovery, visual and voice commerce are significantly broadening the top of the sales funnel and attracting new segments of consumers. As these technologies become more accurate and widely adopted, they will continue to redefine the shopping experience, making it more natural, accessible, and integrated into our daily lives.`,
    icon: <Search className="w-16 h-16 text-odysser-primary" />,
    image: "https://images.unsplash.com/photo-1550009158-9ebf69173e03?auto=format&fit=crop&q=80&w=1200"
  },
  {
    id: 13,
    title: "Industrial IoT & AI",
    description: `In the modern e-commerce warehouse, hardware and software are becoming inextricably linked. Industrial IoT (Internet of Things) devices collect data from every piece of equipment, and AI analyzes this data to enable 'predictive maintenance' on a massive scale. Instead of waiting for a conveyor belt or a robotic arm to break down, the AI identifies early signs of wear and schedules maintenance during off-peak hours. This proactive approach prevents costly unplanned downtime and significantly extends the lifespan of expensive warehouse machinery.

Furthermore, AI orchestrates the movements of autonomous mobile robots (AMRs) that navigate the warehouse floor, optimizing picking paths and ensuring that the entire operation runs at maximum efficiency twenty-four hours a day. This integration of AI and physical hardware allows for a level of speed and accuracy in order fulfillment that was once thought impossible. By automating the most labor-intensive parts of the warehouse journey, AI is helping e-commerce businesses scale their operations and meet the demands of an increasingly global customer base.`,
    icon: <Settings className="w-16 h-16 text-odysser-primary" />,
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=1200"
  },
  {
    id: 14,
    title: "Generative Operations",
    description: `Generative AI is the newest and perhaps most disruptive frontier in the world of e-commerce operations. It can automatically generate thousands of unique, SEO-optimized product descriptions in seconds, saving human copywriters hundreds of hours of repetitive work. Beyond just text, Generative AI can create high-quality product images and even personalized marketing videos based on simple text inputs. This allows e-commerce businesses to rapidly test different visual styles and marketing messages at a tiny fraction of the traditional cost and time.

In the realm of management, Generative AI acts as a powerful force multiplier for every employee. It can summarize long, complex reports, draft professional emails, and even write and debug code, allowing staff to focus on higher-level strategic work. This level of automation allows businesses to scale their creative and operational output exponentially without a linear increase in costs. As generative models continue to improve, their ability to create highly relevant and engaging content will become a key differentiator for successful e-commerce brands.`,
    icon: <Cpu className="w-16 h-16 text-odysser-primary" />,
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=1200"
  },
  {
    id: 15,
    title: "The Future of Digital Enterprise",
    description: `The integration of Artificial Intelligence into management and e-commerce is no longer just a luxury—it is a survival mandate in the competitive digital age. As we have seen throughout this presentation, AI provides the scale, speed, and precision that human teams alone simply cannot achieve. It transforms every aspect of the modern business, from the way executives plan for the long-term future to the way individual packages are delivered to the customer's doorstep. The future of enterprise is one where data and algorithms are just as important as brand and product.

The competitive edge in the coming years will belong to those who view AI not as a replacement for human talent, but as a powerful partner that amplifies human creativity and strategic vision. By embracing these technologies today, organizations can build the resilient, efficient, and deeply customer-centric enterprises that will define the global economy of tomorrow. The journey toward a fully AI-integrated business is complex, but the rewards—in terms of growth, innovation, and customer loyalty—are well worth the effort. The future is here, and it is powered by AI.`,
    icon: <Sparkles className="w-16 h-16 text-odysser-primary" />,
    image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&q=80&w=1200"
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
      {/* Background Abstract Glows */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden -z-10">
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
            className="w-full grid lg:grid-cols-2 gap-12 items-center"
          >
            {/* Left Side: Content */}
            <div className="flex flex-col items-center lg:items-start text-center lg:text-left h-full justify-center lg:pr-8">
              <motion.div
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="mb-6 p-4 glass-card inline-block border-white shadow-lg"
              >
                {SLIDES[currentSlide].icon}
              </motion.div>

              <motion.h1
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="text-3xl md:text-4xl lg:text-5xl font-display font-bold tracking-tight mb-6 leading-tight text-balance text-odysser-primary"
              >
                {SLIDES[currentSlide].title}
              </motion.h1>

              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="text-odysser-muted font-sans leading-relaxed space-y-4 max-h-[45vh] lg:max-h-[50vh] overflow-y-auto pr-4 custom-scrollbar"
              >
                {SLIDES[currentSlide].description.split('\n\n').map((para, i) => (
                  <p key={i} className="text-base md:text-lg text-balance font-medium opacity-80">
                    {para}
                  </p>
                ))}
              </motion.div>

              {SLIDES[currentSlide].content && (
                <div className="w-full mt-4">
                  {SLIDES[currentSlide].content}
                </div>
              )}
            </div>

            {/* Right Side: Image */}
            <motion.div
              initial={{ x: 40, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="relative aspect-[4/3] lg:aspect-square w-full rounded-3xl overflow-hidden shadow-2xl border-4 border-white"
            >
              <img
                src={SLIDES[currentSlide].image}
                alt={SLIDES[currentSlide].title}
                className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
            </motion.div>
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
