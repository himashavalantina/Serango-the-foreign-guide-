import { useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "../ui/card";
import { ArrowLeft, Shield, User, Globe } from "lucide-react";
import { Separator } from "../ui/separator";
import logoImage from "../../assets/logo.png";

import "./LoginPage.css";

interface LoginPageProps {
  role?: string;
  onNavigate: (page: string) => void;
}

export function LoginPage({ role = "tourist", onNavigate }: LoginPageProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const roleConfig = {
    tourist: { icon: User, label: "Tourist", color: "#F7A160" },
    guide: { icon: Globe, label: "Guide", color: "#F7DC79" },
    admin: { icon: Shield, label: "Admin", color: "#F7DC79" },
  };

  const config = roleConfig[role as keyof typeof roleConfig] || roleConfig.tourist;
  const Icon = config.icon;

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (role === "admin") onNavigate("admin-dashboard");
    else if (role === "guide") onNavigate("guide-dashboard");
    else onNavigate("home");
  };

  return (
      <div className="login-page">
        <div className="login-container">
          {/* Back Button */}
          <Button
              variant="ghost"
              className="back-button"
              onClick={() => onNavigate("role-selection")}
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Change Role
          </Button>

          {/* Logo */}
          <div className="logo">
            <img src={logoImage} alt="SeranGo" className="h-24 w-auto" />
          </div>

          <Card className="login-card">
            <CardHeader>
              <div className="flex items-center gap-3 mb-2">
                <div
                    className="w-12 h-12 rounded-lg flex items-center justify-center"
                    style={{ backgroundColor: config.color + "20" }}
                >
                  <Icon className="w-6 h-6" style={{ color: config.color }} />
                </div>
                <div>
                  <CardTitle className="text-2xl">Welcome Back</CardTitle>
                  <CardDescription>Login as {config.label}</CardDescription>
                </div>
              </div>
            </CardHeader>

            <CardContent>
              <form onSubmit={handleLogin} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                      id="email"
                      type="email"
                      placeholder="you@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <Input
                      id="password"
                      type="password"
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                  />
                </div>

                <div className="flex items-center justify-between">
                  <label className="flex items-center gap-2 text-sm cursor-pointer">
                    <input type="checkbox" className="rounded" />
                    Remember me
                  </label>
                  <Button variant="link" className="p-0 h-auto forgot-password">
                    Forgot password?
                  </Button>
                </div>

                <Button type="submit" className="submit-btn">
                  Sign In
                </Button>

                <Separator />

                <div className="text-center">
                  <span className="text-gray-600">Don't have an account? </span>
                  <Button
                      variant="link"
                      className="signup-link"
                      onClick={() => onNavigate("signup")}
                  >
                    Sign up
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
  );
}

