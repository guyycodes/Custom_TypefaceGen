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
import { Theme } from '../../Theme'

// OptionsCheckboxes component
export const OptionsCheckboxes = () => {
    const [isUnionChecked, setIsUnionChecked] = useState(false);
    const [isKerningChecked, setIsKerningChecked] = useState(true);
    const [isFilledChecked, setIsFilledChecked] = useState(true);
    const [isSeparateChecked, setIsSeparateChecked] = useState(false);
  
    const handleUnionChange = (event) => {
      setIsUnionChecked(event.target.checked);
    };
  
    const handleKerningChange = (event) => {
      setIsKerningChecked(event.target.checked);
    };
  
    const handleFilledChange = (event) => {
      setIsFilledChecked(event.target.checked);
    };
  
    const handleSeparateChange = (event) => {
      setIsSeparateChecked(event.target.checked);
    };
  
    return (
      <ThemeProvider theme={Theme}>
      <VStack alignItems="flex-start">
        <Checkbox id="input-union" isChecked={isUnionChecked} onChange={handleUnionChange}>
          Union
        </Checkbox>
        <Checkbox id="input-kerning" isChecked={isKerningChecked} onChange={handleKerningChange}>
          Kerning
        </Checkbox>
        <Checkbox id="input-filled" isChecked={isFilledChecked} onChange={handleFilledChange}>
          Fill
        </Checkbox>
        <Checkbox id="input-separate" isChecked={isSeparateChecked} onChange={handleSeparateChange}>
          Separate characters
        </Checkbox>
      </VStack>
    </ThemeProvider>
    );
  };

export const BezierAccuracyInput = () => {
    // State to store the input value
    const [bezierAccuracy, setBezierAccuracy] = useState('');

    // Handler to update the state with the input's current value
    const handleBezierAccuracyChange = (event) => {
        setBezierAccuracy(event.target.value);
    };

    return (
        <HStack>
        <Text fontWeight="semibold" mr={2}>
            Bezier accuracy 
            <span title="0.5 = accurate to half a pixel
    .001 = accurate to 1/1000th of a pixel
    smaller numbers take longer to compute
    leave blank for auto">⚙️</span>:
        </Text>
        <Input
            width={["10rem","auto"]}
            id="input-bezier-accuracy"
            placeholder="auto"
            variant="flushed"
            value={bezierAccuracy}
            onChange={handleBezierAccuracyChange}
            bg='transparent'
            border='1px solid black'
            borderRadius='5'
            p='1'
        />
        </HStack>
    );
};

export const DxfUnitsSelect = () => {
  // State to store the selected unit
  const [unit, setUnit] = useState('');

  // Handler to call when an option is selected
  const handleUnitChange = (event) => {
    setUnit(event.target.value);
  };

  return(
    <HStack>
        <Text fontWeight="semibold">DXF Units:</Text>
        <Select 
        width={["10rem","auto"]} 
        id="dxf-units" 
        variant="filled" 
        placeholder="select"
        bg='transparent'
        border='1px solid black'
        borderRadius='5'
        p='1'
        icon='null'
        >
            <option value="mm">mm</option>
            <option value="cm">cm</option>
            <option value="in">in</option>
            <option value="ft">feet</option>
        </Select>
    </HStack>
  )};