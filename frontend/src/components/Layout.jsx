// // src/components/Layout.jsx
// import { NavLink, useNavigate } from "react-router-dom";
// import { useAuth } from "../auth/AuthContext.jsx";
// import Watermark from "./Watermark.jsx";

// const nav = [
//   { to: "/", label: "Overview", end: true },
//   { to: "/sessions", label: "Musters" },
//   { to: "/sites", label: "Sites" },
//   { to: "/alerts", label: "Alerts" },
// ];

// export default function Layout({ children }) {
//   const { user, logout } = useAuth();
//   const navigate = useNavigate();

//   return (
//     <div className="min-h-screen md:flex">
//       {/* Command sidebar */}
//       <aside className="bg-command text-white md:w-60 md:min-h-screen flex md:flex-col">
//         <div className="px-6 py-5 border-b border-white/10 flex-1 md:flex-none">
//           <div className="font-display uppercase tracking-[0.2em] text-brass text-sm leading-tight">Parade</div>
//           <div className="font-display uppercase tracking-[0.2em] text-white text-lg leading-tight">Muster</div>
//         </div>
//         <nav className="flex md:flex-col md:mt-4 md:px-3 md:gap-1 px-2">
//           {nav.map((n) => (
//             <NavLink
//               key={n.to}
//               to={n.to}
//               end={n.end}
//               className={({ isActive }) =>
//                 `px-4 py-3 md:rounded-md font-display uppercase tracking-wider text-sm transition-colors ${
//                   isActive ? "bg-brass text-command" : "text-white/70 hover:text-white hover:bg-white/5"
//                 }`
//               }
//             >
//               {n.label}
//             </NavLink>
//           ))}
//         </nav>
//         <div className="hidden md:block mt-auto px-6 py-5 border-t border-white/10">
//           <div className="text-xs text-white/50 truncate">{user?.full_name}</div>
//           <button onClick={logout} className="mt-2 text-brass text-xs font-display uppercase tracking-wider hover:text-brass-bright">
//             Sign out
//           </button>
//         </div>
//       </aside>

//       {/* Content */}
//       <main className="flex-1 min-w-0">
//         <header className="border-b border-line/20 bg-white px-6 md:px-8 py-4 flex items-center justify-between">
//           <div className="eyebrow text-muted">Personnel Accountability · Command Console</div>
//           <button onClick={logout} className="md:hidden text-missing text-xs font-display uppercase tracking-wider">Sign out</button>
//         </header>
//         <div className="px-6 md:px-8 py-6 max-w-6xl">{children}</div>
//         <div className="px-6 md:px-8"><Watermark /></div>
//       </main>
//     </div>
//   );
// }




// src/components/Layout.jsx
import { useState } from "react";
import { NavLink } from "react-router-dom";
import { useAuth } from "../auth/AuthContext.jsx";
import Watermark from "./Watermark.jsx";

const nav = [
  { to: "/", label: "Overview", end: true },
  { to: "/sessions", label: "Musters" },
  { to: "/sites", label: "Sites" },
  { to: "/alerts", label: "Alerts" },
];

export default function Layout({ children }) {
  const { user, logout } = useAuth();
  const [open, setOpen] = useState(false);

  const NavItems = ({ onClick }) =>
    nav.map((n) => (
      <NavLink
        key={n.to}
        to={n.to}
        end={n.end}
        onClick={onClick}
        className={({ isActive }) =>
          `px-4 py-3 rounded-md font-display uppercase tracking-wider text-sm transition-colors ${
            isActive ? "bg-brass text-command" : "text-white/70 hover:text-white hover:bg-white/5"
          }`
        }
      >
        {n.label}
      </NavLink>
    ));

  return (
    <div className="min-h-screen md:flex">
      {/* ===== Mobile top bar (hidden on desktop) ===== */}
      <div className="md:hidden bg-command text-white flex items-center justify-between px-4 py-3 sticky top-0 z-30">
        <div className="leading-tight">
          <span className="font-display uppercase tracking-[0.2em] text-brass text-xs">Parade</span>
          <span className="font-display uppercase tracking-[0.2em] text-white text-base ml-1">Muster</span>
        </div>
        <button
          onClick={() => setOpen((o) => !o)}
          aria-label="Toggle menu"
          className="p-2 -mr-2 text-white"
        >
          {/* hamburger / close icon */}
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            {open ? (<><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></>)
                  : (<><line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="18" x2="21" y2="18" /></>)}
          </svg>
        </button>
      </div>

      {/* ===== Mobile slide-down menu ===== */}
      {open && (
        <div className="md:hidden bg-command text-white px-3 pb-4 pt-1 flex flex-col gap-1 sticky top-[52px] z-20 border-t border-white/10">
          <NavItems onClick={() => setOpen(false)} />
          <div className="mt-2 px-4 pt-3 border-t border-white/10">
            <div className="text-xs text-white/50 truncate">{user?.full_name}</div>
            <button onClick={logout} className="mt-1 text-brass text-xs font-display uppercase tracking-wider">Sign out</button>
          </div>
        </div>
      )}

      {/* ===== Desktop sidebar (hidden on mobile) ===== */}
      <aside className="hidden md:flex md:w-60 md:min-h-screen md:flex-col bg-command text-white">
        <div className="px-6 py-5 border-b border-white/10">
          <div className="font-display uppercase tracking-[0.2em] text-brass text-sm leading-tight">Parade</div>
          <div className="font-display uppercase tracking-[0.2em] text-white text-lg leading-tight">Muster</div>
        </div>
        <nav className="flex flex-col mt-4 px-3 gap-1">
          <NavItems />
        </nav>
        <div className="mt-auto px-6 py-5 border-t border-white/10">
          <div className="text-xs text-white/50 truncate">{user?.full_name}</div>
          <button onClick={logout} className="mt-2 text-brass text-xs font-display uppercase tracking-wider hover:text-brass-bright">
            Sign out
          </button>
        </div>
      </aside>

      {/* ===== Content ===== */}
      <main className="flex-1 min-w-0">
        <header className="hidden md:flex border-b border-line/20 bg-white px-6 md:px-8 py-4 items-center justify-between">
          <div className="eyebrow text-muted">Personnel Accountability · Command Console</div>
        </header>
        <div className="px-4 sm:px-6 md:px-8 py-5 md:py-6 max-w-6xl w-full">{children}</div>
        <div className="px-4 sm:px-6 md:px-8"><Watermark /></div>
      </main>
    </div>
  );
}

