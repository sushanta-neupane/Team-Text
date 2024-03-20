"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import EditorBoard from "./components/EditorBoard";
import {
  Button,
  Input,
  NextUIProvider,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Divider,
  Image,
} from "@nextui-org/react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import Link from "next/link";
import Navbar from "./components/Navbar";
import { ThemeSwitcher } from "./components/ThemeSwitcher";
export default function Home() {
  const [inputValue, setInputValue] = useState("");
  const router = useRouter();

  // Generate random room ID
  const generateRandomRoomID = () => {
    return Math.random().toString(36).substring(7);
  };

  const [randomId, setRandomId] = useState("");

  useEffect(() => {
    setRandomId(generateRandomRoomID());
  }, []); // Run only once on component mount

  const handleRedirect = () => {
    if (inputValue.trim() !== "") {
      router.push(`/${inputValue.trim()}`);
    } else {
      // Handle empty input error here
      alert("Please enter a valid input.");
    }
  };

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  return (
    <>
      <NextUIProvider>
        <NextThemesProvider attribute="class" defaultTheme="dark">
          <div className=" min-h-screen bg-[url('/gradient.png')] bg-center  bg-no-repeat bg-stretch">
            <Navbar />
            <main className=" flex flex-col md:flex-row  px-5 gap-5 md:items-center justify-center  min-h-screen md:mx-10  sm:p-10">
              <div className="mb-10 ">
                <h1 className="lg:text-5xl  font-bold leading-tight text-3xl text-left ">
                  TeamText: Collaborative Text Editing Made Easy
                </h1>
                <p className="mt-4 text-lg font-normal text-left ">
                  Empower Your Team to Collaborate Seamlessly on Text Projects,{" "}
                  <br />
                  <Button color="primary" className="mt-5">
                    <Link
                      className="text-white no-underline"
                      href={`/${randomId}`}
                    >
                      Create Random Room
                    </Link>
                  </Button>
                </p>
              </div>

              <Card className="max-h-[400px] sm:min-w-[450px] ring-1  backdrop-blur-lg bg-zinc-50/5 ">
                <CardHeader className="flex gap-3">
                  <Image
                    alt="TT logo"
                    height={50}
                    radius="sm"
                    src="/logo.jpg"
                    width={50}
                  />
                  <div className="flex flex-col">
                    <p className="text-md">TeamText</p>
                    <p className="text-small text-default-500">
                      Collab Text as Team
                    </p>
                  </div>
                </CardHeader>
                <Divider />
                <CardBody>
                  <p className="mx-2">
                    Create or Join a Room with all over the globe.
                  </p>
                  <div className="flex justify-center items-center ">
                    <Input
                      variant="light"
                      type="text"
                      value={inputValue}
                      onChange={handleInputChange}
                      className="py-2  rounded-md focus:outline-none focus:ring focus:border-blue-300"
                      placeholder="Enter Room Id ..."
                    />
                    <Button
                      variant="border"
                      isIconOnly
                      onClick={handleRedirect}
                      className="p-2 m-2   focus:outline-none"
                    >
                      OK
                    </Button>
                  </div>
                </CardBody>
                <Divider />
                <CardFooter>
                  <Link className="no-underline mx-2" href={`/${randomId}`}>
                    Random Room
                  </Link>
                </CardFooter>
              </Card>
            </main>
          </div>
        </NextThemesProvider>
      </NextUIProvider>
    </>
  );
}
