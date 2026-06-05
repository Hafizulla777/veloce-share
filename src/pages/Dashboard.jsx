import React from 'react';
import { useAuth } from '../context/AuthContext';

export default function Dashboard() {
    const { currentUser } = useAuth();

    // FIXED: Patched property lookup undefined crash from image_2fdec5.png
    if (!currentUser) {
        return (
            <div className="min-h-screen bg-black flex items-center justify-center font-mono text-xs text-neutral-400">
                Synchronizing terminal account matrix data stream...
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-black text-white font-mono p-8 pt-24">
            <div className="max-w-4xl mx-auto space-y-6">

                <div className="border border-white/10 rounded-xl p-6 bg-neutral-900/40 backdrop-blur-md">
                    <span className="text-[10px] text-cyber-teal font-bold block mb-1">OPERATIONAL PROFILE LOG</span>
                    <h1 className="text-xl font-black tracking-wider uppercase">
                        OPERATOR MATRIX: {currentUser.username}
                    </h1>
                    <p className="text-xs text-neutral-400 mt-1">
                        System Authority Level: <span className="text-white underline uppercase">{currentUser.role}</span>
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="border border-white/10 rounded-xl p-4 bg-neutral-900/20">
                        <h3 className="text-xs font-bold text-neutral-300 mb-2 uppercase">Active Rental Telemetry</h3>
                        <p className="text-xs text-neutral-500">No active vehicle reservations currently synced to this identity signature node.</p>
                    </div>
                    <div className="border border-white/10 rounded-xl p-4 bg-neutral-900/20">
                        <h3 className="text-xs font-bold text-neutral-300 mb-2 uppercase">Network Verification Parameters</h3>
                        <p className="text-[11px] text-neutral-400">Email: {currentUser.email}</p>
                        <p className="text-[11px] text-neutral-400">Session Status: <span className="text-cyber-teal">ONLINE (PERSISTENT)</span></p>
                    </div>
                </div>

            </div>
        </div>
    );
}