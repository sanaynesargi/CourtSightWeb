import * as NBAIcons from "react-nba-logos";
import TEAMABBRVMAP from "./teamAbbrevMap";

interface NBAIcons {
  [abbreviation: string]: JSX.Element;
}

const NBALogo = ({ team, size }) => {
  const nbaTeams: NBAIcons = {
    /* @ts-expect-error Server Component */
    ATL: <NBAIcons.ATL size={size} />,
    /* @ts-expect-error Server Component */
    BOS: <NBAIcons.BOS size={size} />,
    /* @ts-expect-error Server Component */
    BKN: <NBAIcons.BKN size={size} />,
    /* @ts-expect-error Server Component */
    CHA: <NBAIcons.CHA size={size} />,
    /* @ts-expect-error Server Component */
    CHI: <NBAIcons.CHI size={size} />,
    /* @ts-expect-error Server Component */
    CLE: <NBAIcons.CLE size={size} />,
    /* @ts-expect-error Server Component */
    DAL: <NBAIcons.DAL size={size} />,
    /* @ts-expect-error Server Component */
    DEN: <NBAIcons.DEN size={size} />,
    /* @ts-expect-error Server Component */
    DET: <NBAIcons.DET size={size} />,
    /* @ts-expect-error Server Component */
    GSW: <NBAIcons.GSW size={size} />,
    /* @ts-expect-error Server Component */
    HOU: <NBAIcons.HOU size={size} />,
    /* @ts-expect-error Server Component */
    IND: <NBAIcons.IND size={size} />,
    /* @ts-expect-error Server Component */
    LAC: <NBAIcons.LAC size={size} />,
    /* @ts-expect-error Server Component */
    LAL: <NBAIcons.LAL size={size} />,
    /* @ts-expect-error Server Component */
    MEM: <NBAIcons.MEM size={size} />,
    /* @ts-expect-error Server Component */
    MIA: <NBAIcons.MIA size={size} />,
    /* @ts-expect-error Server Component */
    MIL: <NBAIcons.MIL size={size} />,
    /* @ts-expect-error Server Component */
    MIN: <NBAIcons.MIN size={size} />,
    /* @ts-expect-error Server Component */
    NOP: <NBAIcons.NOP size={size} />,
    /* @ts-expect-error Server Component */
    NYK: <NBAIcons.NYK size={size} />,
    /* @ts-expect-error Server Component */
    OKC: <NBAIcons.OKC size={size} />,
    /* @ts-expect-error Server Component */
    ORL: <NBAIcons.ORL size={size} />,
    /* @ts-expect-error Server Component */
    PHI: <NBAIcons.PHI size={size} />,
    /* @ts-expect-error Server Component */
    PHX: <NBAIcons.PHX size={size} />,
    /* @ts-expect-error Server Component */
    POR: <NBAIcons.POR size={size} />,
    /* @ts-expect-error Server Component */
    SAC: <NBAIcons.SAC size={size} />,
    /* @ts-expect-error Server Component */
    SAS: <NBAIcons.SAS size={size} />,
    /* @ts-expect-error Server Component */
    TOR: <NBAIcons.TOR size={size} />,
    /* @ts-expect-error Server Component */
    UTA: <NBAIcons.UTA size={size} />,
    /* @ts-expect-error Server Component */
    WAS: <NBAIcons.WAS size={size} />,
  };

  return nbaTeams[TEAMABBRVMAP[team]];
};

export default NBALogo;
