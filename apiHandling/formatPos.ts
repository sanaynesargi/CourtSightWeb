const formatPos = (position: string) => {
  const splitPos = position.split("-");

  if (splitPos.length == 1) {
    return position[0];
  } else {
    return `${splitPos[0][0]}-${splitPos[1][0]}`;
  }
};

export default formatPos;
