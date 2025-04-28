import { useState, useEffect, useRef } from 'react';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import PropTypes from 'prop-types';
import MoreVertRoundedIcon from '@mui/icons-material/MoreVertRounded';
import { Box, Divider, Tooltip } from '@mui/material';
import KeyboardArrowDownRoundedIcon from '@mui/icons-material/KeyboardArrowDownRounded';
const ITEM_HEIGHT = 48;

const DropdownMenu = ({
  options = [],
  onOptionSelect,
  buttonAriaLabel = 'more',
  selectedOptionId,
  isMenuDisabled,
  setIsHovered = () => {},
  callBack = () => {},
  className,
  type = '',
}) => {
  const menuRef = useRef(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const [menuPosition, setMenuPosition] = useState({
    vertical: 'bottom',
    horizontal: 'right',
  });
  const open = Boolean(anchorEl);
  const [showAllOptions, setShowAllOptions] = useState(false);
  const initialVisibleCount = type === 'Customer' ? 6 : options.length;
  const handleClick = (event) => {
    const buttonRect = event.currentTarget.getBoundingClientRect();
    const viewportHeight = window.innerHeight;
    const spaceBelow = viewportHeight - buttonRect.bottom;
    const menuHeight = Math.min(ITEM_HEIGHT * 4.5, ITEM_HEIGHT * options.length);

    // If there's not enough space below, position menu above the button
    if (spaceBelow < menuHeight && buttonRect.top > menuHeight) {
      setMenuPosition({
        vertical: 'top',
        horizontal: 'right',
      });
    } else {
      setMenuPosition({
        vertical: 'bottom',
        horizontal: 'right',
      });
    }

    setAnchorEl(event.currentTarget);
    setIsHovered(true);
    setShowAllOptions(false);
    callBack();
  };

  const handleClose = (option) => {
    setIsHovered(false);
    setAnchorEl(null);
    if (option && onOptionSelect) {
      onOptionSelect(option);
    }
  };

  // Reset menu position when closed
  useEffect(() => {
    if (!open) {
      setMenuPosition({
        vertical: 'bottom',
        horizontal: 'right',
      });
      setShowAllOptions(false);
    }
  }, [open]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        open &&
        menuRef.current &&
        !menuRef.current.contains(event.target) &&
        !anchorEl?.contains(event.target)
      ) {
        handleClose(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, anchorEl]);

  const filteredOptions = options.filter(
    (option) => !(isMenuDisabled?.length > 0 && isMenuDisabled.includes(option.label?.toLowerCase()))
  );

  const visibleOptions =
    type === 'Customer' && !showAllOptions ? filteredOptions.slice(0, initialVisibleCount) : filteredOptions;
  return (
    <div ref={menuRef}>
      <Tooltip title="More actions">
        <IconButton
          aria-label={buttonAriaLabel}
          aria-controls={open ? 'dropdown-menu' : undefined}
          aria-expanded={open ? 'true' : undefined}
          aria-haspopup="true"
          onClick={handleClick}
          className="appbar-menu-item"
          sx={{
            backgroundColor: open ? 'var(--dropdown_icon)' : 'transparent',
            borderRadius: '50%',
            transition: 'background-color 0.3s ease',
            '&:hover': { backgroundColor: open ? 'var(--dropdown_icon)' : 'transparent' },
          }}
        >
          <MoreVertRoundedIcon
            className="hover-icon pointer"
            sx={{
              color: open ? 'var(--primary-color)' : 'var(--dropdown_icon_button)',
              '&:hover': { color: open ? 'var(--primary-color)' : 'var(--dropdown_icon_button)' },
            }}
          />
        </IconButton>
      </Tooltip>

      <Menu
        id="dropdown-menu"
        MenuListProps={{
          'aria-labelledby': 'dropdown-button',
        }}
        className={className}
        anchorEl={anchorEl}
        open={open}
        onClose={() => handleClose(null)}
        anchorOrigin={{
          vertical: menuPosition.vertical,
          horizontal: menuPosition.horizontal,
        }}
        transformOrigin={{
          vertical: menuPosition.vertical === 'bottom' ? 'top' : 'bottom',
          horizontal: menuPosition.horizontal,
        }}
        sx={{
          pointerEvents: 'none',
          '& .MuiPaper-root': { pointerEvents: 'auto' },
        }}
        slotProps={{
          paper: {
            style: {
              maxHeight: ITEM_HEIGHT * 4.5,
              minWidth: 134,
            },
          },
        }}
      >
        {visibleOptions.map((option, index) => {
          if (option.label?.toLowerCase() === 'divider') {
            return (
              <Box key={`divider-${index}`} sx={{ padding: '8px 0px' }}>
                <Divider />
              </Box>
            );
          }

          return (
            <MenuItem
              key={option.id}
              selected={option.id === selectedOptionId}
              onClick={() => handleClose(option)}
              onMouseDown={(e) => e.stopPropagation()}
              className="dropdown-text overflow-menu"
            >
              <div style={{ display: 'flex', alignItems: 'center' }}>
                {option?.icon ? <option.icon /> : option.image ? <img src={option.image} alt="" /> : null}
                <span style={{ marginLeft: '16px' }}>{option.label}</span>
              </div>
            </MenuItem>
          );
        })}

        {type === 'Customer' && !showAllOptions && filteredOptions.length > initialVisibleCount && (
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              padding: '8px 109px',
              cursor: 'pointer',
            }}
            onMouseEnter={() => setShowAllOptions(true)}
          >
            <KeyboardArrowDownRoundedIcon fontSize="small" className="hover-icon pointer" />
          </Box>
        )}
      </Menu>
    </div>
  );
};

DropdownMenu.propTypes = {
  options: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      label: PropTypes.string.isRequired,
    })
  ).isRequired,
  onOptionSelect: PropTypes.func,
  buttonAriaLabel: PropTypes.string,
  selectedOptionId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  isMenuDisabled: PropTypes.any,
  callBack: PropTypes.func,
  setIsHovered: PropTypes.func,
  className: PropTypes.string,
  type: PropTypes.string,
};

export default DropdownMenu;
