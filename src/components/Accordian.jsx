import {} from 'react';
import {
  Accordion as MuiAccordion,
  AccordionDetails,
  AccordionSummary,
  Typography,
  styled,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import PropTypes from 'prop-types';

const StyledAccordion = styled(MuiAccordion)(() => ({
  boxShadow: 'none',
  border: 'none',
  '&:before': {
    display: 'none',
  },
  marginBottom: '2.2rem',
}));

const StyledAccordionSummary = styled(AccordionSummary)(() => ({
  backgroundColor: '#f5f5f5',
  height: '2.5rem',
  minHeight: '2.5rem',
  '&.Mui-expanded': {
    minHeight: '2.5rem',
  },
  '& .MuiAccordionSummary-content': {
    margin: '0',
  },
}));

const StyledAccordionDetails = styled(AccordionDetails)(() => ({
  backgroundColor: '#FFFFFF',
}));

const Accordion = ({ header, children, defaultExpanded = false }) => {
  return (
    <StyledAccordion defaultExpanded={defaultExpanded}>
      <StyledAccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel-content" id="panel-header">
        <Typography>{header}</Typography>
      </StyledAccordionSummary>
      <StyledAccordionDetails>
        <Typography>{children}</Typography>
      </StyledAccordionDetails>
    </StyledAccordion>
  );
};

Accordion.propTypes = {
  header: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  defaultExpanded: PropTypes.bool,
};

export default Accordion;
