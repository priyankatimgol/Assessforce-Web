import { Tooltip, tooltipClasses } from '@mui/material';
import { styled } from '@mui/material/styles';

const CustomWidthTooltip = styled(({ className, ...props }) => (
  <Tooltip {...props} classes={{ popper: className }} />
))({
  [`& .${tooltipClasses.tooltip}`]: {
    maxWidth: 300,
  },
});

export default CustomWidthTooltip;
