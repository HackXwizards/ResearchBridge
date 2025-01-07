import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { heroAnimations } from "@/animations/heroAnimations";

const Hero = () => {
  // const shouldReduceMotion = useReducedMotion();

  


  const features = [
    "Connect with Researchers",
    "Share Publications",
    "Collaborate on Projects",
    "Access Datasets",
  ];

  const [ref, inView] = useInView({
    threshold: 0.2,
    triggerOnce: true,
  });

  return (
    <section
      ref={ref}
      className="relative min-h-[90vh] md:min-h-[85vh] flex items-center justify-center  sm:px-6 lg:px-8"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-blue-50/50 to-white/80 -z-10" />

      <div className="w-full lg:max-w-7xl mx-auto">
        <Card className="relative backdrop-blur-sm bg-white/80 shadow-xl border border-gray-200/50 rounded-lg md:rounded-2xl overflow-hidden">
          <CardContent className="w-full p-4 sm:p-6 md:p-8 lg:p-12">
            <motion.div
              variants={heroAnimations.container}
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
              className="grid lg:grid-cols-2 gap-6 md:gap-8 lg:gap-12 items-center"
            >
              {/* Content Side */}
              <div className="space-y-4 md:space-y-6 lg:space-y-8">
                <motion.div variants={heroAnimations.text} className="relative">
                  <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-6xl xl:text-7xl font-bold leading-tight text-center lg:text-left">
                    Connect, Collaborate,{" "}
                    <motion.span
                      className="inline-block text-blue-600"
                      animate={{
                        opacity: [0.7, 1],
                        scale: [0.98, 1],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        repeatType: "reverse",
                      }}
                    >
                      Innovate
                    </motion.span>
                  </h1>
                </motion.div>

                <motion.p
                  variants={heroAnimations.text}
                  className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-600 text-center lg:text-left"
                >
                  Your gateway to academic collaboration and research networking...
                </motion.p>

                <motion.div
                  className="flex flex-wrap gap-2 justify-center lg:justify-start"
                  variants={heroAnimations.container}
                >
                  {features.map((feature) => (
                    <motion.div
                      key={feature}
                      variants={heroAnimations.badge}
                      whileHover="hover"
                      whileTap={{ scale: 0.95 }}
                    >
                      <Badge
                        variant="secondary"
                        className="bg-blue-50 text-blue-700 hover:bg-blue-100 px-2 py-0.5 text-xs sm:text-sm sm:px-3 sm:py-1"
                      >
                        {feature}
                      </Badge>
                    </motion.div>
                  ))}
                </motion.div>

                <motion.div
                  variants={heroAnimations.text}
                  className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center lg:justify-start"
                >
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    transition={{ type: "spring", stiffness: 400, damping: 17 }}
                    className="w-full sm:w-auto"
                  >
                    <Button 
                      size="lg" 
                      className="bg-blue-600 hover:bg-blue-700 w-full text-sm sm:text-base"
                    >
                      Get Started
                    </Button>
                  </motion.div>
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    transition={{ type: "spring", stiffness: 400, damping: 17 }}
                    className="w-full sm:w-auto"
                  >
                    <Button 
                      size="lg" 
                      variant="outline" 
                      className="w-full text-sm sm:text-base"
                    >
                      Learn More
                    </Button>
                  </motion.div>
                </motion.div>
              </div>

              {/* Image Side - improved mobile presentation */}
              <motion.div
                variants={heroAnimations.image}
                className="relative mt-6 md:mt-8 lg:mt-0 px-4 sm:px-6 lg:px-0"
                // whileHover={shouldReduceMotion ? {} : "hover"}
                animate="animate"
              >
                <div className="absolute inset-0 bg-blue-400/20 blur-3xl rounded-full transform -translate-y-1/2" />
                
                <img
                  src="/hero.png"
                  alt="Research Collaboration"
                  loading="eager"
                  fetchpriority="high"
                  width={640}
                  height={480}
                  className="w-full h-auto max-w-md mx-auto relative z-10"
                />
              </motion.div>
            </motion.div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default Hero;

