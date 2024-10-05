import React from 'react'
import CashierHeader from './CashierHeader'

export default function CashierHome({Component}) {
  return (
    <div>
        <CashierHeader/>
       {Component && <Component />}
    </div>
  )
}
