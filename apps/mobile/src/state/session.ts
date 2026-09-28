import * as SecureStore from 'expo-secure-store';
import { create } from 'zustand';
import { createJSONStorage, persist, type StateStorage } from 'zustand/middleware';
import type { UserRole } from '@my-driver/shared';

interface SessionUser {
  id: string;
  name: string;
  email: string;
}

interface SessionState {
  token: string | null;
  user: SessionUser | null;
  role: UserRole;
  hasHydrated: boolean;
  setSession: (token: string, user: SessionUser) => void;
  setRole: (role: UserRole) => void;
  clearSession: () => void;
  setHasHydrated: (value: boolean) => void;
}

const secureStoreStorage: StateStorage = {
  getItem: (name) => SecureStore.getItemAsync(name),
  setItem: (name, value) => SecureStore.setItemAsync(name, value),
  removeItem: (name) => SecureStore.deleteItemAsync(name),
};

export const useSessionStore = create<SessionState>()(
  persist(
    (set) => ({
      token: null,
      user: null,
      role: 'rider',
      hasHydrated: false,
      setSession: (token, user) => set({ token, user }),
      setRole: (role) => set({ role }),
      clearSession: () => set({ token: null, user: null }),
      setHasHydrated: (value) => set({ hasHydrated: value }),
    }),
    {
      name: 'my-driver-session',
      storage: createJSONStorage(() => secureStoreStorage),
      partialize: (state) => ({ token: state.token, user: state.user, role: state.role }),
      onRehydrateStorage: () => (state) => {
        state?.setHasHydrated(true);
      },
    },
  ),
);
