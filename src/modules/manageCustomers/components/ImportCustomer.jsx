import { useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { Box, Divider, Typography } from '@mui/material';
import ASDrawer from '../../../components/mainComponents/ASDrawer';
import { useDispatch, useSelector } from 'react-redux';
import { CustomersContext } from '../ManageCustomers';
import {
  createImportCustomerAction,
  getImportCustomerFormFields,
  importCustomerAction,
} from '../../../redux/slice/manageCustomers/ManageCustomersSlice';
import Grid from '@mui/material/Grid2';
import { useSnackbar } from '../../../context/SnackbarContext';
import { importGriddata } from '../../../DummyJson';
import Person_import_ASF from '../../../assets/customSVGIcons/person_import_ASF';
import '../../../styles/manageCustomers.styles.css';
import FormFieldRenderer from '../../FormFieldRenderer';
import { IMPORT_CUSTOMER } from '../../../utils/enums/CustomersEnums';
import DropdownMenu from '../../../components/mainComponents/DropdownMenu';
import { modalActions } from '../../../utils/constants';
import UserImage from '../../../assets/customSVGIcons/customer/UserImage';

function ImportCustomer() {
  const dispatch = useDispatch();
  const viewCustomerDetailsContext = useContext(CustomersContext);
  const { openImportCustomer, setOpenImportCustomer, selectedOption, setGridApiFlag } =
    viewCustomerDetailsContext || {};
  const { importFormFieldData } = useSelector((state) => state?.manageCustomers);
  const [sectionTypeInfo, setSectionTypeInfo] = useState([]);
  const [formValues, setFormValues] = useState({});
  const [validationErrors, setValidationErrors] = useState({});
  const { showSnackbar } = useSnackbar();
  const [searchLoader, setSearchLoader] = useState(false);
  const [searchValueData, setSearchValueData] = useState([]);
  const [searchValueDataSubmit, setSearchValueDataSubmit] = useState({});
  const [searchImport, setSearchImport] = useState(false);
  const [showFooterFlag, setShowFooterFlag] = useState(false);

  const [avatarInitialText, setAvatarInitialText] = useState('');

  useEffect(() => {
    if (selectedOption?.value === IMPORT_CUSTOMER) dispatch(getImportCustomerFormFields());
  }, [selectedOption?.value]);

  const handleSearch = () => {
    setShowFooterFlag(false);
    setSearchLoader(true);
    setSearchValueData({});
    const searchAction = createImportCustomerAction(formValues);

    dispatch(searchAction).then((data) => {
      setSearchLoader(false);
      setSearchValueDataSubmit(data?.payload?.data);
      if (data?.payload?.display_table) {
        const formattedData = Object.entries(data.payload.display_table).map(([key, value]) => ({
          label: key,
          value: value,
        }));
        setSearchValueData(formattedData);
      }

      if (data?.payload?.status === 'error') {
        showSnackbar({
          message: data?.payload?.message,
          severity: data?.payload?.status === 'error' ? 'error' : 'success',
        });
      }
    });
  };

  useEffect(() => {
    setSectionTypeInfo(importFormFieldData?.fields?.field_data);
    setFormValues({});
  }, [importGriddata, importFormFieldData]);

  const handleInputChange = useCallback((fieldName, value, type) => {
    setFormValues((prevValues) => ({ ...prevValues, [fieldName]: type === 'select' ? value : value }));
    setValidationErrors((prevErrors) => ({ ...prevErrors, [fieldName]: '' }));
  }, []);

  const renderFormFields = useMemo(() => {
    const RenderedField = (choice) => (
      <FormFieldRenderer
        choice={choice}
        formValues={formValues}
        handleInputChange={handleInputChange}
        validationErrors={validationErrors}
        endAdornment={true}
        searchLoader={searchLoader}
        handleSearch={handleSearch}
        setAvatarInitialText={setAvatarInitialText}
      />
    );
    RenderedField.displayName = 'RenderedField';
    return RenderedField;
  }, [formValues, validationErrors, searchLoader]);

  const CustomerImportDetails = () => {
    return (
      <>
        <Grid item size={{ xs: 12 }} style={{ margin: '30px 0px' }}>
          <Divider />
        </Grid>
        <Box className="input-custom-details-item">
          {searchValueData.map((field, index) => (
            <div className="input-item" key={index}>
              <div className="input-item-label">
                <Typography className="input-label-key" variant="body2">
                  {field.label}
                </Typography>
              </div>
              <div className="input-value">
                <Typography variant="body2">{field.value}</Typography>
              </div>
            </div>
          ))}
        </Box>
        <Grid item size={{ xs: 12 }} style={{ margin: '30px 0px' }}>
          <Divider />
        </Grid>
      </>
    );
  };

  useEffect(() => {
    return () => {
      setFormValues({});
      setValidationErrors({});
      setSearchValueData({});
      setShowFooterFlag(false);
    };
  }, [openImportCustomer]);

  const handleSubmit = () => {
    setSearchImport(true);
    const searchAction = importCustomerAction(searchValueDataSubmit);
    dispatch(searchAction).then((data) => {
      showSnackbar({
        message: data?.payload?.message,
        severity: data?.payload?.status === 'error' ? 'error' : 'success',
      });
      if (data?.payload?.status === 'success') {
        setGridApiFlag(true);
      }
      setOpenImportCustomer(false);
      setSearchImport(false);
    });
  };

  useEffect(() => {
    if (Object.keys(searchValueData).length !== 0) setShowFooterFlag(true);
  }, [searchValueData]);

  return (
    <ASDrawer
      {...{
        open: openImportCustomer,
        setOpen: setOpenImportCustomer,
        action: selectedOption?.label,
        headerName: IMPORT_CUSTOMER,
        showFooter: showFooterFlag,
        width: '440px',
        headerImage: UserImage,
        onSubmit: handleSubmit,
        loader: searchImport,
        actionButton: 'Import',
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
    >
      <Grid container size={{ xs: 12, md: 12 }}>
        <Box className="render-section-box">
          {sectionTypeInfo?.map((section, index) => (
            <Grid size={{ xs: 12, md: 12 }} key={index}>
              {renderFormFields(section, true)}
            </Grid>
          ))}

          {Object.keys(searchValueData).length !== 0 && <CustomerImportDetails />}
        </Box>
      </Grid>

      {Object.keys(searchValueData).length === 0 && (
        <Grid container className="avatar-box-container" size={{ xs: 12, md: 12 }}>
          <Grid size={{ xs: 12, md: 12 }} className="avatar-box-item">
            <Grid className="avatar-box-item-1">
              <Person_import_ASF className="avatar-box-item-asf" />
            </Grid>
          </Grid>

          <Grid size={{ xs: 12, md: 12 }} className="avatar-box-item-text">
            <Typography className="avatar-box-item-text-1">
              {` ${avatarInitialText ? avatarInitialText : ''} `}
            </Typography>
          </Grid>
        </Grid>
      )}
    </ASDrawer>
  );
}

export default ImportCustomer;
