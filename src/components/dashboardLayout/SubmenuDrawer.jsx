import { useState, useRef } from 'react';
import { Box, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import PropTypes from 'prop-types';

const SubmenuDrawer = ({
  hoveredItem,
  theme,
  drawerWidth,
  isSubmenuOpen,
  handleSubmenuMouseEnter,
  handleSubmenuMouseLeave,
}) => {
  const [hoveredSubmenuItem, setHoveredSubmenuItem] = useState(null);
  const [isSecondSubmenuOpen, setSecondSubmenuOpen] = useState(false);
  const submenuTimeout = useRef(null);
  const secondSubmenuTimeout = useRef(null);

  // Handle first-level submenu hover
  const handleSubmenuItemMouseEnter = (submenuItem) => {
    clearTimeout(submenuTimeout.current);
    setHoveredSubmenuItem(submenuItem);
    if (submenuItem?.childrens && submenuItem.childrens.length > 0) {
      setSecondSubmenuOpen(true);
    }
  };

  const handleSubmenuItemMouseLeave = () => {
    submenuTimeout.current = setTimeout(() => {
      if (!isSecondSubmenuOpen) {
        setHoveredSubmenuItem(null);
      }
    }, 200);
  };

  // Handle second-level submenu hover
  const handleSecondSubmenuMouseEnter = () => {
    clearTimeout(submenuTimeout.current);
    clearTimeout(secondSubmenuTimeout.current);
    setSecondSubmenuOpen(true);
  };

  const handleSecondSubmenuMouseLeave = () => {
    secondSubmenuTimeout.current = setTimeout(() => {
      setSecondSubmenuOpen(false);
      setHoveredSubmenuItem(null);
    }, 200);
  };

  return (
    <>
      {/* First-level Submenu */}
      {hoveredItem?.childrens && hoveredItem?.childrens.length > 0 && isSubmenuOpen && (
        <Box
          onMouseEnter={handleSubmenuMouseEnter}
          onMouseLeave={handleSubmenuMouseLeave}
          sx={{
            position: 'fixed',
            top: theme.mixins.toolbar.minHeight,
            left: drawerWidth,
            height: '100vh',
            width: drawerWidth,
            backgroundColor: theme.palette.background.paper,
            zIndex: theme.zIndex.drawer + 1,
            boxShadow: theme.shadows[5],
          }}
        >
          <List>
            {hoveredItem.childrens.map((child) => (
              <ListItem
                key={child.text}
                disablePadding
                sx={{ display: 'block' }}
                onMouseEnter={() => handleSubmenuItemMouseEnter(child)}
                onMouseLeave={handleSubmenuItemMouseLeave}
              >
                <ListItemButton sx={{ justifyContent: 'initial' }}>
                  <ListItemIcon sx={{ minWidth: 0, mr: 3 }}>{child.icon}</ListItemIcon>
                  <ListItemText primary={child.text} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Box>
      )}

      {/* Second-level Submenu */}
      {hoveredSubmenuItem?.childrens && hoveredSubmenuItem.childrens.length > 0 && isSecondSubmenuOpen && (
        <Box
          onMouseEnter={handleSecondSubmenuMouseEnter}
          onMouseLeave={handleSecondSubmenuMouseLeave}
          sx={{
            position: 'fixed',
            top: theme.mixins.toolbar.minHeight,
            left: drawerWidth * 2, // Position next to the first-level menu
            height: '100vh',
            width: drawerWidth,
            backgroundColor: theme.palette.background.paper,
            zIndex: theme.zIndex.drawer + 2, // Ensure it's above the first-level menu
            boxShadow: theme.shadows[5],
          }}
        >
          <List>
            {hoveredSubmenuItem.childrens.map((child) => (
              <ListItem key={child.text} disablePadding sx={{ display: 'block' }}>
                <ListItemButton sx={{ justifyContent: 'initial' }}>
                  <ListItemIcon sx={{ minWidth: 0, mr: 3 }}>{child.icon}</ListItemIcon>
                  <ListItemText primary={child.text} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Box>
      )}
    </>
  );
};

SubmenuDrawer.propTypes = {
  hoveredItem: PropTypes.object,
  theme: PropTypes.object.isRequired,
  drawerWidth: PropTypes.number.isRequired,
  isSubmenuOpen: PropTypes.bool.isRequired,
  handleSubmenuMouseEnter: PropTypes.func.isRequired,
  handleSubmenuMouseLeave: PropTypes.func.isRequired,
};

export default SubmenuDrawer;
