import { Box, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import PropTypes from 'prop-types';

const ShowPreviewImage = ({ image, previewUrls, handleDeletePreview }) => {
  return (
    <>
      {previewUrls?.[image] && (
        <Box
          sx={{
            margin: '10px 0 16px 0',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <div className="org-preview-image-cnt">
            <img
              src={previewUrls?.[image]}
              alt="Preview"
              style={{ width: '100%', maxHeight: '200px', objectFit: 'contain' }}
            />
          </div>
          <IconButton
            aria-label="delete"
            onClick={() => handleDeletePreview(image)}
            sx={{ marginLeft: '5px' }}
          >
            <DeleteIcon />
          </IconButton>
        </Box>
      )}
    </>
  );
};

ShowPreviewImage.propTypes = {
  image: PropTypes.string.isRequired,
  previewUrls: PropTypes.object.isRequired,
  handleDeletePreview: PropTypes.func.isRequired,
};

export default ShowPreviewImage;
