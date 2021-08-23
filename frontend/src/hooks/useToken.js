import { useEffect } from 'react'
import create from 'zustand'

const useTokenStore = create(set => ({
  token: window.sessionStorage.token,
  setToken: token => set({ token }),
  clearToken: () => set({ token: null })
}))

const useToken = () => {
  const { token, setToken: setStoredToken } = useTokenStore()

  useEffect(() => {
    if (!token) {
      if (window.sessionStorage.token) {
        setToken(window.sessionStorage.token)
      }
    }
  })

  const setToken = token => {
    window.sessionStorage.token = token
    setStoredToken(token)
  }

  const subscribeToLoggedIn = f => {
    useTokenStore.subscribe(t => {
      f(!!t)
    }, s => s.token)
  }

  return { token, setToken, isLoggedIn: (!!token), subscribeToLoggedIn }
}

export default useToken
