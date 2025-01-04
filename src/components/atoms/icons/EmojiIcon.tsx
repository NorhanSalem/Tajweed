import React from "react"

export default function EmojiIcon({ className, action }:any) {
  return (
    <div>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        onClick={action}
        className={className}
        viewBox="0 0 24 24"
      >
        <path
          id="Path_17697"
          data-name="Path 17697"
          d="M36,24A12,12,0,1,0,48,36,12,12,0,0,0,36,24Zm-4.154,8.308a1.385,1.385,0,1,1-1.385,1.385A1.385,1.385,0,0,1,31.846,32.308Zm9.568,6.923a6.151,6.151,0,0,1-10.828,0,.923.923,0,1,1,1.6-.923,4.31,4.31,0,0,0,7.634,0,.923.923,0,1,1,1.6.923Zm-1.26-4.154a1.385,1.385,0,1,1,1.385-1.385A1.385,1.385,0,0,1,40.154,35.077Z"
          transform="translate(-24 -24)"
          fill="#deb00d"
        />
      </svg>
    </div>
  )
}
