import ALLPLAYERS from "./players";

const findOverlap = (a: string, b: string) => {
  if (b.length === 0) {
    return "";
  }

  if (a.endsWith(b)) {
    return b;
  }

  if (a.indexOf(b) >= 0) {
    return b;
  }

  return findOverlap(a, b.substring(0, b.length - 1));
};

const filterSuggestions = (query: string) => {
  if (query.length == 0) {
    return [];
  }

  for (let i = 0; i < ALLPLAYERS.length; i++) {
    let player = ALLPLAYERS[i];
    let fullName = player.firstName + " " + player.lastName;
    let overlap = findOverlap(query, fullName);

    ALLPLAYERS[i]["fullname"] = fullName;
    ALLPLAYERS[i]["similarity"] = overlap.length;
  }

  ALLPLAYERS.sort((a, b) => (a["similarity"] > b["similarity"] ? -1 : 1));

  let suggestions = [];
  let suggestionCount = 5;

  for (let i = 0; i < suggestionCount; i++) {
    suggestions.push(ALLPLAYERS[i]["fullname"]);
  }

  return suggestions;
};

export default filterSuggestions;
