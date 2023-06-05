import { Box, keyframes } from "@chakra-ui/react";
import React, { useEffect } from "react";
import Layout from "../components/Layout";

const slide = keyframes`
  0% {
    transform: translateX(-25%);
  }
  100% {
    transform: translateX(25%);
  }
`;

const IndexPage = () => {
  useEffect(() => {
    const colorMode = localStorage.getItem("chakra-ui-color-mode");

    if (colorMode != "dark") {
      localStorage.setItem("chakra-ui-color-mode", "dark");
    }
  }, []);
  return (
    <>
      <Box>
        <Layout></Layout>
      </Box>
      <Box
        position="fixed"
        top={0}
        left="-50%"
        right="-50%"
        bottom={0}
        opacity={0.5}
        zIndex={-1}
        bgGradient="linear-gradient(-60deg, #1b1c1e 50%, #292a2d 50%)"
        animation={`${slide} 3s ease-in-out infinite alternate`}
      />
      <Box
        position="fixed"
        top={0}
        left="-50%"
        right="-50%"
        bottom={0}
        opacity={0.5}
        zIndex={-1}
        bgGradient="linear-gradient(-60deg, #1b1c1e 50%, #292a2d 50%)"
        animation={`${slide} 3s ease-in-out 1s infinite alternate-reverse`}
      />
      <Box
        position="fixed"
        top={0}
        left="-50%"
        right="-50%"
        bottom={0}
        opacity={0.5}
        zIndex={-1}
        bgGradient="linear-gradient(-60deg, #1b1c1e 50%, #292a2d 50%)"
        animation={`${slide} 3s ease-in-out 2s infinite alternate`}
      />
    </>
  );
};

export default IndexPage;
