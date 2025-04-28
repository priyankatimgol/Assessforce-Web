import { useContext } from 'react';
import { SvgIcon } from '@mui/material';
import PropTypes from 'prop-types';
import { ThemeContext } from '../../context/ThemeContext';

const OrgAccordianIcon = ({ ...props }) => {
  const { mode } = useContext(ThemeContext);
  const isDarkMode = mode === 'dark';
  
  return (
    <SvgIcon {...props}>
      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none">
        <path
          opacity="0.5"
          d="M15.2523 4.14062H11.7773V17.3323H17.3357V6.22396C17.3357 5.07396 16.4023 4.14062 15.2523 4.14062ZM15.2523 13.8573H13.8607V12.4656H15.2523V13.8573ZM15.2523 11.0823H13.8607V9.69062H15.2523V11.0823ZM15.2523 8.30729H13.8607V6.91562H15.2523V8.30729Z"
          fill={isDarkMode ? '#ffffff4d' : "black"}
          fillOpacity={isDarkMode ? '1' : "0.3"}
        />
        <path
          d="M8.30963 0.666016H2.7513C1.6013 0.666016 0.667969 1.59935 0.667969 2.74935V17.3327H10.393V2.74935C10.393 1.59935 9.45963 0.666016 8.30963 0.666016ZM4.83463 13.8577H2.7513V12.466H4.83463V13.8577ZM4.83463 11.0827H2.7513V9.69102H4.83463V11.0827ZM4.83463 8.30768H2.7513V6.91602H4.83463V8.30768ZM4.83463 5.52435H2.7513V4.13268H4.83463V5.52435ZM8.30963 13.8577H6.2263V12.466H8.30963V13.8577ZM8.30963 11.0827H6.2263V9.69102H8.30963V11.0827ZM8.30963 8.30768H6.2263V6.91602H8.30963V8.30768ZM8.30963 5.52435H6.2263V4.13268H8.30963V5.52435Z"
          fill={isDarkMode ? '#ffffff4d' : "black"}
          fillOpacity={isDarkMode ? '1' : "0.3"}
        />
      </svg>
    </SvgIcon>
  );
};

OrgAccordianIcon.propTypes = {
  color: PropTypes.string,
};

export default OrgAccordianIcon;
