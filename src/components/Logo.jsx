import React from 'react'
import pencrefLogo from '../assets/Pencref (4) (1).png'
function Logo({width = '100px', className=''}) {
  return (
    <div className={`${className}`}><img src={pencrefLogo} alt="Logo" width={width}/></div>
  )
}

export default Logo