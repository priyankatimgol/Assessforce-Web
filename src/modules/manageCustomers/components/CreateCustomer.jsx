import { useRef } from 'react';
import { Divider, Typography } from '@mui/material';
import ASDrawer from '../../../components/mainComponents/ASDrawer';
import SectionHeaders from '../../../components/mainComponents/SectionHeaders';
import { useDispatch, useSelector } from 'react-redux';
import { useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { CustomersContext } from '../ManageCustomers';
import {
  createNewCustomerAction,
  editCustomerDetails,
  getCustomerFormFields,
  getHMFormFields,
  getHMFormFieldsData,
  updateCustomerDataAction,
} from '../../../redux/slice/manageCustomers/ManageCustomersSlice';
import Grid from '@mui/material/Grid2';
import RequiredMessage from '../../../components/mainComponents/RequiredMessage';
import ShowPreviewImage from '../../manageOrg/components/showPreviewImage';
import { useSnackbar } from '../../../context/SnackbarContext';
import DuplicationWarningModal from '../../manageOrg/components/DuplicationWarningModal';
import FormFieldRenderer from '../../FormFieldRenderer';
import DropdownMenu from '../../../components/mainComponents/DropdownMenu';
import { modalActions } from '../../../utils/constants';
import UserImage from '../../../assets/customSVGIcons/customer/UserImage';

const CreateCustomer = () => {
  const fieldRefs = useRef();
  const dispatch = useDispatch();
  const viewCustomerDetailsContext = useContext(CustomersContext);
  const { open, setOpen, selectedOption, selectedRow, selectedOptionForEdit, setGridApiFlag } =
    viewCustomerDetailsContext || {};
  const { customerViewLoader, customerFormFields, editCustomerData, hmFormFields, hmFormFieldsData } =
    useSelector((state) => state?.manageCustomers);
  const { currentEnv } = useSelector((state) => state?.authenticationSlice);
  const { showSnackbar } = useSnackbar();

  const [sectionTypeInfo, setSectionTypeInfo] = useState([]);
  const [sectionInfo, setSectionInfo] = useState([]);
  const [formValues, setFormValues] = useState({});
  const [validationErrors, setValidationErrors] = useState({});
  const [isDuplication, setIsDuplication] = useState({ label: 'no', value: false });
  const [sameFieldListWarnings, setSameFieldListWarnings] = useState({});
  const [previewUrls, setPreviewUrls] = useState({});
  const [loaderFlag, setLoaderFlag] = useState(false);
  const { infoTypes } = editCustomerData || {};

  const isEditMode = selectedOption?.label === 'Edit';

  useEffect(() => {
    if (!open) return;
    if (
      selectedOptionForEdit === 'Created' ||
      selectedOption?.label === 'Create' ||
      selectedOption?.label === 'Edit'
    ) {
      dispatch(getCustomerFormFields());
    } else if (selectedOptionForEdit === 'HM' || selectedOption?.label === 'CreateHM') {
      dispatch(getHMFormFields());
    }
  }, [selectedOptionForEdit, selectedOption?.label, open, dispatch]);

  useEffect(() => {
    if (!open || !isEditMode) return;

    if ((selectedOptionForEdit === 'Created' || isEditMode) && selectedRow?.profile_id) {
      dispatch(editCustomerDetails(selectedRow?.profile_id));
    } else if (selectedOptionForEdit === 'HM') {
      dispatch(getHMFormFieldsData());
    }
  }, [open, isEditMode, selectedOptionForEdit, selectedRow?.profile_id, dispatch]);

  useEffect(() => {
    const groupKeys = [
      'group_border_div_2',
      'group_border_div_3',
      'group_border_div_4',
      'group_border_div_5',
      'basic_info_fields',
    ];

    if (selectedOption?.label === 'CreateHM' || selectedOptionForEdit === 'HM') {
      setSectionInfo(hmFormFields?.fields?.field_types?.filter((item) => item?.section_info));
      setSectionTypeInfo(hmFormFields?.fields?.field_types?.filter((item) => item?.section_types_info));
    } else {
      setSectionInfo(customerFormFields?.fields?.field_types?.filter((item) => item?.section_info));
      setSectionTypeInfo(customerFormFields?.fields?.field_types?.filter((item) => item?.section_types_info));
    }

    if (selectedOption?.label === 'Edit') {
      if (selectedOptionForEdit === 'HM') {
        if (hmFormFieldsData && Object.keys(hmFormFieldsData)?.length > 0) {
          Object.entries(hmFormFieldsData)?.map(([key, value]) => {
            setFormValues((prevValues) => ({
              ...prevValues,
              [key]: value,
            }));
          });
        }
      } else {
        const prefilledValues = {};
        const infoTypeData = infoTypes || [];
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
            }
          });
        });
        setFormValues(prefilledValues);
      }
    } else {
      setFormValues({});
    }
  }, [customerFormFields, selectedOption, infoTypes, hmFormFields, selectedOptionForEdit]);

  useEffect(() => {
    return () => {
      setFormValues({});
      setValidationErrors({});
      setPreviewUrls({});
    };
  }, [open]);

  const handleInputChange = useCallback((fieldName, value, type) => {
    if (type === 'file' && value instanceof File) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setPreviewUrls((prev) => ({ ...prev, [fieldName]: e.target.result }));
      };
      reader.readAsDataURL(value);
      setFormValues((prevValues) => ({ ...prevValues, [fieldName]: value }));
    } else {
      setFormValues((prevValues) => ({ ...prevValues, [fieldName]: type === 'select' ? value : value }));
      // setFormValues((prevValues) => ({ ...prevValues, [fieldName]: type === 'date' ? value === '-' ? null : value : value }));
    }

    if (value) {
      setValidationErrors((prevErrors) => ({ ...prevErrors, [fieldName]: '' }));
    }
  }, []);

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formValues, validationErrors]);

  const renderSection = (sectionData) => {
    const field_data = sectionData?.section_info?.field_data;

    return (
      <Grid container spacing={2}>
        {field_data?.map((field, fieldIndex) => (
          <Grid item size={{ xs: 12, md: 6 }} key={fieldIndex}>
            {renderFormFields(field)}
            {ShowPreviewImage({ image: field?.machine_name, previewUrls, handleDeletePreview })}
          </Grid>
        ))}
      </Grid>
    );
  };

  const renderSectionContainer = (sectionData) => {
    const subSections = Object.keys(sectionData?.section_types_info?.subsection || {});
    return (
      <Grid container gap={2}>
        <Grid item size={{ xs: 12 }}>
          <SectionHeaders title={sectionData?.section_types_info?.title} />
        </Grid>
        {subSections?.map((item, index) => {
          const { field_data, sub_title: subTitle } =
            sectionData?.section_types_info?.subsection?.[item] || {};
          const mainTitle = sectionData?.section_types_info?.title;
          return (
            <Grid size={{ xs: 12 }} key={index}>
              {mainTitle !== 'Basic Information' && subTitle !== 'Border Div' && (
                <Grid
                  item
                  xs={12}
                  sx={{ background: 'var(--section-bg)', borderRadius: '6px', marginBottom: 4 }}
                >
                  <Typography className="sub-section-header">{subTitle}</Typography>
                </Grid>
              )}

              <Grid container spacing={2}>
                {field_data?.map((field, fieldIndex) => (
                  <Grid
                    item
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
        <Grid item size={{ xs: 12 }}>
          <Divider />
        </Grid>
      </Grid>
    );
  };

  const handleSubmit = () => {
    setLoaderFlag(true);

    const finalAction =
      selectedOption?.label === 'Edit'
        ? updateCustomerDataAction({ id: selectedRow?.profile_id, payload: formValues })
        : createNewCustomerAction(formValues);

    dispatch(finalAction).then((data) => {
      setLoaderFlag(false);

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

              if (fieldRefs.current[field]) {
                fieldRefs.current[field].scrollIntoView({ behavior: 'smooth', block: 'center' });
              }
            });
          }
        } else {
          setValidationErrors(errors);
        }

        if (response?.message) {
          showSnackbar({
            message: response?.message,
            severity: response?.status === 'error' ? 'error' : 'success',
          });
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
        setGridApiFlag(true);
      }
    });
  };

  const getHeaderName = (selectedOption) => {
    return `${selectedOption?.label} Customer`;
  };

  const headerName = getHeaderName(selectedOption);

  return (
    <ASDrawer
      {...{
        open: open,
        setOpen: setOpen,
        action: selectedOption?.label,
        headerName: headerName,
        showFooter: true,
        loader: loaderFlag,
        onSubmit: handleSubmit,
        headerImage: UserImage,
        width: '50rem',
        mainLoader: customerViewLoader,
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
      width="51.25rem"
    >
      <DuplicationWarningModal
        open={isDuplication?.value}
        duplicationType={sameFieldListWarnings}
        onClose={() => setIsDuplication({ label: 'no', value: false })}
        onConfirm={handleSubmit}
      />
      <Grid container spacing={2}>
        <RequiredMessage />
        {sectionTypeInfo?.map((section, index) => (
          <Grid item size={{ xs: 12 }} key={index}>
            {renderSectionContainer(section, true)}
          </Grid>
        ))}
        {sectionInfo?.map((section, index) => (
          <Grid item size={{ xs: 12 }} key={index}>
            {renderSection(section)}
          </Grid>
        ))}
      </Grid>
      <Grid item size={{ xs: 12 }} sx={{ marginBottom: '16px', marginTop: '16px' }}></Grid>
    </ASDrawer>
  );
};

export default CreateCustomer;
