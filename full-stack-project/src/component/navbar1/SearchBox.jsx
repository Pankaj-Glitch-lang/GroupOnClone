import { useRef, useState } from "react";
import {
    Input,
    PopoverTrigger,
    PopoverContent,
    PopoverHeader,
    PopoverArrow,
    PopoverCloseButton,
    PopoverBody,
    Box,
    Flex,
    Image,
    Text,
    Popover
} from "@chakra-ui/react";
import axios from "axios";
import { Link } from "react-router-dom";

function SearchBox() {
    const initialFocusRef = useRef();
    const [searchTerm, setSearchTerm] = useState('');
    const [results, setResults] = useState([]);

    const fetchproducts = async (query) => {
        try {
            const res = await axios.get(`http://localhost:8080/product?page=1&limit=6&title=${query}`);
            console.log(res.data);
            setResults(res.data.msg);
        } catch (err) {
            console.log('Something went wrong while searching', err);
        }
    };

    const handleSearch = (e) => {
        const value = e.target.value;
        setSearchTerm(value);
        fetchproducts(value);
    };

    return (
        <Popover
            initialFocusRef={initialFocusRef}
            placement='bottom'
            closeOnBlur={true}
        >
            <PopoverTrigger>
                <Input
                    placeholder="Search for deals"
                    value={searchTerm}
                    onChange={handleSearch}
                    onClick={handleSearch}
                    width={{ base: "100%", md: "auto" }} // Make input full width on small screens
                    _hover={{ bg: 'white' }}
                    border="none"
                    outline="none"
                    _focus={{ border: 'none', boxShadow: 'none' }}
                />
            </PopoverTrigger>
            <PopoverContent
                color='black'
                bg='white'
                borderColor='whitesmoke'
                width={{ base: "90%", md: "600px" }} // Adjust width for responsiveness
                borderRadius={30}
                mx={2} // Margin on left and right
            >
                <PopoverCloseButton />
                <PopoverBody>
                    {results.length > 0 ? (
                        <Flex flexDirection={'column'} spacing={2} p={4}
                            maxHeight="400px" // Limit height to allow scrolling
                            overflowY="auto">
                            {results.map((result, index) => (
                                <Box key={index} m={2}>
                                    <Flex spacing={2}>
                                        <Image borderRadius={20} src={result.image} w={'42%'} h={130} />
                                        <Box>
                                            <Text m={2} fontSize={20}><Link to={`/${result._id}`}>{result.title}</Link></Text>
                                            <Text m={2} fontSize={'large'} fontWeight={'bold'} color={'green'}>${result.price}</Text>
                                        </Box>
                                    </Flex>
                                </Box>
                            ))}
                        </Flex>
                    ) : (
                        <Box>No deals found.</Box>
                    )}
                </PopoverBody>
            </PopoverContent>
        </Popover>
    );
};

export default SearchBox;
