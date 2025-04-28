import {} from 'react';
import ASCustomModal from '../../../components/mainComponents/ASCustomModal';
import CustomButton from '../../../components/CustomButton';
import { Box, Typography } from '@mui/material';
import PropTypes from 'prop-types';

const DuplicationWarningModal = ({ open, duplicationType, onConfirm, onClose }) => {
  const duplicateItems = duplicationType ? Object.values(duplicationType) : [];

  return (
    <ASCustomModal
      open={open}
      onClose={onClose}
      title="Duplication Warning"
      actions={
        <>
          <CustomButton onClick={onClose} type="outlined" style={{ height: '2.5rem' }}>
            Cancel
          </CustomButton>
          <CustomButton onClick={onConfirm} type="contained" style={{ height: '2.5rem' }}>
            Continue
          </CustomButton>
        </>
      }
    >
      <Typography
        sx={{
          marginBottom: '10px',
          fontFamily: 'inter-regular',
          fontSize: '0.875rem',
          color: 'var(--text-secondary-color)',
        }}
      >
        At least one other organization with the same combination of fields already exists:
      </Typography>
      <Box
        sx={{
          backgroundColor: 'var(--duplicate-bg)',
          padding: 2,
          borderRadius: 1,
          marginBottom: '10px',
        }}
      >
        {duplicateItems.map((item, index) => (
          <Typography
            key={index}
            sx={{
              color: 'var(--duplicate-text)',
              fontSize: '0.875rem',
              fontFamily: 'inter-regular',
              lineHeight: '1.5rem',
            }}
          >
            {index + 1}. {item}
          </Typography>
        ))}
      </Box>
      <Typography
        sx={{
          marginBottom: '20px',
          fontFamily: 'inter-regular',
          fontSize: '0.875rem',
          color: 'var(--text-secondary-color)',
        }}
      >
        Click Continue to create the organization. Click Cancel to stop.
      </Typography>
    </ASCustomModal>
  );
};

DuplicationWarningModal.propTypes = {
  open: PropTypes.bool.isRequired,
  duplicationType: PropTypes.string,
  onConfirm: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default DuplicationWarningModal;
