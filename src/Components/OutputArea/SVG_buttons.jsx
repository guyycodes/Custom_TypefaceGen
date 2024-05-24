import React, { useState, useEffect } from 'react';
import {
  Box,
  Link,
  Textarea,
} from '@chakra-ui/react';
import { MaterialButton } from '../../util/MaterialButtons';
import { Stack } from '@mui/material';

// Component for displaying the generated SVG
export const OutputTextarea = ({ essveegee }) => {
  const [SVG, setSVG] = useState(essveegee);

  useEffect(() => {
    setSVG(essveegee);
  }, [essveegee]);

  return (
    <>
      {/* Box for displaying the generated SVG */}
      <Box
        width={["100%", "550px"]} // Set width to 100% for mobile and 500px for larger screens
        height={["auto", "100px"]} // Set height to auto for mobile and 500px for larger screens
        borderWidth="1px"
        borderColor="gray.200"
        borderRadius="md"
         // Adding box shadow along the bottom
        mb={4}
      >
        <Box
          dangerouslySetInnerHTML={{ __html: essveegee }}
          width="100%"
          height="100%"
        />
      </Box>

      {/* Textarea for displaying the SVG code */}
      <Textarea
        width={["100%", "500px"]} // Set width to 100% for mobile and 500px for larger screens
        minHeight={["8rem", "12rem"]}
        id="output-svg"
        readOnly
        value={SVG}
        placeholder="Generated SVG will appear here..."
        borderColor="gray.200"
        bg='transparent'
        border='1px solid black'
        borderRadius='5'
        p='1'
      />
    </>
  );
};
// Component for rendering the output MaterialButtons
export const OutputButtons = ({ svgContent, dxfContent, linkUrl }) => {
  const copyToClipboard = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      alert('Content copied to clipboard!');
    } catch (err) {
      alert('Failed to copy content');
    }
  };

  const downloadFile = (content, filename, mimetype) => {
    const blob = new Blob([content], { type: mimetype });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <Stack
      spacing={1}
      direction={{ xs: 'column', sm: 'row' }}
      alignItems={{ xs: 'flex-start', sm: 'center' }}
    >
      <MaterialButton 
        id="copy-to-clipboard-btn" 
        variant="contained" 
        color="primary"
        onClick={() => copyToClipboard(svgContent)}
      >
        Copy to clipboard
      </MaterialButton>
      <MaterialButton
        id="download-svg-btn"
        variant="contained" 
        color="success"
        onClick={() => downloadFile(svgContent, "design.svg", "image/svg+xml")}
      >
        Download Svg
      </MaterialButton>
      <MaterialButton
        to={linkUrl}
        id="create-link-btn"
        variant="contained"
        color="secondary"
      >
        Create link
      </MaterialButton>
      <MaterialButton
        id="download-dxf-btn"
        variant="contained"
        color="warning"
        onClick={() => downloadFile(dxfContent, "design.dxf", "application/dxf")}
      >
        Download Dxf
      </MaterialButton>
    </Stack>
  );
};
