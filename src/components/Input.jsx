import React,{useId} from 'react'

const Input = React.forwardRef(function Input({
  label,
  mess,
  type ="text",
  className='',
  ...props
},ref) {
  const uid = useId()
  return (
    <div className='w-full'>
      <div className='flex -mt-4 md:m-0'>
    {label && <label className='inline-block mb-1 pl-1 dark:text-white' htmlFor={uid} >{label}</label>}
    <p className="text-red-400 ml-2">{mess}</p>
    </div>
    <input type={type} className={`px-3 py-2 rounded-lg bg-white text-black outline-none focucs:bg-gray-50 duration-200 border border-gray-200 w-full ${className}`} {...props} ref={ref} id={uid}>
    </input>
    </div> 
  )
})

export default Input
