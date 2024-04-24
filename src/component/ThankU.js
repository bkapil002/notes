import React from 'react'
import { useNavigate } from 'react-router-dom'

const ThankU = () => {
    let history = useNavigate()
    const thankU = () => {
     localStorage.removeItem('token')
     history('/Login')
    }
  return (
    <div className='text-center'>
      <h2 className="text-center my-4">Welcome in Inotes </h2>
      <button className='btn btn-success'onClick={thankU}>Thank you</button>
    </div>
  )
}

export default ThankU
