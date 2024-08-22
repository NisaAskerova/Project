import React from 'react'
import TouchLeft from './TouchLeft'
import TouchRight from './TouchRight'

export default function Touch() {
  return (
    <div id='touch'>
      <div id="leftTouch">
        <TouchLeft/>
      </div>
      <div id='touchLine'></div>
      <div id="rightTouch">
        <TouchRight/>
      </div>
    </div>
  )
}
