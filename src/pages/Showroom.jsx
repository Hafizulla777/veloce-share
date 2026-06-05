import React, { useState, useMemo } from 'react';
import CarCard from '../components/CarCard';

// Your fixed dataset
const fleetDataset = [
    { id: 'f-1', name: 'VELOCE APEX EV-1', series: 'V-QUAD TRACK CLASS', ratePerDay: 1450, imageUrl: 'https://images.unsplash.com/photo-1617788138017-80ad40651399?auto=format&fit=crop&w=800&q=80', videoUrl: 'https://cdn.pixabay.com/video/2023/10/16/185213-875043130_large.mp4', status: 'AVAILABLE', specs: { power: '1420 HP', accel: '1.85s', autonomy: 'LEVEL 4+' } },
    { id: 'f-2', name: 'KINETIK HYDRO-A1', series: 'CHRONO-X TRACK PURSUIT', ratePerDay: 1890, imageUrl: 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&w=800&q=80', videoUrl: 'https://cdn.pixabay.com/video/2021/08/17/85375-588827715_large.mp4', status: 'DEPLOYED', specs: { power: '1600 HP', accel: '1.72s', autonomy: 'TRACK ONLY' } },
    { id: 'f-3', name: 'NERO ASYMMETRIC FLUX', series: 'STRATOS RADIAL APEX', ratePerDay: 2100, imageUrl: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=800&q=80', videoUrl: 'https://cdn.pixabay.com/video/2020/12/03/58204-487677440_large.mp4', status: 'AVAILABLE', specs: { power: '1900 HP', accel: '1.68s', autonomy: 'LEVEL 5 FULL' } },
    { id: 'f-4', name: 'VELOCE APEX EV-1', series: 'V-QUAD TRACK CLASS', ratePerDay: 1450, imageUrl: 'https://images.unsplash.com/photo-1617788138017-80ad40651399?auto=format&fit=crop&w=800&q=80', videoUrl: 'https://cdn.pixabay.com/video/2023/10/16/185213-875043130_large.mp4', status: 'AVAILABLE', specs: { power: '1420 HP', accel: '1.85s', autonomy: 'LEVEL 4+' } },
    { id: 'f-5', name: 'KINETIK HYDRO-A1', series: 'CHRONO-X TRACK PURSUIT', ratePerDay: 1890, imageUrl: 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&w=800&q=80', videoUrl: 'https://cdn.pixabay.com/video/2021/08/17/85375-588827715_large.mp4', status: 'DEPLOYED', specs: { power: '1600 HP', accel: '1.72s', autonomy: 'TRACK ONLY' } },
    { id: 'f-6', name: 'NERO ASYMMETRIC FLUX', series: 'STRATOS RADIAL APEX', ratePerDay: 2100, imageUrl: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=800&q=80', videoUrl: 'https://cdn.pixabay.com/video/2020/12/03/58204-487677440_large.mp4', status: 'AVAILABLE', specs: { power: '1900 HP', accel: '1.68s', autonomy: 'LEVEL 5 FULL' } },
    { id: 'f-7', name: 'VELOCE APEX EV-1', series: 'V-QUAD TRACK CLASS', ratePerDay: 1450, imageUrl: 'https://images.unsplash.com/photo-1617788138017-80ad40651399?auto=format&fit=crop&w=800&q=80', videoUrl: 'https://cdn.pixabay.com/video/2023/10/16/185213-875043130_large.mp4', status: 'AVAILABLE', specs: { power: '1420 HP', accel: '1.85s', autonomy: 'LEVEL 4+' } },
    { id: 'f-8', name: 'KINETIK HYDRO-A1', series: 'CHRONO-X TRACK PURSUIT', ratePerDay: 1890, imageUrl: 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&w=800&q=80', videoUrl: 'https://cdn.pixabay.com/video/2021/08/17/85375-588827715_large.mp4', status: 'DEPLOYED', specs: { power: '1600 HP', accel: '1.72s', autonomy: 'TRACK ONLY' } },
    { id: 'f-9', name: 'NERO ASYMMETRIC FLUX', series: 'STRATOS RADIAL APEX', ratePerDay: 2100, imageUrl: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=800&q=80', videoUrl: 'https://cdn.pixabay.com/video/2020/12/03/58204-487677440_large.mp4', status: 'AVAILABLE', specs: { power: '1900 HP', accel: '1.68s', autonomy: 'LEVEL 5 FULL' } },
    { id: 'f-10', name: 'VELOCE APEX EV-1', series: 'V-QUAD TRACK CLASS', ratePerDay: 1450, imageUrl: 'https://images.unsplash.com/photo-1617788138017-80ad40651399?auto=format&fit=crop&w=800&q=80', videoUrl: 'https://cdn.pixabay.com/video/2023/10/16/185213-875043130_large.mp4', status: 'AVAILABLE', specs: { power: '1420 HP', accel: '1.85s', autonomy: 'LEVEL 4+' } },
    { id: 'f-11', name: 'KINETIK HYDRO-A1', series: 'CHRONO-X TRACK PURSUIT', ratePerDay: 1890, imageUrl: 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&w=800&q=80', videoUrl: 'https://cdn.pixabay.com/video/2021/08/17/85375-588827715_large.mp4', status: 'DEPLOYED', specs: { power: '1600 HP', accel: '1.72s', autonomy: 'TRACK ONLY' } },
    { id: 'f-12', name: 'NERO ASYMMETRIC FLUX', series: 'STRATOS RADIAL APEX', ratePerDay: 2100, imageUrl: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=800&q=80', videoUrl: 'https://cdn.pixabay.com/video/2020/12/03/58204-487677440_large.mp4', status: 'AVAILABLE', specs: { power: '1900 HP', accel: '1.68s', autonomy: 'LEVEL 5 FULL' } },
    { id: 'f-13', name: 'VELOCE APEX EV-1', series: 'V-QUAD TRACK CLASS', ratePerDay: 1450, imageUrl: 'https://images.unsplash.com/photo-1617788138017-80ad40651399?auto=format&fit=crop&w=800&q=80', videoUrl: 'https://cdn.pixabay.com/video/2023/10/16/185213-875043130_large.mp4', status: 'AVAILABLE', specs: { power: '1420 HP', accel: '1.85s', autonomy: 'LEVEL 4+' } },
    { id: 'f-14', name: 'KINETIK HYDRO-A1', series: 'CHRONO-X TRACK PURSUIT', ratePerDay: 1890, imageUrl: 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&w=800&q=80', videoUrl: 'https://cdn.pixabay.com/video/2021/08/17/85375-588827715_large.mp4', status: 'DEPLOYED', specs: { power: '1600 HP', accel: '1.72s', autonomy: 'TRACK ONLY' } },
    { id: 'f-16', name: 'NERO ASYMMETRIC FLUX', series: 'STRATOS RADIAL APEX', ratePerDay: 2100, imageUrl: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=800&q=80', videoUrl: 'https://cdn.pixabay.com/video/2020/12/03/58204-487677440_large.mp4', status: 'AVAILABLE', specs: { power: '1900 HP', accel: '1.68s', autonomy: 'LEVEL 5 FULL' } }
];

export default function Showroom() {
    // State for immediate search filtering
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedSeries, setSelectedSeries] = useState('ALL');
    const [selectedStatus, setSelectedStatus] = useState('ALL');

    // Dynamic extraction of unique dropdown options based on your dataset
    const uniqueSeries = ['ALL', ...new Set(fleetDataset.map(car => car.series))];
    const uniqueStatus = ['ALL', ...new Set(fleetDataset.map(car => car.status))];

    // High-performance filtering (Memoized so it doesn't lag typing)
    const filteredFleet = useMemo(() => {
        return fleetDataset.filter(car => {
            const matchesText = car.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                car.series.toLowerCase().includes(searchQuery.toLowerCase());
            const matchesSeries = selectedSeries === 'ALL' || car.series === selectedSeries;
            const matchesStatus = selectedStatus === 'ALL' || car.status === selectedStatus;

            return matchesText && matchesSeries && matchesStatus;
        });
    }, [searchQuery, selectedSeries, selectedStatus]);

    return (
        <div className="pt-24 pb-24 px-4 md:px-8 max-w-[1400px] mx-auto min-h-screen bg-[#050505] text-white">

            {/* Header Area */}
            <div className="mb-8">
                <span className="text-[10px] font-mono text-cyan-400 tracking-[0.3em] uppercase block font-black mb-1">
                    Cars Available
                </span>
                <h2 className="text-4xl font-black tracking-tighter uppercase">Search by car brand and model</h2>
            </div>

            {/* 🔍 PRODUCTION STICKY SEARCH CONSOLE */}
            <div className="sticky top-20 z-40 bg-[#0b0b0e]/90 backdrop-blur-xl border border-white/10 rounded-xl p-4 mb-10 shadow-2xl">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    {/* Text Search Entry */}
                    <div className="flex flex-col space-y-1 md:col-span-2">
                        <label className="text-[9px] font-mono text-zinc-500 uppercase">Locate Unit</label>
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="SEARCH BY NAME OR SERIES..."
                            className="w-full bg-[#111115] border border-white/10 rounded-lg px-4 py-2.5 text-xs font-mono text-white focus:outline-none focus:border-cyan-500 transition-colors"
                        />
                    </div>

                    {/* Series Filter */}
                    <div className="flex flex-col space-y-1">
                        <label className="text-[9px] font-mono text-zinc-500 uppercase">Series Class</label>
                        <select
                            value={selectedSeries}
                            onChange={(e) => setSelectedSeries(e.target.value)}
                            className="w-full bg-[#111115] border border-white/10 rounded-lg px-4 py-2.5 text-xs font-mono text-white cursor-pointer focus:outline-none"
                        >
                            {uniqueSeries.map(series => (
                                <option key={series} value={series}>{series}</option>
                            ))}
                        </select>
                    </div>

                    {/* Status Filter */}
                    <div className="flex flex-col space-y-1">
                        <label className="text-[9px] font-mono text-zinc-500 uppercase">Deployment Status</label>
                        <select
                            value={selectedStatus}
                            onChange={(e) => setSelectedStatus(e.target.value)}
                            className="w-full bg-[#111115] border border-white/10 rounded-lg px-4 py-2.5 text-xs font-mono text-white cursor-pointer focus:outline-none"
                        >
                            {uniqueStatus.map(status => (
                                <option key={status} value={status}>{status}</option>
                            ))}
                        </select>
                    </div>
                </div>

                {/* Meta Results Output */}
                <div className="mt-4 pt-3 border-t border-white/5 flex justify-between items-center font-mono text-[10px]">
                    <span className="text-zinc-500">REAL-TIME QUERY STATUS</span>
                    <span className="text-cyan-400 font-bold">{filteredFleet.length} UNITS MATCHED</span>
                </div>
            </div>

            {/* 🏁 SCALABLE GRID SYSTEM */}
            {filteredFleet.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {filteredFleet.map(car => (
                        <CarCard key={car.id} car={car} />
                    ))}
                </div>
            ) : (
                // Safe Fallback for empty searches
                <div className="flex items-center justify-center py-32 border border-dashed border-white/10 rounded-2xl bg-[#0b0b0e]">
                    <p className="font-mono text-zinc-500 text-sm tracking-widest uppercase">
                        // 0 RESULTS FOUND // ADJUST SEARCH PARAMETERS
                    </p>
                </div>
            )}

        </div>
    );
}