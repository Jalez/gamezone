// Create a zustand store for user data

import { create } from 'zustand';

type User = {
    username: string;
    email: string;
    _id: string;
    };

type UserStore = {
  user: User | null;
  setUser: (user: User) => void;
  clearUser: () => void;
};

const defaultUser: User = {
    username: '',
    email: '',
    _id: '',
    };


const useUserStore = create<UserStore>((set) => ({
  user: defaultUser,
  setUser: (user: User) => set({ user }),
  clearUser: () => set({ user: null }),
}));


export default useUserStore;