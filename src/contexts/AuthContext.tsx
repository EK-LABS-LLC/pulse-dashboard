import { createContext, useContext, type ReactNode } from 'react';
import { authClient } from '../lib/auth-client';

interface AuthContextType {
  user: { id: string; name: string; email: string } | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const { data: session, isPending } = authClient.useSession();

  const isAuthenticated = !!session?.user;
  const user = session?.user ? {
    id: session.user.id,
    name: session.user.name,
    email: session.user.email,
  } : null;

  const logout = async () => {
    await authClient.signOut();
  };

  return (
    <AuthContext.Provider value={{
      user,
      isLoading: isPending,
      isAuthenticated,
      logout,
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
