import * as React from "react"
import {
    BrowserRouter,
    Routes,
    Route
  } from "react-router-dom";
import {
  ChakraProvider,
  Box
} from "@chakra-ui/react"
import theme from "./theme"
import '@fontsource/lato'
import '@fontsource/roboto'
import '@fontsource/roboto-mono'
import '@fontsource/jost'
import Header from "./components/header/Header"
import Home from "./pages/Home";

export const App = () => (
    <ChakraProvider theme={theme}>
        <Box minH='100vh'>
            <Header></Header>
            <Box marginTop={20}>
                <BrowserRouter>
                    <Routes>
                        <Route path="/" element={<Home />} />
                    </Routes>
                </BrowserRouter>
            </Box>
        </Box>
    </ChakraProvider>
)
