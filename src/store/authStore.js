import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

const useAuthStore = create(
  persist(
    (set) => ({
      token: null,
      odontologies: [],
      role: null,
      isAuthenticated: false,
      username: null,
      urlSecundaria: null,
      login: (token, odontologies, role, username) => set({
        token,
        odontologies,
        role,
        username,
        isAuthenticated: true,
      }),
      logout: () => set({
        token: null,
        odontologies: [],
        role: null,
        isAuthenticated: false,
        urlSecundaria: null,
      }),

      setUrlSecundaria: (url) => set({ urlSecundaria: url }), 

    }),


    {
      name: 'auth-storage', 
      storage: createJSONStorage(() => localStorage),
    }
  )
)

export default useAuthStore;