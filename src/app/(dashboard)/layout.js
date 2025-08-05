import Navbar from '@/components/layout/navbar'

export default async function DashboardLayout({ children }) {  
  return (
    <>
      <Navbar />
      <div className="flex">
        <main className="flex-1 p-6">
          {children}
        </main>
      </div>
    </>
  )
}