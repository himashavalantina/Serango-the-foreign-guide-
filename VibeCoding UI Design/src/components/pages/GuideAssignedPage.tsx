import { Card, CardContent } from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { StatusChip } from "../shared/StatusChip";
import { 
  MapPin,
  Calendar,
  Users,
  DollarSign,
  MessageSquare,
  QrCode,
  Clock,
  Phone,
  Mail,
} from "lucide-react";

interface GuideAssignedPageProps {
  onNavigate: (page: string) => void;
}

export function GuideAssignedPage({ onNavigate }: GuideAssignedPageProps) {
  const assignedTrips = [
    {
      id: 1,
      tripId: "TRIP-001",
      tourist: {
        name: "Sarah Chen",
        email: "sarah@example.com",
        phone: "+1 234 567 8900",
      },
      destination: "Barcelona, Spain",
      dates: "May 20-23, 2025",
      duration: "3 days",
      group: 2,
      earnings: 520,
      status: "upcoming" as const,
      daysUntil: 5,
      meetingPoint: "Hotel Barcelona Plaza, Main Lobby",
      meetingTime: "9:00 AM",
      specialRequests: "Vegetarian meals, interested in Gaudi architecture",
    },
    {
      id: 2,
      tripId: "TRIP-002",
      tourist: {
        name: "Michael Brown",
        email: "michael@example.com",
        phone: "+44 789 123 4567",
      },
      destination: "Rome, Italy",
      dates: "June 1-4, 2025",
      duration: "3 days",
      group: 3,
      earnings: 680,
      status: "upcoming" as const,
      daysUntil: 17,
      meetingPoint: "Colosseum Main Entrance",
      meetingTime: "10:00 AM",
      specialRequests: "Kids friendly activities, Roman history focus",
    },
    {
      id: 3,
      tripId: "TRIP-003",
      tourist: {
        name: "Lisa Wang",
        email: "lisa@example.com",
        phone: "+86 138 0000 0000",
      },
      destination: "Paris, France",
      dates: "April 10-13, 2025",
      duration: "3 days",
      group: 2,
      earnings: 490,
      status: "completed" as const,
      daysUntil: -7,
      meetingPoint: "Eiffel Tower",
      meetingTime: "9:30 AM",
      specialRequests: "Photography spots, art museums",
    },
  ];

  return (
    <div className="min-h-screen py-12" style={{ backgroundColor: "#fefcf8" }}>
      <div className="w-full px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-4xl mb-2" style={{ color: "#F7A160" }}>
            My Assigned Trips
          </h1>
          <p className="text-xl text-gray-600">
            Manage your confirmed trips and tourist details
          </p>
        </div>

        <div className="space-y-6">
          {assignedTrips.map((trip) => (
            <Card key={trip.id} className="shadow-lg bg-white border-none">
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-2xl">{trip.tripId}</h3>
                      <StatusChip status={trip.status} />
                      {trip.status === "upcoming" && trip.daysUntil <= 7 && (
                        <Badge className="bg-[#F7A160] hover:bg-[#F7A160]">
                          <Clock className="w-3 h-3 mr-1" />
                          Starts in {trip.daysUntil} days
                        </Badge>
                      )}
                    </div>
                    <p className="text-lg text-gray-600">{trip.tourist.name}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-600 mb-1">Earnings</p>
                    <p className="text-3xl" style={{ color: "#F7DC79" }}>
                      ${trip.earnings}
                    </p>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6 mb-6">
                  {/* Trip Details */}
                  <div className="space-y-3">
                    <h4 className="font-medium text-gray-900 mb-3">Trip Details</h4>
                    <div className="flex items-center gap-2 text-gray-600">
                      <MapPin className="w-4 h-4" />
                      {trip.destination}
                    </div>
                    <div className="flex items-center gap-2 text-gray-600">
                      <Calendar className="w-4 h-4" />
                      {trip.dates}
                    </div>
                    <div className="flex items-center gap-2 text-gray-600">
                      <Users className="w-4 h-4" />
                      {trip.group} people
                    </div>
                    <div className="p-3 rounded-lg bg-gray-50 mt-3">
                      <p className="text-sm text-gray-600 mb-1">Meeting Point:</p>
                      <p className="font-medium">{trip.meetingPoint}</p>
                      <p className="text-sm text-gray-600 mt-1">{trip.meetingTime}</p>
                    </div>
                  </div>

                  {/* Tourist Contact */}
                  <div className="space-y-3">
                    <h4 className="font-medium text-gray-900 mb-3">Tourist Contact</h4>
                    <div className="flex items-center gap-2 text-gray-600">
                      <Mail className="w-4 h-4" />
                      {trip.tourist.email}
                    </div>
                    <div className="flex items-center gap-2 text-gray-600">
                      <Phone className="w-4 h-4" />
                      {trip.tourist.phone}
                    </div>
                    <div className="p-3 rounded-lg bg-blue-50 mt-3">
                      <p className="text-sm text-gray-600 mb-1">Special Requests:</p>
                      <p className="text-sm">{trip.specialRequests}</p>
                    </div>
                  </div>
                </div>

                <div className="flex gap-3">
                  {trip.status === "upcoming" && (
                    <>
                      <Button
                        variant="outline"
                        onClick={() => onNavigate("chat")}
                      >
                        <MessageSquare className="w-4 h-4 mr-2" />
                        Message Tourist
                      </Button>
                      {trip.daysUntil <= 7 && (
                        <Button
                          style={{
                            background: "linear-gradient(90deg, #F7A160 0%, #F7A160 100%)",
                          }}
                          onClick={() => onNavigate("guide-qr")}
                        >
                          <QrCode className="w-4 h-4 mr-2" />
                          Show My QR Code
                        </Button>
                      )}
                    </>
                  )}
                  {trip.status === "completed" && (
                    <Button variant="outline">
                      View Trip Summary
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
