import { } from 'react';
import { SvgIcon } from '@mui/material';
import PropTypes from 'prop-types';

const CalendarSVG = ({ ...props }) => {
  return (
    <SvgIcon {...props}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        fill="none"
        viewBox="0 0 20 20"
      >
        <g id="Icon">
          <mask
            id="mask0_11611_56654"
            width="20"
            height="20"
            x="0"
            y="0"
            maskUnits="userSpaceOnUse"
            style={{ maskType: "alpha" }}
          >
            <path id="Bounding box" fill="#D9D9D9" d="M0 0h20v20H0z"></path>
          </mask>
          <g mask="url(#mask0_11611_56654)">
            <path
              id="calendar_month"
              fill="currentColor"
              d="M4.167 18.333q-.688 0-1.177-.49a1.6 1.6 0 0 1-.49-1.177V4.999q0-.687.49-1.177.489-.49 1.177-.49H5V2.5q0-.354.24-.593.24-.24.593-.24.354 0 .594.24t.24.593v.834h6.666v-.834q0-.354.24-.593.24-.24.594-.24t.593.24.24.593v.834h.833q.688 0 1.177.49.49.489.49 1.176v11.667q0 .687-.49 1.177-.489.49-1.177.49zm0-1.667h11.666V8.333H4.167zm5.833-5a.8.8 0 0 1-.594-.24.8.8 0 0 1-.24-.593q0-.354.24-.594t.594-.24.594.24.24.594-.24.593a.8.8 0 0 1-.594.24m-3.333 0a.8.8 0 0 1-.594-.24.8.8 0 0 1-.24-.593q0-.354.24-.594t.594-.24.593.24.24.594-.24.593a.8.8 0 0 1-.593.24m6.666 0a.8.8 0 0 1-.593-.24.8.8 0 0 1-.24-.593q0-.354.24-.594t.593-.24.594.24.24.594-.24.593a.8.8 0 0 1-.594.24M10 14.999a.8.8 0 0 1-.594-.24.8.8 0 0 1-.24-.593q0-.354.24-.594t.594-.24.594.24.24.594-.24.594A.8.8 0 0 1 10 15m-3.333 0a.8.8 0 0 1-.594-.24.8.8 0 0 1-.24-.593q0-.354.24-.594t.594-.24.593.24.24.594-.24.594a.8.8 0 0 1-.593.24"
            ></path>
          </g>
        </g>
      </svg>
    </SvgIcon>
  );
};

CalendarSVG.propTypes = {
  color: PropTypes.string,
};

export default CalendarSVG;
