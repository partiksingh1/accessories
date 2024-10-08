import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import axios from 'axios'

interface AuthState {
  token: string | null
  user: {
    id: string
    name: string
    email: string
    role: 'SALESPERSON' | 'DISTRIBUTOR' | 'ADMIN'
  } | null
  login: (email: string, password: string, role: string) => Promise<void>
  logout: () => void
}

export const useAuth = create<AuthState>()(
  persist(
    (set) => ({
      token: null,
      user: null,
      login: async (email, password, role) => {
        try {
          const response = await axios.post(`/api/auth/${role.toLowerCase()}/login`, {
            email,
            password,
          })
          const { token, user } = response.data
          set({ token, user })
        } catch (error) {
          throw error
        }
      },
      logout: () => {
        set({ token: null, user: null })
      },
    }),
    {
      name: 'auth-storage',
    }
  )
)