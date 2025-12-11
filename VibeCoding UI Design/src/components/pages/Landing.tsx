import React, { useRef } from "react";
import "./Landing.css";
import byImage from "../../assets/by.jpg";
import logoImage from "../../assets/logo.png";

// Import fixed place images
import kandyImage from "../../assets/places/kandy.png";
import sigiriyaImage from "../../assets/places/sigiriya.png";
import galleImage from "../../assets/places/galle.png";
import ellaImage from "../../assets/places/ella.png";
import colomboImage from "../../assets/places/colombo.png";

interface LandingProps {
  onNavigate: (page: string, role?: string) => void;
}

export default function Landing({ onNavigate }: LandingProps) {
  const galleryRef = useRef<HTMLDivElement>(null);

  const scrollDistance = 280;
  const scrollLeft = () =>
      galleryRef.current?.scrollBy({ left: -scrollDistance, behavior: "smooth" });
  const scrollRight = () =>
      galleryRef.current?.scrollBy({ left: scrollDistance, behavior: "smooth" });

  const handleReadMore = () => {
    console.log("Navigating to Sri Lanka page");
    onNavigate("sri-lanka");
  };

  const places = [
    { name: "KANDY", desc: "Cultural Capital", image: kandyImage },
    { name: "SIGIRIYA", desc: "Ancient Rock Fortress", image: sigiriyaImage },
    { name: "GALLE", desc: "Historic Dutch Fort", image: galleImage },
    { name: "ELLA", desc: "Mountain Tea Trails", image: ellaImage },
    { name: "COLOMBO", desc: "Financial Hub", image: colomboImage },
  ];

  return (
      <div
          className="background-container"
          style={{ backgroundImage: `url(${byImage})` }}
      >
        <div className="card-container">
          <header className="header">
            <div className="menu-icon">☰ MENU</div>
            <div className="logo">GLOBAL TRAVEL</div>
            <div className="login-btn" onClick={() => onNavigate("role-selection")}>
              LOGIN
            </div>
          </header>

          <div className="main-content-wrapper">
            <div className="hero-section">
              <div className="page-indicator"></div>
              <div className="hero-content">
                <div className="title-logo-container">
                  <img src={logoImage} alt="Sri Lanka Logo" className="sri-lanka-logo" />
                  <h1>SRI LANKA</h1>
                </div>
                <p>
                  Experience the pearl of the Indian Ocean, a land rich in biodiversity, ancient history,
                  and vibrant culture. Discover beaches, mountains, and temples.
                </p>
                <button className="read-more-btn" onClick={handleReadMore}>
                  READ MORE
                </button>
              </div>
            </div>

            <div className="card-gallery-wrapper" ref={galleryRef}>
              {places.map((place, i) => (
                  <div className="gallery-card" key={i}>
                    <img src={place.image} alt={place.name} />
                    <div className="card-overlay-text">
                      {place.name} <small>{place.desc}</small>
                    </div>
                  </div>
              ))}
            </div>
          </div>

          <div className="scroll-controls">
            <div className="scroll-indicator-line"></div>
            <div className="control-arrow left" onClick={scrollLeft}>
              &lt;
            </div>
            <div className="control-arrow right" onClick={scrollRight}>
              &gt;
            </div>
          </div>
        </div>
      </div>
  );
}