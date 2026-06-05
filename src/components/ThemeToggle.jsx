// import React from 'react';
// import { useTheme } from '../context/ThemeContext';

// export default function ThemeToggle() {
//     // Reading theme properties and custom theme configuration switch mechanisms
//     const { theme, toggleTheme } = useTheme();
//     const isDark = theme === 'dark';

//     return (
//         <button
//             type="button"
//             onClick={toggleTheme}
//             className="p-2.5 rounded-xl border border-white/10 dark:border-zinc-800 bg-zinc-900/50 dark:bg-zinc-100/10 text-cyan-400 dark:text-amber-500 hover:scale-105 active:scale-95 transition-all cursor-pointer font-mono text-[10px] font-black tracking-wider uppercase flex items-center gap-2"
//             title="MUTATE INTERFACE SYSTEM COLOR"
//         >
//             <span>{isDark ? '⚡ LIGHT_MODE' : '🌙 DARK_MODE'}</span>
//         </button>
//     );
// }