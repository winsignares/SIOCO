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
      id: null,

      login: (token, odontologies, role, username, id) => set({
        token,
        odontologies,
        role,
        username,
        isAuthenticated: true,
        id,
      }),
      
      logout: () => set({
        token: null,
        odontologies: [],
        role: null,
        isAuthenticated: false,
        urlSecundaria: null,
        id: null,
        username: null
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