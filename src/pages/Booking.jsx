import React, { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';

export default function Booking() {
    const { selectedCar, setSelectedCar, setBookingRequests } = useTheme();
    const navigate = useNavigate();

    // Form State Architecture
    const [formData, setFormData] = useState({
        carName: selectedCar || "VELOCE APEX EV-1",
        days: 3,
        hours: 0,
        fullName: "",
        email: "",
        phone: "",
        age: "",
        licenseNumber: "",
        pickupDate: "",
        destination: "",
        purpose: ""
    });

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [formSubmitted, setFormSubmitted] = useState(false);

    const fleetOptions = ["VELOCE APEX EV-1", "KINETIK HYDRO-A1", "NERO ASYMMETRIC FLUX"];

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = useCallback(async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        // Simulate Network Latency / API Call
        await new Promise(resolve => setTimeout(resolve, 1200));

        const newRequest = {
            id: crypto.randomUUID(), // Production-standard ID generation
            ...formData,
            age: parseInt(formData.age, 10),
            duration: `${formData.days} Days, ${formData.hours} Hours`,
            status: "Pending",
            timestamp: new Date().toISOString()
        };

        setBookingRequests(prev => [newRequest, ...prev]);
        setFormSubmitted(true);
        setSelectedCar(null);

        setTimeout(() => {
            navigate('/admin');
        }, 2000);
    }, [formData, navigate, setBookingRequests, setSelectedCar]);

    if (formSubmitted) {
        return (
            <div className="min-h-screen flex items-center justify-center p-4">
                <div className="bg-[#0b0b0e] border border-cyan-400/30 rounded-2xl p-12 text-center max-w-md w-full animate-in fade-in zoom-in duration-500">
                    <div className="text-emerald-400 text-4xl mb-4">✓</div>
                    <h2 className="text-xl font-black text-white">TRANSMISSION SUCCESSFUL</h2>
                    <p className="text-xs text-zinc-500 mt-2 font-mono">Payload acknowledged. Redirecting to terminal...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="pt-32 pb-24 px-4 md:px-12 min-h-screen bg-[#050505] text-white">
            <div className="max-w-4xl mx-auto space-y-12">
                <header className="text-center">
                    <span className="text-[10px] font-mono text-cyan-400 tracking-[0.3em] uppercase">Secure Operational Entry</span>
                    <h1 className="text-4xl font-black mt-2 tracking-tighter">Rental Car Request</h1>
                </header>

                <form onSubmit={handleSubmit} className="bg-[#0a0a0c] border border-white/5 rounded-3xl p-8 md:p-12 grid grid-cols-1 md:grid-cols-2 gap-8">

                    {/* Section 01 */}
                    <div className="space-y-6">
                        <h3 className="text-[10px] font-black text-zinc-500 tracking-widest uppercase border-b border-white/5 pb-2">01 / Asset Parameters</h3>

                        <FormField label="Target Fleet Unit" name="carName" as="select" value={formData.carName} onChange={handleInputChange}>
                            {fleetOptions.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                        </FormField>

                        <div className="grid grid-cols-2 gap-4">
                            <FormField label="Interval (Days)" name="days" type="number" value={formData.days} onChange={handleInputChange} min="1" />
                            <FormField label="Hours" name="hours" type="number" value={formData.hours} onChange={handleInputChange} min="0" max="23" />
                        </div>

                        <FormField label="Pickup Timestamp" name="pickupDate" type="datetime-local" value={formData.pickupDate} onChange={handleInputChange} required />
                        <FormField label="Target Destination" name="destination" value={formData.destination} onChange={handleInputChange} required />
                        <FormField label="Usage Purpose" name="purpose" as="textarea" value={formData.purpose} onChange={handleInputChange} required />
                    </div>

                    {/* Section 02 */}
                    <div className="space-y-6">
                        <h3 className="text-[10px] font-black text-zinc-500 tracking-widest uppercase border-b border-white/5 pb-2">02 / Operator Risk Profile</h3>

                        <FormField label="Full Legal Name" name="fullName" value={formData.fullName} onChange={handleInputChange} required />
                        <FormField label="Secure Contact" name="phone" type="tel" value={formData.phone} onChange={handleInputChange} required />
                        <FormField label="Communication Node (Email)" name="email" type="email" value={formData.email} onChange={handleInputChange} required />

                        <div className="grid grid-cols-2 gap-4">
                            <FormField label="Operator Age" name="age" type="number" value={formData.age} onChange={handleInputChange} required min="21" />
                            <FormField label="License ID" name="licenseNumber" value={formData.licenseNumber} onChange={handleInputChange} required />
                        </div>

                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="w-full bg-cyan-400 hover:bg-white text-black font-black text-xs tracking-widest py-4 rounded-full uppercase transition-all disabled:opacity-50 mt-4"
                        >
                            {isSubmitting ? "TRANSMITTING..." : "TRANSMIT REQUEST PACKET"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

// Sub-component for DRY (Don't Repeat Yourself) code
function FormField({ label, name, as: Tag = "input", children, ...props }) {
    const commonClasses = "w-full bg-black border border-white/10 rounded-xl p-3 text-xs text-white outline-none focus:border-cyan-400 transition-colors";
    return (
        <div>
            <label className="block text-[9px] font-mono text-zinc-500 mb-1 tracking-widest uppercase">{label}</label>
            {Tag === "select" ? (
                <select name={name} {...props} className={commonClasses}>{children}</select>
            ) : Tag === "textarea" ? (
                <textarea name={name} {...props} className={`${commonClasses} resize-none`} rows="3" />
            ) : (
                <input name={name} {...props} className={commonClasses} />
            )}
        </div>
    );
}