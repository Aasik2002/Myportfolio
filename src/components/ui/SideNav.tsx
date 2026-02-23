import { motion } from 'framer-motion';
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

interface SideNavProps {
    activePage: PageName;
    onNavigate: (page: PageName) => void;
}

export function SideNav({ activePage, onNavigate }: SideNavProps) {
    return (
        <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 flex flex-col items-center gap-6 z-50 p-4 rounded-3xl bg-white/5 backdrop-blur-md border border-white/10"
        >
            <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => onNavigate('hero')}
                className="w-12 h-12 flex items-center justify-center rounded-full bg-blue-600/80 text-white mb-4 shadow-lg shadow-blue-500/30"
            >
                <Fingerprint size={24} />
            </motion.button>

            {NAV_ITEMS.map((item) => {
                const isActive = activePage === item.id;
                return (
                    <motion.button
                        key={item.id}
                        whileHover={{ scale: 1.1, x: 5 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => onNavigate(item.id)}
                        className={`group relative w-10 h-10 flex items-center justify-center rounded-full transition-all duration-300 ${isActive
                                ? 'bg-white/20 text-blue-400'
                                : 'bg-transparent text-gray-400 hover:text-white hover:bg-white/10'
                            }`}
                    >
                        <item.icon size={20} />

                        {/* Tooltip */}
                        <span className="absolute left-full ml-4 px-2 py-1 rounded bg-black/80 text-xs font-medium text-white opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                            {item.label}
                        </span>
                    </motion.button>
                );
            })}
        </motion.div>
    );
}
