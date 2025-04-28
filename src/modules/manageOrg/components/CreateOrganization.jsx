import { useContext, useEffect, useState, useMemo, useRef, useCallback } from 'react';
import { Divider, IconButton, Tooltip, Typography } from '@mui/material';
import Grid from '@mui/material/Grid2';
import ASDrawer from '../../../components/mainComponents/ASDrawer';
import { OrganizationContext } from '../ManageOrganizations';
import SectionHeaders from '../../../components/mainComponents/SectionHeaders';
import CustomAccordion from '../../../components/mainComponents/CustomAccordian';
import { useDispatch, useSelector } from 'react-redux';
import {
  createOrganizationAction,
  editOrganizationDetails,
  fetchFormFields,
  fetchOrganizationDetails,
  updateOrganizationAction,
  viewOrganizationDetail,
} from '../../../redux/slice/manageOrganization/ManageOrganizationSlice';
import RequiredMessage from '../../../components/mainComponents/RequiredMessage';
import { useSnackbar } from '../../../context/SnackbarContext';
import checkMachineNames from '../helpers/checkMachineNames';
import ShowPreviewImage from './showPreviewImage';
import OrgBuildingSvg from '../../../assets/customSVGIcons/OrgBuildingSvg';
import DuplicationWarningModal from './DuplicationWarningModal';
import DropdownMenu from '../../../components/mainComponents/DropdownMenu';
import { modalActions } from '../../../utils/constants';
import FormFieldRenderer from '../../FormFieldRenderer';
import OrgAccordianIcon from '../../../assets/customSVGIcons/OrgAccordianIcon';
import HistoryIcon from '../../../assets/customSVGIcons/HistoryIcon';
import OrgAccordianBuilding from '../../../assets/customSVGIcons/OrgAccordianBuilding';

//To set the default ory_types when the default open is comming from edit mode for Org Types.
// const useInitializeAccordionState = (sectionTypeInfo, isDefaultCollapsed, setAccordionState) => {
//   useEffect(() => {
//     if (sectionTypeInfo) {
//       sectionTypeInfo.forEach((section) => {
//         const subsectionInfoTypes = section?.section_types_info;
//         if (isDefaultCollapsed[subsectionInfoTypes?.title] === 1) {
//           setAccordionState((prevState) => ({
//             ...prevState,
//             [subsectionInfoTypes?.machine_name]: isDefaultCollapsed[subsectionInfoTypes?.title],
//           }));
//         }
//       });
//     }
//   }, [sectionTypeInfo, isDefaultCollapsed, setAccordionState]);
// };

function CreateOrganization() {
  const dispatch = useDispatch();
  const viewAccountDetailsContext = useContext(OrganizationContext);
  const {
    open,
    setOpen,
    selectedOption,
    selectedRow,
    setOpenOrganizationHistory,
    setSelectedOption,
    openOrganizationHistory,
  } = viewAccountDetailsContext || {};
  const [sectionInfo, setSectionInfo] = useState([]);
  const [sectionTypeInfo, setSectionTypeInfo] = useState([]);
  const [formValues, setFormValues] = useState({});
  const [validationErrors, setValidationErrors] = useState({});
  const [previewUrls, setPreviewUrls] = useState({});
  const fieldRefs = useRef({});
  const { showSnackbar } = useSnackbar();
  const [isDefaultCollapsed, setIsDefaultCollapsed] = useState({});
  const [accordionState, setAccordionState] = useState({});
  const [isDuplication, setIsDuplication] = useState({ label: 'no', value: false });
  const [sameFieldListWarnings, setSameFieldListWarnings] = useState({});
  const [orgTypeError, setOrgTypeError] = useState('');
  const {
    editOrganizationData,
    formFieldData,
    editOrganizationLoader,
    createOrganizationLoader,
    editOrganizationDetailsLoader,
    formFieldLoader,
  } = useSelector((state) => state?.manageOrganizations);
  const { currentEnv } = useSelector((state) => state?.authenticationSlice);
  const { infoTypes, orgTypes } = editOrganizationData || {};

  useEffect(() => {
    if (open) {
      dispatch(fetchFormFields());
    }
  }, [open]);

  // useInitializeAccordionState(sectionTypeInfo, isDefaultCollapsed, setAccordionState);

  const handleEditAccount = (option) => {
    if (selectedRow) {
      if (option === 'Edits History') {
        setSelectedOption({ label: 'Edits History' });
        setOpenOrganizationHistory(true);
      }
    }
  };

  useEffect(() => {
    if(sectionTypeInfo) {
      sectionTypeInfo?.forEach((section) => {
        const subsectionInfoTypes = section?.section_types_info;
        if (isDefaultCollapsed[subsectionInfoTypes?.title] === 1) {
          setAccordionState((prevState) => ({
            ...prevState,
            [subsectionInfoTypes?.machine_name]: isDefaultCollapsed[subsectionInfoTypes?.title],
          }));
        }
      });
    }

    return () => {
      setAccordionState({});
    }
  }, [sectionTypeInfo]);

  useEffect(() => {
    setSectionInfo(formFieldData?.filter((item) => item?.section_info));
    setSectionTypeInfo(formFieldData?.filter((item) => item?.section_types_info));
    const groupKeys = [
      'group_orgz_inc_ma_grp',
      'group_orgz_inc_grp',
      'group_orgz_sc_grp',
      'group_orgz_pc_grp',
    ];

    if (selectedOption?.label === 'Edit') {
      const prefilledValues = {};
      const isGroupStatus = {};
      const infoTypeData = infoTypes || [];
      const previewImages = {};
      Object.entries(infoTypeData || {}).forEach(([_, group]) => {
        Object.entries(group).forEach(([key, value]) => {
          const isGroup = groupKeys.includes(key);

          if (isGroup && typeof value === 'object') {
            Object.entries(value || {}).forEach(([innerKey, innerValue]) => {
              prefilledValues[innerKey] = innerValue?.value;
            });
          } else if (typeof value === 'object') {
            if (value?.value !== undefined) {
              prefilledValues[key] = value.value;
            }

            if (value?.redirect_url && value?.value !== '-') {
              prefilledValues[key] = {
                fileName: value.fileName,
                fileType: value.fileType,
                base64: `data:${value.fileType};base64,${value.base64}`,
              };
              previewImages[key] = value.value;
            }
          }
        });
      });

      const organizationTypeData = orgTypes || [];
      organizationTypeData.forEach((group) => {
        if (group.group_title && group.group_status !== undefined) {
          isGroupStatus[group.group_title] = group.group_status;
        }

        Object.keys(group).forEach((key) => {
          if (typeof group[key] === 'object' && group[key]?.value !== undefined) {
            prefilledValues[key] = group[key].value;

            if (group[key]?.redirect_url && group[key]?.value !== '-') {
              prefilledValues[key] = {
                fileName: group[key]?.value.split('/').pop(),
                fileType: 'image/png',
                base64: `data:${group[key]?.fileType};base64,${group[key]?.base64}`,
              };
              previewImages[key] = group[key].value;
            }
          }
        });
      });
      setFormValues(prefilledValues);
      setIsDefaultCollapsed(isGroupStatus);
      setPreviewUrls(previewImages);
    } else {
      // Create mode (To set the default values for all the available fields in the form);
      const initialFormValues = {};
      formFieldData?.forEach((section) => {
        const processFields = (fields) => {
          fields?.forEach((field) => {
            if (field?.default_value !== undefined) {
              initialFormValues[field.machine_name] = field.default_value;
            }
          });
        };

        if (section?.section_info?.subsection) {
          Object.values(section.section_info.subsection).forEach((subsection) => {
            processFields(subsection.field_data);
          });
        } else if (section?.section_types_info?.subsection) {
          Object.values(section.section_types_info.subsection).forEach((subsection) => {
            processFields(subsection.field_data);
          });
        }

        if (section?.section_info?.field_data) {
          processFields(section.section_info.field_data);
        }
        if (section?.section_types_info?.field_data) {
          processFields(section.section_types_info.field_data);
        }
      });
      setFormValues(initialFormValues);
    }
  }, [formFieldData, infoTypes, orgTypes, selectedOption, openOrganizationHistory]);

  useEffect(() => {
    if (selectedOption?.label === 'Edit') {
      dispatch(editOrganizationDetails(selectedRow?.id));
    }
  }, [dispatch, selectedOption, selectedRow]);

  const handleInputChange = useCallback((fieldName, value, type) => {
    if (type === 'file' && value instanceof File) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const fileData = {
          fileName: value.name,
          fileType: value.type,
          base64: reader?.result,
        };
        setFormValues((prevValues) => ({ ...prevValues, [fieldName]: fileData }));
        setPreviewUrls((prev) => ({ ...prev, [fieldName]: e.target.result }));
      };
      reader.readAsDataURL(value);
    } else {
      setFormValues((prevValues) => ({ ...prevValues, [fieldName]: type === 'select' ? value : value }));
    }

    if (value) {
      setValidationErrors((prevErrors) => ({ ...prevErrors, [fieldName]: '' }));
    }

    // setValidationErrors((prevErrors) => ({ ...prevErrors, [fieldName]: '' }));
  }, []);

  const renderFormFields = useMemo(() => {
    // eslint-disable-next-line react/display-name
    return (choice) => (
      <FormFieldRenderer
        choice={choice}
        formValues={formValues}
        handleInputChange={handleInputChange}
        validationErrors={validationErrors}
        fieldRefs={fieldRefs}
        timeZone={currentEnv}
      />
    );
  }, [formValues, validationErrors]);

  const handleSubmit = async () => {
    formValues.org_type = accordionState;
    formValues.op = isDuplication?.label;

    const finalAction =
      selectedOption?.label === 'Edit'
        ? updateOrganizationAction({ id: selectedRow?.id, payload: formValues })
        : createOrganizationAction(formValues);

    dispatch(finalAction).then((data) => {
      const response = data?.payload;

      if (response?.status === 'error') {
        const isDuplicatePrevention = response?.message?.duplication_type === 'Unique';
        const errors = response?.messages || response?.message;

        if (response?.message?.duplication_type === 'Same') {
          const sameFieldList = response?.message?.field_list;
          setIsDuplication({ label: 'yes', value: true });
          setSameFieldListWarnings(sameFieldList);
        }

        if (isDuplicatePrevention) {
          const duplicationMessage = response?.message?.message || 'Duplicate entry error';
          const fieldList = response?.message?.field_list;

          if (fieldList) {
            Object.keys(fieldList).forEach((field) => {
              const errorMessage = `${duplicationMessage} (${fieldList[field]})`;
              setValidationErrors((prevErrors) => ({ ...prevErrors, [field]: errorMessage }));

              const errorElement = document.getElementById(field);
              if (errorElement) {
                errorElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
              }
            });
          }
        } else {
          if (response?.org_type) {
            setOrgTypeError(response?.message);
          } else {
            setValidationErrors(errors);
            setOrgTypeError('');
          }
        }

        const firstErrorField = Object.keys(errors)?.[0];
        if (firstErrorField) {
          const errorElement = document.getElementById(firstErrorField);
          if (errorElement) {
            errorElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
          }
        }
      } else {
        showSnackbar({
          message: response?.message,
          severity: response?.status === 'error' ? 'error' : 'success',
        });
        setOpen(false);
        setIsDuplication({ label: 'no', value: false });
        dispatch(fetchOrganizationDetails());
        if (selectedOption?.label === 'Edit') {
          dispatch(viewOrganizationDetail(selectedRow?.id));
        }
      }
    });
  };

  useEffect(() => {
    return () => {
      setFormValues({});
      setValidationErrors({});
      setPreviewUrls({});
      setIsDefaultCollapsed({});
      setOrgTypeError('');
    };
  }, [open]);

  const renderSectionContainer = (sectionData) => {
    const subSections = Object.keys(sectionData?.section_info?.subsection || {});

    return (
      <Grid container spacing={2} size={{ xs: 12 }}>
        <Grid size={{ xs: 12 }}>
          <SectionHeaders title={sectionData?.section_info?.title} />
        </Grid>
        {subSections.map((item, index) => {
          const { field_data, sub_title: subTitle } = sectionData?.section_info?.subsection?.[item] || {};

          return (
            <Grid size={{ xs: 12 }} key={index}>
              {subTitle !== 'Border Div' && (
                <Grid
                  size={{ xs: 12 }}
                  sx={{
                    background: 'var(--section-bg)',
                    borderRadius: '6px',
                    marginBottom: '1rem',
                    marginTop: '4px',
                  }}
                >
                  <Typography className="sub-section-header">{subTitle}</Typography>
                </Grid>
              )}

              <Grid container spacing={2}>
                {field_data?.map((field, fieldIndex) => (
                  <Grid
                    size={{ xs: 12, md: 6 }}
                    key={fieldIndex}
                    sx={{ marginLeft: index === 0 ? 0 : 'auto' }}
                  >
                    {renderFormFields(field)}
                  </Grid>
                ))}
              </Grid>
            </Grid>
          );
        })}
        <Grid size={{ xs: 12 }}>
          <Divider />
        </Grid>
      </Grid>
    );
  };

  const handleDeletePreview = (fieldName) => {
    setPreviewUrls((prev) => {
      // eslint-disable-next-line no-unused-vars
      const { [fieldName]: _, ...rest } = prev;
      return rest;
    });
    setFormValues((prevValues) => {
      return { ...prevValues, [fieldName]: null };
    });
  };

  const handleAccordionChange = (machineName, isOpen) => {
    setAccordionState((prevState) => ({ ...prevState, [machineName]: isOpen ? 1 : 0 }));
    setIsDefaultCollapsed((prevCollapsed) => ({ ...prevCollapsed, [machineName]: isOpen ? 1 : 0 }));

    if (!isOpen) {
      const fieldsToReset = sectionTypeInfo
        .filter((section) => section?.section_types_info?.machine_name === machineName)
        .flatMap((section) => Object.values(section?.section_types_info?.subsection || {}))
        .flatMap((subsection) => subsection?.field_data || [])
        .map((field) => field?.machine_name);

      setFormValues((prevValues) => {
        const newValues = { ...prevValues };
        fieldsToReset.forEach((field) => {
          delete newValues[field]; // Or newValues[field] = initialFormValues[field] if you want to revert to initial value rather than clearing.
          setValidationErrors((prevErrors) => {
            const newErrors = { ...prevErrors };
            delete newErrors[field];
            return newErrors;
          });
          setPreviewUrls((prevUrls) => {
            const newPreviewUrls = { ...prevUrls };
            delete newPreviewUrls[field];
            return newPreviewUrls;
          });
        });
        return newValues;
      });
    }
  };

  const renderSectionTypeContainer = (sectionData) => {
    const subSections = Object.keys(sectionData?.section_types_info?.subsection || {});
    const parentFieldData = sectionData?.section_types_info?.field_data;
    const parentMachineName = sectionData?.section_types_info?.machine_name;
    const parentSubSections = sectionData?.section_types_info?.subsection;
    const validationData = parentSubSections
      ? Object.values(parentSubSections)
          .map((item) => item?.field_data)
          .filter(Boolean)
          .flat()
      : [];
    const openOnError = checkMachineNames(validationData, validationErrors);

    return (
      <Grid container size={{ xs: 12 }} spacing={2}>
        <Grid size={{ xs: 12 }}>
          <CustomAccordion
            title={sectionData?.section_types_info?.title}
            defaultExpanded={
              openOnError ||
              (isDefaultCollapsed && isDefaultCollapsed?.[sectionData?.section_types_info?.title] === 1)
                ? selectedOption?.label === 'Edit' && true
                : false
            }
            isDisabled={false}
            onChange={handleAccordionChange}
            machineName={parentMachineName}
            leftIcon={<OrgAccordianIcon sx={{ height: '20px', width: '20px', marginRight: '20px' }} />}
            expandedIcon={
              <OrgAccordianBuilding sx={{ height: '20px', width: '20px', marginRight: '20px' }} />
            }
          >
            {parentFieldData?.map((field, fieldIndex) => (
              <Grid size={{ xs: 12, md: 12 }} key={fieldIndex} sx={{ marginLeft: 0, marginBottom: 2 }}>
                {renderFormFields(field)}
                {['field_orgz_sponsor_logo', 'field_orgz_self_ss_logo'].includes(field?.machine_name) &&
                  ShowPreviewImage({ image: field?.machine_name, previewUrls, handleDeletePreview })}
              </Grid>
            ))}

            {subSections.map((item, index) => {
              const { field_data } = sectionData?.section_types_info?.subsection?.[item] || {};
              const showFullWidthData = ['field_orgz_sponsor_logo', 'field_orgz_sponsor_logo_redirect'];

              return (
                <Grid container key={index} spacing={2} marginTop={index >= 1 && '14px'}>
                  {field_data?.map((field, fieldIndex) => (
                    <Grid
                      size={{ xs: 12, md: showFullWidthData?.includes(field?.machine_name) ? 12 : 6 }}
                      key={fieldIndex}
                      sx={{
                        marginLeft: index === 0 ? 0 : 'auto',
                        marginBottom: 0,
                      }}
                    >
                      {renderFormFields(field)}
                      {['field_orgz_sponsor_logo', 'field_orgz_self_ss_logo'].includes(field?.machine_name) &&
                        ShowPreviewImage({ image: field?.machine_name, previewUrls, handleDeletePreview })}
                    </Grid>
                  ))}
                </Grid>
              );
            })}
          </CustomAccordion>
        </Grid>
      </Grid>
    );
  };

  return (
    <ASDrawer
      {...{
        open: open,
        setOpen: setOpen,
        action: selectedOption?.label,
        headerName: `${selectedOption?.label} Organization`,
        showFooter: true,
        mainLoader: editOrganizationLoader || formFieldLoader,
        onSubmit: handleSubmit,
        headerImage: OrgBuildingSvg,
        loader: createOrganizationLoader || editOrganizationDetailsLoader,
        rightIcons: (
          <div style={{ gap: 3, fontFamily: 'inter-regular' }} className="items-center">
            {selectedOption?.label === 'Edit' && (
              <Tooltip title="View edits history">
                <IconButton aria-haspopup="true" onClick={() => handleEditAccount('Edits History')}>
                  <HistoryIcon className="hover-icon pointer" />
                </IconButton>
              </Tooltip>
            )}
            <DropdownMenu
              options={modalActions || []}
              onOptionSelect={() => {}}
              selectedOption={selectedOption}
            />
          </div>
        ),
      }}
    >
      <DuplicationWarningModal
        open={isDuplication?.value}
        duplicationType={sameFieldListWarnings}
        onClose={() => setIsDuplication({ label: 'no', value: false })}
        onConfirm={handleSubmit}
      />
      <Grid container spacing={2}>
        <RequiredMessage />
        {sectionInfo?.map((section, index) => (
          <Grid size={{ xs: 12 }} key={index}>
            {renderSectionContainer(section, true)}
          </Grid>
        ))}

        <SectionHeaders title="Organization Type" isError={orgTypeError !== ''} errorMessage={orgTypeError} />
        {sectionTypeInfo?.map((section, index) => (
          <Grid size={{ xs: 12 }} key={index}>
            {renderSectionTypeContainer(section)}
          </Grid>
        ))}
        <Grid size={{ xs: 12 }} sx={{ marginBottom: '2rem', marginTop: '1rem' }}>
          <Divider />
        </Grid>
      </Grid>
    </ASDrawer>
  );
}

CreateOrganization.displayName = 'CreateOrganization';

export default CreateOrganization;
