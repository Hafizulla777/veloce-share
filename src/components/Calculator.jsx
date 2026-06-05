import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function Calculator() {
    const [days, setDays] = useState(3);
    const [hours, setHours] = useState(12);
    const [insurance, setInsurance] = useState(true);
    const [displayCost, setDisplayCost] = useState(0);

    const costTracker = useRef({ val: 0 });

    const totalCalculated = ((days * 1200) + (hours * 75)) * 1.18 + (insurance ? 250 : 0);

    useEffect(() => {
        gsap.to(costTracker.current, {
            val: totalCalculated,
            duration: 0.4,
            ease: 'power2.out',
            onUpdate: () => {
                setDisplayCost(Math.floor(costTracker.current.val));
            }
        });
    }, [totalCalculated]);

    return (
        <div className="w-full max-w-2xl bg-cyber-surface border border-white/10 rounded-xl p-6 md:p-8 space-y-6">

            {/* Grid configuration metrics control sliders */}
            <div className="space-y-4">
                <div>
                    <div className="flex justify-between font-mono text-xs mb-2">
                        <span className="text-neutral-400">ALLOCATION INTERVAL: DAYS</span>
                        <span className="text-cyber-teal font-bold">{days} Days</span>
                    </div>
                    <input
                        type="range" min="1" max="30" value={days}
                        onChange={(e) => setDays(parseInt(e.target.value))}
                        className="w-full accent-cyber-teal h-1 bg-black rounded"
                    />
                </div>

                <div>
                    <div className="flex justify-between font-mono text-xs mb-2">
                        <span className="text-neutral-400">FRACTIONAL METRIC: HOURS</span>
                        <span className="text-cyber-teal font-bold">{hours} Hours</span>
                    </div>
                    <input
                        type="range" min="0" max="23" value={hours}
                        onChange={(e) => setHours(parseInt(e.target.value))}
                        className="w-full accent-cyber-teal h-1 bg-black rounded"
                    />
                </div>
            </div>

            <div className="flex justify-between items-center bg-black p-4 rounded-lg border border-white/5 font-mono text-xs">
                <div>
                    <span className="text-white block font-sans font-bold">PREMIUM INDEMNITY COVERAGE</span>
                    <span className="text-neutral-500 text-[10px]">Zero liability matrix waiver allocation.</span>
                </div>
                <input
                    type="checkbox" checked={insurance}
                    onChange={(e) => setInsurance(e.target.checked)}
                    className="w-4 h-4 accent-cyber-teal cursor-pointer"
                />
            </div>

            {/* Numeric Ticker Value Node Box */}
            <div className="bg-black border border-white/10 rounded-lg p-5 flex justify-between items-center">
                <div className="font-mono text-[11px] text-neutral-500">
                    SECURE QUANTUM TRANSIT VALUE <br />
                    <span className="text-neutral-600">(INCLUDES BASE + 18% SYSTEM VAT)</span>
                </div>
                <div className="font-mono text-3xl font-black text-cyber-teal tracking-tighter">
                    ${displayCost.toLocaleString()}
                </div>
            </div>

            <button className="w-full bg-cyber-teal hover:bg-white text-black font-mono font-bold text-xs tracking-widest py-3 rounded-lg uppercase cursor-pointer transition-colors">
                COMMIT SYSTEM ALLOCATION
            </button>
        </div>
    );
}