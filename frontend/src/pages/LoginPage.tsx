import { motion, useReducedMotion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

interface LoginResponse {
  token: string;
  user: {
    name: string;
    email: string;
  };
}

const LoginPage = () => {
  const navigate = useNavigate();
  const shouldReduceMotion = useReducedMotion();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const animations = {
    container: {
      hidden: { opacity: 0 },
      visible: {
        opacity: 1,
        transition: {
          when: "beforeChildren",
          staggerChildren: 0.1,
          ease: [0.25, 0.1, 0.25, 1],
          duration: 0.9,
        },
      },
    },
    field: {
      hidden: {
        opacity: 0,
        y: 20,
      },
      visible: {
        opacity: 1,
        y: 0,
        transition: {
          duration: 0.4,
          ease: [0.25, 0.1, 0.25, 1],
        },
      },
    },
    button: {
      hidden: { opacity: 0, scale: 0.9 },
      visible: {
        opacity: 1,
        scale: 1,
        transition: {
          type: "spring",
          stiffness: 90,
          damping: 17,
        },
      },
      hover: {
        scale: 1.05,
        transition: { duration: 0.25, ease: "easeInOut" },
      },
    },
  };

  const [ref, inView] = useInView({
    threshold: 0.2,
    triggerOnce: true,
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await axios.post<LoginResponse>(
        "http://localhost:5000/api/auth/login",
        formData
      );

      localStorage.setItem("token", response.data.token);
      localStorage.setItem("user", JSON.stringify(response.data.user));
      
      toast.success("Login successful!");
      navigate("/");
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Login failed");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section
      ref={ref}
      className="min-h-[85vh] mt-10 flex items-center justify-center py-4 px-6 sm:px-8"
    >
      <div className="max-w-md w-full">
        <Card className="backdrop-blur-sm bg-white/80 shadow-xl border border-gray-200/50 rounded-2xl overflow-hidden">
          <CardContent className="p-6 sm:p-8">
            <motion.div
              variants={animations.container}
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
              className="space-y-6"
            >
              <motion.h2
                variants={animations.field}
                className="text-2xl sm:text-3xl font-bold text-center"
              >
                Welcome Back
              </motion.h2>
              <motion.p
                variants={animations.field}
                className="text-gray-600 text-center"
              >
                Login to continue to your account
              </motion.p>
              <motion.form
                variants={animations.container}
                className="space-y-4"
                onSubmit={handleSubmit}
              >
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    type="email"
                    id="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="Enter your email"
                    className="mt-1"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="password">Password</Label>
                  <Input
                    type="password"
                    id="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    placeholder="Enter your password"
                    className="mt-1"
                    required
                  />
                </div>
                <motion.div
                  variants={animations.button}
                  whileHover="hover"
                  whileTap={{ scale: 0.95 }}
                >
                  <Button
                    type="submit"
                    size="lg"
                    className="w-full bg-blue-600 hover:bg-blue-700"
                    disabled={isLoading}
                  >
                    {isLoading ? "Logging in..." : "Login"}
                  </Button>
                </motion.div>
              </motion.form>
              <motion.div
                variants={animations.field}
                className="text-center text-sm text-gray-600"
              >
                Don't have an account?{" "}
                <a
                  href="/signup"
                  className="text-blue-600 hover:underline font-medium"
                >
                  Sign up
                </a>
              </motion.div>
            </motion.div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default LoginPage;