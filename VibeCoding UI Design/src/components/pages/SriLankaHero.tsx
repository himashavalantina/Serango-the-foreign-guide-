import React, { useEffect, useRef } from "react";
import "./SriLankaHero.css";
import ellaImage from "../../assets/places/ella.png";
import beautyImage from "../../assets/places/beauty.jpg";
import beachImage from "../../assets/places/beach2.jpg";
import elephantImage from "../../assets/places/elephant.jpg";
import peacockImage from "../../assets/places/peacock.jpg";
import sigiriyaImage from "../../assets/places/sigiriya2.jpg";
import fishingImage from "../../assets/places/fishing.jpg";

const SriLankaHero: React.FC = () => {
  const sectionsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    // Simple fade-in animation for all sections
    const animateOnScroll = () => {
      const elements = document.querySelectorAll('.fade-in');
      
      elements.forEach((element) => {
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < window.innerHeight - elementVisible) {
          element.classList.add('visible');
        }
      });
    };

    // Run once on mount
    animateOnScroll();
    
    // Then run on scroll
    window.addEventListener('scroll', animateOnScroll);
    
    // Handle image loading states
    const images = document.querySelectorAll('.section-image');
    images.forEach(img => {
      const frame = img.closest('.image-frame');
      if (frame) {
        if (img.complete) {
          frame.classList.add('loaded');
        } else {
          img.addEventListener('load', () => {
            frame.classList.add('loaded');
          });
        }
      }
    });

    // Cleanup
    return () => window.removeEventListener('scroll', animateOnScroll);
  }, []);

  return (
    <>
      {/* HERO SECTION */}
      <section
        className="hero-section"
        style={{ backgroundImage: `url(${ellaImage})` }}
        ref={(el) => (sectionsRef.current[0] = el)}
      >
        <div className="hero-overlay" />
        <div className="hero-content">
          <h1 className="hero-title">Sri Lanka: The Pearl of the Indian Ocean</h1>
          <p className="hero-description">
            Discover an island paradise where ancient kingdoms whisper tales of grandeur,
            emerald tea plantations cascade over misty hills, and golden shores meet
            turquoise waters. Experience unforgettable wildlife encounters, vibrant cultures,
            and the warm hospitality that makes Sri Lanka truly resplendent.
          </p>
          <button className="cta-button">
            <span className="button-text">Begin Your Journey</span>
            <span className="button-icon">→</span>
          </button>
        </div>
        <div className="scroll-indicator">
          <div className="scroll-arrow"></div>
        </div>
      </section>

      {/* EXTENDED INFORMATION SECTION */}
      <section
        className="sri-lanka-info"
        ref={(el) => (sectionsRef.current[1] = el)}
      >
        <div className="info-header">
          <div className="header-decoration">
            <div className="decoration-line"></div>
            <div className="decoration-dot"></div>
            <div className="decoration-line"></div>
          </div>
          <h2>Discover the Magic of Sri Lanka</h2>
          <p className="info-subtitle">
            A tropical paradise blessed with diverse landscapes, rich heritage, and warm hospitality
          </p>
        </div>

        {/* CULTURAL HERITAGE */}
        <div className="info-section cultural-section fade-in" ref={el => sectionsRef.current[2] = el}>
          <div className="section-content">
            <div className="text-content">
              <div className="section-badge">Heritage</div>
              <h3>Ancient Cultural Heritage</h3>
              <p>
                Sri Lanka's history spans over 2,500 years, with magnificent ancient cities that showcase
                advanced hydraulic engineering and breathtaking architecture. The Cultural Triangle is home
                to eight UNESCO World Heritage Sites including the iconic Sigiriya Rock Fortress, sacred
                Temple of the Tooth in Kandy, and the ancient kingdoms of Anuradhapura and Polonnaruwa.
              </p>
              <ul className="feature-list">
                <li>
                  <span className="feature-icon">🏛️</span>
                  <span>8 UNESCO World Heritage Sites</span>
                </li>
                <li>
                  <span className="feature-icon">🕌</span>
                  <span>Multi-religious harmony</span>
                </li>
                <li>
                  <span className="feature-icon">🎭</span>
                  <span>Traditional dance & festivals</span>
                </li>
                <li>
                  <span className="feature-icon">🏺</span>
                  <span>2,500+ years of recorded history</span>
                </li>
              </ul>
            </div>
            <div className="image-content">
              <div className="image-frame loading">
                <img
                  src={sigiriyaImage}
                  alt="Sigiriya Rock Fortress"
                  className="section-image"
                  onLoad={(e) => e.currentTarget.closest('.image-frame')?.classList.add('loaded')}
                />
                <div className="image-overlay"></div>
              </div>
            </div>
          </div>
        </div>

        {/* NATURAL BEAUTY */}
        <div className="info-section nature-section fade-in" ref={el => sectionsRef.current[3] = el}>
          <div className="section-content reverse">
            <div className="text-content">
              <div className="section-badge">Nature</div>
              <h3>Breathtaking Natural Beauty</h3>
              <p>
                From misty highlands to golden beaches, Sri Lanka offers some of the world's most diverse
                landscapes in a compact island. The central highlands feature rolling tea plantations,
                dramatic waterfalls, and cool mountain climates, while the coastline boasts pristine beaches
                perfect for swimming, surfing, and whale watching.
              </p>
              <ul className="feature-list">
                <li>
                  <span className="feature-icon">🏔️</span>
                  <span>Central highlands & tea country</span>
                </li>
                <li>
                  <span className="feature-icon">🏖️</span>
                  <span>1,340 km of coastline</span>
                </li>
                <li>
                  <span className="feature-icon">🌊</span>
                  <span>Prime whale watching destinations</span>
                </li>
                <li>
                  <span className="feature-icon">🌿</span>
                  <span>Lush rainforests & waterfalls</span>
                </li>
              </ul>
            </div>
            <div className="image-content">
              <div className="image-frame loading">
                <img
                  src={beautyImage}
                  alt="Sri Lankan Landscape"
                  className="section-image"
                  onLoad={(e) => e.currentTarget.closest('.image-frame')?.classList.add('loaded')}
                />
                <div className="image-overlay"></div>
              </div>
            </div>
          </div>
        </div>

        {/* WILDLIFE */}
        <div className="info-section wildlife-section fade-in" ref={el => sectionsRef.current[5] = el}>
          <div className="section-content">
            <div className="text-content">
              <div className="section-badge">Wildlife</div>
              <h3>Incredible Wildlife Encounters</h3>
              <p>
                Sri Lanka is a biodiversity hotspot with 26 national parks and countless nature reserves.
                Witness majestic elephants gathering in large herds, elusive leopards in Yala National Park,
                and the spectacular gathering of blue whales and sperm whales off the southern coast.
              </p>
              <ul className="feature-list">
                <li>
                  <span className="feature-icon">🐘</span>
                  <span>Largest gathering of Asian elephants</span>
                </li>
                <li>
                  <span className="feature-icon">🐆</span>
                  <span>Highest density of leopards in the world</span>
                </li>
                <li>
                  <span className="feature-icon">🐋</span>
                  <span>Blue whale watching capital</span>
                </li>
                <li>
                  <span className="feature-icon">🦜</span>
                  <span>Over 400 bird species</span>
                </li>
              </ul>
            </div>
            <div className="image-content">
              <div className="image-frame loading">
                <img
                  src={elephantImage}
                  alt="Sri Lankan Elephant"
                  className="section-image"
                  onLoad={(e) => e.currentTarget.closest('.image-frame')?.classList.add('loaded')}
                />
                <div className="image-overlay"></div>
              </div>
            </div>
          </div>
        </div>

        {/* BEACHES & COASTLINE */}
        <div className="info-section beaches-section fade-in" ref={el => sectionsRef.current[6] = el}>
          <div className="section-content reverse">
            <div className="text-content">
              <div className="section-badge">Coast</div>
              <h3>Pristine Beaches & Coastal Wonders</h3>
              <p>
                With endless stretches of golden sand, turquoise waters, and vibrant coral reefs, Sri Lanka's
                coastline offers something for every beach lover. From the surfing paradise of Arugam Bay to
                the tranquil bays of Mirissa and the historic Galle Fort, each coastal region has its unique charm.
              </p>
              <ul className="feature-list">
                <li>
                  <span className="feature-icon">🏄</span>
                  <span>World-class surfing spots</span>
                </li>
                <li>
                  <span className="feature-icon">🤿</span>
                  <span>Vibrant coral reefs for snorkeling</span>
                </li>
                <li>
                  <span className="feature-icon">🏰</span>
                  <span>Historic coastal fortifications</span>
                </li>
                <li>
                  <span className="feature-icon">🌅</span>
                  <span>Breathtaking sunsets</span>
                </li>
              </ul>
            </div>
            <div className="image-content">
              <div className="image-frame loading">
                <img
                  src={beachImage}
                  alt="Sri Lankan Beach"
                  className="section-image"
                  onLoad={(e) => e.currentTarget.closest('.image-frame')?.classList.add('loaded')}
                />
                <div className="image-overlay"></div>
              </div>
            </div>
          </div>
        </div>

        {/* QUICK FACTS */}
        <div className="quick-facts fade-in" ref={el => sectionsRef.current[4] = el}>
          <div className="facts-background"></div>
          <h3>Quick Facts About Sri Lanka</h3>
          <div className="facts-grid">
            <div className="fact-card">
              <div className="fact-icon">🌡️</div>
              <h4>Perfect Climate</h4>
              <p>Year-round tropical weather with average temperatures of 27°C</p>
            </div>
            <div className="fact-card">
              <div className="fact-icon">🍛</div>
              <h4>Amazing Cuisine</h4>
              <p>Famous for spicy curries, fresh seafood, and exotic fruits</p>
            </div>
            <div className="fact-card">
              <div className="fact-icon">💰</div>
              <h4>Great Value</h4>
              <p>Affordable luxury and budget-friendly travel options</p>
            </div>
            <div className="fact-card">
              <div className="fact-icon">👨‍👩‍👧‍👦</div>
              <h4>Warm Hospitality</h4>
              <p>Known as one of the friendliest countries in the world</p>
            </div>
          </div>
        </div>

        {/* GALLERY SECTION */}
        <div className="gallery-section fade-in" ref={el => sectionsRef.current[7] = el}>
          <h3>Capturing Sri Lankan Moments</h3>
          <div className="gallery-grid">
            <div className="gallery-item large">
              <img src={fishingImage} alt="Traditional Fishing" />
              <div className="gallery-overlay">
                <span>Traditional Stilt Fishing</span>
              </div>
            </div>
            <div className="gallery-item">
              <img src={peacockImage} alt="Peacock" />
              <div className="gallery-overlay">
                <span>National Bird</span>
              </div>
            </div>
            <div className="gallery-item">
              <img src={beautyImage} alt="Hill Country" />
              <div className="gallery-overlay">
                <span>Misty Highlands</span>
              </div>
            </div>
          </div>
        </div>

        {/* CTA SECTION */}
        <div className="final-cta fade-in" ref={el => sectionsRef.current[8] = el}>
          <div className="cta-background"></div>
          <h3>Ready to Explore Sri Lanka?</h3>
          <p>Start planning your unforgettable journey to the Pearl of the Indian Ocean today</p>
          <button className="cta-button secondary">
            <span className="button-text">Plan Your Trip Now</span>
            <span className="button-icon">✈️</span>
          </button>
        </div>
      </section>
    </>
  );
};

export default SriLankaHero;