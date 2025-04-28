import { useContext, useMemo, useState, useEffect, useCallback } from 'react';
import { Box, Button, Chip, Divider, FormHelperText, Tooltip, Typography } from '@mui/material';
import Grid from '@mui/material/Grid2';
import ASDrawer from '../../../components/mainComponents/ASDrawer';
import caTree from '../../../assets/images/caTree.svg';
import { AccountContext } from '../ManageAccounts';
import CustomOutlinedInput from '../../../components/CustomOutlinedInput';
import CustomDatePicker from '../../../components/CustomDatePicker';
import ASTable from '../../../components/mainComponents/ASTable';
import {
  clearEditInfoDetails,
  clearEditedData,
  createNewAccount,
  saveEditedAccountDetails,
} from '../../../redux/slice/manageAccounts/ManageAccountsSlice';
import ASAutocomplete from '../../../components/mainComponents/ASAutocomplete';
import { useDispatch, useSelector } from 'react-redux';
import dayjs from 'dayjs';
import { validateForm } from '../helpers/createAndEditFormValidations';
import ErrorIcon from '@mui/icons-material/Error';
import { modalActions } from '../../../utils/constants';
import DropdownMenu from '../../../components/mainComponents/DropdownMenu';
import SectionHeaders from '../../../components/mainComponents/SectionHeaders';
import RequiredMessage from '../../../components/mainComponents/RequiredMessage';
import { useSnackbar } from '../../../context/SnackbarContext';
import ExpandMoreRoundedIcon from '@mui/icons-material/ExpandMoreRounded';
import EFormDelete from '../../../assets/customSVGIcons/EFormDelete';

const AddEditAccount = () => {
  const dispatch = useDispatch();
  const { showSnackbar } = useSnackbar();
  const accountContext = useContext(AccountContext);
  const { open, setOpen, selectedOption, selectedRow } = accountContext || {};
  const {
    editAccountDetailsData,
    formFields,
    createEditAccountLoader,
    editInfoLoader,
    editAccountLoader,
    editInfoDetails,
    createAccountDetails,
  } = useSelector((state) => state?.manageAccounts || {});
  const { currentEnv } = useSelector((state) => state?.authenticationSlice);

  const [parentOptions, setParentOptions] = useState([]);
  const [isRowDeletion, setIsRowDeletion] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    displayName: '',
    parent: null,
    userCapOverride: '',
    // activationDate:
    //   selectedOption?.label !== 'Edit'
    //     ? dayjs().tz(currentEnv?.time_zone)
    //     : dayjs('invalid').tz(currentEnv?.time_zone),
    activationDate: null,
    eformsAccess: [],
  });
  const [rows, setRows] = useState([]);
  const [idCounter, setIdCounter] = useState(0);
  const [validationErrors, setValidationErrors] = useState({});
  const [EformErrors, setEformErrors] = useState([]);
  const [isValidationTriggered, setIsValidationTriggered] = useState(false);

  const handleValidationScroll = useCallback(() => {
    if (Object.keys(validationErrors).length > 0) {
      const firstErrorField = Object.keys(validationErrors)[0];
      const errorElement = document.getElementById(firstErrorField);
      if (errorElement) {
        errorElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }
  }, [validationErrors]);

  //Scroll to the first field of the form on the errors.
  useEffect(() => {
    if (isValidationTriggered && Object.keys(validationErrors).length > 0 && !isRowDeletion) {
      handleValidationScroll();
      setIsRowDeletion(false);
    }
  }, [validationErrors, isValidationTriggered, handleValidationScroll, isRowDeletion]);

  useEffect(() => {
    if (selectedOption?.label === 'Edit' && editAccountDetailsData) {
      const entryParentData = editAccountDetailsData?.field_parent_option?.options;
      const finalParentOptions = entryParentData
        ? entryParentData.map((item) => {
            const [value, label] = Object.entries(item)[0];
            return { value, label };
          })
        : [];

      const parentLabel = formFields?.parentOptions.find(
        (item) => item?.value === editAccountDetailsData?.field_parent_name
      );
      setParentOptions(finalParentOptions);

      setFormData({
        name: editAccountDetailsData?.title || '',
        displayName: editAccountDetailsData?.field_node_name || '',
        parent: parentLabel?.label || null,
        userCapOverride:
          editAccountDetailsData?.user_cap_settings_level === 2 ? editAccountDetailsData?.field_user_cap : '',
        activationDate:
          editAccountDetailsData?.status?.toLowerCase() === 'active'
            ? dayjs(new Date(editAccountDetailsData?.field_deactivated_date_node))?.tz(currentEnv.time_zone)
            : dayjs(new Date(editAccountDetailsData?.field_date_node))?.tz(currentEnv.time_zone),
        eformsAccess: [],
      });
    } else if (open && formFields && selectedOption?.label === 'Create') {
      setParentOptions(formFields?.parentOptions);
      setFormData({
        ...formData,
        //activationDate: dayjs().tz(currentEnv?.time_zone),
      });
    }

    return () => {
      setFormData({
        name: '',
        displayName: '',
        parent: null,
        userCapOverride: '',
        // activationDate:
        //   selectedOption?.label !== 'Edit'
        //     ? dayjs().tz(currentEnv?.time_zone)
        //     : dayjs('invalid').tz(currentEnv?.time_zone),
        eformsAccess: [],
      });
      setParentOptions([]);
      setRows([]);
      setValidationErrors({});
      setEformErrors([]);
      setIsValidationTriggered(false);
    };
  }, [selectedOption, editAccountDetailsData, open, formFields]);

  useEffect(() => {
    if (formFields && selectedOption?.label !== 'Edit') {
      setParentOptions(formFields?.parentOptions);
    }
  }, [formFields]);

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleAddRow = () => {
    setRows((prevRows) => [
      ...prevRows,
      {
        id: idCounter,
        type: 'Select',
        eform: 'Select',
        access: 'Select',
        eformOptions: [],
      },
    ]);
    setIdCounter((prevCounter) => prevCounter + 1);
    // if (validationErrors && isValidationTriggered) {
    //   setValidationErrors({ ...validationErrors, eForm: 'All fields are required' });
    // }
  };

  useEffect(() => {
    const updatedRows = rows.map((row) => {
      const eformOptions = row.type ? formFields?.allFields?.[row.type] || [] : [];
      if (row.eformOptions !== eformOptions) {
        return { ...row, eformOptions };
      }
      return row;
    });

    if (updatedRows.length !== rows.length || updatedRows.some((row, index) => row !== rows[index])) {
      setRows(updatedRows);
    }
  }, [formFields?.allFields, rows]);

  useEffect(() => {
    const newRows = [];
    const eforms = editAccountDetailsData?.entity_permissions || {};
    let localCounter = idCounter;

    Object.keys(eforms).forEach((key) => {
      eforms[key].forEach((item) => {
        newRows.push({
          id: localCounter++,
          type: item?.type || '',
          eform: item?.id || '',
          access: item?.access || '',
          eformOptions: formFields?.allFields?.[item?.type] || [],
        });
      });
    });

    setIdCounter(localCounter);
    setRows(
      newRows.map((item) => ({
        ...item,
        access: item?.access,
      }))
    );

    return () => {
      setRows([]);
      setValidationErrors({});
      setEformErrors([]);
    };
  }, [editAccountDetailsData]);

  const handleDeleteRow = (id) => {
    setIsRowDeletion(true);
    setRows((prevRows) => {
      const updatedRows = prevRows.filter((row) => row.id !== id);
      setValidationErrors((prevErrors) => {
        const updatedErrors = { ...prevErrors };
        if (updatedRows.length === 0) {
          delete updatedErrors.eForm;
        } else {
          const hasEmptyFields = updatedRows.some((row) =>
            ['type', 'eform', 'access'].some((field) => !row[field] || row[field] === 'Select')
          );

          if (hasEmptyFields && isValidationTriggered) {
            updatedErrors.eForm = 'All fields are required';
          } else {
            delete updatedErrors.eForm;
          }
        }

        return updatedErrors;
      });

      return updatedRows;
    });
  };

  const columns = [
    {
      field: 'type',
      headerName: (
        <Box display="flex" alignItems="flex-start">
          <Box component="span" sx={{ textTransform: 'uppercase', fontSize: '0.75rem' }}>
            TYPE
          </Box>
          <Box
            component="span"
            sx={{
              marginLeft: '2px',
              alignSelf: 'flex-start',
              borderRight: 'none',
              fontFamily: 'inter-regular',
            }}
          >
            *
          </Box>
        </Box>
      ),
      width: 150,
      align: 'left',
      editable: true,
      type: 'singleSelect',
      valueOptions: ['Select', ...(Array.isArray(formFields?.typeOptions) ? formFields.typeOptions : [])],
      renderCell: (params) => {
        const selectedValue = params.value;
        const option = (formFields?.typeOptions || []).find((option) => option.value === selectedValue);
        const label = option ? option.label : selectedValue;
        return (
          <Box style={{ height: '100%' }} className="items-center">
            <span
              style={{
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                width: '100%',
                cursor: 'pointer',
              }}
            >
              {label}
            </span>
            <ExpandMoreRoundedIcon sx={{ color: 'var(--text-secondary-color)' }} />
          </Box>
        );
      },
      cellClassName: (params) => {
        if (EformErrors.length > 0 && EformErrors[params.id]?.type && (params.value === '' || params.value === 'Select')) {
          return 'highlight-empty-cell';
        }
        if (params.value === 'Select' && params.cellMode !== 'edit') {
          return 'initial-select-value';
        }
        return '';
      },
    },
    {
      field: 'eform',
      headerName: (
        <Box display="flex" alignItems="flex-start">
          <Box component="span" sx={{ textTransform: 'uppercase', fontSize: '0.75rem' }}>
            EFORM
          </Box>
          <Box
            component="span"
            sx={{
              marginLeft: '2px',
              alignSelf: 'flex-start',
              borderRight: 'none',
              fontFamily: 'inter-regular',
            }}
          >
            *
          </Box>
        </Box>
      ),
      width: 150,
      align: 'left',
      editable: true,
      type: 'singleSelect',
      valueOptions: (params) => {
        const row = rows.find((r) => r.id === params.id);
        return params?.type === 'Select' ? [] : row?.eformOptions || [];
      },
      renderCell: (params) => {
        return (
          <Box
            style={{ height: '100%' }}
            className="items-center"
            sx={{
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              alignItems: 'center',
              justifyContent: 'space-between',
              width: '100%',
              cursor: 'pointer',
            }}
          >
            <span
              style={{
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
              }}
            >
              {params?.value === 'Select'
                ? 'Select'
                : params?.row?.type === 'Select'
                  ? 'Select'
                  : params?.formattedValue}
            </span>
            <ExpandMoreRoundedIcon sx={{ color: 'var(--text-secondary-color)' }} />
          </Box>
        );
      },
      cellClassName: (params) => {
        if (EformErrors.length > 0 && EformErrors[params.id]?.eform && (params.value === '' || params.value === 'Select')) {
          return 'highlight-empty-cell';
        }
        if (params.value === 'Select' && params.cellMode !== 'edit') {
          return 'initial-select-value';
        }
        return '';
      },
    },
    {
      field: 'access',
      headerName: (
        <Box display="flex" alignItems="flex-start">
          <Box component="span" sx={{ textTransform: 'uppercase', fontSize: '0.75rem' }}>
            ACCESS
          </Box>
          <Box
            component="span"
            sx={{
              marginLeft: '2px',
              alignSelf: 'flex-start',
              borderRight: 'none',
              fontFamily: 'inter-regular',
            }}
          >
            *
          </Box>
        </Box>
      ),
      width: 150,
      align: 'left',
      editable: true,
      type: 'singleSelect',
      valueOptions: ['Select', ...(Array.isArray(formFields?.accessFields) ? formFields?.accessFields : [])],
      renderCell: (params) => {
        return (
          <Box
            style={{ height: '100%' }}
            className="items-center"
            sx={{
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              alignItems: 'center',
              justifyContent: 'space-between',
              width: '100%',
              cursor: 'pointer',
            }}
          >
            <span>{params.value?.replace(/_/g, ' ').replace(/\b\w/g, (char) => char.toUpperCase())}</span>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <ExpandMoreRoundedIcon sx={{ color: 'var(--text-secondary-color)' }} />
            </Box>
          </Box>
        );
      },
      cellClassName: (params) => {
        if (EformErrors.length > 0 && EformErrors[params.id]?.access && (params.value === '' || params.value === 'Select')) {
          return 'highlight-empty-cell';
        }
        if (params.value === 'Select' && params.cellMode !== 'edit') {
          return 'initial-select-value';
        }
        return '';
      },
    },
    {
      field: 'actions',
      headerName: '',
      width: 10,
      minWidth: 50,
      maxWidth: 50,
      renderCell: (params) => {
        return (
          <Box style={{ height: '100%' }} className="items-center" justifyContent="flex-end">
            <EFormDelete className="pointer" onClick={() => handleDeleteRow(params.id)} />
          </Box>
        );
      },
    },
  ];

  const handleCreateEditAccount = useMemo(() => {
    return () => {
      setIsValidationTriggered(true);
      setIsRowDeletion(false);
      const isDateMandatory =
        selectedRow?.status?.toLowerCase() !== 'active' || selectedOption?.label === 'Create';
      if (!validateForm(formData, setValidationErrors, setEformErrors, rows, isDateMandatory)) {
        handleValidationScroll();
        return;
      }
      setIsValidationTriggered(false);

      const finalEformsData = rows?.map((item) => ({
        id: item?.eform,
        permission: item?.access,
        label: item?.type,
      }));

      const result = {};

      finalEformsData.forEach((item) => {
        if (!result[item.label]) {
          result[item.label] = [];
        }

        result[item.label].push({
          id: item.id,
          permission: item.permission,
        });
      });

      const parentValue = formFields?.parentOptions.find(
        (item) => item?.value === editAccountDetailsData?.field_parent_name
      );

      const active_deactive_date = formData.activationDate?.isValid()
        ? dayjs(formData.activationDate).startOf('day').tz(currentEnv?.time_zone).toISOString()
        : '';
      const payload = {
        title: formData.name?.trim(),
        field_node_name: formData.displayName,
        field_user_cap: formData.userCapOverride,
        field_date_node:
          selectedRow?.status?.toLowerCase() === 'deactivated' || selectedOption?.label === 'Create'
            ? active_deactive_date
            : '',
        field_deactivated_date_node:
          selectedRow?.status?.toLowerCase() === 'active' ? active_deactive_date : '',
        og_group_ref: formData.parent?.value || parentValue?.value,
        eforms: result,
      };

      let actionResult;
      if (selectedOption?.label === 'Edit') {
        actionResult = dispatch(saveEditedAccountDetails({ id: selectedRow?.id, payload }));
      } else {
        actionResult = dispatch(createNewAccount(payload));
      }
      actionResult
        .unwrap() // This is the important part
        .then((result) => {
          // Handle successful result
          showSnackbar({
            message: result?.message,
            severity: result?.status === 'error' ? 'error' : 'success',
          });
        })
        .catch((error) => {
          // Handle error
          showSnackbar({
            message: error?.message || 'An error occurred, please try again',
            severity: 'error',
          });
        });
    };
  }, [formData, dispatch, setOpen, rows]);

  useEffect(() => {
    if (editInfoDetails?.status === 'success' || createAccountDetails?.status === 'success') {
      setOpen(false);
      dispatch(clearEditInfoDetails());
      dispatch(clearEditedData());
      setIsValidationTriggered(false);
    }
  }, [createAccountDetails?.status, editInfoDetails?.status, setOpen]);

  return (
    <>
      <ASDrawer
        {...{
          open: open,
          setOpen: setOpen,
          action: selectedOption?.label || 'Create',
          headerImage: caTree,
          onSubmit: handleCreateEditAccount,
          headerName: selectedOption?.label === 'Edit' ? 'Edit Account' : 'Create Account',
          leftIcons:
            selectedOption?.label === 'Edit' ? (
              <div className="responsive-chip">
                <Chip
                  variant="filled"
                  color={
                    editAccountDetailsData?.status
                      ? editAccountDetailsData?.status?.toLowerCase() === 'active'
                        ? 'success'
                        : 'error'
                      : selectedRow?.status?.toLowerCase() === 'active'
                        ? 'success'
                        : 'error'
                  }
                  label={
                    editAccountDetailsData?.status ? editAccountDetailsData?.status : selectedRow?.status
                  }
                  size="small"
                  sx={{ padding: '3px 4px' }}
                />
              </div>
            ) : null,
          rightIcons: (
            <div style={{ gap: 3, fontFamily: 'inter-regular' }} className="items-center">
              <DropdownMenu
                options={modalActions || []}
                onOptionSelect={() => {}}
                selectedOption={selectedOption}
              />
            </div>
          ),
        }}
        loader={createEditAccountLoader || editInfoLoader}
        mainLoader={editAccountLoader}
      >
        <Grid size={{ xs: 12 }} container spacing={2}>
          <RequiredMessage />

          <Grid size={{ xs: 12 }}>
            <SectionHeaders title="Account Information" />
          </Grid>

          <Grid size={{ xs: 12, sm: 6 }}>
            <CustomOutlinedInput
              id="name"
              size="small"
              label="Name"
              value={formData.name}
              name="firstName"
              onChange={(e) => handleInputChange('name', e.target.value)}
              isRequired
              isError={!!validationErrors.name}
              errorMessage={validationErrors.name}
              isErrorIcon
            />
          </Grid>

          <Grid size={{ xs: 12, sm: 6 }}>
            <CustomOutlinedInput
              id="displayName"
              size="small"
              label="Display Name"
              name="firstName"
              value={formData.displayName}
              onChange={(e) => handleInputChange('displayName', e.target.value)}
              isRequired
              isError={!!validationErrors.displayName}
              errorMessage={validationErrors.displayName}
            />
          </Grid>

          <Grid size={{ xs: 12, sm: 6 }}>
            <ASAutocomplete
              id="parent"
              width="100%"
              label="Parent"
              isRequired
              value={formData.parent}
              onChange={(event, newValue) => handleInputChange('parent', newValue)}
              options={parentOptions}
              isError={!!validationErrors.parent}
              errorMessage={validationErrors.parent}
            />
          </Grid>

          {formFields?.showUserCap === 2 && (
            <Grid size={{ xs: 12, sm: 6 }}>
              <CustomOutlinedInput
                id="userCapOverride"
                size="small"
                label="User Cap Override"
                name="firstName"
                value={formData.userCapOverride}
                onChange={(e) => handleInputChange('userCapOverride', e.target.value)}
                isError={!!validationErrors.userCapOverride}
                errorMessage={validationErrors.userCapOverride}
              />
              <Typography
                sx={{
                  fontSize: '0.8rem',
                  display: 'inline',
                }}
              >
                <span style={{ color: 'var(--text-secondary-color)' }}>Default User Cap:</span>{' '}
                {selectedOption?.label === 'Create'
                  ? formFields?.defaultUserCap
                  : editAccountDetailsData?.default_field_user_cap}
              </Typography>
            </Grid>
          )}

          <Grid item size={{ xs: 12 }} style={{ marginBottom: '1.25rem', marginTop: '1.25rem' }}>
            <Divider />
          </Grid>

          <Grid size={{ xs: 12 }} display={{ md: 'flex', ld: 'flex' }} alignItems="center" gap={2}>
            <Grid size={{ xs: 12, sm: 6 }}>
              <SectionHeaders
                id="activationDate"
                title={
                  selectedOption?.label === 'Create' || editAccountDetailsData?.status?.toLowerCase() === 'deactivated'
                    ? 'Activate On*'
                    : editAccountDetailsData?.status?.toLowerCase() === 'active'
                      && 'Deactivate On'
                }
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <CustomDatePicker
                id="activationDate"
                name="activationDate"
                value={formData?.activationDate?.isValid() ? dayjs(formData.activationDate) : null}
                onChange={(value) =>
                  handleInputChange(
                    'activationDate',
                    dayjs(value).startOf('day').tz(currentEnv?.time_zone, true)
                  )
                }
                sx={[
                  {
                    width: '100%',
                    marginTop: '13px',
                  },
                ]}
                isError={
                  (selectedOption?.label === 'Create' || selectedRow?.status?.toLowerCase() !== 'active') &&
                  !!validationErrors.activationDate
                }
                errorMessage={
                  (selectedOption?.label === 'Create' || selectedRow?.status?.toLowerCase() !== 'active') &&
                  validationErrors.activationDate
                }
                minDate={dayjs().tz(currentEnv?.time_zone)?.startOf('day')}
              />
            </Grid>
          </Grid>

          <Grid
            size={{ xs: 12 }}
            // sx={[
            //   {
            //     marginTop: '16px',
            //     marginBottom: '16px',
            //   },
            // ]}
          >
            <Grid item size={{ xs: 12 }} style={{ marginBottom: '1.25rem', marginTop: '1.25rem' }}>
              <Divider />
            </Grid>
          </Grid>

          <Grid size={{ xs: 12 }}>
            <SectionHeaders title="Access To eForms" />

            <Grid size={{ xs: 12, md: 12 }} marginTop={3} className="tableShadow" spacing={2}>
              <ASTable columns={columns} rows={rows} onRowsChange={setRows} />
              {!!validationErrors.eForm && (
                <FormHelperText
                  style={{
                    marginLeft: '0',
                    color: 'var(--danger-color)',
                    fontFamily: 'inter-regular',
                  }}
                  className="items-center"
                >
                  <>
                    <ErrorIcon
                      fontSize="small"
                      color="var(--danger-color)"
                      style={{ marginRight: '.2rem' }}
                    />
                  </>
                  {validationErrors.eForm}
                </FormHelperText>
              )}

              <Tooltip title="Add a row">
                <Button
                  variant="text"
                  color="primary"
                  onClick={handleAddRow}
                  sx={{ fontSize: '0.813rem', margintop: '10px' }}
                >
                  Add Row
                </Button>
              </Tooltip>
            </Grid>
          </Grid>

          <Grid
            size={{ xs: 12 }}
            sx={[
              {
                marginBottom: '16px',
              },
            ]}
          >
            <Grid item size={{ xs: 12 }} style={{ marginBottom: '1rem', marginTop: '1rem' }}>
              <Divider />
            </Grid>
          </Grid>
        </Grid>
      </ASDrawer>
    </>
  );
};

export default AddEditAccount;
