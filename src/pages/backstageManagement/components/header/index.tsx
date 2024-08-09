import React from 'react'
import { useNavigate } from 'react-router'

export const Header = () => {
  const navigate = useNavigate()
  const stepToHome = () => {
    navigate('/')
  }
  return (
    <div className="flex justify-between">
      <div className="logo" >logo</div>
      <div style={{ color: 'black' }} onClick={stepToHome}>回到首页</div>
    </div>
  )
}
