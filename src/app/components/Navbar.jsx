"use client"

import { Button, Popover, PopoverTrigger,PopoverContent, Input } from '@nextui-org/react'
import React, { useEffect, useState } from 'react'
import { TbClipboardCopy, TbDownload, TbDragDrop, TbLink, TbSend } from 'react-icons/tb'
import { useParams, usePathname } from "next/navigation";


import toast, { Toaster } from "react-hot-toast";
import Image from 'next/image';
import { ThemeSwitcher } from './ThemeSwitcher';
const Navbar = () => {
    
    




  return (
    <>
    <div>
    <Toaster/>
    </div>
    <section className="h-[10vh] toolbar z-10 bg-transparent flex justify-between border-neutral-900   w-full p-5 border-t-neutral-900">
    <div className="flex justify-center items-center cursor-pointer gap-2">
        <Image width={30} height={30} src={"/logo.jpg"}></Image>
        <span>TeamText</span>
    </div>
    <ThemeSwitcher/>




</section>
</>
  )
}

export default Navbar