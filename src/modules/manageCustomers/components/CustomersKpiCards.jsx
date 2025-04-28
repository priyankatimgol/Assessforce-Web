import PropTypes from 'prop-types';
import { Card, CardContent, Typography } from '@mui/material';
import CustomerIcon from '../../../assets/customSVGIcons/CustomerIcon';
import { useContext } from 'react';
import { ThemeContext } from '../../../context/ThemeContext';


const gradients = [
  'var(--grad-eight)',
  'var(--grad-one)',
  'var(--grad-two)',
  'var(--grad-three)',
  'var(--grad-nine)',
  'var(--grad-eight)',
];

const getColor = (index, isDarkMode) => {
  const lightColors = ['var(--active-blue)', 'var(--active-green)', 'var(--deactivate-red)', 'var(--active-purple)', 'var(--duplicate-text)'];
  const darkColors = [
    'var(--active-blue)',
    'var(--active-light-green)',
    'var(--deactivate-red)',
    'var(--light-pink)',
    'var(--active-purple)',
  ];

  return isDarkMode ? darkColors[index] || darkColors[0] : lightColors[index] || lightColors[0];
};
const CustomersKpiCards = ({ data, index }) => {
  const { mode } = useContext(ThemeContext);
  const isDarkMode = mode === 'dark';

  return (
    <Card
      className="mu-kpi-card"
      sx={{
        borderRadius: '6px',
        background: gradients[index] || gradients[0],
        boxShadow: 'none',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <CardContent
        sx={{
          width: '100%',
          paddingBottom: '0rem',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <div className="kip-ic">
          <CustomerIcon
            className="user-img"
            style={{ 'font-size': '1rem', color: getColor(index, isDarkMode) }}
          />

          <div>
            <Typography
              color={getColor(index, isDarkMode)}
              textAlign= 'center'
              fontFamily= 'inter-semibold'
              fontSize= '1rem'
              
            >
              {data?.count}
            </Typography>
          </div>
        </div>

        <Typography
          variant="body2"
          //color="textSecondary"
          color={'var(--text-secondary-color)'}
          className="cardbigText"
          sx={{
            marginTop: 1,
            fontFamily: 'inter-medium',
            fontSize: '.9rem',
            minHeight: '2.563rem',
            flex: '1 1 auto',
          }}
        >
          {data?.title}
        </Typography>
      </CardContent>
    </Card>
  );
};

CustomersKpiCards.propTypes = {
  data: PropTypes.array,
  index: PropTypes.number,
};

export default CustomersKpiCards;
