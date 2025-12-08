import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { 
  CheckCircle2,
  XCircle,
  Star,
  MapPin,
  Award,
  AlertTriangle,
  Ban,
  Eye,
} from "lucide-react";
import { Separator } from "../ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";

interface AdminGuidesProps {
  onNavigate: (page: string) => void;
}

export function AdminGuides({ onNavigate }: AdminGuidesProps) {
  const pendingGuides = [
    {
      id: 1,
      name: "Maria Garcia",
      email: "maria@example.com",
      location: "Barcelona, Spain",
      languages: ["Spanish", "English", "French"],
      experience: "5 years",
      certifications: ["First Aid", "Tour Guide License"],
      documents: 5,
      appliedDate: "2 hours ago",
      photo: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200",
    },
    {
      id: 2,
      name: "Ahmed Hassan",
      email: "ahmed@example.com",
      location: "Cairo, Egypt",
      languages: ["Arabic", "English"],
      experience: "8 years",
      certifications: ["Tour Guide License", "History Expert"],
      documents: 6,
      appliedDate: "1 day ago",
      photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200",
    },
  ];

  const activeGuides = [
    {
      id: 3,
      name: "Sophie Martin",
      email: "sophie@example.com",
      location: "Paris, France",
      languages: ["French", "English", "German"],
      rating: 4.9,
      reviews: 127,
      activeTrips: 3,
      totalEarnings: 12450,
      status: "active",
      photo: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200",
    },
    {
      id: 4,
      name: "Yuki Tanaka",
      email: "yuki@example.com",
      location: "Tokyo, Japan",
      languages: ["Japanese", "English"],
      rating: 4.8,
      reviews: 95,
      activeTrips: 2,
      totalEarnings: 9800,
      status: "active",
      photo: "https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?w=200",
    },
  ];

  const flaggedGuides = [
    {
      id: 5,
      name: "John Doe",
      email: "john@example.com",
      location: "London, UK",
      reason: "Late arrival reported by 2 tourists",
      reports: 2,
      lastIncident: "3 days ago",
      photo: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200",
    },
  ];

  return (
    <div className="min-h-screen py-12" style={{ backgroundColor: "#fefcf8" }}>
      <div className="w-full px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-4xl mb-2" style={{ color: "#F7A160" }}>
            Guide Management
          </h1>
          <p className="text-xl text-gray-600">
            Verify, manage, and monitor guide activity
          </p>
        </div>

        <Tabs defaultValue="pending" className="mb-8">
          <TabsList className="grid w-full max-w-2xl grid-cols-3">
            <TabsTrigger value="pending">
              Pending ({pendingGuides.length})
            </TabsTrigger>
            <TabsTrigger value="active">
              Active ({activeGuides.length})
            </TabsTrigger>
            <TabsTrigger value="flagged">
              Flagged ({flaggedGuides.length})
            </TabsTrigger>
          </TabsList>

          {/* Pending Guides */}
          <TabsContent value="pending" className="mt-8">
            <div className="space-y-6">
              {pendingGuides.map((guide) => (
                <Card key={guide.id} className="shadow-lg bg-white border-none">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <Avatar className="w-20 h-20">
                        <AvatarImage src={guide.photo} />
                        <AvatarFallback>{guide.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-3">
                          <div>
                            <h3 className="text-2xl mb-1">{guide.name}</h3>
                            <p className="text-sm text-gray-600 mb-2">{guide.email}</p>
                            <div className="flex items-center gap-2 text-sm text-gray-600">
                              <MapPin className="w-4 h-4" />
                              {guide.location}
                            </div>
                          </div>
                          <Badge className="bg-[#F7DC79] hover:bg-[#F7DC79] text-black">
                            Pending Review
                          </Badge>
                        </div>

                        <div className="grid md:grid-cols-3 gap-4 mb-4">
                          <div>
                            <p className="text-sm text-gray-600 mb-1">Languages</p>
                            <div className="flex flex-wrap gap-1">
                              {guide.languages.map((lang, idx) => (
                                <Badge key={idx} variant="outline" className="text-xs">
                                  {lang}
                                </Badge>
                              ))}
                            </div>
                          </div>
                          <div>
                            <p className="text-sm text-gray-600 mb-1">Experience</p>
                            <p className="font-medium">{guide.experience}</p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-600 mb-1">Documents</p>
                            <p className="font-medium">{guide.documents} uploaded</p>
                          </div>
                        </div>

                        <div className="mb-4">
                          <p className="text-sm text-gray-600 mb-2">Certifications</p>
                          <div className="flex flex-wrap gap-2">
                            {guide.certifications.map((cert, idx) => (
                              <Badge key={idx} style={{ backgroundColor: "#F7A160", color: "#fff" }}>
                                <Award className="w-3 h-3 mr-1" />
                                {cert}
                              </Badge>
                            ))}
                          </div>
                        </div>

                        <div className="flex items-center gap-3">
                          <Button
                            variant="outline"
                          >
                            <Eye className="w-4 h-4 mr-2" />
                            View Documents
                          </Button>
                          <Button
                            variant="outline"
                          >
                            <XCircle className="w-4 h-4 mr-2" />
                            Reject
                          </Button>
                          <Button
                            style={{
                              background: "linear-gradient(90deg, #F7A160 0%, #F7A160 100%)",
                            }}
                          >
                            <CheckCircle2 className="w-4 h-4 mr-2" />
                            Approve Guide
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Active Guides */}
          <TabsContent value="active" className="mt-8">
            <div className="space-y-6">
              {activeGuides.map((guide) => (
                <Card key={guide.id} className="shadow-lg bg-white border-none">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <Avatar className="w-20 h-20">
                        <AvatarImage src={guide.photo} />
                        <AvatarFallback>{guide.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-3">
                          <div>
                            <h3 className="text-2xl mb-1">{guide.name}</h3>
                            <p className="text-sm text-gray-600 mb-2">{guide.email}</p>
                            <div className="flex items-center gap-2 text-sm text-gray-600">
                              <MapPin className="w-4 h-4" />
                              {guide.location}
                            </div>
                          </div>
                          <Badge className="bg-yellow-500 hover:bg-yellow-500">
                            Active
                          </Badge>
                        </div>

                        <div className="grid md:grid-cols-4 gap-6 mb-4">
                          <div>
                            <p className="text-sm text-gray-600 mb-1">Rating</p>
                            <div className="flex items-center gap-1">
                              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                              <span className="font-medium">{guide.rating}</span>
                              <span className="text-sm text-gray-600">({guide.reviews})</span>
                            </div>
                          </div>
                          <div>
                            <p className="text-sm text-gray-600 mb-1">Active Trips</p>
                            <p className="text-xl font-medium" style={{ color: "#F7A160" }}>
                              {guide.activeTrips}
                            </p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-600 mb-1">Total Earnings</p>
                            <p className="text-xl font-medium" style={{ color: "#F7DC79" }}>
                              ${guide.totalEarnings.toLocaleString()}
                            </p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-600 mb-1">Languages</p>
                            <p className="text-sm">{guide.languages.join(", ")}</p>
                          </div>
                        </div>

                        <div className="flex items-center gap-3">
                          <Button variant="outline">
                            View Profile
                          </Button>
                          <Button variant="outline">
                            View Trips
                          </Button>
                          <Button variant="outline" className="text-red-500 hover:text-red-600">
                            <Ban className="w-4 h-4 mr-2" />
                            Deactivate
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Flagged Guides */}
          <TabsContent value="flagged" className="mt-8">
            <div className="space-y-6">
              {flaggedGuides.map((guide) => (
                <Card key={guide.id} className="shadow-lg bg-white border-2 border-red-200">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <Avatar className="w-20 h-20">
                        <AvatarImage src={guide.photo} />
                        <AvatarFallback>{guide.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-3">
                          <div>
                            <h3 className="text-2xl mb-1">{guide.name}</h3>
                            <p className="text-sm text-gray-600 mb-2">{guide.email}</p>
                            <div className="flex items-center gap-2 text-sm text-gray-600">
                              <MapPin className="w-4 h-4" />
                              {guide.location}
                            </div>
                          </div>
                          <Badge className="bg-red-500 hover:bg-red-500">
                            <AlertTriangle className="w-3 h-3 mr-1" />
                            Flagged
                          </Badge>
                        </div>

                        <div className="p-4 rounded-lg bg-red-50 border border-red-200 mb-4">
                          <p className="font-medium text-red-700 mb-1">
                            {guide.reports} Reports
                          </p>
                          <p className="text-sm text-red-600">{guide.reason}</p>
                          <p className="text-xs text-gray-600 mt-1">Last incident: {guide.lastIncident}</p>
                        </div>

                        <div className="flex items-center gap-3">
                          <Button variant="outline">
                            View Reports
                          </Button>
                          <Button variant="outline">
                            Contact Guide
                          </Button>
                          <Button className="bg-red-500 hover:bg-red-600">
                            <Ban className="w-4 h-4 mr-2" />
                            Suspend Account
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
