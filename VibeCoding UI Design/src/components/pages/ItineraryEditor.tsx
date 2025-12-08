import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Checkbox } from "../ui/checkbox";
import { SustainabilityScore } from "../shared/SustainabilityScore";
import { ImageWithFallback } from "../figma/ImageWithFallback";
import { 
  MapPin, 
  Plus, 
  Trash2, 
  Check,
  X,
} from "lucide-react";

interface ItineraryEditorProps {
  onNavigate: (page: string) => void;
}

export function ItineraryEditor({ onNavigate }: ItineraryEditorProps) {
  const [selectedDestinations, setSelectedDestinations] = useState<number[]>([1, 2]);

  const availableDestinations = [
    {
      id: 1,
      name: "Santorini, Greece",
      country: "Greece",
      image: "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=800",
      sustainability: 85,
      estimatedDays: 3,
      estimatedCost: 420,
    },
    {
      id: 2,
      name: "Kyoto, Japan",
      image: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=800",
      country: "Japan",
      sustainability: 92,
      estimatedDays: 4,
      estimatedCost: 580,
    },
    {
      id: 3,
      name: "Lisbon, Portugal",
      image: "https://images.unsplash.com/photo-1555881400-74d7acaacd8b?w=800",
      country: "Portugal",
      sustainability: 78,
      estimatedDays: 3,
      estimatedCost: 350,
    },
    {
      id: 4,
      name: "Paris, France",
      image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=800",
      country: "France",
      sustainability: 72,
      estimatedDays: 4,
      estimatedCost: 520,
    },
    {
      id: 5,
      name: "Barcelona, Spain",
      image: "https://images.unsplash.com/photo-1562883676-8c7feb83f09b?w=800",
      country: "Spain",
      sustainability: 68,
      estimatedDays: 3,
      estimatedCost: 480,
    },
    {
      id: 6,
      name: "Reykjavik, Iceland",
      image: "https://images.unsplash.com/photo-1504893524553-b855bce32c67?w=800",
      country: "Iceland",
      sustainability: 95,
      estimatedDays: 4,
      estimatedCost: 650,
    },
  ];

  const toggleDestination = (id: number) => {
    setSelectedDestinations((prev) =>
      prev.includes(id)
        ? prev.filter((destId) => destId !== id)
        : [...prev, id]
    );
  };

  const selectedCount = selectedDestinations.length;
  const totalDays = selectedDestinations.reduce((sum, id) => {
    const dest = availableDestinations.find((d) => d.id === id);
    return sum + (dest?.estimatedDays || 0);
  }, 0);
  const totalCost = selectedDestinations.reduce((sum, id) => {
    const dest = availableDestinations.find((d) => d.id === id);
    return sum + (dest?.estimatedCost || 0);
  }, 0);

  return (
    <div className="min-h-screen py-12" style={{ backgroundColor: "#fefcf8" }}>
      <div className="w-full px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-4xl mb-2" style={{ color: "#F7A160" }}>
            Edit Your Itinerary
          </h1>
          <p className="text-xl text-gray-600">
            Add or remove destinations from your trip plan
          </p>
        </div>

        {/* Summary Card */}
        <Card className="shadow-lg bg-white border-none mb-8">
          <CardContent className="p-6">
            <div className="grid md:grid-cols-4 gap-6">
              <div>
                <p className="text-sm text-gray-600 mb-1">Selected Destinations</p>
                <p className="text-3xl" style={{ color: "#F7A160" }}>
                  {selectedCount}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-600 mb-1">Total Duration</p>
                <p className="text-3xl" style={{ color: "#F7DC79" }}>
                  {totalDays} days
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-600 mb-1">Estimated Cost</p>
                <p className="text-3xl text-gray-900">
                  ${totalCost}
                </p>
              </div>
              <div className="flex items-center gap-3">
                <Button
                  variant="outline"
                  onClick={() => onNavigate("itinerary")}
                  className="flex-1"
                >
                  <X className="w-4 h-4 mr-2" />
                  Cancel
                </Button>
                <Button
                  className="flex-1"
                  style={{ backgroundColor: "#F7A160" }}
                  onClick={() => onNavigate("itinerary")}
                  disabled={selectedCount === 0}
                >
                  <Check className="w-4 h-4 mr-2" />
                  Save
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Destination Selection Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {availableDestinations.map((destination) => {
            const isSelected = selectedDestinations.includes(destination.id);
            return (
              <Card
                key={destination.id}
                className={`overflow-hidden shadow-lg hover:shadow-xl transition-all cursor-pointer border-2 ${
                  isSelected ? "border-[#F7A160]" : "border-transparent"
                }`}
                onClick={() => toggleDestination(destination.id)}
              >
                <div className="relative h-48 overflow-hidden">
                  <ImageWithFallback
                    src={destination.image}
                    alt={destination.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-3 right-3">
                    <div
                      className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                        isSelected ? "bg-[#F7A160]" : "bg-white"
                      }`}
                    >
                      {isSelected ? (
                        <Check className="w-5 h-5 text-white" />
                      ) : (
                        <Plus className="w-5 h-5 text-gray-400" />
                      )}
                    </div>
                  </div>
                </div>
                <CardContent className="p-6 bg-white">
                  <div className="mb-3">
                    <h3 className="text-xl mb-1">{destination.name}</h3>
                    <div className="flex items-center gap-1 text-gray-600">
                      <MapPin className="w-4 h-4" />
                      <span className="text-sm">{destination.country}</span>
                    </div>
                  </div>

                  <div className="mb-4">
                    <SustainabilityScore score={destination.sustainability} size="sm" />
                  </div>

                  <div className="flex items-center justify-between text-sm text-gray-600">
                    <span>{destination.estimatedDays} days</span>
                    <span className="font-medium">${destination.estimatedCost}</span>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Selected Destinations Order */}
        {selectedCount > 0 && (
          <Card className="shadow-lg bg-white border-none mt-8">
            <CardHeader>
              <CardTitle style={{ color: "#F7A160" }}>Trip Order</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {selectedDestinations.map((id, index) => {
                  const dest = availableDestinations.find((d) => d.id === id);
                  if (!dest) return null;
                  return (
                    <div
                      key={id}
                      className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg"
                    >
                      <div
                        className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
                        style={{ backgroundColor: "#F7A160", color: "#fff" }}
                      >
                        {index + 1}
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium">{dest.name}</h4>
                        <p className="text-sm text-gray-600">
                          {dest.estimatedDays} days · ${dest.estimatedCost}
                        </p>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => toggleDestination(id)}
                      >
                        <Trash2 className="w-4 h-4 text-red-500" />
                      </Button>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
