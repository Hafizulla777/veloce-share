import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Home() {
    const navigate = useNavigate();
    const canvasRef = useRef(null);

    const brandCollection = [
        { name: 'HYUNDAI', origin: 'GLOBAL', type: 'HIGH-TECH ELECTRIC' },
        { name: 'MAHINDRA', origin: 'INDIA', type: 'ROBUST SUV SECTOR' },
        { name: 'TATA MOTORS', origin: 'INDIA', type: 'PREMIUM CHASSIS' },
        { name: 'MARUTI SUZUKI', origin: 'INDIA', type: 'BALANCED EFFICIENCY' },
        { name: 'TOYOTA', origin: 'GLOBAL', type: 'LONG-HAUL HYBRID' },
        { name: 'HONDA', origin: 'GLOBAL', type: 'RACING KINETICS' }
    ];

    // 🎮 Geometric Wireframe Engine Simulation
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        let frameId;
        let angle = 0;

        const resize = () => {
            const box = canvas.parentElement;
            canvas.width = box.clientWidth * window.devicePixelRatio;
            canvas.height = box.clientHeight * window.devicePixelRatio;
            ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
        };
        resize();
        window.addEventListener('resize', resize);

        const project = (x, y, z, cx, cy) => {
            let cosY = Math.cos(angle);
            let sinY = Math.sin(angle);
            let x1 = x * cosY - z * sinY;
            let z1 = x * sinY + z * cosY;
            let cosX = Math.cos(0.35);
            let sinX = Math.sin(0.35);
            let y2 = y * cosX - z1 * sinX;
            let z2 = y * sinX + z1 * cosX;
            const perspective = 400 / (400 + z2);
            return { x: cx + x1 * 1.3 * perspective, y: cy + y2 * 1.3 * perspective };
        };

        const drawLoop = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            const w = canvas.width / window.devicePixelRatio;
            const h = canvas.height / window.devicePixelRatio;
            const cx = w / 2;
            const cy = h / 2 + 10;
            angle += 0.007;

            ctx.strokeStyle = 'rgba(0, 242, 254, 0.05)';
            for (let r = 30; r <= 150; r += 30) {
                ctx.beginPath();
                ctx.ellipse(cx, cy + 40, r, r * 0.4, 0, 0, Math.PI * 2);
                ctx.stroke();
            }

            const bodyPts = [
                { x: -90, y: 12, z: -30 }, { x: 90, y: 12, z: -30 },
                { x: 100, y: 18, z: 0 }, { x: 90, y: 12, z: 30 },
                { x: -90, y: 12, z: 30 }, { x: -100, y: 15, z: 0 }
            ].map(v => project(v.x, v.y, v.z, cx, cy));

            ctx.fillStyle = 'rgba(10, 10, 12, 0.85)';
            ctx.strokeStyle = 'rgba(0, 242, 254, 0.8)';
            ctx.lineWidth = 1.5;
            ctx.beginPath();
            bodyPts.forEach((p, i) => i === 0 ? ctx.moveTo(p.x, p.y) : ctx.lineTo(p.x, p.y));
            ctx.closePath();
            ctx.fill();
            ctx.stroke();

            frameId = requestAnimationFrame(drawLoop);
        };

        drawLoop();
        return () => {
            cancelAnimationFrame(frameId);
            window.removeEventListener('resize', resize);
        };
    }, []);

    return (
        <div className="min-h-screen bg-[#050505] text-white overflow-x-hidden font-sans">

            {/* HERO SECTION - KION Style Large Typography */}
            <div className="pt-40 pb-20 px-4 md:px-12 max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                <div className="space-y-8">
                    <div className="space-y-2">
                        <span className="text-[10px] font-mono text-cyan-400 tracking-[0.3em] uppercase font-black">
                            // OUR MISSION
                        </span>
                        <h1 className="text-5xl md:text-7xl font-black tracking-tighter leading-[0.95] text-white">
                            Building the <br /> Backbone of <br /> <span className="text-zinc-500">Mobility.</span>
                        </h1>
                    </div>
                    <p className="text-sm text-zinc-400 max-w-md font-mono leading-relaxed">
                        At VeloceShare, we don't just lease assets; we build logistics legacies. We are the primary partner for ambitious automotive deployments globally.
                    </p>
                    <div className="flex items-center gap-6">
                        <button
                            type="button"
                            onClick={() => navigate('/showroom')}
                            className="bg-cyan-400 text-black hover:bg-white font-mono font-black text-xs tracking-widest px-8 py-4 rounded-full uppercase transition-all shadow-lg"
                        >
                            EXPLORE FLEET
                        </button>
                    </div>
                </div>

                <div className="w-full h-[40vh] bg-[#0b0b0e] border border-white/5 rounded-3xl relative overflow-hidden shadow-2xl">
                    <canvas ref={canvasRef} className="w-full h-full block" />
                </div>
            </div>

            {/* KION-STYLE METRICS STRIP */}
            <div className="w-full bg-[#0a0a0c] border-y border-white/5 py-12">
                <div className="max-w-[1400px] mx-auto px-4 md:px-12 grid grid-cols-2 md:grid-cols-4 gap-8 divide-x divide-white/5 text-center">
                    <div className="space-y-1">
                        <h3 className="text-4xl font-black text-cyan-400">150+</h3>
                        <p className="text-[9px] font-mono text-zinc-500 tracking-widest uppercase">FLEETS DEPLOYED</p>
                    </div>
                    <div className="space-y-1">
                        <h3 className="text-4xl font-black text-white">2026</h3>
                        <p className="text-[9px] font-mono text-zinc-500 tracking-widest uppercase">YEAR FOUNDED</p>
                    </div>
                    <div className="space-y-1">
                        <h3 className="text-4xl font-black text-white">12.4K</h3>
                        <p className="text-[9px] font-mono text-zinc-500 tracking-widest uppercase">HOURS LOGGED</p>
                    </div>
                    <div className="space-y-1">
                        <h3 className="text-4xl font-black text-white">98%</h3>
                        <p className="text-[9px] font-mono text-zinc-500 tracking-widest uppercase">RETENTION RATE</p>
                    </div>
                </div>
            </div>

            {/* CORE DISCIPLINES - HORIZONTAL SCROLL CARDS */}
            <section className="py-24 bg-[#050505] overflow-hidden">
                <div className="max-w-[1400px] mx-auto px-4 md:px-12 mb-12 text-center space-y-2">
                    <h2 className="text-3xl font-black tracking-tight">Core Manufacturers</h2>
                    <p className="text-xs font-mono text-zinc-500 uppercase tracking-widest">Specialized engineering across critical mobility sectors.</p>
                </div>

                <div className="w-full overflow-x-auto pb-8 hide-scrollbar cursor-grab active:cursor-grabbing pl-4 md:pl-12">
                    <div className="flex gap-6 w-max pr-12">
                        {brandCollection.map((brand, idx) => (
                            <div
                                key={idx}
                                onClick={() => navigate('/showroom', { state: { targetBrand: brand.name } })}
                                className="w-72 bg-[#0b0b0e] border border-white/5 hover:border-cyan-400/50 p-8 rounded-3xl transition-all duration-300 flex flex-col justify-between h-96 group relative overflow-hidden"
                            >
                                <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-100 transition-opacity">
                                    <svg className="w-6 h-6 text-cyan-400 transform -rotate-45 group-hover:translate-x-2 group-hover:-translate-y-2 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
                                </div>
                                <div className="space-y-2 mt-auto">
                                    <h3 className="text-2xl font-black tracking-tighter text-white group-hover:text-cyan-400 transition-colors leading-none">
                                        {brand.name}
                                    </h3>
                                    <div className="font-mono text-[10px] text-zinc-500 space-y-1 pt-4 border-t border-white/10">
                                        <p className="tracking-widest">ORIGIN // {brand.origin}</p>
                                        <p className="text-zinc-400 uppercase">{brand.type}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
}