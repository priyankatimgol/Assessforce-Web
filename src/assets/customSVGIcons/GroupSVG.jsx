import { } from 'react';
import { SvgIcon } from '@mui/material';
import PropTypes from 'prop-types';

const GroupSVG = ({ ...props }) => {
  return (
    <SvgIcon style={{ color: 'currentColor' }} {...props}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        fill="none"
        viewBox="0 0 20 20"
      >
        <mask
          id="mask0_14638_50657"
          width="20"
          height="20"
          x="0"
          y="0"
          maskUnits="userSpaceOnUse"
          style={{ maskType: "alpha" }}
        >
          <path fill="currentColor" d="M.832 0h20v20h-20z"></path>
        </mask>
        <g fill="currentColor" mask="url(#mask0_14638_50657)">
          <path d="M1.664 14.333q0-.708.365-1.302a2.43 2.43 0 0 1 .968-.906 12.4 12.4 0 0 1 2.625-.97 11.5 11.5 0 0 1 2.709-.322q1.375 0 2.708.323a12.4 12.4 0 0 1 2.625.969q.605.312.969.906t.364 1.302V15q0 .687-.49 1.177-.489.49-1.176.49h-10q-.688 0-1.177-.49A1.6 1.6 0 0 1 1.664 15zM8.331 10a3.2 3.2 0 0 1-2.354-.98 3.2 3.2 0 0 1-.98-2.354q0-1.374.98-2.354a3.2 3.2 0 0 1 2.354-.979 3.2 3.2 0 0 1 2.354.98 3.2 3.2 0 0 1 .98 2.353 3.2 3.2 0 0 1-.98 2.355A3.2 3.2 0 0 1 8.33 10"></path>
          <path
            d="M16.206 16.666q.229-.375.343-.802t.115-.864v-.834q0-.916-.51-1.76t-1.448-1.448a10.423 10.423 0 0 1 3.75 1.167q.75.415 1.146.927.395.51.395 1.114V15q0 .687-.49 1.177-.489.49-1.176.49zm.458-10a3.2 3.2 0 0 1-.98 2.355 3.2 3.2 0 0 1-2.353.979q-.23 0-.584-.052a5 5 0 0 1-.583-.115q.562-.666.865-1.48a4.8 4.8 0 0 0 .302-1.687q0-.874-.302-1.687a5 5 0 0 0-.865-1.48q.292-.103.583-.135a6 6 0 0 1 .584-.031 3.2 3.2 0 0 1 2.354.98 3.2 3.2 0 0 1 .98 2.353"
            opacity="0.5"
          ></path>
        </g>
      </svg>
    </SvgIcon>
  );
};

GroupSVG.propTypes = {
  color: PropTypes.string,
};

export default GroupSVG;
