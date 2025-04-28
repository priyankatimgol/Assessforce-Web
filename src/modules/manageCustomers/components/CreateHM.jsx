import { useRef } from 'react';
import { Divider, Typography } from '@mui/material';
import ASDrawer from '../../../components/mainComponents/ASDrawer';
import SectionHeaders from '../../../components/mainComponents/SectionHeaders';
import { useDispatch, useSelector } from 'react-redux';
import { useCallback, useContext, useEffect, useMemo, useState } from 'react';
import {
    getHMFormFields,
} from '../../../redux/slice/manageCustomers/ManageCustomersSlice';
import Grid from '@mui/material/Grid2';
import RequiredMessage from '../../../components/mainComponents/RequiredMessage';
import IconCustomer from '../../../assets/images/IconCustomer.svg';
import ShowPreviewImage from '../../manageOrg/components/showPreviewImage';
import FormFieldRenderer from '../../FormFieldRenderer';
import { HMContext } from '../profile/Household';

const CreateHM = () => {
    const fieldRefs = useRef();
    const dispatch = useDispatch();
    const viewCustomerDetailsContext = useContext(HMContext);
    const { open, setOpen, selectedOption, selectedRow, selectedOptionForEdit } =
        viewCustomerDetailsContext || {};
    const { customerViewLoader, customerFormFields, editCustomerData, hmFormFields, hmFormFieldsData } = useSelector(
        (state) => state?.manageCustomers
    );
    const { currentEnv } = useSelector((state) => state?.authenticationSlice);
    const [sectionTypeInfo, setSectionTypeInfo] = useState([]);
    const [sectionInfo, setSectionInfo] = useState([]);
    const [formValues, setFormValues] = useState({});
    const [validationErrors, setValidationErrors] = useState({});
    const { infoTypes } = editCustomerData || {};
    const [previewUrls, setPreviewUrls] = useState({});

    const isEditMode = selectedOption?.label === 'Edit';

    useEffect(() => {
        if (!open) return;
        dispatch(getHMFormFields());
    }, [selectedOptionForEdit, selectedOption?.label, open, dispatch]);

    useEffect(() => {
        if (!open || !isEditMode) return;
        // dispatch(getHMFormFieldsData());
    }, [open, isEditMode, selectedOptionForEdit, selectedRow?.profile_id, dispatch]);

    useEffect(() => {
        setSectionInfo(hmFormFields?.fields?.field_types?.filter((item) => item?.section_info));
        setSectionTypeInfo(hmFormFields?.fields?.field_types?.filter((item) => item?.section_types_info));

        if (hmFormFieldsData && Object.keys(hmFormFieldsData).length > 0) {
            Object.entries(hmFormFieldsData).map(([key, value]) => {
                setFormValues((prevValues) => ({
                    ...prevValues,
                    [key]: value,
                }));
            });
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
        setValidationErrors((prevErrors) => ({ ...prevErrors, [fieldName]: '' }));
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
                {subSections.map((item, index) => {
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
                <Grid item size={{ xs: 12 }}><Divider /></Grid>
            </Grid>
        );
    };

    return (
        <ASDrawer
            open={open}
            setOpen={setOpen}
            action={selectedOption?.label}
            headerName={selectedOption?.label}
            showFooter={true}
            headerImage={IconCustomer}
            width='50rem'
            mainLoader={customerViewLoader}
        >
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

export default CreateHM;