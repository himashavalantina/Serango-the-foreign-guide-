import { useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Checkbox } from "../ui/checkbox";
import { Calendar, Users, DollarSign, MapPin } from "lucide-react";

interface PlannerFormProps {
  onNavigate: (page: string) => void;
}

export function PlannerForm({ onNavigate }: PlannerFormProps) {
  const [selectedAreas, setSelectedAreas] = useState<string[]>([]);

  const areas = [
    "Historic Sites",
    "Beaches",
    "Mountains",
    "Museums",
    "Shopping Districts",
    "Nightlife",
    "Food & Dining",
    "Nature & Parks",
  ];

  const toggleArea = (area: string) => {
    setSelectedAreas((prev) =>
      prev.includes(area)
        ? prev.filter((a) => a !== area)
        : [...prev, area]
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="w-full px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-4xl mb-2" style={{ color: "#F7A160" }}>
            Plan Your Trip with AI
          </h1>
          <p className="text-xl text-gray-600">
            Tell us about your travel plans and we'll create a personalized itinerary
          </p>
        </div>

        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle>Trip Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Dates */}
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label>Arrival Date & Time</Label>
                <div className="flex gap-2">
                  <Input type="date" />
                  <Input type="time" className="w-32" />
                </div>
              </div>
              <div className="space-y-2">
                <Label>Departure Date & Time</Label>
                <div className="flex gap-2">
                  <Input type="date" />
                  <Input type="time" className="w-32" />
                </div>
              </div>
            </div>

            {/* Destination */}
            <div className="space-y-2">
              <Label className="flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                Destination
              </Label>
              <Input placeholder="e.g., Paris, Tokyo, New York" />
            </div>

            {/* Group Size */}
            <div className="space-y-2">
              <Label className="flex items-center gap-2">
                <Users className="w-4 h-4" />
                Group Size
              </Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select group size" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">Solo Traveler</SelectItem>
                  <SelectItem value="2">2 People</SelectItem>
                  <SelectItem value="3-5">3-5 People</SelectItem>
                  <SelectItem value="6+">6+ People</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Budget */}
            <div className="space-y-2">
              <Label className="flex items-center gap-2">
                <DollarSign className="w-4 h-4" />
                Budget per Person
              </Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select budget range" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="budget">Budget ($0-$500)</SelectItem>
                  <SelectItem value="moderate">Moderate ($500-$1500)</SelectItem>
                  <SelectItem value="luxury">Luxury ($1500+)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Areas & Activities */}
            <div className="space-y-2">
              <Label>Areas & Activities of Interest</Label>
              <div className="grid grid-cols-2 gap-3 mt-2">
                {areas.map((area) => (
                  <div key={area} className="flex items-center space-x-2">
                    <Checkbox
                      id={area}
                      checked={selectedAreas.includes(area)}
                      onCheckedChange={() => toggleArea(area)}
                    />
                    <label
                      htmlFor={area}
                      className="text-sm cursor-pointer"
                    >
                      {area}
                    </label>
                  </div>
                ))}
              </div>
            </div>

            {/* Additional Preferences */}
            <div className="space-y-2">
              <Label>Additional Preferences</Label>
              <Textarea
                placeholder="Any special requests, dietary restrictions, accessibility needs, or specific interests?"
                rows={4}
              />
            </div>

            {/* Submit Button */}
            <Button
              className="w-full py-6 text-lg"
              style={{
                background: "linear-gradient(90deg, #F7A160 0%, #F7DC79 100%)",
              }}
              onClick={() => onNavigate("itinerary")}
            >
              <Calendar className="mr-2" />
              Generate AI Itinerary
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
