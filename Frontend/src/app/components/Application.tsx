'use client';
import { SessionProvider } from "next-auth/react"
import { ReactNode } from "react"

interface ApplicationProps {
  children: ReactNode
}

const Application = ({ children }: ApplicationProps) => {
  return (
    <SessionProvider>
      {children}
    </SessionProvider>
  )
}

export default Application
