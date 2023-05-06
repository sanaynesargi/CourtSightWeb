import {
  InputGroup,
  InputRightElement,
  Input,
  IconButton,
  Center,
  Box,
  Button,
  Stack,
  Card,
  Text,
  CardBody,
  Heading,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { SearchIcon } from "@chakra-ui/icons";
import filterSuggestions from "../utils/filterSuggestions";

const Layout = () => {
  const [player, setPlayer] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  return (
    <Center w="100vw">
      <Stack>
        <Center mt="12" mb="12vh">
          <Stack alignItems="center" justifyContent="center">
            <Heading color="gray.100">CourtCast</Heading>
            <Heading size="md" whiteSpace="nowrap" textOverflow="hidden">
              Experience the power of AI NBA player prediction with CourtCast.
            </Heading>
          </Stack>
        </Center>
        <Center>
          <Box w="50vw" mt="10vh">
            <Stack>
              <InputGroup>
                <Input
                  type="text"
                  value={player}
                  bg="gray.700"
                  textColor="white"
                  h="5vh"
                  placeholder="Search players, get stat predictions"
                  onChange={(e) => {
                    let value = e.currentTarget.value;
                    setPlayer(value);
                    setSuggestions(filterSuggestions(value));
                    console.log(value, suggestions);
                  }}
                />
                <InputRightElement>
                  <IconButton
                    aria-label="search-button"
                    icon={<SearchIcon />}
                    h="1.75rem"
                    size="sm"
                    bg="gray.800"
                    onClick={() => {
                      console.log(player);
                    }}
                  ></IconButton>
                </InputRightElement>
              </InputGroup>
              {suggestions.map((value, key) => {
                return (
                  <Card
                    key={key}
                    _hover={{ bg: "gray.600", fontWeight: "bold" }}
                    onClick={() => {
                      setPlayer(value);
                    }}
                  >
                    <CardBody>
                      <Text>{value}</Text>
                    </CardBody>
                  </Card>
                );
              })}
            </Stack>
          </Box>
        </Center>
      </Stack>
    </Center>
  );
};

export default Layout;
