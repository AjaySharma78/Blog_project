import React from 'react'
import { Container, PostForm } from '../components'

function AddPost() {
  return (
    <div className='py-8 dark:bg-black'>
        <Container className='px-0 md:px-4'>
            <PostForm />
        </Container>
    </div>
  )
}

export default AddPost