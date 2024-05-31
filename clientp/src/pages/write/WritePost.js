import React from 'react'
import Editor from '../../components/write/Editor'
import Navbar from '../../components/Navbar'

function WritePost() {
  return (
    <div className='WritePost' >
      <Navbar postpage />
      <Editor />
    </div>
  )
}

export default WritePost