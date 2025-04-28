import { useState } from 'react';
import LoginContainer from '../../../components/LoginContainer';
import { Checkbox, FormControlLabel, Grid, Typography } from '@mui/material';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import CustomButton from '../../../components/CustomButton';
import ProfileSelectionCard from './ProfileSelectionCard';
import { profileRoles } from '../../../DummyJson';
import '../styles.css';
import { DASHBOARD, MANAGE_USERS } from '../../../utils/enums/RoutesEnums';

const ProfileSelection = () => {
  const [defaultRole, setDefaultRole] = useState(false);

  return (
    <LoginContainer>
      <Typography variant="h4" component="h1" className="login-head-label mb-06rem">
        Select Profile
      </Typography>

      <Typography variant="body1" className="profile-sub-title">
        You can switch profile at any time after signing in.
      </Typography>

      <Grid container xs={12}>
        <Grid item xs={12} className="profile-selection-card">
          <ProfileSelectionCard data={profileRoles} />
        </Grid>

        <Grid item xs={12}>
          <FormControlLabel
            control={
              <Checkbox
                checked={defaultRole}
                onChange={(e) => setDefaultRole(e.target.checked)}
                sx={{
                  color: defaultRole ? 'var(--primary-color)' : 'var(--checkbox-border)',
                  '&.Mui-checked': {
                    color: 'var(--primary-color)',
                  },
                  '& .MuiSvgIcon-root': {
                    fontSize: '1.25rem',
                    width: '1.25rem',
                    height: '1.25rem',
                  },
                }}
              />
            }
            label="Set as default profile"
            sx={{
              marginTop: '0.4rem',
              marginBottom: '0.6rem',
              '& .MuiFormControlLabel-label': {
                color: 'var(--text-secondary-color)',
                fontSize: '0.75rem',
                fontFamily: 'inter-regular',
              },
            }}
          />
          <Link to={DASHBOARD}>
            <CustomButton type="contained">Proceed</CustomButton>
          </Link>
        </Grid>
      </Grid>
    </LoginContainer>
  );
};

ProfileSelection.propTypes = {
  setSelectProfile: PropTypes.func.isRequired,
};

export default ProfileSelection;
