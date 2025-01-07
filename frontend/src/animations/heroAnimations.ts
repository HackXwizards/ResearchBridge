export const heroAnimations = {
    container: {
      hidden: { opacity: 0 },
      visible: {
        opacity: 1,
        transition: {
          when: "beforeChildren",
          staggerChildren: 0.15,    
          ease: [0.25, 0.1, 0.25, 1],
          duration: 0.4,
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
        y: 50,
      },
      visible: {
        opacity: 1,
        scale: 1,
        rotate: 0,
        y: 0,
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
        y: -8,
        transition: {
          duration: 0.4,
          ease: [0.6, 0.01, -0.05, 0.95],
          y: {
            duration: 1,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut"
          }
        },
      },
      animate: {
        y: [-8, 8, -8],
        transition: {
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut"
        }
      }
    },
  };