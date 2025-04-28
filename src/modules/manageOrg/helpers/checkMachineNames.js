const checkMachineNames = (arrayOfObjects, objectToCheck) => {
  if (!Array.isArray(arrayOfObjects) || typeof objectToCheck !== 'object' || objectToCheck === null) {
    return false;
  }

  const machineNameSet = new Set(arrayOfObjects.map((obj) => obj.machine_name));
  return Object.keys(objectToCheck).some((key) => machineNameSet.has(key));
};

export default checkMachineNames;
