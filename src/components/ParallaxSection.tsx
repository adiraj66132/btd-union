import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef, ReactNode } from 'react';

interface ParallaxSectionProps {
    children: ReactNode;
    offset?: number;
    className?: string;
    id?: string;
}

const ParallaxSection = ({ children, offset = 50, className = "", id = "" }: ParallaxSectionProps) => {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "end start"]
    });

    const y = useTransform(scrollYProgress, [0, 1], [-offset, offset]);
    const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

    return (
        <section ref={ref} id={id} className={`relative overflow-hidden ${className}`}>
            <motion.div style={{ y, opacity }} className="w-full h-full">
                {children}
            </motion.div>
        </section>
    );
};

export default ParallaxSection;
