import React from 'react'
import {useDispatch} from 'react-redux'
import authService from '../../appwrite/auth'
import {logout} from '../../store/authSlice'
import { useNavigate } from 'react-router-dom'
  const LogoutBtn = React.forwardRef(function log({...props},ref){
  const navigate = useNavigate()
    const dispatch = useDispatch()
    const handleLogout = () => {
        authService.logout().then(() => {
            dispatch(logout())
            navigate('/')
        })
    }
  return (
    <div>  
    <button ref={ref} className='block w-full text-left px-4 py-2 text-sm dark:bg-black hover:bg-orange-500 hover:dark:bg-orange-500 dark:text-white' onClick={handleLogout} >Logout</button>
  </div>
  )
});

export default LogoutBtn;