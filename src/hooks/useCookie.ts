import { useState, useCallback } from 'react'
import Cookies from 'js-cookie'

type UseCookieReturn = [string | null, (newValue: string, options?: Cookies.CookieAttributes) => void, () => void]

const useCookie = (cookieName: string): UseCookieReturn => {
  const [value, setValue] = useState<string | null>(() => Cookies.get(cookieName) || null)

  const updateCookie = useCallback(
    (newValue: string, options: Cookies.CookieAttributes) => {
      Cookies.set(cookieName, newValue, options)
      setValue(newValue)
    },
    [cookieName]
  )

  const deleteCookie = useCallback(() => {
    Cookies.remove(cookieName)
    setValue(null)
  }, [cookieName])

  return [value, updateCookie, deleteCookie]
}

export default useCookie
