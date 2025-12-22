export const scaleAnimation = {
  hover: { scale: 1.3 },
};

export const opacityAnimation = {
  hide: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 0.3 } },
};

export const fadeUpVariant = {
  initial: { opacity: 0, y: 50 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.5 },
  transition: { duration: 0.6 },
};

export const fadeInVariant = {
  initial: { opacity: 0 },
  whileInView: { opacity: 1 },
  viewport: { once: true, amount: 0.5 },
  transition: { duration: 0.6 },
};

export const procedureCard = {
  hidden: {
    opacity: 0,
    x: -50,
    y: 50,
  },
  visible: {
    opacity: 1,
    x: 0,
    y: 0,
    transition: {
      duration: 0.5,
      staggerChildren: 0.12,
    },
  },
  hover: {
    scale: 1.03,
    y: -6,
    transition: { type: 'spring', stiffness: 300, damping: 20 },
  },
};
