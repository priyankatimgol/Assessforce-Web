import { Typography } from '@mui/material';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import PropTypes from 'prop-types';
import Grid from '@mui/material/Grid2';

const RequiredMessage = () => {
  return (
    <Grid size={{ xs: 12 }} sx={{ marginBottom: '0.2rem', marginTop: '0.2rem' }}>
      <Typography
        component="p"
        variant="subtitle2"
        sx={{
          display: 'flex',
          alignItems: 'center',
          fontSize: '0.75rem',
          marginTop: '4px',
          fontFamily: 'inter-regular',
          lineHeight: '1.125rem',
        }}
      >
        <InfoOutlinedIcon
          className="ml-2"
          sx={{
            marginRight: '0.375rem',
            fontSize: "1rem",
          }}
        />
        Fields marked with an asterisk (*) are required.
      </Typography>
    </Grid>
  );
};

RequiredMessage.propTypes = {
  title: PropTypes.string.isRequired,
  tooltip: PropTypes.string,
};

export default RequiredMessage;
