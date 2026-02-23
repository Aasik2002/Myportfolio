import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { User, Code2, Briefcase, Mail, Fingerprint } from 'lucide-react';
import type { PageName } from '../../types';

interface NavItem {
    id: PageName;
    label: string;
    icon: React.ElementType;
}

const NAV_ITEMS: NavItem[] = [
    { id: 'about', label: 'About', icon: User },
    { id: 'skills', label: 'Skills', icon: Code2 },
    { id: 'projects', label: 'Work', icon: Briefcase },
    { id: 'contact', label: 'Contact', icon: Mail },
];

interface CircularNavProps {
    activePage: PageName;
    onNavigate: (page: PageName) => void;
}

export function CircularNav({ activePage, onNavigate }: CircularNavProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [radius, setRadius] = useState(120);

    // Responsive radius
    useEffect(() => {
        const handleResize = () => {
            setRadius(window.innerWidth < 768 ? 90 : 120);
        };
        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const toggleNav = () => setIsOpen(!isOpen);

    return (
        <div className="relative flex items-center justify-center w-[300px] h-[300px] md:w-[400px] md:h-[400px]">
            {/* Central Hub */}
            <motion.button
                onClick={toggleNav}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="absolute z-50 flex flex-col items-center justify-center w-24 h-24 md:w-32 md:h-32 rounded-full bg-gradient-to-br from-blue-500/80 to-purple-600/80 backdrop-blur-md shadow-[0_0_30px_rgba(99,102,241,0.5)] border border-white/10 text-white"
            >
                <Fingerprint size={32} strokeWidth={1.5} className="mb-1" />
                <span className="text-xs font-bold tracking-widest">MENU</span>
            </motion.button>

            {/* Orbital Items */}
            <AnimatePresence>
                {isOpen &&
                    NAV_ITEMS.map((item, index) => {
                        // Calculate angle for each item perfectly distributed around a circle
                        // Start at top (-90 deg), distribute evenly based on number of items
                        const angleDeg = -90 + (360 / NAV_ITEMS.length) * index;
                        const angleRad = (angleDeg * Math.PI) / 180;

                        const x = Math.cos(angleRad) * radius;
                        const y = Math.sin(angleRad) * radius;

                        return (
                            <motion.button
                                key={item.id}
                                onClick={() => {
                                    onNavigate(item.id);
                                    // Optional: close nav on mobile after clicking
                                    if (window.innerWidth < 768) setIsOpen(false);
                                }}
                                initial={{ opacity: 0, x: 0, y: 0, scale: 0 }}
                                animate={{ opacity: 1, x, y, scale: 1 }}
                                exit={{ opacity: 0, x: 0, y: 0, scale: 0 }}
                                transition={{
                                    type: 'spring',
                                    stiffness: 260,
                                    damping: 20,
                                    delay: index * 0.05, // Staggered entrance
                                }}
                                whileHover={{ scale: 1.2, boxShadow: '0 0 20px rgba(255,255,255,0.4)' }}
                                whileTap={{ scale: 0.9 }}
                                className={`absolute z-40 flex flex-col items-center justify-center w-16 h-16 md:w-20 md:h-20 rounded-full backdrop-blur-md border border-white/20 transition-colors ${activePage === item.id
                                        ? 'bg-white/20 text-blue-300'
                                        : 'bg-white/5 text-gray-300 hover:bg-white/10 hover:text-white'
                                    }`}
                            >
                                <item.icon size={20} className="mb-1" />
                                <span className="text-[10px] md:text-xs font-medium">{item.label}</span>
                            </motion.button>
                        );
                    })}
            </AnimatePresence>

            {/* Decorative orbital rings */}
            <div className="absolute w-[60%] h-[60%] border border-white/5 rounded-full pointer-events-none" />
            <div className="absolute w-[80%] h-[80%] border border-white/5 rounded-full pointer-events-none" />
            <div className="absolute w-full h-full border border-white/5 rounded-full pointer-events-none" />
        </div>
    );
}
