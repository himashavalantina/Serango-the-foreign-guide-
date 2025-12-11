import React from "react";
// Remove imports for ui/card since we are using plain divs with CSS
import { Shield, User, Globe } from "lucide-react";

// Assuming you have a component structure where RoleSelection.css is available
import "./RoleSelection.css";

// Update these paths as needed based on your project structure
import bgImage from "../../assets/img.png";
import logoImage from "../../assets/logo.png";

interface RoleSelectionProps {
  onNavigate: (page: string, role?: string) => void;
}

export function RoleSelection({ onNavigate }: RoleSelectionProps) {
  const roles = [
    {
      id: "tourist",
      title: "Tourist",
      description: "I'm a traveler looking to explore destinations",
      icon: User,
      color: "#F7A160",
    },
    {
      id: "guide",
      title: "Guide",
      description: "I'm a local guide offering tours and experiences",
      icon: Globe,
      color: "#F7DC79",
    },
    
  ];

  return (
    <div
      className="background-container"
      style={{
        backgroundImage: `url(${bgImage})`,
      }}
    >
      {/* Dark overlay to enhance the glass effect, using a specific class */}
      <div className="background-overlay"></div>

      {/* Main glass card container */}
      <div className="card-container">
        {/* Header */}
        <div className="header-text">
          <div className="flex justify-center">
            <img src={logoImage} alt="SeranGo" className="logo-img" />
          </div>
          <h1>AI-Powered Trip Planning Platform</h1>
          <p>Select your role to continue</p>
        </div>

        {/* Role Cards */}
        <div className="role-cards-grid">
          {roles.map((role) => {
            const Icon = role.icon;
            return (
              // Using a simple div with CSS class for card styling
              <div
                key={role.id}
                className="role-card"
                onClick={() => onNavigate("login", role.id)}
              >
                {/* CardHeader */}
                <div className="card-header">
                  <div
                    className="card-icon-wrapper"
                    style={{
                      // Setting the background color with 18% opacity for the icon wrapper
                      backgroundColor: role.color + "30",
                    }}
                  >
                    <Icon
                        className="w-8 h-8"
                        style={{ color: role.color }}
                    />
                  </div>
                  <h2 className="card-title">{role.title}</h2>
                </div>

                {/* CardContent */}
                <div className="card-content">
                  <p className="card-description">{role.description}</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer */}
        <div className="footer-text">
          <p>Trusted by thousands of travelers and guides worldwide</p>
        </div>
      </div>
    </div>
  );
}
