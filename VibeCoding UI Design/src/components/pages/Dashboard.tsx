import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { StatusChip } from "../shared/StatusChip";
import { Calendar, MapPin, User, QrCode, Star, Plus } from "lucide-react";
import { Separator } from "../ui/separator";

interface DashboardProps {
  onNavigate: (page: string) => void;
}

export function Dashboard({ onNavigate }: DashboardProps) {
  const trips = [
    {
      id: "TRIP-001",
      destination: "Paris, France",
      dates: "June 15-17, 2025",
      guide: "Sophie Martin",
      status: "postponed" as const,
      alert: "Flight delayed by 3 hours",
      travelers: 2,
    },
    {
      id: "TRIP-002",
      destination: "Tokyo, Japan",
      dates: "September 1-5, 2025",
      guide: "Yuki Tanaka",
      status: "upcoming" as const,
      alert: null,
      travelers: 4,
    },
    {
      id: "TRIP-003",
      destination: "Barcelona, Spain",
      dates: "March 10-14, 2025",
      guide: "Carlos Rodriguez",
      status: "completed" as const,
      alert: null,
      travelers: 2,
    },
    {
      id: "TRIP-004",
      destination: "Rome, Italy",
      dates: "December 20-24, 2024",
      guide: "Not assigned",
      status: "draft" as const,
      alert: null,
      travelers: 3,
    },
  ];

  const stats = [
    { label: "Upcoming Trips", value: "2", color: "#F7A160" },
    { label: "Completed Trips", value: "1", color: "#F7DC79" },
    { label: "Total Spent", value: "$2,340", color: "#3B82F6" },
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="w-full px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl mb-2" style={{ color: "#F7A160" }}>
              My Trips Dashboard
            </h1>
            <p className="text-xl text-gray-600">
              Manage your travel plans and track your adventures
            </p>
          </div>
          <Button
            size="lg"
            style={{
              background: "linear-gradient(90deg, #F7A160 0%, #F7DC79 100%)",
            }}
            onClick={() => onNavigate("planner")}
          >
            <Plus className="mr-2" />
            Plan New Trip
          </Button>
        </div>

        {/* Stats */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          {stats.map((stat, index) => (
            <Card key={index} className="shadow-lg">
              <CardContent className="p-6">
                <p className="text-sm text-gray-600 mb-1">{stat.label}</p>
                <p className="text-4xl" style={{ color: stat.color }}>
                  {stat.value}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Trips List */}
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle>Your Trips</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {trips.map((trip, index) => (
                <div key={trip.id}>
                  <div className="space-y-4">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-2xl">{trip.destination}</h3>
                          <StatusChip status={trip.status} />
                        </div>
                        {trip.alert && (
                          <div className="bg-yellow-50 border border-yellow-300 rounded-lg p-3 mb-3">
                            <p className="text-sm text-yellow-800">{trip.alert}</p>
                          </div>
                        )}
                        <div className="flex flex-wrap gap-4 text-gray-600">
                          <div className="flex items-center gap-2">
                            <Calendar className="w-4 h-4" />
                            <span>{trip.dates}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <User className="w-4 h-4" />
                            <span>{trip.guide}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <MapPin className="w-4 h-4" />
                            <span>{trip.travelers} travelers</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        {trip.status === "upcoming" || trip.status === "postponed" ? (
                          <>
                            <Button
                              variant="outline"
                              onClick={() => onNavigate("qr-scan")}
                            >
                              <QrCode className="w-4 h-4 mr-2" />
                              Verify Guide
                            </Button>
                            <Button
                              variant="outline"
                              onClick={() => onNavigate("chat")}
                            >
                              Contact Guide
                            </Button>
                          </>
                        ) : trip.status === "completed" ? (
                          <Button
                            variant="outline"
                            onClick={() => onNavigate("reviews")}
                          >
                            <Star className="w-4 h-4 mr-2" />
                            View Review
                          </Button>
                        ) : (
                          <Button
                            onClick={() => onNavigate("itinerary")}
                            style={{
                              background: "linear-gradient(90deg, #F7A160 0%, #F7DC79 100%)",
                            }}
                          >
                            Continue Planning
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                  {index < trips.length - 1 && <Separator className="mt-6" />}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
