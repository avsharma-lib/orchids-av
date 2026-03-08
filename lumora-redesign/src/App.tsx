import { useEffect, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { CheckCircle2, ArrowRight, Instagram, Linkedin, Twitter } from 'lucide-react';

function App() {
  const { scrollYProgress } = useScroll();
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -50]);

  const [isScrolled, setIsScrolled] = useState(false);

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
              <span className="text-white font-bold text-sm tracking-tighter">AS</span>
            </div>
            <span className="font-display font-bold text-lg tracking-tight">Aaryaveer Sharma</span>
          </div>

          <div className="hidden md:flex items-center gap-8 text-[15px] font-medium text-odysser-muted">
            <a href="#features" className="hover:text-black transition-colors">Expertise</a>
            <a href="#process" className="hover:text-black transition-colors">Services</a>
            <a href="#pricing" className="hover:text-black transition-colors">Pricing</a>
            <a href="#testimonials" className="hover:text-black transition-colors">Testimonials</a>
          </div>

          <div className="flex items-center gap-4">
            <a href="#pricing" className="hidden sm:block text-[15px] font-medium text-odysser-muted hover:text-black transition-colors">Contact</a>
            <a href="#pricing" className="btn-odysser px-5 py-2.5 text-[15px] group">
              Hire Me
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
              Available for freelance projects
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
            className="text-5xl md:text-7xl lg:text-8xl font-display font-bold tracking-[-0.03em] leading-[1.05] max-w-[1000px] mx-auto text-balance"
          >
            Building digital
            <br />
            <span className="text-odysser-primary">experiences</span> that perform.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
            className="mt-8 text-xl md:text-2xl text-odysser-muted max-w-3xl mx-auto leading-relaxed text-balance font-sans"
          >
            A passionate Full-Stack Developer specializing in React, Node.js, and modern web technologies. Bringing your ideas to life with clean, scalable code.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.4 }}
            className="mt-12 flex flex-col items-center justify-center gap-4"
          >
            <a href="#features" className="btn-odysser px-8 py-4 text-lg w-full sm:w-auto group">
              <span className="relative z-10 flex items-center gap-2">
                View My Work
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </span>
              <span className="absolute inset-0 shimmer-bg pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity"></span>
            </a>
            <p className="text-sm text-odysser-muted font-medium flex items-center gap-3">
              <span>Frontend</span>
              <span className="w-1 h-1 rounded-full bg-gray-300"></span>
              <span>Backend</span>
              <span className="w-1 h-1 rounded-full bg-gray-300"></span>
              <span>Full-Stack</span>
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

      {/* Marquee Section */}
      <section className="py-12 border-y border-gray-200 bg-white overflow-hidden flex flex-col">
        <div className="flex w-fit animate-[marquee_30s_linear_infinite]">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="flex gap-16 px-8 min-w-max items-center">
                {['React.js', 'TypeScript', 'Node.js', 'Next.js', 'Tailwind CSS', 'PostgreSQL'].map((text, j) => (
                  <span key={j} className="text-xl font-display font-medium text-odysser-muted whitespace-nowrap">
                    {text}
                  </span>
                ))}
              </div>
            ))}
        </div>
      </section>

      {/* The Fix Section */}
      <section id="features" className="py-32 px-6 relative">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="text-center mb-20"
          >
            <p className="font-handwriting text-3xl md:text-4xl text-odysser-primary mb-4 transform -rotate-2">My Expertise</p>
            <h2 className="text-4xl md:text-6xl font-display font-bold tracking-tight text-balance leading-tight">
              Full-Stack Development.<br/>
              <span className="text-odysser-muted">From concept to deployment.</span>
            </h2>
            <p className="mt-6 text-xl text-odysser-muted max-w-2xl mx-auto">
              I build fast, responsive, and scalable web applications. Whether it's a sleek frontend or a robust backend, I ensure high-quality code and seamless user experiences.
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
            {[
              { stat: '50+', label: 'Projects Completed' },
              { stat: '100%', label: 'Client Satisfaction' },
              { stat: '5+', label: 'Years Experience' },
              { stat: '24/7', label: 'Support & Maintenance' }
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="glass-card p-6 md:p-8 text-center border-t-4 border-t-odysser-primary hover:shadow-[0_20px_40px_rgba(0,0,0,0.08)] transition-shadow"
              >
                <div className="text-4xl md:text-5xl font-display font-bold text-black mb-2">{item.stat}</div>
                <div className="text-sm font-bold text-odysser-muted uppercase tracking-wider">{item.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Honest Question / Pain Points */}
      <section className="py-32 px-6 bg-odysser-surfaceLight relative overflow-hidden">
        <div className="max-w-4xl mx-auto">
          <div className="mb-16">
            <p className="font-handwriting text-3xl md:text-4xl text-odysser-primary mb-4">The reality</p>
            <h2 className="text-4xl md:text-5xl font-display font-bold tracking-tight mb-6">
              Is your website holding<br/>your business back?
            </h2>
            <p className="text-xl text-odysser-muted text-balance">
              In today's digital world, a slow, buggy, or outdated website costs you customers. You need a platform that works as hard as you do.
            </p>
          </div>

          <div className="space-y-4">
            {[
              "Your current website takes forever to load, frustrating users.",
              "Your platform isn't mobile-friendly, losing half your potential audience.",
              "You're dealing with spaghetti code that makes adding features a nightmare.",
              "You're losing conversions due to a poor user interface and experience."
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
              It's not just a design problem. It's an engineering problem.
            </p>
          </div>
        </div>
      </section>

      {/* Inside the sheet */}
      <section id="process" className="py-32 px-6 relative border-b border-gray-200">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-24">
            <p className="font-handwriting text-3xl md:text-4xl text-odysser-primary mb-4">My Services</p>
            <h2 className="text-4xl md:text-6xl font-display font-bold tracking-tight">
              End-to-end solutions.<br/>
              <span className="text-odysser-muted">Built for scale.</span>
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
                <h3 className="text-3xl font-bold mb-4 font-display">Frontend Development</h3>
                <p className="text-xl font-handwriting text-odysser-primary mb-4 transform -rotate-2">Building beautiful, interactive UIs.</p>
                <p className="text-lg text-odysser-muted mb-6">I create lightning-fast interfaces that users love. Utilizing modern frameworks to build performant and accessible frontend applications.</p>
                <ul className="space-y-3 font-bold text-gray-800 text-lg">
                  <li className="flex items-center gap-3"><CheckCircle2 className="w-5 h-5 text-odysser-primary" /> React & Next.js</li>
                  <li className="flex items-center gap-3"><CheckCircle2 className="w-5 h-5 text-odysser-primary" /> Tailwind CSS</li>
                  <li className="flex items-center gap-3"><CheckCircle2 className="w-5 h-5 text-odysser-primary" /> Responsive Design</li>
                  <li className="flex items-center gap-3"><CheckCircle2 className="w-5 h-5 text-odysser-primary" /> Web Performance Optimization</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-16 md:gap-24 mb-24 items-center">
            <div className="space-y-12">
              <div>
                <h3 className="text-3xl font-bold mb-4 font-display">Backend Development</h3>
                <p className="text-xl font-handwriting text-odysser-primary mb-4 transform -rotate-2">Robust APIs and architecture.</p>
                <p className="text-lg text-odysser-muted mb-6">Building secure, scalable, and reliable server-side systems capable of handling high traffic and complex logic.</p>
                <ul className="space-y-3 font-bold text-gray-800 text-lg">
                  <li className="flex items-center gap-3"><CheckCircle2 className="w-5 h-5 text-odysser-primary" /> Node.js & Express</li>
                  <li className="flex items-center gap-3"><CheckCircle2 className="w-5 h-5 text-odysser-primary" /> REST & GraphQL APIs</li>
                  <li className="flex items-center gap-3"><CheckCircle2 className="w-5 h-5 text-odysser-primary" /> Database Design (SQL/NoSQL)</li>
                  <li className="flex items-center gap-3"><CheckCircle2 className="w-5 h-5 text-odysser-primary" /> Secure Authentication</li>
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
                      <div className="bg-green-50 rounded-lg p-4 border border-green-100"><div className="text-sm text-green-700 font-medium mb-1">Uptime</div><div className="text-2xl font-bold">99.99%</div></div>
                      <div className="bg-orange-50 rounded-lg p-4 border border-orange-100"><div className="text-sm text-orange-700 font-medium mb-1">Latency</div><div className="text-2xl font-bold">~45ms</div></div>
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
                   {['Code', 'Build', 'Test', 'Deploy'].map((col, i) => (
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
                <h3 className="text-3xl font-bold mb-4 font-display">DevOps & Deployment</h3>
                <p className="text-xl font-handwriting text-odysser-primary mb-4 transform -rotate-2">Smooth delivery and scalable infra.</p>
                <p className="text-lg text-odysser-muted mb-6">Implementing modern deployment pipelines to ensure your code is shipped safely, quickly, and reliably to production.</p>
                <ul className="space-y-3 font-bold text-gray-800 text-lg">
                  <li className="flex items-center gap-3"><CheckCircle2 className="w-5 h-5 text-odysser-primary" /> CI/CD Pipelines</li>
                  <li className="flex items-center gap-3"><CheckCircle2 className="w-5 h-5 text-odysser-primary" /> AWS & Vercel</li>
                  <li className="flex items-center gap-3"><CheckCircle2 className="w-5 h-5 text-odysser-primary" /> Docker Containerization</li>
                  <li className="flex items-center gap-3"><CheckCircle2 className="w-5 h-5 text-odysser-primary" /> Monitoring & Maintenance</li>
                </ul>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <p className="font-handwriting text-3xl md:text-4xl text-odysser-primary mb-4">From satisfied clients</p>
            <h2 className="text-4xl md:text-5xl font-display font-bold tracking-tight">Hear from the people I've worked with.</h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { text: "Aaryaveer delivered our complex web app ahead of schedule. The code quality is exceptional.", author: "Sarah J.", role: "Startup Founder", rev: "Tech" },
              { text: "Transformed our outdated site into a lightning-fast modern platform. Highly recommended.", author: "Mark T.", role: "E-commerce Owner", rev: "Retail" },
              { text: "Incredible problem-solving skills and a deep understanding of React ecosystem.", author: "Emily R.", role: "Tech Lead", rev: "SaaS" },
              { text: "The backend architecture Aaryaveer built scaled flawlessly during our traffic spike.", author: "David K.", role: "CTO", rev: "Fintech" },
              { text: "Responsive, communicative, and technically brilliant. A true professional.", author: "Lisa M.", role: "Product Manager", rev: "Agency" },
              { text: "Best freelancer I've ever hired. He actually understands business needs, not just code.", author: "James H.", role: "Agency Director", rev: "Consulting" },
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

      {/* Pricing / Offer */}
      <section id="pricing" className="py-32 px-6 bg-[#f0ece7] border-y border-gray-200">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
             <p className="font-handwriting text-3xl md:text-4xl text-odysser-primary mb-4">Hire Me</p>
            <h2 className="text-4xl md:text-6xl font-display font-bold tracking-tight">Let's build something amazing.</h2>
          </div>

          <div className="glass-card overflow-hidden border-2 border-white shadow-[0_30px_60px_rgba(0,0,0,0.08)]">
            <div className="p-8 md:p-12">
              <div className="space-y-6 mb-12">
                {[
                  { title: "Custom Web Applications", desc: "Full-stack development tailored to your business needs", val: "High ROI" },
                  { title: "API Design & Integration", desc: "Connecting your services with robust backend architecture", val: "Scalable" },
                  { title: "Database Architecture", desc: "Optimized data storage solutions for fast retrieval", val: "Secure" },
                  { title: "Performance Optimization", desc: "Making your existing apps lightning fast", val: "Fast" },
                  { title: "Ongoing Support & Maintenance", desc: "Keeping your software updated and bug-free", val: "Reliable" },
                ].map((item, i) => (
                  <div key={i} className="flex items-start md:items-center justify-between gap-4 py-4 border-b border-gray-100 last:border-0">
                    <div className="flex items-start gap-4">
                      <div className="min-w-6 mt-1 md:mt-0 text-odysser-primary"><CheckCircle2 className="w-6 h-6" /></div>
                      <div>
                        <div className="font-bold text-lg">{item.title}</div>
                        <div className="text-odysser-muted text-sm md:text-base">{item.desc}</div>
                      </div>
                    </div>
                    <div className="text-odysser-muted font-medium hidden md:block">{item.val}</div>
                  </div>
                ))}
              </div>

              <div className="bg-gray-50 rounded-2xl p-8 border border-gray-200 text-center relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-odysser-primary to-transparent"></div>
                <div className="text-odysser-muted font-bold mb-2">Project-based pricing</div>
                <div className="text-sm font-bold uppercase tracking-widest text-odysser-primary mb-4">Starting at</div>
                <div className="text-6xl md:text-7xl font-display font-bold mb-8 text-black">$500</div>

                <button className="btn-odysser w-full md:w-auto px-12 py-5 text-xl group mb-4">
                  <span className="relative z-10 flex items-center justify-center gap-2">
                    Start a Project
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </span>
                  <span className="absolute inset-0 shimmer-bg pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity"></span>
                </button>
                <div className="text-sm text-odysser-muted font-bold flex flex-wrap items-center justify-center gap-x-4 gap-y-2">
                  <span>Transparent scoping</span>
                  <span className="hidden md:inline">•</span>
                  <span>Milestone-based payments</span>
                  <span className="hidden md:inline">•</span>
                  <span>Code ownership</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer CTA */}
      <section className="py-32 px-6 bg-odysser-surface text-white text-center relative overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-20" style={{ background: 'radial-gradient(circle at center, var(--color-odysser-primary) 0%, transparent 70%)' }}></div>
        <div className="max-w-3xl mx-auto relative z-10">
          <p className="font-handwriting text-3xl md:text-4xl text-blue-400 mb-4">Sooooooo....</p>
          <h2 className="text-5xl md:text-7xl font-display font-bold tracking-tight mb-8">
            Your business deserves<br/>exceptional engineering.
          </h2>
          <p className="text-xl text-gray-400 mb-12 max-w-2xl mx-auto font-medium">
            Stop worrying about technical debt and start focusing on growth. Let's build a product that scales with your ambition.
          </p>
          <div className="flex flex-col items-center gap-4">
            <button className="btn-odysser bg-white text-black px-10 py-5 text-lg group hover:bg-gray-50 w-full sm:w-auto shadow-none border-0">
              <span className="relative z-10 font-bold">Contact Me</span>
            </button>
            <div className="text-sm text-gray-400 font-bold flex flex-wrap items-center justify-center gap-x-4 gap-y-2">
              <span>Free Consultation</span>
              <span>•</span>
              <span>Technical Audit</span>
              <span>•</span>
              <span>Project Roadmap</span>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-gray-200">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 rounded bg-odysser-surface flex items-center justify-center">
              <span className="text-white font-bold text-sm tracking-tighter">AS</span>
            </div>
            <span className="font-display font-bold text-lg tracking-tight">Aaryaveer Sharma</span>
          </div>

          <div className="flex items-center gap-6">
            <a href="#" className="text-gray-400 hover:text-black transition-colors"><Twitter className="w-5 h-5" /></a>
            <a href="#" className="text-gray-400 hover:text-black transition-colors"><Linkedin className="w-5 h-5" /></a>
            <a href="#" className="text-gray-400 hover:text-black transition-colors"><Instagram className="w-5 h-5" /></a>
          </div>

          <div className="text-sm text-odysser-muted font-bold">
            © {new Date().getFullYear()} Aaryaveer Sharma. All rights reserved.
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
