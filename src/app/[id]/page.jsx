"use client"
import React, { useMemo } from 'react'
// import EditorBoard from "@/app/components/EditorBoard";
import { NextUIProvider } from "@nextui-org/react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { useParams } from 'next/navigation'
import dynamic from "next/dynamic";


const Page = () => {
  const EditorBoard = useMemo(() => dynamic(() => import("@/app/components/EditorBoard"), { ssr: false },), [],);
  const { id: roomID } = useParams();


  return (

    <NextUIProvider>
      <NextThemesProvider attribute="class" defaultTheme='light'>

        <EditorBoard roomID={roomID} />
      </NextThemesProvider>
    </NextUIProvider>

  )
}

export default Page