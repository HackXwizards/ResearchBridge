import { motion, useReducedMotion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const LoginPage = () => {
  const shouldReduceMotion = useReducedMotion();

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
              >
                  <Label htmlFor="email">Email</Label>
                  <Input
                    type="email"
                    id="email"
                    placeholder="Enter your email"
                    className="mt-1"
                  />
                  <Label htmlFor="password">Password</Label>
                  <Input
                    type="password"
                    id="password"
                    placeholder="Enter your password"
                    className="mt-1"
                  />
                <motion.div
                  variants={animations.button}
                  whileHover="hover"
                  whileTap={{ scale: 0.95 }}
                >
                  <Button
                    size="lg"
                    className="w-full bg-blue-600 hover:bg-blue-700"
                  >
                    Login
                  </Button>
                </motion.div>
              </motion.form>
              <motion.div
                variants={animations.field}
                className="text-center text-sm text-gray-600"
              >
                Don’t have an account?{" "}
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
