import { } from 'react';
import { SvgIcon } from '@mui/material';
import PropTypes from 'prop-types';

const DividerDot = ({ color = '#2574C2', ...props }) => {

    return (
        <SvgIcon {...props}>
            <svg xmlns="http://www.w3.org/2000/svg" width="5" height="4" viewBox="0 0 5 4" fill="none">
                <circle cx="2.33203" cy="2" r="2" fill="black" fill-opacity="0.32" />
            </svg>
        </SvgIcon>
    );
};

DividerDot.propTypes = {
    color: PropTypes.string,
};

export default DividerDot;


