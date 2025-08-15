import { createContext, useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

const AuthContext = createContext({});

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [role, setRole] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // Check for existing session
    const storedUser = localStorage.getItem('user');
    const storedRole = localStorage.getItem('role');
    
    if (storedUser && storedRole) {
      setUser(JSON.parse(storedUser));
      setRole(storedRole);
    }
    
    setLoading(false);
  }, []);

  const signIn = async (email, password) => {
    try {
      // Mock authentication - replace with real API
      const mockUser = {
        id: '1',
        email,
        name: 'John Doe',
      };
      
      // Determine role based on email domain or other logic
      let userRole = 'resident';
      if (email.includes('admin')) userRole = 'admin';
      else if (email.includes('owner')) userRole = 'owner';
      else if (email.includes('manager')) userRole = 'manager';
      
      setUser(mockUser);
      setRole(userRole);
      
      localStorage.setItem('user', JSON.stringify(mockUser));
      localStorage.setItem('role', userRole);
      
      return { user: mockUser, role: userRole };
    } catch (error) {
      throw new Error('Authentication failed');
    }
  };

  const signOut = () => {
    setUser(null);
    setRole(null);
    localStorage.removeItem('user');
    localStorage.removeItem('role');
    router.push('/');
  };

  const value = {
    user,
    role,
    loading,
    signIn,
    signOut,
  };

  return (
    <AuthContext.Provider value={value}>
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