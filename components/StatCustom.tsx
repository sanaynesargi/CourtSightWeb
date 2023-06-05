import {
  Box,
  Spacer,
  Stat,
  StatLabel,
  StatNumber,
  Text,
} from "@chakra-ui/react";
import React from "react";

const StatCustom = ({ label, value, color }) => {
  return (
    <Box p={4} shadow="lg" borderRadius="md" bg={color} w="50vw" h="15vh">
      <Stat>
        <StatLabel color="black" fontSize="2xl">
          {label}
        </StatLabel>
        <Spacer h="1vh" />
        <StatNumber color="black" fontSize="3xl">
          {value}
        </StatNumber>
      </Stat>
    </Box>
  );
};

export default StatCustom;
