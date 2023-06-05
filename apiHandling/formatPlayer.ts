const formatPlayer = (player: string) => {
  let p = player.split(" ").join("|");
  console.log(p);
  return p;
};

export default formatPlayer;
