import { useState } from "react";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Camera, CheckCircle2, XCircle, QrCode, AlertTriangle } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

interface QRVerificationProps {
  onNavigate: (page: string) => void;
}

export function QRVerification({ onNavigate }: QRVerificationProps) {
  const [scannerOpen, setScannerOpen] = useState(false);
  const [verificationResult, setVerificationResult] = useState<"success" | "failed" | null>(null);

  const handleScan = () => {
    setScannerOpen(true);
    // Simulate scanning after 2 seconds
    setTimeout(() => {
      setVerificationResult("success");
    }, 2000);
  };

  const resetScan = () => {
    setScannerOpen(false);
    setVerificationResult(null);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="w-full px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-4xl mb-2" style={{ color: "#F7A160" }}>
            Guide Identity Verification
          </h1>
          <p className="text-xl text-gray-600">
            Scan your guide's QR code to verify their identity before starting your tour
          </p>
        </div>

        {/* Guide Info */}
        <Card className="mb-8 shadow-lg">
          <CardHeader>
            <CardTitle>Expected Guide for Your Trip</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-4">
              <Avatar className="w-20 h-20">
                <AvatarImage src="https://images.unsplash.com/photo-1641139984837-a8167f146c0d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0b3VyaXN0JTIwZ3VpZGUlMjBwb3J0cmFpdHxlbnwxfHx8fDE3NjA3NzU2MjF8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral" />
                <AvatarFallback>SM</AvatarFallback>
              </Avatar>
              <div>
                <h3 className="text-2xl mb-1">Sophie Martin</h3>
                <p className="text-gray-600">Licensed Paris Tour Guide</p>
                <p className="text-sm text-gray-500">Trip: Paris, France • June 15-17, 2025</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Verification Instructions */}
        <Card className="mb-8 shadow-lg">
          <CardHeader>
            <CardTitle>How to Verify</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-[#F7A160] text-white flex items-center justify-center flex-shrink-0">
                1
              </div>
              <div>
                <p className="mb-1">Meet your guide at the designated location</p>
                <p className="text-sm text-gray-600">Eiffel Tower main entrance at 9:00 AM</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-[#F7A160] text-white flex items-center justify-center flex-shrink-0">
                2
              </div>
              <div>
                <p>Ask your guide to show their SeranGo QR code</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-[#F7A160] text-white flex items-center justify-center flex-shrink-0">
                3
              </div>
              <div>
                <p>Click the button below to open the camera scanner</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-[#F7A160] text-white flex items-center justify-center flex-shrink-0">
                4
              </div>
              <div>
                <p>Scan their QR code to verify identity</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Scan Button */}
        <Card className="shadow-lg">
          <CardContent className="p-8 text-center">
            <div
              className="w-32 h-32 rounded-full mx-auto mb-6 flex items-center justify-center"
              style={{ backgroundColor: "#F7DC79" }}
            >
              <QrCode className="w-16 h-16" style={{ color: "#F7A160" }} />
            </div>
            <h3 className="text-2xl mb-4">Ready to Verify?</h3>
            <Button
              size="lg"
              className="text-lg px-8"
              style={{
                background: "linear-gradient(90deg, #F7A160 0%, #F7DC79 100%)",
              }}
              onClick={handleScan}
            >
              <Camera className="mr-2" />
              Open QR Scanner
            </Button>
          </CardContent>
        </Card>

        {/* Scanner Modal */}
        <Dialog open={scannerOpen} onOpenChange={setScannerOpen}>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>
                {verificationResult === null ? "Scanning QR Code..." : "Verification Result"}
              </DialogTitle>
            </DialogHeader>
            
            {verificationResult === null ? (
              <div className="py-8">
                <div className="w-64 h-64 mx-auto bg-gray-900 rounded-lg flex items-center justify-center relative overflow-hidden">
                  <div className="absolute inset-0 border-4 border-[#F7A160] opacity-50"></div>
                  <div className="absolute inset-8 border-2 border-white"></div>
                  <Camera className="w-12 h-12 text-white" />
                </div>
                <p className="text-center mt-4 text-gray-600">
                  Point your camera at the guide's QR code
                </p>
              </div>
            ) : verificationResult === "success" ? (
              <div className="py-8 text-center">
                <div className="w-24 h-24 rounded-full bg-yellow-100 mx-auto mb-4 flex items-center justify-center">
                  <CheckCircle2 className="w-12 h-12 text-yellow-600" />
                </div>
                <h3 className="text-2xl mb-2 text-yellow-600">Verification Successful!</h3>
                <p className="text-gray-600 mb-4">
                  Sophie Martin has been verified as your official guide
                </p>
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
                  <div className="flex items-center gap-3">
                    <Avatar className="w-12 h-12">
                      <AvatarImage src="https://images.unsplash.com/photo-1641139984837-a8167f146c0d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0b3VyaXN0JTIwZ3VpZGUlMjBwb3J0cmFpdHxlbnwxfHx8fDE3NjA3NzU2MjF8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral" />
                      <AvatarFallback>SM</AvatarFallback>
                    </Avatar>
                    <div className="text-left">
                      <p className="font-medium">Sophie Martin</p>
                      <p className="text-sm text-gray-600">License #FR-75-2018-042</p>
                    </div>
                  </div>
                </div>
                <Button
                  className="w-full"
                  style={{
                    background: "linear-gradient(90deg, #F7A160 0%, #F7DC79 100%)",
                  }}
                  onClick={() => {
                    resetScan();
                    onNavigate("dashboard");
                  }}
                >
                  Start Your Tour
                </Button>
              </div>
            ) : (
              <div className="py-8 text-center">
                <div className="w-24 h-24 rounded-full bg-red-100 mx-auto mb-4 flex items-center justify-center">
                  <XCircle className="w-12 h-12 text-red-600" />
                </div>
                <h3 className="text-2xl mb-2 text-red-600">Verification Failed</h3>
                <p className="text-gray-600 mb-6">
                  The QR code does not match your assigned guide. Please contact support if this is an error.
                </p>
                <div className="flex gap-3">
                  <Button variant="outline" className="flex-1" onClick={resetScan}>
                    Try Again
                  </Button>
                  <Button className="flex-1" onClick={() => onNavigate("chat")}>
                    Contact Guide
                  </Button>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
