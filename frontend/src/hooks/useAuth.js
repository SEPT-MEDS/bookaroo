import { useEffect } from 'react'
import create from 'zustand'

const useTokenStore = create(set => ({
  token: window.localStorage.token,
  userId: window.localStorage.userId,
  setUserId: userId => set({ userId }),
  setToken: token => set({ token }),
  clearToken: () => set({ token: null }),
  clearUserId: () => set({ userId: null }),
}))

const useAuth = () => {
  const { token, userId, setToken: setStoredToken, setUserId: setStoredId } = useTokenStore()

  useEffect(() => {
    if (!token) {
      if (window.localStorage.token) {
        setStoredToken(window.localStorage.token)
      }
    }
    if (!userId) {
      if (window.localStorage.userId) {
        setStoredId(window.localStorage.userId)
      }
    }
  })

  const setToken = token => {
    window.localStorage.token = token
    setStoredToken(token)
  }

  const setUserId = userId => {
    window.localStorage.userId = userId
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

  const logout = () => {
    setStoredToken(null)
    setStoredId(null)
    window.localStorage.removeItem('token')
    window.localStorage.removeItem('userId')
  }

  return { token, logout, userId, setToken, setUserId, isLoggedIn: !!token, subscribeToLoggedIn }
}

export default useAuth
