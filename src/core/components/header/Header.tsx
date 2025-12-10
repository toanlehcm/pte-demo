import React from 'react'
import { staticUrl } from '@/core/utils';

interface HeaderProps {
  className?: string;
}

export const Header = ({ className = '' }: HeaderProps) => {
    const clientLogo =  staticUrl('/images/default_logo_client.png');
    const clientName = 'PtE' //sessionData?.Client?.ClientName || ;
    const userAvatarUrl = staticUrl('/images/default_logo_client.png');
    const userShortName =  'JD' //sessionData?.User?.ShortName || ;

    return (
    <header
      className={`bg-container-primary shadow-md ${className} pt-[var(--safe-top)]`} 
    >
      <div className='max-w-12xl h-[64px] mx-auto px-3 py-3 flex justify-between items-center'>
        <div className='space-x-4'>
          <div
            className='items-center rounded-full p-1 max-h-10 h-10 w-10 border border-[#e8e8ed] cursor-pointer flex sm:hidden '
            // onClick={() => gotoPtEApp()}
          >
            <img
            //   src={sessionData.Client.LogoUrl}
              src={clientLogo}
              alt='PtE Logo'
              className='min-h-8 w-8 h-8 rounded-full shadow-sm object-cover shrink-0 aspect-square'
            />
          </div>
          <img
            src={staticUrl('/images/pteverywhere-logo.png')}
            alt='User Profile Picture'
            className='cursor-pointer w-full min-h-[32px] max-h-[32px] hidden sm:flex object-contain shrink-0'
            // onClick={() => gotoPtEApp()}
          />
        </div>
        <div
          className='items-center justify-start p-1 max-h-10 h-10  cursor-pointer block sm:hidden'
        //   onClick={() => gotoPtEApp()}
        >
          <img
            src={staticUrl('/images/pteverywhere-logo.png')}
            alt='User Profile Picture'
            className='w-full min-h-[32px] max-h-[32px] object-contain shrink-0'
          />
        </div>
        <div className='flex items-center space-x-0 sm:space-x-4'>
          <div className='items-center rounded-full p-1 max-h-10 h-10 w-10 sm:w-auto border border-gray hidden sm:flex'>
            <img
              src={clientLogo}
              alt='User Profile Picture'
              className='min-h-8 w-8 h-8 rounded-full shadow-sm object-cover shrink-0 aspect-square'
            />
            <span className='text-sm font-semibold pl-2'>{clientName}</span>
          </div>
          <div className='hidden sm:block h-8 w-px bg-gray-300'></div>
          <div className='flex items-center rounded-full p-1 max-h-10 h-10 w-10 cursor-pointer border border-[#e8e8ed]'>
            {userAvatarUrl ? (
              <img
                src={userAvatarUrl}
                alt='User Profile Picture'
                className='min-h-8 w-8 h-8 rounded-full shadow-sm object-cover shrink-0 aspect-square'
              />
            ) : (
              <span className='w-8 h-8 rounded-full shadow-sm text-sm font-semibold flex items-center justify-center bg-primary-default text-white'>
                {userShortName}
              </span>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}
