import { useEffect } from 'react';
import { Box, Grid, Skeleton, useMediaQuery } from '@mui/material';
import PropTypes from 'prop-types';
import Footer from './Footer';
import { useDispatch, useSelector } from 'react-redux';
import { fetchLogos, generalSettingsDetails } from '../redux/slice/initialSlice/InitialSlice';
import '../modules/login/styles.css';

const LoginContainer = ({ children }) => {
  const dispatch = useDispatch();
  const {
    logoDetails: { site_logo, login_front_page_image, login_front_right_page_image },
    generalSettingsData,
  } = useSelector((state) => state?.logoSlice);
  const isMobile = useMediaQuery('(max-width:768px)');
  //  return () => {
  //    window.removeEventListener("resize", updateHeights);
  //    window.removeEventListener("orientationchange", updateHeights);
  //  };
  // }, [viewportHeight, viewportWidth]);

  useEffect(() => {
    dispatch(fetchLogos());
  }, [dispatch]);

  useEffect(() => {
    const updateVh = () => {
      let vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty('--vh', `${vh}px`);
    };

    // Run on mount
    updateVh();

    // Debounced resize listener
    let timeout;
    const onResize = () => {
      clearTimeout(timeout);
      timeout = setTimeout(updateVh, 150); // Adjust delay if needed
    };

    window.addEventListener('resize', onResize);

    return () => {
      clearTimeout(timeout);
      window.removeEventListener('resize', onResize);
    };
  }, []);

  useEffect(() => {
    if (!generalSettingsData) {
      dispatch(generalSettingsDetails());
    }
  }, [dispatch, generalSettingsData]);

  const isLoading = !login_front_right_page_image || !login_front_page_image;
  const route = window.location.pathname;
  const specialRoutes = ['/set-mfa', '/eula', '/reset-password', '/recovery-codes', '/password'];

  return (
    <div
      className={
        specialRoutes.some((specialRoute) => route.includes(specialRoute)) && isMobile
          ? 'login-container-mfa'
          : 'login-container'
      }
    >
      <Grid container className="login-main-container" sx={{ alignItems: 'stretch !important' }}>
        <Grid item xs={12} md={5} className="first-cnt">
          <Box
            className="box"
            sx={{
              display: { xs: 'none', md: 'block' },
              height: '100%',
              width: '100%',
              img: {
                width: '100%',
                height: 'auto',
                objectFit: 'cover',
              },
            }}
          >
            {/* Display Skeleton if the front page image is loading */}
            {isLoading ? (
              <Skeleton variant="rectangular" width="100%" height="100%" animation="wave" />
            ) : (
              <div className="left-img-cnt">
                <div className="login-top-banner">
                  <img src={site_logo} alt="top-right" className="ltb-img" />
                </div>

                <div className="login-main-image">
                  <img src={login_front_page_image} alt="" className="lmi-img" />
                </div>
              </div>
            )}
          </Box>
        </Grid>
        <Grid
          className="Grid"
          item
          xs={12}
          md={7}
          sx={
            {
              // overflowY: { xs: 'unset', md: 'scroll' },
              // height: { xs: 'auto', md: 'calc(99vh - 100px)' },
              // maxHeight: `${containerHeight}px`,
              // height: `${itemHeight}px`,
              // Ensures it takes full viewport height
            }
          }
        >
          <div className="logo-cnt">
            <div className="login-logo">
              {login_front_right_page_image && (
                <img
                  src={login_front_right_page_image}
                  alt="assessforce-logo"
                  width="100%"
                  height="100%"
                  style={{ objectFit: 'contain' }}
                />
              )}
            </div>
          </div>
          <Box
            sx={
              {
                // minHeight: { xs: `${boxHeight}`, md: `${boxHeight}`}, // Dynamically calculated height
              }
            }
            className={
              specialRoutes.some((specialRoute) => route.includes(specialRoute))
                ? 'second-cnt second-cnt-mfa'
                : 'second-cnt'
            }
          >
            {children}
            <div className="flex-center" style={{ marginTop: 'auto' }}>
              <Footer generalSettingsData={generalSettingsData} />
            </div>
          </Box>
        </Grid>
      </Grid>
    </div>
  );
};

LoginContainer.propTypes = {
  children: PropTypes.node.isRequired,
};

export default LoginContainer;
