import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';

export default function AuthGate() {
    const { login } = useAuth();

    const [isSignUp, setIsSignUp] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');
    const [role, setRole] = useState('user');

    const [notification, setNotification] = useState({ message: '', type: '' });

    // Global Mock User Database
    const [mockDatabase, setMockDatabase] = useState([
        { email: 'hafizulla@veloce.share', password: 'password123', username: 'Hafizulla', role: 'owner' },
        { email: 'user@veloce.share', password: 'password123', username: 'Alex', role: 'user' }
    ]);

    // POINT 4: INSTANT RECOVERY LOOKUP & FORM AUTO-FILL
    const handleForgotPasswordLookup = (e) => {
        e.preventDefault();
        if (!email) {
            setNotification({ message: "ERROR: Enter your email coordinate first.", type: "error" });
            return;
        }

        const account = mockDatabase.find(u => u.email.toLowerCase() === email.toLowerCase());
        if (account) {
            // Auto-populate inputs for immediate entry
            setPassword(account.password);
            setNotification({
                message: `MATCH FOUND! Your password is: [ ${account.password} ]. Form has been auto-filled. Transmitting entry token...`,
                type: "success"
            });

            // Auto-trigger immediate entry log in within a second
            setTimeout(() => {
                login(account);
            }, 1000);
        } else {
            setNotification({ message: "IDENTITY FAIL: Email coordinate not found in ledger database.", type: "error" });
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setNotification({ message: '', type: '' });

        if (!email || !password) {
            setNotification({ message: "ERROR: Complete all required security lines.", type: "error" });
            return;
        }

        if (isSignUp) {
            if (!username) {
                setNotification({ message: "ERROR: An operator alias name string is mandatory.", type: "error" });
                return;
            }

            const existingUser = mockDatabase.find(u => u.email.toLowerCase() === email.toLowerCase());
            if (existingUser) {
                setNotification({ message: "ERROR: Profile matrix already registered under this node.", type: "error" });
                return;
            }

            const newProfile = { email, password, username, role };
            setMockDatabase(prev => [...prev, newProfile]);

            setNotification({ message: "REGISTRY CREATED! Bypassing gate and loading profile...", type: "success" });

            // 🚀 POINT 1: AUTO LOGIN UPON SIGNUP
            setTimeout(() => {
                login(newProfile);
            }, 800);

        } else {
            // STANDARD LOGIN INTERFACE
            const validUser = mockDatabase.find(
                u => u.email.toLowerCase() === email.toLowerCase() && u.password === password
            );

            if (validUser) {
                setNotification({ message: "ACCESS GRANTED. Constructing main application viewport...", type: "success" });
                setTimeout(() => {
                    login(validUser);
                }, 500);
            } else {
                setNotification({ message: "ACCESS DENIED: Authentication verification signature mismatch.", type: "error" });
            }
        }
    };

    return (
        <div className="min-h-screen bg-black flex items-center justify-center p-4 font-mono text-white">
            <div className="w-full max-w-sm bg-neutral-950 border border-white/10 rounded-xl p-6 shadow-2xl space-y-6">

                <div className="text-center space-y-1">
                    <span className="text-[10px] text-cyber-teal tracking-widest font-bold block uppercase">VELOCE SECURE PORTAL</span>
                    <h2 className="text-sm font-black tracking-widest uppercase">
                        {isSignUp ? "INITIALIZE MATRIX INTEGRATION" : "VERIFY IDENTITY ENTRY"}
                    </h2>
                </div>

                {notification.message && (
                    <div className={`p-3 rounded text-[11px] border leading-relaxed ${notification.type === 'success' ? 'bg-cyber-teal/10 border-cyber-teal/30 text-cyber-teal' : 'bg-red-500/10 border-red-500/30 text-red-400'
                        }`}>
                        {notification.message}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4 text-left">
                    {isSignUp && (
                        <>
                            <div>
                                <label className="block text-[9px] text-neutral-400 tracking-widest uppercase mb-1">OPERATOR NAME (ALIAS)</label>
                                <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} className="w-full bg-black border border-white/10 rounded p-2 text-xs text-white outline-none focus:border-cyber-teal" placeholder="e.g. Hafizulla" />
                            </div>

                            <div>
                                <label className="block text-[9px] text-neutral-400 tracking-widest uppercase mb-1">SYSTEM ACCESS ROLE</label>
                                <select value={role} onChange={(e) => setRole(e.target.value)} className="w-full bg-black border border-white/10 rounded p-2 text-xs text-white outline-none focus:border-cyber-teal">
                                    <option value="user">STANDARD RENTER</option>
                                    <option value="owner">VEHICLE OWNER (ADMIN)</option>
                                </select>
                            </div>
                        </>
                    )}

                    <div>
                        <label className="block text-[9px] text-neutral-400 tracking-widest uppercase mb-1">EMAIL COORDINATE</label>
                        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full bg-black border border-white/10 rounded p-2 text-xs text-white outline-none focus:border-cyber-teal" placeholder="name@domain.com" />
                    </div>

                    <div>
                        <div className="flex justify-between items-center mb-1">
                            <label className="block text-[9px] text-neutral-400 tracking-widest uppercase">SECURE PASS KEY</label>
                            {!isSignUp && (
                                <button type="button" onClick={handleForgotPasswordLookup} className="text-[9px] text-cyber-teal/70 hover:text-cyber-teal cursor-pointer tracking-wider">
                                    FORGOT PASSWORD?
                                </button>
                            )}
                        </div>
                        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full bg-black border border-white/10 rounded p-2 text-xs text-white outline-none focus:border-cyber-teal" placeholder="••••••" />
                    </div>

                    <button type="submit" className="w-full bg-cyber-teal text-black font-bold text-xs tracking-widest py-2.5 rounded transition-all hover:bg-white uppercase cursor-pointer">
                        {isSignUp ? "GENERATE MATRIX PROFILE" : "AUTHORIZE ACCESS ENTRY"}
                    </button>
                </form>

                <div className="text-center pt-2 border-t border-white/5">
                    <button
                        type="button"
                        onClick={() => { setIsSignUp(!isSignUp); setNotification({ message: '', type: '' }); }}
                        className="text-[11px] text-cyber-teal font-bold hover:underline cursor-pointer tracking-wider"
                    >
                        {isSignUp ? "Already have an operating layout? Log In" : "Need a fresh profile node? Switch to Sign Up"}
                    </button>
                </div>

            </div>
        </div>
    );
}