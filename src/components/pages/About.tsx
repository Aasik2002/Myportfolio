import { motion } from 'framer-motion';
import { Download, FileText } from 'lucide-react';
import { SideNav } from '../ui/SideNav';
import type { PageName } from '../../types';
import profileImage from '../../assets/Profile image.png';

interface AboutProps {
    onNavigate: (page: PageName) => void;
}

export function About({ onNavigate }: AboutProps) {
    return (
        <div className="w-full h-full flex items-start md:items-center justify-center p-6 py-24 md:py-6 bg-gradient-to-br from-[#0A0A1A] to-[#12122A] overflow-y-auto">
            <SideNav activePage="about" onNavigate={onNavigate} />

            <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="ml-0 md:ml-32 max-w-4xl w-full bg-white/5 backdrop-blur-xl border border-white/10 p-8 md:p-12 rounded-3xl shadow-2xl relative overflow-hidden my-4 md:my-0"
            >
                {/* Glow Effects */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/20 rounded-full blur-[100px] pointer-events-none" />
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-500/20 rounded-full blur-[100px] pointer-events-none" />

                <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">

                    {/* Left Text and Buttons */}
                    <div className="space-y-6 text-center md:text-left flex flex-col items-center md:items-start">
                        <h2 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
                            About Me
                        </h2>
                        <h3 className="text-xl text-gray-300 font-medium">Front-End Developer | UI/UX Enthusiast</h3>

                        <p className="text-gray-400 leading-relaxed">
                            I specialize in Front-End Development, building responsive and interactive web applications using React.js, TypeScript, and Tailwind CSS. My technical skills are backed by a strong understanding of UI/UX design...
                        </p>

                        <div className="pt-4 flex flex-wrap justify-center md:justify-start gap-4">
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-full font-medium transition-colors shadow-lg shadow-blue-500/30"
                            >
                                <FileText size={18} />
                                Read More
                            </motion.button>

                            <motion.a
                                href="/resume.pdf"
                                download
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="flex items-center gap-2 px-6 py-3 bg-transparent border border-white/20 hover:bg-white/10 text-white rounded-full font-medium transition-colors"
                            >
                                <Download size={18} />
                                Download Resume
                            </motion.a>
                        </div>
                    </div>

                    {/* Right Image/Stats Column */}
                    <div className="flex flex-col items-center space-y-8">
                        {/* Photo Placeholder */}
                        <motion.div
                            whileHover={{ scale: 1.05, rotate: 2 }}
                            className="w-48 h-48 md:w-64 md:h-64 rounded-full border-4 border-white/10 p-2 relative"
                        >
                            <div className="w-full h-full rounded-full bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center overflow-hidden relative">
                                <img src={profileImage} alt="Ahemed Aasik" className="w-full h-full object-cover object-top rounded-full absolute inset-0 z-20" />
                            </div>
                        </motion.div>

                        {/* Quick Stats Grid */}
                        <div className="grid grid-cols-2 gap-4 w-full">
                            <div className="bg-white/5 border border-white/10 p-4 rounded-xl text-center backdrop-blur-sm">
                                <h4 className="text-3xl font-bold tracking-tighter text-blue-400">5+</h4>
                                <p className="text-xs text-gray-400 mt-1 uppercase tracking-wider">Projects</p>
                            </div>
                            <div className="bg-white/5 border border-white/10 p-4 rounded-xl text-center backdrop-blur-sm">
                                <h4 className="text-3xl font-bold tracking-tighter text-purple-400">2+</h4>
                                <p className="text-xs text-gray-400 mt-1 uppercase tracking-wider">Certifications</p>
                            </div>
                        </div>
                    </div>

                </div>
            </motion.div>
        </div>
    );
}
