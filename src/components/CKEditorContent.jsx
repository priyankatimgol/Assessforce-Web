import React from 'react';
import { Box, styled } from '@mui/material';

// Styled component for CKEditor content with all the necessary styles
const CKEditorContentWrapper = styled(Box)(({ theme }) => ({
   //width: '100%',
  '& p, & span, & div, & ul, & ol, & li, & h1, & h2, & h3, & h4, & h5, & h6, & a, & img, & button, & input, & textarea, & select, & address, & article, & footer, & label, & header, & legend, & link, & main, & object, & option, & section, & sup, & sub, & wbr': {
    // Reset all properties to their initial values
    all: 'revert',
    wordBreak: 'break-word',
    fontFamily: theme.typography.fontFamily,
  },
  '& strong, & b': {
    fontFamily: theme.typography.fontFamilyBold || 'inter-bold, Arial, sans-serif',
    fontWeight: 'normal'
  },
  '& blockquote': {
    borderLeft: '5px solid #ccc',
    fontStyle: 'italic',
    marginLeft: 0,
    marginRight: 0,
    overflow: 'hidden',
    paddingLeft: '1.5em',
    paddingRight: '1.5em',
  },
  '& img': {
    maxWidth: '100%',
    display: 'inline-block',
  },
  '& .text-align-center': {
    textAlign: 'center',
    listStylePosition: 'inside',
  },
  '& .text-align-left': {
    textAlign: 'left',
  },
  '& .text-align-right': {
    textAlign: 'right',
    listStylePosition: 'inside',
  },
  '& .text-align-justify': {
    textAlign: 'justify',
  },
}));

/**
 * CKEditorContent component renders HTML content from Drupal's CKEditor
 * with proper styling and safely handles the HTML content.
 *
 * @param {Object} props - Component props
 * @param {string} props.html - The HTML content from CKEditor
 * @param {Object} props.sx - Additional MUI sx styles to apply to the container
 * @param {string} props.className - Additional CSS classes
 */
const CKEditorContent = ({ html, sx = {}, className = ''}) => {
  return (
    <CKEditorContentWrapper
      className={`ckeditor-content ${className}`}
      sx={sx}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
};

export default CKEditorContent;
