import React from 'react'

function Container({children, className=' ', width='w-full'}) {
  return <div className={`${className} ${width} max-w-7xl mx-auto px-4 dark:bg-black dark:text-white`}>{children}</div>;   
}

export default Container