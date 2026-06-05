import React, { useState } from 'react';

export default function Reviews() {
    const [reviews, setReviews] = useState([
        { id: 1, user: "Marcus V.", role: "Enterprise Client", rating: 5, date: "2026-05-12", comment: "The axial motor flux profile performance was flawless. Renting via discrete hour block metrics matched our data collection run perfectly.", model: "Veloce Apex-01" },
        { id: 2, user: "Elena R.", role: "Track Engineer", rating: 5, date: "2026-05-28", comment: "Exceptional system architecture. Finding localized radial tracking docks via the home matrix was incredibly straightforward. Highly recommended.", model: "Nero Asymmetric" },
        { id: 3, user: "Satoshi N.", role: "Tech Director", rating: 4, date: "2026-06-02", comment: "The physical material presentation is incredible. Minute granularity options inside checkout are highly efficient. Frame updates are perfectly stable.", model: "Kinetik G-Thrust" }
    ]);

    const [form, setForm] = useState({ name: '', role: '', comment: '', rating: 5, model: 'Veloce Apex-01' });

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!form.name || !form.comment) return;
        setReviews([{ id: Date.now(), user: form.name, role: form.role || 'Verified User', rating: parseInt(form.rating), date: new Date().toISOString().split('T')[0], comment: form.comment, model: form.model }, ...reviews]);
        setForm({ name: '', role: '', comment: '', rating: 5, model: 'Veloce Apex-01' });
    };

    return (
        <div className="pt-32 pb-24 px-4 md:px-12 min-h-screen bg-cyber-black">
            <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-12">

                {/* Left Hand: Metrics & Submission Engine */}
                <div className="space-y-8 lg:col-span-1">
                    <div>
                        <span className="text-xs font-mono text-cyber-teal tracking-widest uppercase block">VALIDATED INDEPENDENT LOGS</span>
                        <h1 className="text-3xl font-black tracking-tight mt-1">CUSTOMER EXPERIENCE FEEDBACK</h1>
                    </div>

                    {/* Aggregate Stats Visual Block */}
                    <div className="bg-cyber-surface border border-white/5 rounded-xl p-6 space-y-4">
                        <div className="flex items-baseline gap-2">
                            <span className="text-5xl font-black font-mono">4.9</span>
                            <span className="text-sm text-neutral-400">OUT OF 5.0 GLOBAL RATING</span>
                        </div>
                        <div className="space-y-2 text-xs font-mono">
                            <div className="flex items-center gap-2"><span>5 ★</span><div className="flex-grow bg-neutral-900 h-2 rounded overflow-hidden"><div className="bg-cyber-teal h-full w-[94%]" /></div><span className="text-neutral-500">94%</span></div>
                            <div className="flex items-center gap-2"><span>4 ★</span><div className="flex-grow bg-neutral-900 h-2 rounded overflow-hidden"><div className="bg-cyber-teal h-full w-[6%]" /></div><span className="text-neutral-500">6%</span></div>
                            <div className="flex items-center gap-2"><span>3 ★</span><div className="flex-grow bg-neutral-900 h-2 rounded overflow-hidden"><div className="bg-cyber-teal h-full w-0" /></div><span className="text-neutral-500">0%</span></div>
                        </div>
                    </div>

                    {/* Interactive Review Creation Engine */}
                    <form onSubmit={handleSubmit} className="bg-cyber-surface border border-white/5 rounded-xl p-6 space-y-4">
                        <h3 className="text-sm font-bold uppercase tracking-wider border-b border-white/5 pb-2">APPEND SYSTEM TRANSACTION ENTRY</h3>

                        <div>
                            <label className="block text-[10px] font-mono text-neutral-400 uppercase mb-1">OPERATOR SIGNATURE *</label>
                            <input type="text" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} className="w-full bg-black border border-white/10 rounded p-2 text-xs outline-none focus:border-cyber-teal" placeholder="e.g. Capt. Miller" required />
                        </div>

                        <div>
                            <label className="block text-[10px] font-mono text-neutral-400 uppercase mb-1">OPERATOR SYSTEM STATUS</label>
                            <input type="text" value={form.role} onChange={e => setForm({ ...form, role: e.target.value })} className="w-full bg-black border border-white/10 rounded p-2 text-xs outline-none focus:border-cyber-teal" placeholder="e.g. Core System Evaluator" />
                        </div>

                        <div className="grid grid-cols-2 gap-2">
                            <div>
                                <label className="block text-[10px] font-mono text-neutral-400 uppercase mb-1">METRIC METER</label>
                                <select value={form.rating} onChange={e => setForm({ ...form, rating: e.target.value })} className="w-full bg-black border border-white/10 rounded p-2 text-xs text-white outline-none">
                                    <option value="5">5 Star Tier</option>
                                    <option value="4">4 Star Tier</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-[10px] font-mono text-neutral-400 uppercase mb-1">VEHICLE VARIANT</label>
                                <select value={form.model} onChange={e => setForm({ ...form, model: e.target.value })} className="w-full bg-black border border-white/10 rounded p-2 text-xs text-white outline-none">
                                    <option>Veloce Apex-01</option>
                                    <option>Kinetik G-Thrust</option>
                                    <option>Nero Asymmetric</option>
                                </select>
                            </div>
                        </div>

                        <div>
                            <label className="block text-[10px] font-mono text-neutral-400 uppercase mb-1">ANALYTICAL EXPERIENCE DESCRIPTION *</label>
                            <textarea value={form.comment} onChange={e => setForm({ ...form, comment: e.target.value })} rows="3" className="w-full bg-black border border-white/10 rounded p-2 text-xs outline-none focus:border-cyber-teal resize-none" placeholder="Provide system tracking telemetry performance insights..." required></textarea>
                        </div>

                        <button type="submit" className="w-full bg-cyber-teal hover:bg-white text-black font-bold text-xs tracking-widest py-2.5 rounded transition-colors uppercase cursor-pointer">
                            TRANSMIT FEEDBACK LOG
                        </button>
                    </form>
                </div>

                {/* Right Hand: Deep Production Mosaic Feed */}
                <div className="lg:col-span-2 space-y-6">
                    {reviews.map((rev) => (
                        <div key={rev.id} className="bg-cyber-surface border border-white/5 rounded-xl p-6 transition-all hover:border-white/10">
                            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-2 border-b border-white/5 pb-3 mb-4">
                                <div>
                                    <h4 className="font-bold text-white text-base">{rev.user}</h4>
                                    <span className="text-xs text-neutral-500 font-mono">{rev.role}</span>
                                </div>
                                <div className="text-right font-mono text-xs">
                                    <span className="text-cyber-teal font-bold mr-3">{'★'.repeat(rev.rating)}</span>
                                    <span className="text-neutral-600">{rev.date}</span>
                                </div>
                            </div>
                            <p className="text-sm text-neutral-300 leading-relaxed font-sans">{rev.comment}</p>
                            <div className="mt-4 inline-block bg-black/40 border border-white/5 rounded px-2.5 py-1 text-[10px] font-mono text-neutral-400">
                                CHASSIS TARGET: <span className="text-white font-semibold">{rev.model}</span>
                            </div>
                        </div>
                    ))}
                </div>

            </div>
        </div>
    );
}