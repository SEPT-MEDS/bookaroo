import {useState, useEffect} from 'react'

const useDebounce = (value, delay) => {
  const [val, setVal] = useState(value)

  useEffect(() => {
    const timerId = setTimeout(() => setVal(value), delay)
    return () => clearTimeout(timerId)
  }, [value, delay])

  return val
}

export default useDebounce
