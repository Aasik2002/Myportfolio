import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SideNav } from '../ui/SideNav';
import type { PageName } from '../../types';
import { Settings, Globe2, Server, Database, Code, Shield } from 'lucide-react';

interface SkillsProps {
    onNavigate: (page: PageName) => void;
}

type SkillCategory = 'All' | 'Frontend' | 'Backend' | 'DevOps';

interface Skill {
    name: string;
    category: SkillCategory;
    icon: React.ElementType;
    color: string;
}

const SKILLS_DATA: Skill[] = [
    { name: 'HTML5', category: 'Frontend', icon: Globe2, color: 'text-orange-500' },
    { name: 'CSS3', category: 'Frontend', icon: Settings, color: 'text-blue-500' },
    { name: 'JavaScript', category: 'Frontend', icon: Code, color: 'text-yellow-400' },
    { name: 'React', category: 'Frontend', icon: Globe2, color: 'text-cyan-400' },
    { name: 'TypeScript', category: 'Frontend', icon: Code, color: 'text-blue-600' },
    { name: 'Node.js', category: 'Backend', icon: Server, color: 'text-green-500' },
    { name: 'MongoDB', category: 'Backend', icon: Database, color: 'text-green-600' },
    { name: 'Docker', category: 'DevOps', icon: Server, color: 'text-blue-400' },
    { name: 'AWS', category: 'DevOps', icon: Shield, color: 'text-orange-400' },
];

const CATEGORIES: { label: SkillCategory; icon: React.ElementType }[] = [
    { label: 'All', icon: Settings },
    { label: 'Frontend', icon: Globe2 },
    { label: 'Backend', icon: Server },
    { label: 'DevOps', icon: Database },
];

export function Skills({ onNavigate }: SkillsProps) {
    const [activeCategory, setActiveCategory] = useState<SkillCategory>('All');

    const filteredSkills = SKILLS_DATA.filter(
        (skill) => activeCategory === 'All' || skill.category === activeCategory
    );

    return (
        <div className="w-full h-full flex flex-col items-center justify-start p-6 pt-24 md:pt-16 bg-gradient-to-br from-[#0A0A1A] to-[#16163A] overflow-y-auto">
            <SideNav activePage="skills" onNavigate={onNavigate} />

            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-full max-w-4xl flex flex-col items-center text-center space-y-6 md:ml-20"
            >
                <h2 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">
                    My Skills
                </h2>
                <p className="text-gray-400 max-w-lg mb-8">
                    A curated list of technologies I use to build scalable web experiences.
                </p>

                {/* Filter Navigation */}
                <div className="flex flex-wrap justify-center gap-4 bg-white/5 p-2 rounded-2xl backdrop-blur-md border border-white/10 mb-8">
                    {CATEGORIES.map(({ label, icon: Icon }) => (
                        <button
                            key={label}
                            onClick={() => setActiveCategory(label)}
                            className={`relative px-4 py-2 flex flex-col items-center gap-2 rounded-xl text-sm font-medium transition-colors ${activeCategory === label ? 'text-white' : 'text-gray-400 hover:text-white'
                                }`}
                        >
                            {activeCategory === label && (
                                <motion.div
                                    layoutId="activeTab"
                                    className="absolute inset-0 bg-white/10 rounded-xl"
                                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                />
                            )}
                            <Icon size={18} className="relative z-10" />
                            <span className="relative z-10">{label}</span>
                        </button>
                    ))}
                </div>

                {/* Skills Grid with Layout Animations */}
                <motion.div layout className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 w-full pb-20">
                    <AnimatePresence mode="popLayout">
                        {filteredSkills.map((skill) => (
                            <motion.div
                                key={skill.name}
                                layout
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.8 }}
                                transition={{ duration: 0.3 }}
                                whileHover={{ y: -5, boxShadow: '0 10px 25px -5px rgba(59, 130, 246, 0.5)' }}
                                className="flex flex-col items-center justify-center p-6 bg-white/5 border border-white/10 rounded-2xl backdrop-blur-sm cursor-pointer shadow-lg"
                            >
                                <skill.icon size={40} className={`mb-3 ${skill.color} drop-shadow-[0_0_10px_rgba(255,255,255,0.2)]`} />
                                <span className="text-sm font-medium text-gray-200">{skill.name}</span>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </motion.div>
            </motion.div>
        </div>
    );
}
