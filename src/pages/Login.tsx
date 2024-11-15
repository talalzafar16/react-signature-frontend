import React, { useState } from "react";
import { SERVER_URL } from "../confidential";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import { TiVendorAndroid } from "react-icons/ti";
import { SiApple } from "react-icons/si";
import { CiUser } from "react-icons/ci";
import { CiLock } from "react-icons/ci";
import logo from "../assets/login/logo.svg";
import qrCode from "../assets/login/qr.png";

const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    const loginData = { email, password };

    try {
      const response = await fetch(`${SERVER_URL}users/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginData),
      });

      if (!response.ok) {
        throw new Error("Login failed");
      }

      const result = await response.json();
      console.log("Login successful:", result);
      localStorage.setItem("user", JSON.stringify(result.data.userData));
      navigate("/home/addProperty");
    } catch (err) {
      setError("Invalid email or password");
      console.error("Login error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex bg-white">
      {/* Left Column */}
      <div className="hidden lg:flex lg:w-1/2 flex-col justify-center h-screen p-10 from-white to-gray-100 bg-loginBg">
        <div>
          <h1 className="text-4xl font-bold text-primary mb-8 text-center">
            Welcome!
          </h1>
          <div className="w-full flex justify-center">
            <img src={logo} alt="Signature Lands Pvt. Ltd." className="mb-2" />
          </div>
          <div className="mb-2 w-full flex justify-center">
            <img src={qrCode} alt="QR Code" className="w-72 h-72" />
          </div>
        </div>
        <div className="flex justify-center gap-4">
          <Button
            variant="outline"
            className="justify-start text-primary border-primary py-5"
          >
            <SiApple className="mr-2" size={25} color="black" /> Download on IOS
          </Button>
          <Button
            variant="outline"
            className="justify-start text-primary border-primary py-5"
          >
            <TiVendorAndroid className="mr-2" size={25} color="black" />{" "}
            Download on Android
          </Button>
        </div>
      </div>

      {/* Right Column */}
      <div className="w-full lg:w-1/2 h-screen flex items-center justify-center p-8 bg-secondary">
        <div className="w-full max-w-md">
          <h2 className="text-3xl font-bold mb-8 text-center">Login</h2>
          <form className="space-y-6" onSubmit={handleLogin}>
            <div className="space-y-2">
              <Input
                id="email"
                type="email"
                placeholder="Email id or phone no"
                className="border-black py-5"
                icon={<CiUser />}
                value={email}
                required
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  className="border-black py-5"
                  value={password}
                  required
                  icon={<CiLock />}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 cursor-pointer"
                >
                  {showPassword ? (
                    <EyeOffIcon className="h-4 w-4" />
                  ) : (
                    <EyeIcon className="h-4 w-4" />
                  )}
                </button>
              </div>
            </div>
            {/* <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Switch id="terms" />
                <Label htmlFor="terms">Accept terms</Label>
              </div>
              <a
                href="#"
                className="text-sm text-black font-bold hover:underline"
              >
                Forgot password!
              </a>
            </div> */}
            {error && <p className="text-sm text-left text-red-500">{error}</p>}
            <Button
              type="submit"
              className="w-full bg-primary hover:bg-primaryHover py-5"
              disabled={loading}
            >
              Login
            </Button>
            {/* <Button className="w-full text-primary bg-transparent hover:bg-transparent py-5 border border-black">
              Register
            </Button> */}
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
