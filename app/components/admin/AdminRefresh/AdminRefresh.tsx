// app/admin/posts/AdminBackRefresh.tsx
'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export function AdminRefresh() {
  const router = useRouter()

  useEffect(() => {
    const refresh = () => router.refresh()

    const onVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        refresh()
      }
    }

    const onFocus = () => {
      refresh()
    }

    window.addEventListener('focus', onFocus)
    document.addEventListener('visibilitychange', onVisibilityChange)

    return () => {
      window.removeEventListener('focus', onFocus)
      document.removeEventListener('visibilitychange', onVisibilityChange)
    }
  }, [router])

  return null
}