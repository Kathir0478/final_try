export const framer = {
    "outerBoxVariant": {
        hidden: { y: -200, opacity: 0 },
        visible: { y: 0, opacity: 1, transition: { type: 'spring', stiffness: 150, mass: 0.8, damping: 15, when: "beforeChildren", staggerChildren: 0.1 } },
    },
    "innerBoxVariant": {
        hidden: { y: -100, opacity: 0 },
        visible: { y: 0, opacity: 1, transition: { type: 'spring', stiffness: 20 } }
    },
    "buttonOnHover": {
        hover: { scale: 1.2, transition: { duration: 0.5 } },
        hidden: { y: -100, opacity: 0 },
        visible: { y: 0, opacity: 1, transition: { type: 'spring', stiffness: 20 } }
    },
    "enterExitSideVariant": {
        hidden: { x: -100, opacity: 0 },
        visible: { x: 0, opacity: 1, transition: { type: 'spring', stiffness: 150, mass: 0.8, damping: 15 } },
        leave: { x: 100, opacity: 0, transition: { type: 'spring', stiffness: 150, mass: 0.8, damping: 15 } }
    },
    "fromBottomVariant": {
        hidden: { y: 100, opacity: 0 },
        visible: { y: 0, opacity: 1, transition: { type: 'spring', stiffness: 20 } }
    },
    "fromLeftVariant": {
        hidden: { x: -100, opacity: 0 },
        visible: { x: 0, opacity: 1, transition: { type: 'spring', stiffness: 20 } }
    },
    "fromRightVariant": {
        hidden: { x: 100, opacity: 0 },
        visible: { x: 0, opacity: 1, transition: { type: 'spring', stiffness: 20 } }
    },
    "leftouterBoxVariant": {
        hidden: { y: -200, opacity: 0 },
        visible: { y: 0, opacity: 1, transition: { type: 'spring', stiffness: 150, mass: 0.8, damping: 15, when: "beforeChildren", staggerChildren: 0.5 } },
    },
    "leftinnerBoxVariant": {
        hidden: { x: -100, opacity: 0 },
        visible: { x: 0, opacity: 1, transition: { type: 'spring', stiffness: 20 } }
    }
}