import { motion, useScroll, useTransform } from "framer-motion";
import Hero from "@/components/Hero";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import DiscoverPage from "./DiscoverPage";

const Homepage = () => {
  const { scrollYProgress } = useScroll();
  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <div className="relative min-h-screen overflow-hidden mt-10">
      {/* Animated background */}
      <div className="fixed inset-0 -z-10">
        <motion.div 
          className="absolute inset-0 bg-gradient-to-br from-blue-50/80 via-white to-purple-50/80"
          style={{ y: backgroundY }}
        />
      </div>

      {/* Main Content */}
      <main className="relative">
        <Hero />

        {/* How It Works Section */}
        <section className="py-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
          {/* Background decoration */}
          <motion.div 
            className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-50/30 to-transparent"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1 }}
          />
          <motion.div
            className="absolute left-0 top-1/3 w-72 h-72 bg-blue-200/20 rounded-full blur-3xl"
            animate={{
              x: [-20, 20, -20],
              y: [-20, 20, -20],
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          <motion.div
            className="absolute right-0 bottom-1/3 w-96 h-96 bg-purple-200/20 rounded-full blur-3xl"
            animate={{
              x: [20, -20, 20],
              y: [20, -20, 20],
              scale: [1.1, 1, 1.1],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />

          <div className="relative max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <motion.div
                initial={{ scale: 0.95 }}
                whileInView={{ scale: 1 }}
                transition={{ duration: 0.5 }}
              >
                <h2 className="text-3xl sm:text-4xl font-bold mb-4">
                  How ResearchBridge Works
                </h2>
                <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                  Connect, collaborate, and innovate with researchers worldwide in three simple steps
                </p>
              </motion.div>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-12 relative">
              {/* Animated Connecting Line */}
              <div className="hidden md:block absolute top-1/2 left-0 right-0 h-0.5 transform -translate-y-1/2 overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-blue-200 via-purple-200 to-blue-200"
                  initial={{ x: "-100%" }}
                  whileInView={{ x: "100%" }}
                  transition={{
                    duration: 2,
                    ease: "easeInOut",
                    repeat: Infinity,
                  }}
                />
              </div>

              {[
                {
                  step: "1",
                  title: "Create Your Profile",
                  description: "Set up your research profile and highlight your expertise",
                  image: "./profile-interface.png",
                  color: "from-blue-400/20 to-blue-500/20"
                },
                {
                  step: "2",
                  title: "Connect & Discover",
                  description: "Find researchers with similar interests and ongoing projects",
                  image: "./search-connect.png",
                  color: "from-purple-400/20 to-purple-500/20"
                },
                {
                  step: "3",
                  title: "Collaborate",
                  description: "Work together on groundbreaking research projects",
                  image: "./team-collaborate.png",
                  color: "from-blue-400/20 to-purple-500/20"
                },
              ].map((item, i) => (
                <motion.div
                  key={item.step}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.2 }}
                  className="relative group"
                >
                  <motion.div
                    className="absolute inset-0 bg-white rounded-2xl"
                    initial={false}
                    whileHover={{
                      scale: 1.02,
                      transition: { duration: 0.2 }
                    }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl"
                         style={{ backgroundImage: `linear-gradient(to bottom right, ${item.color})` }} />
                  </motion.div>
                  
                  <div className="relative z-10 bg-white rounded-2xl p-8 shadow-lg border border-gray-100 group-hover:shadow-2xl group-hover:border-gray-200 transition-all duration-300">
                    {/* Step number with glow effect */}
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                      <div className="relative">
                        <div className="absolute inset-0 bg-blue-400 rounded-full blur-md transform group-hover:scale-110 transition-transform duration-300" />
                        <div className="relative w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center text-sm font-bold">
                          {item.step}
                        </div>
                      </div>
                    </div>

                    {/* Image with hover effect */}
                    <div className="h-48 mb-6 flex items-center justify-center">
                      <motion.div
                        whileHover={{ scale: 1.05, rotate: [0, -2, 2, 0] }}
                        transition={{ duration: 0.3 }}
                      >
                        <motion.img
                          src={item.image}
                          alt={item.title}
                          className="w-40 h-40 object-contain"
                          initial={{ filter: "grayscale(20%)" }}
                          whileHover={{ 
                            filter: "grayscale(0%)",
                            scale: 1.05,
                          }}
                          transition={{ duration: 0.2 }}
                        />
                      </motion.div>
                    </div>

                    {/* Content with hover effect */}
                    <motion.div
                      initial={false}
                      whileHover={{ y: -2 }}
                      transition={{ duration: 0.2 }}
                    >
                      <h3 className="text-xl font-semibold mb-2 text-center group-hover:text-blue-600 transition-colors duration-300">
                        {item.title}
                      </h3>
                      <p className="text-gray-600 text-center group-hover:text-gray-700 transition-colors duration-300">
                        {item.description}
                      </p>
                    </motion.div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* <DiscoverPage /> */}

        {/* Testimonials Section */}
        <section className="py-24 px-4 sm:px-6 lg:px-8 relative">
          {/* Background decoration */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-50/50 to-transparent" />
          <div className="absolute left-0 top-1/2 transform -translate-y-1/2 w-24 h-24 bg-blue-500/10 rounded-full blur-3xl" />
          <div className="absolute right-0 top-1/3 transform -translate-y-1/2 w-32 h-32 bg-purple-500/10 rounded-full blur-3xl" />

          <div className="relative max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <span className="inline-block text-blue-600 font-semibold mb-2">TESTIMONIALS</span>
              <h2 className="text-3xl sm:text-4xl font-bold mb-4">
                Trusted by Leading Researchers
              </h2>
              <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                Join thousands of researchers who are already using ResearchBridge to accelerate their research collaborations
              </p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  quote: "ResearchBridge has transformed how we collaborate on research projects. The platform's intuitive interface and powerful tools have significantly accelerated our research timeline.",
                  author: "Dr. Sarah Chen",
                  role: "Senior Researcher, MIT",
                  image: "https://i.pravatar.cc/100?img=1",
                  stats: { papers: "23", collaborations: "12" }
                },
                {
                  quote: "The platform's AI-powered insights have been invaluable for our research. We've discovered collaboration opportunities we would have never found otherwise.",
                  author: "Prof. James Wilson",
                  role: "Department Head, Stanford",
                  image: "https://i.pravatar.cc/100?img=2",
                  stats: { papers: "45", collaborations: "18" }
                },
                {
                  quote: "Seamless collaboration tools that actually make sense for researchers. The ability to share and discuss research in real-time has been game-changing.",
                  author: "Dr. Maria Garcia",
                  role: "Lead Scientist, CERN",
                  image: "https://i.pravatar.cc/100?img=3",
                  stats: { papers: "31", collaborations: "15" }
                },
              ].map((testimonial, i) => (
                <motion.div
                  key={testimonial.author}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="group"
                >
                  <div className="relative bg-white rounded-2xl p-8 shadow-lg border border-gray-100 
                              hover:shadow-xl transition-all duration-300 h-full
                              hover:-translate-y-1"
                  >
                    {/* Decorative elements */}
                    <div className="absolute top-0 right-0 w-20 h-20 bg-blue-50 rounded-bl-full rounded-tr-2xl -z-10 
                                  group-hover:bg-blue-100 transition-colors duration-300" />
                    <div className="absolute bottom-0 left-0 w-16 h-16 bg-purple-50 rounded-tr-full rounded-bl-2xl -z-10
                                  group-hover:bg-purple-100 transition-colors duration-300" />

                    {/* Profile section */}
                    <div className="flex items-center gap-4 mb-6">
                      <div className="relative">
                        <div className="absolute inset-0 bg-blue-100 rounded-full blur-md transform group-hover:scale-110 transition-transform duration-300" />
                        <img
                          src={testimonial.image}
                          alt={testimonial.author}
                          className="relative w-16 h-16 rounded-full border-2 border-white shadow-md"
                        />
                      </div>
                      <div>
                        <h4 className="font-semibold text-lg">{testimonial.author}</h4>
                        <p className="text-sm text-gray-600">{testimonial.role}</p>
                      </div>
                    </div>

                    {/* Quote */}
                    <div className="mb-6 relative">
                      <div className="absolute -left-2 -top-2 text-4xl text-blue-200 font-serif">"</div>
                      <p className="text-gray-600 italic relative z-10 pl-4">
                        {testimonial.quote}
                      </p>
                      <div className="absolute -right-2 bottom-0 text-4xl text-blue-200 font-serif">"</div>
                    </div>

                    {/* Stats */}
                    <div className="flex justify-around pt-6 border-t border-gray-100">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-blue-600">{testimonial.stats.papers}</div>
                        <div className="text-sm text-gray-600">Papers</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-purple-600">{testimonial.stats.collaborations}</div>
                        <div className="text-sm text-gray-600">Collaborations</div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Trust indicators */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mt-16 pt-8 border-t border-gray-200"
            >
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                {[
                  { label: "Active Users", value: "10,000+" },
                  { label: "Research Papers", value: "50,000+" },
                  { label: "Collaborations", value: "25,000+" },
                  { label: "Institutions", value: "500+" },
                ].map((stat) => (
                  <div key={stat.label} className="text-center">
                    <div className="text-2xl md:text-3xl font-bold text-gray-900">{stat.value}</div>
                    <div className="text-sm text-gray-600">{stat.label}</div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

      </main>

      <Footer />
    </div>
  );
};

export default Homepage;
