import React from 'react'

export default function Footer() {
  return (
    <div>
        <img
          src="/bottomimage.jpg"
          alt="image"
          width={"100%"}
          style={{cursor:'pointer'}}
          onClick={()=>{
            window.open('https://www.facebook.com/');
          }}
        />
      </div>
  )
}
