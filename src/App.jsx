import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import './App.css'
import ChatWidget from './components/ChatWidget'

const services = [
  {
    title: 'Flatbed Towing / Rollback Tow Truck',
    desc: 'Safe transport for all vehicle types including cars, SUVs, and light-duty trucks.'
  },
  { title: 'Junk Car Removal', desc: 'We buy and tow away old, damaged, or unwanted cars for cash.' },
  { title: 'Accident Recovery', desc: 'Quick response for accident-damaged vehicles.' },
  { title: 'Emergency Roadside Assistance', desc: 'Lockouts, battery jumps, fuel delivery and more.' },
  { title: 'Flat Tire Change', desc: 'Tire replacement and inflation to get you back on the road.' },
  { title: 'Jump Start Service', desc: 'Fast on-site jump starts for dead batteries.' },
]

// gallery images available in public/images (expected to be PNGs)
const galleryImages = [
  '/images/Hero-Tow.png',
  '/images/roadside assistance.png',
  '/images/Jump start recovery.png',
  '/images/tire exchange.png',
  '/images/Junk car.png',
  '/images/Car Removals Service.png',
  '/images/accident recovery.png',
]

const faqs = [
  'Who to Call for 24 Hours Tow Truck Service for Help?',
  'Does Mr. Tow Offer Membership Free Towing Service?',
  'Can Mr. Tow Help Locate a Nearest Tow Truck Company?',
  'My Vehicle is New and Expensive — Who Can Help with Best Roadside Assistance?',
  'Can You Help With an Affordable Flatbed Tow Truck for My Car?',
]

function App() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [active, setActive] = useState('home')

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    onScroll()
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // scroll-spy: observe sections and mark active
  useEffect(() => {
    const ids = ['home', 'about', 'services', 'gallery', 'reviews', 'faq', 'contact']
    const observer = new IntersectionObserver(
      (entries) => {
        // choose the entry with the largest intersectionRatio (most visible)
        let best = entries[0]
        entries.forEach((entry) => {
          if ((entry.intersectionRatio || 0) > (best.intersectionRatio || 0)) {
            best = entry
          }
        })
        if (best && best.target && (best.intersectionRatio || 0) > 0) {
          setActive(best.target.id)
        }
      },
      { root: null, rootMargin: '-40% 0px -40% 0px', threshold: [0, 0.1, 0.25, 0.5, 0.75, 1] }
    )

    ids.forEach((id) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })

    return () => observer.disconnect()
  }, [])

  return (
    <div className="app-root">
      <header className={`topbar ${scrolled ? 'topbar-shadow' : ''}`}>
        <div className="brand logo">
          {/* logo placeholder - replace with an image at /public/images/logo.png or import into src/assets */}
          <img src="/images/logo.png" alt="Mr. Tow" onError={(e) => { e.target.style.opacity = 0; e.target.nextSibling.style.display = 'inline' }} />
          <span className="brand-text">Mr. Tow</span>
        </div>

        <nav className="nav-desktop">
          <a href="#home" className={active === 'home' ? 'active' : ''}>Home</a>
          <a href="#about" className={active === 'about' ? 'active' : ''}>About</a>
          <a href="#services" className={active === 'services' ? 'active' : ''}>Services</a>
          <a href="#gallery" className={active === 'gallery' ? 'active' : ''}>Gallery</a>
          <a href="#reviews" className={active === 'reviews' ? 'active' : ''}>Reviews</a>
          <a href="#faq" className={active === 'faq' ? 'active' : ''}>FAQ</a>
          <a href="#contact" className={active === 'contact' ? 'active' : ''}>Contact</a>
        </nav>

        <div className="header-actions">
          <a className="btn header-call" href="tel:+18043140091">Call Us</a>
        </div>

        <button className="mobile-toggle" aria-label="menu" onClick={() => setMobileOpen(v => !v)}>☰</button>

        <AnimatePresence>
          {mobileOpen && (
            <motion.nav
              key="mobile"
              className="nav-mobile"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
            >
              <a href="#home" onClick={() => setMobileOpen(false)}>Home</a>
              <a href="#about" onClick={() => setMobileOpen(false)}>About</a>
              <a href="#services" onClick={() => setMobileOpen(false)}>Services</a>
              <a href="#gallery" onClick={() => setMobileOpen(false)}>Gallery</a>
              <a href="#reviews" onClick={() => setMobileOpen(false)}>Reviews</a>
              <a href="#faq" onClick={() => setMobileOpen(false)}>FAQ</a>
              <a href="#contact" onClick={() => setMobileOpen(false)}>Contact</a>
              <a className="btn header-call mobile" href="tel:+18043140091">Call Us</a>
            </motion.nav>
          )}
        </AnimatePresence>
      </header>

      <motion.section
        id="home"
        className="hero full-hero"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <div className="hero-overlay" />
        <motion.div
          className="hero-inner"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          <h1 className="hero-title">TOWING SERVICE NEAR YOU — 24/7</h1>
          <p className="lead hero-lead">Fast, affordable, and professional towing with flatbed rollback trucks.</p>

          <div className="hero-cta">
            <motion.a href="tel:+18043140091" className="btn primary" whileHover={{ scale: 1.04 }}>
              Call Now: +1 804-314-0091
            </motion.a>
            <motion.a href="#services" className="btn outline" whileHover={{ scale: 1.04 }}>
              Explore Services
            </motion.a>
          </div>

          <motion.div className="hero-meta" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }}>
            <span>📍 901 E Laburnum Ave, Richmond, VA</span>
            <span>✉️ Icontradingsco@gmail.com</span>
          </motion.div>
        </motion.div>
      </motion.section>

      <main>
        <section id="services" className="services">
          <h2>Our Services</h2>
          <div className="grid">
            {services.map((s, i) => (
              <motion.article
                key={s.title}
                className="card service-card"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08 }}
                viewport={{ once: true }}
              >
                {/* show a small image for the first service as a demo */}
                {i === 0 && (
                  <img src="/images/service-1.svg" alt="service" style={{ width: '100%', borderRadius: '8px', marginBottom: '12px' }} />
                )}
                <h3>{s.title}</h3>
                <p>{s.desc}</p>
              </motion.article>
            ))}
          </div>
        </section>

        <section id="gallery" className="gallery">
          <h2>Gallery</h2>
          <div className="gallery-grid">
            {galleryImages.map((src, i) => (
              <div className="gallery-item" key={src}>
                <img src={src} alt={`gallery-${i}`} />
              </div>
            ))}
          </div>
        </section>

        <section id="about" className="about">
          <h2>About Mr. Tow</h2>
          <div className="about-inner">
            <p>Mr. Tow provides fast, friendly, and professional towing and roadside assistance across the Richmond metro area. Our flatbed rollback trucks protect your vehicle while transporting it safely.</p>
          </div>
        </section>

        <section id="reviews" className="reviews">
          <h2>Customer Reviews</h2>
          <div className="reviews-list">
            <div className="review">"Quick arrival and careful handling — five stars." — Sarah J.</div>
            <div className="review">"Affordable and professional service when I had a flat." — Mark T.</div>
          </div>
        </section>

        <section id="faq" className="faq">
          <h2>Frequently Asked Questions</h2>
          <div className="faq-list">
            {faqs.map((q, i) => (
              <motion.div
                key={q}
                className="faq-item"
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.06 }}
                viewport={{ once: true }}
              >
                <strong>Q:</strong> {q}
              </motion.div>
            ))}
          </div>
        </section>

        <section id="contact" className="contact">
          <h2>Contact Mr. Tow</h2>
          <div className="contact-grid">
            <div className="contact-card">
              <h3>Call Us</h3>
              <p><a href="tel:+18043140091">+1 804-314-0091</a></p>
            </div>
            <div className="contact-card">
              <h3>Email</h3>
              <p><a href="mailto:Icontradingsco@gmail.com">Icontradingsco@gmail.com</a></p>
            </div>
            <div className="contact-card">
              <h3>Address</h3>
              <p>901 E Laburnum Ave, Richmond, VA 23222</p>
            </div>
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="footer-inner">
          <p>© {new Date().getFullYear()} Mr. Tow Towing Service — Fast. Reliable. Local.</p>
          <p>
            Find us on <a href="https://facebook.com" target="_blank" rel="noreferrer">Facebook</a> |
            <a href="https://google.com" target="_blank" rel="noreferrer"> Google</a>
          </p>
        </div>
      </footer>
      <ChatWidget />
    </div>
  )
}

export default App
