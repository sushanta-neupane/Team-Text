"use client";
import Help from './Help';
import LoadingBar from './LoadingBar';


import React, { useState, useEffect, useRef } from "react";
import {
    Input,

    Popover,
    PopoverTrigger,
    PopoverContent,
    Button,

    Divider,
} from "@nextui-org/react";
import {

    TbArrowDown,
    TbBulb,

    TbClipboardCopy,

    TbDownload,

    TbLink,

    TbPlus,

    TbSend,

} from "react-icons/tb";

import { FaRegChartBar } from "react-icons/fa6";

import toast, { Toaster } from "react-hot-toast";
import dynamic from "next/dynamic";
import { usePathname } from "next/navigation";
import "quill/dist/quill.snow.css";
import "quill/dist/quill.bubble.css";
import { io } from "socket.io-client";

import Details from './Details';
import { ThemeSwitcher } from './ThemeSwitcher';

const ReactQuill = dynamic(async () => {
    const { default: RQ } = await import("react-quill");
    const QuillComponent = ({ forwardedRef, ...props }) => <RQ ref={forwardedRef} {...props} />;
    QuillComponent.displayName = 'ReactQuill';
    return QuillComponent;
}, {
    ssr: false,
});






const CustomToolbar = ({ showToolbar, toggleToolbar }) => {


    return (
        <>
            <div id="toolbar" className=''>

                <span className={showToolbar ? '' : 'hidden'}>

                    <select className="ql-font" defaultValue="sans-serif">
                        <option value="sans-serif" title="Sans Serif Font">Sans Serif</option>
                        <option value="monospace" title="Monospace Font">Monospace</option>
                        <option value="serif" title="Serif Font">Serif</option>
                    </select>
                    <select className="ql-size" defaultValue="medium">
                        <option value="extra-small" title="Size 1">Size 1</option>
                        <option value="small" title="Size 2">Size 2</option>
                        <option value="medium" title="Size 3">Size 3</option>
                        <option value="large" title="Size 4">Size 4</option>
                    </select>
                    <select className="ql-header" defaultValue="3">
                        <option value="1" title="Heading 1">H1</option>
                        <option value="2" title="Heading 2">H2</option>
                        <option value="3" title="Normal Text">H3</option>
                    </select>
                </span>

                <span className={showToolbar ? '' : 'hidden'}>

                    <button className="qlBtn ql-bold" title="Bold" />
                    <button className="qlBtn ql-italic" title="Italic" />
                    <button className="qlBtn ql-underline" title="Underline" />
                    <button className="qlBtn ql-strike" title="Strikethrough" />
                    <button className="qlBtn ql-list" value="ordered" title="Ordered List" />
                    <button className="qlBtn ql-list" value="bullet" title="Bullet List" />
                    <button className="qlBtn ql-indent" value="-1" title="Decrease Indent" />
                    <button className="qlBtn ql-indent" value="+1" title="Increase Indent" />
                    <button className="qlBtn ql-script" value="super" title="Superscript" />
                    <button className="qlBtn ql-script" value="sub" title="Subscript" />
                    <button className="qlBtn ql-blockquote" title="Blockquote" />
                    <button className="qlBtn ql-direction" title="Text Direction" />
                </span>


                <span className={showToolbar ? '' : 'hidden'}>

                    <select className="ql-align" defaultValue="">
                        <option value="" title="Left Align" />
                        <option value="center" title="Center Align" />
                        <option value="right" title="Right Align" />
                        <option value="justify" title="Justify Align" />
                    </select>
                    <select className="ql-color" defaultValue="">
                        <option value="" title="Default Text Color"></option>
                        <option value="red" title="Red Text Color">Red</option>
                        <option value="green" title="Green Text Color">Green</option>
                        <option value="blue" title="Blue Text Color">Blue</option>
                        <option value="orange" title="Orange Text Color">Orange</option>
                        <option value="violet" title="Violet Text Color">Violet</option>
                        <option value="#d0d1d2" title="Gray Text Color">Gray</option>
                    </select>
                    <select className="ql-background" defaultValue="">
                        <option value="" title="Default Background Color"></option>
                        <option value="red" title="Red Background Color">Red</option>
                        <option value="green" title="Green Background Color">Green</option>
                        <option value="blue" title="Blue Background Color">Blue</option>
                        <option value="orange" title="Orange Background Color">Orange</option>
                        <option value="violet" title="Violet Background Color">Violet</option>
                        <option value="#d0d1d2" title="Gray Background Color">Gray</option>
                    </select>
                </span>


                <span className={showToolbar ? '' : 'hidden'}>

                    <button className="qlBtn ql-link" title="Insert Link" />
                    <button className="qlBtn ql-image" title="Insert Image" />
                    <button className="qlBtn ql-video" title="Insert Video" />
                    <button className="qlBtn ql-code-block" title="Code Block" />
                </span>



                <button className={`qlBtn ql-clean ${showToolbar ? "" : "!hidden"}`} title="Clean Formatting" />
            </div>

        </>
    );
};



const quillFormats = [
    "header",
    "font",
    "size",
    "bold",
    "italic",
    "underline",
    "align",
    "strike",
    "script",
    "blockquote",
    "background",
    "list",
    "bullet",
    "indent",
    "link",
    "image",
    "color",
    "code-block"
];

const quillModules = {
    toolbar: {
        container: "#toolbar",
        placeholder: "this is placeholder"
    },
};

const SAVE_INTERVAL_MS = 2000;

const EditorBoard = ({ roomID }) => {


    const quillRef = useRef();
    const documentId = roomID;
    const [socket, setSocket] = useState();
    const [disabled, setDisabled] = useState(true);
    const [doc, setDoc] = useState("");
    const [imgData, setImgData] = useState();
    const [isQuillReady, setIsQuillReady] = useState(false);
    useEffect(() => {
        if (quillRef.current) {
            setIsQuillReady(true);
        }
    }, [quillRef]);


    const [showToolbar, setShowToolbar] = useState(true);

    // Function to toggle toolbar visibility
    const toggleToolbar = () => {
        setShowToolbar((prev) => !prev);
    };



    // icons['bold'] = iconToHtmlString(<TbBold/>);


    const handleEditorChange = (content, delta, source, editor) => {
        if (source !== "user") return;

        if (socket) {
            setDoc(content)
            socket.emit("sendChanges", delta);

        }
    };

    useEffect(() => {
        const s = io(`${process.env.SOCKET_SERVER_URL}`);
        setSocket(s);

        return () => {
            s.disconnect();
        };
    }, []);

    useEffect(() => {
        if (!socket) return;

        const handler = (delta) => {
            if (quillRef.current == null) return;
            quillRef.current?.getEditor()?.updateContents(delta);
        };
        socket.on("receiveChanges", handler);

        return () => {
            socket.off("receiveChanges", handler);
        };
    }, [socket]);

    useEffect(() => {
        if (!socket) return;

        const interval = setInterval(() => {
            socket.emit("saveDocument", quillRef.current?.getEditor()?.getContents());
        }, SAVE_INTERVAL_MS);

        return () => {
            clearInterval(interval);
        };
    }, [socket, quillRef]);

    useEffect(() => {
        if (!socket) return;

        socket.once("loadDocument", (document) => {
            const isEmptyDelta =
                !document || // Check if the document itself is null or undefined
                (Array.isArray(document.ops) && document.ops.length === 1 && document.ops[0].insert === "\n");



            quillRef.current?.getEditor()?.setContents(document, 'silent');
            setDisabled(false);
        });
        socket.emit("getDocument", documentId);
    }, [socket, documentId]);


    const pasteImg = async () => {
        try {
            const clipboardItems = await navigator.clipboard.read();
            const blobOutput = await clipboardItems[0].getType("image/png");
            const data = URL.createObjectURL(blobOutput);
            setImgData(data);
        } catch (e) {
            console.log(e);
        }
    };

    const path = usePathname();



    const [tips, setTips] = useState([
        "Tip: Embrace markdown like a boss! 😎",
        "Tip: Paste images using Ctrl + V like a pro! 😍",
        "Tip: Drag and drop supported – show off your skills! 💪",
        "Tip: Arrange lines by simply dragging – hit the target! 🎯",
        "Tip: Shortcut keys are everyone's best friend, even here! 💓",
        "Tip: Mistakes! , No problem Ctrl + Z 🫡",
        "Tip: Don't be worry about leaving window, all are being saved 🔐",
    ]);

    const [currentTipIndex, setCurrentTipIndex] = useState(0);

    useEffect(() => {
        const intervalId = setInterval(() => {
            setCurrentTipIndex((prevIndex) => (prevIndex + 1) % tips.length);
        }, 10000);

        return () => clearInterval(intervalId);
    }, [tips]);

    const handleTipChange = () => {
        const newIndex = (currentTipIndex + 1) % tips.length;
        setCurrentTipIndex(newIndex);
    };

    const linkcopyHandler = () => {
        const textToCopy = `${process.env.BASE_URL}${path}`;
        navigator.clipboard
            .writeText(textToCopy)
            .then(() => {
                toast("Copied successfully.");
            })
            .catch((error) => {
                console.error("Error copying text to clipboard: ", error);
            });
    };

    // Function to handle copying content
    const copyHandler = () => {

        navigator.clipboard
            .writeText(doc)
            .then(() => {
                // Show toast or alert indicating successful copy
                toast("Content copied to clipboard!");
            })
            .catch((error) => {
                console.error("Error copying text to clipboard: ", error);
            });
    };



    // Function to handle downloading content as a text file
    const downloadHandler = () => {

        const element = document.createElement("a");
        const file = new Blob([doc], { type: "text/plain" });
        element.href = URL.createObjectURL(file);
        element.download = "document.docs";
        document.body.appendChild(element); // Required for this to work in Firefox
        element.click();
    };



    return (
        <>



            <div>
                <Toaster />
            </div>
            <Button
                className=" ql-toggle-toolbar absolute top-0 md:m-5 z-10 "
                title="Toggle Toolbar"
                onClick={toggleToolbar}
                variant='light'
                isIconOnly
            >
                {!showToolbar ? <FaRegChartBar /> : <TbPlus className=' rotate-45' />}
            </Button>

            <LoadingBar show={disabled} />


            {/* <Navbar /> */}
            <main
                onPaste={pasteImg}
                className="flex flex-col items-center min-h-screen   mx-2 sm:mx-5  "
            >



                <div className={`toolkit relative ${showToolbar ? "" : "!-top-32"}`}>

                    <CustomToolbar showToolbar={showToolbar} toggleToolbar={toggleToolbar} />
                </div>


                <section id="board" className="board ">
                    <ReactQuill
                        theme="snow"
                        onChange={handleEditorChange}
                        modules={quillModules}
                        formats={quillFormats}
                        readOnly={disabled}
                        forwardedRef={quillRef}
                        className="border-none outline-none  w-full h-[70vh] sm:h-[80vh] "
                    />
                </section>

            </main>
            <footer
                onClick={handleTipChange}
                className=" absolute flex justify-between  bottom-0  w-full   text-center text-xs py-2 backdrop-blur-md bg-neutral-900/5  "
            >


                <div

                    className='mx-2 sm:mx-5 hidden gap-2 sm:flex  opacity-50'
                >
                    <Details />
                    <Help />
                    <ThemeSwitcher />
                </div>

                <span className="sm:flex hidden justify-center w-full   mx-2 sm:mx-5 text-xs text-zinc-600 items-center cursor-pointer">
                    <TbBulb />
                    <span className="tip-animation">{tips[currentTipIndex]}</span>
                </span>

                <div className="flex mx-2 sm:mx-5 gap-2 opacity-50 sm:w-auto w-full justify-center sm:justify-end ">

                    <span className='flex gap-2 sm:hidden'>

                        <Details />
                        <Help />
                        <ThemeSwitcher />
                    </span>

                    <Button isIconOnly
                        onClick={copyHandler}
                    >
                        <TbClipboardCopy />
                    </Button>
                    <Button isIconOnly
                        onClick={linkcopyHandler}

                    >
                        <TbLink />
                    </Button>
                    <Button isIconOnly
                        onClick={downloadHandler}

                    >
                        <TbDownload />
                    </Button>
                    <Popover placement="right">
                        <PopoverTrigger>
                            <Button isIconOnly
                            // onClick={shareHandler}
                            >
                                <TbSend />
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent>
                            <div className="">
                                <div className="text-small font-bold my-2">Share This Link</div>
                                <Input
                                    className="text-tiny"
                                    value={`${process.env.BASE_URL}${path}`}
                                ></Input>
                            </div>
                        </PopoverContent>
                    </Popover>


                </div>



            </footer>

        </>
    );
};

export default EditorBoard;
