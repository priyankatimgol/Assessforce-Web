import { useState, useEffect, useCallback } from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import CssBaseline from '@mui/material/CssBaseline';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { useMediaQuery } from '@mui/material';

import SubmenuDrawer from './SubmenuDrawer';
import MainMenuDrawer from './MainMenuDrawer';
import '../../styles/manageUsers.styles.css';
import AppbarMenus from './AppbarMenus';
import SessionStorageHelper from '../../utils/SessionStorageHelper';

const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  variants: [
    {
      props: ({ open }) => open,
      style: {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.enteringScreen,
        }),
      },
    },
  ],
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(({ theme }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: 'nowrap',
  boxSizing: 'border-box',
  '& .MuiDrawer-paper': {
    backgroundColor: theme.palette.background.main,
  },
  variants: [
    {
      props: ({ open }) => open,
      style: {
        ...openedMixin(theme),
        '& .MuiDrawer-paper': openedMixin(theme),
      },
    },
    {
      props: ({ open }) => !open,
      style: {
        ...closedMixin(theme),
        '& .MuiDrawer-paper': closedMixin(theme),
      },
    },
  ],
}));

const DashboardLayoutContainer = ({ navigationItems, children }) => {
  const theme = useTheme();
  const {
    logoDetails: { site_logo, login_front_right_page_image },
  } = useSelector((state) => state?.logoSlice);
  const { currentEnv } = useSelector((state) => state?.authenticationSlice);

  const [open, setOpen] = useState(true);
  const [hoveredItem, setHoveredItem] = useState(null);
  const [isSubmenuOpen, setSubmenuOpen] = useState(false);
  const isMobile = useMediaQuery('(max-width:768px)');
  const sessionUserDetails = SessionStorageHelper?.getUserDetails();

  // const handleDrawerOpen = () => {
  //   setOpen(!open);
  // };

  useEffect(() => {
    if (isMobile) {
      setOpen(false);
    } else {
      setOpen(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isMobile]);

  const handleDrawerClose = () => {
    setOpen(!open);
  };

  const handleItemMouseEnter = (item) => {
    if (!open) return;

    setHoveredItem(item);
    if (item?.childrens && item.childrens.length > 0) {
      setSubmenuOpen(true);
    }
  };

  const fetchAppbarMenus = useCallback((open) => {
    return <AppbarMenus open={open} />;
  }, [sessionUserDetails]);

  const handleItemMouseLeave = () => {
    setTimeout(() => {
      if (!isSubmenuOpen) {
        setHoveredItem(null);
      }
    }, 200);
  };

  const handleSubmenuMouseEnter = () => {
    setSubmenuOpen(true);
  };

  const handleSubmenuMouseLeave = () => {
    setSubmenuOpen(false);
    setHoveredItem(null);
  };

  return (
    <Box
      sx={{
        display: 'flex',
        zIndex: 10,
        overflowX: { xs: 'hidden', sm: 'hidden' },
      }}
    >
      <CssBaseline />
      <AppBar
        position="fixed"
        open={open && !isMobile}
        sx={{
          background: theme => `${theme.palette.background.main}`,
          boxShadow: 'none',
          height: 'fit-content',
          zIndex: 100,
          borderBottom: theme => `1px solid ${theme.palette.primary.border}`,
        }}
      >
        <Toolbar style={{ padding: isMobile && '0 20px' }}>
          {/* <AppbarMenus userData={user?.userData} /> */}
          {fetchAppbarMenus(open)}
        </Toolbar>
      </AppBar>

      {!isMobile && (
        <>
          {/* Main Menu Drawer */}
          <MainMenuDrawer
            {...{
              DrawerHeader,
              navigationItems,
              handleItemMouseEnter,
              handleItemMouseLeave,
              handleDrawerClose,
              theme,
              site_logo,
              Drawer,
              open,
              currentEnv,
              login_front_right_page_image,
            }}
          />

          {/* Submenu Drawer */}
          <SubmenuDrawer
            {...{
              hoveredItem,
              theme,
              drawerWidth,
              isSubmenuOpen,
              handleSubmenuMouseEnter,
              handleSubmenuMouseLeave,
            }}
          />
        </>
      )}

      {/* Main Content */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: isMobile ? '1.25rem' : 3,
          // height: '100vh',
          overflowY: 'auto',
        }}
      >
        <DrawerHeader />
        {children}
      </Box>
    </Box>
  );
};

DashboardLayoutContainer.propTypes = {
  navigationItems: PropTypes.arrayOf(PropTypes.object).isRequired,
  children: PropTypes.node.isRequired,
};

export default DashboardLayoutContainer;
