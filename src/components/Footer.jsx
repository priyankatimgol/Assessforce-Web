import { useMemo, useState } from 'react';
import { Box, Link, Popover, Typography, IconButton } from '@mui/material';
// import world from '../assets/images/world.png';
import PropTypes from 'prop-types';
import ClearRoundedIcon from '@mui/icons-material/ClearRounded';
import DisclaimerIcon from '../assets/customSVGIcons/DisclaimerIcon';

const Footer = ({ generalSettingsData }) => {
  const [choice, setChoice] = useState('');
  const [anchorEl, setAnchorEl] = useState(null);
  const [menuAnchorEl, setMenuAnchorEl] = useState(null);

  const details = [
    { label: 'FAQ', hasIcon: false },
    { label: 'Support', hasIcon: false },
    { label: 'Terms of Use', hasIcon: false },
    {
      label: 'Disclaimer',
      hasIcon: true,
      icon: (
        <DisclaimerIcon
          sx={{
            margin: '0 8px',
            fontSize: '1.25rem !important',
            color: '#D9D9D9 !important',
            marginLeft: '4px !important'
          }}
        />
      ),
    },
    // { label: 'Eng', hasIcon: true, icon: <ExpandMoreIcon />, image: world },
  ];

  const handleClick = (event, label) => {
    setChoice(label);
    setAnchorEl(event.currentTarget);
    setMenuAnchorEl(null); // Close menu if it was open
  };

  const handleMenuClick = (event) => {
    setMenuAnchorEl(event.currentTarget);
    setChoice(''); // Close popover if it was open
  };

  const handleClose = () => {
    setAnchorEl(null);
    setChoice('');
    setMenuAnchorEl(null); // Close the menu when clicking outside
  };

  const fetchDetails = useMemo(() => {
    switch (choice) {
      case 'FAQ':
        return 'FAQ details here...';
      case 'Support':
        return 'Support details here...';
      case 'Terms of Use':
        return 'Terms of Use details here...';
      case 'Disclaimer':
        return (
          <Box
            sx={{
              width: '100%',
              maxWidth: '426px !important',
              height: '160px !important',
              display: 'flex',
              flexDirection: 'column',
              overflow: 'hidden',
              paddingBottom: '0 !important',
              padding: '10px 14px',
            }}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '0 0 4px 0',
              }}
            >
              <Typography variant="h6" fontFamily="inter-semibold" fontSize="1rem">
                {choice}
              </Typography>
              <IconButton size="small" onClick={handleClose} sx={{ margin: '0 -8px 0 0' }}>
                <ClearRoundedIcon fontSize="24px" />
              </IconButton>
            </div>
            <Box
              sx={{
                overflowY: 'auto',
              }}
            >
              <div
                className="disclaimer-content"
                dangerouslySetInnerHTML={{
                  __html: generalSettingsData?.disclaimer_text,
                }}
                style={{
                  fontSize: '0.75rem',
                  fontFamily: 'inter-regular',
                  margin: '0px !important',
                  paddingRight: '10px',
                }}
              />
            </Box>
          </Box>
        );
      default:
        return '';
    }
  }, [choice]);

  return (
    <Box className="footer">
      <Box className="link-cnt">
        {details.map((item, index) => (
          <div key={item.label}>
            <Link
              variant="body2"
              className="item-links"
              aria-describedby={item.label}
              onClick={(e) => {
                if (item.label === 'Eng') {
                  handleMenuClick(e); // Open the menu
                } else if (item.hasIcon) {
                  handleClick(e, item.label); // Open the Popover
                }
              }}
              style={{ cursor: item.hasIcon ? 'pointer' : 'default' }}
            >
              {item.label}
              {item.image && <img src={item.image} alt={item.label} style={{ margin: '0 0.5rem' }} />}
              {item.hasIcon &&
                (typeof item.icon === 'string' ? (
                  <img src={item.icon} alt={item.label} style={{ cursor: 'pointer', margin: '0 0.5rem' }} />
                ) : (
                  item.icon
                ))}
              {index < details.length - 1 && <span className="m-01rem">|</span>}
            </Link>
            <Popover
              id={item.label}
              open={choice === item.label && Boolean(anchorEl)}
              anchorEl={anchorEl}
              onClose={handleClose}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'center',
              }}
              transformOrigin={{
                vertical: 'bottom',
                horizontal: 'center',
              }}
              TransitionProps={{
                timeout: {
                  enter: 225,
                  exit: 0,
                },
              }}
            >
              {fetchDetails}
            </Popover>
          </div>
        ))}
      </Box>
      <Typography variant="caption" className="footer-powered-msg">
        {generalSettingsData?.copyright_text} {generalSettingsData?.powered_by_lbl}{' '}
        <span className="m-01rem">|</span> Version 2.3.9
      </Typography>
    </Box>
  );
};

Footer.propTypes = {
  generalSettingsData: PropTypes.object.isRequired,
};

export default Footer;
