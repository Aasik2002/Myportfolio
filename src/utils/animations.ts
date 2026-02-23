export const pageVariants = {
    initial: {
        opacity: 0,
        rotateY: -90,
        scale: 0.9,
    },
    in: {
        opacity: 1,
        rotateY: 0,
        scale: 1,
    },
    out: {
        opacity: 0,
        rotateY: 90,
        scale: 0.9,
    },
};

export const pageTransition = {
    type: 'spring' as const,
    stiffness: 100,
    damping: 20,
    mass: 1,
};
