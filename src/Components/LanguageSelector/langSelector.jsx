import React, { useState, useEffect } from 'react';
import {  
    Button, 
    HStack, 
    Input, 
    Select, 
    Text, 
    VStack,
    useColorModeValue
   } from '@chakra-ui/react';
import { Menu, MenuItem } from '@mui/material';
import { MaterialButton } from '../../util/MaterialButtons';
import { ChevronDownIcon } from '@chakra-ui/icons';
import { FixedSizeList } from 'react-window';

export const SelectLanguage = ({ initialFont }) =>{
    const [selectedFont, setSelectedFont] = useState(initialFont);
    const [anchorEl, setAnchorEl] = useState(null);
    const [fontList, setFontList] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    const fontsPerPage = 300;

    const handleMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
      };
    
      const handleMenuClose = () => {
        setAnchorEl(null);
      };

          // Helper function to render MenuItem components for fonts, utilized by react-window for efficient scrolling
    const renderFontMenuItem = ({ index, style }) => {
        // Calculating the font to render based on current page and index
        const font = fontList[currentPage * fontsPerPage + index];
        return (
          <FontMenuItem
            key={font.family}
            fontFamily={font.family}
            fontFile={fontFiles[font.family]}
            onSelect={handleFontSelect}
            style={style}
          />
        );
      };

    // Component for rendering individual font menu items
    // This component initiates the lazy loading of the font file on hover
    const FontMenuItem = ({ fontFamily, onSelect, style }) => {
        useEffect(() => {
          setList(fontFamily);
        }, [fontFamily]);
      
        return (
          <MenuItem
            onClick={() => onSelect(fontFamily)}
            style={{ ...style, fontFamily: fontFamily, width: '100%' }} // Add width: '100%'
          >
            {fontFamily}
          </MenuItem>
        );
      };

      
return(
    <>
            {/* UI layout and interactivity for font selection */}
        <HStack>
          <VStack align="start">
            <Text fontWeight="semibold">Language:</Text>
            <Text fontSize="sm" color="gray.500"></Text>
          </VStack>
      {/* This is a material UI component the rest is Chakra UI */}
        <MaterialButton
          onClick={handleMenuOpen}
          variant="outlined"
          endIcon={<ChevronDownIcon />}
          style={{ width: '12rem', border: '1px solid black' }}
        >
          {selectedFont || 'Select font'}
        </MaterialButton>
        <Menu 
          anchorEl={anchorEl} 
          open={Boolean(anchorEl)} 
          onClose={handleMenuClose}
          slotProps={{
            paper: {
              style: {
                width: '300px', // Adjust the width as needed
              },
            },
          }}
          >
          <FixedSizeList
            height={300}
            itemCount={Math.min(fontsPerPage, fontList.length - currentPage * fontsPerPage)}
            itemSize={35}
          >
            {renderFontMenuItem}
          </FixedSizeList>
          </Menu>
        {/* Material UI component stops here the rest is Chakra UI */}

        </HStack>
    </>
)}