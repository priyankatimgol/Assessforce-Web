import { useEffect, useState } from 'react';
import {
  Avatar,
  Typography,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Box,
  IconButton,
  Popover,
} from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import PersonIcon from '@mui/icons-material/Person';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Grid from '@mui/material/Grid2';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { gethouseholdCardData } from '../../redux/slice/manageCustomers/ManageCustomersSlice';

const HouseholdCard = () => {
  const dispatch = useDispatch();
  const [anchorEl, setAnchorEl] = useState(null);
  const location = useLocation();
  const state = location.state;

  const { importHouseholdCardData } = useSelector((state) => state?.manageCustomers);

  useEffect(() => {
    if (state?.id) {
      dispatch(gethouseholdCardData(state?.id));
    }
  }, [state?.id]);

  const Not_In_Household_Data = importHouseholdCardData?.data?.household_members.reduce((acc, member) => {
    if (member.field_hm_status_v2 === 'Not in household') {
      acc[member.profile_id] = {
        type: member.type,
        full_name: member.full_name,
        field_relationship_to_hoh: member.field_relationship_to_hoh,
        field_hm_status_v2: 'Not in household',
      };
    }
    return acc;
  }, { label: 'Not In Household' });

  const In_Household_Data = importHouseholdCardData?.data?.household_members.reduce((acc, member) => {
    if (member.field_hm_status_v2 === 'In household') {
      acc[member.profile_id] = {
        type: member.type,
        full_name: member.full_name,
        field_relationship_to_hoh: member.field_relationship_to_hoh,
        field_hm_status_v2: 'In household',
      };
    }
    return acc;
  }, { label: 'In Household' });

  const householdCardData = {
    data: {
      hoh_details: {
        type: importHouseholdCardData?.data?.customer_profile?.type || '',
        full_name: importHouseholdCardData?.data?.customer_profile?.full_name || '',
      },
      household_members: {
        not_in_household: Not_In_Household_Data || {},
        in_household: In_Household_Data || {},
      },
    },
  };

  const headOfHousehold = {
    name: householdCardData.data.hoh_details.full_name,
    role: householdCardData.data.hoh_details.type,
    initials: householdCardData.data.hoh_details.full_name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase(),
  };

  const sections = Object.values(householdCardData.data.household_members).map((section) => ({
    label: section.label,
    members: Object.values(section).filter((entry) => typeof entry === 'object' && entry.full_name),
  }));

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'household-popover' : undefined;

  return (
    <Grid>
      {/* Profile Header with Popover */}
      <Grid sx={{ display: 'flex', gap: '10px', width: 'max-content', alignItems: 'end' }}>
        <Grid
          sx={{
            alignContent: 'center',
            width: '23px',
            height: '23px',
            alignItems: 'center',
            textAlign: 'center',
            borderRadius: '100px',
            backgroundColor: 'var(--avatar-base-ASF-amber)',
          }}
        >
          <Typography
            sx={{
              color: 'var(--background-paper-elevation-0)',
              textAlign: 'center',
              fontFamily: 'inter-regular',
              fontSize: '0.625rem',
              lineHeight: '10px',
            }}
          >
            {importHouseholdCardData?.data?.login_details?.initials || ''}
          </Typography>
        </Grid>

        <Typography
          sx={{
            color: 'var(--heading-color)',
            fontFamily: 'inter-semibold',
            fontSize: '1.125rem',
            lineHeight: '150%',
            marginTop: '10px',
          }}
        >
          {importHouseholdCardData?.data?.login_details?.full_name || ''}
        </Typography>

        <IconButton sx={{ padding: '0px!important', cursor: 'pointer' }} onClick={handleClick}>
          <ExpandMoreIcon />
        </IconButton>
      </Grid>

      {/* Popover for Household Members */}
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        transformOrigin={{ vertical: 'top', horizontal: 'center' }}
        sx={{ borderRadius: '4px' }}
      >
        <Box sx={{ p: 2, minWidth: 227, maxWidth: 227, height: 287 }}>
          <ListItem sx={{ p: 0 }}>
            <Avatar
              sx={{
                bgcolor: 'var(--primary-color)',
                boxShadow: 2,
                fontSize: '1.5rem',
                mr: '10px',
              }}
            >
              <AccountCircleIcon />
            </Avatar>

            <ListItemText
              primary={headOfHousehold.name}
              secondary={headOfHousehold.role}
              slotProps={{
                primary: {
                  sx: {
                    color: 'var(--heading-color)',
                    fontFamily: 'inter-semibold',
                    fontSize: '0.875rem',
                    lineHeight: '20px',
                  },
                },
                secondary: {
                  sx: {
                    color: 'var(--text-secondary-color)',
                    fontFamily: 'inter-regular',
                    fontSize: '0.625rem',
                    lineHeight: '15px',
                  },
                },
              }}
            />
          </ListItem>

          {/* Dynamically render all household sections */}
          {sections.map((section, idx) => (
            <Box key={idx} sx={{ mt: idx === 0 ? '20px' : 0 }}>
              <Typography className="parent-value">
                {section.label || 'No Household Members'}
              </Typography>

              <List className="household-list" sx={{ marginLeft: '10px' }}>
                {section.members.map((member, index) => (
                  <ListItem
                    key={index}
                    sx={{
                      paddingTop: '0px !important',
                      paddingBottom: '0px !important',
                      paddingLeft: '0px !important',
                    }}
                  >
                    <div className="middleBorder" />

                    <ListItemAvatar sx={{ minWidth: '28px' }}>
                      <Avatar sx={{ bgcolor: 'lightblue', width: 18, height: 18 }}>
                        <PersonIcon fontSize="small" />
                      </Avatar>
                    </ListItemAvatar>

                    <ListItemText
                      primary={member.full_name || ''}
                      secondary={member.field_relationship_to_hoh || ''}
                      slotProps={{
                        primary: {
                          style: {
                            color: 'var(--heading-color)',
                            fontFamily: 'inter-regular',
                            fontSize: '0.75rem',
                            lineHeight: '18px',
                            marginTop: '10px',
                          },
                        },
                        secondary: {
                          style: {
                            color: 'var(--text-secondary-color)',
                            fontFamily: 'inter-regular',
                            fontSize: '0.625rem',
                            lineHeight: '15px',
                          },
                        },
                      }}
                    />
                  </ListItem>
                ))}
              </List>
            </Box>
          ))}
        </Box>
      </Popover>
    </Grid>
  );
};

export default HouseholdCard;
