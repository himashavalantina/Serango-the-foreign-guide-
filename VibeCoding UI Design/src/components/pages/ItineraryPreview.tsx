import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { CheckCircle2, Clock, MapPin, DollarSign, Sparkles } from "lucide-react";
import { Separator } from "../ui/separator";

interface ItineraryPreviewProps {
  onNavigate: (page: string) => void;
}

export function ItineraryPreview({ onNavigate }: ItineraryPreviewProps) {
  const itinerary = [
    {
      day: "Day 1",
      date: "June 15, 2025",
      activities: [
        { time: "09:00", title: "Eiffel Tower Visit", duration: "2 hours", cost: "$35" },
        { time: "12:00", title: "Lunch at Café de Flore", duration: "1.5 hours", cost: "$45" },
        { time: "14:30", title: "Louvre Museum Tour", duration: "3 hours", cost: "$55" },
        { time: "18:00", title: "Seine River Cruise", duration: "1.5 hours", cost: "$40" },
      ],
    },
    {
      day: "Day 2",
      date: "June 16, 2025",
      activities: [
        { time: "10:00", title: "Montmartre & Sacré-Cœur", duration: "2 hours", cost: "Free" },
        { time: "13:00", title: "Traditional French Lunch", duration: "2 hours", cost: "$50" },
        { time: "15:30", title: "Arc de Triomphe", duration: "1 hour", cost: "$15" },
        { time: "17:00", title: "Champs-Élysées Shopping", duration: "2 hours", cost: "Variable" },
      ],
    },
    {
      day: "Day 3",
      date: "June 17, 2025",
      activities: [
        { time: "09:30", title: "Versailles Palace Day Trip", duration: "5 hours", cost: "$75" },
        { time: "16:00", title: "Return to Paris", duration: "1 hour", cost: "$20" },
        { time: "19:00", title: "Farewell Dinner", duration: "2 hours", cost: "$80" },
      ],
    },
  ];

  const totalCost = 515;

  return (
    <div className="min-h-screen py-12" style={{ backgroundColor: "#fefcf8" }}>
      <div className="w-full px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-2">
            <Sparkles className="w-8 h-8" style={{ color: "#F7A160" }} />
            <h1 className="text-4xl" style={{ color: "#F7A160" }}>
              Your AI-Generated Itinerary
            </h1>
          </div>
          <p className="text-xl text-gray-600">
            Paris, France • 3 Days • 2 People
          </p>
        </div>

        {/* Cost Summary */}
        <Card className="mb-8 shadow-lg border-2" style={{ borderColor: "#F7DC79" }}>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <DollarSign className="w-8 h-8" style={{ color: "#F7A160" }} />
                <div>
                  <p className="text-sm text-gray-600">Estimated Total Cost</p>
                  <p className="text-3xl">${totalCost} per person</p>
                </div>
              </div>
              <Button
                size="lg"
                className="text-lg px-8"
                style={{ backgroundColor: "#F7A160" }}
                onClick={() => onNavigate("marketplace")}
              >
                <CheckCircle2 className="mr-2" />
                Confirm & Find Guides
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Itinerary Days */}
        <div className="space-y-6">
          {itinerary.map((day, dayIndex) => (
            <Card key={dayIndex} className="shadow-lg">
              <CardHeader style={{ backgroundColor: "#F7A160" }} className="text-white">
                <CardTitle className="flex items-center justify-between">
                  <span>{day.day}</span>
                  <span className="text-sm opacity-90">{day.date}</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-4">
                  {day.activities.map((activity, actIndex) => (
                    <div key={actIndex}>
                      <div className="flex items-start gap-4">
                        <div
                          className="w-16 h-16 rounded-lg flex items-center justify-center flex-shrink-0"
                          style={{ backgroundColor: "#F7DC79", opacity: 0.3 }}
                        >
                          <Clock className="w-6 h-6" style={{ color: "#F7A160" }} />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-start justify-between">
                            <div>
                              <p className="text-sm text-gray-600">{activity.time}</p>
                              <h4 className="text-lg mb-1">{activity.title}</h4>
                              <div className="flex items-center gap-4 text-sm text-gray-600">
                                <span className="flex items-center gap-1">
                                  <Clock className="w-4 h-4" />
                                  {activity.duration}
                                </span>
                                <span className="flex items-center gap-1">
                                  <DollarSign className="w-4 h-4" />
                                  {activity.cost}
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      {actIndex < day.activities.length - 1 && (
                        <Separator className="my-4" />
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-8 text-center">
          <Button
            size="lg"
            variant="outline"
            onClick={() => onNavigate("itinerary-editor")}
            className="mr-4"
          >
            Modify Itinerary
          </Button>
          <Button
            size="lg"
            className="text-lg px-8"
            style={{
              background: "linear-gradient(90deg, #F7A160 0%, #F7DC79 100%)",
            }}
            onClick={() => onNavigate("marketplace")}
          >
            <CheckCircle2 className="mr-2" />
            Confirm & Find Guides
          </Button>
        </div>
      </div>
    </div>
  );
}
