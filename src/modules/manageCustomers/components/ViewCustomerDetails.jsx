import { useContext, useEffect } from 'react';
import ASDrawer from '../../../components/mainComponents/ASDrawer';
import { Chip, Divider, IconButton, Tooltip, Typography, useMediaQuery } from '@mui/material';
import { modalActions, viewCustomerDetailsActions } from '../../../utils/constants';
import DropdownMenu from '../../../components/mainComponents/DropdownMenu';
import SectionHeaders from '../../../components/mainComponents/SectionHeaders';
import { useDispatch } from 'react-redux';
import {
  editCustomerDetails,
  getRequestEditsHistory,
  viewCustomerDetail,
} from '../../../redux/slice/manageCustomers/ManageCustomersSlice';
import { CustomersDetailsContext } from '../ManageCustomers';
import Grid from '@mui/material/Grid2';
import EditCustomerIcon from '../../../assets/customSVGIcons/customer/EditCustomerIcon';
import RequestEditHistoryIcon from '../../../assets/customSVGIcons/customer/RequestEditHistoryIcon';
import PropTypes from 'prop-types';
import UserImage from '../../../assets/customSVGIcons/customer/UserImage';

// eslint-disable-next-line react-refresh/only-export-components
export const renderChipByType = (type) => {
  const formattedType = String(type)?.toLocaleLowerCase();
  switch (formattedType) {
    case 'imported': return {
      label: type,
      color: 'error'
    }
    case 'created': return {
      label: type,
      color: 'success',
    }
    case 'hm': return {
      label: type,
      color: 'warning'
    }
    default: return {
      label: '',
      color: 'error',
    }
  }
}

const ViewCustomerDetails = () => {
  const dispatch = useDispatch();
  const ViewCustomerDetailsContext = useContext(CustomersDetailsContext);
  const {
    openViewDetails,
    setOpenViewDetails,
    customerDetails,
    selectedRow,
    setSelectedOption,
    selectedOption,
    customerViewLoader,
    selectedOptionForEdit,
    setOpenReqEdit,
    setOpenRequestedEditsHistory,
  } = ViewCustomerDetailsContext || {};
  const isMobile = useMediaQuery('(max-width:768px)');

  useEffect(() => {
    if (selectedRow?.profile_id) {
      dispatch(viewCustomerDetail(selectedRow?.profile_id));
    }
  }, [dispatch, selectedRow?.profile_id]);

  useEffect(() => {
    if (
      open === true &&
      selectedOption?.label === 'View' &&
      selectedRow?.profile_id &&
      selectedOptionForEdit === 'Created'
    ) {
      dispatch(editCustomerDetails(selectedRow?.profile_id));
    }
  }, [dispatch, selectedOption?.label, selectedOptionForEdit, selectedRow?.profile_id, open]);


  const handleDrawerNavigations = (option) => {
    if (selectedRow) {
      if (option === 'ReqEdits') {
        setSelectedOption({ label: 'ReqEdits' });
        setOpenReqEdit(true);
      } else if (option === 'REQUEST_EDITS_HISTORY') {
        dispatch(getRequestEditsHistory(selectedRow?.uid));
        setSelectedOption({ label: 'REQUEST_EDITS_HISTORY' });
        setOpenRequestedEditsHistory(true);
      }
    }
  };


  const handleOptionSelect = (option) => {
    setSelectedOption(option);
    if (option?.label === 'Request edits') {
      setOpenReqEdit(true);
    } else if (option?.label === 'View requested edits history') {
      setOpenRequestedEditsHistory(true);
    }
  };

  const LabelValueRow = ({ label, value }) => (
    <>
      <Grid size={{ xs: 4 }}>
        <Typography className="accor-label">{label}</Typography>
      </Grid>
      <Grid size={{ xs: 8 }}>
        <Typography className="accor-value">{value || '-'}</Typography>
      </Grid>
    </>
  );

  LabelValueRow.propTypes = {
    label: PropTypes.string,
    value: PropTypes.any,
    redirectUrl: PropTypes.any,
  };

  const renderSection = (title, data) => {
    if (!data || (Array.isArray(data) && data.length === 0)) return null;

    const groupKeys = [
      'group_border_div_2',
      'group_border_div_3',
      'group_border_div_4',
      'group_border_div_5',
      'basic_info_fields',
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
                    {!['basic_info_fields']?.includes(key) && isGroup && (
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

  const finalChipColor = renderChipByType(selectedRow?.type);

  return (
    <>
      <ASDrawer
        {...{
          open: openViewDetails,
          setOpen: setOpenViewDetails,
          action: 'View',
          headerName: 'Customer',
          showFooter: false,
          headerImage: UserImage,
          width: '50rem',
          leftIcons: (
            <div className="responsive-chip">
              <Chip
                variant="filled"
                color={finalChipColor?.color}
                label={finalChipColor?.label}
                size="small"
                sx={{ padding: '3px 4px' }}
              />
            </div>
          ),
          rightIcons: (
            <div style={{ gap: 3, fontFamily: 'inter-regular' }} className="items-center">
              {!isMobile && (
                <Tooltip title="Request edits">
                  <IconButton aria-haspopup="true" onClick={() => handleDrawerNavigations('ReqEdits')}>
                    <EditCustomerIcon className="hover-icon pointer" color='currentColor' />
                  </IconButton>
                </Tooltip>
              )}
              {!isMobile && (
                <Tooltip title="View requested edits history">
                  <IconButton aria-haspopup="true" onClick={() => handleDrawerNavigations('REQUEST_EDITS_HISTORY')}>
                    <RequestEditHistoryIcon className="hover-icon pointer" color='currentColor' />
                  </IconButton>
                </Tooltip>
              )}
              {/* <DropdownMenu options={modalActions || []} onOptionSelect={() => {}} selectedOption={null} /> */}
              <div className="view_modal_dropdown_icon">
                <DropdownMenu
                  options={isMobile ? viewCustomerDetailsActions : modalActions || []}
                  onOptionSelect={(option) => handleOptionSelect(option)}
                  selectedOption={selectedOption}
                // callBack={callBack}
                />
              </div>
            </div>
          ),
        }}
        mainLoader={customerViewLoader}
        width="42.5rem"
      >
        <Grid container spacing={2}>
          {customerDetails?.data?.customers?.info_type &&
            renderSection('Information Type', customerDetails.data.customers.info_type)}
        </Grid>
      </ASDrawer>
    </>
  );
};

export default ViewCustomerDetails;
