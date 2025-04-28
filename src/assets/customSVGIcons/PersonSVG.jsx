import { } from 'react';
import { SvgIcon } from '@mui/material';
import PropTypes from 'prop-types';

const PersonSVG = ({ ...props }) => {
  return (
    <SvgIcon style={{ color: 'currentColor' }} {...props}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="17"
        height="14"
        fill="none"
        viewBox="0 0 17 14"
      >
        <g id="Group 1" fill="currentColor">
          <path
            id="person_alert"
            d="M6.999 7a3.2 3.2 0 0 1-2.354-.98 3.2 3.2 0 0 1-.98-2.354q0-1.374.98-2.354A3.2 3.2 0 0 1 6.999.333a3.2 3.2 0 0 1 2.354.98 3.2 3.2 0 0 1 .979 2.353 3.2 3.2 0 0 1-.98 2.355A3.2 3.2 0 0 1 7 7M.332 12v-.667q0-.708.365-1.302a2.43 2.43 0 0 1 .968-.906q1.291-.646 2.625-.97A11.5 11.5 0 0 1 7 7.834q1.375 0 2.708.323 1.333.322 2.625.969.604.312.969.906.364.594.364 1.302V12q0 .687-.49 1.177-.489.49-1.176.49h-10q-.688 0-1.177-.49A1.6 1.6 0 0 1 .332 12"
          ></path>
          <circle
            id="Ellipse 1"
            cx="14.915"
            cy="2.416"
            r="2.083"
            opacity="0.5"
          ></circle>
        </g>
      </svg>
    </SvgIcon>
  );
};

PersonSVG.propTypes = {
  color: PropTypes.string,
};

export default PersonSVG;
