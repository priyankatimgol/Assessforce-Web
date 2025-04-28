import { Box, IconButton, Typography } from '@mui/material';
import '../login/styles.css';
import { useNavigate } from 'react-router-dom';
import CustomButton from '../../components/CustomButton';
import CustomOutlinedInput from '../../components/CustomOutlinedInput';
import LoginContainer from '../../components/LoginContainer';
import { SIGN_IN } from '../../utils/enums/RoutesEnums';
import BackArrowSVG from '../../assets/customSVGIcons/BackArrowSVG';

const ResetPassword = () => {
  const navigate = useNavigate();

  return (
    <LoginContainer>
      <Box>
        <IconButton
          onClick={() => navigate(SIGN_IN)}
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
        <Typography variant="h4" sx={{ py: 1 }}>
          Forgot Password
        </Typography>
        <Typography variant="body1" sx={{ mb: 4 }}>
          Reset your password with password reset link from your email.
        </Typography>
        <CustomOutlinedInput label="Email" placeholder="example@email.com" />
        <CustomButton onClick={() => {}}>Reset Password</CustomButton>
      </Box>
    </LoginContainer>
  );
};

export default ResetPassword;
