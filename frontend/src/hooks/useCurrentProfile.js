import { useEffect } from 'react'
import { useAuth, useAsync } from './'
import create from 'zustand'

import { getUser } from 'services'

export const useUserStore = create(set => ({
  user: null,
  setUser: user => set(() => ({ user })),
  clearUser: () => set(() => ({user: null}))
})) 

const useCurrentProfile = () => {
  const { isLoggedIn, userId } = useAuth()
  const { user: cachedUser, setUser: setCachedUser } = useUserStore()
  const { response: user } = useAsync(() => (
    (!cachedUser || cachedUser?.id !== userId) && isLoggedIn) ? getUser(userId) : null
  , [isLoggedIn, userId])

  // Update cache with requested user
  useEffect(() => {
    if (user)
      setCachedUser(user)
  }, [user])

  return cachedUser || user
}

export default useCurrentProfile
