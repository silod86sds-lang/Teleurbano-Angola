import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Tv, LogIn, AlertCircle, User as UserIcon, Shield } from 'lucide-react';

export function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [loginType, setLoginType] = useState<'user' | 'admin'>('user');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    try {
      if (loginType === 'admin') {
        if (email !== 'Teleurbano@admnistra' || password !== '1992') {
          throw new Error('Credenciais de administrador inválidas.');
        }
        await login(email, password);
      } else {
        if (!email || !email.includes('@')) {
          throw new Error('Por favor, insira um e-mail válido.');
        }
        await login(email);
      }
      navigate('/');
    } catch (error: any) {
      console.error("Login failed", error);
      setErrorMsg(error.message || 'Erro ao fazer login');
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
        
        {errorMsg && (
          <div className="bg-red-500/10 border border-red-500/50 rounded-xl p-4 flex items-start gap-3 mt-6">
            <AlertCircle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
            <p className="text-sm text-red-200">{errorMsg}</p>
          </div>
        )}

        <div className="flex bg-slate-950 border border-slate-700 rounded-xl p-1 mt-6">
          <button
            type="button"
            onClick={() => { setLoginType('user'); setErrorMsg(null); setEmail(''); setPassword(''); }}
            className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-lg text-sm font-medium transition-all tv-focusable ${loginType === 'user' ? 'bg-slate-800 text-white shadow-sm' : 'text-slate-400 hover:text-slate-200'}`}
          >
            <UserIcon className="w-4 h-4" />
            Usuário
          </button>
          <button
            type="button"
            onClick={() => { setLoginType('admin'); setErrorMsg(null); setEmail(''); setPassword(''); }}
            className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-lg text-sm font-medium transition-all tv-focusable ${loginType === 'admin' ? 'bg-slate-800 text-white shadow-sm' : 'text-slate-400 hover:text-slate-200'}`}
          >
            <Shield className="w-4 h-4" />
            Administrador
          </button>
        </div>

        <form className="mt-6 space-y-4" onSubmit={handleLogin}>
          {loginType === 'admin' ? (
            <>
              <div>
                <label className="block text-sm font-medium text-slate-400 mb-1.5">Código de Acesso</label>
                <input required type="text" value={email} onChange={e => setEmail(e.target.value)} className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all tv-focusable" placeholder="Ex: Teleurbano@admnistra" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-400 mb-1.5">Palavra-passe</label>
                <input required type="password" value={password} onChange={e => setPassword(e.target.value)} className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all tv-focusable" placeholder="••••" />
              </div>
            </>
          ) : (
            <div>
              <label className="block text-sm font-medium text-slate-400 mb-1.5">Seu E-mail</label>
              <input required type="email" value={email} onChange={e => setEmail(e.target.value)} className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all tv-focusable" placeholder="seu@email.com" />
            </div>
          )}

          <button
            type="submit"
            className="group relative w-full flex justify-center py-3.5 px-4 mt-6 border border-transparent text-sm font-bold rounded-xl text-white bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 focus:ring-offset-slate-900 transition-all shadow-lg shadow-blue-500/30 hover:-translate-y-0.5 tv-focusable"
          >
            <span className="absolute left-0 inset-y-0 flex items-center pl-4">
              <LogIn className="h-5 w-5 text-blue-300 group-hover:text-white transition-colors" aria-hidden="true" />
            </span>
            {loginType === 'admin' ? 'Entrar como Administrador' : 'Acessar Conteúdos'}
          </button>
        </form>
      </div>
    </div>
  );
}
