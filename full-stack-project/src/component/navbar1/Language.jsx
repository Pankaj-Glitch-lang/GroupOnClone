import { useState } from 'react';
import { Button, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, RadioGroup, Radio,useDisclosure } from '@chakra-ui/react';

function LanguageModal() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedLanguage, setSelectedLanguage] = useState(''); // To track the selected language

  const handleApply = () => {
    console.log('Selected Language:', selectedLanguage); // You can perform any action here
    onClose(); // Close the modal after applying the changes
  };

  return (
    <>
      <Button onClick={onOpen} mr={4}>{selectedLanguage}</Button>

      <Modal closeOnOverlayClick={true} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent borderRadius={'30px'}>
          <ModalHeader>Select Your Language</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6} fontSize={'larger'} fontWeight={'bold'} lineHeight={'10'}>
            <RadioGroup onChange={setSelectedLanguage} value={selectedLanguage}>
              <Radio value="english">English</Radio><br />
              <Radio value="hindi">Hindi</Radio><br />
              <Radio value="tamil">Tamil</Radio><br />
              <Radio value="telugu">Telugu</Radio><br />
              <Radio value="bengali">Bengali</Radio><br />
            </RadioGroup>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme='blue' mr={3} onClick={handleApply}>
             Apply
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default LanguageModal;

 