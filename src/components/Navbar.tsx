import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Tv, Radio, Bell, ShieldAlert, LogOut, LogIn, Crown, Info } from 'lucide-react';
import { cn } from '../lib/utils';

export function Navbar() {
  const { user, logout } = useAuth();
  const location = useLocation();

  const navItems = [
    { name: 'Ao Vivo', path: '/', icon: Radio },
    { name: 'Vídeos', path: '/videos', icon: Tv },
    { name: 'Sobre', path: '/about', icon: Info },
  ];

  if (user?.role === 'admin') {
    navItems.push({ name: 'Admin', path: '/admin', icon: ShieldAlert });
  }

  return (
    <nav className="bg-slate-900/95 backdrop-blur-sm border-b border-blue-500/20 sticky top-0 z-50 shadow-[0_4px_30px_rgba(0,0,0,0.1)]">
      <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-blue-600 via-red-500 to-amber-500"></div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center gap-2 group tv-focusable rounded-lg p-1">
              <div className="bg-white p-1 rounded-lg shadow-lg shadow-blue-500/20 group-hover:shadow-blue-500/40 transition-all">
                <img src="/logo.png" alt="Teleurbano Angola tv" className="h-8 w-auto object-contain" onError={(e) => { e.currentTarget.style.display = 'none'; e.currentTarget.nextElementSibling!.style.display = 'block'; }} />
                <Tv className="h-6 w-6 text-blue-800 hidden" />
              </div>
              <span className="text-white font-bold text-xl tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-300">Teleurbano Angola</span>
            </Link>
            <div className="hidden md:block ml-10">
              <div className="flex items-baseline space-x-4">
                {navItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = location.pathname === item.path || (item.path !== '/' && location.pathname.startsWith(item.path));
                  return (
                    <Link
                      key={item.name}
                      to={item.path}
                      className={cn(
                        "flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-all duration-300 tv-focusable",
                        isActive
                          ? "bg-blue-600/20 text-blue-400 shadow-[inset_0_1px_0_rgba(255,255,255,0.1)]"
                          : "text-slate-300 hover:bg-slate-800 hover:text-white"
                      )}
                    >
                      <Icon className={cn("h-4 w-4", isActive ? "text-blue-400" : "text-slate-400")} />
                      {item.name}
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>
          <div className="flex items-center gap-4">
            {user ? (
              <div className="flex items-center gap-4">
                {!user.isPremium && user.role !== 'admin' && (
                  <Link
                    to="/subscribe"
                    className="hidden md:flex items-center gap-2 bg-gradient-to-r from-amber-500 to-orange-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:from-amber-600 hover:to-orange-700 transition-all tv-focusable"
                  >
                    <Crown className="h-4 w-4" />
                    Seja Premium
                  </Link>
                )}
                <div className="flex flex-col items-end">
                  <span className="text-sm font-medium text-white">{user.name}</span>
                  <span className="text-xs text-zinc-400">
                    {user.role === 'admin' ? 'Administrador' : user.isPremium ? 'Premium' : 'Gratuito'}
                  </span>
                </div>
                <button
                  onClick={logout}
                  className="p-2 text-zinc-400 hover:text-white hover:bg-zinc-800 rounded-md transition-colors tv-focusable"
                  title="Sair"
                >
                  <LogOut className="h-5 w-5" />
                </button>
              </div>
            ) : (
              <Link
                to="/login"
                className="flex items-center gap-2 bg-red-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-red-700 transition-colors tv-focusable"
              >
                <LogIn className="h-4 w-4" />
                Entrar
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
