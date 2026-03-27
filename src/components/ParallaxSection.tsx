import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef, ReactNode, useEffect, useState, memo } from 'react';

interface ParallaxSectionProps {
    children: ReactNode;
    offset?: number;
    className?: string;
    id?: string;
}

const ParallaxSection = memo(({ children, offset = 30, className = "", id = "" }: ParallaxSectionProps) => {
    const ref = useRef<HTMLElement>(null);
    const [isInView, setIsInView] = useState(false);
    const observerRef = useRef<IntersectionObserver | null>(null);

    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "end start"]
    });

    const y = useTransform(scrollYProgress, [0, 1], [-offset, offset]);
    const opacity = useTransform(scrollYProgress, [0, 0.1, 0.9, 1], [0.3, 1, 1, 0.3]);

    useEffect(() => {
        const element = ref.current;
        if (!element) return;

        observerRef.current?.disconnect();

        observerRef.current = new IntersectionObserver(
            ([entry]) => setIsInView(entry.isIntersecting),
            { threshold: 0.1, rootMargin: "50px" }
        );

        observerRef.current.observe(element);

        return () => {
            observerRef.current?.disconnect();
        };
    }, [id]);

    return (
        <section ref={ref} id={id} className={`relative overflow-hidden content-visibility-auto ${className}`}>
            <motion.div
                style={{ y: isInView ? y : 0, opacity: isInView ? opacity : 0.3 }}
                className="w-full h-full"
                transition={{ type: "tween", duration: 0.3 }}
            >
                {children}
            </motion.div>
        </section>
    );
});

ParallaxSection.displayName = 'ParallaxSection';

export default ParallaxSection;
