import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Accordion, AccordionSummary, AccordionDetails, Typography } from '@mui/material';
import CustomSwitch from './CustomSwitch';

const CustomAccordion = ({
  title,
  defaultExpanded = false,
  isDisabled = false,
  onChange,
  children,
  machineName,
  leftIcon,
  expandedIcon,
  ...props
}) => {
  const [expanded, setExpanded] = useState(false);

  const handleSwitchChange = (event) => {
    const newExpandedState = event.target.checked;
    setExpanded(newExpandedState);
    if (onChange) {
      onChange(machineName, newExpandedState);
    }
  };

  useEffect(() => {
    setExpanded(defaultExpanded);
  }, [defaultExpanded]);

  return (
    <Accordion
      expanded={expanded}
      sx={{
        width: '100%',
        borderColor: expanded ? 'var(--card-border-color)' : 'transparent',
        borderWidth: 1,
        borderStyle: 'solid',
        boxShadow: 'none !important',
        borderRadius: '6px',
        marginBottom: 2,
        overflow: 'hidden',
        '&:last-of-type': {
          marginBottom: 0,
        },
      }}
      {...props}
    >
      <AccordionSummary
        aria-controls="panel1a-content"
        id="panel1a-header"
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          backgroundColor: expanded ? 'var(--highlighted-color)' : 'var(--accordian-muted-color)',
          borderBottom: 'none',
          height: '48px',
          transition: 'height 0.3s ease',
          padding: '12px 10px !important',
          '&.Mui-expanded': {
            minHeight: '50px',
          },
        }}
      >
        <Typography variant="h6" width="100%" className="accordian-title">
        {expanded ? expandedIcon : leftIcon}
          {title}
        </Typography>
        <div
          onClick={(event) => {
            event.stopPropagation();
          }}
        >
          <CustomSwitch checked={expanded} onChange={handleSwitchChange} isDisabled={isDisabled} defaultExpanded={expanded} />
        </div>
      </AccordionSummary>
      <AccordionDetails
        sx={{
          paddingTop: '16px',
        }}
      >
        {children}
      </AccordionDetails>
    </Accordion>
  );
};

CustomAccordion.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  defaultExpanded: PropTypes.bool,
  isDisabled: PropTypes.bool,
  onChange: PropTypes.func,
  machineName: PropTypes.string,
  leftIcon: PropTypes.node,
  expandedIcon: PropTypes.node,
};

export default CustomAccordion;
