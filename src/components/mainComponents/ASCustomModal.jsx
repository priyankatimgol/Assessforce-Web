import {} from 'react';
import { Dialog, DialogTitle, DialogContent, IconButton, Tooltip, Typography } from '@mui/material';
import PropTypes from 'prop-types';
import ClearRoundedIcon from '@mui/icons-material/ClearRounded';

const ASCustomModal = ({ open = false, onClose, title, children, actions }) => {
  return (
    <Dialog open={open} onClose={onClose} sx={{ minWidth: '320px' }}>
      <DialogTitle
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '16px 24px',
        }}
      >
        <Typography variant="h1" sx={{ fontSize: '1rem', fontFamily: 'inter-semibold' }}>
          {title}
        </Typography>
        <Tooltip title="Close">
          <IconButton aria-haspopup="true" onClick={onClose}>
            <ClearRoundedIcon className="hover-icon pointer" />
          </IconButton>
        </Tooltip>
      </DialogTitle>

      <DialogContent
        sx={{
          padding: '0px 24px',
        }}
      >
        {children}
      </DialogContent>

      <div
        style={{
          padding: '8px 24px 16px 24px',
          display: 'flex',
          justifyContent: 'flex-end',
          gap: '8px',
        }}
      >
        {actions}
      </div>
    </Dialog>
  );
};

ASCustomModal.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  actions: PropTypes.node.isRequired,
};

export default ASCustomModal;
