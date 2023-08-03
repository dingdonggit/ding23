import Image from 'next/image'
import ClientOnly from './components/ClientOnly'
import Container from './components/Container'

export default function Home() {
  return (
   <>
   <ClientOnly >
    <Container>
       <div className="pt-24 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
          <div>Featured Listings Goes here </div>
          <div>Featured Listings2 Goes here </div>
          <div>Featured Listings3 Goes here </div>
          <div>Featured Listings4 Goes here </div>
          <div>Featured Listings5 Goes here </div>
          <div>Featured Listings6 Goes here </div>

       </div>
    </Container>
   </ClientOnly>
   </>
  )
}
