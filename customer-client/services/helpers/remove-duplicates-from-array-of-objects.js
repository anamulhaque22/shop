function removeDuplicatesFromArrayObjects(array, key) {
  const lookup = new Set();

  return array.filter((value) => {
    // Ensure value exists and has the specified key
    if (value && value[key] !== undefined) {
      if (!lookup.has(value[key])) {
        lookup.add(value[key]);
        return true;
      }
    }
    return false;
  });
}

export default removeDuplicatesFromArrayObjects;
