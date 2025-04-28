import PropTypes from 'prop-types';
import { Card, CardContent, Typography } from '@mui/material';
import treeBlue from '../../../assets/images/treeBlue.svg';
import treeGreen from '../../../assets/images/treeGreen.svg';
import treeRed from '../../../assets/images/treeRed.svg';
const AccountKpiCards = ({ count, label, index }) => {
  return (
    <Card
      className="ua-kpi-cards"
      sx={{
        borderRadius: '6px',
        background:
          index === 0
            ? 'var(--grad-eight)'
            : index === 1
              ? 'var(--grad-one)'
              : 'var(--grad-two)',
        boxShadow: 'none',
      }}
    >
      <div style={{ width: '100%', padding: '14px 16px' }}>
        <div className="ua-card">
          <Typography color="var(--text-secondary-color)" fontSize="0.875rem" fontFamily="inter-medium">
            {label}
          </Typography>

          <div className="ua-img-cnt">
            <img
              src={index === 0 ? treeBlue : index === 1 ? treeGreen : treeRed}
              alt=""
              className="ua-user-img"
            />
            <Typography
              color={
                index === 0
                  ? 'var(--active-blue)'
                  : index === 1
                    ? 'var(--active-green)'
                    : 'var(--deactivate-red)'
              }
              fontFamily="inter-semibold"
              fontSize="1rem"
            >
              {count}
            </Typography>
          </div>
        </div>
      </div>
    </Card>
  );
};

AccountKpiCards.propTypes = {
  count: PropTypes.number.isRequired,
  label: PropTypes.string.isRequired,
  color: PropTypes.string,
  index: PropTypes.number,
};

export default AccountKpiCards;
