import { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, Github, Linkedin, Twitter, Mail, MapPin } from 'lucide-react';
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
        message: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        // Simulate API call
        setTimeout(() => {
            setIsSubmitting(false);
            setFormData({ name: '', email: '', message: '' });
            alert('Message sent successfully!');
        }, 1500);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }));
    };

    return (
        <div className="w-full h-full flex flex-col items-center justify-start p-6 pt-24 md:pt-16 bg-gradient-to-br from-[#0A0A1A] to-[#16163A] overflow-y-auto">
            <SideNav activePage="contact" onNavigate={onNavigate} />

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="w-full max-w-6xl flex flex-col md:flex-row gap-12 mt-4 md:ml-16 mb-20"
            >
                {/* Contact Info Side */}
                <div className="flex-1 text-center md:text-left">
                    <motion.h2
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-4xl md:text-5xl lg:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300 mb-6 font-space-grotesk"
                    >
                        Let's create something together.
                    </motion.h2>

                    <motion.p
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.3 }}
                        className="text-gray-400 text-lg mb-12 max-w-md mx-auto md:mx-0"
                    >
                        I'm currently looking for new opportunities. Whether you have a project to discuss or just want to say hi, I'd love to hear from you.
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                        className="grid gap-6 mb-12"
                    >
                        <Magnetic intensity={0.1}>
                            <a href="mailto:hello@example.com" className="group flex items-center gap-4 p-4 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors w-fit mx-auto md:mx-0">
                                <div className="w-12 h-12 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-400 group-hover:scale-110 transition-transform">
                                    <Mail size={24} />
                                </div>
                                <div className="text-left">
                                    <p className="text-sm text-gray-500 font-medium">Email</p>
                                    <p className="text-white font-medium">hello@example.com</p>
                                </div>
                            </a>
                        </Magnetic>

                        <Magnetic intensity={0.1}>
                            <div className="group flex items-center gap-4 p-4 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors w-fit mx-auto md:mx-0 cursor-default">
                                <div className="w-12 h-12 rounded-full bg-cyan-500/20 flex items-center justify-center text-cyan-400 group-hover:scale-110 transition-transform">
                                    <MapPin size={24} />
                                </div>
                                <div className="text-left">
                                    <p className="text-sm text-gray-500 font-medium">Location</p>
                                    <p className="text-white font-medium">San Francisco, CA</p>
                                </div>
                            </div>
                        </Magnetic>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5 }}
                        className="flex justify-center md:justify-start gap-4"
                    >
                        {[
                            { icon: Github, href: '#', color: 'hover:text-white', bg: 'hover:bg-white/10' },
                            { icon: Linkedin, href: '#', color: 'hover:text-blue-400', bg: 'hover:bg-blue-500/10' },
                            { icon: Twitter, href: '#', color: 'hover:text-sky-400', bg: 'hover:bg-sky-500/10' }
                        ].map((social, i) => (
                            <Magnetic key={i} intensity={0.2}>
                                <a
                                    href={social.href}
                                    className={`w-12 h-12 rounded-full flex items-center justify-center text-gray-400 border border-white/10 transition-all duration-300 ${social.bg} ${social.color}`}
                                >
                                    <social.icon size={20} />
                                </a>
                            </Magnetic>
                        ))}
                    </motion.div>
                </div>

                {/* Contact Form Side */}
                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 }}
                    className="flex-1 w-full max-w-md mx-auto relative group"
                >
                    {/* Subtle glow effect behind form */}
                    <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/20 to-cyan-500/20 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-500 -z-10" />

                    <form onSubmit={handleSubmit} className="bg-[#12122A]/80 backdrop-blur-xl p-8 rounded-3xl border border-white/10 shadow-2xl relative overflow-hidden">
                        <h3 className="text-2xl font-bold text-white mb-6">Send me a message</h3>

                        <div className="space-y-4">
                            <div className="group/input">
                                <label htmlFor="name" className="block text-sm font-medium text-gray-400 mb-1 group-focus-within/input:text-blue-400 transition-colors">Name</label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all font-outfit"
                                    placeholder="John Doe"
                                />
                            </div>

                            <div className="group/input">
                                <label htmlFor="email" className="block text-sm font-medium text-gray-400 mb-1 group-focus-within/input:text-blue-400 transition-colors">Email</label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all font-outfit"
                                    placeholder="john@example.com"
                                />
                            </div>

                            <div className="group/input">
                                <label htmlFor="message" className="block text-sm font-medium text-gray-400 mb-1 group-focus-within/input:text-blue-400 transition-colors">Message</label>
                                <textarea
                                    id="message"
                                    name="message"
                                    value={formData.message}
                                    onChange={handleChange}
                                    required
                                    rows={4}
                                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all resize-none font-outfit"
                                    placeholder="How can I help you?"
                                />
                            </div>

                            <Magnetic intensity={0.1}>
                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="w-full mt-6 bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2 transition-all transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-70 disabled:hover:scale-100"
                                >
                                    {isSubmitting ? (
                                        <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1, ease: "linear" }} className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full" />
                                    ) : (
                                        <>
                                            <span>Send Message</span>
                                            <Send size={18} />
                                        </>
                                    )}
                                </button>
                            </Magnetic>
                        </div>
                    </form>
                </motion.div>
            </motion.div>
        </div>
    );
}
