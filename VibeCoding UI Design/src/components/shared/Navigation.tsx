import { Bell, MessageSquare, LayoutDashboard, MapPin } from "lucide-react";
import { Button } from "../ui/button";
import logoImage from "../../assets/logo.png";

interface NavigationProps {
  currentPage: string;
  onNavigate: (page: string) => void;
}

export function Navigation({ currentPage, onNavigate }: NavigationProps) {
  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="w-full px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div 
            className="flex items-center gap-2 cursor-pointer"
            onClick={() => onNavigate("home")}
          >
            <img 
              src={logoImage} 
              alt="SeranGo" 
              className="h-12 w-auto"
            />
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant={currentPage === "destinations" ? "default" : "ghost"}
              onClick={() => onNavigate("destinations")}
              className={currentPage === "destinations" ? "bg-[#F7A160] hover:bg-[#f58a3d]" : ""}
            >
              <MapPin className="w-4 h-4 mr-2" />
              Destinations
            </Button>
            <Button
              variant={currentPage === "dashboard" ? "default" : "ghost"}
              onClick={() => onNavigate("dashboard")}
              className={currentPage === "dashboard" ? "bg-[#F7A160] hover:bg-[#f58a3d]" : ""}
            >
              <LayoutDashboard className="w-4 h-4 mr-2" />
              My Trips
            </Button>
            <Button
              variant={currentPage === "notifications" ? "default" : "ghost"}
              onClick={() => onNavigate("notifications")}
              className={currentPage === "notifications" ? "bg-[#F7A160] hover:bg-[#f58a3d]" : ""}
            >
              <Bell className="w-4 h-4 mr-2" />
              Notifications
            </Button>
            <Button
              variant={currentPage === "chat" ? "default" : "ghost"}
              onClick={() => onNavigate("chat")}
              className={currentPage === "chat" ? "bg-[#F7A160] hover:bg-[#f58a3d]" : ""}
            >
              <MessageSquare className="w-4 h-4 mr-2" />
              Messages
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
}
