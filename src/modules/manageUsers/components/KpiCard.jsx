import PropTypes from 'prop-types';
import { Card, CardContent, Typography } from '@mui/material';
import PersonSVG from '../../../assets/customSVGIcons/PersonSVG';
import GroupSVG from '../../../assets/customSVGIcons/GroupSVG';
import { ThemeContext } from '../../../context/ThemeContext';
import { useContext } from 'react';

const KpiCard = ({ icon, count, label, index }) => {
  const { mode } = useContext(ThemeContext);
  const isDarkMode = mode === 'dark';
  console.log(isDarkMode);

  const customColors = (index, text, iconColor) => {
    switch (index) {
      case 1:
        return text
          ? 'var(--active-light-green)'
          : isDarkMode && iconColor
          ? 'var(--dark-active-light-green)'
          : 'var(--grad-one)';
      case 2:
        return text
          ? 'var(--deactivate-red)'
          : isDarkMode && iconColor
          ? 'var(--dark-deactivate-green)'
          : 'var(--grad-two)';
      case 3:
        return text
          ? 'var(--light-pink)'
          : isDarkMode && iconColor
          ? 'var(--dark-light-pink)'
          : 'var(--grad-three)';
      case 4:
        return text
          ? 'var(--active-yellow)'
          : isDarkMode && iconColor
          ? 'var(--dark-active-yellow)'
          : 'var(--grad-four)';
      case 5:
        return text
          ? 'var(--active-violet)'
          : isDarkMode && iconColor
          ? 'var(--dark-active-violet)'
          : 'var(--grad-five)';
      case 6:
        return text
          ? 'var(--light-blue)'
          : isDarkMode && iconColor
          ? 'var(--dark-light-blue)'
          : 'var(--grad-six)';
      case 0:
        return text
          ? 'var(--active-blue)'
          : isDarkMode && iconColor
          ? 'var(--dark-active-blue)'
          : 'var(--grad-seven)';
      default:
        return text
          ? 'var(--active-blue)'
          : isDarkMode && iconColor
          ? 'var(--dark-active-blue)'
          : 'linear-gradient(180deg, #BCE6F180 0%, #BCE6F129 100%)';
    }
  };

  return (
    <Card
      className="mu-kpi-card"
      sx={{
        borderRadius: '6px',
        background: customColors(index, false),
        boxShadow: 'none',
        height: '100%',
        display: 'flex',
        flexDirection: 'column'
      }}
    >
      <CardContent sx={{
        width: '100%',
        paddingBottom: '0rem',
        height: '100%',
        display: 'flex',
        flexDirection: 'column'
         }}>
        <div className="kip-ic">
          {icon ? (
            <img src={icon} alt="user-icon" className="user-img" />
          ) : label.includes('Active') && label !== 'Active Users' ? (
              <PersonSVG style={{ 'font-size': '1rem', color: customColors(index, isDarkMode ? false : true, true) }} />
          ) : (
                <GroupSVG style={{ 'font-size': '1rem', color: customColors(index, isDarkMode ? false : true, true) }} />
          )}
          <div>
            <Typography
              sx={{
                textAlign: 'center',
                color: customColors(index, true),
                fontFamily: 'inter-semibold',
                fontSize: '1rem',
              }}
            >
              {count}
            </Typography>
          </div>
        </div>

        <Typography
          variant="body2"
          color="textSecondary"
          className="cardbigText"
          sx={{ marginTop: 1, fontFamily: 'inter-medium', fontSize: '.9rem', minHeight: '2.563rem', flex: '1 1 auto' }}
        >
          {label}
        </Typography>
      </CardContent>
    </Card>
  );
};

KpiCard.propTypes = {
  icon: PropTypes?.string,
  count: PropTypes.number.isRequired,
  label: PropTypes.string.isRequired,
  color: PropTypes.string,
  index: PropTypes.number
};

export default KpiCard;
