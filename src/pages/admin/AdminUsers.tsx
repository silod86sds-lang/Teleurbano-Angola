import React from 'react';
import { Users, Crown } from 'lucide-react';

export function AdminUsers() {
  // Mock users for demonstration
  const mockUsers = [
    { id: '1', name: 'Admin User', email: 'admin@webtv.com', role: 'admin', isPremium: true, joinDate: '2023-01-15' },
    { id: '2', name: 'João Silva', email: 'joao@example.com', role: 'user', isPremium: true, joinDate: '2023-05-20' },
    { id: '3', name: 'Maria Souza', email: 'maria@example.com', role: 'user', isPremium: false, joinDate: '2023-08-10' },
    { id: '4', name: 'Pedro Santos', email: 'pedro@example.com', role: 'user', isPremium: false, joinDate: '2023-11-05' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-red-400 to-amber-400 flex items-center gap-3">
          <Users className="w-8 h-8 text-green-500" />
          Gerenciar Usuários
        </h2>
      </div>

      <div className="bg-slate-900/60 backdrop-blur-sm rounded-2xl border border-slate-800 overflow-hidden shadow-lg relative">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-red-500 to-amber-500"></div>
        <table className="min-w-full divide-y divide-slate-800/50 mt-1">
          <thead className="bg-slate-800/30">
            <tr>
              <th className="px-6 py-4 text-left text-xs font-bold text-slate-400 uppercase tracking-wider">Usuário</th>
              <th className="px-6 py-4 text-left text-xs font-bold text-slate-400 uppercase tracking-wider">Status</th>
              <th className="px-6 py-4 text-left text-xs font-bold text-slate-400 uppercase tracking-wider">Papel</th>
              <th className="px-6 py-4 text-left text-xs font-bold text-slate-400 uppercase tracking-wider">Membro desde</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/50">
            {mockUsers.map((user) => (
              <tr key={user.id} className="hover:bg-slate-800/30 transition-colors">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="h-10 w-10 rounded-full bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center text-white font-bold shadow-lg shadow-blue-500/20">
                      {user.name.charAt(0)}
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-bold text-slate-100">{user.name}</div>
                      <div className="text-sm text-slate-500">{user.email}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {user.isPremium ? (
                    <span className="px-3 py-1 inline-flex text-xs leading-5 font-bold rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/20 items-center gap-1.5 shadow-sm">
                      <Crown className="w-3.5 h-3.5" /> Premium
                    </span>
                  ) : (
                    <span className="px-3 py-1 inline-flex text-xs leading-5 font-bold rounded-full bg-slate-800 text-slate-300 border border-slate-700 shadow-sm">
                      Gratuito
                    </span>
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-400 font-medium">
                  {user.role === 'admin' ? (
                    <span className="text-red-400">Administrador</span>
                  ) : (
                    <span>Usuário</span>
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-400">
                  {new Date(user.joinDate).toLocaleDateString('pt-BR')}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
