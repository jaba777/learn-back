import React from 'react'
import Header from './Header'


const WithHeader = ({children}:any) => {
  return (
    <>
      <Header/>
      {children}
    </>
  )
}

export default WithHeader
