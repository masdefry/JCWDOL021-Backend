import { IAuth } from '@/app/login/page';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface IUseAuthStoreState extends Pick<IAuth, 'fullName' | 'role'> {
  token: string;
}

interface IUseAuthStore extends IUseAuthStoreState {
  setAuth: ({ token, fullName, role }: IUseAuthStoreState) => void;
}

const useAuthStore = create<IUseAuthStore>()(
  persist(
    (set) => ({
      token: '',
      fullName: '',
      role: '',

      setAuth: ({ token, fullName, role }) =>
        set({ token: token, fullName: fullName, role: role }),
    }),
    {
      name: 'authToken',
      partialize: (state) => ({ token: state.token }),
    }
  )
);

export default useAuthStore;
