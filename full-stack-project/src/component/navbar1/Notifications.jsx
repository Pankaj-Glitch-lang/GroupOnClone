import React from 'react'
import { Button, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Radio, Text, useDisclosure } from "@chakra-ui/react";

const Notifications = () => {

    const OverlayOne = () => (
        <ModalOverlay
          bg='light-blue'
          backdropFilter=''
        />
      )
    
      const OverlayTwo = () => (
        <ModalOverlay
          bg='none'
          backdropFilter='auto'
          backdropInvert='80%'
          backdropBlur='2px'
        />
      )
    
      const { isOpen, onOpen, onClose } = useDisclosure()
      const [overlay, setOverlay] = React.useState(<OverlayOne />)

  return (
    <>
   
  <Button
    ml='4'
    mr={'4'}
    onClick={() => {
      setOverlay(<OverlayTwo/>)
      onOpen()
    }}
  >
    🔔
  </Button>
  <Modal isCentered isOpen={isOpen} onClose={onClose}>
    {overlay}
    <ModalContent borderRadius={30}>
      <ModalHeader fontSize={'larger'} fontWeight={'bold'}>Notifiactions</ModalHeader>
      <ModalCloseButton />
      <ModalBody>
        <Text>Custom backdrop filters!</Text>
      </ModalBody>
      <ModalFooter>
        <Button onClick={onClose}>Close</Button>
      </ModalFooter>
    </ModalContent>
  </Modal>
</>
  )
}

export default Notifications