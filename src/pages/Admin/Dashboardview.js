import React, { useState } from 'react'
import { FaSearch, FaEnvelope, FaRegBell } from "react-icons/fa"
import profile from "~/assets/profile.png"
import icon from "~/assets/icon.ico" 
import useAuth from '~/context/auth/useAuth'

const Dashboardview = () => {
    const [open, setOpen] = useState(false)
    const { logout, error } = useAuth();
    const showProfile = () => {
        setOpen(!open)
    }

    return (
        <div className=''>
            <div className='flex items-center justify-between h-[70px] shadow-lg px-[25px] '>
                <div className='flex items-center rounded-[5px]'>
                    <input type="text" className=' bg-[#fcf8fa] h-[40px] outline-none pl-[13px] w-[350px] rounded-[5px] placeholder:text-[14px] leading-[20px] font-normal border' placeholder='Search for...' />
                    <div className='bg-primary/40 h-[40px] px-[14px] flex items-center justify-center cursor-pointer rounded-tr-[5px] rounded-br-[5px]'>
                        <FaSearch color='white' />
                    </div>

                </div>
                <div className='flex items-center gap-[20px]'>
                    <div className='flex items-center gap-[25px] border-r-[1px] pr-[25px]'>
                        <FaRegBell />
                        <FaEnvelope />
                    </div>
                    <div className='flex items-center gap-[15px] relative' onClick={showProfile} >
                        <p>Tech Gadget</p>
                        <div className="h-[50px] w-[50px] rounded-full cursor-pointer flex items-center justify-center relative z-40">
                            <img src={icon} alt="" className="h-full w-full rounded-full object-cover" />
                        </div>

                        {
                            open &&
                            <div className='bg-white border h-[140px] w-[170px] absolute bottom-[-155px] z-20 right-0 pt-[10px] px-[15px] space-y-[10px] shadow-lg rounded-md'>
                                <p className='cursor-pointer hover:bg-[#f0f0f0] p-[8px] rounded-md font-semibold'>Profile</p>
                                <p className='cursor-pointer hover:bg-[#f0f0f0] p-[8px] rounded-md font-semibold'>Settings</p>
                                <p className='cursor-pointer hover:bg-[#f0f0f0] p-[8px] rounded-md font-semibold'  onClick={logout}>Log out</p>
                            </div>
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Dashboardview
