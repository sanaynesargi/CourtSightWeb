const formatHeight = (height: string) => {
  const splitHeght = height.split("-");

  return `${splitHeght[0]}'${splitHeght[1]}"`;
};

export default formatHeight;
