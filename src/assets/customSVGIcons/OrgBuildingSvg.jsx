import { useContext } from 'react';
import { SvgIcon } from '@mui/material';
import PropTypes from 'prop-types';
import { ThemeContext } from '../../context/ThemeContext';

const OrgBuildingSvg = ({ ...props }) => {
  const { mode } = useContext(ThemeContext);
  const isDarkMode = mode === 'dark';
  
  return (
    <SvgIcon style={{ color: 'currentColor' }} {...props}>
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
        <path
          d="M17.4981 4.16992H13.3281V19.9999H19.9981V6.66992C19.9981 5.28992 18.8781 4.16992 17.4981 4.16992ZM17.4981 15.8299H15.8281V14.1599H17.4981V15.8299ZM17.4981 12.4999H15.8281V10.8299H17.4981V12.4999ZM17.4981 9.16992H15.8281V7.49992H17.4981V9.16992Z"
          fill="url(#paint0_linear_14174_173735)"
        />
        <path
          d="M9.17 0H2.5C1.12 0 0 1.12 0 2.5V20H11.67V2.5C11.67 1.12 10.55 0 9.17 0ZM5 15.83H2.5V14.16H5V15.83ZM5 12.5H2.5V10.83H5V12.5ZM5 9.17H2.5V7.5H5V9.17ZM5 5.83H2.5V4.16H5V5.83ZM9.17 15.83H6.67V14.16H9.17V15.83ZM9.17 12.5H6.67V10.83H9.17V12.5ZM9.17 9.17H6.67V7.5H9.17V9.17ZM9.17 5.83H6.67V4.16H9.17V5.83Z"
          fill="url(#paint1_linear_14174_173735)"
        />
        <defs>
          <linearGradient
            id="paint0_linear_14174_173735"
            x1="14.2058"
            y1="9.38868"
            x2="22.2397"
            y2="11.6302"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor={isDarkMode ? '#9bdaea' : '#26AFD2'} />
            <stop offset="1" stopColor={isDarkMode ? '#9bdaea' : '#2574c2'} />
          </linearGradient>
          <linearGradient
            id="paint1_linear_14174_173735"
            x1="1.53553"
            y1="6.5935"
            x2="14.7181"
            y2="11.6869"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor={isDarkMode ? '#9bdaea' : '#26AFD2'} />
            <stop offset="1" stopColor={isDarkMode ? '#9bdaea' : '#2574c2'} />
          </linearGradient>
        </defs>
      </svg>
    </SvgIcon>
  );
};

OrgBuildingSvg.propTypes = {
  color: PropTypes.string,
};

export default OrgBuildingSvg;
