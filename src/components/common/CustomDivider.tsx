import React from 'react'
import { Flex, Divider } from '@chakra-ui/react'

const CustomDivider = () => {
  return (
    <Flex justifyContent='space-between' alignItems='center' my={5}>
        <Divider orientation='horizontal' bgColor='brand.100' height={.5} width="32%" borderRadius={100}/>
        <Divider orientation='horizontal' bgColor='brand.100' height={.5} width="32%" borderRadius={100}/>
        <Divider orientation='horizontal' bgColor='brand.100' height={.5} width="32%" borderRadius={100}/>
    </Flex>
  )
}

export default CustomDivider