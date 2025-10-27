export const scaleAnimation = {
  hover: { scale: 1.3 },
};

export const opacityAnimation = {
  hide: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 0.3 } },
};

export const procedureCard = {
  hidden: {
    opacity: 0,
    x: 50, // desde la derecha
    y: -50, // desde arriba // ligera rotación
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
