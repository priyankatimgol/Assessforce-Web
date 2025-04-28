import { useContext, useEffect, useMemo, useState } from 'react';
import { Avatar, Box, IconButton, Tooltip, Typography, useMediaQuery } from '@mui/material';
import DropdownMenu from '../mainComponents/DropdownMenu';
import { headerOptions, modalActions, profileOptions } from '../../utils/constants';
import HeaderDropdown from './HeaderDropdown';
import ResourceBooks from '../../assets/customSVGIcons/headers/ResourceBooks';
import ManageAccountsSVG from '../../assets/customSVGIcons/headers/ManageAccountsSVG';
import MenuIcon from '@mui/icons-material/Menu';
import MobileSidebarMenu from './MobileSidebarMenu';
//import SessionStorageHelper from '../../utils/SessionStorageHelper';
import { useSelector } from 'react-redux';
import AppLoader from '../AppLoader';
import useSessionStorage from '../useSessionStorage';
import { ThemeContext } from '../../context/ThemeContext';
import SearchInput from '../../assets/customSVGIcons/headers/SearchInput';
import HouseholdCard from './HouseholdCard';
import { useLocation } from 'react-router-dom';

const AppbarMenus = (drawerOpenStatus) => {
  const {
    logoDetails: { login_front_right_page_image },
  } = useSelector((state) => state?.logoSlice);
  const {roles, orgz_status} = useSelector((state) => state?.authenticationSlice?.user?.userData) || {};
  const { toggleTheme } = useContext(ThemeContext);

  const isMobile = useMediaQuery('(max-width:768px)');

  const [anchorEl, setAnchorEl] = useState(null);
  const [type, setType] = useState('');
  const [openMenu, setOpenMenu] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [sessionUserDetails] = useSessionStorage('user_details', {});
 
  // Inside AppbarMenus component
  const location = useLocation();
  const showSearchInput = location.pathname.includes("customer");
  const currentPath = location.pathname;
  const isHouseholdCard = currentPath.includes("manage-customers") && currentPath.includes("profile");

  const avatarColors = [
    '#AB47BC', //purple
    '#D81B60', //pink
    '#A84300', //amber
    '#1B7C95', //logocolor
    '#00796B', //teal
    '#33691E', //green
    '#5C6BC0', //indigo
    '#0277BD', //blue
  ];

  const [name, setName] = useState(null);
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    if (sessionUserDetails) {
      const details =
        `${sessionUserDetails.field_first_name || ''} ${sessionUserDetails.field_last_name || ''}`.trim();
      setName(details || null);
      setIsInitialized(true);
    }
  }, [sessionUserDetails]);

  // const name = `${sessionUserDetails?.field_first_name} ${sessionUserDetails?.field_last_name}`;

  const avatarColor = useMemo(() => {
    if (!name) return null;
    const initials =
      name && name.trim()
        ? name?.includes(' ')
          ? name?.split(' ')[0]?.charAt(0) + name?.split(' ')[1]?.charAt(0)
          : name?.length === 1
            ? name?.charAt(0) + 'X'
            : name?.charAt(0) + name?.charAt(1)
        : ', XX';
    function getInitialsMagicNumber(initials) {
      const numbers = initials
        ?.toLowerCase()
        ?.split('')
        ?.map((char) => char?.charCodeAt(0));
      const spice = numbers?.[0] < numbers?.[1] ? 0 : 1;
      return numbers?.reduce((acc, n) => acc + n) + spice;
    }

    const magicNumber = getInitialsMagicNumber(initials);
    const colorIndex = magicNumber % avatarColors.length;
    return avatarColors[colorIndex];
  }, [name]);

  const handleMenuOpen = (event, type) => {
    setAnchorEl(event.currentTarget);
    setType(type);
  };

  const renderAvatar = () => {
    if (!isInitialized) {
      return (
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            height: '100%',
            cursor: 'pointer',
            minWidth: '2rem', // Prevent shrinking
          }}
        ></Box>
      );
    }

    return (
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          height: '100%',
          cursor: 'pointer',
          minWidth: '2rem', // Prevent shrinking
        }}
        onClick={(e) => handleMenuOpen(e, 'profile')}
      >
        <Avatar
          sx={{
            width: '2rem',
            height: '2rem',
            textTransform: 'uppercase',
            fontSize: '.8rem',
            backgroundColor: avatarColor,
          }}
        >
          <Typography
            //component="text"
            sx={{
              fontSize: '.8rem',
              color: 'var(--pure-color)',
            }}
          >
            {name
              ? name?.includes(' ')
                ? name?.split(' ')[0].charAt(0) + name?.split(' ')[1].charAt(0)
                : name?.length === 1
                  ? name?.charAt(0) + 'X'
                  : name?.charAt(0) + name?.charAt(1)
              : 'XX'}
          </Typography>
        </Avatar>
      </Box>
    );
  };

  const handleDrawerOpen = () => {
    setOpenMenu(true);
  };

  const focusedBackground = type === 'manage' ? 'var(--dropdown_icon)' : 'transparent';

  return isLoading ? (
    <AppLoader />
  ) : (
    <div className="appbar-header">
      {isMobile && (
        <IconButton
          onClick={handleDrawerOpen}
          color="inherit"
          aria-label="open drawer"
          edge="start"
          sx={[
            {
              color: 'var(--primary-color)',
            },
          ]}
        >
          <MenuIcon />
        </IconButton>
      )}

      <div style={{ marginLeft: !drawerOpenStatus?.open && !isMobile && '65px' }}>
        {isHouseholdCard && <HouseholdCard />}
      </div>

      <div className="right-actions">
        {showSearchInput && <SearchInput />}
        <Tooltip title="Admin">
          <IconButton
            onClick={(e) => handleMenuOpen(e, 'manage')}
            className="appbar-menu-item"
            sx={{
              backgroundColor: focusedBackground,
              borderRadius: '50%',
              transition: 'background-color 0.3s ease',
              '&:hover': { backgroundColor: focusedBackground },
            }}
          >
            <ManageAccountsSVG
              type={type}
              sx={{ color: type === 'manage' ? 'var(--primary-color) !important' : '' }}
            />
          </IconButton>
        </Tooltip>
        <Tooltip title="Knowledge Base">
          {/* use toggleTheme() for dark theme */}
          <IconButton className="appbar-menu-item" onClick={toggleTheme}>
            <ResourceBooks />
          </IconButton>
        </Tooltip>
        <Tooltip title={'My Profile'}>
          <div className="header-avatar">{renderAvatar()} </div>
        </Tooltip>
        <DropdownMenu options={modalActions || []} onOptionSelect={() => { }} selectedOption={null} />
      </div>

      {anchorEl && (
        <HeaderDropdown
          anchorEl={anchorEl}
          setAnchorEl={setAnchorEl}
          options={type === 'manage' ? headerOptions(roles, orgz_status) : profileOptions}
          type={type}
          setType={setType}
          renderAvatar={renderAvatar}
          userDetails={sessionUserDetails}
          setIsLoading={setIsLoading}
        />
      )}

      {openMenu && (
        <MobileSidebarMenu
          open={openMenu}
          setOpen={setOpenMenu}
          assessforceLogo={login_front_right_page_image}
        />
      )}
    </div>
  );
};

export default AppbarMenus;
