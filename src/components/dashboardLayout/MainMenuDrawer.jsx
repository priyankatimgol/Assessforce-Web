import { Fragment } from 'react';
import {
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from '@mui/material';
import PropTypes from 'prop-types';
import MenuIcon from '@mui/icons-material/Menu';

const MainMenuDrawer = ({
  DrawerHeader,
  navigationItems,
  handleItemMouseEnter,
  handleItemMouseLeave,
  handleDrawerClose,
  Drawer,
  open,
  login_front_right_page_image,
}) => {
  return (
    <Drawer variant="permanent" open={open}>
      <DrawerHeader>
        <div className="appbar-drawer-header">
          <IconButton
            onClick={handleDrawerClose}
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
          {open && (
            <div
              style={{
                marginLeft: '14px',
                display: 'flex',
                justifyContent: 'center',
                alignContent: 'center',
              }}
            >
              <img
                src={login_front_right_page_image}
                alt="assessforce-logo"
                width="100%"
                height="100%"
                style={{ objectFit: 'contain' }}
              />
            </div>
          )}
        </div>
      </DrawerHeader>
      {/* <Divider /> */}

      <List>
        {navigationItems?.map((item) => (
          <Fragment key={item?.text}>
            <ListItem
              disablePadding
              sx={{ display: 'block' }}
              onMouseEnter={() => handleItemMouseEnter(item)}
              onMouseLeave={handleItemMouseLeave}
              className="appbar-lm-item"
            >
              <ListItemButton
                sx={[
                  {
                    minHeight: 48,
                    px: 2.5,
                  },
                  open ? { justifyContent: 'initial' } : { justifyContent: 'center' },
                ]}
              >
                <ListItemIcon
                  sx={[{ minWidth: 0, justifyContent: 'center' }, open ? { mr: 3 } : { mr: 'auto' }]}
                >
                  {item?.icon}
                </ListItemIcon>
                <ListItemText
                  primary={
                    <Typography
                      sx={[open ? { opacity: 1, textWrap: 'wrap' } : { opacity: 0 }]}
                      className="appbar-lm-text"
                    >
                      {item?.text}
                    </Typography>
                  }
                  className="appbar-lm-text"
                />
              </ListItemButton>
            </ListItem>

            {item?.isDivider && <Divider />}
          </Fragment>
        ))}
      </List>
    </Drawer>
  );
};

MainMenuDrawer.propTypes = {
  DrawerHeader: PropTypes.any,
  navigationItems: PropTypes.arrayOf(PropTypes.object).isRequired,
  handleItemMouseEnter: PropTypes.func.isRequired,
  handleItemMouseLeave: PropTypes.func.isRequired,
  handleDrawerClose: PropTypes.func.isRequired,
  theme: PropTypes.object.isRequired,
  site_logo: PropTypes.string.isRequired,
  Drawer: PropTypes.any,
  open: PropTypes.bool.isRequired,
  currentEnv: PropTypes.object,
  login_front_right_page_image: PropTypes.string,
};

export default MainMenuDrawer;
