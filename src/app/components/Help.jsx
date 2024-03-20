import React from "react";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure } from "@nextui-org/react";
import { TbHelp } from "react-icons/tb";

export default function Help() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Button className="hidden sm:flex" variant="flat" isIconOnly onPress={onOpen}><TbHelp /></Button>
      <Modal
        backdrop="opaque"
        isOpen={isOpen}
        onClose={onClose}
        classNames={{
          backdrop: "dark:bg-gradient-to-t from-zinc-900 to-zinc-900/10 backdrop-opacity-20"
        }}
      >
        <ModalContent>
          <ModalHeader className="flex flex-col gap-1">Guide</ModalHeader>
          <ModalBody>
            <div className="grid sm:grid-cols-2 gap-2">
            
                <p className="bg-neutral-300/20 dark:bg-neutral-600/20 w-fit p-2 rounded-md"><strong>Ctrl + B</strong> Bold</p>
                <p className="bg-neutral-300/20 dark:bg-neutral-600/20 w-fit p-2 rounded-md"><strong>Ctrl + I</strong> Italic</p>
                <p className="bg-neutral-300/20 dark:bg-neutral-600/20 w-fit p-2 rounded-md"><strong>Ctrl + U</strong> Underline</p>
                <p className="bg-neutral-300/20 dark:bg-neutral-600/20 w-fit p-2 rounded-md"><strong>- Space</strong> Bullets</p>
                <p className="bg-neutral-300/20 dark:bg-neutral-600/20 w-fit p-2 rounded-md"><strong>1. Space</strong> Orderlist</p>
                <p className="bg-neutral-300/20 dark:bg-neutral-600/20 w-fit p-2 rounded-md"><strong>Ctrl + C</strong> Copy</p>
                <p className="bg-neutral-300/20 dark:bg-neutral-600/20 w-fit p-2 rounded-md"><strong>Ctrl + V</strong> Paste</p>
                <p className="bg-neutral-300/20 dark:bg-neutral-600/20 w-fit p-2 rounded-md"><strong>Ctrl + Z</strong> Undo</p>
                <p className="bg-neutral-300/20 dark:bg-neutral-600/20 w-fit p-2 rounded-md"><strong>Ctrl + Shift +Z</strong> Redo</p>
                
          
            
             
              
              {/* Add more shortcuts as needed */}
            </div>
          </ModalBody>
          <ModalFooter>
            <Button color="danger" variant="light" onClick={onClose}>
              Close
            </Button>
            <Button color="primary" onClick={onClose}>
              More details
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
