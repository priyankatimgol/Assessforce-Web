import { useCallback, useId } from 'react';
import { useDropzone } from 'react-dropzone';
import { Box, Typography, Link, FormControl } from '@mui/material';
import PropTypes from 'prop-types';
import FileUploadIcon from '../../assets/customSVGIcons/FileUploadIcon';

const ASFileUpload = ({ label, isRequired = false, onChange }) => {
  // Add onChange prop
  const uniqueId = useId();
  const inputId = `${label?.replaceAll(' ', '')}-${uniqueId}`;

  const onDrop = useCallback(
    (acceptedFiles) => {
      if (acceptedFiles && acceptedFiles.length > 0) {
        onChange(acceptedFiles[0]); // Pass the file up
      }
    },
    [onChange]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.svg', '.png', '.jpg', '.jpeg', '.gif'],
    },
    maxSize: 5 * 1024 * 1024,
  });

  return (
    <>
      <FormControl variant="outlined" fullWidth style={{ marginBottom: '8px' }}>
        {label && (
          <Typography className="input-label" component="label" htmlFor={inputId}>
            {label}
            {isRequired && <span>*</span>}
          </Typography>
        )}
        <Box
          {...getRootProps()}
          sx={{
            border: '1px dashed var(--footer-border)',
            borderRadius: '4px',
            padding: '16px',
            textAlign: 'center',
            cursor: 'pointer',
            transition: 'border-color 0.2s ease',
            '&:hover': { borderColor: 'var(--primary-color)' },
            ...(isDragActive && { borderColor: 'var(--primary-color)' }),
          }}
        >
          <input {...getInputProps()} />
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Typography
              variant="body1"
              sx={{
                marginTop: '8px',
                fontFamily: 'inter-regular',
                display: 'flex',
                alignItems: 'center',
                fontWeight: 400,
                fontSize: '1rem',
                gap: '4px',
              }}
            >
              <FileUploadIcon
                style={{
                  fontSize: '24px',
                  color: 'var(--primary-color)',
                  width: '24px',
                  height: '24px',
                  marginRight: '0.3rem',
                }}
              />
              Drag and drop or{' '}
              <Link
                component="button"
                sx={{
                  color: 'var(--primary-color)',
                  textDecoration: 'underline',
                  marginLeft: '4px',
                  fontWeight: 400,
                }}
              >
                Browse
              </Link>
            </Typography>
            <Typography
              variant="body2"
              sx={{
                marginTop: '4px',
                color: 'var(--file-description)',
                fontSize: '0.75rem',
                fontFamily: 'inter-regular',
              }}
            >
              SVG, PNG, JPG or GIF (max 5MB)
            </Typography>
          </Box>
        </Box>
      </FormControl>
    </>
  );
};

ASFileUpload.propTypes = {
  label: PropTypes.string.isRequired,
  isRequired: PropTypes.bool,
  onChange: PropTypes.func.isRequired,
};

export default ASFileUpload;
