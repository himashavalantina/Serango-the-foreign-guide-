import { Card, CardContent } from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Label } from "../ui/label";
import { 
  MapPin,
  Calendar,
  Users,
  DollarSign,
  MessageSquare,
  Send,
} from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";

interface GuideBidsPageProps {
  onNavigate: (page: string) => void;
}

export function GuideBidsPage({ onNavigate }: GuideBidsPageProps) {
  const availableRequests = [
    {
      id: 1,
      tourist: "Emma Wilson",
      destination: "Paris, France",
      dates: "June 15-18, 2025",
      duration: "3 days",
      group: 2,
      budget: "$400-$600/person",
      preferences: "Art museums, French cuisine, hidden gems",
      postedAt: "3 hours ago",
    },
    {
      id: 2,
      tourist: "John Smith",
      destination: "Barcelona, Spain",
      dates: "July 10-15, 2025",
      duration: "5 days",
      group: 4,
      budget: "$500-$800/person",
      preferences: "Architecture, beaches, local tapas tours",
      postedAt: "1 day ago",
    },
  ];

  const myBids = [
    {
      id: 1,
      tourist: "Sarah Chen",
      destination: "Paris, France",
      dates: "May 20-23, 2025",
      group: 2,
      myBid: 520,
      status: "pending",
      submittedAt: "2 days ago",
    },
  ];

  return (
    <div className="min-h-screen py-12" style={{ backgroundColor: "#fefcf8" }}>
      <div className="w-full px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-4xl mb-2" style={{ color: "#F7A160" }}>
            Trip Requests & My Bids
          </h1>
          <p className="text-xl text-gray-600">
            Browse available trips and manage your active bids
          </p>
        </div>

        {/* My Active Bids */}
        <div className="mb-12">
          <h2 className="text-2xl mb-4" style={{ color: "#F7A160" }}>
            My Active Bids
          </h2>
          <div className="space-y-4">
            {myBids.map((bid) => (
              <Card key={bid.id} className="shadow-lg bg-white border-none">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-xl">{bid.tourist}</h3>
                        <Badge className="bg-[#F7DC79] hover:bg-[#F7DC79] text-black">
                          Pending
                        </Badge>
                      </div>
                      <div className="flex items-center gap-6 text-gray-600 mb-3">
                        <span className="flex items-center gap-2">
                          <MapPin className="w-4 h-4" />
                          {bid.destination}
                        </span>
                        <span className="flex items-center gap-2">
                          <Calendar className="w-4 h-4" />
                          {bid.dates}
                        </span>
                        <span className="flex items-center gap-2">
                          <Users className="w-4 h-4" />
                          {bid.group} people
                        </span>
                      </div>
                      <p className="text-sm text-gray-600">
                        Your bid: <span className="font-medium text-lg" style={{ color: "#F7A160" }}>${bid.myBid}</span> per person
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        Edit Bid
                      </Button>
                      <Button variant="outline" size="sm">
                        Withdraw
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Available Trip Requests */}
        <div>
          <h2 className="text-2xl mb-4" style={{ color: "#F7A160" }}>
            Available Trip Requests
          </h2>
          <div className="grid gap-6">
            {availableRequests.map((request) => (
              <Card key={request.id} className="shadow-lg hover:shadow-xl transition-all bg-white border-none">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-3">
                        <h3 className="text-2xl">{request.destination}</h3>
                        <Badge variant="outline">{request.duration}</Badge>
                      </div>
                      <div className="grid md:grid-cols-2 gap-x-8 gap-y-3 mb-4">
                        <div className="flex items-center gap-2 text-gray-600">
                          <Calendar className="w-4 h-4" />
                          {request.dates}
                        </div>
                        <div className="flex items-center gap-2 text-gray-600">
                          <Users className="w-4 h-4" />
                          {request.group} people
                        </div>
                        <div className="flex items-center gap-2 text-gray-600">
                          <DollarSign className="w-4 h-4" />
                          Budget: {request.budget}
                        </div>
                      </div>
                      <div className="p-4 rounded-lg bg-gray-50">
                        <p className="text-sm text-gray-600 mb-1">Preferences:</p>
                        <p className="text-gray-800">{request.preferences}</p>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <p className="text-sm text-gray-500">Posted {request.postedAt}</p>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button
                          style={{
                            background: "linear-gradient(90deg, #F7A160 0%, #F7A160 100%)",
                          }}
                        >
                          <Send className="w-4 h-4 mr-2" />
                          Submit Bid
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-md">
                        <DialogHeader>
                          <DialogTitle>Submit Your Bid</DialogTitle>
                        </DialogHeader>
                        <div className="space-y-4">
                          <div>
                            <Label>Your Bid (per person)</Label>
                            <div className="relative">
                              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">$</span>
                              <Input type="number" placeholder="450" className="pl-8" />
                            </div>
                          </div>
                          <div>
                            <Label>Message to Tourist</Label>
                            <Textarea 
                              placeholder="Introduce yourself and explain why you're the perfect guide for this trip..."
                              rows={4}
                            />
                          </div>
                          <Button 
                            className="w-full" 
                            style={{
                              background: "linear-gradient(90deg, #F7A160 0%, #F7A160 100%)",
                            }}
                          >
                            Submit Bid
                          </Button>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
