import PropTypes from 'prop-types';
import { Card, Typography } from '@mui/material';
import Grid from '@mui/material/Grid2';
import SeperatorDot from '../../../assets/customSVGIcons/SeperatorDot';
import dayjs from 'dayjs';
import WatchIcon from '../../../assets/customSVGIcons/WatchIcon';
import PersonIcon from '../../../assets/customSVGIcons/PersonIcon';

const RequestEditsKpi = ({ data, timeZone }) => {
  const date = dayjs(new Date(data?.label1))?.tz(timeZone?.time_zone)?.format('MM/DD/YYYY');
  const time = dayjs(new Date(data?.label1))?.tz(timeZone?.time_zone)?.format('hh:mm A');
  const iconSize = {
    width: '18px',
    height: '18px',
  };

  console.log('data', data, timeZone);

  const KpiIcons = (title) => {
    switch (title) {
      case 'Customer':
        return (
          <PersonIcon style={iconSize}
          />
        );
      case 'Imported By':
        return <PersonIcon style={iconSize} />;
      case 'Imported On':
        return <WatchIcon style={iconSize} />;
      default:
        return <PersonIcon style={iconSize} />;
    }
  };

  return (
    <Card
      className="mo-edit-kpi-cards"
      sx={{
        borderRadius: '6px',
        background: 'var(--highlighted-color)',
        boxShadow: 'none',
        width: { xs: '250px', sm: '250px', md: 'auto' },
        height: '100%'
      }}
    >
      <div style={{ width: '100%', height: '100%', padding: '0.625rem 0.625rem 0.625rem 0.875rem' }}>
        <div className="items-center">
          {KpiIcons(data?.title)}
          <div className="mo-card">
            <Typography
              color="var(--muted-text)"
              fontSize="0.875rem"
              fontFamily="inter-semibold"
              marginLeft={1}
              lineHeight={2}
            >
              {data?.title}
            </Typography>
          </div>
        </div>
        <Grid container size={{xs: 12}} display="flex" alignItems="center" marginTop="0.5rem">
          <Grid item className="mo-kpi-text-1">
            <Typography
              color="var(--heading-color)"
              fontSize="0.875rem"
              fontFamily="inter-regular"
              lineHeight="1.25rem"
            >
              {data?.title === 'Imported On' ? date : data?.label1}
            </Typography>
          </Grid>
          <SeperatorDot
            style={{
              width: '6px',
              height: '6px',
              margin: '0 10px',
              display: data?.title === 'Customer' && 'none',
              color: 'var(--footer-border)',
            }}
          />
          <Grid item display="flex">
            <Typography
              color="var(--heading-color)"
              fontSize="0.875rem"
              fontFamily="inter-regular"
              lineHeight="1.25rem"
            >
              {data?.title === 'Imported On' ? time : data?.label2}
            </Typography>
          </Grid>
        </Grid>
      </div>
    </Card>
  );
};

RequestEditsKpi.propTypes = {
  data: PropTypes.object,
  timeZone: PropTypes.string,
};

export default RequestEditsKpi;
