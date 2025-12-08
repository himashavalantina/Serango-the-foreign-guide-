import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { 
  Star,
  MapPin,
  Users,
  Calendar,
  DollarSign,
  MessageSquare,
  Award,
  Languages,
} from "lucide-react";

interface BidsPageProps {
  onNavigate: (page: string) => void;
}

export function BidsPage({ onNavigate }: BidsPageProps) {
  const receivedBids = [
    {
      id: 1,
      guide: {
        name: "Sophie Martin",
        photo: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200",
        rating: 4.9,
        reviews: 127,
        languages: ["French", "English", "German"],
        certifications: ["Licensed Guide", "First Aid"],
      },
      tripDetails: {
        destination: "Paris, France",
        dates: "June 15-18, 2025",
        group: 2,
      },
      bid: 520,
      message: "Bonjour! I'd love to show you the authentic Paris. I specialize in art history and hidden gems off the tourist path.",
      submittedAt: "2 hours ago",
      status: "pending",
    },
    {
      id: 2,
      guide: {
        name: "Jean-Pierre Dubois",
        photo: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200",
        rating: 4.7,
        reviews: 89,
        languages: ["French", "English"],
        certifications: ["Licensed Guide"],
      },
      tripDetails: {
        destination: "Paris, France",
        dates: "June 15-18, 2025",
        group: 2,
      },
      bid: 480,
      message: "Hello! Native Parisian guide with 10 years experience. I can create a personalized journey through Paris.",
      submittedAt: "5 hours ago",
      status: "pending",
    },
    {
      id: 3,
      guide: {
        name: "Marie Laurent",
        photo: "https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?w=200",
        rating: 4.8,
        reviews: 102,
        languages: ["French", "English", "Spanish"],
        certifications: ["Licensed Guide", "Wine Expert"],
      },
      tripDetails: {
        destination: "Paris, France",
        dates: "June 15-18, 2025",
        group: 2,
      },
      bid: 560,
      message: "Bienvenue! I offer exclusive culinary and wine experiences alongside classic Paris sightseeing.",
      submittedAt: "1 day ago",
      status: "pending",
    },
  ];

  return (
    <div className="min-h-screen py-12" style={{ backgroundColor: "#fefcf8" }}>
      <div className="w-full px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-4xl mb-2" style={{ color: "#F7A160" }}>
            Guide Bids
          </h1>
          <p className="text-xl text-gray-600">
            Review and compare bids from local guides
          </p>
        </div>

        {/* Trip Summary */}
        <Card className="shadow-lg bg-white border-none mb-8">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xl mb-2">Your Trip Request</h3>
                <div className="flex items-center gap-6 text-gray-600">
                  <span className="flex items-center gap-2">
                    <MapPin className="w-4 h-4" />
                    Paris, France
                  </span>
                  <span className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    June 15-18, 2025
                  </span>
                  <span className="flex items-center gap-2">
                    <Users className="w-4 h-4" />
                    2 people
                  </span>
                </div>
              </div>
              <Badge className="bg-[#F7DC79] hover:bg-[#F7DC79] text-black">
                {receivedBids.length} Bids Received
              </Badge>
            </div>
          </CardContent>
        </Card>

        {/* Bids List */}
        <div className="space-y-6">
          {receivedBids.map((bid) => (
            <Card key={bid.id} className="shadow-lg hover:shadow-xl transition-all bg-white border-none">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <Avatar className="w-20 h-20">
                    <AvatarImage src={bid.guide.photo} />
                    <AvatarFallback>{bid.guide.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="text-2xl mb-1">{bid.guide.name}</h3>
                        <div className="flex items-center gap-2 mb-2">
                          <div className="flex items-center">
                            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400 mr-1" />
                            <span>{bid.guide.rating}</span>
                          </div>
                          <span className="text-gray-400">•</span>
                          <span className="text-gray-600">{bid.guide.reviews} reviews</span>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {bid.guide.certifications.map((cert, idx) => (
                            <Badge key={idx} variant="secondary" className="text-xs">
                              <Award className="w-3 h-3 mr-1" />
                              {cert}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-gray-600 mb-1">Bid Amount</p>
                        <p className="text-3xl" style={{ color: "#F7A160" }}>
                          ${bid.bid}
                        </p>
                        <p className="text-sm text-gray-600">per person</p>
                      </div>
                    </div>

                    <div className="mb-4">
                      <div className="flex items-center gap-2 mb-2 text-sm text-gray-600">
                        <Languages className="w-4 h-4" />
                        <span>Languages</span>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {bid.guide.languages.map((lang, idx) => (
                          <Badge key={idx} style={{ backgroundColor: "#F7A160", color: "#fff" }}>
                            {lang}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div className="p-4 rounded-lg bg-gray-50 mb-4">
                      <p className="text-sm text-gray-600 mb-1">Message from guide:</p>
                      <p className="text-gray-800">{bid.message}</p>
                      <p className="text-xs text-gray-500 mt-2">{bid.submittedAt}</p>
                    </div>

                    <div className="flex gap-3">
                      <Button
                        variant="outline"
                        className="flex-1"
                        onClick={() => onNavigate("chat")}
                      >
                        <MessageSquare className="w-4 h-4 mr-2" />
                        Message
                      </Button>
                      <Button
                        variant="outline"
                        className="flex-1"
                      >
                        View Profile
                      </Button>
                      <Button
                        className="flex-1"
                        style={{
                          background: "linear-gradient(90deg, #F7A160 0%, #F7A160 100%)",
                        }}
                        onClick={() => onNavigate("dashboard")}
                      >
                        Accept Bid
                      </Button>
                    </div>
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
