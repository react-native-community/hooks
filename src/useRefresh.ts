import {useState} from 'react'

export function useRefresh(refresh: () => Promise<unknown>) {
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false)

  async function initiateRefresh() {
    setIsRefreshing(true)

    try {
      await refresh()
    } finally {
      setIsRefreshing(false)
    }
  }

  return {isRefreshing, initiateRefresh}
}
