import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { QrCode, Download, Share2, Info } from "lucide-react";

interface GuideQRPageProps {
  onNavigate: (page: string) => void;
}

export function GuideQRPage({ onNavigate }: GuideQRPageProps) {
  return (
    <div className="min-h-screen py-12" style={{ backgroundColor: "#fefcf8" }}>
      <div className="w-full px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-4xl mb-2" style={{ color: "#F7A160" }}>
            My Guide QR Code
          </h1>
          <p className="text-xl text-gray-600">
            Show this code to tourists for identity verification
          </p>
        </div>

        {/* QR Code Display */}
        <Card className="shadow-xl bg-white border-none mb-6">
          <CardHeader>
            <CardTitle>Your Verification QR Code</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col items-center">
              {/* QR Code Placeholder */}
              <div 
                className="w-80 h-80 rounded-2xl flex items-center justify-center mb-6"
                style={{
                  background: "linear-gradient(135deg, #F7A160 0%, #F7A160 100%)",
                }}
              >
                <div className="w-72 h-72 bg-white rounded-xl flex items-center justify-center">
                  <div className="grid grid-cols-8 gap-1">
                    {Array.from({ length: 64 }).map((_, i) => (
                      <div
                        key={i}
                        className="w-3 h-3 rounded-sm"
                        style={{
                          backgroundColor: Math.random() > 0.5 ? "#000" : "#fff",
                        }}
                      />
                    ))}
                  </div>
                </div>
              </div>

              {/* Guide Info */}
              <div className="text-center mb-6">
                <h3 className="text-2xl mb-1">Maria Garcia</h3>
                <p className="text-gray-600 mb-2">Verified Guide #GD-4721</p>
                <div className="flex items-center justify-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                  <span className="text-sm text-yellow-600">Active & Verified</span>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-3 w-full">
                <Button
                  className="flex-1"
                  variant="outline"
                >
                  <Download className="w-4 h-4 mr-2" />
                  Download
                </Button>
                <Button
                  className="flex-1"
                  style={{
                    background: "linear-gradient(90deg, #F7A160 0%, #F7A160 100%)",
                  }}
                >
                  <Share2 className="w-4 h-4 mr-2" />
                  Share
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Instructions */}
        <Card className="shadow-lg bg-white border-none">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Info className="w-5 h-5" style={{ color: "#F7A160" }} />
              How to Use Your QR Code
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-[#F7A160] text-white flex items-center justify-center flex-shrink-0">
                1
              </div>
              <div>
                <p className="mb-1">Meet your tourist at the designated location</p>
                <p className="text-sm text-gray-600">Be on time and look professional</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-[#F7A160] text-white flex items-center justify-center flex-shrink-0">
                2
              </div>
              <div>
                <p className="mb-1">Show them this QR code on your device</p>
                <p className="text-sm text-gray-600">Make sure the screen is bright and clear</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-[#F7A160] text-white flex items-center justify-center flex-shrink-0">
                3
              </div>
              <div>
                <p className="mb-1">Tourist will scan with their SeranGo app</p>
                <p className="text-sm text-gray-600">You'll both receive a confirmation notification</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-[#F7A160] text-white flex items-center justify-center flex-shrink-0">
                4
              </div>
              <div>
                <p className="mb-1">Start the tour once verified!</p>
                <p className="text-sm text-gray-600">Provide an amazing experience</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="mt-6 text-center">
          <Button
            variant="outline"
            onClick={() => onNavigate("guide-dashboard")}
          >
            Back to Dashboard
          </Button>
        </div>
      </div>
    </div>
  );
}
