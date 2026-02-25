import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, Github, X } from 'lucide-react';
import { SideNav } from '../ui/SideNav';
import { Magnetic } from '../ui/Magnetic';
import type { PageName } from '../../types';

interface ProjectsProps {
    onNavigate: (page: PageName) => void;
}

interface Project {
    id: string;
    title: string;
    description: string;
    image: string;
    tags: string[];
    githubUrl: string;
    liveUrl: string;
}

const PROJECTS_DATA: Project[] = [
    {
        id: '1',
        title: 'Smart Home Dashboard',
        description: 'A React-based dashboard for controlling IoT devices in a smart home environment. Features real-time state updates and dynamic energy consumption charts.',
        image: 'https://images.unsplash.com/photo-1558002038-1055907df827?auto=format&fit=crop&q=80&w=800',
        tags: ['React', 'TypeScript', 'Tailwind', 'Framwe Motion'],
        githubUrl: '#',
        liveUrl: '#',
    },
    {
        id: '2',
        title: 'Fintech Banking App',
        description: 'A modern, secure banking interface with complex animated transaction history and account management dashboards.',
        image: 'https://images.unsplash.com/photo-1563986768494-4dee2763ff0f?auto=format&fit=crop&q=80&w=800',
        tags: ['React Native', 'Zustand', 'Styled Components'],
        githubUrl: '#',
        liveUrl: '#',
    },
    {
        id: '3',
        title: 'Design Agency Portfolio',
        description: 'A highly interactive portfolio utilizing WebGL and Framer Motion for a stunning visual experience.',
        image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&q=80&w=800',
        tags: ['Vite', 'Three.js', 'Framer Motion'],
        githubUrl: '#',
        liveUrl: '#',
    }
];

export function Projects({ onNavigate }: ProjectsProps) {
    const [selectedProject, setSelectedProject] = useState<Project | null>(null);

    return (
        <div className="w-full h-full flex flex-col items-center justify-start p-6 pt-24 md:pt-16 bg-gradient-to-br from-[#0A0A1A] to-[#16163A] overflow-y-auto">
            <SideNav activePage="projects" onNavigate={onNavigate} />

            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6 }}
                className="w-full max-w-6xl flex flex-col mt-4 md:ml-16"
            >
                <div className="mb-10 text-center flex flex-col items-center">
                    <h2 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">
                        Featured Projects
                    </h2>
                    <p className="text-gray-400 mt-2 max-w-xl text-center">
                        A selection of my recent works highlighting complex UI challenges and performance optimizations.
                    </p>
                </div>

                {/* Project Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pb-20">
                    {PROJECTS_DATA.map((project, index) => (
                        <Magnetic key={project.id} intensity={0.15}>
                            <motion.div
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                onClick={() => setSelectedProject(project)}
                                className="group relative h-80 rounded-3xl overflow-hidden cursor-pointer bg-white/5 border border-white/10"
                            >
                                {/* Image Background */}
                                <div
                                    className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110 opacity-60 group-hover:opacity-100"
                                    style={{ backgroundImage: `url(${project.image})` }}
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent transition-opacity duration-300" />

                                {/* Content Overlay */}
                                <div className="absolute bottom-0 left-0 w-full p-6 translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                                    <h3 className="text-2xl font-bold text-white mb-2">{project.title}</h3>
                                    <div className="flex flex-wrap gap-2 mb-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100">
                                        {project.tags.slice(0, 3).map(tag => (
                                            <span key={tag} className="text-[10px] px-2 py-1 bg-white/20 backdrop-blur-md rounded-full text-blue-100">
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </motion.div>
                        </Magnetic>
                    ))}
                </div>
            </motion.div>

            {/* Modal / Expansion Effect */}
            <AnimatePresence>
                {selectedProject && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
                        onClick={() => setSelectedProject(null)}
                    >
                        <motion.div
                            layoutId={`project-${selectedProject.id}`}
                            initial={{ scale: 0.9, y: 50 }}
                            animate={{ scale: 1, y: 0 }}
                            exit={{ scale: 0.9, y: 50, opacity: 0 }}
                            transition={{ type: "spring", damping: 25, stiffness: 200 }}
                            className="bg-[#12122A] max-w-2xl w-full rounded-3xl overflow-hidden border border-white/10 shadow-2xl relative"
                            onClick={e => e.stopPropagation()}
                        >
                            <button
                                onClick={() => setSelectedProject(null)}
                                className="absolute top-4 right-4 z-10 w-10 h-10 flex items-center justify-center bg-black/50 hover:bg-black text-white rounded-full transition-colors backdrop-blur-md"
                            >
                                <X size={20} />
                            </button>

                            <div
                                className="w-full h-64 bg-cover bg-center"
                                style={{ backgroundImage: `url(${selectedProject.image})` }}
                            />

                            <div className="p-8">
                                <h2 className="text-3xl font-bold text-white mb-4">{selectedProject.title}</h2>
                                <div className="flex flex-wrap gap-2 mb-6">
                                    {selectedProject.tags.map(tag => (
                                        <span key={tag} className="text-xs px-3 py-1 bg-blue-500/20 text-blue-300 rounded-full border border-blue-500/30">
                                            {tag}
                                        </span>
                                    ))}
                                </div>

                                <p className="text-gray-300 leading-relaxed mb-8">
                                    {selectedProject.description}
                                    <br /><br />
                                    This project was built with a focus on comprehensive component architecture, rigorous typed interfaces, and fluid animations for an optimal user experience.
                                </p>

                                <div className="flex gap-4">
                                    <a href={selectedProject.githubUrl} target="_blank" rel="noreferrer" className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-white/10 hover:bg-white/20 text-white rounded-xl transition-colors font-medium">
                                        <Github size={18} /> Source Code
                                    </a>
                                    <a href={selectedProject.liveUrl} target="_blank" rel="noreferrer" className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl transition-colors font-medium">
                                        <ExternalLink size={18} /> Live Demo
                                    </a>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
