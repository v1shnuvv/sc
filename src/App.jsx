import React, { useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { Code2, Layers, Cloud, Menu, X, ArrowRight, Zap, Shield, Rocket, CheckCircle, Github, Linkedin, Mail } from 'lucide-react';

// Animation Variants
const fadeInUp = {
  hidden: { opacity: 0, y: 60 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" }
  }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { 
    opacity: 1, 
    scale: 1,
    transition: { duration: 0.5 }
  }
};

const StencilCodeAgency = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    projectType: '',
    message: ''
  });
  const [formStatus, setFormStatus] = useState({ submitted: false, error: false });

  const { scrollYProgress } = useScroll();
  const heroOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 0.2], [1, 0.95]);
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  // Track scroll position
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
      
      // Update active section
      const sections = ['hero', 'services', 'philosophy', 'contact'];
      const current = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });
      if (current) setActiveSection(current);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    setFormStatus({ submitted: true, error: false });
    setTimeout(() => {
      setFormData({ name: '', email: '', projectType: '', message: '' });
      setFormStatus({ submitted: false, error: false });
    }, 3000);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="bg-[#16232a] text-[#d0d0ce] min-h-screen font-sans overflow-x-hidden">
      {/* Scroll Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-[#fe5000] origin-left z-[60]"
        style={{ scaleX: smoothProgress }}
      />

      {/* Navigation */}
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={`fixed top-0 w-full z-50 transition-all duration-300 ${
          isScrolled ? 'bg-[#16232a]/95 backdrop-blur-lg shadow-lg shadow-[#fe5000]/5' : 'bg-[#16232a]/90 backdrop-blur-md'
        } border-b border-[#fe5000]/10`}
      >
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="flex items-center space-x-3"
          >
            <div className="w-10 h-10 bg-[#fe5000] rounded-lg flex items-center justify-center">
              <Code2 className="text-white" size={24} />
            </div>
            <div>
              <h1 className="text-white font-bold text-xl tracking-tight">Stencil Code</h1>
              <p className="text-[#fe5000] text-xs tracking-wide">Coding Dreams</p>
            </div>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-8">
            {['Services', 'Philosophy', 'Contact'].map((item) => (
              <motion.a
                key={item}
                href={`#${item.toLowerCase()}`}
                whileHover={{ color: '#fe5000', scale: 1.05 }}
                className={`text-[#d0d0ce] hover:text-[#fe5000] transition-colors cursor-pointer relative ${
                  activeSection === item.toLowerCase() ? 'text-[#fe5000]' : ''
                }`}
              >
                {item}
                {activeSection === item.toLowerCase() && (
                  <motion.div
                    layoutId="activeSection"
                    className="absolute -bottom-1 left-0 right-0 h-0.5 bg-[#fe5000]"
                  />
                )}
              </motion.a>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden text-[#d0d0ce] hover:text-[#fe5000]"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="md:hidden bg-[#1c2c35] border-t border-[#fe5000]/20"
          >
            {['Services', 'Philosophy', 'Contact'].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                onClick={() => setIsMenuOpen(false)}
                className="block px-6 py-3 text-[#d0d0ce] hover:text-[#fe5000] hover:bg-[#16232a] transition-colors"
              >
                {item}
              </a>
            ))}
          </motion.div>
        )}
      </motion.nav>

      {/* Hero Section */}
      <motion.section
        id="hero"
        style={{ opacity: heroOpacity, scale: heroScale }}
        className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20"
      >
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          {/* Grid Pattern */}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(254,80,0,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(254,80,0,0.03)_1px,transparent_1px)] bg-[size:50px_50px]" />
          
          <motion.div
            animate={{
              rotate: [0, 360],
              scale: [1, 1.2, 1],
            }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="absolute top-1/4 left-1/4 w-96 h-96 border-2 border-[#fe5000]/20 rounded-full blur-sm"
          />
          <motion.div
            animate={{
              rotate: [360, 0],
              scale: [1, 1.1, 1],
            }}
            transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
            className="absolute bottom-1/4 right-1/4 w-64 h-64 border-2 border-[#fe5000]/10 rounded-full blur-sm"
          />
          
          {/* Glowing Orbs */}
          <motion.div
            animate={{
              x: [0, 100, 0],
              y: [0, -50, 0],
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-1/3 right-1/4 w-32 h-32 bg-[#fe5000]/20 rounded-full blur-3xl"
          />
          <motion.div
            animate={{
              x: [0, -80, 0],
              y: [0, 60, 0],
              opacity: [0.2, 0.5, 0.2],
            }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
            className="absolute bottom-1/3 left-1/3 w-40 h-40 bg-[#fe5000]/15 rounded-full blur-3xl"
          />
          
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#fe5000] to-transparent shadow-lg shadow-[#fe5000]/50" />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
          >
            <motion.div variants={fadeInUp} className="mb-4 inline-flex items-center gap-2 bg-[#1c2c35] px-4 py-2 rounded-full border border-[#fe5000]/20">
              <div className="w-2 h-2 bg-[#fe5000] rounded-full animate-pulse" />
              <span className="text-sm text-[#d0d0ce]">Building the Future of Web</span>
            </motion.div>

            <motion.h1
              variants={fadeInUp}
              className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight"
            >
              We Stencil the Logic.
              <br />
              <span className="text-[#fe5000] bg-gradient-to-r from-[#fe5000] to-[#ff8040] bg-clip-text text-transparent">
                You Dream the Scale.
              </span>
            </motion.h1>

            <motion.p
              variants={fadeInUp}
              className="text-xl md:text-2xl text-[#d0d0ce] mb-10 max-w-3xl mx-auto"
            >
              Coding Dreams into high-performance reality.
            </motion.p>

            <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <motion.button
                whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(254, 80, 0, 0.5)" }}
                whileTap={{ scale: 0.95 }}
                onClick={() => document.getElementById('contact').scrollIntoView({ behavior: 'smooth' })}
                className="bg-[#fe5000] text-white px-8 py-4 rounded-lg font-semibold text-lg shadow-lg shadow-[#fe5000]/30 hover:shadow-[#fe5000]/50 transition-all flex items-center gap-2"
              >
                Start Your Project
                <ArrowRight size={20} />
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.05, borderColor: '#fe5000' }}
                whileTap={{ scale: 0.95 }}
                onClick={() => document.getElementById('services').scrollIntoView({ behavior: 'smooth' })}
                className="border-2 border-[#d0d0ce]/30 text-[#d0d0ce] px-8 py-4 rounded-lg font-semibold text-lg hover:border-[#fe5000] hover:text-[#fe5000] transition-all flex items-center gap-2"
              >
                Explore Services
              </motion.button>
            </motion.div>
          </motion.div>

          {/* Stats Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.8 }}
            className="mt-20 grid grid-cols-3 gap-8 max-w-3xl mx-auto"
          >
            {[
              { value: '50+', label: 'Projects Delivered' },
              { value: '99%', label: 'Client Satisfaction' },
              { value: '24/7', label: 'Support Available' }
            ].map((stat, i) => (
              <motion.div
                key={i}
                whileHover={{ scale: 1.05 }}
                className="text-center"
              >
                <div className="text-3xl md:text-4xl font-bold text-[#fe5000] mb-2">{stat.value}</div>
                <div className="text-sm text-[#d0d0ce]">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* Services Section */}
      <section id="services" className="py-32 px-6 bg-gradient-to-b from-[#16232a] via-[#1c2c35]/20 to-[#16232a]">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeInUp}
            className="text-center mb-20"
          >
            <motion.div className="inline-block mb-4">
              <span className="text-[#fe5000] text-sm font-semibold tracking-widest uppercase">What We Do</span>
            </motion.div>
            <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Our Services
            </h2>
            <p className="text-[#d0d0ce] text-lg md:text-xl max-w-3xl mx-auto">
              Precision-engineered solutions for the modern digital landscape
            </p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="grid md:grid-cols-3 gap-8"
          >
            {[
              {
                icon: <Layers className="text-[#fe5000]" size={40} />,
                title: 'Progressive Web Apps',
                description: 'Lightning-fast, offline-capable applications that blur the line between web and native experiences.',
                features: ['PWA Architecture', 'Service Workers', 'App Shell Model']
              },
              {
                icon: <Zap className="text-[#fe5000]" size={40} />,
                title: 'Enterprise Dashboards',
                description: 'Data-rich interfaces engineered for real-time insights and mission-critical decision-making.',
                features: ['Real-time Analytics', 'Custom Visualizations', 'Scalable Infrastructure']
              },
              {
                icon: <Cloud className="text-[#fe5000]" size={40} />,
                title: 'Cloud Architecture',
                description: 'Resilient, auto-scaling cloud systems built on modern infrastructure-as-code principles.',
                features: ['Microservices', 'CI/CD Pipelines', 'Multi-cloud Support']
              }
            ].map((service, index) => (
              <motion.div
                key={service.title}
                variants={fadeInUp}
                whileHover={{
                  y: -10,
                  boxShadow: "0 20px 60px rgba(254, 80, 0, 0.3)"
                }}
                className="bg-gradient-to-br from-[#1c2c35] to-[#16232a] p-8 rounded-2xl border border-[#fe5000]/0 hover:border-[#fe5000]/50 transition-all duration-500 group relative overflow-hidden"
              >
                {/* Card Background Glow */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#fe5000]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                <div className="relative z-10">
                  <motion.div
                    whileHover={{ rotate: 360, scale: 1.1 }}
                    transition={{ duration: 0.6 }}
                    className="mb-6 inline-flex p-4 bg-[#fe5000]/10 rounded-xl group-hover:bg-[#fe5000]/20 transition-colors"
                  >
                    {service.icon}
                  </motion.div>
                  
                  <h3 className="text-2xl md:text-3xl font-bold text-white mb-4 group-hover:text-[#fe5000] transition-colors">
                    {service.title}
                  </h3>
                  
                  <p className="text-[#d0d0ce] mb-6 leading-relaxed">
                    {service.description}
                  </p>
                  
                  <div className="space-y-3">
                    {service.features.map((feature, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1 + i * 0.1 }}
                        className="flex items-center text-[#d0d0ce] text-sm group/item"
                      >
                        <CheckCircle className="w-4 h-4 text-[#fe5000] mr-3 flex-shrink-0" />
                        <span className="group-hover/item:text-white transition-colors">{feature}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Tech Stack Section */}
      <section className="py-20 px-6 bg-[#1c2c35]/30">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="text-center mb-12"
          >
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
              Powered by Modern Technology
            </h3>
            <p className="text-[#d0d0ce]">We work with industry-leading tools and frameworks</p>
          </motion.div>
          
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6"
          >
            {['React', 'Node.js', 'TypeScript', 'AWS', 'Docker', 'PostgreSQL'].map((tech, i) => (
              <motion.div
                key={tech}
                variants={scaleIn}
                whileHover={{ scale: 1.1, y: -5 }}
                className="bg-[#16232a] p-6 rounded-lg border border-[#fe5000]/10 hover:border-[#fe5000]/50 transition-all text-center group"
              >
                <div className="text-[#d0d0ce] group-hover:text-[#fe5000] transition-colors font-semibold">
                  {tech}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Philosophy Section */}
      <section id="philosophy" className="py-32 px-6 relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0 bg-[linear-gradient(45deg,#fe5000_1px,transparent_1px),linear-gradient(-45deg,#fe5000_1px,transparent_1px)] bg-[size:20px_20px]" />
        </div>
        
        <div className="max-w-5xl mx-auto relative z-10">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
          >
            <motion.div variants={fadeInUp} className="text-center mb-16">
              <span className="text-[#fe5000] text-sm font-semibold tracking-widest uppercase mb-4 block">Our Approach</span>
              <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">
                Our Philosophy
              </h2>
              <p className="text-[#d0d0ce] text-lg max-w-2xl mx-auto">
                Every project is an opportunity to craft something exceptional
              </p>
            </motion.div>
            </motion.div>
            {[
              {
                text: 'Code is not just functional—it\'s an architectural statement of intent.',
                number: '01'
              },
              {
                text: 'Every line we write prioritizes performance, maintainability, and elegance.',
                number: '02'
              },
              {
                text: 'We believe in building systems that scale gracefully and fail gracefully.',
                number: '03'
              },
              {
                text: 'Clean code isn\'t just readable—it\'s a competitive advantage.',
                number: '04'
              }
            ].map((item, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                className="relative group"
              >
                <div className="flex items-start gap-6 bg-gradient-to-r from-[#1c2c35]/50 to-transparent p-8 rounded-2xl border-l-4 border-[#fe5000] hover:border-[#fe5000] hover:shadow-lg hover:shadow-[#fe5000]/10 transition-all duration-300">
                  <span className="text-5xl font-bold text-[#fe5000]/20 group-hover:text-[#fe5000]/40 transition-colors">
                    {item.number}
                  </span>
                  <p className="text-xl md:text-2xl text-[#d0d0ce] leading-relaxed flex-1 group-hover:text-white transition-colors">
                    {item.text}
                  </p>
                </div>
              </motion.div>
            ))}

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.8 }}
              className="mt-16 grid md:grid-cols-3 gap-8 text-center"
            >
              {[
                { icon: <Shield size={32} />, label: 'Security First' },
                { icon: <Rocket size={32} />, label: 'Performance Driven' },
                { icon: <Code2 size={32} />, label: 'Clean Architecture' }
              ].map((item, i) => (
                <motion.div
                  key={i}
                  whileHover={{ scale: 1.05 }}
                  className="flex flex-col items-center"
                >
                  <div className="text-[#fe5000] mb-3">{item.icon}</div>
                  <p className="text-white font-semibold">{item.label}</p>
                </motion.div>
              ))}
            </motion.div>
          {/* </motion.p> */}
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-32 px-6 relative overflow-hidden">
        {/* Background Gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#16232a] via-[#1c2c35] to-[#16232a]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(254,80,0,0.1),transparent_70%)]" />
        
        <div className="max-w-4xl mx-auto relative z-10">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            <motion.div variants={fadeInUp} className="text-center mb-16">
              <span className="text-[#fe5000] text-sm font-semibold tracking-widest uppercase mb-4 block">Get In Touch</span>
              <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">
                Let's Build Together
              </h2>
              <p className="text-[#d0d0ce] text-lg md:text-xl max-w-2xl mx-auto">
                Ready to transform your vision into reality? Let's start the conversation.
              </p>
            </motion.div>

          <motion.form
            variants={fadeInUp}
            onSubmit={handleSubmit}
            className="bg-gradient-to-br from-[#1c2c35] to-[#16232a] p-8 md:p-12 rounded-2xl border border-[#fe5000]/20 shadow-2xl relative overflow-hidden"
          >
            {/* Form Background Glow */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#fe5000]/10 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#fe5000]/5 rounded-full blur-3xl" />
            
            <div className="relative z-10 space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-white mb-3 font-semibold text-sm uppercase tracking-wide">Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    placeholder="John Doe"
                    className="w-full bg-[#16232a] text-white px-5 py-4 rounded-xl border-2 border-[#d0d0ce]/10 focus:border-[#fe5000] focus:outline-none focus:shadow-lg focus:shadow-[#fe5000]/20 transition-all placeholder-[#d0d0ce]/40"
                  />
                </div>

                <div>
                  <label className="block text-white mb-3 font-semibold text-sm uppercase tracking-wide">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="john@example.com"
                    className="w-full bg-[#16232a] text-white px-5 py-4 rounded-xl border-2 border-[#d0d0ce]/10 focus:border-[#fe5000] focus:outline-none focus:shadow-lg focus:shadow-[#fe5000]/20 transition-all placeholder-[#d0d0ce]/40"
                  />
                </div>
              </div>

              <div>
                <label className="block text-white mb-3 font-semibold text-sm uppercase tracking-wide">Project Type</label>
                <select
                  name="projectType"
                  value={formData.projectType}
                  onChange={handleChange}
                  required
                  className="w-full bg-[#16232a] text-white px-5 py-4 rounded-xl border-2 border-[#d0d0ce]/10 focus:border-[#fe5000] focus:outline-none focus:shadow-lg focus:shadow-[#fe5000]/20 transition-all"
                >
                  <option value="">Select a service</option>
                  <option value="pwa">Progressive Web App</option>
                  <option value="dashboard">Enterprise Dashboard</option>
                  <option value="cloud">Cloud Architecture</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div>
                <label className="block text-white mb-3 font-semibold text-sm uppercase tracking-wide">Message</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  placeholder="Tell us about your project vision..."
                  rows="6"
                  className="w-full bg-[#16232a] text-white px-5 py-4 rounded-xl border-2 border-[#d0d0ce]/10 focus:border-[#fe5000] focus:outline-none focus:shadow-lg focus:shadow-[#fe5000]/20 transition-all placeholder-[#d0d0ce]/40 resize-none"
                />
              </div>

              {formStatus.submitted && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-[#fe5000]/10 border border-[#fe5000] text-[#fe5000] px-6 py-4 rounded-xl flex items-center gap-3"
                >
                  <CheckCircle size={24} />
                  <span className="font-semibold">Thank you! We'll be in touch soon.</span>
                </motion.div>
              )}

              <motion.button
                type="submit"
                whileHover={{ scale: 1.02, boxShadow: "0 0 40px rgba(254, 80, 0, 0.6)" }}
                whileTap={{ scale: 0.98 }}
                disabled={formStatus.submitted}
                className="w-full bg-[#fe5000] text-white px-8 py-5 rounded-xl font-bold text-lg shadow-lg shadow-[#fe5000]/30 hover:shadow-[#fe5000]/60 transition-all flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {formStatus.submitted ? 'Submitted!' : 'Send Message'}
                <ArrowRight size={24} />
              </motion.button>
            </div>
          </motion.form>
        </motion.div>
      </div>
    </section>

      {/* Footer */}
      <footer className="border-t border-[#fe5000]/10 bg-[#1c2c35]/30 py-12 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            {/* Brand */}
            <div className="md:col-span-2">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-12 h-12 bg-[#fe5000] rounded-lg flex items-center justify-center">
                  <Code2 className="text-white" size={28} />
                </div>
                <div>
                  <h3 className="text-white font-bold text-2xl tracking-tight">Stencil Code</h3>
                  <p className="text-[#fe5000] text-sm tracking-wide">Coding Dreams</p>
                </div>
              </div>
              <p className="text-[#d0d0ce] mb-4 max-w-md">
                We transform complex challenges into elegant solutions, building the digital infrastructure that powers tomorrow's innovations.
              </p>
              <div className="flex gap-4">
                {[
                  { icon: <Github size={20} />, label: 'GitHub' },
                  { icon: <Linkedin size={20} />, label: 'LinkedIn' },
                  { icon: <Mail size={20} />, label: 'Email' }
                ].map((social, i) => (
                  <motion.a
                    key={i}
                    href="#"
                    whileHover={{ scale: 1.1, y: -2 }}
                    className="w-10 h-10 bg-[#16232a] hover:bg-[#fe5000] text-[#d0d0ce] hover:text-white rounded-lg flex items-center justify-center transition-all border border-[#fe5000]/10 hover:border-[#fe5000]"
                    aria-label={social.label}
                  >
                    {social.icon}
                  </motion.a>
                ))}
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-white font-semibold mb-4 text-lg">Quick Links</h4>
              <ul className="space-y-2">
                {['Services', 'Philosophy', 'Contact'].map((link) => (
                  <li key={link}>
                    <a
                      href={`#${link.toLowerCase()}`}
                      className="text-[#d0d0ce] hover:text-[#fe5000] transition-colors flex items-center gap-2 group"
                    >
                      <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <h4 className="text-white font-semibold mb-4 text-lg">Get Started</h4>
              <motion.a
                href="#contact"
                whileHover={{ scale: 1.05 }}
                className="inline-flex items-center gap-2 bg-[#fe5000] text-white px-6 py-3 rounded-lg font-semibold hover:shadow-lg hover:shadow-[#fe5000]/50 transition-all"
              >
                Start Project
                <ArrowRight size={18} />
              </motion.a>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="pt-8 border-t border-[#fe5000]/10 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-[#d0d0ce] text-sm">
              © 2025 Stencil Code. Coding Dreams into Reality.
            </p>
            <div className="flex gap-6 text-sm">
              <a href="#" className="text-[#d0d0ce] hover:text-[#fe5000] transition-colors">Privacy Policy</a>
              <a href="#" className="text-[#d0d0ce] hover:text-[#fe5000] transition-colors">Terms of Service</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default StencilCodeAgency;