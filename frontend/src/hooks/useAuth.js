import { useEffect } from 'react'
import create from 'zustand'

const useTokenStore = create(set => ({
  token: window.sessionStorage.token,
  userId: window.sessionStorage.userId,
  setUserId: userId => set({ userId }),
  setToken: token => set({ token }),
  clearToken: () => set({ token: null }),
  clearUserId: () => set({ userId: null }),
}))

const useAuth = () => {
  const { token, userId, setToken: setStoredToken, setUserId: setStoredId } = useTokenStore()

  useEffect(() => {
    if (!token) {
      if (window.sessionStorage.token) {
        setStoredToken(window.sessionStorage.token)
      }
    }
    if (!userId) {
      if (window.sessionStorage.userId) {
        setStoredId(window.sessionStorage.userId)
      }
    }
  })

  const setToken = token => {
    window.sessionStorage.token = token
    setStoredToken(token)
  }

  const setUserId = userId => {
    window.sessionStorage.userId = userId
    setStoredId(userId)
  }

  const subscribeToLoggedIn = f => {
    useTokenStore.subscribe(
      t => {
        f(!!t)
      },
      s => s.token
    )
  }

  return { token, userId, setToken, setUserId, isLoggedIn: !!token, subscribeToLoggedIn }
}

export default useAuth
