import axios from "axios";
import { APIURL } from "./APIURL";
import formatPlayer from "./formatPlayer";

const fetchHeadshotURL = async (player: string) => {
  const formattedPlayer = formatPlayer(player);

  const res = await axios.get(
    `${APIURL}/getHeadshotURL?player=${formattedPlayer}`
  );

  return res.data;
};

export default fetchHeadshotURL;
