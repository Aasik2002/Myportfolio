import { useState } from 'react';
import { motion } from 'framer-motion';
import { Send } from 'lucide-react';
import { SideNav } from '../ui/SideNav';
import { Magnetic } from '../ui/Magnetic';
import type { PageName } from '../../types';

interface ContactProps {
    onNavigate: (page: PageName) => void;
}

export function Contact({ onNavigate }: ContactProps) {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        service: '',
        message: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        // Simulate API call
        setTimeout(() => {
            setIsSubmitting(false);
            setFormData({ name: '', email: '', service: '', message: '' });
            alert('Message sent successfully!');
        }, 1500);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setFormData(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }));
    };

    return (
        <div className="w-full h-full flex flex-col items-center justify-start p-6 pt-24 md:pt-[10vh] bg-gradient-to-br from-[#0A0A1A] to-[#16163A] overflow-y-auto">
            <SideNav activePage="contact" onNavigate={onNavigate} />

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="w-full max-w-5xl flex flex-col md:ml-32 mt-4"
            >
                {/* Header */}
                <div className="mb-6 ml-2">
                    <h2 className="text-4xl md:text-5xl font-bold font-space-grotesk tracking-wide mb-2">
                        <span className="text-cyan-400">Contact</span>{' '}
                        <span className="text-blue-600">Me</span>
                    </h2>
                </div>

                {/* Main Card */}
                <div className="w-full bg-[#1b1e3d]/40 backdrop-blur-xl rounded-[1.5rem] border border-white/5 flex flex-col md:flex-row shadow-2xl relative overflow-hidden">

                    {/* Left: Form */}
                    <div className="flex-[2] p-8 md:p-10 relative z-10 w-full">
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {/* Name Input */}
                                <div className="space-y-2">
                                    <label htmlFor="name" className="block text-[15px] font-medium tracking-wide">
                                        <span className="text-white">Full</span>{' '}
                                        <span className="text-indigo-300">Name</span>
                                    </label>
                                    <input
                                        type="text"
                                        id="name"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        required
                                        className="w-full bg-[#8b93bc]/20 border-none rounded-xl px-4 py-3.5 text-white focus:outline-none focus:ring-1 focus:ring-indigo-500 transition-all font-outfit"
                                    />
                                </div>

                                {/* Email Input */}
                                <div className="space-y-2">
                                    <label htmlFor="email" className="block text-[15px] font-medium tracking-wide">
                                        <span className="text-white">Email</span>{' '}
                                        <span className="text-indigo-300">Address</span>
                                    </label>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        required
                                        className="w-full bg-[#8b93bc]/20 border-none rounded-xl px-4 py-3.5 text-white focus:outline-none focus:ring-1 focus:ring-indigo-500 transition-all font-outfit"
                                    />
                                </div>
                            </div>

                            {/* Service Input */}
                            <div className="space-y-2">
                                <label htmlFor="service" className="block text-[15px] font-medium tracking-wide">
                                    <span className="text-white">Select</span>{' '}
                                    <span className="text-indigo-300">Service</span>
                                </label>
                                <div className="relative">
                                    <select
                                        id="service"
                                        name="service"
                                        value={formData.service}
                                        onChange={handleChange}
                                        className="w-full bg-[#8b93bc]/20 border-none rounded-xl px-4 py-3.5 text-white focus:outline-none focus:ring-1 focus:ring-indigo-500 transition-all font-outfit appearance-none"
                                    >
                                        <option value="" disabled className="text-gray-500 bg-[#1b1e3d]"></option>
                                        <option value="web" className="text-white bg-[#1b1e3d]">Web Development</option>
                                        <option value="ui" className="text-white bg-[#1b1e3d]">UI/UX Design</option>
                                        <option value="app" className="text-white bg-[#1b1e3d]">Mobile App Development</option>
                                    </select>
                                    {/* Arrow icon overlay */}
                                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-gray-400">
                                        <svg className="fill-current h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" /></svg>
                                    </div>
                                </div>
                            </div>

                            {/* Message Input */}
                            <div className="space-y-2">
                                <label htmlFor="message" className="block text-[15px] font-medium tracking-wide">
                                    <span className="text-white">Your</span>{' '}
                                    <span className="text-indigo-300">Message</span>
                                </label>
                                <textarea
                                    id="message"
                                    name="message"
                                    value={formData.message}
                                    onChange={handleChange}
                                    required
                                    rows={6}
                                    className="w-full bg-[#8b93bc]/20 border-none rounded-xl px-4 py-3.5 text-white focus:outline-none focus:ring-1 focus:ring-indigo-500 transition-all resize-none font-outfit"
                                />
                            </div>

                            {/* Submit Button */}
                            <Magnetic intensity={0.1}>
                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="w-[190px] mt-2 bg-[#2a1b9d] hover:bg-[#3424ba] text-white font-medium py-3 px-6 rounded-full flex items-center justify-between gap-3 transition-all focus:ring-2 focus:ring-indigo-400 focus:outline-none disabled:opacity-70"
                                >
                                    <span className="text-[15px]">Send Message</span>
                                    {isSubmitting ? (
                                        <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1, ease: "linear" }} className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full" />
                                    ) : (
                                        <Send size={18} className="transform -rotate-12" />
                                    )}
                                </button>
                            </Magnetic>
                        </form>
                    </div>

                    {/* Right: Contact Info */}
                    <div className="flex-1 p-8 md:p-10 border-t md:border-t-0 md:border-l border-white/10 relative z-10 flex flex-col">

                        <div className="mb-10">
                            <h3 className="text-xl font-semibold text-[#6684ff] mb-6 font-space-grotesk tracking-wide">
                                Contact Info
                            </h3>

                            <div className="space-y-5">
                                {/* Phone */}
                                <div>
                                    <p className="text-[15px] font-medium tracking-wide mb-1">
                                        <span className="text-white">Ph</span>
                                        <span className="text-indigo-300">one:</span>
                                    </p>
                                    <p className="text-[15px] text-gray-300 font-outfit">+94 75 959 8913</p>
                                </div>

                                {/* Email */}
                                <div>
                                    <p className="text-[15px] font-medium tracking-wide mb-1">
                                        <span className="text-white">E</span>
                                        <span className="text-indigo-300">mail:</span>
                                    </p>
                                    <a href="mailto:ahamadaasik77@gmail.com" className="text-[15px] text-gray-300 font-outfit hover:text-white transition-colors break-all">
                                        ahamadaasik77@gmail.com
                                    </a>
                                </div>

                                {/* Location */}
                                <div>
                                    <p className="text-[15px] font-medium tracking-wide mb-1">
                                        <span className="text-white">Loc</span>
                                        <span className="text-indigo-300">ation:</span>
                                    </p>
                                    <p className="text-[15px] text-gray-300 font-outfit">Batticaloa, Sri Lanka</p>
                                </div>
                            </div>
                        </div>

                        <div>
                            <h3 className="text-xl font-semibold text-[#6684ff] mb-6 font-space-grotesk tracking-wide">
                                Profile tools
                            </h3>

                            <div className="space-y-5">
                                {/* Linkedin */}
                                <div>
                                    <p className="text-[15px] font-medium tracking-wide mb-1">
                                        <span className="text-white">Link</span>
                                        <span className="text-indigo-300">din:</span>
                                    </p>
                                    <a href="https://linkedin.com/in/aasik2002" target="_blank" rel="noopener noreferrer" className="text-[15px] text-gray-300 font-outfit hover:text-white transition-colors">
                                        linkedin.com/in/aasik2002
                                    </a>
                                </div>

                                {/* Github */}
                                <div>
                                    <p className="text-[15px] font-medium tracking-wide mb-1">
                                        <span className="text-white">Git</span>
                                        <span className="text-indigo-300">hub :</span>
                                    </p>
                                    <a href="https://github.com/Aasik2002" target="_blank" rel="noopener noreferrer" className="text-[15px] text-gray-300 font-outfit hover:text-white transition-colors">
                                        github.com/Aasik2002
                                    </a>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </motion.div>
        </div>
    );
}
