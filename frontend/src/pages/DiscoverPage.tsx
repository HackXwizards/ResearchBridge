import { motion, useReducedMotion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const DiscoverPage = () => {
  const shouldReduceMotion = useReducedMotion();

  const animations = {
    container: {
      hidden: { opacity: 0 },
      visible: {
        opacity: 1,
        transition: {
          when: "beforeChildren",
          staggerChildren: 0.15,
          ease: [0.25, 0.1, 0.25, 1],
          duration: 0.8,
        },
      },
    },

    text: {
      hidden: {
        opacity: 0,
        y: 30,
        filter: "blur(8px)",
      },
      visible: {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        transition: {
          duration: 0.6,
          ease: [0.25, 0.1, 0.25, 1],
        },
      },
    },

    badge: {
      hidden: { scale: 0.8, opacity: 0 },
      visible: {
        scale: 1,
        opacity: 1,
        transition: {
          type: "spring",
          stiffness: 100,
          damping: 15,
        },
      },
      hover: {
        scale: 1.05,
        transition: {
          duration: 0.2,
          ease: "easeInOut",
        },
      },
    },

    image: {
      hidden: {
        opacity: 0,
        scale: 0.9,
        rotate: -5,
      },
      visible: {
        opacity: 1,
        scale: 1,
        rotate: 0,
        transition: {
          type: "spring",
          stiffness: 100,
          damping: 20,
          duration: 0.8,
        },
      },
      hover: {
        scale: 1.02,
        rotate: 1,
        transition: {
          duration: 0.4,
          ease: [0.6, 0.01, -0.05, 0.95],
        },
      },
    },
  };

  const topics = [
    {
      title: "AI and Machine Learning",
      description:
        "Discover the latest trends and breakthroughs in AI and ML, and their applications in various fields.",
      tags: ["AI", "Machine Learning", "Technology"],
      link: "/discover/ai",
    },
    {
      title: "Sustainable Energy",
      description:
        "Explore the future of renewable energy, from solar power to wind and beyond.",
      tags: ["Energy", "Sustainability", "Innovation"],
      link: "/discover/energy",
    },
    {
      title: "Space Exploration",
      description:
        "Learn about the latest advancements in space exploration, including new missions and technologies.",
      tags: ["Space", "NASA", "Exploration"],
      link: "/discover/space",
    },
    {
      title: "Health and Medicine",
      description:
        "Dive into the cutting-edge research in healthcare and medical advancements for a healthier future.",
      tags: ["Health", "Medicine", "Research"],
      link: "/discover/health",
    },
    {
      title: "Quantum Computing",
      description:
        "Unlock the mysteries of quantum mechanics and explore the potential of quantum computing.",
      tags: ["Quantum Computing", "Physics", "Tech"],
      link: "/discover/quantum",
    },
    {
      title: "Blockchain and Cryptocurrencies",
      description:
        "Discover how blockchain technology is reshaping the financial landscape and other industries.",
      tags: ["Blockchain", "Cryptocurrency", "Finance"],
      link: "/discover/blockchain",
    },
    // Add more topics as necessary
  ];

  const [ref, inView] = useInView({
    threshold: 0.2,
    triggerOnce: true,
  });

  return (
    <section
      ref={ref}
      className="relative min-h-[85vh] flex flex-col items-center justify-center py-10 px-4 sm:px-6 lg:px-8"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-teal-50/50 to-white/80 -z-10" />

      <div className="max-w-7xl mx-auto w-full">
        <Card className="relative backdrop-blur-sm bg-white/80 shadow-xl border border-gray-200/50 rounded-2xl overflow-hidden">
          <CardContent className="p-8 lg:p-12">
            <motion.div
              variants={animations.container}
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
              className="grid gap-12 items-center"
            >
              {/* Page Title */}
              <div className="space-y-8">
                <motion.div variants={animations.text} className="relative">
                  <h1 className="text-4xl lg:text-6xl xl:text-7xl font-bold">
                    Discover{" "}
                    <motion.span
                      className="inline-block text-teal-600"
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
                      New Topics
                    </motion.span>
                  </h1>
                </motion.div>

                <motion.p
                  variants={animations.text}
                  className="text-xl text-gray-600"
                >
                  Explore a wide range of topics and research areas to expand
                  your knowledge and collaborate with experts.
                </motion.p>
              </div>

              {/* Topics Grid */}
              <motion.div
                variants={animations.container}
                className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8"
              >
                {topics.map((topic) => (
                  <motion.div
                    key={topic.title}
                    variants={animations.container}
                    className="group"
                  >
                    <Card className="hover:shadow-xl transition-all">
                      <CardContent className="space-y-4 p-6">
                        <motion.div variants={animations.text}>
                          <h2 className="text-2xl font-semibold text-gray-800">
                            {topic.title}
                          </h2>
                        </motion.div>
                        <motion.p
                          variants={animations.text}
                          className="text-gray-500"
                        >
                          {topic.description}
                        </motion.p>
                        <motion.div
                          variants={animations.badge}
                          className="flex gap-2 mt-4"
                        >
                          {topic.tags.map((tag) => (
                            <motion.div
                              key={tag}
                              variants={animations.badge}
                              whileHover="hover"
                              whileTap={{ scale: 0.95 }}
                            >
                              <Badge
                                variant="secondary"
                                className="bg-teal-50 text-teal-700 hover:bg-teal-100"
                              >
                                {tag}
                              </Badge>
                            </motion.div>
                          ))}
                        </motion.div>
                        <motion.div
                          className="mt-4 flex justify-center"
                          variants={animations.text}
                        >
                          <Button
                            size="sm"
                            className="bg-teal-600 hover:bg-teal-700"
                          >
                            Learn More
                          </Button>
                        </motion.div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default DiscoverPage;
