import axios from "axios";
import { APIURL } from "./APIURL";
import formatPlayer from "./formatPlayer";

const fetchTeamData = async (team: string, opp: string) => {
  const res = await axios.get(
    `${APIURL}/playersOnTeam?team=${team}&opponent=${opp}`
  );

  return res.data;
};

export default fetchTeamData;
