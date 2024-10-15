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
const base_url = import.meta.env.VITE_HOST_URL;

function SearchBox() {
    const initialFocusRef = useRef();
    const [searchTerm, setSearchTerm] = useState('');
    const [results, setResults] = useState([]);

    const fetchProducts = async (query) => {
        try {
            const res = await axios.get(`${base_url}/product?page=1&limit=6&title=${query}`);
            setResults(res.data.msg);
        } catch (err) {
            console.log('Something went wrong while searching', err);
        }
    };

    const handleSearch = (e) => {
        const value = e.target.value;
        setSearchTerm(value);
        fetchProducts(value);
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
                    width={{ base: "100%", md: "250px" }} // Make input full width on small screens, fixed width on larger screens
                    _hover={{ bg: 'white' }}
                    border="none" // Adding border for better visibility
                    borderRadius="20px" // Adjusted border radius for a softer look
                    _focus={{ border: 'none', boxShadow: 'none' }} // Green border on focus
                    autoComplete="off"
                />
            </PopoverTrigger>
            <PopoverContent
                color='black'
                bg='white'
                borderColor='whitesmoke'
                width={{ base: "90%", md: "400px" }} // Responsive width for popover
                borderRadius={30}
                mx={2} // Margin on left and right
            >
                <PopoverCloseButton />
                <PopoverBody>
                    {results.length > 0 ? (
                        <Flex flexDirection={'column'} spacing={2} p={4}
                            maxHeight="300px" // Limit height for better UX
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
                        <Box textAlign="center" p={4}>No deals found.</Box> // Centered text for no results
                    )}
                </PopoverBody>
            </PopoverContent>
        </Popover>
    );
};

export default SearchBox;
