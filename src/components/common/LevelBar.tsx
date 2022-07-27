import React from "react";
import { Box } from "@chakra-ui/react";
import { useState, useEffect } from "react";

type LevelBarProps = {
  bgGradient?: string;
  minVal?: number;
  stat: string;
};

const LevelBar = ({ bgGradient, minVal, stat }: LevelBarProps) => {
  //if maxVal not set, means minVal already input as %
  const [innerBarPercentage, setInnerBarPercentage] = useState(minVal);

  useEffect(() => {
    let maxStat;
    switch (stat) {
      case "hp":
        maxStat = 255;
        break;
      case "attack":
        maxStat = 190;
        break;
      case "defense":
        maxStat = 230;
        break;
      case "special-attack":
        maxStat = 180;
        break;
      case "special-defense":
        maxStat = 230;
        break;
      case "speed":
        maxStat = 200;
        break;
      default:
        maxStat = 100;
        break;
    }

    minVal && setInnerBarPercentage((minVal / maxStat) * 100);
  }, [minVal, stat]);

  return (
    <Box
      position="relative"
      h={{ base: 2, md: 3 }}
      bgColor="blackAlpha.400"
      w="100%"
      borderRadius={30}
    >
      <Box
        position="absolute"
        top={0}
        bottom={0}
        left={0}
        bgGradient={bgGradient || "linear(to-r, , #24adf3, #29deb7)"}
        borderRadius={30}
        width={`${innerBarPercentage}%`}
      />
    </Box>
  );
};

export default LevelBar;
