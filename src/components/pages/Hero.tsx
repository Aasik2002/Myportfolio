import { useState, useEffect } from 'react';
import { motion, useMotionValue, useSpring, useTransform, MotionValue } from 'framer-motion';
import { CircularNav } from '../ui/CircularNav';
import type { PageName } from '../../types';

interface HeroProps {
    onNavigate: (page: PageName) => void;
}

interface ParticleData {
    id: number;
    x: number;
    y: number;
    size: number;
    depth: number;
    opacity: number;
}

const Particle = ({ p, mouseX, mouseY }: { p: ParticleData, mouseX: MotionValue<number>, mouseY: MotionValue<number> }) => {
    // Parallax effect based on mouse movement and particle depth
    const xOffset = useTransform(mouseX, [-1, 1], [-p.depth * 25, p.depth * 25]);
    const yOffset = useTransform(mouseY, [-1, 1], [-p.depth * 25, p.depth * 25]);

    // Add spring for smooth, floating follow effect
    const smoothX = useSpring(xOffset, { stiffness: 40, damping: 20 });
    const smoothY = useSpring(yOffset, { stiffness: 40, damping: 20 });

    return (
        <motion.div
            className="absolute bg-blue-400 rounded-full"
            style={{
                left: `${p.x}%`,
                top: `${p.y}%`,
                width: p.size,
                height: p.size,
                opacity: p.opacity,
                x: smoothX,
                y: smoothY,
            }}
        />
    );
};

export function Hero({ onNavigate }: HeroProps) {
    const [typedTitle, setTypedTitle] = useState('');
    const fullTitle = "Front-End Developer | React Specialist";

    const [particles, setParticles] = useState<ParticleData[]>([]);
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const handleMouseMove = (e: React.MouseEvent) => {
        const { clientX, clientY } = e;
        const { innerWidth, innerHeight } = window;
        // Normalize coordinates to -1 -> 1
        const x = (clientX / innerWidth) * 2 - 1;
        const y = (clientY / innerHeight) * 2 - 1;
        mouseX.set(x);
        mouseY.set(y);
    };

    useEffect(() => {
        // Generate particles randomly only on mount to prevent hydration or re-render shifts
        const generatedParticles = Array.from({ length: 45 }).map((_, i) => ({
            id: i,
            x: Math.random() * 100,
            y: Math.random() * 100,
            size: Math.random() * 6 + 2,
            depth: Math.random() * 4 + 0.5,
            opacity: Math.random() * 0.4 + 0.1,
        }));
        setParticles(generatedParticles);
    }, []);

    // Typing Effect
    useEffect(() => {
        let i = 0;
        const typingInterval = setInterval(() => {
            if (i < fullTitle.length) {
                setTypedTitle(fullTitle.slice(0, i + 1));
                i++;
            } else {
                clearInterval(typingInterval);
            }
        }, 50);

        return () => clearInterval(typingInterval);
    }, []);

    return (
        <div
            className="w-full h-full flex flex-col md:flex-row items-center justify-between px-6 md:px-24 relative overflow-hidden"
            onMouseMove={handleMouseMove}
            onMouseLeave={() => { mouseX.set(0); mouseY.set(0); }}
        >
            {/* Particles Background */}
            <div className="absolute inset-0 pointer-events-none z-0">
                {particles.map((p) => (
                    <Particle key={p.id} p={p} mouseX={mouseX} mouseY={mouseY} />
                ))}
            </div>

            {/* Left: Text Content */}
            <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="flex-1 flex flex-col items-start justify-center mt-20 md:mt-0 text-left space-y-4 z-10"
            >
                <h2 className="text-xl md:text-2xl text-blue-400 font-medium mt-8 md:mt-0">Hey I'm,</h2>
                <h1 className="text-5xl md:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600 tracking-tight">
                    Ahemed Aasik
                </h1>

                {/* Dynamic Typing Title */}
                <h3 className="text-lg md:text-2xl font-mono text-gray-300 h-[32px]">
                    {typedTitle}
                    <motion.span
                        animate={{ opacity: [0, 1, 0] }}
                        transition={{ repeat: Infinity, duration: 0.8 }}
                        className="inline-block w-[2px] h-[1em] ml-1 bg-blue-500 align-middle"
                    />
                </h3>

                <p className="max-w-md text-gray-400 mt-6 leading-relaxed text-sm md:text-base">
                    A BICT Undergraduate crafting scalable front-end applications with a focus on clean code and user-centric design.
                </p>
            </motion.div>

            {/* Right: Circular Navigation */}
            <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1, delay: 0.3, type: "spring" }}
                className="flex-1 flex items-center justify-center mt-2 md:mt-0 z-10"
            >
                <CircularNav activePage="hero" onNavigate={onNavigate} />
            </motion.div>

        </div>
    );
}
