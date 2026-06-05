import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function Footer() {
    const navigate = useNavigate();
    const [systemPing, setSystemPing] = useState(24);

    // Simulating live network grid telemetry data adjustments
    useEffect(() => {
        const interval = setInterval(() => {
            setSystemPing(Math.floor(21 + Math.random() * 8));
        }, 4000);
        return () => clearInterval(interval);
    }, []);

    return (
        <footer className="w-full bg-[#050505] border-t border-white/5 pt-16 font-sans">
            <div className="max-w-[1400px] mx-auto px-4 md:px-12">

                {/* TOP FOOTER GRID: Large CTA Box + Links Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16">

                    {/* Left Side: Massive Rounded KION-Style CTA Box */}
                    <div className="lg:col-span-5 bg-[#0a0a0c] border border-white/10 rounded-[2rem] p-10 flex flex-col justify-between items-start space-y-8 shadow-2xl">
                        <div className="space-y-4">
                            <h2 className="text-4xl font-black tracking-tight text-white">
                                Scale the <span className="text-cyan-400">Future.</span>
                            </h2>
                            <p className="text-xs text-zinc-400 leading-relaxed font-mono">
                                Next-generation decentralized high-performance automotive network. Bridging premium vehicle fleet asset owners with vetted, elite performance operators globally under verified risk matrix control.
                            </p>
                        </div>
                        <button
                            onClick={() => navigate('/booking')}
                            className="bg-white text-black font-mono font-black text-[10px] tracking-widest px-6 py-3 rounded-full hover:bg-cyan-400 transition-colors uppercase"
                        >
                            INITIATE PROJECT
                        </button>
                    </div>

                    {/* Right Side: Information & Links Grid */}
                    <div className="lg:col-span-7 bg-[#0b0b0e] border border-white/5 rounded-[2rem] p-10 grid grid-cols-2 md:grid-cols-3 gap-8">
                        {/* Directory Matrix Column */}
                        <div className="space-y-4">
                            <h4 className="text-[10px] font-mono font-bold uppercase tracking-widest text-zinc-500">NAVIGATION</h4>
                            <ul className="space-y-3 text-sm font-bold text-white">
                                <li><Link to="/" className="hover:text-cyan-400 transition-colors">Terminal Index</Link></li>
                                <li><Link to="/showroom" className="hover:text-cyan-400 transition-colors">Fleet Showroom</Link></li>
                                <li><Link to="/booking" className="hover:text-cyan-400 transition-colors">Resource Request</Link></li>
                                <li><Link to="/reviews" className="hover:text-cyan-400 transition-colors">Operator Logs</Link></li>
                            </ul>
                        </div>

                        {/* Security Parameters Column */}
                        <div className="space-y-4">
                            <h4 className="text-[10px] font-mono font-bold uppercase tracking-widest text-zinc-500">CLEARANCE</h4>
                            <ul className="space-y-3 text-sm font-bold text-white">
                                <li><Link to="/admin" className="hover:text-cyan-400 transition-colors">Owner Control Panel</Link></li>
                                <li className="text-zinc-600 cursor-not-allowed">Biometric Auth</li>
                                <li className="text-zinc-600 cursor-not-allowed">Liability Locks</li>
                                <li className="text-zinc-600 cursor-not-allowed">Node Hash Registry</li>
                            </ul>
                        </div>

                        {/* Telemetry Newsletter Column */}
                        <div className="space-y-4 md:col-span-1 col-span-2">
                            <h4 className="text-[10px] font-mono font-bold uppercase tracking-widest text-zinc-500">TELEMETRY SUB-FEED</h4>
                            <p className="text-[11px] text-zinc-400 font-mono leading-relaxed">
                                Subscribe to receive hypercar ledger status reports and immediate availability warnings.
                            </p>
                            <div className="flex bg-black border border-white/10 rounded-lg overflow-hidden p-1 mt-2">
                                <input
                                    type="email"
                                    placeholder="operator@node.io"
                                    className="w-full bg-transparent px-3 py-2 text-xs text-white outline-none placeholder-zinc-700 font-mono"
                                />
                                <button
                                    onClick={() => alert("Telemetry stream attached.")}
                                    className="bg-zinc-900 text-white hover:bg-cyan-400 hover:text-black font-mono font-bold text-[9px] tracking-widest px-4 rounded-md transition-all cursor-pointer"
                                >
                                    JOIN
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Sub-Footer: Network Telemetry & Legal */}
                <div className="border-t border-white/10 py-6 flex flex-col md:flex-row items-center justify-between gap-4">
                    <div className="flex items-center gap-4 text-[10px] font-mono text-zinc-500">
                        <div className="flex items-center gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
                            <span>VELOCE NODE // <span className="text-white">{systemPing}MS</span></span>
                        </div>
                        <span className="hidden md:inline">ENCRYPTION: <span className="text-cyan-400">AES-GCM-256</span></span>
                    </div>

                    <div className="text-[10px] font-mono text-zinc-500">
                        &copy; {new Date().getFullYear()} VELOCE SHARE INC. REGISTRY: P2P-AUTO-V26
                    </div>

                    <div className="flex gap-4 uppercase font-mono text-[9px] text-zinc-500">
                        <span className="hover:text-white cursor-pointer transition-colors">PRIVACY</span>
                        <span>//</span>
                        <span className="hover:text-white cursor-pointer transition-colors">TERMS</span>
                        <span>//</span>
                        <span className="text-cyan-400">V1.4.2-STABLE</span>
                    </div>
                </div>

            </div>
        </footer>
    );
}