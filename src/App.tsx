import * as React from "react"
import {
  ChakraProvider,
  Box
} from "@chakra-ui/react"
import theme from "./theme"
import '@fontsource/lato'
import '@fontsource/roboto'
import '@fontsource/roboto-mono'
import Header from "./components/header/Header"

export const App = () => (
    <ChakraProvider theme={theme}>
        <Box minH='100vh'>
            <Header></Header>
        </Box>
    </ChakraProvider>
)
