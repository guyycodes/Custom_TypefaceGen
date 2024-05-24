import { extendTheme } from '@chakra-ui/react';

// Extend the theme to include custom colors and global styles
export const Theme = extendTheme({

  components: {
    Checkbox: {
      baseStyle: {
        control: {
          borderColor: 'blue.500',
          _checked: {
            bg: 'transparent',
            borderColor: 'blue.500',
            _hover: {
              bg: 'transparent',
              borderColor: 'blue.600',
            },
            _disabled: {
              borderColor: 'gray.300',
            },
          },
          _indeterminate: {
            bg: 'transparent',
            borderColor: 'blue.500',
            _hover: {
              bg: 'transparent',
              borderColor: 'blue.600',
            },
            _disabled: {
              borderColor: 'gray.300',
            },
          },
          _disabled: {
            bg: 'transparent',
            borderColor: 'gray.300',
          },
          _focus: {
            boxShadow: 'none',
          },
          _hover: {
            borderColor: 'blue.600',
          },
        },
      },
      sizes: {
        sm: {
          control: {
            width: '16px',
            height: '16px',
          },
          label: {
            fontSize: 'sm',
          },
        },
        md: {
          control: {
            width: '20px',
            height: '20px',
          },
          label: {
            fontSize: 'md',
          },
        },
      },
      defaultProps: {
        size: 'md',
        colorScheme: 'blue',
      },
    },
  },
  // Add your color modes config
  config: {
    initialColorMode: 'light',
    useSystemColorMode: false,
  },
  // Global styles that depend on color mode
  styles: {
    global: (props) => ({
      body: {
        bg: props.colorMode === 'dark' ? 'gray.800' : 'white',
        color: props.colorMode === 'dark' ? 'white' : 'black',
      },
      // 'html, body, #root, div': {
      //   boxSizing: 'border-box',
      //   margin: "0px",
      //   border: "0px",
      //   width: '100vw',
  
      // },
      // more global styles here
    }),
  },
});


