import { useState } from "react";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader } from "../ui/card";
import { Textarea } from "../ui/textarea";
import { Star, Upload, X } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { ImageWithFallback } from "../figma/ImageWithFallback";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";

interface ReviewsGalleryProps {
  onNavigate: (page: string) => void;
}

export function ReviewsGallery({ onNavigate }: ReviewsGalleryProps) {
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);

  const existingReviews = [
    {
      id: 1,
      trip: "Barcelona, Spain",
      guide: "Carlos Rodriguez",
      guidePhoto: "https://images.unsplash.com/photo-1641139984837-a8167f146c0d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0b3VyaXN0JTIwZ3VpZGUlMjBwb3J0cmFpdHxlbnwxfHx8fDE3NjA3NzU2MjF8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      rating: 5,
      date: "March 18, 2025",
      review: "Carlos was an absolutely fantastic guide! His knowledge of Barcelona's architecture and history was incredible. He showed us hidden gems we never would have found on our own. The tapas tour was a highlight!",
      photos: [
        "https://images.unsplash.com/photo-1635352428745-9231ac8406b4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2YWNhdGlvbiUyMGxhbmRzY2FwZXxlbnwxfHx8fDE3NjA3NzU2MjJ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
        "https://images.unsplash.com/photo-1632752369128-c763fffbc924?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0cmF2ZWwlMjBkZXN0aW5hdGlvbiUyMGJlYWNofGVufDF8fHx8MTc2MDczMzEzMXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="w-full px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-4xl mb-2" style={{ color: "#F7A160" }}>
            Trip Reviews & Photos
          </h1>
          <p className="text-xl text-gray-600">
            Share your experience and memories from your trips
          </p>
        </div>

        {/* Write New Review */}
        <Card className="mb-8 shadow-lg">
          <CardHeader>
            <div className="flex items-center justify-between">
              <h2 className="text-2xl">Leave a Review</h2>
              <div className="flex items-center gap-2">
                <span className="text-gray-600">Trip:</span>
                <select className="border rounded-lg px-3 py-2">
                  <option>Paris, France - June 2025</option>
                </select>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Guide Info */}
            <div className="flex items-center gap-3">
              <Avatar className="w-12 h-12">
                <AvatarImage src="https://images.unsplash.com/photo-1641139984837-a8167f146c0d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0b3VyaXN0JTIwZ3VpZGUlMjBwb3J0cmFpdHxlbnwxfHx8fDE3NjA3NzU2MjF8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral" />
                <AvatarFallback>SM</AvatarFallback>
              </Avatar>
              <div>
                <p className="font-medium">Sophie Martin</p>
                <p className="text-sm text-gray-600">Your guide for this trip</p>
              </div>
            </div>

            {/* Rating */}
            <div>
              <p className="mb-2">Rate your experience</p>
              <div className="flex gap-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    onMouseEnter={() => setHoverRating(star)}
                    onMouseLeave={() => setHoverRating(0)}
                    onClick={() => setRating(star)}
                  >
                    <Star
                      className={`w-8 h-8 transition-colors ${
                        star <= (hoverRating || rating)
                          ? "fill-yellow-400 text-yellow-400"
                          : "text-gray-300"
                      }`}
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Review Text */}
            <div>
              <p className="mb-2">Share your experience</p>
              <Textarea
                placeholder="Tell us about your trip, your guide, and the highlights of your journey..."
                rows={6}
              />
            </div>

            {/* Photo Upload */}
            <div>
              <p className="mb-2">Upload photos from your trip</p>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-[#F7A160] transition-colors cursor-pointer">
                <Upload className="w-12 h-12 mx-auto mb-2 text-gray-400" />
                <p className="text-gray-600">Click to upload or drag and drop</p>
                <p className="text-sm text-gray-500 mt-1">PNG, JPG up to 10MB</p>
              </div>
            </div>

            {/* Submit */}
            <Button
              size="lg"
              className="w-full"
              style={{
                background: "linear-gradient(90deg, #F7A160 0%, #F7DC79 100%)",
              }}
            >
              Submit Review
            </Button>
          </CardContent>
        </Card>

        {/* Existing Reviews */}
        <div className="space-y-6">
          <h2 className="text-2xl">Your Past Reviews</h2>
          {existingReviews.map((review) => (
            <Card key={review.id} className="shadow-lg">
              <CardContent className="p-6">
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <Avatar className="w-12 h-12">
                      <AvatarImage src={review.guidePhoto} />
                      <AvatarFallback>{review.guide.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium">{review.guide}</p>
                      <p className="text-sm text-gray-600">{review.trip}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center gap-1 mb-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${
                            i < review.rating
                              ? "fill-yellow-400 text-yellow-400"
                              : "text-gray-300"
                          }`}
                        />
                      ))}
                    </div>
                    <p className="text-sm text-gray-500">{review.date}</p>
                  </div>
                </div>

                {/* Review Text */}
                <p className="text-gray-700 mb-4">{review.review}</p>

                {/* Photos */}
                <div className="grid grid-cols-4 gap-4">
                  {review.photos.map((photo, idx) => (
                    <Dialog key={idx}>
                      <DialogTrigger asChild>
                        <div className="aspect-square rounded-lg overflow-hidden cursor-pointer hover:opacity-90 transition-opacity">
                          <ImageWithFallback
                            src={photo}
                            alt={`Trip photo ${idx + 1}`}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      </DialogTrigger>
                      <DialogContent className="max-w-4xl">
                        <DialogHeader>
                          <DialogTitle>{review.trip}</DialogTitle>
                        </DialogHeader>
                        <ImageWithFallback
                          src={photo}
                          alt={`Trip photo ${idx + 1}`}
                          className="w-full h-auto rounded-lg"
                        />
                      </DialogContent>
                    </Dialog>
                  ))}
                  {review.photos.length > 0 && (
                    <div className="aspect-square rounded-lg bg-gray-100 flex items-center justify-center text-gray-500">
                      +{review.photos.length} more
                    </div>
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
