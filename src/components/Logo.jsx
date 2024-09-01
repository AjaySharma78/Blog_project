import React from 'react'
import pencrefLogo from '../assets/logopen-removebg-preview.png'
function Logo({width = '100px'}) {
  return (
    <div><img src={pencrefLogo} alt="Logo" width={width}/></div>
  )
}

export default Logo