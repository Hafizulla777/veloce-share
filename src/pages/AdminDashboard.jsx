import React, { memo } from 'react';
import { useTheme } from '../context/ThemeContext';

const AdminDashboard = memo(() => {
    const { bookingRequests, setBookingRequests } = useTheme();

    const handleAction = (id, newStatus) => {
        setBookingRequests(prev =>
            prev.map(item => item.id === id ? { ...item, status: newStatus } : item)
        );
    };

    return (
        <div className="min-h-screen bg-[#050505] text-white pt-28 px-4 md:px-12 max-w-[1400px] mx-auto font-mono">
            <header className="border-b border-white/10 pb-8 mb-12">
                <h1 className="text-3xl font-black tracking-tighter">ADMIN // <span className="text-cyan-400">CONTROL DECK</span></h1>
            </header>

            {/* Analytics */}
            <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                {[
                    { label: 'Pending Requests', value: bookingRequests.filter(r => r.status === 'Pending').length, color: 'text-amber-400' },
                    { label: 'Active Deployments', value: bookingRequests.filter(r => r.status === 'Approved').length, color: 'text-emerald-400' },
                    { label: 'System Health', value: 'OPTIMAL', color: 'text-cyan-400' }
                ].map((stat, i) => (
                    <div key={i} className="bg-[#0a0a0c] border border-white/5 p-8 rounded-3xl">
                        <p className="text-[10px] text-zinc-500 uppercase tracking-widest mb-2">{stat.label}</p>
                        <p className={`text-4xl font-black ${stat.color}`}>{stat.value}</p>
                    </div>
                ))}
            </section>

            {/* Registry */}
            <section className="bg-[#0a0a0c] border border-white/5 rounded-3xl overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="border-b border-white/5 text-[10px] text-zinc-500 uppercase">
                                <th className="p-6">Request ID</th>
                                <th className="p-6">Operator</th>
                                <th className="p-6">Asset</th>
                                <th className="p-6">Status</th>
                                <th className="p-6 text-right">Command</th>
                            </tr>
                        </thead>
                        <tbody className="text-xs">
                            {bookingRequests.map((rental) => (
                                <tr key={rental.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                                    <td className="p-6 font-mono text-zinc-400">{rental.id}</td>
                                    <td className="p-6 font-bold">{rental.fullName || rental.user}</td>
                                    <td className="p-6 text-cyan-400">{rental.carName || rental.car}</td>
                                    <td className="p-6">
                                        <StatusBadge status={rental.status} />
                                    </td>
                                    <td className="p-6 text-right">
                                        {rental.status === 'Pending' ? (
                                            <div className="flex justify-end gap-3">
                                                <button onClick={() => handleAction(rental.id, 'Approved')} className="text-emerald-400 hover:text-white font-bold transition-colors">APPROVE</button>
                                                <button onClick={() => handleAction(rental.id, 'Rejected')} className="text-red-400 hover:text-white font-bold transition-colors">REJECT</button>
                                            </div>
                                        ) : (
                                            <span className="text-zinc-600 uppercase tracking-widest">{rental.status}</span>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </section>
        </div>
    );
});

function StatusBadge({ status }) {
    const styles = {
        Pending: 'text-amber-400 bg-amber-400/10',
        Approved: 'text-emerald-400 bg-emerald-400/10',
        Rejected: 'text-red-400 bg-red-400/10'
    };
    return <span className={`px-2 py-1 rounded text-[9px] uppercase font-bold ${styles[status]}`}>{status}</span>;
}

export default AdminDashboard;