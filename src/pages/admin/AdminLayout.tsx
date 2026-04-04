import React from 'react';
import { Outlet, Link, useLocation, Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Video, Radio, Users, LayoutDashboard, Crown } from 'lucide-react';
import { cn } from '../../lib/utils';

export function AdminLayout() {
  const { user } = useAuth();
  const location = useLocation();

  if (!user || user.role !== 'admin') {
    return <Navigate to="/videos" />;
  }

  const menuItems = [
    { name: 'Dashboard', path: '/admin', icon: LayoutDashboard, exact: true },
    { name: 'Vídeos (VOD)', path: '/admin/videos', icon: Video },
    { name: 'Transmissão ao Vivo', path: '/admin/live', icon: Radio },
    { name: 'Usuários', path: '/admin/users', icon: Users },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col md:flex-row gap-8">
      <aside className="w-full md:w-64 shrink-0">
        <div className="bg-slate-900/60 backdrop-blur-sm rounded-2xl border border-slate-800 p-4 sticky top-24 shadow-xl">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-red-500 to-amber-500 rounded-t-2xl"></div>
          <h2 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-4 px-3 mt-2">
            Painel de Controle
          </h2>
          <nav className="space-y-1.5">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = item.exact 
                ? location.pathname === item.path 
                : location.pathname.startsWith(item.path);
                
              return (
                <Link
                  key={item.name}
                  to={item.path}
                  className={cn(
                    "flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-300",
                    isActive
                      ? "bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg shadow-blue-500/20"
                      : "text-slate-400 hover:bg-slate-800/80 hover:text-white"
                  )}
                >
                  <Icon className={cn("w-5 h-5", isActive ? "text-white" : "text-slate-500")} />
                  {item.name}
                </Link>
              );
            })}
          </nav>
        </div>
      </aside>

      <main className="flex-1 min-w-0">
        {location.pathname === '/admin' ? (
          <div className="space-y-6">
            <h1 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-red-400 to-amber-400">Visão Geral</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-slate-900/60 backdrop-blur-sm p-6 rounded-2xl border border-slate-800 shadow-lg group hover:border-blue-500/50 transition-all">
                <Video className="w-8 h-8 text-blue-500 mb-4 group-hover:scale-110 transition-transform" />
                <div className="text-3xl font-bold text-white">24</div>
                <div className="text-sm text-slate-400">Vídeos Publicados</div>
              </div>
              <div className="bg-slate-900/60 backdrop-blur-sm p-6 rounded-2xl border border-slate-800 shadow-lg group hover:border-green-500/50 transition-all">
                <Users className="w-8 h-8 text-green-500 mb-4 group-hover:scale-110 transition-transform" />
                <div className="text-3xl font-bold text-white">1,204</div>
                <div className="text-sm text-slate-400">Usuários Ativos</div>
              </div>
              <div className="bg-slate-900/60 backdrop-blur-sm p-6 rounded-2xl border border-slate-800 shadow-lg group hover:border-amber-500/50 transition-all">
                <Crown className="w-8 h-8 text-amber-500 mb-4 group-hover:scale-110 transition-transform" />
                <div className="text-3xl font-bold text-white">342</div>
                <div className="text-sm text-slate-400">Assinantes Premium</div>
              </div>
              <div className="bg-slate-900/60 backdrop-blur-sm p-6 rounded-2xl border border-slate-800 shadow-lg group hover:border-purple-500/50 transition-all">
                <div className="text-purple-500 font-bold text-2xl mb-4 group-hover:scale-110 transition-transform">Kz</div>
                <div className="text-3xl font-bold text-white">10.2M</div>
                <div className="text-sm text-slate-400">Receita Mensal</div>
              </div>
            </div>
          </div>
        ) : (
          <Outlet />
        )}
      </main>
    </div>
  );
}
