import { Card, CardBody, CardHeader } from "@chakra-ui/card";
import {
  Box,
  Stack,
  Heading,
  StackDivider,
  HStack,
  Center,
  Grid,
  GridItem,
  Divider,
  Spacer,
} from "@chakra-ui/layout";
import { Stat, StatLabel, StatNumber, StatHelpText } from "@chakra-ui/stat";
import { Button, Flex, Image, Spinner, Text } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import StatCustom from "./StatCustom";
import fetchPlayerInfo from "../apiHandling/fetchPlayerInfo";
import formatHeight from "../apiHandling/formatHeight";
import fetchHeadshotURL from "../apiHandling/fetchPlayerHeadshot";
import formatPos from "../apiHandling/formatPos";
import { getMainColor } from "nba-color";
import e from "express";
import fetchPlayerData from "../apiHandling/fetchPlayerData";
import getModelPrediction from "../apiHandling/getModelPrediction";
import { Tensor } from "@tensorflow/tfjs-core";
import TEAMABBRVMAP from "../utils/teamAbbrevMap";

const getStatColor = (value) => {
  if (value >= 10) {
    return "green.300";
  } else if (value >= 5) {
    return "yellow.300";
  } else {
    return "red.300";
  }
};

const DisplayMobile = ({ providedPlayerName, providedOpponent }) => {
  const [playerName, setPlayerName] = useState("");
  const [playerInfo, setPlayerInfo] = useState({});
  const [headshotURL, setHeadshotURL] = useState("");
  const [opponent, setOpponent] = useState("");
  const [playerStats, setPlayerStats] = useState([]);
  const [same, setSame] = useState(false);

  useEffect(() => {
    if (!providedPlayerName) {
      const loadedPlayer = localStorage.getItem("playerName");
      setPlayerName(loadedPlayer);
    } else {
      const loadedPlayer = localStorage.getItem("playerName");
      const apiDataLoaded = JSON.parse(localStorage.getItem("APIDataLoaded"));
      if (loadedPlayer == providedPlayerName && apiDataLoaded) {
        console.log("here");
        setSame(true);
      }
      setPlayerName(providedPlayerName);
    }

    if (!providedOpponent) {
      const loadedOpponent = localStorage.getItem("opponent");
      setOpponent(loadedOpponent);
    } else {
      setOpponent(providedOpponent);
    }
  }, []);

  useEffect(() => {
    if (!playerName) {
      return;
    }

    if (same) {
      setPlayerInfo(JSON.parse(localStorage.getItem("PlayerInfo")));
      setHeadshotURL(localStorage.getItem("HeadshotURL"));
      return;
    }

    fetchPlayerInfo(playerName).then((data) => {
      if (data["error"]) {
        console.log(data["error"]);
        return;
      }
      setPlayerInfo(data.data);
      localStorage.setItem("PlayerInfo", JSON.stringify(data.data));
    });

    fetchHeadshotURL(playerName).then((data) => {
      if (data["error"]) {
        return;
      }
      setHeadshotURL(data.data);
      localStorage.setItem("HeadshotURL", data.data);
    });
  }, [playerName]);

  useEffect(() => {
    if (!playerName || !opponent) {
      return;
    }

    if (same) {
      setPlayerStats(JSON.parse(localStorage.getItem("Prediction")));
      return;
    }

    fetchPlayerData(playerName, opponent).then((data) => {
      if (data["error"]) {
        if (data["error"] == "No Games Played") {
          setPlayerStats([null, null, null]);
          localStorage.setItem("APIDataLoaded", JSON.stringify(true));
          localStorage.setItem(
            "Prediction",
            JSON.stringify([null, null, null])
          );
        }
        return;
      }
      getModelPrediction(playerName, data.data).then((pred: Tensor) => {
        if (!pred) {
          setPlayerStats([null, null, 1]);
          localStorage.setItem("APIDataLoaded", JSON.stringify(true));
          localStorage.setItem("Prediction", JSON.stringify([null, null, 1]));
          return;
        }
        const stats = pred.arraySync()[0] as number[];
        setPlayerStats(stats);
        localStorage.setItem("Prediction", JSON.stringify(stats));
        localStorage.setItem("APIDataLoaded", JSON.stringify(true));
      });
    });
  }, [playerName, opponent]);

  return (
    <Box overflow="scroll">
      <Center>
        <Stack>
          <Card
            direction="column"
            overflow="hidden"
            variant="unsstyled"
            bg="transparent"
            mt="10vh"
            mb="5vh"
            justifyContent="center"
            alignItems="center"
          >
            <Stack>
              <CardBody>
                <Heading textAlign="center">{playerName}</Heading>
                {Object.keys(playerInfo).length == 0 ? (
                  <Center>
                    <Spinner />
                  </Center>
                ) : (
                  <Text textAlign="center">
                    {playerInfo ? formatHeight(playerInfo["Height"]) : " "},{" "}
                    {playerInfo ? playerInfo["Weight"] : " "}lbs •{" "}
                    {playerInfo ? playerInfo["Team"] : " "} • #
                    {playerInfo ? playerInfo["#"] : " "}{" "}
                    {playerInfo ? formatPos(playerInfo["POS"]) : " "}
                  </Text>
                )}
              </CardBody>
            </Stack>
            {Object.keys(playerInfo).length == 0 ? (
              <Center>
                <Spinner></Spinner>
              </Center>
            ) : (
              <Image
                borderRadius="100%"
                bgColor={getMainColor(playerInfo["Abbrv"]).hex}
                maxW={{ base: "100%", sm: "200px" }}
                src={headshotURL}
                alt="Player"
              />
            )}
          </Card>

          <Stack alignItems="center">
            {Object.keys(playerInfo).length == 0 ? (
              <Center>
                <Spinner />
              </Center>
            ) : (
              <HStack textAlign="center" spacing="5vw">
                <Stat>
                  <StatLabel fontSize="l">PPG</StatLabel>
                  <StatNumber fontSize="3xl">
                    {playerInfo ? playerInfo["PPG"] : ""}
                  </StatNumber>
                </Stat>
                <Stat>
                  <StatLabel fontSize="l">RPG</StatLabel>
                  <StatNumber fontSize="3xl">
                    {playerInfo ? playerInfo["RPG"] : ""}
                  </StatNumber>
                </Stat>
                <Stat>
                  <StatLabel fontSize="l">APG</StatLabel>
                  <StatNumber fontSize="3xl">
                    {playerInfo ? playerInfo["APG"] : ""}
                  </StatNumber>
                </Stat>
                <Stat>
                  <StatLabel fontSize="l">TS %</StatLabel>
                  <StatNumber fontSize="3xl">
                    {playerInfo
                      ? Math.round(playerInfo["TS"] * 100 * 10) / 10
                      : ""}
                    %
                  </StatNumber>
                </Stat>
              </HStack>
            )}
            <Text color="gray.400">2022-2023 Regular Season</Text>
          </Stack>
          <Divider />
          <Flex justify="center" align="center" h="auto">
            <Stack
              direction="column"
              spacing={4}
              mt="3vh"
              alignItems="center"
              justifyContent="center"
            >
              {playerStats.length > 0 ? (
                <>
                  <Heading textAlign="center">
                    {!playerStats.includes(null)
                      ? `Predictions vs.
                    ${TEAMABBRVMAP[opponent]}`
                      : !playerStats.includes(1)
                      ? "No Games Found"
                      : "No Prediction Available"}
                  </Heading>
                  <Spacer h="1vh" />
                  {!playerStats.includes(null) ? (
                    <>
                      <StatCustom
                        label="Points"
                        value={Math.round(playerStats[0])}
                        color={getStatColor(Math.round(playerStats[0]))}
                      />
                      <StatCustom
                        label="Rebounds"
                        value={Math.round(playerStats[1])}
                        color={getStatColor(Math.round(playerStats[1]))}
                      />
                      <StatCustom
                        label="Assists"
                        value={Math.round(playerStats[2])}
                        color={getStatColor(Math.round(playerStats[2]))}
                      />
                    </>
                  ) : null}
                </>
              ) : (
                <Spinner />
              )}
            </Stack>
          </Flex>
        </Stack>
      </Center>
    </Box>
  );
};

export default DisplayMobile;
