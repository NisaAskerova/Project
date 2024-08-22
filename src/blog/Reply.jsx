import React from 'react'

export default function Reply() {
    return (
        <div id='reply'>
            <h3>Leave a Reply</h3>
            <form action="" method='POST'>
                <div>
                    <label htmlFor="name">Name</label>
                    <input type="text" name="name" id="name" placeholder='Enter Your Name' />
                </div>
                <div>
                    <label htmlFor="email">Email Address</label>
                    <input type="email" name="email" id="email" placeholder='Enter Your Email' />
                </div>
                <div>
                    <label htmlFor="comment">Comments</label>
                    <textarea name="comment" id="comment" placeholder='Enter Your Comments'></textarea>
                </div>
                <button>Submit</button>
            </form>
        </div>
    )
}
