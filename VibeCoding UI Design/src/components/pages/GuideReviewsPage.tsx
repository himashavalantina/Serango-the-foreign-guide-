import { Card, CardContent } from "../ui/card";
import { Badge } from "../ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Star, ThumbsUp, MapPin, Calendar } from "lucide-react";

interface GuideReviewsPageProps {
  onNavigate: (page: string) => void;
}

export function GuideReviewsPage({ onNavigate }: GuideReviewsPageProps) {
  const stats = {
    averageRating: 4.8,
    totalReviews: 127,
    ratingBreakdown: [
      { stars: 5, count: 89, percentage: 70 },
      { stars: 4, count: 28, percentage: 22 },
      { stars: 3, count: 7, percentage: 6 },
      { stars: 2, count: 2, percentage: 1 },
      { stars: 1, count: 1, percentage: 1 },
    ],
  };

  const reviews = [
    {
      id: 1,
      tourist: {
        name: "Sarah Chen",
        photo: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200",
      },
      trip: {
        destination: "Barcelona, Spain",
        date: "April 2025",
        tripId: "TRIP-001",
      },
      rating: 5,
      comment: "Maria was an absolutely fantastic guide! Her knowledge of Gaudi's architecture was incredible, and she took us to amazing local restaurants we never would have found on our own. Highly recommend!",
      helpful: 12,
      photos: [
        "https://images.unsplash.com/photo-1562883676-8c7feb83f09b?w=300",
        "https://images.unsplash.com/photo-1583422409516-2895a77efded?w=300",
      ],
      createdAt: "2 weeks ago",
    },
    {
      id: 2,
      tourist: {
        name: "Michael Brown",
        photo: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200",
      },
      trip: {
        destination: "Madrid, Spain",
        date: "March 2025",
        tripId: "TRIP-015",
      },
      rating: 5,
      comment: "Perfect guide for our family trip! Maria was patient with our kids and made the history come alive. The tapas tour was a highlight!",
      helpful: 8,
      photos: [],
      createdAt: "1 month ago",
    },
    {
      id: 3,
      tourist: {
        name: "Emma Wilson",
        photo: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200",
      },
      trip: {
        destination: "Barcelona, Spain",
        date: "February 2025",
        tripId: "TRIP-023",
      },
      rating: 4,
      comment: "Great experience overall. Maria was very knowledgeable and friendly. Only minor issue was running a bit late on day 2, but she made up for it with extra time.",
      helpful: 5,
      photos: [
        "https://images.unsplash.com/photo-1558642084-fd07fae5282e?w=300",
      ],
      createdAt: "2 months ago",
    },
  ];

  return (
    <div className="min-h-screen py-12" style={{ backgroundColor: "#fefcf8" }}>
      <div className="w-full px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-4xl mb-2" style={{ color: "#F7A160" }}>
            My Reviews
          </h1>
          <p className="text-xl text-gray-600">
            Feedback from tourists you've guided
          </p>
        </div>

        {/* Rating Overview */}
        <Card className="shadow-lg bg-white border-none mb-8">
          <CardContent className="p-8">
            <div className="grid md:grid-cols-2 gap-8">
              <div className="text-center">
                <p className="text-6xl mb-2" style={{ color: "#F7DC79" }}>
                  {stats.averageRating}
                </p>
                <div className="flex items-center justify-center gap-1 mb-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className={`w-6 h-6 ${
                        star <= Math.round(stats.averageRating)
                          ? "fill-yellow-400 text-yellow-400"
                          : "text-gray-300"
                      }`}
                    />
                  ))}
                </div>
                <p className="text-gray-600">{stats.totalReviews} total reviews</p>
              </div>
              <div className="space-y-2">
                {stats.ratingBreakdown.map((item) => (
                  <div key={item.stars} className="flex items-center gap-3">
                    <span className="text-sm text-gray-600 w-12">{item.stars} star</span>
                    <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full"
                        style={{
                          width: `${item.percentage}%`,
                          backgroundColor: "#F7DC79",
                        }}
                      />
                    </div>
                    <span className="text-sm text-gray-600 w-12 text-right">
                      {item.count}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Reviews List */}
        <div className="space-y-6">
          {reviews.map((review) => (
            <Card key={review.id} className="shadow-lg hover:shadow-xl transition-all bg-white border-none">
              <CardContent className="p-6">
                <div className="flex items-start gap-4 mb-4">
                  <Avatar className="w-12 h-12">
                    <AvatarImage src={review.tourist.photo} />
                    <AvatarFallback>
                      {review.tourist.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h4 className="font-medium mb-1">{review.tourist.name}</h4>
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <MapPin className="w-3 h-3" />
                          {review.trip.destination}
                          <span>•</span>
                          <Calendar className="w-3 h-3" />
                          {review.trip.date}
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="flex items-center gap-1 mb-1">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <Star
                              key={star}
                              className={`w-4 h-4 ${
                                star <= review.rating
                                  ? "fill-yellow-400 text-yellow-400"
                                  : "text-gray-300"
                              }`}
                            />
                          ))}
                        </div>
                        <p className="text-xs text-gray-500">{review.createdAt}</p>
                      </div>
                    </div>
                    <p className="text-gray-700 mb-4">{review.comment}</p>
                    
                    {review.photos.length > 0 && (
                      <div className="flex gap-2 mb-4">
                        {review.photos.map((photo, idx) => (
                          <img
                            key={idx}
                            src={photo}
                            alt={`Review photo ${idx + 1}`}
                            className="w-24 h-24 object-cover rounded-lg"
                          />
                        ))}
                      </div>
                    )}

                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <ThumbsUp className="w-4 h-4" />
                      <span>{review.helpful} people found this helpful</span>
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
