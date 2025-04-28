import { useEffect, useRef, useState } from 'react';
import { IconButton, Typography } from '@mui/material';
import Grid from '@mui/material/Grid2';
import CustomOutlinedInput from '../../../components/CustomOutlinedInput';
import CustomButton from '../../../components/CustomButton';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { resetMFADetails } from '../../../redux/slice/mfa/MfaSlice';
import clock from '../../../assets/images/clock.svg';
import LocalStorageHelper from '../../../utils/LocalStorageHelper';
import BackArrowSVG from '../../../assets/customSVGIcons/BackArrowSVG';

const ResetMultifactorAuthentication = ({
  setSelectedScreen,
  timeLeft,
  handleBackClick,
  resetMFALoader,
  setIsVerifyClicked,
  selectedScreen,
  resetMFACodes,
}) => {
  const dispatch = useDispatch();
  const inputRef = useRef(null);
  const [authCode, setAuthCode] = useState('');
  const [invalidCode, setInvalidCode] = useState(false);

  useEffect(() => {
    return () => {
      setAuthCode('');
      setInvalidCode(false);
    };
  }, []);

  useEffect(() => {
    if (inputRef?.current) {
      inputRef?.current?.focus();
    }
  }, [selectedScreen]);

  const handleVerifyCode = () => {
    if (!authCode) return;

    setIsVerifyClicked(true);
    dispatch(
      resetMFADetails({
        recoverycode: authCode.split(' ').join(''),
      })
    )
      .unwrap()
      .then((mfaResponse) => {
        if (mfaResponse?.status === 'success') {
          if (mfaResponse && mfaResponse?.token) {
            LocalStorageHelper.removeToken();
            LocalStorageHelper.setToken(mfaResponse.token);
          }
        } else {
          setInvalidCode(true);
        }
      });
  };

  const handleEnter = (event) => {
    if (event.key === 'Enter') {
      handleVerifyCode();
    }
  };

  return (
    <Grid size={{ xs: 12, md: 12 }} className="existing-auth">
      <div className="flex-between mb-05rem">
        <IconButton
          onClick={() => handleBackClick(true)}
          style={{
            //color: '#2695cb', // Set the icon color
            marginLeft: '-5px',
            padding: '5px'
          }}
        >
          <BackArrowSVG
            sx={{
              color: 'var(--primary-color)'
            }}
          />
        </IconButton>
        <Typography variant="body2" className="will-expire">
          This page will expire in{' '}
          <>
            <img src={clock} alt="clock-icon" />
          </>
          <span className="will-expire-time">
            {Math.floor(timeLeft / 60)
              .toString()
              .padStart(2, '0')}
            :{(timeLeft % 60).toString().padStart(2, '0')}
          </span>
        </Typography>
      </div>

      <Typography variant="h4" component="h1" className="login-head-label mb-04rem">
        Reset Multi-Factor Authentication
      </Typography>

      <Typography variant="body1" className="sub-title">
        Enter a recovery code provided during setup of multi-factor authentication.
      </Typography>

      <Grid container size={{ xs: 12 }}>
        <Grid size={{ xs: 12}}>
          <CustomOutlinedInput
            inputRef={inputRef}
            placeholder="Enter recovery code"
            size="small"
            value={authCode.split(' ').join('').replace(/\D/g, '')}
            onChange={(e) => setAuthCode(e.target.value)}
            onKeyDown={handleEnter}
            // allowPaste={false}
            inputProps={{
              maxLength: 8,
              inputMode: 'numeric',
              style: {
                padding: '0.75rem 0.875rem',
                height: '1.5rem',
              },
            }}
            style={{ marginBottom: '-0.25rem' }}
            isError={invalidCode && resetMFACodes?.status === 'error'}
            isErrorIcon={false}
          />
          <Typography
            sx={{
              fontFamily: 'inter-medium',
              marginBottom: '1.875rem',
              color: 'var(--primary-color)',
            }}
            variant="body2"
            className="use-recovery-code"
            onClick={() => setSelectedScreen('old')}
          >
            Use authentication code
          </Typography>

          <CustomButton onClick={handleVerifyCode} disabled={authCode?.length <= 7} loader={resetMFALoader}>
            Verify
          </CustomButton>
        </Grid>
      </Grid>
    </Grid>
  );
};

ResetMultifactorAuthentication.propTypes = {
  setSelectedScreen: PropTypes.func.isRequired,
  timeLeft: PropTypes.number.isRequired,
  handleBackClick: PropTypes.func.isRequired,
  resetMFALoader: PropTypes.bool,
  setIsVerifyClicked: PropTypes.func.isRequired,
  selectedScreen: PropTypes.string,
  resetMFACodes: PropTypes.any,
};

export default ResetMultifactorAuthentication;
