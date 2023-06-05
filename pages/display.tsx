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
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import DisplayMobile from "../components/DisplayMobile";
import DisplayNonMobile from "../components/DisplayNonMobile";

const Display = () => {
  const router = useRouter();
  const [playerName, setPlayerName] = useState("");
  const [opponent, setOpponent] = useState("");
  const [largerMobile] = useMediaQuery("(min-width: 775px)");

  useEffect(() => {
    const rawPlayerName = router.query.player as string;
    const rawOpponent = router.query.opponent as string;

    if (!rawPlayerName) {
      const loadedPlayer = localStorage.getItem("playerName");
      setPlayerName(loadedPlayer);
      return;
    }

    if (!rawOpponent) {
      const loadedOpponent = localStorage.getItem("opponent");
      setOpponent(loadedOpponent);
      return;
    }

    let p = "";

    for (let i of rawPlayerName.split("|")) {
      p += i;
      p += " ";
    }

    p.trimEnd();

    setPlayerName(p);

    setOpponent(rawOpponent);
  }, []);
  return (
    <Box overflow="scroll">
      {largerMobile ? (
        <DisplayNonMobile
          providedPlayerName={playerName}
          providedOpponent={opponent}
        />
      ) : (
        <DisplayMobile
          providedPlayerName={playerName}
          providedOpponent={opponent}
        />
      )}
    </Box>
  );
};

export default Display;
