import React, { memo, useMemo } from 'react';
// FIX: Use AuthContext, NOT ThemeContext
import { useAuth } from '../context/AuthContext';
// We still need the booking data, so if you must keep ThemeContext, 
// import it ALONGSIDE AuthContext.
import { useTheme } from '../context/ThemeContext';

const UserDashboard = memo(() => {
    // FIX: Pull identity from AuthContext, data from ThemeContext
    const { currentUser } = useAuth();
    const { bookingRequests } = useTheme();

    const activeOperator = useMemo(() => ({
        // Use the key 'username' as seen in your Navbar code
        name: currentUser?.username || "OPERATOR",
        status: currentUser ? "ACTIVE" : "OFFLINE"
    }), [currentUser]);

    const userBookings = useMemo(() => {
        if (!activeOperator.name || activeOperator.name === "OPERATOR") return [];
        return bookingRequests?.filter(b =>
            b.userName?.toLowerCase().trim() === activeOperator.name.toLowerCase().trim()
        ) || [];
    }, [bookingRequests, activeOperator]);

    return (
        <div className="min-h-screen bg-[#050505] text-white pt-24 px-8 font-mono">
            <header className="mb-12 border-b border-white/5 pb-8">
                <h1 className="text-4xl font-black tracking-tighter">
                    WELCOME BACK, <span className="text-cyan-400">{activeOperator.name.toUpperCase()}</span>
                </h1>
                <p className="text-zinc-500 text-xs mt-2 tracking-widest uppercase">
                    OPERATOR TERMINAL // STATUS: {activeOperator.status}
                </p>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="bg-[#0a0a0c] border border-white/10 p-6 rounded-2xl h-fit">
                    <h2 className="text-cyan-400 font-bold mb-4">// PROFILE</h2>
                    <div className="space-y-4 text-sm text-zinc-400">
                        <p>NAME: <span className="text-white font-bold">{activeOperator.name}</span></p>
                        <p>CLEARANCE: LEVEL 04</p>
                        <p>STATUS: VERIFIED</p>
                    </div>
                </div>

                <div className="lg:col-span-2 space-y-6">
                    <h2 className="text-cyan-400 font-bold">// ACTIVE DEPLOYMENTS</h2>
                    {userBookings.length > 0 ? (
                        userBookings.map(b => (
                            <div key={b.id} className="bg-[#0a0a0c] border border-white/10 p-6 rounded-2xl">
                                <p className="font-bold text-lg">{b.carName}</p>
                                <p className="text-xs text-zinc-500">ID: {b.id}</p>
                            </div>
                        ))
                    ) : (
                        <p className="text-zinc-600">NO ACTIVE DEPLOYMENTS FOR {activeOperator.name.toUpperCase()}.</p>
                    )}
                </div>
            </div>
        </div>
    );
});

export default UserDashboard;