import './globals.css'
import type { Metadata } from 'next'
import { Nunito } from "next/font/google"
import Navbar from './components/Navbar/Navbar'
import ClientOnly from './components/ClientOnly'
import RegisterModal from './components/modals/RegisterModal'
import ToasterProvider from './providers/ToasterProvider'
import LoginModal from './components/modals/LoginModal'
import getCurrentUser from './actions/getCurrentUser';
import CreateProjectModal from './components/modals/CreateProjectModal'
import SearchModal from './components/modals/SearchModal'



export const metadata: Metadata = {
  title: 'DingDong - One Platform for all the developers',
  description: 'Find a trade partner, Request an RFP, Create a project or find existing ones ',
}
const font = Nunito({
  subsets: ['latin'],
})
export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const currentUser = await getCurrentUser();
  return (
    <html lang="en">
      
      <body className={font.className}>
      <ClientOnly>
      <ToasterProvider />
      <SearchModal />
      <CreateProjectModal />
      <LoginModal />
      <RegisterModal />
      <Navbar currentUser={currentUser} />
      </ClientOnly>
        {children}
      </body>
    </html>
  )
}
