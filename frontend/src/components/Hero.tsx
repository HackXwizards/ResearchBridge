import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { heroAnimations } from "@/animations/heroAnimations";
import { useInView } from "react-intersection-observer";

const Hero = () => {
  const [ref, inView] = useInView({
    threshold: 0.2,
    triggerOnce: true,
  });

  const features = [
    "Connect with Researchers",
    "Share Publications",
    "Collaborate on Projects",
    "Access Datasets",
  ];

  return (
    <section
      ref={ref}
      className="relative min-h-[90vh] md:min-h-[85vh] flex items-center justify-center"
    >
      {/* Background Illustrations */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="absolute inset-0 -z-10 overflow-hidden"
      >
        <motion.img
          src="./hero-document.png"
          alt="Research Document"
          className="absolute -right-20 top-20 w-72 opacity-20 md:opacity-30"
          animate={{
            y: [0, -20, 0],
            rotate: [0, 5, 0],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute -left-20 bottom-0 w-72 opacity-10 md:opacity-20"
          animate={{
            y: [0, 20, 0],
            rotate: [0, -5, 0],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <img
            src="./research-document.png"
            alt="Research Document"
            className="w-full h-auto transform -scale-x-100"
          />
        </motion.div>
      </motion.div>

      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative grid lg:grid-cols-2 gap-12 items-center">
          {/* Content Side */}
          <motion.div
            variants={heroAnimations.container}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            className="text-center lg:text-left"
          >
            <motion.div variants={heroAnimations.text} className="space-y-8 mt-12">
              <h1 className="text-6xl sm:text-7xl lg:text-[90px] font-bold tracking-tight">
                <span className="block mb-2">Connect</span>
                <span className="block text-blue-600 mb-2">Collaborate</span>
                <span className="block">Innovate</span>
              </h1>
              <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto lg:mx-0">
                Connect with researchers worldwide, share groundbreaking discoveries, and collaborate on projects that shape the future.
              </p>
            </motion.div>

            <motion.div
              variants={heroAnimations.container}
              className="mt-10 flex flex-wrap gap-4 justify-center lg:justify-start"
            >
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="bg-blue-50 px-6 py-2 rounded-lg text-blue-600 hover:bg-blue-100 transition-colors cursor-pointer"
              >
                Connect with Researchers
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="bg-blue-50 px-6 py-2 rounded-lg text-blue-600 hover:bg-blue-100 transition-colors cursor-pointer"
              >
                Share Publications
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="bg-blue-50 px-6 py-2 rounded-lg text-blue-600 hover:bg-blue-100 transition-colors cursor-pointer"
              >
                Collaborate on Projects
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="bg-blue-50 px-6 py-2 rounded-lg text-blue-600 hover:bg-blue-100 transition-colors cursor-pointer"
              >
                Access Datasets
              </motion.div>
            </motion.div>

            <motion.div
              variants={heroAnimations.text}
              className="mt-10 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
            >
              <Button
                size="lg"
                className="bg-blue-600 hover:bg-blue-700 text-base px-8 py-3 rounded-lg font-medium"
              >
                Get Started
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="text-base px-8 py-3 rounded-lg border-2 font-medium"
              >
                Learn More
              </Button>
            </motion.div>
          </motion.div>

          {/* Hero Image Side */}
          <motion.div
            variants={heroAnimations.image}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            className="relative lg:h-[600px] flex items-center justify-center"
          >
            <motion.div
              className="relative w-full max-w-lg"
              animate={{
                y: [0, -10, 0],
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <motion.div
                className="absolute -right-10 -top-10 w-40 h-40"
                animate={{
                  rotate: [0, 360],
                  scale: [1, 1.1, 1],
                }}
                transition={{
                  duration: 20,
                  repeat: Infinity,
                  ease: "linear",
                }}
              >
                <div className="w-full h-full bg-gradient-to-br from-blue-200/30 to-purple-200/30 rounded-full blur-2xl" />
              </motion.div>

              {/* Small decorative crosses */}
              {[...Array(4)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute text-cyan-300"
                  style={{
                    top: `${15 + i * 25}%`,
                    right: `-${15 + i * 8}%`,
                    transform: `scale(${0.7 - i * 0.15})`,
                  }}
                  animate={{
                    y: [0, -10, 0],
                    opacity: [0.3, 0.6, 0.3],
                  }}
                  transition={{
                    duration: 3 + i,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: i * 0.5,
                  }}
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 0L14.5 9.5L24 12L14.5 14.5L12 24L9.5 14.5L0 12L9.5 9.5L12 0Z" />
                  </svg>
                </motion.div>
              ))}

              {/* Main Image with Glow */}
              <div className="relative">
                <motion.div
                  className="absolute inset-0 bg-gradient-to-br from-green-400/20 via-blue-400/20 to-purple-400/20 rounded-3xl blur-3xl"
                  animate={{
                    scale: [1, 1.1, 1],
                    opacity: [0.3, 0.5, 0.3],
                  }}
                  transition={{
                    duration: 8,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />
                <img
                  src="./hero-research.png"
                  alt="Research Collaboration"
                  className="relative z-10 w-full h-auto"
                />
              </div>

              {/* Additional decorative elements */}
              <motion.div
                className="absolute -bottom-10 -left-10 w-32 h-32 bg-blue-100/30 rounded-full blur-2xl"
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.3, 0.5, 0.3],
                }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
