import React from 'react'
import Header from '../../schema/Header'
import SubAdminHeader from './SubAdminHeader'

export default function SubAdminHome({Component}) {



    
  return (
    <div>
        
        <SubAdminHeader/>
        {Component && <Component />}
    </div>
  )
}
