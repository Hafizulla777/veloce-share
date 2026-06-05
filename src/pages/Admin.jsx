import React from 'react';
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';

export default function Admin() {
    const { bookingRequests, setBookingRequests } = useTheme();
    const { userDatabase, logout } = useAuth(); // Integrated authorization database metrics

    const processRequest = (id, nextStatus) => {
        setBookingRequests(bookingRequests.map(req => {
            if (req.id === id) return { ...req, status: nextStatus };
            return req;
        }));
    };

    return (
        <div className="pt-32 pb-24 px-4 md:px-12 min-h-screen bg-cyber-black space-y-12">
            <div className="max-w-7xl mx-auto space-y-10">

                {/* Main Application Matrix Heading Controls */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <div>
                        <span className="text-xs font-mono text-cyber-teal tracking-widest uppercase block font-bold">CORE APPLICATION CONTROL CENTER</span>
                        <h1 className="text-4xl font-black font-sans tracking-tight mt-1">FLEET OPERATIONS MANAGEMENT MATRIX</h1>
                    </div>
                    <button
                        onClick={logout}
                        className="bg-rose-950/40 text-rose-400 border border-rose-500/20 font-mono text-xs px-4 py-2 rounded-xl hover:bg-rose-600 hover:text-black transition-all cursor-pointer font-bold"
                    >
                        🔒 DE-AUTHORIZE SECURE SESSION
                    </button>
                </div>

                {/* SECTION 1: Booking Requests Tracking Feed */}
                <div className="bg-cyber-surface border border-white/10 rounded-2xl overflow-hidden shadow-2xl">
                    <div className="p-5 border-b border-white/5 bg-neutral-900/40 flex justify-between items-center">
                        <h2 className="text-xs font-mono font-bold tracking-wider text-neutral-400 uppercase">INBOUND RENTAL REQUEST STREAM</h2>
                        <span className="bg-cyber-teal/10 text-cyber-teal border border-cyber-teal/20 text-[10px] font-mono px-3 py-0.5 rounded">ONLINE</span>
                    </div>

                    <div className="divide-y divide-white/5">
                        {bookingRequests.map((req) => (
                            <div key={req.id} className="p-6 hover:bg-white/[0.01] transition-colors grid grid-cols-1 lg:grid-cols-4 gap-6 items-center">
                                <div className="space-y-1">
                                    <div className="flex items-center gap-2">
                                        <span className="text-xs font-mono font-bold text-cyber-teal">{req.id}</span>
                                    </div>
                                    <h4 className="text-base font-bold text-white tracking-tight font-sans">{req.customer}</h4>
                                    <p className="text-[11px] font-mono text-neutral-400">📧 {req.email}</p>
                                </div>
                                <div className="space-y-0.5">
                                    <span className="text-[9px] font-mono text-neutral-500 uppercase block">TARGET VEHICLE</span>
                                    <h5 className="text-sm font-bold text-white font-sans">{req.carName}</h5>
                                    <span className="text-xs font-mono text-cyber-teal font-bold">{req.duration}</span>
                                </div>
                                <div>
                                    <span className="text-[9px] font-mono text-neutral-500 uppercase block">LOGISTICAL VECTOR</span>
                                    <p className="text-xs text-white font-mono">📍 {req.destination}</p>
                                </div>
                                <div className="flex lg:justify-end gap-2 items-center">
                                    <span className={`text-[10px] px-2.5 py-1 rounded-md font-mono font-bold border mr-2 ${req.status === 'Pending' ? 'bg-amber-500/10 text-amber-400 border-amber-500/20' : 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                                        }`}>
                                        {req.status.toUpperCase()}
                                    </span>
                                    {req.status === 'Pending' && (
                                        <button onClick={() => processRequest(req.id, 'Approved')} className="bg-emerald-500 text-black font-mono font-bold text-[10px] px-3 py-1.5 rounded-lg cursor-pointer">✓ APPROVE</button>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* SECTION 2: Dynamic System Registrations Database Node Explorer */}
                <div className="bg-cyber-surface border border-white/10 rounded-2xl overflow-hidden shadow-2xl">
                    <div className="p-5 border-b border-white/5 bg-neutral-900/40">
                        <h2 className="text-xs font-mono font-bold tracking-wider text-neutral-400 uppercase">REGISTERED ACCOUNT SECURITY SIGNUP DATABASE</h2>
                    </div>
                    <div className="p-6">
                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse font-mono text-xs">
                                <thead>
                                    <tr className="border-b border-white/10 text-neutral-500">
                                        <th className="pb-3 uppercase tracking-wider text-[10px]">ACCOUNT IDENTITY NODE</th>
                                        <th className="pb-3 uppercase tracking-wider text-[10px]">ROLE CLEARANCE</th>
                                        <th className="pb-3 uppercase tracking-wider text-[10px]">PHONE REGISTER</th>
                                        <th className="pb-3 uppercase tracking-wider text-[10px]">DATABASE RAW PASSWORD KEY</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-white/5 text-neutral-200">
                                    {userDatabase.map((user, idx) => (
                                        <tr key={idx} className="hover:bg-white/[0.02] transition-colors">
                                            <td className="py-3.5">
                                                <span className="font-sans font-bold text-white block text-sm">{user.firstName} {user.lastName}</span>
                                                <span className="text-[11px] text-neutral-400">{user.email}</span>
                                            </td>
                                            <td className="py-3.5">
                                                <span className={`px-2 py-0.5 rounded text-[9px] font-bold ${user.role === 'owner' ? 'bg-white text-black' : 'bg-cyber-teal/20 text-cyber-teal border border-cyber-teal/30'}`}>
                                                    {user.role.toUpperCase()}
                                                </span>
                                            </td>
                                            <td className="py-3.5 text-neutral-400">{user.phone || 'N/A'}</td>
                                            <td className="py-3.5 text-amber-400 font-bold tracking-wider">{user.password}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}