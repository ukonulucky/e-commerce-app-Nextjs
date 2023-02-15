
import { SessionProvider, useSession } from 'next-auth/react'
import Layout from '../components/Layout'
import 'react-toastify/dist/ReactToastify.min.css'
import '../styles/globals.css'
import { useRouter } from 'next/router'

function MyApp({ Component, pageProps: {session, ...pageProps} }) {
  const router = useRouter()
console.log("this is the session", session)
  return (
    <SessionProvider session={session}>
        <Layout>
         {
          Component.auth ? (
            
            <Auth>
              {
                 console.log("auth component")
              }
              <Component {...pageProps} />
            </Auth>
          ):
          (
            <Component {...pageProps} />
          )

         }
      </Layout>
  </SessionProvider>
    
  )
}
 function Auth({children}) {
  const router = useRouter();

  const {status}   = useSession({
    required: true, 
    onUnauthenticated(){
      console.log("code ran in auth 22")
      router.push("/unauthorised?message=login required")
    }
  })
  if(status === "loading"){
    return <div>
      Loading...
    </div>
  }
  console.log("code ran in auth")
  return children
 }
export default MyApp
