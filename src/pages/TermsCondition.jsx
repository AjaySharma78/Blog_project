import React from 'react'
import term from'../assets/terms.png'
import {Button} from '../components'
import { Link } from 'react-router-dom'
function TermsCondition() {
  return (

    <div className='flex flex-wrap'>
      <div className='md:w-1/2 lg:w-5/12 flex justify-normal items-center m-6'>
        <div>
          <h1 className='text-[5rem] font-serif dark:text-white '>Privacy</h1>
          <p className='text-[5rem] -mt-8 font-serif dark:text-white'>Privacy</p>


          <p className='dark:text-white'>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Asperiores repudiandae porro odit necessitatibus. Repellat tempora eius doloremque dolore. Sed, consectetur?</p>
          <Link to='/'>
          <Button className='bg-orange-400 mt-4 rounded-md'>Go To Homepage</Button>
          </Link>
        </div>

      </div>
      <div className='w-2/4'>
        <img src={term} alt="" />
      </div>

    </div>
  )
}

export default TermsCondition
