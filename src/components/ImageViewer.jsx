import { Backdrop, Box, Modal } from '@mui/material';
import PropTypes from 'prop-types';

const ImageViewer = ({ open, handleClose, imageSrc, isImage, component }) => {
  return (
    <Modal
      open={open}
      onClose={handleClose}
      closeAfterTransition
      BackdropComponent={Backdrop}
      disableEnforceFocus
      BackdropProps={{
        timeout: 500,
        style: {
          backgroundColor: 'var(--modal-bg)',
          backdropFilter: 'blur(0.25rem)',
        },
      }}
    >
      <Box
        sx={{
          position: 'relative',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
        }}
        onClick={handleClose}
      >
        {/* Prevent close on image or component click */}
        <Box
          onClick={(e) => e.stopPropagation()}
          sx={{
            position: 'relative',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            maxHeight: '90vh',
            maxWidth: '90vw',
          }}
          className="qr-container"
        >
          {/* Full-Width Image */}
          {isImage ? (
            <img
              src={imageSrc}
              alt="Full View"
              style={{
                maxWidth: '100%',
                maxHeight: '100%',
                objectFit: 'contain',
              }}
            />
          ) : (
            <div class="image-modal">{component}</div>
          )}
        </Box>
      </Box>
    </Modal>
  );
};

ImageViewer.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  imageSrc: PropTypes.string.isRequired,
  isImage: PropTypes.bool,
  component: PropTypes.element,
};

export default ImageViewer;
