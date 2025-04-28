import { useEffect, createElement } from 'react';
import { CircularProgress, Divider, Drawer, IconButton, Tooltip, Typography } from '@mui/material';
import PropTypes from 'prop-types';
import CustomButton from '../CustomButton';
import { useDispatch } from 'react-redux';
import { clearEditedData } from '../../redux/slice/manageAccounts/ManageAccountsSlice';
import ClearRoundedIcon from '@mui/icons-material/ClearRounded';
import Grid from '@mui/material/Grid2';

const ASDrawer = ({
  children,
  open,
  setOpen,
  headerImage,
  action,
  onSubmit,
  headerName,
  showFooter = true,
  leftIcons,
  rightIcons,
  loader,
  mainLoader,
  width = '51.25rem',
  actionButton,
}) => {
  const dispatch = useDispatch();

  // useEffect(() => {
  //   return () => {
  //     setOpen(false);
  //   };
  // }, []);

  const handleClose = () => {
    setOpen(false);
    dispatch(clearEditedData());
  };

  return (
    <Drawer
      anchor="right"
      open={open}
      className="droweInput"
      onClose={handleClose}
      sx={{
        '& .MuiDrawer-paper': {
          width: { xs: '100%', sm: '80%', md: width, lg: width },
          // width: { xs: '100%', sm: '80%', md: '50rem', lg: width },
          zIndex: 1301,
          padding: { xs: '1.25rem', sm: '1.25rem', md: '1.25rem 2.5rem' },
          // paddingTop: { xs: '2rem', sm: '2rem' },
          overflowX: { xs: 'hidden', md: 'none' },
          bgcolor: 'drawer.main'
        },
        '& .MuiModal-backdrop': {
          backgroundColor: 'var(--drawer-overlay-bg) !important', // Chage backdrop in drawer.
        }
      }}
    >
      {mainLoader ? (
        <Grid
          size={{ xs: 12 }}
          display="flex"
          justifyContent="center"
          alignItems="center"
          style={{ height: '100%' }}
        >
          <CircularProgress />
        </Grid>
      ) : (
        <Grid container spacing={2} className="drowerBorder">
          {/* Header with Image and Title */}
          <Grid size={{ xs: 12 }} className="add-user-drawer-header">
            <div className="drawer-header-section">
              <div className="drawer-header-section-responsive-no">
                <div style={{ display: 'flex' }}>
                  <div style={{ marginRight: '0.625rem', marginTop: '0.4rem' }}>
                    {typeof headerImage === 'string' ? (
                      <img src={headerImage} alt="" />
                    ) : (
                      createElement(headerImage)
                    )}
                  </div>
                  <Typography component="h2" variant="h6" fontFamily="inter-semibold" fontSize="1.5rem">
                    {headerName}
                  </Typography>
                </div>

                {leftIcons && <div className="responsive">{leftIcons}</div>}
              </div>
              <div className="items-center">
                {rightIcons && (
                  <div className="flex" style={{ color: 'var(--text-secondary-color)' }}>
                    {rightIcons}
                  </div>
                )}
                <Tooltip title="Close">
                  <IconButton
                    aria-haspopup="true"
                    onClick={() => {
                      setOpen(!open);
                      dispatch(clearEditedData());
                    }}
                  >
                    <ClearRoundedIcon className="hover-icon pointer" />
                  </IconButton>
                </Tooltip>
              </div>
            </div>
            <Grid item size={{ xs: 12 }}>
              <Divider
                sx={{
                  mx: { xs: '-1.25rem', md: '-2.5rem' }, // Matches your drawer padding
                  my: '15px'
                }}
              />
            </Grid>
            {children}
            {(showFooter) && (
              <Grid
                size={{ xs: 12, md: 12 }}
                display="flex"
                alignItems="center"
                gap={2}
                className="drawer-footer-buttons"
              >
                <Grid size={{ xs: 6, sm: 6 }}>
                  <CustomButton
                    onClick={() => {
                      setOpen(false);
                      dispatch(clearEditedData());
                    }}
                    type="outlined"
                    style={{ height: '2.5rem' }}
                  >
                    Cancel
                  </CustomButton>
                </Grid>
                <Grid size={{ xs: 6, md: 6 }}>
                  <CustomButton onClick={() => onSubmit()} loader={loader} style={{ height: '2.5rem' }}>
                    {actionButton ? actionButton :
                      action === 'Edit' ? 'Update' : action === 'ReqEdits' ? 'Submit' : 'Create'
                    }
                  </CustomButton>
                </Grid>
              </Grid>
            )}

          </Grid>
        </Grid>
      )}
    </Drawer>
  );
};

ASDrawer.propTypes = {
  children: PropTypes.node,
  open: PropTypes.bool,
  setOpen: PropTypes.func,
  headerImage: PropTypes.string | PropTypes.node,
  action: PropTypes.string,
  onSubmit: PropTypes.func,
  headerName: PropTypes.string,
  showFooter: PropTypes.bool,
  leftIcons: PropTypes.node,
  rightIcons: PropTypes.node,
  loader: PropTypes.bool,
  mainLoader: PropTypes.bool,
  width: PropTypes.string,
};

export default ASDrawer;
