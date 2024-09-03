import React from 'react'
import { FaTachometerAlt, FaRegSun, FaWrench, FaStickyNote, FaRegChartBar, FaRegCalendarAlt, FaChevronRight, FaChevronLeft, FaBolt } from "react-icons/fa"

const Sidebar = () => {
    return (
        <div className='bg-[#d9f94d] px-[25px] h-screen'>
            <div className='px-[15px] py-[30px] flex items-center justify-center border-b-[1px] border-[#EDEDED]/[0.3]'>
                <h1 className='text-black text-[20px] leading-[24px] font-extrabold cursor-pointer'>Tech Gadget</h1>
            </div>
            <div className='flex items-center gap-[15px] py-[20px] border-b-[1px] border-[#EDEDED]/[0.3] cursor-pointer'>
                <FaTachometerAlt color='black' />
                <p className='text-[14px] leading-[20px] font-bold text-black'>Dashboard</p>
            </div>
            <div className='pt-[15px] border-b-[1px] border-[#EDEDED]/[0.3]'>
                <div className='flex items-center justify-between gap-[10px] py-[15px] cursor-pointer'>
                    <div className='flex items-center gap-[10px]'>
                        <FaRegSun color='black' /> <p className='text-[14px] leading-[20px] font-normal text-black'>Components</p>
                    </div>

                </div>
                <div className='flex items-center justify-between gap-[10px] py-[15px] cursor-pointer'>
                    <div className='flex items-center gap-[10px]'>
                        <FaWrench color='black' /> <p className='text-[14px] leading-[20px] font-normal text-black'>Utilities</p>
                    </div>

                </div>
            </div>
            <div className='pt-[15px] border-b-[1px] border-[#EDEDED]/[0.3]'>
                <div className='flex items-center justify-between gap-[10px] py-[15px] cursor-pointer'>
                    <div className='flex items-center gap-[10px]'>
                        <FaStickyNote color='black' /> <p className='text-[14px] leading-[20px] font-normal text-black'>Pages</p>
                    </div>
                </div>
                <div className='flex items-center gap-[10px] py-[15px]  cursor-pointer'>
                    <FaRegChartBar color='black' /> <p className='text-[14px] leading-[20px] font-normal text-black'>Charts</p>
                </div>
                <div className='flex items-center gap-[10px] py-[15px] cursor-pointer'>
                    <FaRegCalendarAlt color='black' /> <p className='text-[14px] leading-[20px] font-normal text-black'>Tables</p>
                </div>
            </div>
        </div>
    )
}

export default Sidebar