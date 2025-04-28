import React, { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { Icon, Typography } from '@mui/material';
import ASDrawer from '../../../components/mainComponents/ASDrawer';
import { ChangeHOHContext } from '../ManageCustomers';
import {
    getChangeHOHDetails,
} from '../../../redux/slice/manageCustomers/ManageCustomersSlice';
import Grid from '@mui/material/Grid2';
import RequiredMessage from '../../../components/mainComponents/RequiredMessage';
import IconCustomer from '../../../assets/images/IconCustomer.svg';
import { changeHOHData, dummyResponseHOH, importGriddata } from '../../../DummyJson';
import InfoSmallIcon from '../../../assets/customSVGIcons/InfoSmallIcon';
import FormFieldRenderer from '../../FormFieldRenderer';
import KpiCards from './KpiCards';

function ChangeHOH() {
    const fieldRefs = useRef();
    const dispatch = useDispatch();
    const viewCustomerDetailsContext = useContext(ChangeHOHContext);
    const { openChangeHOH, setOpenChangeHOH, openReqEdits, selectedOption, selectedOptionForEdit } =
        viewCustomerDetailsContext || {};
    const { hmFormFields } = useSelector((state) => state?.manageCustomers);

    const [sectionTypeInfo, setSectionTypeInfo] = useState([]);
    const [sectionInfo, setSectionInfo] = useState([]);
    const [formValues, setFormValues] = useState({});
    const [validationErrors, setValidationErrors] = useState({});

    const { currentEnv } = useSelector((state) => state?.authenticationSlice);

    const { changeHOHDetailsData } = useSelector((state) => state?.manageCustomers);
    const { form_fields, KpiDetails } = changeHOHDetailsData || {};


    useEffect(() => {
        dispatch(getChangeHOHDetails());
    }, [openChangeHOH]);

    useEffect(() => {
        setSectionInfo(changeHOHData?.data?.fields?.field_types?.filter((item) => item?.section_info));
        setSectionTypeInfo(changeHOHData?.data?.fields?.field_types?.filter((item) => item?.section_types_info));

        setFormValues({});
    }, [selectedOption, hmFormFields, selectedOptionForEdit, importGriddata]);

    const handleInputChange = useCallback((fieldName, value, type) => {
        setFormValues((prevValues) => ({ ...prevValues, [fieldName]: type === 'select' ? value : value }));
        setValidationErrors((prevErrors) => ({ ...prevErrors, [fieldName]: '' }));
    }, []);

    const renderFormFields = useMemo(() => {
        return (choice) => (
            <FormFieldRenderer
                choice={choice}
                formValues={formValues}
                handleInputChange={handleInputChange}
                validationErrors={validationErrors}
                fieldRefs={fieldRefs}
            />
        );
    }, [formValues, validationErrors]);

    const handleSubmit = () => {
        setValidationErrors(dummyResponseHOH?.messages);
    };

    useEffect(() => {
        return () => {
            setFormValues({});
            setValidationErrors({});
        };
    }, [openReqEdits]);

    return (
        <ASDrawer
            open={openChangeHOH}
            setOpen={setOpenChangeHOH}
            action={selectedOption?.label}
            headerName={'Change HOH'}
            showFooter={true}
            //mainLoader={editOrganizationLoader}
            width='820px'
            onSubmit={handleSubmit}
            headerImage={IconCustomer}
            actionButton={'Update'}
        >
            <RequiredMessage />
            <Grid container className="modal-contents-flex">
                <Grid
                    container
                    className="ua-dashboard-card"
                    gap={2}
                    size={{ xs: 12 }}
                    sx={{
                        marginTop: { xs: 4, md: 2 },
                        overflowX: 'auto',
                        display: 'flex',
                        flexWrap: { xs: 'nowrap', md: 'nowrap' },
                        padding: { xs: '0 0 16px 0', md: 0 },
                        scrollbarWidth: 'thin',
                        '&::-webkit-scrollbar': { height: '8px' },
                        '&::-webkit-scrollbar-thumb': { backgroundColor: '#BCE6F1', borderRadius: '4px' },
                        marginBottom: '0px',
                    }}
                >
                    {KpiDetails?.map((item, index) => (
                        <Grid size={{ xs: 12 }} key={index} sx={{ minWidth: '360px' }}>
                            <KpiCards data={item} timeZone={currentEnv} />
                        </Grid>
                    ))}
                </Grid>

                <Grid container flexDirection={"column"} alignItems={"flex-start"} className="modal-contents-hoh">
                    <Grid size={{ xs: 12 }} sx={{ width: '100%' }}>
                        <Grid container className="modal-contents-flex" alignSelf={"stretch"}>

                            <Grid size={{ xs: 12 }} className="modal-heading">
                                <Grid className='modal-heading-display'>
                                    <Typography className='modal-heading-main'>
                                        Associate Household Member With Another HOH
                                    </Typography>

                                    <Icon className='modal-heading-main-icon'>
                                        <InfoSmallIcon className='modal-heading-main-icon-item' />
                                    </Icon>
                                </Grid>
                            </Grid>

                            <Grid item size={{ xs: 12 }}>
                                <Grid container spacing={2}>
                                    {form_fields?.map((section, index) => (
                                        <Grid item size={{ xs: 12, sm: 12, md: 6 }} key={index}>
                                            {renderFormFields(section, true)}
                                        </Grid>
                                    ))}
                                </Grid>
                            </Grid>

                        </Grid>
                    </Grid>

                    <Grid size={{ xs: 12 }} sx={{
                        display: 'flex',
                        height: '1px',
                        paddingTop: '1px',
                        justifyContent: 'center',
                        alignItems: 'center',
                        alignSelf: 'stretch',
                        backgroundColor: 'rgba(0, 100, 100, 0.12)',
                        marginBottom: '30px',
                    }} />
                </Grid >

            </Grid>
        </ASDrawer >
    );
}

export default ChangeHOH;
