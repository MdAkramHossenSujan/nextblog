import DashboardNavbar from '@/components/shared/DashboardNavbar'
import React from 'react'

export default function DashboardPage({ children }: { children: React.ReactNode }) {
  return (
    <>
    <DashboardNavbar/>
      {children}
    </>
  )
}