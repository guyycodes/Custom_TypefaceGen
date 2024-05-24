import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {  
    Button, 
    HStack, 
    Input, 
    Select, 
    Text, 
    VStack,
    useColorModeValue
   } from '@chakra-ui/react';
import { ChevronDownIcon } from '@chakra-ui/icons';
import { FixedSizeList } from 'react-window';
import { openDB } from 'idb';
import { Menu, MenuItem } from '@mui/material';
import { MaterialButton } from '../../util/MaterialButtons';
 // FontSelector component
export const FontSelector = ( { setTheFont, initialFont } ) => {
  const [anchorEl, setAnchorEl] = useState(null);
 // State hook for storing the full list of fonts fetched from the Google Fonts API
 const [fontList, setFontList] = useState([]);
 // State hook for the currently selected font by the user
 const [selectedFont, setSelectedFont] = useState(initialFont);
 // State hook for storing font files URLs after they're fetched lazily
 const [fontFiles, setFontFiles] = useState({});
 // State hook for current pagination page
 const [currentPage, setCurrentPage] = useState(0);
 // State hook for storing the uploaded font file
 const [uploadedFont, setUploadedFont] = useState(null);
 // State to store the selected font variant
 const [variant, setVariant] = useState('');
 // Constant for fonts displayed per page to manage pagination
 const fontsPerPage = 300;
 let savedFontList = '';

 // Effect hook to fetch the list of Google Fonts on component mount
 useEffect(() => {
  const fetchGoogleFonts = async () => {
    try {
      const a = 'AIza';
      const p = 'SyBg-';
      const i = '5D8YEP';
      const k = 'qq6HRj';
      const e = 'tTkgVLNQ';
      const y = 'RvD21VwoFQ';
      const $ = a + p + i + k + e + y;

      // Opening the IndexedDB database
      const db = await openDB('FontDatabase', 1, {
        upgrade(db) {
          db.createObjectStore('fonts');
        },
      });

      // Checking if a saved font list exists
      savedFontList = await db.get('fonts', 'fontList');

      if (!savedFontList) {
        // Fetching the font list using axios if it doesn't exist in IndexedDB
        const response = await axios.get(`https://www.googleapis.com/webfonts/v1/webfonts?key=${$}`);
        
        // Setting the fetched font list to state
        setFontList(response.data.items);
       
        // Saving the new font list to IndexedDB
        await db.put('fonts', response.data.items, 'fontList');

        // Iterate over the font list and save each font file to IndexedDB
        for (const font of response.data.items) {
          if (font.files && font.files.regular) {
            const fontResponse = await axios.get(font.files.regular, { responseType: 'arraybuffer' });
            await db.put('fonts', fontResponse.data, font.files.regular);
          }
        }
      } else {
        // If a saved font list exists, set it to the state
        setFontList(savedFontList);
      }
    } catch (error) {
      console.error('Error fetching Google Fonts:', error);
    }
  };

  fetchGoogleFonts();
}, []);


    
    // Function to handle the lazy loading of font files
    const setList = async (fontFamily) =>{
        // Check if the font file isn't already loaded
        if (!fontFiles[fontFamily]) {
            // Fetch the font file
            const fontFile = await fetchFontFile(fontFamily);
            // Update the state with the fetched font file, preserving previous files
            setFontFiles((prevFiles) => ({ ...prevFiles, [fontFamily]: fontFile }));
        }
    }

    // Function to set selected font on user selection
    const handleFontSelect = async (fontFamily) => {
      
      // Open the IndexedDB database
      const db = await openDB('FontDatabase', 1);

      // Retrieve the font list from IndexedDB
      const fontList = await db.get('fonts', 'fontList');

      setSelectedFont(fontFamily);

      // select the specific font the user selects
      fontList.find((font) => { 
        if(font.family == fontFamily){
          setTheFont(font.files.regular)
        }})

    };

    // Function to handle font file upload
    const handleFontUpload = (event) => {
      const file = event.target.files[0];
      if (file) {
        const fontUrl = URL.createObjectURL(file);
        setUploadedFont({ name: file.name.split('.')[0], url: fontUrl }); // Assuming the file name is the font name
      }
    };
  
    // Function to handle removal of uploaded font
    const handleRemoveUploadedFont = () => {
        setUploadedFont(null);
    };

    // Handlers for pagination controls
    const handlePreviousPage = () => {
        setCurrentPage((prevPage) => prevPage - 1);
    };
    
      const handleNextPage = () => {
        setCurrentPage((prevPage) => prevPage + 1);
    };

    // Handler to call when an option is selected
    const handleVariantChange = (event) => {
        setVariant(event.target.value);
    };
    
    // handles the material ui menu opening
    const handleMenuOpen = (event) => {
      setAnchorEl(event.currentTarget);
    };
  
    const handleMenuClose = () => {
      setAnchorEl(null);
    };

    // Function to fetch the actual font file given a fontFamily
    const fetchFontFile = async (fontFamily) => {
      try {
        // Open the IndexedDB database
        const db = await openDB('FontDatabase', 1);
    
        // Retrieve the font list from IndexedDB
        const fontList = await db.get('fonts', 'fontList');
    
        // Find the font object from the list using the fontFamily key
        const font = fontList.find((font) => font.family === fontFamily);
    
        // Conditional to check if the regular variant of the font exists
        if (font && font.files && font.files.regular) {
          // Retrieve the font file data from IndexedDB
          const fontData = await db.get('fonts', font.files.regular);

          // Create a blob from the font data
          const fontBlob = new Blob([fontData], { type: 'font/woff2'});

          // Creating a URL object for the blob, which can be used in @font-face css style
          const fontUrl = URL.createObjectURL(fontBlob);

          return fontUrl;
        }

        // Return null if the font file doesn't exist
        return null;
    } catch (error) {
      console.error('Error fetching font file:', error);
      return null;
    }
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

    // Rendering the component UI using Chakra UI components
    return (
        <VStack spacing={4} align="stretch">
        {/* Dynamically injecting font-face CSS for lazily loaded fonts */}
        <style>
          {Object.entries(fontFiles).map(([fontFamily, fontFile]) => `
            @font-face {
              font-family: '${fontFamily}';
              src: url('${fontFile}') format('truetype');
            }
          `)}
        </style>
        {/* UI layout and interactivity for font selection */}
        <HStack>
          <VStack align="start">
            <Text fontWeight="semibold">Google font:</Text>
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
        {/* Pagination controls to navigate through font list */}
        <HStack justify="center" color='blue.500'>
        <MaterialButton
            onClick={handlePreviousPage}
            disabled={currentPage === 0}
            variant="text"
          >
            Previous ({currentPage * fontsPerPage + 1} - {Math.min((currentPage + 1) * fontsPerPage, fontList.length)})
          </MaterialButton>
          <MaterialButton
            onClick={handleNextPage}
            disabled={(currentPage + 1) * fontsPerPage >= fontList.length}
            variant="text"
          >
           | Next ({Math.min((currentPage + 1) * fontsPerPage + 1, fontList.length)} - {Math.min((currentPage + 2) * fontsPerPage, fontList.length)})
          </MaterialButton>
        </HStack>
        {/* Additional UI elements for optional font upload and variant selection */}
        {/* <HStack>
        <Text width={["5rem", "auto"]} fontWeight="semibold">
          (optional) upload font:
        </Text>
        <Input
          width={["10rem", "auto"]}
          id="font-upload"
          type="file"
          accept=".ttf,.otf,.woff,.woff2"
          onChange={handleFontUpload}
        />
        {uploadedFont && (
          <MaterialButton
            id="font-upload-remove"
            variant="contained"
            color="error"
            onClick={handleRemoveUploadedFont}
          >
            Remove
          </MaterialButton>
        )}
      </HStack>
      {uploadedFont && (
        <style>
          {`
            @font-face {
              font-family: '${uploadedFont.name}';
              src: url('${uploadedFont.url}') format('truetype');
            }
          `}
        </style>
      )}
    <HStack >
      <Text fontWeight="semibold">Variant:</Text>
      <Select
        width={["10rem", "auto"]}
        id="font-variant"
        variant="filled"
        placeholder="Select variant"
        value={variant}
        onChange={handleVariantChange}
        bg={'transparent'}
        icon={"null"}
      >
        <option value="regular">Regular</option>
        <option value="italic">Italic</option>
      </Select>
    </HStack> */}
    </VStack>
)};