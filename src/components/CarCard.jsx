import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';

export default function CarCard({ car }) {
    const [activeTab, setActiveTab] = useState('image');
    const { setSelectedCar } = useTheme();
    const navigate = useNavigate();

    const handleReserveClick = () => {
        if (setSelectedCar && car?.name) setSelectedCar(car.name);
        navigate('/booking', { state: { targetUnitClass: car?.name || 'Unknown' } });
    };

    // 🛡️ Safe Extraction Fallbacks to completely protect against 'undefined' data crashes
    const ownerAvatar = car?.owner?.avatar || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80";
    const ownerName = car?.owner?.name || "System Asset Pool";
    const ownerAge = car?.owner?.age || "--";
    const ownerGender = car?.owner?.gender || "--";
    const ownerProfession = car?.owner?.profession || "Fleet Management";

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="rounded-2xl bg-[#0b0b0e] dark:bg-white p-5 border border-white/5 dark:border-zinc-200 shadow-2xl flex flex-col justify-between space-y-4 group transition-all"
        >
            <div>
                {/* Header Matrix Info Details */}
                <div className="flex justify-between items-start border-b border-white/5 dark:border-zinc-100 pb-3">
                    <div>
                        <span className="text-[9px] font-mono text-cyan-400 dark:text-cyan-600 tracking-widest uppercase font-bold">
                            {(car?.brand || "PREMIUM")} MANIFEST
                        </span>
                        <h3 className="text-lg font-black tracking-tight text-white dark:text-zinc-900 uppercase mt-0.5">
                            {car?.name || "UNNAMED RENTAL"}
                        </h3>
                    </div>
                    <span className="text-[9px] font-mono bg-[#121216] dark:bg-zinc-100 border border-white/10 dark:border-zinc-200 text-zinc-400 dark:text-zinc-600 px-2 py-1 rounded uppercase tracking-wider">
                        REF // {car?.id || "N/A"}
                    </span>
                </div>

                {/* 🖼️ PRIMARY VIEWPORT DISPLAY BLOCK */}
                <div className="relative w-full h-44 bg-black dark:bg-zinc-100 rounded-xl overflow-hidden my-4 border border-white/5 dark:border-zinc-200">
                    {activeTab === 'image' && (
                        car?.imageUrl ? (
                            <img
                                src={car.imageUrl}
                                alt={car?.name || "Car Asset"}
                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                            />
                        ) : (
                            <div className="w-full h-full flex items-center justify-center bg-zinc-900 text-zinc-500 font-mono text-[9px]">
                                🖼️ NO IMAGE MEDIA AVAILABLE
                            </div>
                        )
                    )}
                    {activeTab === 'video' && (
                        car?.videoUrl ? (
                            <video src={car.videoUrl} autoPlay loop muted playsInline className="w-full h-full object-cover" />
                        ) : (
                            <div className="w-full h-full flex items-center justify-center bg-zinc-900 dark:bg-zinc-200 font-mono text-[9px] text-zinc-500 uppercase">
                                🎬 NO VIDEO STREAM DELIVERED
                            </div>
                        )
                    )}
                    {activeTab === 'specs' && (
                        <div className="w-full h-full p-4 bg-[#070709] dark:bg-zinc-50 flex flex-col justify-center gap-2.5 text-[10px] font-mono">
                            <div className="flex justify-between border-b border-white/5 dark:border-zinc-200 pb-1">
                                <span className="text-zinc-500 dark:text-zinc-400 uppercase">PROPULSION MESH</span>
                                <span className="text-white dark:text-zinc-800 font-bold">{car?.specs?.propulsion || "ELECTRIC CORE"}</span>
                            </div>
                            <div className="flex justify-between border-b border-white/5 dark:border-zinc-200 pb-1">
                                <span className="text-zinc-500 dark:text-zinc-400 uppercase">OUTPUT CAP</span>
                                <span className="text-white dark:text-zinc-800 font-bold">{car?.specs?.output || "FACTORY SPEC"}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-zinc-500 dark:text-zinc-400 uppercase">DRIVETRAIN</span>
                                <span className="text-cyan-400 dark:text-cyan-600 font-bold">{car?.specs?.drivetrain || "AWD"}</span>
                            </div>
                        </div>
                    )}
                </div>

                {/* TAB SWITCH OPTIONS SUB-NAV */}
                <div className="grid grid-cols-3 gap-1 bg-[#121216] dark:bg-zinc-100 p-1 rounded-lg border border-white/5 dark:border-zinc-200 mb-4">
                    {['image', 'video', 'specs'].map((tab) => (
                        <button
                            key={tab}
                            type="button"
                            onClick={() => setActiveTab(tab)}
                            className={`text-[9px] font-mono font-black uppercase py-1.5 rounded transition-all cursor-pointer ${activeTab === tab
                                ? 'bg-zinc-800 dark:bg-white text-white dark:text-zinc-900 shadow-sm border border-transparent dark:border-zinc-200'
                                : 'text-zinc-500 dark:text-zinc-400 hover:text-white dark:hover:text-zinc-700'
                                }`}
                        >
                            {tab}
                        </button>
                    ))}
                </div>

                {/* 👤 STABLE OWNER PROFILE AREA */}
                <div className="bg-[#121216] dark:bg-zinc-50 border border-white/5 dark:border-zinc-200 p-3 rounded-xl flex items-center gap-3">
                    <img
                        src={ownerAvatar}
                        alt={ownerName}
                        className="w-10 h-10 rounded-full object-cover border border-cyan-500/20 dark:border-zinc-300 shadow-inner flex-shrink-0"
                    />
                    <div className="font-mono text-[9px] text-zinc-400 dark:text-zinc-600 space-y-0.5 flex-1 min-w-0">
                        <span className="text-amber-500 dark:text-amber-600 font-black block tracking-wider uppercase text-[8px]">// VERIFIED OWNER DATA</span>
                        <div className="grid grid-cols-2 gap-x-2">
                            <p className="truncate"><span className="text-zinc-600 dark:text-zinc-400">NAME:</span> <strong className="text-white dark:text-zinc-900 font-bold">{ownerName}</strong></p>
                            <p><span className="text-zinc-600 dark:text-zinc-400">AGE:</span> {ownerAge} YRS</p>
                            <p><span className="text-zinc-600 dark:text-zinc-400">GEN:</span> {ownerGender}</p>
                            <p className="truncate"><span className="text-zinc-600 dark:text-zinc-400">PRO:</span> {ownerProfession}</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* BASE RATE TARIFF & TRIGGERS (In Indian Rupees ₹) */}
            <div className="flex items-center justify-between pt-3 border-t border-white/5 dark:border-zinc-100">
                <div>
                    <span className="text-[8px] text-zinc-500 dark:text-zinc-400 block tracking-wider uppercase font-mono">BASE TARIFF</span>
                    <span className="text-base font-mono font-black text-white dark:text-zinc-900">
                        ₹{car?.ratePerDay || "0"}
                        <span className="text-[9px] font-normal text-zinc-500 font-sans">/day</span>
                    </span>
                </div>
                <button
                    type="button"
                    onClick={handleReserveClick}
                    className="bg-white dark:bg-zinc-900 hover:bg-cyan-400 dark:hover:bg-cyan-500 text-black dark:text-white hover:text-black dark:hover:text-black font-mono font-black text-[9px] tracking-widest px-3.5 py-2 rounded-lg transition-all transform active:scale-95 cursor-pointer"
                >
                    INITIALIZE RENTAL
                </button>
            </div>
        </motion.div>
    );
}