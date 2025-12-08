import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Badge } from "../ui/badge";
import { SustainabilityScore } from "../shared/SustainabilityScore";
import { 
  MapPin, 
  Edit, 
  Trash2, 
  Plus,
  TrendingUp,
  Sparkles,
  Users,
} from "lucide-react";
import { Slider } from "../ui/slider";
import { Switch } from "../ui/switch";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";

interface AdminDestinationsProps {
  onNavigate: (page: string) => void;
}

export function AdminDestinations({ onNavigate }: AdminDestinationsProps) {
  const [destinations, setDestinations] = useState([
    {
      id: 1,
      name: "Paris, France",
      sustainability: 72,
      guides: 89,
      activeTrips: 24,
      trending: false,
      featured: true,
    },
    {
      id: 2,
      name: "Kyoto, Japan",
      sustainability: 92,
      guides: 63,
      activeTrips: 18,
      trending: true,
      featured: true,
    },
    {
      id: 3,
      name: "Bali, Indonesia",
      sustainability: 56,
      guides: 52,
      activeTrips: 31,
      trending: true,
      featured: false,
    },
    {
      id: 4,
      name: "Reykjavik, Iceland",
      sustainability: 95,
      guides: 28,
      activeTrips: 9,
      trending: false,
      featured: true,
    },
  ]);

  const [editingDestination, setEditingDestination] = useState<typeof destinations[0] | null>(null);

  return (
    <div className="min-h-screen py-12" style={{ backgroundColor: "#fefcf8" }}>
      <div className="w-full px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl mb-2" style={{ color: "#F7A160" }}>
              Destination Management
            </h1>
            <p className="text-xl text-gray-600">
              Manage destinations and sustainability scores
            </p>
          </div>
          <Dialog>
            <DialogTrigger asChild>
              <Button
                size="lg"
                style={{
                  background: "linear-gradient(90deg, #F7A160 0%, #F7A160 100%)",
                }}
              >
                <Plus className="mr-2 w-5 h-5" />
                Add Destination
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle>Add New Destination</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label>Destination Name</Label>
                  <Input placeholder="e.g., Paris, France" />
                </div>
                <div>
                  <Label>Sustainability Score (0-100)</Label>
                  <Slider defaultValue={[50]} max={100} step={1} />
                </div>
                <div className="flex items-center justify-between">
                  <Label>Mark as Trending</Label>
                  <Switch />
                </div>
                <div className="flex items-center justify-between">
                  <Label>Mark as Featured</Label>
                  <Switch />
                </div>
                <Button className="w-full" style={{ backgroundColor: "#F7A160" }}>
                  Add Destination
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        <div className="grid gap-6">
          {destinations.map((destination) => (
            <Card key={destination.id} className="shadow-lg bg-white border-none">
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <MapPin className="w-5 h-5" style={{ color: "#F7A160" }} />
                      <h3 className="text-2xl">{destination.name}</h3>
                      {destination.trending && (
                        <Badge className="bg-[#F7A160] hover:bg-[#F7A160]">
                          <TrendingUp className="w-3 h-3 mr-1" />
                          Trending
                        </Badge>
                      )}
                      {destination.featured && (
                        <Badge className="bg-[#F7DC79] hover:bg-[#F7DC79] text-black">
                          <Sparkles className="w-3 h-3 mr-1" />
                          Featured
                        </Badge>
                      )}
                    </div>

                    <div className="mb-4">
                      <SustainabilityScore score={destination.sustainability} size="md" />
                    </div>

                    <div className="grid grid-cols-3 gap-6">
                      <div>
                        <p className="text-sm text-gray-600 mb-1">Verified Guides</p>
                        <p className="text-2xl" style={{ color: "#F7A160" }}>
                          {destination.guides}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600 mb-1">Active Trips</p>
                        <p className="text-2xl" style={{ color: "#F7A160" }}>
                          {destination.activeTrips}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600 mb-1">Status</p>
                        <Badge className="bg-yellow-500 hover:bg-yellow-500">Active</Badge>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-2 ml-4">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setEditingDestination(destination)}
                        >
                          <Edit className="w-4 h-4" />
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-md">
                        <DialogHeader>
                          <DialogTitle>Edit Destination</DialogTitle>
                        </DialogHeader>
                        <div className="space-y-4">
                          <div>
                            <Label>Destination Name</Label>
                            <Input defaultValue={destination.name} />
                          </div>
                          <div>
                            <Label>Sustainability Score: {destination.sustainability}/100</Label>
                            <Slider defaultValue={[destination.sustainability]} max={100} step={1} />
                          </div>
                          <div className="flex items-center justify-between">
                            <Label>Mark as Trending</Label>
                            <Switch defaultChecked={destination.trending} />
                          </div>
                          <div className="flex items-center justify-between">
                            <Label>Mark as Featured</Label>
                            <Switch defaultChecked={destination.featured} />
                          </div>
                          <Button className="w-full" style={{ backgroundColor: "#F7A160" }}>
                            Save Changes
                          </Button>
                        </div>
                      </DialogContent>
                    </Dialog>
                    <Button variant="outline" size="sm">
                      <Trash2 className="w-4 h-4 text-red-500" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
