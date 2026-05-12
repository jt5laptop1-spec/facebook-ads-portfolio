/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion, AnimatePresence } from "motion/react";
import { 
  Facebook, 
  Youtube, 
  Instagram,
  Linkedin,
  MessageSquare, 
  Search, 
  TrendingUp, 
  Users, 
  Mail, 
  Phone, 
  CheckCircle2, 
  ArrowRight,
  ExternalLink,
  ChevronRight,
  ChevronDown,
  AlertCircle,
  Menu,
  X,
  Star,
  Zap,
  Globe,
  Smartphone,
  Minus,
  Send,
  MoreHorizontal,
  Image as ImageIcon,
  Smile,
  Mic,
  Camera,
  RotateCcw,
  Download
} from "lucide-react";
import React, { useState, useEffect } from "react";

// --- Types ---
interface Service {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
}

interface PortfolioItem {
  id: string;
  title: string;
  category: string;
  image: string;
  result: string;
}

interface Testimonial {
  id: string;
  name: string;
  role: string;
  image: string;
  review: string;
  rating: number;
}

interface Skill {
  name: string;
  percentage: number;
}

// --- Data ---
const SERVICES: Service[] = [
  {
    id: "fb-ads",
    title: "Facebook Ads",
    description: "Data-driven Meta Ads strategies to drive high-quality leads and sales for your business.",
    icon: <Facebook className="w-8 h-8 text-brand-blue" />
  },
  {
    id: "yt-seo",
    title: "YouTube SEO",
    description: "Rank higher on YouTube search with optimized titles, tags, descriptions, and thumbnails.",
    icon: <Youtube className="w-8 h-8 text-brand-blue" />
  },
  {
    id: "lead-gen",
    title: "Lead Generation",
    description: "Targeted campaigns to fill your pipeline with ready-to-buy prospects using laser-focused targeting.",
    icon: <Zap className="w-8 h-8 text-brand-blue" />
  },
  {
    id: "social-marketing",
    title: "Social Media Marketing",
    description: "Comprehensive management to grow your brand presence and engagement across all platforms.",
    icon: <Smartphone className="w-8 h-8 text-brand-blue" />
  }
];

const PORTFOLIO: PortfolioItem[] = [
  {
    id: "1",
    title: "E-commerce Growth",
    category: "Facebook Ads",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800",
    result: "4.5x ROAS"
  },
  {
    id: "2",
    title: "SaaS SEO Campaign",
    category: "YouTube SEO",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800",
    result: "100k+ Views"
  },
  {
    id: "3",
    title: "Local Business Leads",
    category: "Lead Generation",
    image: "https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&q=80&w=800",
    result: "500+ Qualified Leads"
  },
  {
    id: "4",
    title: "Brand Awareness",
    category: "Social Media",
    image: "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?auto=format&fit=crop&q=80&w=800",
    result: "250% Growth"
  }
];

const TESTIMONIALS: Testimonial[] = [
  {
    id: "1",
    name: "Alex Johnson",
    role: "CEO, TechBloom",
    image: "https://i.pravatar.cc/150?u=alex",
    review: "Junaid's Facebook Ads strategy transformed our business. We saw a massive jump in our ROI within the first month.",
    rating: 5
  },
  {
    id: "2",
    name: "Sarah Chen",
    role: "Marketing Director",
    image: "https://i.pravatar.cc/150?u=sarah",
    review: "Our YouTube channel reached 10k subscribers faster than expected thanks to his SEO expertise. Highly recommended!",
    rating: 5
  },
  {
    id: "3",
    name: "David Smith",
    role: "Founder, Peak Solutions",
    image: "https://i.pravatar.cc/150?u=david",
    review: "Professional, efficient, and results-driven. Junaid is our go-to for all things lead generation.",
    rating: 5
  }
];

const SKILLS: Skill[] = [
  { name: "Facebook Ads", percentage: 95 },
  { name: "YouTube SEO", percentage: 98 },
  { name: "Meta Ads", percentage: 92 },
  { name: "Marketing Strategy", percentage: 90 }
];

export default function App() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [chatMessage, setChatMessage] = useState("");
  const [messages, setMessages] = useState([
    { id: 1, text: "How can I help you today?", type: 'received', time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }
  ]);
  const [chatSize, setChatSize] = useState({ width: 350, height: 500 });
  const [isResizing, setIsResizing] = useState(false);
  const [submissionStatus, setSubmissionStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');

  useEffect(() => {
    const chatContainer = document.getElementById('chat-body');
    if (chatContainer) {
      chatContainer.scrollTop = chatContainer.scrollHeight;
    }
  }, [messages, isChatOpen]);

  const handleSendMessage = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!chatMessage.trim()) return;
    
    // Add user message locally
    const newUserMessage = {
      id: Date.now(),
      text: chatMessage,
      type: 'sent' as const,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    
    setMessages(prev => [...prev, newUserMessage]);
    const currentMsg = chatMessage;
    setChatMessage("");

    // Open WhatsApp directly with the message
    const encodedMessage = encodeURIComponent(currentMsg);
    window.open(`https://wa.me/8801324311078?text=${encodedMessage}`, "_blank");

    // Simulate Junaid's automatic acknowledgement
    setTimeout(() => {
      const response = {
        id: Date.now() + 1,
        text: "I've received your message on WhatsApp! I'll get back to you as soon as possible.",
        type: 'received' as const,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, response]);
    }, 1500);
  };

  const handleIconButtonClick = (iconName: string) => {
    const encodedMessage = encodeURIComponent(`Hi Junaid, I want to share a ${iconName.toLowerCase()} with you regarding my project.`);
    window.open(`https://wa.me/8801324311078?text=${encodedMessage}`, "_blank");
  };

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    
    // Simulate loading
    const timer = setTimeout(() => setIsLoading(false), 2000);
    
    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearTimeout(timer);
    };
  }, []);

  if (isLoading) {
    return (
      <div className="fixed inset-0 bg-brand-dark flex flex-col items-center justify-center z-[100]">
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="relative"
        >
          <div className="w-20 h-20 border-t-4 border-brand-blue rounded-full animate-spin"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-10 h-10 bg-brand-blue rounded-full blur-xl opacity-50"></div>
          </div>
        </motion.div>
        <motion.h2 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-8 font-display text-2xl font-bold tracking-widest text-gradient"
        >
          FREELANCER JUNAID
        </motion.h2>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen">
      {/* Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-brand-blue/10 blur-[120px] animate-blob"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-brand-neon/10 blur-[120px] animate-blob animation-delay-2000"></div>
        <div className="absolute top-[30%] left-[40%] w-[30%] h-[30%] rounded-full bg-blue-600/5 blur-[120px] animate-blob animation-delay-4000"></div>
      </div>

      {/* Navigation */}
      <nav 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled ? "bg-brand-dark/80 backdrop-blur-md border-b border-white/5 py-4" : "bg-transparent py-6"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-2 "
          >
            <div className="w-10 h-10 bg-brand-blue rounded flex items-center justify-center border border-white/10 shadow-[0_0_15px_rgba(0,210,255,0.4)]">
              <span className="font-display font-bold text-brand-dark text-xl leading-none">J</span>
            </div>
            <span className="font-display font-bold text-xl tracking-tight hidden sm:block">
              Freelancer <span className="text-brand-blue">Junaid</span>
            </span>
          </motion.div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8 text-sm font-medium uppercase tracking-widest text-white/70">
            {["Home", "About", "Services", "Portfolio", "Contact"].map((item) => (
              <a 
                key={item} 
                href={`#${item.toLowerCase()}`}
                className="hover:text-brand-blue transition-colors relative group"
              >
                {item}
                <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-brand-blue transition-all duration-300 group-hover:w-full"></span>
              </a>
            ))}
            <a href="#contact" className="btn-glow text-xs py-2 px-6">Hire Me</a>
          </div>

          {/* Mobile Menu Toggle */}
          <button 
            className="md:hidden text-white"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>

        {/* Mobile menu overlay */}
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="absolute top-full left-0 right-0 bg-brand-dark border-b border-white/10 p-6 flex flex-col gap-4 md:hidden"
          >
            {["Home", "About", "Services", "Portfolio", "Contact"].map((item) => (
              <a 
                key={item} 
                href={`#${item.toLowerCase()}`}
                className="text-lg font-medium hover:text-brand-blue"
                onClick={() => setMobileMenuOpen(false)}
              >
                {item}
              </a>
            ))}
            <a href="#contact" className="btn-glow w-full mt-4 text-center">Hire Me</a>
          </motion.div>
        )}
      </nav>

      {/* Hero Section */}
      <section id="home" className="pt-32 pb-20 px-6 max-w-7xl mx-auto min-h-screen flex flex-col lg:flex-row items-center justify-center gap-12">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="flex-1 text-center lg:text-left"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-6 text-brand-blue text-sm font-medium border-brand-blue/20">
            <Zap className="w-4 h-4 fill-brand-blue" />
            <span>Available for New Projects</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            Facebook Ads & <br />
            <span className="text-gradient">YouTube SEO</span> Expert
          </h1>
          <p className="text-lg text-white/60 mb-8 max-w-xl mx-auto lg:mx-0">
            I help businesses grow online with smart marketing strategies, data-driven ads, and search visibility that converts into revenue.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
            <a href="#portfolio" className="btn-glow flex items-center gap-2 group">
              View Portfolio
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>
            <a href="#contact" className="bg-white/5 hover:bg-white/10 border border-white/10 px-8 py-3 rounded-full font-bold transition-all text-center">
              Contact Me
            </a>
          </div>
          <div className="mt-12 flex items-center justify-center lg:justify-start gap-8 opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
            {/* Trusted platforms */}
            <div className="flex flex-col items-center">
              <span className="text-xs uppercase tracking-widest mb-2 font-bold">Fiverr</span>
              <div className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center">
                <CheckCircle2 className="w-4 h-4" />
              </div>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-xs uppercase tracking-widest mb-2 font-bold">Upwork</span>
              <div className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center">
                <CheckCircle2 className="w-4 h-4" />
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.8, x: 50 }}
          animate={{ opacity: 1, scale: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex-1 relative"
        >
          <div className="relative w-full aspect-square max-w-[500px] mx-auto">
            {/* Glowing orbs around image */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-brand-blue rounded-full blur-[80px] opacity-40 animate-pulse"></div>
            <div className="absolute bottom-10 left-0 w-32 h-32 bg-brand-neon rounded-full blur-[80px] opacity-40 animate-pulse animation-delay-2000"></div>
            
            {/* Main Image Container */}
            <div className="relative h-full w-full rounded-3xl overflow-hidden border-2 border-white/10 group shadow-[0_0_50px_rgba(0,210,255,0.2)]">
              <img 
                src="https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgreRp1K2yisbnR1-KfELJWNJvTWRdA8WGXYH6sN2zod5JvOccvjZPBIDuViufkXl_pwfWbmC6R7NGGBztFGrYSn1gbgRqIc4GL5nWdPJHxLa2StwJJVbjGBW-vKqK_6pUIKSexdh2V-OixvFhGqP6-2V1AMGishQbaVBaMEGrN7dUJbU3cbchs-DdCas-G/s320/ChatGPT%20Image%20May%203,%202026,%2004_31_08%20AM.png" 
                alt="Junaid Haque - Digital Marketer"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=800";
                }}
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/80 via-transparent to-transparent"></div>
              
              {/* Floating stats on image */}
              <div className="absolute bottom-6 left-6 right-6">
                <div className="glass p-4 rounded-2xl flex items-center justify-between">
                  <div className="text-center">
                    <p className="text-xl font-bold font-display text-brand-blue">150+</p>
                    <p className="text-[10px] uppercase tracking-tighter opacity-70">Happy Clients</p>
                  </div>
                  <div className="w-[1px] h-8 bg-white/10"></div>
                  <div className="text-center">
                    <p className="text-xl font-bold font-display text-brand-blue">500k+</p>
                    <p className="text-[10px] uppercase tracking-tighter opacity-70">Revent Generated</p>
                  </div>
                  <div className="w-[1px] h-8 bg-white/10"></div>
                  <div className="text-center">
                    <p className="text-xl font-bold font-display text-brand-blue">100%</p>
                    <p className="text-[10px] uppercase tracking-tighter opacity-70">Success Rate</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Decorative Elements */}
            <div className="absolute -top-6 -right-6 w-12 h-12 glass rounded-2xl flex items-center justify-center border-brand-blue animate-bounce">
              <TrendingUp className="text-brand-blue w-6 h-6" />
            </div>
            <div className="absolute -bottom-6 -left-6 w-12 h-12 glass rounded-2xl flex items-center justify-center border-brand-neon animate-bounce animation-delay-2000">
              <Youtube className="text-brand-neon w-6 h-6" />
            </div>
          </div>
        </motion.div>
      </section>

      {/* About Section */}
      <section id="about" className="py-24 px-6 bg-white/[0.02]">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              <div>
                <span className="text-brand-blue uppercase tracking-widest font-bold text-sm">About Me</span>
                <h2 className="text-4xl md:text-5xl font-bold mt-4">Transforming Brands with Strategy & Scale</h2>
              </div>
              <p className="text-lg text-white/70 leading-relaxed">
                I am Junaid Haque, a dedicated digital marketer specializing in high-converting Facebook Ads and YouTube SEO. With years of experience in lead generation and social media marketing, I've helped numerous businesses scale from zero to high-revenue enterprises.
              </p>
              <div className="grid grid-cols-2 gap-4">
                {[
                  "Facebook Ads Specialist",
                  "YouTube SEO Expert",
                  "Lead Gen Strategist",
                  "Performance Marketer"
                ].map((skill) => (
                  <div key={skill} className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-full bg-brand-blue/10 flex items-center justify-center">
                      <CheckCircle2 className="w-4 h-4 text-brand-blue" />
                    </div>
                    <span className="text-white/80 font-medium">{skill}</span>
                  </div>
                ))}
              </div>
              <div className="pt-6 border-t border-white/5 grid grid-cols-3 gap-8">
                <div>
                  <h4 className="text-3xl font-display font-bold text-white">250+</h4>
                  <p className="text-xs uppercase tracking-wide opacity-50 mt-1">Projects Done</p>
                </div>
                <div>
                  <h4 className="text-3xl font-display font-bold text-white">4.9/5</h4>
                  <p className="text-xs uppercase tracking-wide opacity-50 mt-1">Avg Rating</p>
                </div>
                <div>
                  <h4 className="text-3xl font-display font-bold text-white">6yrs+</h4>
                  <p className="text-xs uppercase tracking-wide opacity-50 mt-1">Experience</p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative p-8 rounded-3xl overflow-hidden glass"
            >
              <div className="absolute top-0 right-0 w-40 h-40 bg-brand-blue/10 blur-[80px]"></div>
              <h3 className="text-2xl font-bold mb-6">Professional Skills</h3>
              <div className="space-y-6">
                {SKILLS.map((skill) => (
                  <div key={skill.name}>
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-medium text-white/80">{skill.name}</span>
                      <span className="text-brand-blue font-bold">{skill.percentage}%</span>
                    </div>
                    <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden">
                      <motion.div 
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.percentage}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, ease: "easeOut" }}
                        className="h-full bg-gradient-to-r from-brand-blue to-brand-neon"
                      ></motion.div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-10 p-6 rounded-2xl bg-white/[0.03] border border-white/5">
                <blockquote className="italic text-white/60 mb-4">
                  "Junaid's approach to marketing is refreshing. He doesn't just run ads; he understands the psychology of the buyer."
                </blockquote>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full overflow-hidden">
                    <img src="https://i.pravatar.cc/100?img=12" alt="" className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <p className="text-sm font-bold">Johnathan Doe</p>
                    <p className="text-xs opacity-50">Global E-commerce</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-24 px-6">
        <div className="max-w-7xl mx-auto text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <span className="text-brand-blue uppercase tracking-widest font-bold text-sm">Services</span>
            <h2 className="text-4xl md:text-5xl font-bold mt-4">Premium Growth Solutions</h2>
            <p className="text-white/60 mt-4 max-w-2xl mx-auto">
              I provide end-to-end digital marketing services designed for high conversion and maximum visibility.
            </p>
          </motion.div>
        </div>

        <div className="max-w-7xl mx-auto grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {SERVICES.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="p-8 rounded-3xl glass-card flex flex-col h-full group"
            >
              <div className="w-16 h-16 rounded-2xl bg-brand-blue/10 flex items-center justify-center mb-6 border border-brand-blue/20 group-hover:bg-brand-blue group-hover:scale-110 transition-all duration-500">
                <div className="group-hover:text-brand-dark transition-colors duration-500">
                  {service.icon}
                </div>
              </div>
              <h3 className="text-xl font-bold mb-4">{service.title}</h3>
              <p className="text-sm text-white/60 leading-relaxed mb-6 flex-grow">
                {service.description}
              </p>
              <a href="#contact" className="inline-flex items-center gap-2 text-brand-blue text-sm font-bold group-hover:gap-3 transition-all">
                Learn More <ArrowRight className="w-4 h-4" />
              </a>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Portfolio Section */}
      <section id="portfolio" className="py-24 px-6 bg-white/[0.02]">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-end justify-between mb-16 gap-6">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <span className="text-brand-blue uppercase tracking-widest font-bold text-sm">Portfolio</span>
              <h2 className="text-4xl md:text-5xl font-bold mt-4">Proven Case Results</h2>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="flex gap-4"
            >
              <button className="text-brand-blue border-b-2 border-brand-blue pb-1 text-sm font-bold uppercase tracking-widest">All</button>
              <button className="text-white/40 hover:text-white pb-1 text-sm font-bold uppercase tracking-widest transition-colors">Facebook Ads</button>
              <button className="text-white/40 hover:text-white pb-1 text-sm font-bold uppercase tracking-widest transition-colors">SEO</button>
            </motion.div>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {PORTFOLIO.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group relative rounded-3xl overflow-hidden glass-card h-[400px]"
              >
                <img 
                  src={item.image} 
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/95 via-brand-dark/40 to-transparent flex flex-col justify-end p-8">
                  <div className="flex justify-between items-end">
                    <div>
                      <span className="text-brand-blue text-xs uppercase font-bold tracking-widest mb-2 block">{item.category}</span>
                      <h4 className="text-2xl font-bold group-hover:text-brand-blue transition-colors">{item.title}</h4>
                    </div>
                    <div className="bg-brand-blue text-brand-dark px-4 py-2 rounded-xl font-display font-black text-lg shadow-[0_0_15px_rgba(0,210,255,0.3)]">
                      {item.result}
                    </div>
                  </div>
                </div>
                <div className="absolute top-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity translate-y-4 group-hover:translate-y-0 transition-all">
                  <div className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center">
                    <ExternalLink className="w-5 h-5" />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="mt-16 text-center">
            <a href="#contact" className="btn-glow inline-block">View More Results</a>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-brand-blue uppercase tracking-widest font-bold text-sm">Testimonials</span>
            <h2 className="text-4xl md:text-5xl font-bold mt-4">What Clients Say</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {TESTIMONIALS.map((t, index) => (
              <motion.div
                key={t.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="p-8 rounded-3xl glass-card relative"
              >
                <div className="absolute top-6 right-8 opacity-10">
                  <MessageSquare className="w-12 h-12" />
                </div>
                <div className="flex gap-1 mb-6">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-brand-blue text-brand-blue" />
                  ))}
                </div>
                <p className="text-white/70 mb-8 italic leading-relaxed">"{t.review}"</p>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full overflow-hidden border border-brand-blue/30">
                    <img src={t.image} alt={t.name} className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <p className="font-bold">{t.name}</p>
                    <p className="text-xs opacity-50 uppercase tracking-widest">{t.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 px-6 relative overflow-hidden">
        {/* Glowing accents behind contact */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-brand-blue/5 blur-[150px] rounded-full pointer-events-none"></div>
        
        <div className="max-w-7xl mx-auto glass rounded-[40px] p-8 md:p-16 border-white/5 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16">
            <div>
              <span className="text-brand-blue uppercase tracking-widest font-bold text-sm">Contact Me</span>
              <h2 className="text-4xl md:text-5xl font-bold mt-4 leading-tight">Ready to Take Your Brand to the Next Level?</h2>
              <p className="text-white/60 mt-6 text-lg">
                Whether it's scaling your Facebook Ads or dominating YouTube search, let's discuss how we can grow your business together.
              </p>

              <div className="mt-12 space-y-6">
                <a href="mailto:junaid.haque505@gmail.com?subject=Business Inquiry from Portfolio" className="flex items-center gap-6 group hover:translate-x-2 transition-transform duration-300">
                  <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center border border-white/10 group-hover:border-brand-blue group-hover:bg-brand-blue/10 transition-all">
                    <Mail className="w-6 h-6 text-brand-blue" />
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-widest opacity-40">Email Me</p>
                    <p className="text-xl font-bold group-hover:text-brand-blue transition-colors">junaid.haque505@gmail.com</p>
                  </div>
                </a>
                <a href="https://wa.me/8801324311078" target="_blank" rel="noopener noreferrer" className="flex items-center gap-6 group hover:translate-x-2 transition-transform duration-300">
                  <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center border border-white/10 group-hover:border-brand-blue group-hover:bg-brand-blue/10 transition-all">
                    <Phone className="w-6 h-6 text-brand-blue" />
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-widest opacity-40">WhatsApp / Call</p>
                    <p className="text-xl font-bold group-hover:text-brand-blue transition-colors">+8801324311078</p>
                  </div>
                </a>
              </div>

              <div className="mt-12">
                <p className="text-sm font-bold uppercase tracking-widest mb-6 border-b border-white/10 pb-2">Find Me On Platforms</p>
                <div className="flex gap-4">
                  {[
                    { label: "Fiverr", icon: <CheckCircle2 className="w-5 h-5" /> },
                    { label: "Upwork", icon: <CheckCircle2 className="w-5 h-5" /> },
                    { label: "LinkedIn", icon: <Linkedin className="w-5 h-5" /> }
                  ].map((p) => (
                    <button key={p.label} className="bg-white/5 hover:bg-brand-blue hover:text-brand-dark px-6 py-2 rounded-xl text-sm font-bold transition-all border border-white/10 flex items-center gap-2">
                       {p.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="bg-white/[0.03] p-8 md:p-10 rounded-3xl border border-white/5">
              <form 
                className="space-y-6" 
                action="https://formspree.io/f/xkoyyjdq" 
                method="POST"
                onSubmit={async (e) => {
                  e.preventDefault();
                  setSubmissionStatus('sending');
                  const form = e.currentTarget;
                  const formData = new FormData(form);
                  
                  try {
                    const response = await window.fetch(form.action, {
                      method: form.method,
                      body: formData,
                      headers: {
                        'Accept': 'application/json'
                      }
                    });
                    
                    if (response.ok) {
                      setSubmissionStatus('success');
                      form.reset();
                      setTimeout(() => setSubmissionStatus('idle'), 5000);
                    } else {
                      setSubmissionStatus('error');
                    }
                  } catch (error) {
                    setSubmissionStatus('error');
                  }
                }}
              >
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs uppercase tracking-widest font-bold opacity-60">Full Name</label>
                    <input name="name" required type="text" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-brand-blue transition-all" placeholder="John Doe" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs uppercase tracking-widest font-bold opacity-60">Email Address</label>
                    <input name="email" required type="email" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-brand-blue transition-all" placeholder="john@example.com" />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-xs uppercase tracking-widest font-bold opacity-60">Interested Service</label>
                  <div className="relative">
                    <select name="service" className="w-full bg-white/10 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-brand-blue transition-all appearance-none text-white cursor-pointer hover:bg-white/15">
                      <option className="bg-brand-dark text-white">Facebook Ads</option>
                      <option className="bg-brand-dark text-white">YouTube SEO</option>
                      <option className="bg-brand-dark text-white">Lead Generation</option>
                      <option className="bg-brand-dark text-white">Other</option>
                    </select>
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none opacity-60">
                      <ChevronDown className="w-4 h-4 text-white" />
                    </div>
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-xs uppercase tracking-widest font-bold opacity-60">Project Details</label>
                  <textarea name="details" required rows={4} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-brand-blue transition-all" placeholder="Tell me about your business goals..."></textarea>
                </div>
                <button 
                  type="submit" 
                  disabled={submissionStatus === 'sending'}
                  className={`btn-glow w-full flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed transition-all`}
                >
                  {submissionStatus === 'sending' ? (
                    <>
                      <RotateCcw className="w-5 h-5 animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      Send Message <ArrowRight className="w-5 h-5" />
                    </>
                  )}
                </button>

                <AnimatePresence>
                  {submissionStatus === 'success' && (
                    <motion.div 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="p-4 rounded-xl bg-green-500/10 border border-green-500/20 text-green-400 flex items-center gap-3"
                    >
                      <CheckCircle2 className="w-5 h-5" />
                      <p className="text-sm font-medium">Your message was sent successfully! I will contact you shortly.</p>
                    </motion.div>
                  )}
                  {submissionStatus === 'error' && (
                    <motion.div 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 flex items-center gap-3"
                    >
                      <AlertCircle className="w-5 h-5" />
                      <p className="text-sm font-medium">Something went wrong. Please try again or contact me via WhatsApp.</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-white/5">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-brand-blue rounded flex items-center justify-center">
              <span className="font-display font-bold text-brand-dark text-lg">J</span>
            </div>
            <span className="font-display font-bold text-lg">
              Freelancer <span className="text-brand-blue">Junaid</span>
            </span>
          </div>

          <div className="flex gap-8 text-xs uppercase tracking-widest font-bold opacity-40">
            <p>Facebook Ads</p>
            <p>YouTube SEO</p>
            <p>Lead Gen</p>
          </div>

          <p className="text-sm opacity-40 text-center">
            Freelancer Junaid © 2026. Built with Passion & Growth Mindset.
          </p>

          <div className="flex gap-4 md:mr-24">
            <a href="https://www.facebook.com/freelancer.junaid1" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full glass flex items-center justify-center hover:text-brand-blue hover:scale-110 active:scale-95 transition-all duration-300" title="Follow on Facebook"><Facebook className="w-5 h-5" /></a>
            <a href="mailto:junaid.haque505@gmail.com?subject=Inquiry from Portfolio" className="w-10 h-10 rounded-full glass flex items-center justify-center hover:text-brand-blue hover:scale-110 active:scale-95 transition-all duration-300" title="Email Me: junaid.haque505@gmail.com"><Mail className="w-5 h-5" /></a>
            <a href="/blogger-template.xml" download="blogger-template.xml" className="flex items-center gap-2 px-4 h-10 rounded-full glass hover:text-brand-blue hover:scale-105 active:scale-95 transition-all duration-300 text-sm font-medium" title="Download Blogger XML Template">
              <Download className="w-4 h-4" />
              <span>Blogger XML</span>
            </a>
          </div>
        </div>
      </footer>

      {/* Floating Messenger & Chat Widget */}
      <div className="fixed bottom-6 right-6 z-[60]">
        <AnimatePresence>
          {isChatOpen && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20, transformOrigin: "bottom right" }}
              animate={{ opacity: 1, scale: 1, y: 0, width: chatSize.width, height: chatSize.height }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              style={{ width: chatSize.width, height: chatSize.height }}
              className="mb-4 glass rounded-[32px] shadow-2xl flex flex-col overflow-hidden border border-white/10 relative"
            >
              {/* Resize Handle (Top-Left) */}
              <div 
                className="absolute top-0 left-0 w-10 h-10 cursor-nwse-resize z-[70] flex items-start justify-start p-2 group/resize"
                onMouseDown={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setIsResizing(true);
                  const startX = e.clientX;
                  const startY = e.clientY;
                  const startWidth = chatSize.width;
                  const startHeight = chatSize.height;

                  const onMouseMove = (moveEvent: MouseEvent) => {
                    const dx = startX - moveEvent.clientX; 
                    const dy = startY - moveEvent.clientY; 
                    setChatSize({ 
                      width: Math.max(300, startWidth + dx), 
                      height: Math.max(400, startHeight + dy) 
                    });
                  };

                  const onMouseUp = () => {
                    setIsResizing(false);
                    document.removeEventListener('mousemove', onMouseMove);
                    document.removeEventListener('mouseup', onMouseUp);
                  };

                  document.addEventListener('mousemove', onMouseMove);
                  document.addEventListener('mouseup', onMouseUp);
                }}
              >
                <div className="w-3 h-3 border-t-2 border-l-2 border-brand-blue group-hover/resize:scale-125 transition-all"></div>
              </div>

              {/* Chat Header */}
              <div className="p-4 bg-brand-blue flex items-center justify-between shrink-0">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-white">
                      <img src="https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgreRp1K2yisbnR1-KfELJWNJvTWRdA8WGXYH6sN2zod5JvOccvjZPBIDuViufkXl_pwfWbmC6R7NGGBztFGrYSn1gbgRqIc4GL5nWdPJHxLa2StwJJVbjGBW-vKqK_6pUIKSexdh2V-OixvFhGqP6-2V1AMGishQbaVBaMEGrN7dUJbU3cbchs-DdCas-G/s320/ChatGPT%20Image%20May%203,%202026,%2004_31_08%20AM.png" 
                        onError={(e) => { (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=100"; }}
                        alt="Junaid" className="w-full h-full object-cover" />
                    </div>
                    <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 rounded-full border-2 border-brand-blue"></div>
                  </div>
                  <div>
                    <h4 className="text-brand-dark font-bold text-sm">Freelancer Junaid</h4>
                    <p className="text-[10px] text-brand-dark/70 font-medium">Active now</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-brand-dark">
                  <button onClick={() => handleIconButtonClick('Call')} className="hover:bg-brand-dark/10 p-1.5 rounded-full transition-colors"><Phone className="w-4 h-4" /></button>
                  <button onClick={() => setIsChatOpen(false)} className="hover:bg-brand-dark/10 p-1.5 rounded-full transition-colors"><Minus className="w-4 h-4" /></button>
                  <button onClick={() => setIsChatOpen(false)} className="hover:bg-brand-dark/10 p-1.5 rounded-full transition-colors"><X className="w-4 h-4" /></button>
                </div>
              </div>

              {/* Chat Body */}
              <div id="chat-body" className="flex-grow p-4 overflow-y-auto space-y-4 hide-scrollbar scroll-smooth">
                <div className="text-center py-4">
                  <div className="w-16 h-16 rounded-full overflow-hidden mx-auto mb-2 border-2 border-brand-blue/20">
                    <img src="https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgreRp1K2yisbnR1-KfELJWNJvTWRdA8WGXYH6sN2zod5JvOccvjZPBIDuViufkXl_pwfWbmC6R7NGGBztFGrYSn1gbgRqIc4GL5nWdPJHxLa2StwJJVbjGBW-vKqK_6pUIKSexdh2V-OixvFhGqP6-2V1AMGishQbaVBaMEGrN7dUJbU3cbchs-DdCas-G/s320/ChatGPT%20Image%20May%203,%202026,%2004_31_08%20AM.png" 
                      onError={(e) => { (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150"; }}
                      alt="Junaid" className="w-full h-full object-cover" />
                  </div>
                  <h5 className="font-bold text-sm">Junaid Haque</h5>
                  <p className="text-[10px] opacity-50 uppercase tracking-widest mt-1">Facebook Ads & SEO Expert</p>
                </div>

                <div className="flex flex-col gap-3">
                  {messages.map((msg) => (
                    <div 
                      key={msg.id} 
                      className={`max-w-[80%] ${msg.type === 'sent' ? 'self-end' : 'self-start'}`}
                    >
                      <div className={`p-3 text-sm shadow-sm ${
                        msg.type === 'sent' 
                          ? 'bg-brand-blue text-brand-dark rounded-2xl rounded-tr-none' 
                          : 'bg-white/10 text-white rounded-2xl rounded-tl-none border border-white/5 backdrop-blur-md'
                      }`}>
                        {msg.text}
                      </div>
                      <span className="text-[10px] opacity-40 mt-1 block px-1">
                        {msg.time} {msg.type === 'sent' && '• Sent'}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Chat Footer */}
              <div className="p-4 border-t border-white/5 bg-white/[0.02] shrink-0">
                <form onSubmit={handleSendMessage} className="flex flex-col gap-3">
                  <div className="flex items-center gap-3">
                    <button type="button" onClick={() => handleIconButtonClick('Menu')} className="text-brand-blue hover:scale-110 transition-transform"><MoreHorizontal className="w-5 h-5" /></button>
                    <button type="button" onClick={() => handleIconButtonClick('Camera')} className="text-brand-blue hover:scale-110 transition-transform"><Camera className="w-5 h-5" /></button>
                    <button type="button" onClick={() => handleIconButtonClick('Gallery')} className="text-brand-blue hover:scale-110 transition-transform"><ImageIcon className="w-5 h-5" /></button>
                    <button type="button" onClick={() => handleIconButtonClick('Voice')} className="text-brand-blue hover:scale-110 transition-transform"><Mic className="w-5 h-5" /></button>
                    
                    <div className="flex-grow relative">
                      <input 
                        type="text" 
                        value={chatMessage}
                        onChange={(e) => setChatMessage(e.target.value)}
                        placeholder="Type a message..."
                        className="w-full bg-white/5 border border-white/10 rounded-full py-2 px-4 pr-10 text-sm focus:outline-none focus:border-brand-blue transition-all"
                      />
                      <button type="button" onClick={() => handleIconButtonClick('Emoji')} className="absolute right-3 top-1/2 -translate-y-1/2 text-brand-blue"><Smile className="w-4 h-4" /></button>
                    </div>
                    
                    <button 
                      type="submit" 
                      className={`${chatMessage ? 'text-brand-blue translate-x-0' : 'text-white/20 translate-x-2 opacity-0'} transition-all duration-300`}
                    >
                      <Send className="w-5 h-5" />
                    </button>
                  </div>
                </form>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <motion.button 
          onClick={() => setIsChatOpen(!isChatOpen)}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className={`w-16 h-16 rounded-full flex items-center justify-center shadow-2xl transition-all duration-500 ${isChatOpen ? 'bg-brand-dark border-2 border-brand-blue rotate-90' : 'bg-[#25D366]'}`}
        >
          {isChatOpen ? <X className="w-8 h-8 text-brand-blue" /> : <MessageSquare className="w-8 h-8 fill-white text-white" />}
          
          {/* Unread badge */}
          {!isChatOpen && (
            <span className="absolute top-0 right-0 w-5 h-5 bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center">1</span>
          )}
        </motion.button>
      </div>
    </div>
  );
}
