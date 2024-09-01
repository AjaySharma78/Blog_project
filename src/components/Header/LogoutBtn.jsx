import React from 'react'
import {useDispatch} from 'react-redux'
import authService from '../../appwrite/auth'
import {logout} from '../../store/authSlice'
import { useNavigate } from 'react-router-dom'
function LogoutBtn() {
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
    <button className='inline-block px-6 py-2 duration-200 hover:bg-orange-500 rounded-md dark:text-white' onClick={handleLogout} >Logout</button>
  </div>
  )
}

export default LogoutBtn