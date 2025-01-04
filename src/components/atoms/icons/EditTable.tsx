type EditProps_TP = {
  className?: string;
  action?: () => void;
  size?: number;
};

const EditTableICon = ({ className, action, size, ...props }: EditProps_TP) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    width={24}
    height={24}
    className={`cursor-pointer  ${className}`}
    onClick={action}
    fill='none'
    {...props}
  >
    <style>
      {
        '@keyframes rotation{0%,to{transform:rotate(0deg)}50%{transform:rotate(10deg)}}@keyframes clip{0%{clip-path:polygon(0 0,0 0,0 100%,0 100%)}50%{clip-path:polygon(0 0,57%0,56% 100%,0 100%)}to{clip-path:polygon(0 0,100%0,100% 100%,0 100%)}}'
      }
    </style>
    <g id='Group 4459 1'>
      <g id='Group 4459'>
        <g id='edit-2/bulk'>
          <g id='vuesax/bulk/edit-2'>
            <g id='edit-2'>
              <path
                fill='#008BD2'
                d='M21 22H3a.755.755 0 0 1-.75-.75.755.755 0 0 1 .75-.75h18a.755.755 0 0 1 .75.75.755.755 0 0 1-.75.75Z'
                opacity={0.4}
                style={{
                  animation: 'clip 1s linear infinite alternate',
                  transformOrigin: 'center',
                  transformBox: 'fill-box',
                }}
              />
              <g
                style={{
                  animation: 'rotation 1s linear infinite',
                  transformOrigin: 'center',
                  transformBox: 'fill-box',
                }}
              >
                <path
                  id='Vector'
                  fill='#008BD2'
                  d='M19.02 3.48c-1.94-1.94-3.84-1.99-5.83 0l-1.21 1.21a.417.417 0 0 0-.1.4 8.13 8.13 0 0 0 5.53 5.53.4.4 0 0 0 .41-.1l1.2-1.21a4.132 4.132 0 0 0 1.47-2.89 4.116 4.116 0 0 0-1.47-2.94Z'
                  opacity={0.4}
                />
                <path
                  id='Vector_2'
                  fill='#008BD2'
                  d='M15.61 11.53c-.29-.14-.57-.28-.84-.44a8.8 8.8 0 0 1-.64-.42 6.043 6.043 0 0 1-.56-.43 1.218 1.218 0 0 1-.17-.15 8.45 8.45 0 0 1-1.03-1.04 1.216 1.216 0 0 1-.15-.18 5.82 5.82 0 0 1-.42-.55 5.484 5.484 0 0 1-.39-.59c-.16-.27-.3-.54-.44-.82-.14-.3-.25-.59-.35-.86l-6.28 6.28a1.2 1.2 0 0 0-.28.55l-.54 3.83a2.05 2.05 0 0 0 .51 1.75c.378.356.88.55 1.4.54.12 0 .241-.01.36-.03l3.84-.54c.206-.04.397-.137.55-.28l6.28-6.28c-.28-.1-.55-.21-.85-.34Z'
                />
              </g>
            </g>
          </g>
        </g>
      </g>
    </g>
  </svg>
);
export default EditTableICon;
