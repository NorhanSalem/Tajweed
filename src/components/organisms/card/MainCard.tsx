import { IconUser } from '@tabler/icons-react';

type MainCard_TP = {
  total?: string;
  MainName?: string;
  PointRed?: [{ title?: string; value?: string }];
  PointBlue?: [{ title?: any; value?: any }];
};
export default function MainCard({
  total,
  MainName,
  PointRed,
  PointBlue,
}: MainCard_TP) {
  return (
    <div className='bg-white sm-b:!mx-0 m-5 rounded-xl dark:bg-dark-tertiary '>
      <div className='grid grid-cols-2 md:grid-cols-4 gap-3'>
        <div className='col-span-4'>
          <div
            className={`shadow   border rounded-xl p-3 dark:!border-[#3b3b64] dark:text-white`}
          >
            <div className='flex justify-between'>
              <div>{total}</div>

              <div className='flex justify-endcenter'>
                <IconUser />
              </div>
            </div>
            <div className='mt-3'>
              <small className='text-lightGreen dark:text-white'>
                {MainName}
              </small>
              <div className='mt-2'>
                {PointRed?.map((item: any) => (
                  <div className='flex justify-between'>
                    <small className='text-lightGreen flex items-center gap-1'>
                      <p className='bg-red-500 w-1 h-1 p-1 rounded-full m-0 '></p>
                      <small>{item?.title}</small>
                    </small>
                    <small>{item?.value}</small>
                  </div>
                ))}
                {PointBlue?.map((item: any) => (
                  <div className='flex justify-between'>
                    <small className='text-lightGreen flex items-center gap-1'>
                      <p className='bg-blue-500 w-1 h-1 p-1 rounded-full m-0 '></p>
                      <small>{item?.title}</small>
                    </small>
                    <small>{item?.value}</small>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
