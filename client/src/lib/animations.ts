import { Variants } from "framer-motion";

export const fadeIn = (delay: number = 0): Variants => ({
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      delay,
      duration: 0.5
    }
  }
});

export const fadeInUp = (delay: number = 0): Variants => ({
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      delay,
      duration: 0.5
    }
  }
});

export const staggeredChildren = (staggerTime: number = 0.1): Variants => ({
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: staggerTime
    }
  }
});

export const fadeInLeft = (delay: number = 0): Variants => ({
  hidden: { opacity: 0, x: -20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      delay,
      duration: 0.5
    }
  }
});

export const fadeInRight = (delay: number = 0): Variants => ({
  hidden: { opacity: 0, x: 20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      delay,
      duration: 0.5
    }
  }
});

export const scaleUp = (delay: number = 0): Variants => ({
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      delay,
      duration: 0.4
    }
  }
});

export const springFromTop = (delay: number = 0): Variants => ({
  hidden: { y: -50, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 24,
      delay
    }
  }
});

export const cardHover = {
  rest: {
    scale: 1,
    boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
    transition: {
      duration: 0.2,
      ease: "easeInOut"
    }
  },
  hover: {
    scale: 1.03,
    boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
    transition: {
      duration: 0.2,
      ease: "easeInOut"
    }
  }
};

export const slideInBottom = (delay: number = 0): Variants => ({
  hidden: { y: 100, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      delay,
      duration: 0.5,
      ease: "easeOut"
    }
  }
});
