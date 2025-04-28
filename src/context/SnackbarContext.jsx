import React, { createContext, useContext, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

const SnackbarContext = createContext();

export const useSnackbar = () => {
  return useContext(SnackbarContext);
};

export const SnackbarProvider = ({ children }) => {
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'info',
    persist: false,
  });

  const location = useLocation();

  const showSnackbar = ({ message, severity = 'info', persist = false }) => {
    setSnackbar({
      open: true,
      message,
      severity,
      persist,
    });
  };

  const hideSnackbar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackbar((prev) => ({
      ...prev, // Preserve all previous state
      open: false, // Only change the open state
    }));
  };

  // Clear snackbar on route change unless persist is true.
  useEffect(() => {
    if (!snackbar.persist) {
      setSnackbar((prev) => ({
        ...prev,
        open: false,
      }));
    }
  }, [location]);

  // To reset the persist on path changes (persist: false).
  useEffect(() => {
    return () => {
      setSnackbar((prev) => ({
        ...prev,
        persist: false,
      }));
    };
  }, [location.pathname]);

  return (
    <SnackbarContext.Provider value={{ snackbar, showSnackbar, hideSnackbar }}>
      {children}
    </SnackbarContext.Provider>
  );
};
