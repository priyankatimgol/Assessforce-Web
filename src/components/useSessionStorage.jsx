import { useState, useEffect } from 'react';

const useSessionStorage = (key, initialValue) => {
  // Initialize state with the value from sessionStorage
  const [value, setValue] = useState(() => {
    try {
      const storedValue = sessionStorage.getItem(key);
      return storedValue ? JSON.parse(storedValue) : initialValue;
    } catch (error) {
      console.error(`Error reading from sessionStorage for key "${key}":`, error);
      return initialValue;
    }
  });

  // Update sessionStorage when the state changes
  useEffect(() => {
    try {
      sessionStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error(`Error writing to sessionStorage for key "${key}":`, error);
    }
  }, [key, value]);

  // Listen for changes to sessionStorage in other tabs/windows
  useEffect(() => {
    const handleStorageChange = (event) => {
      if (event.key === key) {
        setValue(JSON.parse(event.newValue));
      }
    };

    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, [key]);

  // Manually trigger a state update in the same tab
  const setSessionStorageValue = (newValue) => {
    sessionStorage.setItem(key, JSON.stringify(newValue));
    setValue(newValue);
    // Dispatch a custom event to notify other tabs/windows
    window.dispatchEvent(new StorageEvent('storage', { key, newValue: JSON.stringify(newValue) }));
  };

  return [value, setSessionStorageValue];
};

export default useSessionStorage;
