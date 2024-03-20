import React from "react";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, Link } from "@nextui-org/react";
import { TbHelp ,TbBrandGravatar } from "react-icons/tb";
import { FcAbout } from "react-icons/fc";
export default function Details() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Button isIconOnly variant="flat" onPress={onOpen}><FcAbout  /></Button>
      <Modal 
        backdrop="opaque" 
        isOpen={isOpen} 
        onClose={onClose}
        classNames={{
          backdrop: "dark:bg-gradient-to-t from-zinc-900 to-zinc-900/10 backdrop-opacity-20"
        }}
      >
        <ModalContent>
          <ModalHeader className="flex flex-col gap-1">About</ModalHeader>
          <ModalBody>
            <p> 
              Welcome to our collaborative rich text editor page! This page showcases our team{"'"}s effort in building a collaborative tool for creating and editing rich text content.
            </p>
            <p>
              Our rich text editor allows multiple users to simultaneously work on the same document, enabling real-time collaboration and seamless sharing of ideas.
            </p>
            <p>
              With features like formatting options (such as bold, italic, underline), inline images, and collaborative commenting, our editor provides a versatile platform for teams to collaborate efficiently.
            </p>
            <Link href="https://www.sushantaneupane.com.np">About Developer</Link>
          </ModalBody>
          <ModalFooter>
            <Button color="danger" variant="light" onPress={onClose}>
              Close
            </Button>
            <Button color="primary" onPress={onClose}>
              Ok
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
