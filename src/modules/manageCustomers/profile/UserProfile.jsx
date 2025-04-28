import { createContext, useEffect, useState } from 'react';
import { Typography, Box, Chip, IconButton } from '@mui/material';
import Grid from '@mui/material/Grid2';
import ASButton from '../../../components/mainComponents/ASButton';
import { useDispatch, useSelector } from 'react-redux';
import EditsHistory from '../components/EditsHistory';
import { getUserProfile } from '../../../redux/slice/manageCustomers/ManageCustomersSlice';
import ActivityHistory from '../components/ActivityHistory';
import { ActivityHistoryContext, EditHistoryContext, RequestEditsHistoryContext, UserProfileContext } from '../ManageCustomers';
import RequestEdits from '../components/RequestEdits';
import RequestedEditsHistory from '../components/RequestedEditsHistory';
import { useLocation } from 'react-router-dom';
import SectionHeaders from '../../../components/mainComponents/SectionHeaders';
import RequestEditHistoryIcon from '../../../assets/customSVGIcons/customer/RequestEditHistoryIcon';
import ButtonIconRenderer from '../helper/ButtonIconRenderer';
import AvatarIcon from '../../../assets/customSVGIcons/customer/AvatarIcon';

const UserProfile = () => {
  const dispatch = useDispatch();
  const { state } = useLocation();
  const { customerUserProfileData } = useSelector((state) => state?.manageCustomers);
  const { user_data, buttons, profile_data } = customerUserProfileData || {};
  const [openEditsHistory, setOpenEditsHistory] = useState(false);
  const [openReqHistoryFromProfile, setOpenReqHistoryFromProfile] = useState(false);
  const [selectedOptionForEdit, setSelectedOptionForEdit] = useState(null);
  const [openRequestedEditsHistory, setOpenRequestedEditsHistory] = useState(false);
  const [openActivityHistory, setOpenActivityHistory] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);

  const OPTIONS = {
    REQ_EDIT: 'ReqEdits',
    EDITS_HISTORY: 'EDITS_HISTORY',
    REQUEST_EDITS_HISTORY: 'REQUEST_EDITS_HISTORY',
  };

  useEffect(() => {
    if (state?.id) {
      dispatch(getUserProfile(state?.id));
    }
  }, [dispatch, state]);

  const handleRequestEdits = (button) => {
    if (button.title === 'Request Edit') {
      setSelectedOption({ label: OPTIONS.REQ_EDIT, value: OPTIONS.REQ_EDIT });
      setOpenReqHistoryFromProfile(true);
    } else if (button.title === 'Edits History') {
      setOpenEditsHistory(true);
      setSelectedOption(button);
    } else if (button.title === 'Request Edit History') {
      setOpenRequestedEditsHistory(true);
      setSelectedOption(button);
    } else if (button.title === 'Activity History') {
      setOpenActivityHistory(true); 
      setSelectedOption(button);
    }
    setSelectedOptionForEdit(null);
  };

  const transformCustomerData = (rawData) => {
    if (rawData && typeof rawData === 'object') {
      return Object.entries(rawData).map(([groupKey, group]) => {
        let subsectionEntries = Object.entries(group).filter(([key]) => key !== 'group_title');

        // Skip the first subsection only if the group key(machine_name) is 'group_basic_customer_info'
        if (groupKey === 'group_basic_customer_info') {
          subsectionEntries = subsectionEntries.slice(1);
        }

        const subsections = subsectionEntries.map(([_, subsection]) => {
          const fields = Object.entries(subsection)
            .filter(([key]) => key.startsWith('field_'))
            .map(([_, fieldData]) => fieldData);

          return {
            sub_title: subsection.group_title || '',
            field_data: fields,
          };
        });

        return {
          title: group.group_title,
          subsections,
        };
      });
    }
    return [];
  };

  const sectionInfo = transformCustomerData(user_data);
  const firstGroupKey = Object.keys(user_data || {})?.[0];
  const basicInformationDetails = user_data?.[firstGroupKey]?.basic_info_fields || {};

  return (
    <>
      <UserProfileContext.Provider
        value={{
          openReqEdit: openReqHistoryFromProfile,
          setOpenReqEdit: setOpenReqHistoryFromProfile,
          selectedOption,
          selectedOptionForEdit,
          setSelectedOption,
        }}
      >
        <RequestEdits />
      </UserProfileContext.Provider>

      <RequestEditsHistoryContext.Provider
        value={{
          openRequestedEditsHistory,
          setOpenRequestedEditsHistory,
        }}
      >
        <RequestedEditsHistory />
      </RequestEditsHistoryContext.Provider>

      <EditHistoryContext.Provider
        value={{ openEditsHistory, setOpenEditsHistory, selectedOption, selectedOptionForEdit }}
      >
        <EditsHistory />
      </EditHistoryContext.Provider>

      <ActivityHistoryContext.Provider
        value={{ openActivityHistory, setOpenActivityHistory, selectedOption }}
      >
        <ActivityHistory />
      </ActivityHistoryContext.Provider>

      {/* {user information} */}

      <Grid container spacing={2} alignItems="flex-start" justifyContent="space-between">
        <Grid
          item
          xs={12}
          sx={{
            display: 'flex',
            gap: '16px',
            alignItems: 'center',
            mb: { xs: 2, md: 0 },
          }}
        >
          <div style={{ marginBottom: '-40px', marginLeft: '-3px' }}>
            {' '}
            <AvatarIcon />
          </div>

          <Grid>
            <Typography
              color="inherit"
              sx={{
                mb: '5px',
                color: 'var(--text-primary)',
                fontFamily: 'inter-medium',
                fontSize: '1rem',
                lineHeight: '150%',
              }}
            >
              {profile_data?.value}
            </Typography>
            <Chip
              label={profile_data?.type}
              size="small"
              sx={{
                color: 'var(--error-contrastText)',
                fontFamily: 'inter-regular',
                fontSize: '0.625rem',
                lineHeight: '13.5px ',
                letterSpacing: '0.12px',
                borderRadius: '75px ',
                backgroundColor: 'var(--danger-color)',
                padding: '3px 4px',
              }}
            />
          </Grid>
        </Grid>

        <Grid sx={{ gap: '10px', display: 'flex' }}>
          {Object.values(buttons || {})?.map((button, index) => (
            <ASButton
              key={index}
              variant="outlined"
              onClick={() => {
                handleRequestEdits(button);
              }}
              startIcon={<ButtonIconRenderer type={button?.title} />}
              style={{
                textTransform: 'capitalize',
                color: 'var(--primary-color)',
                fontSize: '0.813rem',
                lineHeight: '20px',
                fontFamily: 'inter-medium',
              }}
            >
              {button.title}
            </ASButton>
          ))}
        </Grid>
      </Grid>

      <Grid
        container
        spacing={5}
        sx={{
          mt: 1,
          padding: '40px 20px 30px 20px',
          backgroundColor: 'var(--profile-tab-bg)',
          borderRadius: '4px',
        }}
      >
        {Object.values(basicInformationDetails || {}).map((data, index) => (
          <Grid key={index} size={{ xs: 12, md: 3 }}>
            <Grid sx={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
              {data.class && (
               <ButtonIconRenderer type={data.class} />
              )}
              <Typography
                sx={{
                  lineHeight: '20px',
                  color: 'var(--muted-text)',
                  fontFamily: 'inter-semibold',
                  fontSize: '0.875rem',
                }}
              >
                {data.label}
              </Typography>
            </Grid>
            <Typography
              sx={{
                lineHeight: '20px',
                fontFamily: 'inter-regular',
                color: 'var(--heading-color)',
                fontSize: '0.875rem',
                marginTop: '6px ',
              }}
            >
              {data.value || '-'}
            </Typography>
          </Grid>
        ))}
      </Grid>

      {/* {Address information} */}
      <Grid>
        {sectionInfo?.map((section, index) => {
          if (index === 0) return;

          return (
            <Grid
              key={index}
              sx={{
                bgcolor: 'background.default',
                borderRadius: '4px',
                border: '1px solid var(--profile-add-info)',
                padding: '10px 20px 20px 20px',
                marginTop: '30px',
              }}
            >
              <SectionHeaders title={section.title} />
              {section.subsections.map((subsection, subIndex) => (
                <Grid
                  container
                  key={subIndex}
                  sx={{
                    mt: '16px',
                    gap: '10px',
                  }}
                >
                  <Typography
                    sx={{
                      color: 'var(--helper-text-color)',
                      fontSize: '0.75rem',
                      fontFamily: 'inter-medium',
                    }}
                  >
                    {subsection.sub_title}
                  </Typography>
                  <Grid
                    container
                    spacing={2}
                    sx={{
                      display: 'flex',
                      flexWrap: 'wrap',
                      backgroundColor: 'var(--primary-icon-hover)',
                      padding: '20px',
                      borderRadius: '4px',
                    }}
                  >
                    {subsection.field_data.map((field, fieldIndex) => (
                      <Grid key={fieldIndex} size={{ xs: 12, md: 6 }}>
                        <Grid sx={{ columnGap: '30px', display: 'flex', alignItems: 'center' }}>
                          <Typography
                            sx={{
                              minWidth: '147px',
                              wordBreak: 'break-all',
                              color: 'var(--text-secondary-color)',
                              fontSize: '0.75rem',
                              fontFamily: 'inter-regular',
                            }}
                          >
                            {field?.label}
                          </Typography>

                          <Typography
                            sx={{
                              minWidth: '318px',
                              wordBreak: 'break-all',
                              color: 'var(--heading-color)',
                              fontSize: '0.875rem',
                              fontFamily: 'inter-regular',
                            }}
                          >
                            {field?.value || '-'}
                          </Typography>
                        </Grid>
                      </Grid>
                    ))}
                  </Grid>
                </Grid>
              ))}
            </Grid>
          );
        })}
      </Grid>
    </>
  );
};

export default UserProfile;
