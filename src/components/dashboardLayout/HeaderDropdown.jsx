import { Divider, Typography } from '@mui/material';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import LocalStorageHelper from '../../utils/LocalStorageHelper';
import { handleLogoutUser } from '../../redux/slice/authSlice/Authentication';
import { MANAGE_ACCOUNTS, MANAGE_ORGANIZATIONS, MANAGE_USERS, SIGN_IN } from '../../utils/enums/RoutesEnums';
import LogoutSVG from '../../assets/customSVGIcons/headers/LogoutSVG';
import { useEffect, useRef } from 'react';

const HeaderDropdown = ({
  anchorEl,
  setAnchorEl,
  options,
  type,
  setType,
  renderAvatar,
  userDetails,
  setIsLoading,
}) => {
  const menuRef = useRef(null);

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const handleMenuClose = (options) => {
    setAnchorEl(null);
    setType('');
    if (options?.label === 'Accounts') {
      navigate(MANAGE_ACCOUNTS);
    } else if (options?.label === 'Users') {
      navigate(MANAGE_USERS);
    } else if (options?.label === 'Organizations') {
      navigate(MANAGE_ORGANIZATIONS);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        open &&
        menuRef.current &&
        !menuRef.current.contains(event.target) &&
        !anchorEl?.contains(event.target)
      ) {
        handleMenuClose(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, anchorEl]);

  const handleLogout = () => {
    setIsLoading(true);
    const logout_token = LocalStorageHelper.getLogoutToken();
    const payload = { _format: 'json', token: logout_token, logout_status: 1 }; // Handeled to not log event added logout_status 1 
    dispatch(handleLogoutUser(payload))
      .unwrap()
      .then((responseData) => {
        if (responseData) {
          setIsLoading(false);
          navigate(SIGN_IN);
          dispatch({ type: 'LOGOUT' });
        }
      });
    setAnchorEl(null);
    setType('');
  };

  return (
    <Menu
      ref={menuRef}
      anchorEl={anchorEl}
      open={Boolean(anchorEl)}
      onClose={() => handleMenuClose(null)}
      MenuListProps={{
        'aria-labelledby': 'dropdown-button',
        autoFocus: true,
      }}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'right',
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      sx={{
        pointerEvents: 'none',
        '& .MuiPaper-root': { pointerEvents: 'auto' },
      }}
      className="header-account"
    >
      {type === 'manage' ? (
        <>
          <div className="header-account-box">
            <Typography className="header-account-title">Admin</Typography>
          </div>
          {options.map((option) => (
            <MenuItem
              key={option.id}
              onClick={() => handleMenuClose(option)}
              className="dropdown-text header-items"
            >
              <div style={{ display: 'flex', alignItems: 'center' }}>
                {option?.icon && <option.icon />}
                <span style={{ marginLeft: '1rem' }}>{option.label}</span>
              </div>
            </MenuItem>
          ))}
        </>
      ) : (
        <div>
          <div className="header-profile">
            <div className="profile-header">
              <div className="profile-avatar">{renderAvatar()}</div>
              <div className="profile-info">
                <Typography
                  id="profile-name"
                  className="profile-name"
                >{`${userDetails?.field_first_name} ${userDetails?.field_last_name}`}</Typography>
                <Typography id="profile-mail" className="profile-email">
                  {userDetails?.mail}
                </Typography>

                <Divider
                  style={{
                    width: '100%',
                    borderColor: '#0000001F',
                    marginBottom: '5px',
                    marginTop: '5px',
                  }}
                />
              </div>
            </div>
            <div className="profile-description">
              <Typography className="description">{userDetails?.account_name}</Typography>
              <Typography className="role">{userDetails?.roles}</Typography>
            </div>
          </div>
          <div style={{ margin: '0.5rem 0' }}>
            {options?.map((option) => (
              <MenuItem
                key={option.id}
                onClick={() => handleMenuClose(option)}
                className="dropdown-text header-items"
              >
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  {option?.icon ? <option.icon /> : option.image ? <img src={option.image} alt="" /> : null}
                  <span style={{ marginLeft: '1rem' }}>{option.label}</span>
                </div>
              </MenuItem>
            ))}

            <Divider style={{ width: '100%', borderColor: '#0000001F' }} />
            <MenuItem key={'SignOut'} onClick={handleLogout} className="dropdown-text header-items">
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <LogoutSVG />
                <span style={{ marginLeft: '1rem' }}>Sign Out</span>
              </div>
            </MenuItem>
          </div>
        </div>
      )}
    </Menu>
  );
};

HeaderDropdown.propTypes = {
  options: PropTypes.any,
  anchorEl: PropTypes.bool,
  setAnchorEl: PropTypes.func,
  type: PropTypes.string,
  setType: PropTypes.func,
  renderAvatar: PropTypes.func,
  userDetails: PropTypes.any,
  setIsLoading: PropTypes.func,
};

export default HeaderDropdown;
