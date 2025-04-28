import PropTypes from 'prop-types';
import { Card, Divider, Typography } from '@mui/material';
import CustomIcons from '../../../components/CustomIcons';
import Grid from '@mui/material/Grid2';
import { ThemeContext } from '../../../context/ThemeContext';
import { useContext } from 'react';
import OrgBuildKpiIcon from '../../../assets/customSVGIcons/OrgBuildKpiIcon';

const gradients = [
  'var(--grad-eight)',
  'var(--grad-three)',
  'var(--grad-four)',
  'var(--grad-five)',
  'var(--grad-one)',
];

const getColor = (index, isDarkMode) => {
  const lightColors = [
    'var(--primary-color)',
    'var(--light-pink)',
    'var(--active-yellow)',
    'var(--active-violet)',
    'var(--active-light-green)',
  ];
  const darkColors = [
    'var(--primary-color)',
    'var(--dark-light-pink)',
    'var(--dark-active-yellow)',
    'var(--dark-active-violet)',
    'var(--dark-active-light-green)',
  ];

  return isDarkMode ? darkColors[index] || darkColors[0] : lightColors[index] || lightColors[0];
};

const OrgKpiCards = ({ data, index }) => {
  const { mode } = useContext(ThemeContext);
  const isDarkMode = mode === 'dark';

  return (
    <Card
      sx={{
        borderRadius: '6px',
        background: gradients[index] || gradients[0],
        boxShadow: 'none',
        height: '100%',
      }}
      className="mo-kpi-cards"
    >
      <div style={{ width: '100%' }}>
        <div style={{display: 'flex'}}>
          <CustomIcons sx={{mt: .7}}>
            <OrgBuildKpiIcon color={getColor(index, isDarkMode)} />
          </CustomIcons>
          <div className="mo-card">
            <Typography
              color={isDarkMode ? 'var(--text-light-color)' : getColor(index, isDarkMode)}
              fontSize="0.875rem"
              fontFamily="inter-medium"
              marginLeft={1}
            >
              {data?.title}
            </Typography>
          </div>
        </div>
        <Grid size={{ xs: 12 }} margin="8px 0">
          <Divider />
        </Grid>
        <Grid container>
          {data?.data?.map((item, idx) => (
            <>
              <Grid
                size={{ xs: 6 }}
                className="mo-kpi-text-1"
                key={idx}
                marginBottom={idx === 2 ? '0px' : '4px'}
              >
                <Typography
                  color="var(--text-secondary-color)"
                  fontFamily="inter-regular"
                  className="mo-kpi-cont-1"
                >
                  {item?.title}
                </Typography>
              </Grid>
              <Grid
                size={{ xs: 6 }}
                display="flex"
                justifyContent="flex-end"
                marginBottom={idx === 2 ? '0px' : '4px'}
              >
                <Typography
                  color={getColor(index, isDarkMode)}
                  fontFamily="inter-semibold"
                  className="mo-kpi-cont-1"
                >
                  {item?.count}
                </Typography>
              </Grid>
            </>
          ))}
        </Grid>
      </div>
    </Card>
  );
};

OrgKpiCards.propTypes = { data: PropTypes.array, index: PropTypes.number };

export default OrgKpiCards;
