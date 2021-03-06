import create from 'zustand'
import { persist } from 'zustand/middleware'

const TOKEN_EXP_TIME = 86400000
const STORAGE_KEY = 'bookaroo-auth'

const useTokenStore = create(
  persist(
    set => ({
      token: null,
      userId: null,
      loginTime: null,
      login: (token, userId) =>
        set({ token, userId, loginTime: Date.now() }),
      logout: () => set({ token: null, userId: null, loginTime: null }),
    }),
    {
      name: 'bookaroo-auth',
    }
  )
)

const useAuth = () => {
  const { token, userId, loginTime, login, logout } = useTokenStore()

  const isLoggedIn = token && userId && Date.now() - loginTime <= TOKEN_EXP_TIME

  return {
    token,
    userId,
    isLoggedIn,
    authLogout: logout,
    authLogin: login,
  }
}

export const getTokenRaw = () =>
  JSON.parse(window.localStorage[STORAGE_KEY])?.state?.token

export default useAuth
