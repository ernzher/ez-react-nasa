import {extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
    colors: {
        brand: {
            100: "#30D5C8"
        }
    },
    fonts: {
        heading: 'Lato, sans-serif',
        body: 'Lato, sans-serif'
    },
    components: {
        Link: {
            baseStyle: {
                fontWeight: "bold",
                _hover: {
                    textDecoration: "none",
                },
                _focus:{
                    boxShadow: "none"
                }
            },
    
        },
    },
})

export default theme