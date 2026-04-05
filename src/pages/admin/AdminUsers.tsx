import React, { useState, useEffect } from 'react';
import { Users, Crown, CheckCircle2, XCircle } from 'lucide-react';
import { User } from '../../context/AuthContext';

export function AdminUsers() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = () => {
    // Mock users data
    const defaultMockUsers: User[] = [
      {
        id: 'user-1',
        name: 'Administrador',
        email: 'Teleurbano@admnistra',
        role: 'admin',
        isPremium: true,
        createdAt: Date.now() - 86400000 * 30, // 30 days ago
      },
      {
        id: 'user-2',
        name: 'João Silva',
        email: 'joao@example.com',
        role: 'user',
        isPremium: true,
        premiumUntil: Date.now() + 86400000 * 15,
        createdAt: Date.now() - 86400000 * 15,
      },
      {
        id: 'user-3',
        name: 'Maria Santos',
        email: 'maria@example.com',
        role: 'user',
        isPremium: false,
        createdAt: Date.now() - 86400000 * 2,
      }
    ];
    
    // Check if there's a logged in mock user in localStorage to add to the list
    const allUsersStr = localStorage.getItem('all_mock_users');
    let allUsers: User[] = [];
    
    if (allUsersStr) {
      try {
        allUsers = JSON.parse(allUsersStr);
      } catch (e) {
        console.error("Error parsing stored users", e);
      }
    }

    // Merge default mock users with stored users
    const mergedUsers = [...defaultMockUsers];
    allUsers.forEach(storedUser => {
      if (!mergedUsers.find(u => u.email === storedUser.email)) {
        mergedUsers.push(storedUser);
      } else {
        // Update existing user with stored data (in case premium status changed)
        const index = mergedUsers.findIndex(u => u.email === storedUser.email);
        mergedUsers[index] = storedUser;
      }
    });

    setUsers(mergedUsers.sort((a, b) => (b.createdAt || 0) - (a.createdAt || 0)));
    setLoading(false);
  };

  const handleTogglePremium = (userId: string, currentPremiumStatus: boolean) => {
    const updatedUsers = users.map(u => {
      if (u.id === userId) {
        const isPremium = !currentPremiumStatus;
        // If activating premium, set expiration to 30 days from now
        const premiumUntil = isPremium ? Date.now() + (30 * 24 * 60 * 60 * 1000) : undefined;
        return { ...u, isPremium, premiumUntil };
      }
      return u;
    });

    setUsers(updatedUsers);
    localStorage.setItem('all_mock_users', JSON.stringify(updatedUsers));
    
    // If the updated user is the currently logged in user, update their session too
    const currentUserStr = localStorage.getItem('mock_user');
    if (currentUserStr) {
      const currentUser = JSON.parse(currentUserStr);
      if (currentUser.id === userId) {
        const updatedCurrentUser = updatedUsers.find(u => u.id === userId);
        localStorage.setItem('mock_user', JSON.stringify(updatedCurrentUser));
      }
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <h2 className="text-2xl sm:text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-red-400 to-amber-400 flex items-center gap-3">
          <Users className="w-6 h-6 sm:w-8 sm:h-8 text-green-500 shrink-0" />
          Gerenciar Usuários
        </h2>
      </div>

      <div className="bg-slate-900/60 backdrop-blur-sm rounded-2xl border border-slate-800 overflow-hidden shadow-lg relative overflow-x-auto">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-red-500 to-amber-500"></div>
        <table className="min-w-full divide-y divide-slate-800/50 mt-1">
          <thead className="bg-slate-800/30">
            <tr>
              <th className="px-6 py-4 text-left text-xs font-bold text-slate-400 uppercase tracking-wider">Usuário</th>
              <th className="px-6 py-4 text-left text-xs font-bold text-slate-400 uppercase tracking-wider">Status</th>
              <th className="px-6 py-4 text-left text-xs font-bold text-slate-400 uppercase tracking-wider">Papel</th>
              <th className="px-6 py-4 text-left text-xs font-bold text-slate-400 uppercase tracking-wider">Membro desde</th>
              <th className="px-6 py-4 text-right text-xs font-bold text-slate-400 uppercase tracking-wider">Ações</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/50">
            {loading ? (
              <tr>
                <td colSpan={5} className="px-6 py-8 text-center text-slate-400">
                  Carregando usuários...
                </td>
              </tr>
            ) : users.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-6 py-8 text-center text-slate-400">
                  Nenhum usuário encontrado.
                </td>
              </tr>
            ) : (
              users.map((user) => (
                <tr key={user.id} className="hover:bg-slate-800/30 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="h-10 w-10 rounded-full bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center text-white font-bold shadow-lg shadow-blue-500/20">
                        {user.name ? user.name.charAt(0).toUpperCase() : '?'}
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-bold text-slate-100">{user.name}</div>
                        <div className="text-sm text-slate-500">{user.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex flex-col gap-1">
                      {user.isPremium ? (
                        <span className="px-3 py-1 inline-flex text-xs leading-5 font-bold rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/20 items-center gap-1.5 shadow-sm w-fit">
                          <Crown className="w-3.5 h-3.5" /> Premium
                        </span>
                      ) : (
                        <span className="px-3 py-1 inline-flex text-xs leading-5 font-bold rounded-full bg-slate-800 text-slate-300 border border-slate-700 shadow-sm w-fit">
                          Gratuito
                        </span>
                      )}
                      {user.isPremium && user.premiumUntil && (
                        <span className="text-[10px] text-slate-500">
                          Até: {new Date(user.premiumUntil).toLocaleDateString('pt-BR')}
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-400 font-medium">
                    {user.role === 'admin' ? (
                      <span className="text-red-400">Administrador</span>
                    ) : (
                      <span>Usuário</span>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-400">
                    {user.createdAt ? new Date(user.createdAt).toLocaleDateString('pt-BR') : '-'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    {user.role !== 'admin' && (
                      <button
                        onClick={() => handleTogglePremium(user.id, user.isPremium)}
                        className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                          user.isPremium 
                            ? 'bg-red-500/10 text-red-400 hover:bg-red-500/20 border border-red-500/20' 
                            : 'bg-green-500/10 text-green-400 hover:bg-green-500/20 border border-green-500/20'
                        }`}
                      >
                        {user.isPremium ? (
                          <>
                            <XCircle className="w-3.5 h-3.5" />
                            Remover Premium
                          </>
                        ) : (
                          <>
                            <CheckCircle2 className="w-3.5 h-3.5" />
                            Aprovar Premium
                          </>
                        )}
                      </button>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
