import React, { FC } from "react";

// libs
import cn from "classnames";

interface ICelHeader {
  children: any
  classname?: string
}

export const CelHeader: FC<ICelHeader> = ({ children, classname }) => {
  return (
    <div
      className={cn('w-full px-2 py-4 text-sm text-[#D9D9D9] overflow-hidden text-ellipsis cell flex items-center text-white font-medium text-base group select-none cursor-pointer', classname)}>
      {children}
      <img
        className='ml-2 w-3.5 opacity-50 group-hover:opacity-100 transition-all' src='/sort-arrow.svg'
        alt='' />
    </div>
  )
}