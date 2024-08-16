import React from 'react'

export default function Order() {
  return (
    <div id='orders'>
        <div id='order'>
            <div id='yDiv'>
                <img src="../shopbag.svg" alt="" />
            </div>
            <div>
            <h3>Your order is confirmed</h3>
            <span className='same'>Thanks for shopping! </span>
            <span className='same'>your order hasn’t shipped yet, </span>
            <span className='same'>but we will send you and email when it done.</span>
            </div>
            <div>
                <button>View Order</button>
                <button>Back to Home</button>
            </div>
        </div>
      
    </div>
  )
}
