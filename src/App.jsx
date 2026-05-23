import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, CodeXml, Menu, X } from 'lucide-react';
import './App.css';

const navItems = [
  { label: 'Services', href: '#services' },
  { label: 'How we work', href: '#how-we-work' },
  { label: 'Products', href: '#products' },
  { label: 'Contact', href: '#contact' },
];

const services = [
  {
    title: 'Full-Stack Web Development',
    description:
      "From concept to deployment, we build robust, scalable web applications tailored to your business needs. Whether it's a customer-facing product or an internal tool, we own the full stack.",
  },
  {
    title: 'AI & Machine Learning',
    description:
      'We design and integrate AI-powered systems that solve real business problems — from intelligent automation to predictive models and LLM-based applications.',
  },
  {
    title: 'Data Engineering',
    description:
      'We build the pipelines, platforms, and analytics layers that turn raw data into reliable business intelligence. Clean architecture, built to scale.',
  },
];

const steps = [
  {
    title: 'Understand first',
    description:
      'We start by deeply understanding your problem, goals, and constraints — before writing a single line of code.',
  },
  {
    title: 'Build with intention',
    description:
      "We architect and build solutions that fit the problem, not the other way around. Clean, scalable, and delivered in tight iterations so you're never in the dark.",
  },
  {
    title: 'Deliver and support',
    description:
      "We don't disappear after launch. We make sure what we build actually works in the real world.",
  },
];

const products = [
  {
    name: 'FindKlub',
    tagline: 'Discover experiences worth having',
    description:
      'FindKlub is an online platform for discovering and exploring experiences — from events and activities to travel packages. Built for curious people who want more from their time.',
  },
  {
    name: 'Narratiq',
    tagline: 'Let your data tell the story',
    description:
      'Narratiq is a generative business intelligence platform that makes data accessible to everyone in your organization — not just analysts. Ask questions in plain language, get answers that matter.',
  },
  {
    name: 'WhatsApp E-commerce Agent',
    tagline: 'Commerce, automated for WhatsApp',
    description:
      'A plug-and-play commerce automation solution for businesses already on WhatsApp. Manage orders, handle queries, and drive sales — without leaving the conversation.',
  },
];

const fadeIn = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: 'easeOut' },
  },
};

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const closeMenu = () => setIsMenuOpen(false);
  const Brand = () => (
    <>
      <span className="brand__mark" aria-hidden="true">
        <CodeXml size={24} />
      </span>
      <span className="brand__text">
        <span className="brand__name">Stencil Code</span>
        <span className="brand__tagline">Coding Dreams</span>
      </span>
    </>
  );

  return (
    <div className="site-shell">
      <header className={`site-header ${isScrolled ? 'site-header--scrolled' : ''}`}>
        <a className="brand" href="#hero" aria-label="StencilCode home" onClick={closeMenu}>
          <Brand />
        </a>

        <nav className="desktop-nav" aria-label="Primary navigation">
          {navItems.map((item) => (
            <a key={item.href} href={item.href}>
              {item.label}
            </a>
          ))}
        </nav>

        <button
          className="menu-button"
          type="button"
          aria-label={isMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
          aria-expanded={isMenuOpen}
          onClick={() => setIsMenuOpen((open) => !open)}
        >
          {isMenuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>

        <div className={`mobile-nav ${isMenuOpen ? 'mobile-nav--open' : ''}`}>
          {navItems.map((item) => (
            <a key={item.href} href={item.href} onClick={closeMenu}>
              {item.label}
            </a>
          ))}
        </div>
      </header>

      <main>
        <section className="hero section-pad" id="hero">
          <motion.div className="hero__content" initial="hidden" animate="visible" variants={fadeIn}>
            <h1>We engineer solutions. Thoughtfully.</h1>
            <p className="hero__subheading">
              StencilCode is a full-stack software development company. We design, build, and ship web
              applications, AI-powered systems, and data platforms for businesses that need it done right.
            </p>
            <a className="button button--primary" href="mailto:connect@stencilcode.tech">
              Let's talk about your project
              <ArrowRight size={18} />
            </a>
          </motion.div>
        </section>

        <section className="section-pad" id="services">
          <div className="section-heading">
            <p className="eyebrow">What we build</p>
            <h2>Services</h2>
          </div>
          <div className="card-grid card-grid--three">
            {services.map((service) => (
              <motion.article
                className="service-card"
                key={service.title}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.25 }}
                variants={fadeIn}
              >
                <h3>{service.title}</h3>
                <p>{service.description}</p>
              </motion.article>
            ))}
          </div>
        </section>

        <section className="section-pad work-section" id="how-we-work">
          <div className="section-heading section-heading--left">
            <p className="eyebrow">How we work</p>
            <h2>A clear path from problem to product.</h2>
          </div>
          <div className="work-steps">
            {steps.map((step, index) => (
              <motion.article
                className="work-step"
                key={step.title}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.35 }}
                variants={fadeIn}
              >
                <span className="work-step__number">{index + 1}</span>
                <div>
                  <h3>{step.title}</h3>
                  <p>{step.description}</p>
                </div>
              </motion.article>
            ))}
          </div>
        </section>

        <section className="section-pad products-section" id="products">
          <div className="section-heading">
            <p className="eyebrow">What we're building</p>
            <h2>Products</h2>
            <p>
              Alongside our client work, we build our own products. These are real problems we've
              identified and are solving — a reflection of how we think and what we're capable of.
            </p>
          </div>
          <div className="card-grid card-grid--three">
            {products.map((product) => (
              <motion.article
                className="product-card"
                key={product.name}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.25 }}
                variants={fadeIn}
              >
                <div>
                  <h3>{product.name}</h3>
                  <p className="product-card__tagline">{product.tagline}</p>
                </div>
                <p>{product.description}</p>
                <span className="status-badge">In development</span>
              </motion.article>
            ))}
          </div>
        </section>

        <section className="section-pad why-section" id="why-stencilcode">
          <motion.div
            className="why-section__content"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.35 }}
            variants={fadeIn}
          >
            <p className="eyebrow">Why StencilCode</p>
            <p>
              We are builders at heart. The same team that works on your project is actively building
              its own products — which means we bring product thinking, ownership, and craft to every
              engagement. We care deeply about understanding the right problem, writing clean code, and
              delivering software that stands the test of time.
            </p>
          </motion.div>
        </section>

        <section className="section-pad contact-section" id="contact">
          <motion.div
            className="contact-section__content"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.35 }}
            variants={fadeIn}
          >
            <p className="eyebrow">Let's build something together</p>
            <h2>Let's build something together</h2>
            <p>
              Have a project in mind? We'd love to hear about it. Reach out and let's start a
              conversation.
            </p>
            <a className="button button--primary" href="mailto:connect@stencilcode.tech">
              Get in touch
              <ArrowRight size={18} />
            </a>
          </motion.div>
        </section>
      </main>

      <footer className="site-footer">
        <a className="brand" href="#hero" aria-label="StencilCode home">
          <Brand />
        </a>
        <p>© 2026 StencilCode. Software engineered thoughtfully.</p>
      </footer>
    </div>
  );
}

export default App;
