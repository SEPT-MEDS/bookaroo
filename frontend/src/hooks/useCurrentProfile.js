import { useAuth, useAsync } from './'

import { getUser } from 'services'

const useCurrentProfile = () => {
  const { isLoggedIn, userId } = useAuth()
  const { response: user } = useAsync(() => isLoggedIn && getUser(userId), [isLoggedIn])

  return user
}

export default useCurrentProfile
