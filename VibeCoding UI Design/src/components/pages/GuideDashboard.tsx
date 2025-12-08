import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { StatusChip } from "../shared/StatusChip";
import { 
  DollarSign,
  Calendar,
  Star,
  Users,
  MapPin,
  Clock,
  TrendingUp,
  QrCode,
  MessageSquare,
} from "lucide-react";

interface GuideDashboardProps {
  onNavigate: (page: string) => void;
}

export function GuideDashboard({ onNavigate }: GuideDashboardProps) {
  const stats = [
    { label: "Active Bids", value: "5", icon: DollarSign, color: "#F7A160" },
    { label: "Assigned Trips", value: "3", icon: Calendar, color: "#F7DC79" },
    { label: "Total Earnings", value: "$4,850", icon: TrendingUp, color: "#F7DC79" },
    { label: "Average Rating", value: "4.8", icon: Star, color: "#F7DC79" },
  ];

  const activeBids = [
    {
      id: 1,
      tourist: "Emma Wilson",
      destination: "Paris, France",
      dates: "June 15-18, 2025",
      group: 2,
      yourBid: 450,
      status: "pending",
    },
    {
      id: 2,
      tourist: "John Smith",
      destination: "Tokyo, Japan",
      dates: "July 10-15, 2025",
      group: 4,
      yourBid: 680,
      status: "pending",
    },
  ];

  const assignedTrips = [
    {
      id: 1,
      tripId: "TRIP-001",
      tourist: "Sarah Chen",
      destination: "Barcelona, Spain",
      dates: "May 20-23, 2025",
      group: 2,
      earnings: 520,
      status: "upcoming" as const,
      daysUntil: 5,
    },
    {
      id: 2,
      tripId: "TRIP-002",
      tourist: "Michael Brown",
      destination: "Rome, Italy",
      dates: "June 1-4, 2025",
      group: 3,
      earnings: 680,
      status: "upcoming" as const,
      daysUntil: 17,
    },
  ];

  return (
    <div className="min-h-screen py-12" style={{ backgroundColor: "#fefcf8" }}>
      <div className="w-full px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl mb-2" style={{ color: "#F7A160" }}>
              Guide Dashboard
            </h1>
            <p className="text-xl text-gray-600">
              Manage your bids, trips, and profile
            </p>
          </div>
          <Button
            size="lg"
            style={{
              background: "linear-gradient(90deg, #F7A160 0%, #F7DC79 100%)",
            }}
            onClick={() => onNavigate("guide-qr")}
          >
            <QrCode className="mr-2 w-5 h-5" />
            My QR Code
          </Button>
        </div>

        {/* Stats */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <Card key={index} className="shadow-lg bg-white border-none">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <Icon className="w-8 h-8" style={{ color: stat.color }} />
                  </div>
                  <p className="text-sm text-gray-600 mb-1">{stat.label}</p>
                  <p className="text-3xl" style={{ color: stat.color }}>
                    {stat.value}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Active Bids */}
          <Card className="shadow-lg bg-white border-none">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <DollarSign className="w-5 h-5" style={{ color: "#F7A160" }} />
                  Active Bids
                </CardTitle>
                <Button
                  variant="ghost"
                  onClick={() => onNavigate("guide-bids")}
                >
                  View All
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {activeBids.map((bid) => (
                  <div key={bid.id} className="p-4 rounded-lg border border-gray-200 hover:border-[#F7A160] transition-colors">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h4 className="font-medium mb-1">{bid.tourist}</h4>
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <MapPin className="w-4 h-4" />
                          {bid.destination}
                        </div>
                      </div>
                      <Badge style={{ backgroundColor: "#F7DC79", color: "#000" }}>
                        Pending
                      </Badge>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {bid.dates}
                      </span>
                      <span className="flex items-center gap-1">
                        <Users className="w-4 h-4" />
                        {bid.group} people
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <p className="text-sm text-gray-600">
                        Your bid: <span className="font-medium text-lg" style={{ color: "#F7A160" }}>${bid.yourBid}</span>
                      </p>
                      <Button size="sm" variant="outline">
                        Edit Bid
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Assigned Trips */}
          <Card className="shadow-lg bg-white border-none">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="w-5 h-5" style={{ color: "#F7A160" }} />
                  Assigned Trips
                </CardTitle>
                <Button
                  variant="ghost"
                  onClick={() => onNavigate("guide-assigned")}
                >
                  View All
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {assignedTrips.map((trip) => (
                  <div key={trip.id} className="p-4 rounded-lg border border-gray-200 hover:border-[#F7A160] transition-colors">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className="font-medium">{trip.tripId}</h4>
                          <StatusChip status={trip.status} />
                        </div>
                        <p className="text-sm text-gray-600 mb-1">{trip.tourist}</p>
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <MapPin className="w-4 h-4" />
                          {trip.destination}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {trip.dates}
                      </span>
                      <span className="flex items-center gap-1">
                        <Users className="w-4 h-4" />
                        {trip.group} people
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <p className="text-sm">
                        <span className="text-gray-600">Earnings: </span>
                        <span className="font-medium text-lg" style={{ color: "#F7DC79" }}>${trip.earnings}</span>
                      </p>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline" onClick={() => onNavigate("chat")}>
                          <MessageSquare className="w-4 h-4" />
                        </Button>
                        <Button size="sm" style={{ backgroundColor: "#F7A160" }}>
                          View Details
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <div className="mt-8 grid md:grid-cols-3 gap-6">
          <Card className="shadow-lg bg-white border-none cursor-pointer hover:shadow-xl transition-shadow" onClick={() => onNavigate("guide-bids")}>
            <CardContent className="p-6 text-center">
              <DollarSign className="w-12 h-12 mx-auto mb-3" style={{ color: "#F7A160" }} />
              <h3 className="text-lg mb-2">Manage Bids</h3>
              <p className="text-sm text-gray-600">View and update your active bids</p>
            </CardContent>
          </Card>
          <Card className="shadow-lg bg-white border-none cursor-pointer hover:shadow-xl transition-shadow" onClick={() => onNavigate("guide-qr")}>
            <CardContent className="p-6 text-center">
              <QrCode className="w-12 h-12 mx-auto mb-3" style={{ color: "#F7A160" }} />
              <h3 className="text-lg mb-2">My QR Code</h3>
              <p className="text-sm text-gray-600">Show tourists for verification</p>
            </CardContent>
          </Card>
          <Card className="shadow-lg bg-white border-none cursor-pointer hover:shadow-xl transition-shadow" onClick={() => onNavigate("guide-reviews")}>
            <CardContent className="p-6 text-center">
              <Star className="w-12 h-12 mx-auto mb-3" style={{ color: "#F7DC79" }} />
              <h3 className="text-lg mb-2">My Reviews</h3>
              <p className="text-sm text-gray-600">View feedback from tourists</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
