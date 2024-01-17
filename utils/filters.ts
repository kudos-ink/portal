import {
  INTERESTS_OPTIONS,
  LANGUAGES_OPTIONS,
  REPOSITORIES_BY_INTERESTS,
} from "@/data/filters";

export const findInterestsByProject = (project: string) => {
  const matchingInterests = [];

  for (const interest in REPOSITORIES_BY_INTERESTS) {
    if (REPOSITORIES_BY_INTERESTS[interest].includes(project)) {
      const interestObject = INTERESTS_OPTIONS.find(
        ({ value }) => value === interest,
      );
      if (interestObject) {
        matchingInterests.push(interestObject);
      }
    }
  }

  return matchingInterests;
};

export const findLanguages = (languages: string[]) =>
  LANGUAGES_OPTIONS.filter(({ value }) => languages.includes(value));

// Fisher-Yates (or Knuth) shuffle algorithm
export const shuffleArray = <T>(array: T[]): T[] => {
  let currentIndex = array.length,
    randomIndex;

  // While there remain elements to shuffle.
  while (currentIndex !== 0) {
    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }

  return array;
};
