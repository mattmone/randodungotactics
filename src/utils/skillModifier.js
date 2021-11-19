export const skillModifier = skillLevel => {
  return (5 * skillLevel) / (150 + skillLevel) + 0.5;
};
