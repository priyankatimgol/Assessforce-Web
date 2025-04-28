import { useState } from 'react';
import PropTypes from 'prop-types';
import { Typography } from '@mui/material';
import disclaimer from '../../../assets/images/avatar.png';

const ProfileSelectionCard = ({ data }) => {
  const [selectedRole, setSelectedRole] = useState(1);

  return (
    <>
      {data?.map(({ id, title, role }) => (
        <div
          className={selectedRole === id ? 'selected-card' : 'profile-card'}
          key={id}
          onClick={() => setSelectedRole(id)}
        >
          <div className='avtarCard'>
          <>
          <img src={disclaimer} alt="login-user-icon" />
        </>
            <div className='cardText'>
          <Typography variant="body2" className="profile-title">
            {title}
          </Typography>
          <Typography variant="caption" className="profile-role">
            {role}
          </Typography>
          </div>
          </div>
        </div>
      ))}
    </>
  );
};

ProfileSelectionCard.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.number.isRequired,
      role: PropTypes.shape({
        title: PropTypes.string.isRequired,
        role: PropTypes.string.isRequired,
      }).isRequired,
    })
  ).isRequired,
};

export default ProfileSelectionCard;
