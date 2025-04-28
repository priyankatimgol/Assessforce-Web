import { Tabs, Tab, IconButton, Menu, MenuItem } from '@mui/material';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import PropTypes from 'prop-types';
const CommonTabs = ({ tabList, extraTabs, activeTab, onChange, onClick, menuAnchor, setMenuAnchor }) => {
  const isMenuOpen = Boolean(menuAnchor);

  return (
    <>
      <Tabs
        value={activeTab?.index}
        onChange={onChange}
        variant="scrollable"
        scrollButtons="auto"
        sx={{ marginBottom: 2, flexGrow: 1, overflow: 'visible', borderBottom: '1px solid #c1c1c1' }}
      >
        {tabList?.map((tab, index) => (
          <Tab
            key={tab.key}
            label={tab.label}
            value={index}
            sx={{
              fontFamily: 'inter-medium',
              fontSize: '0.75rem',
              lineHeight: '18px',
              paddingBottom: '0px',
              color: activeTab?.key === tab?.key ? 'var(--primary-color)' : 'var(--text-secondary-color)',
            }}
          />
        ))}
      </Tabs>

      <IconButton
        onClick={(e) => setMenuAnchor(e.currentTarget)}
        sx={{
          padding: '2px',
          position: 'relative',
          '&::after': {
            content: '""',
            position: 'absolute',
            width: '100%',
            height: '2px',
            bottom: '-2.50px',
            left: 0,
            borderBottom: '1px solid #c1c1c1',
          },
        }}
      >
        <MoreHorizIcon />
      </IconButton>
      <Menu anchorEl={menuAnchor} open={isMenuOpen} onClose={() => setMenuAnchor(null)}>
        {extraTabs?.map((tab) => (
          <MenuItem key={tab.key} onClick={onClick}>
            {tab.label}
          </MenuItem>
        ))}
      </Menu>
    </>
  );
};

CommonTabs.propTypes = {
  tabList: PropTypes.array.isRequired,
  extraTabs: PropTypes.array,
  activeTab: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
  onClick: PropTypes.func.isRequired,
  menuAnchor: PropTypes.func,
  setMenuAnchor: PropTypes.func,
};
export default CommonTabs;
