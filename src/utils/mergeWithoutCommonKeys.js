export default function mergeWithoutCommonKeys(obj1, obj2) {
  const result = { ...obj2 };

  Object.keys(obj2).forEach((key) => {
    if (!(key in obj1 && obj1[key] === obj2[key])) {
      result[key] = obj2[key]; // Keep only unique key-value pairs
    }
  });

  return result;
}
