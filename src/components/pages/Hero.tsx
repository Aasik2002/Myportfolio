import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { CircularNav } from '../ui/CircularNav';
import type { PageName } from '../../types';

interface HeroProps {
    onNavigate: (page: PageName) => void;
}

export function Hero({ onNavigate }: HeroProps) {
    const [typedTitle, setTypedTitle] = useState('');
    const fullTitle = "Front-End Developer | React Specialist";

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
        <div className="w-full h-full flex flex-col md:flex-row items-center justify-between px-6 md:px-24">

            {/* Left: Text Content */}
            <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="flex-1 flex flex-col items-start justify-center mt-20 md:mt-0 text-left space-y-4"
            >
                <h2 className="text-xl md:text-2xl text-blue-400 font-medium">Hey I'm,</h2>
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
                className="flex-1 flex items-center justify-center mt-12 md:mt-0"
            >
                <CircularNav activePage="hero" onNavigate={onNavigate} />
            </motion.div>

        </div>
    );
}
