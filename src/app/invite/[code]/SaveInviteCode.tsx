'use client'

import { useEffect } from 'react'

export default function SaveInviteCode({ code }: { code: string }) {
  useEffect(() => {
    sessionStorage.setItem('pending_invite', code)
  }, [code])
  return null
}
