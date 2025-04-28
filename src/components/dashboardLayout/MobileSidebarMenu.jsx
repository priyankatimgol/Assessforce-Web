import { useEffect } from 'react';
import { Divider, Drawer, Grid, IconButton, Tooltip } from '@mui/material';
import PropTypes from 'prop-types';
import ClearRoundedIcon from '@mui/icons-material/ClearRounded';

const MobileSidebarMenu = ({ open, setOpen, assessforceLogo }) => {
  useEffect(() => {
    return () => {
      setOpen(false);
    };
  }, [setOpen]);

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Drawer
      anchor="left"
      open={open}
      onClose={handleClose}
      className="mobile-sidebar"
      sx={{
        '& .MuiDrawer-paper': {
          width: '60%',
          padding: '1rem',
          overflowX: 'hidden',
          bgcolor: 'background.default',
          borderBottom: '1px solid #0000001f',
        },
      }}
    >
      <Grid container spacing={2}>
        <Grid item xs={12} className="mobile-header">
          <div>
            <img
              src={assessforceLogo}
              alt="assessforce-logo"
              width="100%"
              height="100%"
              style={{ objectFit: 'contain' }}
            />
          </div>
          <Tooltip title="Close">
            <IconButton
              aria-haspopup="true"
              onClick={() => {
                setOpen(!open);
              }}
            >
              <ClearRoundedIcon className="hover-icon pointer" />
            </IconButton>
          </Tooltip>
        </Grid>
      </Grid>
      <Divider className="line" />
    </Drawer>
  );
};

MobileSidebarMenu.propTypes = {
  open: PropTypes.bool,
  setOpen: PropTypes.func,
  assessforceLogo: PropTypes.any,
};

export default MobileSidebarMenu;
