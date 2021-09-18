import { useState, useEffect } from 'react'

const useAsync = (promise, dependencies = []) => {
  const [error, setError] = useState()
  const [isLoading, setIsLoading] = useState(false)
  const [isMounted, setIsMounted] = useState(true)
  const [response, setResponse] = useState()

  useEffect(() => {
    if (promise) {
      setIsLoading(true)
      promise()
        ?.then(response => isMounted && setResponse(response))
        ?.then(() => setIsLoading(false))
        ?.catch(err => {
          setIsLoading(false)
          setError(err.message)
        })
    }
    return () => setIsMounted(false)
  }, dependencies)

  return {response, isLoading, error}
}

export default useAsync
