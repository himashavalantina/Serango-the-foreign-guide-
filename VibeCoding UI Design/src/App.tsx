import { useState } from "react";
import { Navigation } from "./components/shared/Navigation";
import { RoleSelection } from "./components/pages/RoleSelection";
import { LoginPage } from "./components/pages/LoginPage";
import { SignupPage } from "./components/pages/SignupPage";
import { LandingPage } from "./components/pages/LandingPage";
import { PlannerForm } from "./components/pages/PlannerForm";
import { ItineraryPreview } from "./components/pages/ItineraryPreview";
import { ItineraryEditor } from "./components/pages/ItineraryEditor";
import { GuideMarketplace } from "./components/pages/GuideMarketplace";
import { ChatPage } from "./components/pages/ChatPage";
import { NotificationCenter } from "./components/pages/NotificationCenter";
import { Dashboard } from "./components/pages/Dashboard";
import { QRVerification } from "./components/pages/QRVerification";
import { ReviewsGallery } from "./components/pages/ReviewsGallery";
import { AdminDashboard } from "./components/pages/AdminDashboard";
import { DestinationsPage } from "./components/pages/DestinationsPage";
import { BidsPage } from "./components/pages/BidsPage";
import { GuideDashboard } from "./components/pages/GuideDashboard";
import { GuideBidsPage } from "./components/pages/GuideBidsPage";
import { GuideAssignedPage } from "./components/pages/GuideAssignedPage";
import { GuideQRPage } from "./components/pages/GuideQRPage";
import { GuideReviewsPage } from "./components/pages/GuideReviewsPage";
import { AdminDestinations } from "./components/pages/AdminDestinations";
import { AdminGuides } from "./components/pages/AdminGuides";
import { AdminNotifications } from "./components/pages/AdminNotifications";
import Landing from "./components/pages/Landing";
import SriLankaHero from "./components/pages/SriLankaHero"; // ADD THIS IMPORT
// @ts-ignore
import logoImage from "./assets/logo.png";

type Page =
  | "landing"
  | "role-selection"
  | "login"
  | "signup"
  | "home"
  | "planner"
  | "itinerary"
  | "itinerary-editor"
  | "marketplace"
  | "destinations"
  | "bids"
  | "chat"
  | "notifications"
  | "dashboard"
  | "qr-scan"
  | "reviews"
  | "guide-dashboard"
  | "guide-bids"
  | "guide-assigned"
  | "guide-qr"
  | "guide-reviews"
  | "admin-dashboard"
  | "admin-destinations"
  | "admin-guides"
  | "admin-notifications"
  | "sri-lanka"; // ADD THIS PAGE TYPE

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>("landing");
  const [userRole, setUserRole] = useState<string>("tourist");

  const handleNavigate = (page: Page, role?: string) => {
    console.log(`🔄 Navigation: Moving from ${currentPage} to ${page}`); // ADD DEBUG LOG
    if (role) setUserRole(role);
    setCurrentPage(page);
  };

  const renderPage = () => {
    console.log(`🎯 Rendering page: ${currentPage}`); // ADD DEBUG LOG
    switch (currentPage) {
      case "landing":
        return <Landing onNavigate={handleNavigate} />;
      case "role-selection":
        return <RoleSelection onNavigate={handleNavigate} />;
      case "login":
        return <LoginPage role={userRole} onNavigate={handleNavigate} />;
      case "signup":
        return <SignupPage onNavigate={handleNavigate} />;
      case "home":
        return <LandingPage onNavigate={handleNavigate} />;
      case "planner":
        return <PlannerForm onNavigate={handleNavigate} />;
      case "itinerary":
        return <ItineraryPreview onNavigate={handleNavigate} />;
      case "itinerary-editor":
        return <ItineraryEditor onNavigate={handleNavigate} />;
      case "marketplace":
        return <GuideMarketplace onNavigate={handleNavigate} />;
      case "destinations":
        return <DestinationsPage onNavigate={handleNavigate} />;
      case "bids":
        return <BidsPage onNavigate={handleNavigate} />;
      case "chat":
        return <ChatPage onNavigate={handleNavigate} />;
      case "notifications":
        return <NotificationCenter onNavigate={handleNavigate} />;
      case "dashboard":
        return <Dashboard onNavigate={handleNavigate} />;
      case "qr-scan":
        return <QRVerification onNavigate={handleNavigate} />;
      case "reviews":
        return <ReviewsGallery onNavigate={handleNavigate} />;
      case "guide-dashboard":
        return <GuideDashboard onNavigate={handleNavigate} />;
      case "guide-bids":
        return <GuideBidsPage onNavigate={handleNavigate} />;
      case "guide-assigned":
        return <GuideAssignedPage onNavigate={handleNavigate} />;
      case "guide-qr":
        return <GuideQRPage onNavigate={handleNavigate} />;
      case "guide-reviews":
        return <GuideReviewsPage onNavigate={handleNavigate} />;
      case "admin-dashboard":
        return <AdminDashboard onNavigate={handleNavigate} />;
      case "admin-destinations":
        return <AdminDestinations onNavigate={handleNavigate} />;
      case "admin-guides":
        return <AdminGuides onNavigate={handleNavigate} />;
      case "admin-notifications":
        return <AdminNotifications onNavigate={handleNavigate} />;
      case "sri-lanka": // ADD THIS CASE
        return <SriLankaHero />;
      default:
        return <Landing onNavigate={handleNavigate} />;
    }
  };

  const showNavigation = ![
    "landing", // ADD "landing" to hide navigation on landing page
    "role-selection",
    "login", 
    "signup",
    "home",
    "sri-lanka", // ADD "sri-lanka" to hide navigation on Sri Lanka page
  ].includes(currentPage);

  const isAdminPage = currentPage.startsWith("admin-");
  const isGuidePage = currentPage.startsWith("guide-");

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#fefcf8" }}>
      {/* Tourist/Regular Navigation */}
      {showNavigation && !isAdminPage && !isGuidePage && (
        <Navigation currentPage={currentPage} onNavigate={handleNavigate} />
      )}
      
      {/* Guide Navigation */}
      {showNavigation && isGuidePage && (
        <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
          <div className="w-full px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <div 
                className="flex items-center gap-2 cursor-pointer"
                onClick={() => handleNavigate("guide-dashboard")}
              >
                <img 
                  src={logoImage} 
                  alt="SeranGo" 
                  className="h-12 w-auto"
                />
                <span className="text-lg text-gray-600">Guide</span>
              </div>
              <div className="flex items-center gap-4">
                <button
                  className={`text-gray-600 hover:text-gray-900 ${currentPage === "guide-dashboard" ? "font-medium" : ""}`}
                  onClick={() => handleNavigate("guide-dashboard")}
                  style={currentPage === "guide-dashboard" ? { color: "#F7A160" } : {}}
                >
                  Dashboard
                </button>
                <button
                  className={`text-gray-600 hover:text-gray-900 ${currentPage === "guide-bids" ? "font-medium" : ""}`}
                  onClick={() => handleNavigate("guide-bids")}
                  style={currentPage === "guide-bids" ? { color: "#F7A160" } : {}}
                >
                  Bids
                </button>
                <button
                  className={`text-gray-600 hover:text-gray-900 ${currentPage === "guide-assigned" ? "font-medium" : ""}`}
                  onClick={() => handleNavigate("guide-assigned")}
                  style={currentPage === "guide-assigned" ? { color: "#F7A160" } : {}}
                >
                  Assigned
                </button>
                <button
                  className={`text-gray-600 hover:text-gray-900 ${currentPage === "chat" ? "font-medium" : ""}`}
                  onClick={() => handleNavigate("chat")}
                  style={currentPage === "chat" ? { color: "#F7A160" } : {}}
                >
                  Messages
                </button>
                <button
                  className="text-gray-600 hover:text-gray-900"
                  onClick={() => handleNavigate("role-selection")}
                >
                  Logout
                </button>
              </div>
            </div>
          </div>
        </nav>
      )}

      {/* Admin Navigation */}
      {showNavigation && isAdminPage && (
        <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
          <div className="w-full px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <div 
                className="flex items-center gap-2 cursor-pointer"
                onClick={() => handleNavigate("admin-dashboard")}
              >
                <img 
                  src={logoImage} 
                  alt="SeranGo" 
                  className="h-12 w-auto"
                />
                <span className="text-lg text-gray-600">Admin</span>
              </div>
              <div className="flex items-center gap-4">
                <button
                  className={`text-gray-600 hover:text-gray-900 ${currentPage === "admin-dashboard" ? "font-medium" : ""}`}
                  onClick={() => handleNavigate("admin-dashboard")}
                  style={currentPage === "admin-dashboard" ? { color: "#F7DC79" } : {}}
                >
                  Dashboard
                </button>
                <button
                  className={`text-gray-600 hover:text-gray-900 ${currentPage === "admin-destinations" ? "font-medium" : ""}`}
                  onClick={() => handleNavigate("admin-destinations")}
                  style={currentPage === "admin-destinations" ? { color: "#F7DC79" } : {}}
                >
                  Destinations
                </button>
                <button
                  className={`text-gray-600 hover:text-gray-900 ${currentPage === "admin-guides" ? "font-medium" : ""}`}
                  onClick={() => handleNavigate("admin-guides")}
                  style={currentPage === "admin-guides" ? { color: "#F7DC79" } : {}}
                >
                  Guides
                </button>
                <button
                  className={`text-gray-600 hover:text-gray-900 ${currentPage === "admin-notifications" ? "font-medium" : ""}`}
                  onClick={() => handleNavigate("admin-notifications")}
                  style={currentPage === "admin-notifications" ? { color: "#F7DC79" } : {}}
                >
                  Notifications
                </button>
                <button
                  className="text-gray-600 hover:text-gray-900"
                  onClick={() => handleNavigate("role-selection")}
                >
                  Logout
                </button>
              </div>
            </div>
          </div>
        </nav>
      )}

      {renderPage()}
    </div>
  );
}