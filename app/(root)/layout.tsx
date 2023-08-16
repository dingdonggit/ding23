import '../globals.css'
import type { Metadata } from 'next'
import { Nunito } from "next/font/google"
import Navbar from '../../components/Navbar/Navbar'
import ClientOnly from '../../components/ClientOnly'
// import RegisterModal from '../../components/modals/RegisterModal'
import ToasterProvider from '../providers/ToasterProvider'
// import LoginModal from '../../components/modals/LoginModal'
// import getCurrentUser from '../actions/getCurrentUser';
// import CreateProjectModal from '../../components/modals/CreateProjectModal'
import SearchModal from '../../components/modals/SearchModal'
import Footer from '../../components/Footer/Footer'
import { ClerkProvider } from "@clerk/nextjs"
import { currentUser } from "@clerk/nextjs";

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
  const user = await currentUser();
  if (!user) return null;
  // const currentUser = await getCurrentUser();
  return (
    <ClerkProvider>
    <html lang="en">
      
      <body className={font.className}>
      <ClientOnly>
      <ToasterProvider />
      {/* <SearchModal /> */}
      {/* <CreateProjectModal />
      <LoginModal />
      <RegisterModal /> */}
      
      <Navbar />
    
      </ClientOnly>
      <div className='pb-20 pt-20'>{children}</div>
      <Footer />
      </body>
    </html>
    </ClerkProvider>
  )
}
