import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import gsap from 'gsap';
import { useAuth } from '../context/AuthContext';

export default function Navbar() {
    const { currentUser, logout } = useAuth();
    const [isMobileOpen, setIsMobileOpen] = useState(false);
    const [isCapsule, setIsCapsule] = useState(false);
    const navRef = useRef(null);
    const lastScrollY = useRef(0);
    const location = useLocation();

    // 🔄 LOCATION RESET: Ensures page changes never break the GSAP layout
    useEffect(() => {
        setIsMobileOpen(false);
        setIsCapsule(false);
        gsap.set(navRef.current, {
            width: '100%',
            maxWidth: '100%',
            borderRadius: '0px',
            marginTop: '0px',
            backgroundColor: window.scrollY > 80 ? 'rgba(10, 10, 12, 0.95)' : 'transparent',
            backdropFilter: window.scrollY > 80 ? 'blur(20px)' : 'blur(0px)',
            borderBottom: window.scrollY > 80 ? '1px solid rgba(255, 255, 255, 0.05)' : '1px solid transparent',
            boxShadow: 'none',
        });
    }, [location.pathname]);

    // 🌊 BUTTERY SMOOTH GSAP SCROLL PHYSICS
    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;

            if (currentScrollY > 80) {
                if (!isCapsule) {
                    setIsCapsule(true);
                    gsap.to(navRef.current, {
                        width: '760px',
                        maxWidth: '92%',
                        borderRadius: '9999px',
                        marginTop: '20px',
                        backgroundColor: 'rgba(11, 11, 14, 0.85)',
                        backdropFilter: 'blur(24px)',
                        borderBottom: '1px solid transparent',
                        border: '1px solid rgba(0, 242, 254, 0.15)',
                        boxShadow: '0 20px 40px rgba(0, 0, 0, 0.8), 0 0 20px rgba(0, 242, 254, 0.05)',
                        duration: 0.6,
                        ease: 'power3.inOut', // Smooth transition
                        overwrite: 'auto'
                    });
                }
            } else {
                if (isCapsule) {
                    setIsCapsule(false);
                    gsap.to(navRef.current, {
                        width: '100%',
                        maxWidth: '100%',
                        borderRadius: '0px',
                        marginTop: '0px',
                        backgroundColor: 'transparent',
                        backdropFilter: 'blur(0px)',
                        border: '1px solid transparent',
                        borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
                        boxShadow: 'none',
                        duration: 0.6,
                        ease: 'power3.inOut',
                        overwrite: 'auto'
                    });
                }
            }
            lastScrollY.current = currentScrollY;
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, [isCapsule]);

    const links = [
        { name: 'HOME', path: '/' },
        { name: 'FLEET', path: '/showroom' },
        { name: 'BOOKING', path: '/booking' },
        { name: 'REVIEWS', path: '/reviews' },
    ];

    return (
        <header className="fixed top-0 left-0 right-0 z-50 flex flex-col items-center w-full pointer-events-none">
            <div
                ref={navRef}
                className="w-full flex items-center justify-between px-6 lg:px-12 py-4 pointer-events-auto transition-colors"
            >
                <div className="flex flex-col items-start select-none">
                    <Link to="/" className="text-sm font-black tracking-[0.25em] text-white transition-opacity hover:opacity-80">
                        VELOCE<span className="text-cyan-400 ml-0.5">SHARE</span>
                    </Link>
                    {currentUser && !isCapsule && (
                        <span className="text-[9px] font-mono text-zinc-500 tracking-widest mt-1 lowercase block transition-opacity duration-300">
                            terminal // <span className="text-cyan-400 font-bold uppercase">{currentUser.username}</span>
                        </span>
                    )}
                </div>

                <nav className="hidden xl:flex items-center gap-8">
                    {!isCapsule && (
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="flex items-center gap-6 border-r border-white/10 pr-6"
                        >
                            {links.map((link) => (
                                <Link
                                    key={link.name}
                                    to={link.path}
                                    className={`text-[11px] font-mono font-bold tracking-widest relative py-1 transition-colors ${location.pathname === link.path ? 'text-cyan-400' : 'text-zinc-400 hover:text-white'}`}
                                >
                                    {link.name}
                                    {location.pathname === link.path && (
                                        <motion.div layoutId="navUnderline" className="absolute bottom-0 left-0 right-0 h-[1px] bg-cyan-400" />
                                    )}
                                </Link>
                            ))}
                        </motion.div>
                    )}

                    {/* Desktop Auth Section */}
                    {currentUser && (
                        <div className="flex items-center gap-3">
                            <Link to="/dashboard" className="text-[11px] font-mono font-bold tracking-widest px-3 py-1.5 rounded border border-zinc-800 text-zinc-300 hover:text-white hover:border-zinc-500 transition-all">
                                DASHBOARD
                            </Link>
                            <Link to="/admin" className="text-[11px] font-mono font-bold tracking-widest px-3 py-1.5 rounded border bg-cyan-400/5 border-cyan-400/30 text-cyan-400 hover:bg-cyan-400 hover:text-black transition-all">
                                [ CONTROL PANEL ]
                            </Link>
                            <button onClick={logout} className="text-[10px] font-mono font-bold tracking-widest text-red-400/60 hover:text-red-400 transition-colors ml-2 uppercase cursor-pointer">
                                DISCONNECT
                            </button>
                        </div>
                    )}
                </nav>

                <div className="flex xl:hidden items-center gap-4 pointer-events-auto">
                    {currentUser && isCapsule && (
                        <span className="text-[10px] font-mono text-cyan-400 font-black tracking-widest uppercase">
                            [{currentUser.username}]
                        </span>
                    )}
                    <button onClick={() => setIsMobileOpen(!isMobileOpen)} className="text-white p-2 cursor-pointer focus:outline-none">
                        <div className="w-5 h-2.5 flex flex-col justify-between">
                            <span className={`w-full h-[1.5px] bg-white block transition-transform duration-300 ${isMobileOpen ? 'rotate-45 translate-y-[4px]' : ''}`} />
                            <span className={`w-full h-[1.5px] bg-white block transition-transform duration-300 ${isMobileOpen ? '-rotate-45 -translate-y-[4px]' : ''}`} />
                        </div>
                    </button>
                </div>
            </div>

            <AnimatePresence>
                {isMobileOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.25, ease: 'easeOut' }}
                        className="fixed inset-0 z-40 bg-black/95 backdrop-blur-3xl flex flex-col justify-center items-center gap-8 pointer-events-auto"
                    >
                        {links.map((link) => (
                            <Link key={link.name} to={link.path} onClick={() => setIsMobileOpen(false)} className={`text-2xl font-black tracking-widest transition-colors ${location.pathname === link.path ? 'text-cyan-400' : 'text-zinc-300 hover:text-white'}`}>
                                {link.name}
                            </Link>
                        ))}

                        {/* RESTORED: Mobile Auth Section */}
                        {currentUser && (
                            <div className="flex flex-col items-center gap-4 mt-6 pt-6 border-t border-white/10 w-48">
                                <Link to="/dashboard" onClick={() => setIsMobileOpen(false)} className="text-sm font-mono text-zinc-300 tracking-widest hover:text-white">
                                    MY DASHBOARD
                                </Link>
                                <Link to="/admin" onClick={() => setIsMobileOpen(false)} className="text-sm font-mono text-cyan-400 tracking-widest font-bold">
                                    ADMIN PANEL
                                </Link>
                                <button
                                    onClick={() => { logout(); setIsMobileOpen(false); }}
                                    className="text-xs font-mono text-red-400 tracking-wider underline mt-4 uppercase cursor-pointer"
                                >
                                    DISCONNECT MATRIX
                                </button>
                            </div>
                        )}
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    );
}