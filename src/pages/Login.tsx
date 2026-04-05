import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Tv, LogIn } from 'lucide-react';

export function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await login();
      navigate('/');
    } catch (error) {
      console.error("Login failed", error);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 sm:px-6 lg:px-8 relative">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-900/10 via-transparent to-transparent pointer-events-none"></div>
      <div className="max-w-md w-full space-y-8 bg-slate-900/80 backdrop-blur-md p-10 rounded-3xl border border-slate-800 shadow-[0_0_50px_rgba(0,0,0,0.5)] relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-blue-500 via-red-500 to-amber-500"></div>
        <div className="text-center">
          <div className="mx-auto h-20 w-20 bg-white rounded-2xl flex items-center justify-center mb-6 p-3 shadow-[0_0_30px_rgba(59,130,246,0.3)] ring-4 ring-white/10">
            <img src="https://i.ibb.co/4Z5Vss6p/logo2-png.jpg" alt="Logo" className="h-full w-full object-contain rounded-xl" onError={(e) => { e.currentTarget.style.display = 'none'; e.currentTarget.nextElementSibling!.style.display = 'block'; }} />
            <Tv className="h-10 w-10 text-blue-800 hidden" />
          </div>
          <h2 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-red-400 to-amber-400">Entrar na Teleurbano Angola</h2>
          <p className="mt-3 text-sm text-slate-400 font-medium tracking-wide">
            Acesse seus conteúdos favoritos
          </p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleLogin}>
          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-3.5 px-4 border border-transparent text-sm font-bold rounded-xl text-white bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 focus:ring-offset-slate-900 transition-all shadow-lg shadow-blue-500/30 hover:-translate-y-0.5 tv-focusable"
            >
              <span className="absolute left-0 inset-y-0 flex items-center pl-4">
                <LogIn className="h-5 w-5 text-blue-300 group-hover:text-white transition-colors" aria-hidden="true" />
              </span>
              Entrar com Google
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
