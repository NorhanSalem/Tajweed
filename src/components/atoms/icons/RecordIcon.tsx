import React from 'react';

export default function RecordIcon({ className, action }: any) {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width='24'
      height='24'
      className={className}
      onClick={action}
      viewBox='0 0 24 24'
    >
      <g id='microphone' transform='translate(-108 -188)'>
        <path
          id='Vector'
          d='M6,17a6,6,0,0,0,6-6V6A6,6,0,0,0,0,6v5A6,6,0,0,0,6,17Z'
          transform='translate(114 190)'
          fill='none'
          stroke='#deb00d'
          strokeLinecap='round'
          stroke-linejoin='round'
          strokeWidth='1.5'
        />
        <path
          id='Vector-2'
          data-name='Vector'
          d='M0,0V2A9,9,0,0,0,18,2V0'
          transform='translate(111 199)'
          fill='none'
          stroke='#deb00d'
          strokeLinecap='round'
          stroke-linejoin='round'
          strokeWidth='1.5'
        />
        <path
          id='Vector-3'
          data-name='Vector'
          d='M0,.487a8,8,0,0,1,5.5,0'
          transform='translate(117.11 194.992)'
          fill='none'
          stroke='#deb00d'
          strokeLinecap='round'
          stroke-linejoin='round'
          strokeWidth='1.5'
        />
        <path
          id='Vector-4'
          data-name='Vector'
          d='M0,.248a6.926,6.926,0,0,1,3.67,0'
          transform='translate(118.03 198.232)'
          fill='none'
          stroke='#deb00d'
          strokeLinecap='round'
          stroke-linejoin='round'
          strokeWidth='1.5'
        />
        <path
          id='Vector-5'
          data-name='Vector'
          d='M0,0H24V24H0Z'
          transform='translate(108 188)'
          fill='none'
          opacity='0'
        />
      </g>
    </svg>
  );
}
