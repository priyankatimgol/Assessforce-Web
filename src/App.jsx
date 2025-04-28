import { useEffect } from 'react';
import './App.css';
import RootRoutes from './routes';
import { useSelector } from 'react-redux';
import { LicenseInfo } from '@mui/x-license';
import dayjs from 'dayjs';

import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import { BrowserRouter as Router } from 'react-router-dom';
import { SnackbarProvider } from './context/SnackbarContext';
import GlobalSnackbar from './components/GlobalSnackbar';

// Extend dayjs with the plugins
dayjs.extend(utc);
dayjs.extend(timezone);

LicenseInfo.setLicenseKey(
  '9f740d03b5d1e70a3e057b75ad5d5122Tz0xMDE5OTUsRT0xNzYzNTY4ODU1MDAwLFM9cHJvLExNPXN1YnNjcmlwdGlvbixQVj1RMy0yMDI0LEtWPTI='
);

function App() {
  const {
    logoDetails: { website_favicon_image },
  } = useSelector((state) => state?.logoSlice);

  // Set dynamically favicon
  useEffect(() => {
    const link = document.querySelector("link[rel~='icon']");
    if (link) {
      link.href = website_favicon_image;
    }
  }, []);

  return (
    <Router>
      <SnackbarProvider>
        <GlobalSnackbar />
        <RootRoutes />
      </SnackbarProvider>
    </Router>
  );
}

export default App;
