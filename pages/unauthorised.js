import Link from 'next/link'
import { useRouter } from 'next/router'
import React from 'react'

function Unauthorised() {
    const {query} = useRouter()

  return (
    <div className='text-red-600 flex flex-col items-center justify-center w-full'>
      <h2 className='text-center font-bold '>
        Access Denied
      </h2>
      <div>
      <Link href="/login">
      <a className='text-red-700 capitalize hover:text-red-500'>
      {query.message}
      </a>
      </Link>
      </div>
    </div>
  )
}

export default Unauthorised