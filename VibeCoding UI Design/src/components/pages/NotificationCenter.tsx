import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { StatusChip } from "../shared/StatusChip";
import { AlertTriangle, Clock, CheckCircle2, Bell, Plane } from "lucide-react";
import { Separator } from "../ui/separator";

interface NotificationCenterProps {
  onNavigate: (page: string) => void;
}

export function NotificationCenter({ onNavigate }: NotificationCenterProps) {
  const notifications = [
    {
      id: 1,
      type: "flight_delay",
      title: "Flight Delayed - Plan Updated",
      message: "Your flight AF123 has been delayed by 3 hours. Your trip status has been updated to POSTPONED. Your guide Sophie has been notified.",
      time: "30 minutes ago",
      status: "postponed" as const,
      tripId: "TRIP-001",
      icon: AlertTriangle,
      iconColor: "#EAB308",
    },
    {
      id: 2,
      type: "guide_message",
      title: "New Message from Sophie Martin",
      message: "I've adjusted our meeting time based on your new arrival. See you at 12 PM instead!",
      time: "45 minutes ago",
      status: "upcoming" as const,
      tripId: "TRIP-001",
      icon: Bell,
      iconColor: "#F7A160",
    },
    {
      id: 3,
      type: "booking_confirmed",
      title: "Booking Confirmed",
      message: "Your Tokyo trip with guide Yuki Tanaka has been confirmed for September 1-5, 2025.",
      time: "2 hours ago",
      status: "upcoming" as const,
      tripId: "TRIP-002",
      icon: CheckCircle2,
      iconColor: "#F7DC79",
    },
    {
      id: 4,
      type: "reminder",
      title: "Trip Starting Soon",
      message: "Your Paris trip starts in 24 hours! Don't forget to download your guide's QR code for verification.",
      time: "5 hours ago",
      status: "upcoming" as const,
      tripId: "TRIP-001",
      icon: Clock,
      iconColor: "#F7A160",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="w-full px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-4xl mb-2" style={{ color: "#F7A160" }}>
            Flight & Trip Notifications
          </h1>
          <p className="text-xl text-gray-600">
            Stay updated on flight changes and important trip information
          </p>
        </div>

        {/* Active Alerts */}
        <Card className="mb-8 shadow-lg border-2 border-yellow-400 bg-yellow-50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="w-6 h-6 text-yellow-600" />
              Active Flight Alerts
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-start gap-4">
              <Plane className="w-8 h-8 text-yellow-600 flex-shrink-0" />
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <h3 className="text-lg">Flight AF123 to Paris</h3>
                  <StatusChip status="postponed" />
                </div>
                <p className="text-gray-700 mb-2">
                  Delayed by 3 hours due to weather conditions. New arrival time: 3:00 PM (June 15)
                </p>
                <p className="text-sm text-gray-600">
                  Your guide and itinerary have been automatically updated.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Notifications List */}
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle>All Notifications</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {notifications.map((notification, index) => {
                const Icon = notification.icon;
                return (
                  <div key={notification.id}>
                    <div className="flex gap-4">
                      <div
                        className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0"
                        style={{ backgroundColor: notification.iconColor + "20" }}
                      >
                        <Icon className="w-6 h-6" style={{ color: notification.iconColor }} />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-1">
                          <div className="flex items-center gap-2">
                            <h4 className="text-lg">{notification.title}</h4>
                            <StatusChip status={notification.status} />
                          </div>
                          <span className="text-sm text-gray-500">{notification.time}</span>
                        </div>
                        <p className="text-gray-600 mb-1">{notification.message}</p>
                        <p className="text-sm text-gray-500">Trip ID: {notification.tripId}</p>
                      </div>
                    </div>
                    {index < notifications.length - 1 && <Separator className="my-4" />}
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
