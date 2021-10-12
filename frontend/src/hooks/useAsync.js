import { useState, useEffect } from 'react'

const useAsync = (promise, dependencies = []) => {
  const [error, setError] = useState()
  const [isLoading, setIsLoading] = useState(false)
  const [isMounted, setIsMounted] = useState(true)
  const [response, setResponse] = useState()
  const [isValid, setIsValid] = useState(false)

  const invalidate = () => setIsValid(false)

  useEffect(() => {
    if (promise) {
      setIsLoading(true)
      promise()
        ?.then(response => isMounted && setResponse(response))
        ?.then(() => setIsLoading(false))
        ?.then(() => setIsValid(true))
        ?.catch(err => {
          setIsLoading(false)
          setIsValid(true)
          setError(err.message)
        })
    }
    return () => setIsMounted(false)
  }, [...dependencies, isValid])

  return {response, isLoading, error, invalidate}
}

export default useAsync
