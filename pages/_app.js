
import { SessionProvider, useSession } from 'next-auth/react'
import Layout from '../components/Layout'
import 'react-toastify/dist/ReactToastify.min.css'
import '../styles/globals.css'
import { useRouter } from 'next/router'
import { PayPalScriptProvider } from '@paypal/react-paypal-js'

function MyApp({ Component, pageProps: {session, ...pageProps} }) {

  return (
    <SessionProvider session={session}>
      <PayPalScriptProvider deferLoading={true}>
      <Layout>
         {
          Component.auth ? ( 
            <Auth>
             
              <Component {...pageProps} />
            </Auth>
          ):
          (
            <Component {...pageProps} />
          )}
      </Layout>
      </PayPalScriptProvider>
  </SessionProvider>
    
  )
}
 function Auth({children}) {
  const router = useRouter();

  const {status}   = useSession({
    required: true, 
    onUnauthenticated(){
      router.push("/unauthorised?message=login required")
    }
  })
  if(status === "loading"){
    return <div>
      Loading...
    </div>
  }
  return children
 }
export default MyApp
