import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Signup() {
    const [role, setRole] = useState('renter'); // 'renter' or 'owner' segmentation flag
    const [file, setFile] = useState(null);
    const [isDragging, setIsDragging] = useState(false);
    const navigate = useNavigate();

    const handleDrag = (e) => {
        e.preventDefault();
        setIsDragging(e.type === "dragover");
    };

    const handleDrop = (e) => {
        e.preventDefault();
        setIsDragging(false);
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            setFile(e.dataTransfer.files[0]);
        }
    };

    const handleAuthSubmit = (e) => {
        e.preventDefault();
        // In a live system, this registers the user session role type context
        alert(`Account initialized securely as System Class: ${role.toUpperCase()}`);
        navigate(role === 'owner' ? '/admin' : '/cars');
    };

    return (
        <div className="pt-32 pb-24 px-6 min-h-screen bg-cyber-black flex items-center justify-center">
            <div className="w-full max-w-xl bg-cyber-surface border border-white/10 rounded-2xl p-6 md:p-10 space-y-8 shadow-2xl">

                {/* Structural Header */}
                <div className="text-center">
                    <span className="text-xs text-cyber-teal uppercase tracking-widest block font-mono font-bold">NETWORK ACCESS GATEWAY</span>
                    <h2 className="text-3xl font-black tracking-tight mt-1">INITIALIZE IDENTITY PARADIGM</h2>
                </div>

                {/* Segmented Operational Role Toggles */}
                <div className="grid grid-cols-2 gap-2 bg-black p-1.5 rounded-xl border border-white/5">
                    <button
                        type="button"
                        onClick={() => { setRole('renter'); setFile(null); }}
                        className={`py-3 text-xs font-mono font-bold tracking-wider uppercase rounded-lg transition-all cursor-pointer ${role === 'renter' ? 'bg-cyber-teal text-black shadow-lg' : 'text-neutral-400 hover:text-white'
                            }`}
                    >
                        🔑 VEHICLE RENTER
                    </button>
                    <button
                        type="button"
                        onClick={() => { setRole('owner'); setFile(null); }}
                        className={`py-3 text-xs font-mono font-bold tracking-wider uppercase rounded-lg transition-all cursor-pointer ${role === 'owner' ? 'bg-white text-black shadow-lg' : 'text-neutral-400 hover:text-white'
                            }`}
                    >
                        🗄️ FLEET CAR OWNER
                    </button>
                </div>

                {/* Dynamic Context Form Submission */}
                <form onSubmit={handleAuthSubmit} className="space-y-5">

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-[10px] font-mono text-neutral-400 uppercase mb-1">LEGAL FIRST NAME *</label>
                            <input type="text" placeholder="e.g. Alexander" className="w-full bg-black border border-white/10 rounded-lg p-3 text-xs font-mono text-white outline-none focus:border-cyber-teal transition-colors" required />
                        </div>
                        <div>
                            <label className="block text-[10px] font-mono text-neutral-400 uppercase mb-1">LEGAL LAST NAME *</label>
                            <input type="text" placeholder="e.g. Wright" className="w-full bg-black border border-white/10 rounded-lg p-3 text-xs font-mono text-white outline-none focus:border-cyber-teal transition-colors" required />
                        </div>
                    </div>

                    <div>
                        <label className="block text-[10px] font-mono text-neutral-400 uppercase mb-1">SECURE BLOCKCHAIN EMAIL MATRIX *</label>
                        <input type="email" placeholder="identity@domain.com" className="w-full bg-black border border-white/10 rounded-lg p-3 text-xs font-mono text-white outline-none focus:border-cyber-teal transition-colors" required />
                    </div>

                    {/* Persona Rule 1: Custom UI Layout Fields for Renter Profile */}
                    {role === 'renter' && (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 animated-fade-in">
                            <div>
                                <label className="block text-[10px] font-mono text-neutral-400 uppercase mb-1">DRIVER LICENSE RECORD ID *</label>
                                <input type="text" placeholder="DL-994821-A" className="w-full bg-black border border-white/10 rounded-lg p-3 text-xs font-mono text-white outline-none focus:border-cyber-teal" required />
                            </div>
                            <div>
                                <label className="block text-[10px] font-mono text-neutral-400 uppercase mb-1">OPERATOR AGE CATEGORY *</label>
                                <input type="number" min="21" placeholder="Minimum age 21" className="w-full bg-black border border-white/10 rounded-lg p-3 text-xs font-mono text-white outline-none focus:border-cyber-teal" required />
                            </div>
                        </div>
                    )}

                    {/* Persona Rule 2: Custom UI Layout Fields for Fleet Car Owner Profile */}
                    {role === 'owner' && (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 animated-fade-in">
                            <div>
                                <label className="block text-[10px] font-mono text-neutral-400 uppercase mb-1">CORPORATE REGISTRATION TAX CODES *</label>
                                <input type="text" placeholder="EIN-883-9102" className="w-full bg-black border border-white/10 rounded-lg p-3 text-xs font-mono text-white outline-none focus:border-cyber-teal" required />
                            </div>
                            <div>
                                <label className="block text-[10px] font-mono text-neutral-400 uppercase mb-1">EXPECTED FLEET VOLUME SIZE *</label>
                                <select className="w-full bg-black border border-white/10 rounded-lg p-3 text-xs font-mono text-white outline-none focus:border-cyber-teal">
                                    <option>1 - 5 EXOTIC HYPERCARS</option>
                                    <option>6 - 20 CORE TRACK VEHICLES</option>
                                    <option>21+ ENTERPRISE LOGISTICS NODES</option>
                                </select>
                            </div>
                        </div>
                    )}

                    {/* Interactive Secure Legal Validation Document Dropzone */}
                    <div>
                        <label className="block text-[10px] font-mono text-neutral-400 uppercase mb-1">
                            {role === 'owner' ? 'ASSET DEED & LIABILITY WAIVER UPLOAD *' : 'BIOMETRIC PASSPORT / LICENSE PHOTO VERIFICATION *'}
                        </label>
                        <div
                            onDragOver={handleDrag}
                            onDragLeave={handleDrag}
                            onDrop={handleDrop}
                            className={`border-2 border-dashed rounded-xl p-6 text-center transition-all cursor-pointer bg-black/40 ${isDragging ? 'border-cyber-teal bg-cyber-teal/5' : 'border-white/10 hover:border-white/20'
                                }`}
                        >
                            <div className="font-mono space-y-1">
                                <span className="text-xs text-neutral-300 block font-bold">
                                    {file ? `✅ CAPTURED: ${file.name.toUpperCase()}` : 'DRAG AND DROP ENCRYPTED VALIDATION KEY'}
                                </span>
                                <span className="text-[10px] text-neutral-500 block">STANDARD SECURITY PDF OR SECURE ZIP PERMITTED</span>
                            </div>
                        </div>
                    </div>

                    <div className="pt-2">
                        <button
                            type="submit"
                            className={`w-full font-mono font-bold text-xs tracking-widest py-3.5 rounded-xl uppercase cursor-pointer transition-all ${role === 'owner' ? 'bg-white text-black hover:bg-cyber-teal' : 'bg-cyber-teal text-black hover:bg-white'
                                }`}
                        >
                            MOUNT SYSTEM INTERACTIVE SESSION
                        </button>
                    </div>

                </form>
            </div>
        </div>
    );
}