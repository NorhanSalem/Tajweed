/////////// IMPORTS
///

import useBreadcrumbs from 'use-react-router-breadcrumbs';

///
/////////// Types
///

import { t } from 'i18next';

/////////// HELPER VARIABLES & FUNCTIONS
///

///
export const Breadcrumbs = ({ isSidebarCollapsed }: any) => {
  /////////// VARIABLES
  ///

  ///
  /////////// CUSTOM HOOKS
  ///
  const breadcrumbs = useBreadcrumbs();
  ///
  /////////// STATES
  ///

  ///
  /////////// SIDE EFFECTS
  ///

  ///
  /////////// IF CASES
  ///

  ///
  /////////// FUNCTIONS & EVENTS
  ///

  ///
  return (
    <>
      <div
        className={`flex gap-2 breadcrumbs-styleing ${
          !isSidebarCollapsed && 'mx-[1.5rem]'
        } `}
      >
        <div className='h-5 border-t-2 border-r border-gray-300'></div>
        {breadcrumbs.map(({ breadcrumb }) => (
          <>
            {breadcrumbs.length == 1 ? (
              <>
                <h2 className='text-[14px]'>
                  {t(breadcrumb?.props?.children)}
                </h2>
              </>
            ) : (
              <>
                <h2 className='text-[14px]'>
                  {t(breadcrumb?.props?.children)}
                </h2>
                <span>-</span>
              </>
            )}
          </>
        ))}
      </div>
    </>
  );
};
