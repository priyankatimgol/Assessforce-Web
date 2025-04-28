import {} from 'react';
import { SvgIcon } from '@mui/material';
import PropTypes from 'prop-types';

const TrashIcon = ({ ...props }) => {
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
            id="mask0_8194_78137"
            width="20"
            height="20"
            x="0"
            y="0"
            maskUnits="userSpaceOnUse"
            style={{ maskType: "alpha" }}
          >
            <path id="Bounding box" fill="#D9D9D9" d="M0 0h20v20H0z"></path>
          </mask>
          <g mask="url(#mask0_8194_78137)">
            <path
              id="delete"
              fill="currentColor"
              d="M5.832 17.5q-.687 0-1.177-.49a1.6 1.6 0 0 1-.49-1.177V5a.8.8 0 0 1-.593-.24.8.8 0 0 1-.24-.593q0-.354.24-.594t.593-.24H7.5q0-.354.24-.593.239-.24.593-.24h3.333q.355 0 .594.24.24.24.24.593h3.333q.354 0 .594.24t.24.594-.24.593a.8.8 0 0 1-.594.24v10.833q0 .688-.49 1.177-.489.49-1.177.49zm2.5-3.333q.354 0 .594-.24t.24-.594V7.5a.8.8 0 0 0-.24-.594.8.8 0 0 0-.594-.24.8.8 0 0 0-.594.24.8.8 0 0 0-.24.594v5.833q0 .354.24.594t.594.24m3.333 0q.355 0 .594-.24.24-.24.24-.594V7.5a.8.8 0 0 0-.24-.594.8.8 0 0 0-.594-.24.8.8 0 0 0-.593.24.8.8 0 0 0-.24.594v5.833q0 .354.24.594t.593.24"
            ></path>
          </g>
        </g>
      </svg>
    </SvgIcon>
  );
};

TrashIcon.propTypes = {
  color: PropTypes.string,
};

export default TrashIcon;
