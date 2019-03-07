const randomLevel = arr => arr[Math.floor(Math.random() * arr.length)];

export const getLevel = () => {
  const gameLevel = [
    "easy",
    "medium",
    "hard",
    "very-hard",
    "insane",
    "inhuman"
  ];
  return randomLevel(gameLevel);
};
