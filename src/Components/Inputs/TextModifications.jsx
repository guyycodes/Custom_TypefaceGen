import React, { useState, useEffect } from 'react';
import { 
    HStack, 
    Input, 
    Text, 
    useColorModeValue
} from '@chakra-ui/react';
import Slider from '@mui/material/Slider';
import Box from '@mui/material/Box';

export const TextInput = ( { setTheText } ) => {
    const [tex, setTex] = useState('Hello World');
    const [language, setLanguage] = useState()
    
    const handleTextChange = (event) => {
      const text = event.target.value;
      setTex(text);
      setTheText(text);
    };

    return (
      <>
      <HStack>
        <Text fontWeight="semibold">Text:</Text>
        <Input
          width={["10rem", "auto"]}
          id="input-text"
          value={tex}
          onChange={handleTextChange}
          variant="flushed"
          placeholder="Enter text"
          bg='transparent'
          border='1px solid black'
          borderRadius='5'
          p='1'
        />
      </HStack>
    </>
    );
  };

// SizeInput component
export const SizeInput = ({ setTheSize, currSize, startSize }) => {
    const [size, setSize] = useState(currSize || startSize);
  
    const handleSizeChange = (event) => {
      setSize(parseInt(event.target.value));
      setTheSize(event.target.value)
    };
  
    return (
      <HStack>
        <Text fontWeight="semibold">Size:</Text>
        <Box width="200px" mr={1}> 
            <Slider
            aria-label="Size"
            value={size}
            onChange={handleSizeChange}
            min={0.01}
            max={50.00}
            step={1.00}
            />
        </Box><Text>{size}</Text>
      </HStack>
    );
  };