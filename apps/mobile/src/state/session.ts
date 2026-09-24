import { create } from 'zustand';
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
  setSession: (token: string, user: SessionUser) => void;
  setRole: (role: UserRole) => void;
  clearSession: () => void;
}

// TODO(M1): hydrate/persist this from SecureStore instead of memory-only.
export const useSessionStore = create<SessionState>((set) => ({
  token: null,
  user: null,
  role: 'rider',
  setSession: (token, user) => set({ token, user }),
  setRole: (role) => set({ role }),
  clearSession: () => set({ token: null, user: null }),
}));
