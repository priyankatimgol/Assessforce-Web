import { Box, Typography } from '@mui/material';
import Grid from '@mui/material/Grid2';
import { useEffect, useRef, useState } from 'react';
import CustomButton from '../../../components/CustomButton';
import LoginContainer from '../../../components/LoginContainer';
import { useNavigate } from 'react-router-dom';
import '../styles.css';
import { useDispatch, useSelector } from 'react-redux';
import { fetchEulaDetails, verifyEulaDetails } from '../../../redux/slice/eula/EulaSlice';
import { clearMfa } from '../../../redux/slice/mfa/MfaSlice';
import { DASHBOARD, SIGN_IN } from '../../../utils/enums/RoutesEnums';
import { handleChangeEulaStatus, handleLogoutUser, resetMfaSetup } from '../../../redux/slice/authSlice/Authentication';
import { cancelEventualRequest } from '../../../redux/slice/initialSlice/InitialSlice';
import LocalStorageHelper from '../../../utils/LocalStorageHelper';
import { useSnackbar } from '../../../context/SnackbarContext';
import CKEditorContent from '../../../components/CKEditorContent';

const LicenseAggrement = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const contentRef = useRef(null);
  const { showSnackbar } = useSnackbar();
  const { eulaDetails } = useSelector((state) => state.eulaSlice);
  const { user } = useSelector((state) => state.authenticationSlice);
  const [isScrolledToBottom, setIsScrolledToBottom] = useState(false);

  useEffect(() => {
    dispatch(fetchEulaDetails());
  }, []);

  const handleBackButton = () => {
    dispatch(resetMfaSetup());
    dispatch(clearMfa());

    const logout_token = LocalStorageHelper.getLogoutToken();
    const payload = { _format: 'json', token: logout_token, logout_status: 0 }; // Handeled to not log event added logout_status 0
    dispatch(
      cancelEventualRequest({
        eula_disagress_log: 1,
        uid: user?.userData?.uid,
      })
    )
      .unwrap()
      .then((response) => {
        showSnackbar({
          message: response?.message,
          severity: 'error',
          persist: true,
        });
      });

    dispatch(handleLogoutUser({ payload }))
      .unwrap()
      .then((data) => {
        if (data) {
          navigate(SIGN_IN);
          dispatch({ type: 'LOGOUT' });
        }
      });
  };

  const handleAgreeEula = () => {
    dispatch(verifyEulaDetails({ eula: 1 }))
      .unwrap()
      .then((response) => {
        if (response?.status === 200 || response?.status === 'success') {
          dispatch(handleChangeEulaStatus());
          sessionStorage.setItem('from_eula', true);
          navigate(DASHBOARD);
        }
      });
  };

  useEffect(() => {
    const handleScroll = () => {
      const content = contentRef.current;
      if (content) {
        const isBottom = content.scrollTop + content.clientHeight >= content.scrollHeight - 5;
        if (isBottom) {
          setIsScrolledToBottom(true);
        }
      }
    };

    const content = contentRef.current;
    if (content) {
      content.addEventListener('scroll', handleScroll);
    }

    return () => content?.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <LoginContainer>
      <Box>
        <Typography variant="h1" className="login-head-label mb-06rem">
          {eulaDetails?.title_of_eula}
        </Typography>

        {/* <Typography variant="body1" className="sub-title">
          Please read this agreement carefully before using this software.
        </Typography> */}

        <Grid container size={{ xs: 12 }} marginTop={'1.6rem'}>
          <Grid
            size={{ xs: 12 }}
            ref={contentRef}
            sx={{
              overflow: 'auto',
              height: 'calc(100vh - 24.063rem)',
              overflowX: 'hidden',
              borderRadius: '10px',
              marginBottom: '2rem',
              backgroundColor: 'var(--highlighted-color)',
              padding: '0.313rem 0.938rem',
            }}
          >
            <CKEditorContent
              html={eulaDetails?.eula_content}
              // Optional additional styling if needed
              sx={{
                marginTop: '0.625rem',
                color: 'text.primary',
              }}
            />
          </Grid>

          <Grid container size={{ xs: 12 }} spacing={2} justifyContent="center">
            <Grid size={{ xs: 6 }}>
              <CustomButton type="outlined" onClick={handleBackButton} disabled={!isScrolledToBottom}>
                I Disagree
              </CustomButton>
            </Grid>
            <Grid size={{ xs: 6 }}>
              <CustomButton type="contained" onClick={handleAgreeEula} disabled={!isScrolledToBottom}>
                I Agree
              </CustomButton>
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </LoginContainer>
  );
};

export default LicenseAggrement;
