import React from "react";

// components
import { Code, H4, H5 } from "../../../common";

export const Connection = () => {
  return (
    <div className='p-6 pt-4 w-full 2xl:w-[35%] flex flex-col'>
      <div className='p-6 bg-[#2F2F2F] rounded flex-1'>
        <H4 classname='!mb-6 flex items-center'>
          <img className='w-5 mr-4' src={'/link.svg'} alt='' />
          Connection
        </H4>
        <H5 classname='!mb-6'>SSH</H5>
        <div className='mb-6'>
          <Code title='Command'>
            ssh -i ~/.ssh/id_rsa -p 22 alex@100.86.104.174
          </Code>
        </div>
        <Code title='Config'>
          <span className='text-[#88E207] leading-loose'>Host</span> &#x3c;vessel_name&#x3e; <br />
          <span className='text-[#FFC36A] pl-6'>Hostname</span> 100.86.104.174 <br />
          <span className='text-[#FFC36A] pl-6'>User</span> alex <br />
          <span className='text-[#FFC36A] pl-6'>IdentityFile</span> ~/.ssh/id_rsa <br />
          <span className='text-[#FFC36A] pl-6'>Port</span> 22
        </Code>
      </div>
    </div>
  )
}