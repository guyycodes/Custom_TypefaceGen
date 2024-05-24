import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
    Checkbox, 
    HStack, 
    Input, 
    Select, 
    Text, 
    VStack,
    useColorModeValue,
    ThemeProvider
} from '@chakra-ui/react';
import { MaterialInput } from '../../util/MaterialInput';
import { Theme } from '../../Theme';
import Slider from '@mui/material/Slider';
import Box from '@mui/material/Box';

export const ColorInputs = ({fC, currColor, setStroke, currStrokeColor}) => {
    const [fillColor, setFillColor] = useState(currColor || "#000");
    const [strokeColor, setStrokeColor] = useState(currStrokeColor || '#000');

    const handleFillColorChange = (event) => {
        setFillColor(event.target.value);
        fC(event.target.value)
    };

    const handleStrokeColorChange = (event) => {
        setStrokeColor(event.target.value);
        setStroke(event.target.value);
    };

    return (
        <VStack spacing={4} align="stretch">
        <HStack>
            <Text fontWeight="semibold">Fill:</Text>
            <Input 
                type="color"
                value={fillColor}
                onChange={handleFillColorChange}
                variant="outlined"
                bg='transparent'
                border='1px solid black'
                borderRadius='5'
                p='0'
            /><Text>{fillColor}</Text>
        </HStack>
        <HStack>
            <Text fontWeight="semibold">Stroke:</Text>
            <Input 
            type="color"
            value={strokeColor}
            onChange={handleStrokeColorChange}
            variant="outlined"
            bg='transparent'
            border='1px solid black'
            borderRadius='5'
            p='0'
            /><Text>{strokeColor}</Text>
        </HStack>
        </VStack>
    );
};

export const StrokeInputs = ({sW, currStrokeWidth}) => {
    const [strokeWidth, setStrokeWidth] = useState(currStrokeWidth || 0.25);
    const [nonScalingStroke, setNonScalingStroke] = useState(true);

    const handleStrokeWidthChange = (event) => {
        setStrokeWidth(event.target.value);
        sW(event.target.value)
    };

    const handleNonScalingStrokeChange = (event) => {
        setNonScalingStroke(event.target.checked);
        
    };

    return (
        <ThemeProvider theme={Theme}>
        <VStack spacing={4} align="stretch">
        <HStack>
            <Text fontWeight="semibold" mr={2}>Stroke Width:</Text>
            {/* MUI Box component for layout */}
            <Box width="200px" mr={1}> 
            <Slider
                aria-label="Stroke Width"
                value={strokeWidth}
                onChange={(event, newValue) => {
                    setStrokeWidth(Number(newValue));
                    handleStrokeWidthChange(event);
                  }}
                min={0.01}
                max={10.00}
                step={0.01}
            />
        </Box><Text>{strokeWidth}</Text>
        </HStack>
        <Checkbox 
            id="input-stroke-non-scaling" 
            isChecked={nonScalingStroke} 
            onChange={handleNonScalingStrokeChange}
        >
            Non-scaling stroke
        </Checkbox>
        </VStack>
        </ThemeProvider>
    );
};

export const FillRuleSelect = () => {
    const [fillRule, setFillRule] = useState('evenodd');

    const handleFillRuleChange = (event) => {
        setFillRule(event.target.value);
    };

    return (
        <HStack>
        <Text fontWeight="semibold">Fill rule:</Text>
        <Select 
            width={["10rem", "auto"]} 
            id="input-fill-rule" 
            variant="filled" 
            value={fillRule} 
            onChange={handleFillRuleChange}
            bg='transparent'
            border='1px solid black'
            borderRadius='5'
            p='1'
            icon='null'
        >
            <option value="evenodd">evenodd</option>
            <option value="nonzero">nonzero</option>
        </Select>
        </HStack>
    );
};