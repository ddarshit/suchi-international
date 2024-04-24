import { createTheme } from '@mui/material/styles';

export const Theme = createTheme({
    components: {
        // Name of the component
        MuiButton: {
          styleOverrides: {
            
            root: {
              height:40,
              fontSize: '0.8rem',
              fontFamily:'poppins',
              fontWeight:'normal'
            },
          },
        },
        MuiMenuItem:{
          styleOverrides:{
            root:{
              fontFamily:'poppins',
              fontsize:"0.8rem"
            }
          }
        },
        MuiSelect:{
          styleOverrides:{
            root:{
              fontFamily:'poppins',
              fontSize:"0.8rem"
            }
          }
        },

        MuiTypography:{
          styleOverrides:{
            root:{
              fontFamily:'poppins',
              
            }
          }
        },
        MuiInputLabel:{
          styleOverrides:{
            root:{
              fontFamily:'poppins',
              fontSize:"0.8rem"
            }
          }
        },
        MuiTextField: {
            styleOverrides: {
              
              root: {
                
                '& .MuiOutlinedInput-root': {
                  fontFamily:'poppins',
                    '& fieldset': {
                      border: '1px solid grey', 
                      
                    },
                    fontSize:"0.8rem"
                  },
                  fontFamily:'poppins'
              },
            },
          },
          MuiOutlinedInput: {
            styleOverrides: {
              root: {
                '& fieldset': {
                  border: '1px solid grey',
                  font:'poppins',
                  
                },
              },
            },
          },
          MuiTableCell:{
            styleOverrides:{
              root:{
                fontFamily:'poppins',
                fontsize:"0.8rem"
              }
            }
          },
         
      },
  palette: {
    primary: {
      main: '#673ab7',
    },
    secondary: {
      main: '#ede7f6',
    },
  },
});


