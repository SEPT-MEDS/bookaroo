import { useState, useEffect } from 'react'
import { useAuth } from './'

const useCurrentProfile = () => {
  const [ profile, setProfile ] = useState(null)
  const { token } = useAuth()

  useEffect(() => {
    if (token) {
      // TODO: get user
      setProfile({ username: 'myname' })
    }
  }, [token])

  return profile
}

export default useCurrentProfile
