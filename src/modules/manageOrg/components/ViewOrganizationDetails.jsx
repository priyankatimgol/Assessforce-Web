import { useContext, useEffect, useState } from 'react';
import ASDrawer from '../../../components/mainComponents/ASDrawer';
import { IconButton, Tooltip, Typography, Box, useMediaQuery, Divider } from '@mui/material';
import Grid from '@mui/material/Grid2';
import { orgActions, modalActions } from '../../../utils/constants';
import DropdownMenu from '../../../components/mainComponents/DropdownMenu';
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import SectionHeaders from '../../../components/mainComponents/SectionHeaders';
import { OrganizationDetailsContext } from '../ManageOrganizations';
import CustomAccordion from '../../../components/mainComponents/CustomAccordian';
import { useDispatch } from 'react-redux';
import {
  editOrganizationDetails,
  viewOrganizationDetail,
} from '../../../redux/slice/manageOrganization/ManageOrganizationSlice';
import OrgBuildingSvg from '../../../assets/customSVGIcons/OrgBuildingSvg';
import HistoryIcon from '../../../assets/customSVGIcons/HistoryIcon';
import OrgAccordianIcon from '../../../assets/customSVGIcons/OrgAccordianIcon';
import OrgAccordianBuilding from '../../../assets/customSVGIcons/OrgAccordianBuilding';
import PropTypes from 'prop-types';

const ViewOrganizationDetails = () => {
  const dispatch = useDispatch();
  const ViewOrganizationDetailsContext = useContext(OrganizationDetailsContext);
  const {
    openViewDetails,
    setOpenViewDetails,
    organizationDetails,
    selectedRow,
    setSelectedOption,
    setOpen,
    organizationViewLoader,
    selectedOption,
    setOpenOrganizationHistory,
  } = ViewOrganizationDetailsContext || {};
  const isMobile = useMediaQuery('(max-width:768px)');
  const [resetPasswordAnchor, setResetPasswordAnchor] = useState(false);

  useEffect(() => {
    if (selectedRow?.id) {
      dispatch(viewOrganizationDetail(selectedRow?.id));
    }
  }, [dispatch, selectedRow]);

  const handleEditAccount = (option) => {
    if (selectedRow) {
      if (option === 'Edit') {
        setSelectedOption({ label: 'Edit' });
        setOpen(true);
        dispatch(editOrganizationDetails(selectedRow?.id));
      } else if (option === 'Edits History') {
        setSelectedOption({ label: 'Edits History' });
        setOpenOrganizationHistory(true);
      }
    }
  };

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
    if (option?.label === 'Edit') {
      handleEditAccount('Edit');
    } else if (option?.label === 'Edits History') {
      setSelectedOption({ label: 'Edits History' });
      setOpenOrganizationHistory(true);
    }
  };

  const callBack = () => {
    setResetPasswordAnchor(false);
  };

  const ImageWithRedirect = ({ src, redirectUrl }) => (
    <Box sx={{ width: '115px', height: '42px', padding: '6px 10px' }}>
      <img
        src={src}
        alt=""
        style={{
          width: '100%',
          height: '100%',
          borderRadius: 6,
          objectFit: 'contain',
          cursor: 'pointer',
        }}
        onClick={() => window.open(redirectUrl, '_blank', 'noopener,noreferrer')}
      />
    </Box>
  );
  
  const LabelValueRow = ({ label, value, redirectUrl }) => (
    <>
      <Grid size={{ xs: 4 }}>
        <Typography className="accor-label">{label}</Typography>
      </Grid>
      <Grid size={{ xs: 8 }}>
        {value?.includes('https') && redirectUrl ? (
          <ImageWithRedirect src={value} redirectUrl={redirectUrl} />
        ) : (
          <Typography className="accor-value">{value || '-'}</Typography>
        )}
      </Grid>
    </>
  );

  ImageWithRedirect.propTypes = {
    src: PropTypes.string.isRequired,
    redirectUrl: PropTypes.string.isRequired,
  };

  LabelValueRow.propTypes = {
    label: PropTypes.string,
    value: PropTypes.any,
    redirectUrl: PropTypes.any,
  };
  
  const renderSection = (title, data) => {
    if (!data || (Array.isArray(data) && data.length === 0)) return null;
  
    const groupKeys = [
      'group_orgz_inc_ma_grp',
      'group_orgz_inc_grp',
      'group_orgz_sc_grp',
      'group_orgz_pc_grp',
    ];
  
    return (
      <Grid size={{ xs: 12 }}>
        {Object.entries(data).map(([_, sectionData], index) => (
          <Grid container key={index} marginBottom={2}>
            {sectionData.group_title && (
              <SectionHeaders title={sectionData.group_title} style={{ marginBottom: '16px' }} />
            )}
  
            <Grid size={{ xs: 12 }} marginTop={2}>
              {Object.entries(sectionData).map(([key, value]) => {
                if (key === 'group_title') return null;
  
                const isGroup = groupKeys.includes(key);
  
                return (
                  <Grid container key={key} marginBottom={1}>
                    {isGroup && (
                      <Grid
                        size={{ xs: 12 }}
                        sx={{
                          background: 'var(--section-bg)',
                          borderRadius: '6px',
                          marginBottom: 2,
                        }}
                      >
                        <Typography className="sub-section-header">
                          {value.label || value.group_title || key.replace(/([A-Z])/g, ' $1')}
                        </Typography>
                      </Grid>
                    )}
  
                    {isGroup
                      ? Object.entries(value)
                          .filter(([k]) => k !== 'group_title')
                          .map(([innerKey, innerValue]) => (
                            <LabelValueRow
                              key={innerKey}
                              label={innerValue.label || innerKey.replace(/([A-Z])/g, ' $1')}
                              value={innerValue.value}
                              redirectUrl={innerValue.redirect_url}
                            />
                          ))
                      : (
                        <LabelValueRow
                          label={value.label || key.replace(/([A-Z])/g, ' $1')}
                          value={value.value}
                          redirectUrl={value.redirect_url}
                        />
                      )}
                  </Grid>
                );
              })}
            </Grid>
  
            <Grid size={{ xs: 12 }} sx={{ marginTop: '16px' }}>
              <Divider />
            </Grid>
          </Grid>
        ))}
      </Grid>
    );
  };  

  const renderPrimaryContact = (contactInfo) => {
    return renderSection('Primary Contact Information', contactInfo);
  };

  const renderOrganizationTypeSection = (title, organizationTypeInfo) => {
    if (!organizationTypeInfo || organizationTypeInfo.length === 0) return null;

    // Group items by group_title
    const groupedData = organizationTypeInfo.reduce((acc, item) => {
      const groupTitle = item.group_title || 'Other';

      if (!acc[groupTitle]) {
        acc[groupTitle] = { fields: [], group_status: item.group_status || 0 };
      }

      Object.entries(item).forEach(([key, value]) => {
        if (key !== 'group_title' && key !== 'group_status') {
          acc[groupTitle].fields.push({ key, ...value });
        }
      });
      return acc;
    }, {});

    return (
      <Grid size={{ xs: 12 }}>
        <Box>
          <div style={{ marginBottom: '16px' }}>
            <SectionHeaders title={title} />
          </div>

          {Object.entries(groupedData).map(([groupTitle, { fields, group_status }], index) => (
            <CustomAccordion
              title={groupTitle}
              defaultExpanded={group_status === 1 ? true : false}
              key={index}
              isDisabled={true}
              leftIcon={<OrgAccordianIcon sx={{ height: '20px', width: '20px', marginRight: '20px' }} />}
              expandedIcon={
                <OrgAccordianBuilding sx={{ height: '20px', width: '20px', marginRight: '20px' }} />
              }
            >
              {fields.map((field, fieldIndex) => (
                <Grid container spacing={2} margin="16px 0" key={fieldIndex}>
                  <Grid size={{ xs: 4 }}>
                    <Typography className="aaa">
                      {field.label || field.key.replace(/([A-Z])/g, ' $1')}
                    </Typography>
                  </Grid>
                  <Grid size={{ xs: 8 }}>
                    {field?.value?.includes('https') && field?.redirect_url && field?.redirect_url !== '' ? (
                      <Box sx={{ width: '115px', height: '42px', padding: '6px 10px' }}>
                        <img
                          src={field.value}
                          alt=""
                          style={{
                            width: '100%',
                            height: '100%',
                            borderRadius: 6,
                            objectFit: 'contain',
                            cursor: 'pointer',
                          }}
                          onClick={() => window.open(field?.redirect_url, '_blank', 'noopener,noreferrer')}
                        />
                      </Box>
                    ) : (
                      <Typography className="bbb">{field.value || '-'}</Typography>
                    )}
                  </Grid>
                </Grid>
              ))}
            </CustomAccordion>
          ))}
        </Box>
      </Grid>
    );
  };

  return (
    <>
      <ASDrawer
        {...{
          open: openViewDetails,
          setOpen: setOpenViewDetails,
          action: 'View',
          headerName: 'Organization Details',
          showFooter: false,
          headerImage: OrgBuildingSvg,
          rightIcons: (
            <div style={{ gap: 3, fontFamily: 'inter-regular' }} className="items-center">
              {!isMobile && (
                <Tooltip title="Edit organization">
                  <IconButton aria-haspopup="true" onClick={() => handleEditAccount('Edit')}>
                    <EditRoundedIcon className="hover-icon pointer" />
                  </IconButton>
                </Tooltip>
              )}
              {!isMobile && (
                <Tooltip title="View edits history">
                  <IconButton aria-haspopup="true" onClick={() => handleEditAccount('Edits History')}>
                    <HistoryIcon className="hover-icon pointer" />
                  </IconButton>
                </Tooltip>
              )}
              {/* <DropdownMenu options={modalActions || []} onOptionSelect={() => {}} selectedOption={null} /> */}
              <div className="view_modal_dropdown_icon">
                <DropdownMenu
                  options={
                    isMobile ? orgActions?.filter((item) => item.label !== 'View') : modalActions || []
                  }
                  onOptionSelect={(option) => handleOptionSelect(option)}
                  selectedOption={selectedOption}
                  callBack={callBack}
                />
              </div>
            </div>
          ),
        }}
        mainLoader={organizationViewLoader}
      >
        <Grid container size={{ xs: 12 }}>
          {/* Render sections dynamically */}
          {organizationDetails?.organizations?.info_type &&
            renderSection('Information Type', organizationDetails.organizations.info_type)}

          {/* Primary Contact Section */}
          {organizationDetails?.primaryContact && renderPrimaryContact(organizationDetails.primaryContact)}

          {/* Organization Type Section */}
          {organizationDetails?.organizations?.organization_type &&
            renderOrganizationTypeSection(
              'Organization Type',
              organizationDetails.organizations.organization_type
            )}
        </Grid>
      </ASDrawer>
    </>
  );
};

export default ViewOrganizationDetails;
