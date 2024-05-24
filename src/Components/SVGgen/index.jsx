import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Box,
  Container,
  Divider,
  Grid,
  Input,
  VStack,
  useColorModeValue,
  Spinner,
  Center,
  HStack
} from '@chakra-ui/react';
import { AdBannerCarousel } from '../AdsCarousel/Carousel';
import { AdBannerCarousel2 } from '../AdsCarousel/Carousel2';
import { FontSelector } from '../font_Selector/selectFont';
import { SizeInput } from '../Inputs/TextModifications';
import { TextInput } from '../Inputs/TextModifications';
import { OptionsCheckboxes } from '../Inputs/OtherOptions';
import { BezierAccuracyInput } from '../Inputs/OtherOptions';
import { DxfUnitsSelect } from '../Inputs/OtherOptions';
import { ColorInputs } from '../Inputs/Color_Stroke_Fill_Selectors';
import { StrokeInputs } from '../Inputs/Color_Stroke_Fill_Selectors';
import { FillRuleSelect } from '../Inputs/Color_Stroke_Fill_Selectors';
import { OutputTextarea } from '../OutputArea/SVG_buttons';
import { OutputButtons } from '../OutputArea/SVG_buttons';
// import { SelectLanguage } from '../LanguageSelector/langSelector';
import opentype from 'opentype.js';
import makerjs from 'makerjs';



// Main component for converting Google Font to SVG path
export const GoogleFontToSvgPath = () => {
  const startSize = 25
  const [text, setText] = useState("");  // sets the initial SVG for initial load
  const [size, setSize] = useState(); 
  const [svg, setSvg] = useState('');
  const [font, setFont] = useState();
  const [fill, setFill] = useState('');
  const [DeBounce, setDeBounce] = useState()
  const [currStrokeColor, setStrokeColor] = useState('')
  const [strokeWidth, setStrokeWidth] = useState('')
  const [dXf, setDXF] = useState()
  const [initial, setInitial] = useState("https://fonts.gstatic.com/s/akronim/v23/fdN-9sqWtWZZlHRp-gBxkFYN-a8.ttf");
  const [isLoading, setIsLoading] = useState(false);
  
  const setStroke = async (e) =>{
    setStrokeColor(e)
  }
  const setSizeForSVG = async (size) => {
    setIsLoading(true);
    // Simulate an asynchronous operation
    setTimeout(() => {
      console.log("New Size Set:", size);
      setSize(size);
      setIsLoading(false);
    }, 3000);
  };
  // Function to set the text for SVG generation
  const setTextForSVG = async (text) => {
    setText(text);
  };

  useEffect(() => {
    setDeBounce(true);
    // Set initial font URL and text
    const initialUrl = font || initial;
    const initialText = text || "Hello World";
    
    // Debounce timer
    const debounceTimer = setTimeout(() => {
      TextToSVG(initialUrl, initialText);
      console.log(strokeWidth)
      setDeBounce(false);
    }, 1750); // Adjust the debounce delay as needed (in milliseconds)
  
    // Clean up the debounce timer on component unmount or dependency change
    return () => {
      clearTimeout(debounceTimer);
    };
  }, [text, size, initial, font, fill, currStrokeColor, strokeWidth]);


  // Function to convert text to SVG using the specified font
  const TextToSVG = async (fontPath, text) => {
    try {
      const font = await opentype.load(fontPath);

      const defaultOptions = {
        height: size,
        fill: fill,
        strokeWidth: strokeWidth,
        stroke: currStrokeColor,

        style: 'normal',
        bezierAccuracy: 0.1,
        union: false,
        kerning: true,
        separate: false,
        dxfUnit: 'mm',
        fillRule: 'evenodd',
        noScalingStroke: false,
      };

      const mergedOptions = { ...defaultOptions};


      const model = new makerjs.models.Text(font, text, 
        mergedOptions.height,
        mergedOptions.strokeWidth, 
        {
        bezierAccuracy: mergedOptions.bezierAccuracy,
        union: mergedOptions.union,
        kerning: mergedOptions.kerning,
        separate: mergedOptions.separate,
        noScalingStroke: mergedOptions.noScalingStroke,
      });

      const svgString = makerjs.exporter.toSVG(model, {
        units: mergedOptions.dxfUnit,
        fill: mergedOptions.fill, // Set the fill color
        
        stroke: mergedOptions.stroke,
        strokeWidth: mergedOptions.strokeWidth,
      });
      
      setSvg(svgString);
    } catch (err) {
      console.error("Error loading font or generating SVG", err);
    }
  };
  function convertSvgToDxf(svgElement) {
    // Create a Maker.js model from an SVG path
    var model = makerjs.importer.fromSVGPathData(svgElement.getAttribute('d'));

    // Export the model to DXF format
    var dxf = makerjs.exporter.toDXF(model);

    setDXF(dxf)
    
}
  return (
    <>
      <Container maxW="container.xl" py={0}>
        <AdBannerCarousel />
        <Divider my={8} />
        <Box bg={useColorModeValue('white', 'white')} borderRadius="lg" boxShadow="xl" p={[4, 8]} spacing={6}>
          <Box id="error-display" mb={8} color="red.600" textAlign="center"></Box>
          <Grid templateColumns={{ base: '1fr', lg: 'repeat(2, 1fr)' }} gap={10}>
            <VStack spacing={6} align="stretch">
              <FontSelector setTheFont={setFont} initialFont={'Akronim' || initial } />
              <TextInput setTheText={setTextForSVG}  />
              {/* <SelectLanguage initialFont={'Akronim' || initial}/> */}
              {isLoading ? (
                <Center>
                  <Spinner style={{ width: '1em', height: '1em' }} />
                </Center>
              ) : (
                <SizeInput setTheSize={setSizeForSVG} currSize={size} startSize={startSize}/>
              )}
              <OptionsCheckboxes />
              <BezierAccuracyInput />
              <DxfUnitsSelect />
            </VStack>
            <VStack spacing={6} align="stretch">
              <HStack>
                <ColorInputs fC={setFill} currColor={fill} setStroke={setStrokeColor} currStrokeColor={currStrokeColor}/>
                {DeBounce && <Spinner style={{ width: '2em', height: '2em' }} />}
              </HStack>
              <StrokeInputs sW={setStrokeWidth} currStrokeWidth={strokeWidth}/>
              <FillRuleSelect />
              <VStack spacing={6} align="stretch" minHeight={'auto'}>
                <OutputTextarea essveegee={svg} />
                <OutputButtons svgContent={svg} dxfContent={dXf}/>
              </VStack>
            </VStack>
          </Grid>
        </Box>
        <Input id="dummy" name="dummy" type="hidden" />
      </Container>
      <Divider my={8} />
      <AdBannerCarousel2 />
    </>
  );
};