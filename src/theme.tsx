import {extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
    colors: {
        brand: {
            100: "#30D5C8",
            
        },
        type: {
            grass: "#A8E769",
            poison: "#B075D1",
            fire: "#FE7F00",
            psychic: "#F378B7",
            bug: "#578744",
            rock: "#897340",
            electric: "#E6CC11",
            ice: "#30D5C8",
            water: "#1664D8",
            flying: "#CECACA",
            ground: "#67470D",
            fairy: "#FFBEE7",
            normal: "#636363", 
            steel: "#929292",
            fighting: "#D86104",
            ghost: "#5237FB",
            dark: "#1C1B1C",
            dragon: "#6B006B",
        },
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
        Button:{
            variants: {
                pri_gradient: {
                    bgGradient: "linear(to-r, , #24adf3, #29deb7)"
                },
                snd_gradient: {
                    bgGradient: "linear(to-r, #6c90ff, #7ef2f6)"
                }
            }
        }
    },
})

export default theme