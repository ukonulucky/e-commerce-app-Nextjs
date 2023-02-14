import Link from 'next/link'
import React from 'react'

function DropdownLink(props) {
    const {href, children,...rest} = props
  return (
    <div className='dropdown-link'>
         <Link href={href}>
            {children}
         </Link>
    </div>
  )
}

export default DropdownLink