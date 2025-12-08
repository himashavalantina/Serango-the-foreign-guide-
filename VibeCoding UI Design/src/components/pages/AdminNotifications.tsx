import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import { 
  Plane,
  AlertTriangle,
  Send,
  Clock,
  Users,
} from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";

interface AdminNotificationsProps {
  onNavigate: (page: string) => void;
}

export function AdminNotifications({ onNavigate }: AdminNotificationsProps) {
  const activeFlights = [
    {
      id: 1,
      flightNumber: "AF123",
      route: "New York → Paris",
      affectedTrips: 3,
      affectedTourists: 5,
      status: "on-time",
      scheduledDeparture: "10:30 AM",
    },
    {
      id: 2,
      flightNumber: "BA456",
      route: "London → Barcelona",
      affectedTrips: 2,
      affectedTourists: 4,
      status: "delayed",
      scheduledDeparture: "2:15 PM",
      delayMinutes: 45,
    },
    {
      id: 3,
      flightNumber: "LH789",
      route: "Frankfurt → Rome",
      affectedTrips: 1,
      affectedTourists: 2,
      status: "cancelled",
      scheduledDeparture: "4:00 PM",
    },
  ];

  const recentNotifications = [
    {
      id: 1,
      type: "delay",
      flight: "BA456",
      message: "Flight delayed by 45 minutes",
      sentTo: 4,
      sentAt: "10 minutes ago",
    },
    {
      id: 2,
      type: "cancellation",
      flight: "LH789",
      message: "Flight cancelled - rescheduling assistance provided",
      sentTo: 2,
      sentAt: "2 hours ago",
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "on-time":
        return "#F7DC79";
      case "delayed":
        return "#F7DC79";
      case "cancelled":
        return "#EF4444";
      default:
        return "#gray";
    }
  };

  return (
    <div className="min-h-screen py-12" style={{ backgroundColor: "#fefcf8" }}>
      <div className="w-full px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-4xl mb-2" style={{ color: "#F7A160" }}>
            Flight Notification Management
          </h1>
          <p className="text-xl text-gray-600">
            Monitor flights and send delay/cancellation alerts to tourists
          </p>
        </div>

        {/* Active Flights */}
        <Card className="shadow-lg bg-white border-none mb-8">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <Plane className="w-5 h-5" style={{ color: "#F7A160" }} />
                Active Flights
              </CardTitle>
              <Dialog>
                <DialogTrigger asChild>
                  <Button
                    size="sm"
                    style={{
                      background: "linear-gradient(90deg, #F7A160 0%, #F7A160 100%)",
                    }}
                  >
                    <Send className="w-4 h-4 mr-2" />
                    Send Custom Alert
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-md">
                  <DialogHeader>
                    <DialogTitle>Send Flight Alert</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div>
                      <Label>Flight Number</Label>
                      <Input placeholder="e.g., AF123" />
                    </div>
                    <div>
                      <Label>Alert Type</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="delay">Delay</SelectItem>
                          <SelectItem value="cancellation">Cancellation</SelectItem>
                          <SelectItem value="gate-change">Gate Change</SelectItem>
                          <SelectItem value="boarding">Boarding</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label>Message</Label>
                      <Textarea 
                        placeholder="Enter notification message..."
                        rows={4}
                      />
                    </div>
                    <Button 
                      className="w-full"
                      style={{
                        background: "linear-gradient(90deg, #F7A160 0%, #F7A160 100%)",
                      }}
                    >
                      Send Alert
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {activeFlights.map((flight) => (
                <div key={flight.id} className="p-4 rounded-lg border border-gray-200">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <div className="flex items-center gap-3 mb-2">
                        <h4 className="text-xl font-medium">{flight.flightNumber}</h4>
                        <Badge
                          style={{
                            backgroundColor: getStatusColor(flight.status) + "20",
                            color: getStatusColor(flight.status),
                          }}
                        >
                          {flight.status}
                        </Badge>
                        {flight.status === "delayed" && (
                          <Badge className="bg-orange-100 text-orange-700">
                            <Clock className="w-3 h-3 mr-1" />
                            +{flight.delayMinutes} min
                          </Badge>
                        )}
                      </div>
                      <p className="text-gray-600">{flight.route}</p>
                      <p className="text-sm text-gray-500">Scheduled: {flight.scheduledDeparture}</p>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center gap-1 text-sm text-gray-600 mb-1">
                        <Users className="w-4 h-4" />
                        <span>{flight.affectedTourists} tourists</span>
                      </div>
                      <p className="text-sm text-gray-600">{flight.affectedTrips} trips</p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    {flight.status !== "on-time" && (
                      <Button size="sm" variant="outline">
                        <AlertTriangle className="w-4 h-4 mr-2" />
                        Send Update
                      </Button>
                    )}
                    <Button size="sm" variant="outline">
                      View Affected Trips
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Notifications */}
        <Card className="shadow-lg bg-white border-none">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Send className="w-5 h-5" style={{ color: "#F7A160" }} />
              Recent Notifications Sent
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentNotifications.map((notification) => (
                <div key={notification.id} className="p-4 rounded-lg bg-gray-50">
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <Badge
                          className={
                            notification.type === "delay"
                              ? "bg-[#F7DC79] text-black"
                              : "bg-red-500"
                          }
                        >
                          {notification.type}
                        </Badge>
                        <span className="font-medium">{notification.flight}</span>
                      </div>
                      <p className="text-gray-700 mb-2">{notification.message}</p>
                      <div className="flex items-center gap-4 text-sm text-gray-600">
                        <span>Sent to {notification.sentTo} tourists</span>
                        <span>•</span>
                        <span>{notification.sentAt}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
