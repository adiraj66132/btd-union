import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef, ReactNode, useEffect, useState } from 'react';

interface ParallaxSectionProps {
    children: ReactNode;
    offset?: number;
    className?: string;
    id?: string;
}

const ParallaxSection = ({ children, offset = 30, className = "", id = "" }: ParallaxSectionProps) => {
    const ref = useRef(null);
    const [isInView, setIsInView] = useState(false);
    
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "end start"]
    });

    const y = useTransform(scrollYProgress, [0, 1], [-offset, offset]);
    const opacity = useTransform(scrollYProgress, [0, 0.1, 0.9, 1], [0.3, 1, 1, 0.3]);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => setIsInView(entry.isIntersecting),
            { threshold: 0.1, rootMargin: "50px" }
        );
        if (ref.current) observer.observe(ref.current);
        return () => observer.disconnect();
    }, []);

    return (
        <section ref={ref} id={id} className={`relative overflow-hidden ${className}`}>
            <motion.div 
                style={{ y: isInView ? y : 0, opacity: isInView ? opacity : 0.3 }} 
                className="w-full h-full"
                transition={{ type: "tween", duration: 0.3 }}
            >
                {children}
            </motion.div>
        </section>
    );
};

export default ParallaxSection;
