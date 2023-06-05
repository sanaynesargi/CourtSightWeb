import {
  Center,
  Box,
  Text,
  Heading,
  Stack,
  Card,
  CardBody,
  CardHeader,
  StackDivider,
  Stat,
  StatHelpText,
  StatLabel,
  Image,
  StatNumber,
  HStack,
  Flex,
  useMediaQuery,
  Divider,
  Spinner,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { TOR } from "react-nba-logos";
import fetchTeamData from "../apiHandling/fetchTeamData";
import getModelPredictionTeam from "../apiHandling/getTeamPrediction";
import StatCustom from "../components/StatCustom";
import TEAMABBRVMAP from "../utils/teamAbbrevMap";
import NBALogo from "../utils/teamIcons";
import nbaTeams from "../utils/teamIcons";

const DisplayTeam = () => {
  const router = useRouter();
  const [team1, setTeam1] = useState("");
  const [team2, setTeam2] = useState("");
  const [team1Pts, setTeam1Pts] = useState(0);
  const [team2Pts, setTeam2Pts] = useState(0);
  const [largerMobile] = useMediaQuery("(min-width: 775px)");

  useEffect(() => {
    const team1 = router.query.team1 as string;
    const team2 = router.query.team2 as string;

    if (!team1) {
      const loaded = localStorage.getItem("Team1");
      setTeam1(loaded);
    } else {
      setTeam1(team1);
    }

    if (!team2) {
      const loaded = localStorage.getItem("Team2");
      setTeam2(loaded);
    } else {
      setTeam2(team2);
    }
  }, []);

  useEffect(() => {
    if (!team1 || !team2) {
      return;
    }

    fetchTeamData(team1, team2).then((data) => {
      getModelPredictionTeam(data.data).then((points) => {
        setTeam1Pts(points);
      });

      fetchTeamData(team2, team1).then((data) => {
        getModelPredictionTeam(data.data).then((points) => {
          setTeam2Pts(points);
        });
      });
    });
  }, [team1, team2]);

  return (
    <Box overflow="scroll">
      {!largerMobile ? (
        <Center mt="10vh">
          <Stack spacing="5vh">
            <NBALogo team={team1} size="50vw" />
            {team1Pts > 0 ? (
              <Heading textAlign="center">{team1Pts}</Heading>
            ) : (
              <Spinner />
            )}
            <Divider />
            {team2Pts > 0 ? (
              <Heading textAlign="center">{team2Pts}</Heading>
            ) : (
              <Spinner />
            )}
            <NBALogo team={team2} size="50vw" />
          </Stack>
        </Center>
      ) : (
        <Center mt="10vh">
          <HStack spacing="5vh">
            <NBALogo team={team1} size="30vw" />
            {team1Pts > 0 ? (
              <Heading textAlign="center">{team1Pts}</Heading>
            ) : (
              <Spinner />
            )}
            <Divider orientation="vertical" />
            {team2Pts > 0 ? (
              <Heading textAlign="center">{team2Pts}</Heading>
            ) : (
              <Spinner />
            )}
            <NBALogo team={team2} size="30vw" />
          </HStack>
        </Center>
      )}
    </Box>
  );
};

export default DisplayTeam;
