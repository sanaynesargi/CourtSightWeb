import axios from "axios";
import { APIURL } from "./APIURL";
import formatPlayer from "./formatPlayer";

const fetchPlayerInfo = async (player: string) => {
  const formattedPlayer = formatPlayer(player);

  const res = await axios.get(
    `${APIURL}/getPlayerInfo?player=${formattedPlayer}`
  );

  return res.data;
};

export default fetchPlayerInfo;
