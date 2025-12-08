import { useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "../ui/card";
import { ArrowLeft, Shield, User, Globe } from "lucide-react";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { Separator } from "../ui/separator";
import logoImage from "../../assets/logo.png";

interface SignupPageProps {
  onNavigate: (page: string) => void;
}

export function SignupPage({ onNavigate }: SignupPageProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "tourist",
  });

  const roles = [
    {
      id: "tourist",
      label: "Tourist",
      description: "Local traveler",
      icon: User,
      color: "#F7A160",
    },
    {
      id: "guide",
      label: "Guide",
      description: "Local guide offering tours",
      icon: Globe,
      color: "#F7A160",
    },
    {
      id: "admin",
      label: "Admin",
      description: "Platform management",
      icon: Shield,
      color: "#F7DC79",
    },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate signup
    if (formData.role === "admin") {
      onNavigate("admin-dashboard");
    } else if (formData.role === "guide") {
      onNavigate("guide-dashboard");
    } else {
      onNavigate("home");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full">
        {/* Back Button */}
        <Button
          variant="ghost"
          className="mb-6"
          onClick={() => onNavigate("role-selection")}
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Role Selection
        </Button>

        {/* Logo */}
        <div className="text-center mb-8">
          <div className="flex justify-center">
            <img 
              src={logoImage} 
              alt="SeranGo" 
              className="h-24 w-auto"
            />
          </div>
        </div>

        <Card className="shadow-xl">
          <CardHeader>
            <CardTitle className="text-2xl">Create Your Account</CardTitle>
            <CardDescription>Join thousands of travelers and guides</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Role Selection */}
              <div className="space-y-3">
                <Label>I am a...</Label>
                <RadioGroup
                  value={formData.role}
                  onValueChange={(value) => setFormData({ ...formData, role: value })}
                >
                  {roles.map((role) => {
                    const Icon = role.icon;
                    return (
                      <div
                        key={role.id}
                        className="flex items-center space-x-3 border rounded-lg p-4 cursor-pointer hover:bg-gray-50 transition-colors"
                      >
                        <RadioGroupItem value={role.id} id={role.id} />
                        <div 
                          className="w-10 h-10 rounded-lg flex items-center justify-center"
                          style={{ backgroundColor: role.color + "20" }}
                        >
                          <Icon className="w-5 h-5" style={{ color: role.color }} />
                        </div>
                        <label htmlFor={role.id} className="flex-1 cursor-pointer">
                          <p className="font-medium">{role.label}</p>
                          <p className="text-sm text-gray-600">{role.description}</p>
                        </label>
                      </div>
                    );
                  })}
                </RadioGroup>
              </div>

              <Separator />

              {/* Form Fields */}
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    type="text"
                    placeholder="John Doe"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="you@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="password">Password</Label>
                    <Input
                      id="password"
                      type="password"
                      placeholder="••••••••"
                      value={formData.password}
                      onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword">Confirm Password</Label>
                    <Input
                      id="confirmPassword"
                      type="password"
                      placeholder="••••••••"
                      value={formData.confirmPassword}
                      onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                      required
                    />
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-2">
                <input type="checkbox" required className="mt-1 rounded" />
                <label className="text-sm text-gray-600">
                  I agree to the Terms of Service and Privacy Policy
                </label>
              </div>

              <Button
                type="submit"
                className="w-full py-6 text-lg"
                style={{
                  background: "linear-gradient(90deg, #F7A160 0%, #F7DC79 100%)",
                }}
              >
                Create Account
              </Button>

              <Separator />

              <div className="text-center">
                <span className="text-gray-600">Already have an account? </span>
                <Button
                  variant="link"
                  className="p-0 h-auto"
                  style={{ color: "#F7A160" }}
                  onClick={() => onNavigate("login")}
                >
                  Sign in
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
