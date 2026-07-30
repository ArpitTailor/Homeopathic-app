import { create } from 'zustand';

export const useAuthStore = create((set) => ({
  user: null,
  token: null,
  
  // Hydrate from localStorage on initial load
  hydrate: () => {
    if (typeof window !== 'undefined') {
      const storedToken = localStorage.getItem('token');
      const storedUser = localStorage.getItem('user');
      
      if (storedToken && storedUser) {
        try {
          set({ token: storedToken, user: JSON.parse(storedUser) });
        } catch (e) {
          console.error("Failed to parse user from local storage");
        }
      }
    }
  },

  login: (token, user) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
    }
    set({ token, user });
  },

  logout: () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
    }
    set({ token: null, user: null });
  },
}));
