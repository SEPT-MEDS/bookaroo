import { useEffect } from 'react'

const useOnOutsideClick = (ref, cb) => {
  useEffect(() => {
    const handleClickOutside = e =>
      ref.current && !ref.current.contains(e.target) && cb(e)
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [ref])
}

export default useOnOutsideClick
