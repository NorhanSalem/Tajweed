import React from 'react';

const DayTop = ({ day }: any) => {
  return (
    <div className='flex justify-center py-5  text-[#114F56] text-[14px] font-[futuraReg,sans-serif]'>
      <p className='text-center shadow-style-x2 w-max px-8 py-2 rounded-[30px] dark:text-white'>
        {day}
      </p>
    </div>
  );
};

export default DayTop;
