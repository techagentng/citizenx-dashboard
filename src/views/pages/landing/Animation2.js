import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import { motion, useAnimation } from 'framer-motion';

// =============================|| LANDING - FADE IN ANIMATION ||============================= //

function FadeInWhenVisible({ children, animationType, delay = 0 }) {
    const controls = useAnimation();
    const [ref, inView] = useInView();

    useEffect(() => {
        if (inView) {
            controls.start('visible');
        }
    }, [controls, inView]);

    const variants = {
        fadeIn: {
            visible: { opacity: 1, translateY: 0 },
            hidden: { opacity: 0, translateY: 275 }
        },
        fadeInLeft: {
            visible: { opacity: 1, translateX: 0 },
            hidden: { opacity: 0, translateX: -20 }
        },
        fadeInCenter: {
            visible: { opacity: 1, translateY: 0 },
            hidden: { opacity: 0, translateY: -20 }
        }
    };

    return (
        <motion.div
            ref={ref}
            animate={controls}
            initial="hidden"
            transition={{ duration: 0.3, delay }}
            variants={variants[animationType]}
        >
            {children}
        </motion.div>
    );
}

FadeInWhenVisible.propTypes = {
    children: PropTypes.node,
    animationType: PropTypes.oneOf(['fadeIn', 'fadeInLeft', 'fadeInCenter']),
    delay: PropTypes.number
};

export default FadeInWhenVisible;