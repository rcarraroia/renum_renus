import React, { createContext, useContext, useState, useMemo } from 'react';
import { User, UserRole, AuthContextType } from '@/types/auth';
import { toast } from 'sonner';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const MOCK_ADMIN: User = {
  id: 'admin-123',
  name: 'Admin Renum',
  email: 'admin@renum.tech',
  role: 'admin',
};

const MOCK_CLIENT: User = {
  id: 'client-456',
  name: 'Client Alpha',
  email: 'client@alpha.com',
  role: 'client',
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const isAuthenticated = !!user;
  const role: UserRole = user?.role || 'guest';

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    if (email === MOCK_ADMIN.email && password === 'password') {
      setUser(MOCK_ADMIN);
      toast.success(`Bem-vindo, ${MOCK_ADMIN.name}!`);
    } else if (email === MOCK_CLIENT.email && password === 'password') {
      setUser(MOCK_CLIENT);
      toast.success(`Bem-vindo, ${MOCK_CLIENT.name}!`);
    } else {
      toast.error('Credenciais inválidas. Tente admin@renum.tech ou client@alpha.com com senha: password');
    }
    setIsLoading(false);
  };

  const logout = () => {
    setUser(null);
    toast.info('Sessão encerrada.');
  };

  const value = useMemo(() => ({
    user,
    isAuthenticated,
    role,
    login,
    logout,
    isLoading,
  }), [user, isLoading, isAuthenticated, role]);

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};