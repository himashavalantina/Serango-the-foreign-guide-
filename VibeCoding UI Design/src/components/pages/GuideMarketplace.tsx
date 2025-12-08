import { Button } from "../ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "../ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Badge } from "../ui/badge";
import { Star, MapPin, Languages, Award, DollarSign, MessageSquare } from "lucide-react";
import { ImageWithFallback } from "../figma/ImageWithFallback";

interface GuideMarketplaceProps {
  onNavigate: (page: string) => void;
}

export function GuideMarketplace({ onNavigate }: GuideMarketplaceProps) {
  const guides = [
    {
      id: 1,
      name: "Sophie Martin",
      photo: "https://images.unsplash.com/photo-1641139984837-a8167f146c0d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0b3VyaXN0JTIwZ3VpZGUlMjBwb3J0cmFpdHxlbnwxfHx8fDE3NjA3NzU2MjF8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      rating: 4.9,
      reviews: 127,
      languages: ["French", "English", "Spanish"],
      areas: ["Historic Sites", "Museums", "Food Tours"],
      certifications: ["Licensed Tour Guide", "First Aid Certified"],
      bid: 380,
      experience: "8 years",
    },
    {
      id: 2,
      name: "Jean-Pierre Dubois",
      photo: "https://images.unsplash.com/photo-1641139984837-a8167f146c0d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0b3VyaXN0JTIwZ3VpZGUlMjBwb3J0cmFpdHxlbnwxfHx8fDE3NjA3NzU2MjF8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      rating: 4.8,
      reviews: 98,
      languages: ["French", "English", "German"],
      areas: ["Architecture", "Historic Sites", "Nightlife"],
      certifications: ["Licensed Tour Guide", "Art History Degree"],
      bid: 420,
      experience: "12 years",
    },
    {
      id: 3,
      name: "Marie Laurent",
      photo: "https://images.unsplash.com/photo-1641139984837-a8167f146c0d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0b3VyaXN0JTIwZ3VpZGUlMjBwb3J0cmFpdHxlbnwxfHx8fDE3NjA3NzU2MjF8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      rating: 5.0,
      reviews: 215,
      languages: ["French", "English", "Italian", "Japanese"],
      areas: ["Museums", "Food & Dining", "Shopping"],
      certifications: ["Licensed Tour Guide", "Sommelier", "Cultural Heritage Expert"],
      bid: 450,
      experience: "15 years",
    },
    {
      id: 4,
      name: "Thomas Bernard",
      photo: "https://images.unsplash.com/photo-1641139984837-a8167f146c0d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0b3VyaXN0JTIwZ3VpZGUlMjBwb3J0cmFpdHxlbnwxfHx8fDE3NjA3NzU2MjF8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      rating: 4.7,
      reviews: 84,
      languages: ["French", "English"],
      areas: ["Historic Sites", "Architecture", "Photography Tours"],
      certifications: ["Licensed Tour Guide"],
      bid: 350,
      experience: "5 years",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="w-full px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-4xl mb-2" style={{ color: "#F7A160" }}>
            Available Guides for Your Trip
          </h1>
          <p className="text-xl text-gray-600">
            Paris, France • June 15-17, 2025 • 2 People
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {guides.map((guide) => (
            <Card key={guide.id} className="shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader>
                <div className="flex items-start gap-4">
                  <Avatar className="w-20 h-20">
                    <AvatarImage src={guide.photo} />
                    <AvatarFallback>{guide.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <h3 className="text-2xl mb-1">{guide.name}</h3>
                    <div className="flex items-center gap-2 mb-2">
                      <div className="flex items-center">
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400 mr-1" />
                        <span>{guide.rating}</span>
                      </div>
                      <span className="text-gray-400">•</span>
                      <span className="text-gray-600">{guide.reviews} reviews</span>
                      <span className="text-gray-400">•</span>
                      <span className="text-gray-600">{guide.experience}</span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {guide.certifications.map((cert, idx) => (
                        <Badge key={idx} variant="secondary" className="text-xs">
                          <Award className="w-3 h-3 mr-1" />
                          {cert}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <div>
                  <div className="flex items-center gap-2 mb-2 text-sm text-gray-600">
                    <Languages className="w-4 h-4" />
                    <span>Languages</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {guide.languages.map((lang, idx) => (
                      <Badge key={idx} style={{ backgroundColor: "#F7DC79", color: "#000" }}>
                        {lang}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div>
                  <div className="flex items-center gap-2 mb-2 text-sm text-gray-600">
                    <MapPin className="w-4 h-4" />
                    <span>Specialties</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {guide.areas.map((area, idx) => (
                      <Badge key={idx} variant="outline">
                        {area}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div
                  className="p-4 rounded-lg"
                  style={{ backgroundColor: "#f3f0f8" }}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">Bid for 3-day tour</p>
                      <p className="text-3xl" style={{ color: "#F7A160" }}>
                        ${guide.bid}
                        <span className="text-sm text-gray-600">/person</span>
                      </p>
                    </div>
                    <DollarSign className="w-8 h-8" style={{ color: "#F7A160" }} />
                  </div>
                </div>
              </CardContent>

              <CardFooter className="flex gap-3">
                <Button
                  variant="outline"
                  className="flex-1"
                  onClick={() => onNavigate("chat")}
                >
                  <MessageSquare className="w-4 h-4 mr-2" />
                  Message
                </Button>
                <Button
                  className="flex-1"
                  style={{
                    background: "linear-gradient(90deg, #F7A160 0%, #F7DC79 100%)",
                  }}
                  onClick={() => onNavigate("dashboard")}
                >
                  Select Guide
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
