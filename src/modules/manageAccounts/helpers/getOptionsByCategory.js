export const getOptionsByCategory = (options, category) => {
  if (!options?.[category]) return [];
  return Object.entries(options[category]).map(([value, label]) => ({ label, value }));
};

export const convertParentOptions = (options) => {
  return Object.entries(options).map(([value, label]) => ({
    label: label,
    value: value,
  }));
};
