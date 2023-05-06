import { Box } from "@chakra-ui/react";
import React from "react";
import Layout from "../components/Layout";

const IndexPage = () => (
  <>
    <Box
      w="100vw"
      h="100vh"
      sx={{
        position: "relative",
        minHeight: "100vh",
      }}
    >
      <Layout></Layout>
    </Box>
  </>
);

export default IndexPage;
