import { Input, PopoverTrigger, PopoverContent, PopoverHeader, PopoverArrow, PopoverCloseButton, PopoverBody, PopoverFooter, ButtonGroup, Button, Popover, Box, Flex, Image, Text, Select} from "@chakra-ui/react"
import { useRef } from "react";

function Location() {
    const initialFocusRef = useRef()
    return (
      <Popover
        initialFocusRef={initialFocusRef}
        placement='bottom'
        closeOnBlur={false}
      >
        <PopoverTrigger>
          <Select borderRadius={20} pr={20}>Chikagi,IL     ^</Select>
        </PopoverTrigger>
        <PopoverContent color='white' bg='blue.800' borderColor='blue.800'>
          <PopoverHeader pt={4} fontWeight='bold' border='0'>
            Manage Your Channels
          </PopoverHeader>
          <PopoverArrow bg='blue.800' />
          <PopoverCloseButton />
          <PopoverBody>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
            eiusmod tempor incididunt ut labore et dolore.
          </PopoverBody>
          <PopoverFooter
            border='0'
            display='flex'
            alignItems='center'
            justifyContent='space-between'
            pb={4}
          >
            <Box fontSize='sm'>Step 2 of 4</Box>
            <ButtonGroup size='sm'>
              <Button colorScheme='green'>Setup Email</Button>
              <Button colorScheme='blue' ref={initialFocusRef}>
                Next
              </Button>
            </ButtonGroup>
          </PopoverFooter>
        </PopoverContent>
      </Popover>
    )
  };

  export default Location;