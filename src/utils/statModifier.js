export const statModifier = level => {
  return (5 * level) / (100 + level) + 0.5;
};
