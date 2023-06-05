import axios from "axios";
import { APIURL } from "./APIURL";
import formatPlayer from "./formatPlayer";

const fetchPlayerData = async (player: string, opp: string) => {
  const formattedPlayer = formatPlayer(player);

  const res = await axios.get(
    `${APIURL}/getPlayerData?player=${formattedPlayer}&opponent=${opp}`
  );

  return res.data;
};

export default fetchPlayerData;
