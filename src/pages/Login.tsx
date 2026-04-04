import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth, Role } from '../context/AuthContext';
import { Tv, LogIn } from 'lucide-react';

export function Login() {
  const [email, setEmail] = useState('');
  const [role, setRole] = useState<Role>('user');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      login(email, role);
      navigate('/');
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 sm:px-6 lg:px-8 relative">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-900/10 via-transparent to-transparent pointer-events-none"></div>
      <div className="max-w-md w-full space-y-8 bg-slate-900/80 backdrop-blur-md p-10 rounded-3xl border border-slate-800 shadow-[0_0_50px_rgba(0,0,0,0.5)] relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-blue-500 via-red-500 to-amber-500"></div>
        <div className="text-center">
          <div className="mx-auto h-20 w-20 bg-white rounded-2xl flex items-center justify-center mb-6 p-3 shadow-[0_0_30px_rgba(59,130,246,0.3)] ring-4 ring-white/10">
            <img src="/logo.png" alt="Logo" className="h-full w-full object-contain" onError={(e) => { e.currentTarget.style.display = 'none'; e.currentTarget.nextElementSibling!.style.display = 'block'; }} />
            <Tv className="h-10 w-10 text-blue-800 hidden" />
          </div>
          <h2 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-red-400 to-amber-400">Entrar na Teleurbano Angola</h2>
          <p className="mt-3 text-sm text-slate-400 font-medium tracking-wide">
            Acesse seus conteúdos favoritos
          </p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-5">
            <div>
              <label htmlFor="email-address" className="block text-sm font-bold text-slate-300 mb-2">
                Endereço de Email
              </label>
              <input
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="appearance-none relative block w-full px-4 py-3 border border-slate-700 bg-slate-950 placeholder-slate-500 text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm transition-all shadow-inner tv-focusable"
                placeholder="seu@email.com"
              />
              <p className="mt-2 text-xs text-slate-500 font-medium">
                Dica: Use <span className="text-blue-400">admin@webtv.com</span> para acessar o painel.
              </p>
            </div>
            
            <div>
              <label className="block text-sm font-bold text-slate-300 mb-2">
                Tipo de Conta (Simulação)
              </label>
              <select
                value={role}
                onChange={(e) => setRole(e.target.value as Role)}
                className="appearance-none relative block w-full px-4 py-3 border border-slate-700 bg-slate-950 text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm shadow-inner tv-focusable"
              >
                <option value="user">Usuário Comum</option>
                <option value="admin">Administrador</option>
              </select>
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-3.5 px-4 border border-transparent text-sm font-bold rounded-xl text-white bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 focus:ring-offset-slate-900 transition-all shadow-lg shadow-blue-500/30 hover:-translate-y-0.5 tv-focusable"
            >
              <span className="absolute left-0 inset-y-0 flex items-center pl-4">
                <LogIn className="h-5 w-5 text-blue-300 group-hover:text-white transition-colors" aria-hidden="true" />
              </span>
              Entrar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
