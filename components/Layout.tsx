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
  useMediaQuery,
  HStack,
  Select,
  useToast,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { SearchIcon } from "@chakra-ui/icons";
import filterSuggestions from "../utils/filterSuggestions";
import { useRouter } from "next/router";
import TEAMS from "../utils/teams";

const removeItems = () => {
  localStorage.removeItem("HeadshotURL");
  localStorage.removeItem("PlayerInfo");
  localStorage.removeItem("Prediction");
  localStorage.removeItem("APIDataLoaded");
  localStorage.removeItem("Team1");
  localStorage.removeItem("Team2");
};

const Layout = () => {
  const [player, setPlayer] = useState("");
  const [largerMobile] = useMediaQuery("(min-width: 610px)");
  const [suggestions, setSuggestions] = useState([]);
  const router = useRouter();
  const [opponent, setOpponent] = useState("Atlanta Hawks");
  const [vsTeam, setVsTeam] = useState("Atlanta Hawks");
  const toast = useToast();

  return (
    <Center w="100vw">
      <Stack>
        <Center mt="12" mb="12vh">
          <Stack alignItems="center" justifyContent="center">
            <Heading color="#FFDAB9">CourtCast</Heading>
            {!largerMobile ? (
              <Heading
                size="md"
                whiteSpace="nowrap"
                textOverflow="hidden"
                letterSpacing="4px"
                color="#008080"
              >
                Basketball Prediction
              </Heading>
            ) : (
              <Heading
                size="md"
                whiteSpace="nowrap"
                textOverflow="hidden"
                letterSpacing="4px"
              >
                Predict NBA Player and Team Stats
              </Heading>
            )}
          </Stack>
        </Center>
        <Center>
          <Tabs isFitted variant="soft-rounded" minW="75vw" colorScheme="gray">
            <TabList mb="1em" opacity="80%">
              <Tab>Player</Tab>
              <Tab>Team (Beta)</Tab>
            </TabList>
            <TabPanels>
              <TabPanel>
                <Box opacity="100%" mt="10vh">
                  <Stack>
                    <HStack>
                      <InputGroup>
                        <Input
                          type="text"
                          value={player}
                          bg="gray.800"
                          textColor="white"
                          h="5vh"
                          placeholder={"Player Name"}
                          onChange={(e) => {
                            let value = e.currentTarget.value;
                            setPlayer(value);
                            setSuggestions(filterSuggestions(value));
                          }}
                        />
                      </InputGroup>
                      <Select
                        variant="filled"
                        onChange={(event) => {
                          setOpponent(event.currentTarget.value);
                        }}
                      >
                        {TEAMS.map((value, key) => {
                          return (
                            <option value={value} key={key}>
                              {value}
                            </option>
                          );
                        })}
                      </Select>
                    </HStack>
                    <IconButton
                      aria-label="search-button"
                      icon={<SearchIcon h="4vh" color="black" />}
                      bg="#00FFFF"
                      opacity="50%"
                      h="4vh"
                      onClick={() => {
                        if (!player) {
                          toast({
                            title: "Submission Error",
                            description: "Please Enter a Player",
                            status: "error",
                            duration: 2000,
                            isClosable: true,
                          });
                          return;
                        }
                        let splitPlayer = player.split(" ");
                        localStorage.setItem("playerName", player);
                        localStorage.setItem(
                          "opponent",
                          opponent.split(" ")[opponent.split(" ").length - 1]
                        );
                        removeItems();
                        router.push(
                          `/display?player=${splitPlayer.join("|")}&opponent=${
                            opponent.split(" ")[opponent.split(" ").length - 1]
                          }`
                        );
                      }}
                    />
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
              </TabPanel>
              <TabPanel>
                <Box opacity="100%" mt="10vh">
                  <Stack>
                    <HStack>
                      <Select
                        variant="filled"
                        onChange={(event) => {
                          setVsTeam(event.currentTarget.value);
                        }}
                      >
                        {TEAMS.map((value, key) => {
                          return (
                            <option value={value} key={key}>
                              {value}
                            </option>
                          );
                        })}
                      </Select>
                      <Text>vs.</Text>
                      <Select
                        variant="filled"
                        onChange={(event) => {
                          setOpponent(event.currentTarget.value);
                        }}
                      >
                        {TEAMS.map((value, key) => {
                          return (
                            <option value={value} key={key}>
                              {value}
                            </option>
                          );
                        })}
                      </Select>
                    </HStack>
                    <IconButton
                      aria-label="search-button"
                      icon={<SearchIcon h="4vh" color="black" />}
                      bg="#00FFFF"
                      opacity="50%"
                      h="4vh"
                      onClick={() => {
                        if (vsTeam == opponent) {
                          toast({
                            title: "Submission Error",
                            description: "Please Choose Different Teams",
                            status: "error",
                            duration: 2000,
                            isClosable: true,
                          });
                          return;
                        }
                        removeItems();
                        localStorage.setItem(
                          "Team1",
                          opponent.split(" ")[opponent.split(" ").length - 1]
                        );
                        localStorage.setItem(
                          "Team2",
                          vsTeam.split(" ")[vsTeam.split(" ").length - 1]
                        );
                        router.push(
                          `/displayTeam?team1=${
                            opponent.split(" ")[opponent.split(" ").length - 1]
                          }&team2=${
                            vsTeam.split(" ")[vsTeam.split(" ").length - 1]
                          }`
                        );
                      }}
                    />
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
              </TabPanel>
            </TabPanels>
          </Tabs>
        </Center>
      </Stack>
    </Center>
  );
};

export default Layout;
