import * as React from "react"
import {
  useColorMode,
  useColorModeValue,
  IconButton,
  IconButtonProps,
} from "@chakra-ui/react"
import { FaMoon, FaSun } from "react-icons/fa"
import { useState } from 'react'
import { useEffect } from "react"

type ColorModeSwitcherProps = Omit<IconButtonProps, "aria-label">

export const ColorModeSwitcher: React.FC<ColorModeSwitcherProps> = (props) => {
  const { toggleColorMode } = useColorMode()
  const text = useColorModeValue("dark", "light")
  const SwitchIcon = useColorModeValue(FaMoon, FaSun)

  const [isHovering, setIsHovering] = useState(false) 
  const [iconStyleOnHover, setIconStyleOnHover] = useState({color: ""}) 

  const toggleHover = () => {
    setIsHovering(!isHovering)
  }

  useEffect(() => {
    setIconStyleOnHover(isHovering ? {color: "#FFD700"} : {color: ""}) 
  }, [isHovering])

  return (
    <IconButton
      size="md"
      fontSize="lg"
      variant="ghost"
      color="current"
      marginLeft="2"
      onClick={toggleColorMode}
      _hover={{ transform: "scale(1.2)" }}
      icon={<SwitchIcon style={iconStyleOnHover}/>}
      aria-label={`Switch to ${text} mode`}
      onMouseEnter={toggleHover}
      onMouseLeave={toggleHover}
      {...props}
    />
  )
}
