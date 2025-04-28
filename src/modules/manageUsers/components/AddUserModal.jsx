import { useContext, useEffect, useMemo, useState } from 'react';

import { Typography, Chip, Divider } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import dayjs from 'dayjs';
import Grid from '@mui/material/Grid2';

import userImage from '../../../assets/images/User.svg';
import ASAutocomplete from '../../../components/mainComponents/ASAutocomplete';
import CustomDatePicker from '../../../components/CustomDatePicker';
import {
  clearEditUserInfoDetails,
  createNewUser,
  editUserDetails,
  getSiteDetails,
} from '../../../redux/slice/manageUsers/ManageUsersSlice';
import CustomOutlinedInput from '../../../components/CustomOutlinedInput';
import { ManageUsersContext } from '../ManageUsers';

import { modalActions } from '../../../utils/constants';
import ASDrawer from '../../../components/mainComponents/ASDrawer';
import DropdownMenu from '../../../components/mainComponents/DropdownMenu';
import SectionHeaders from '../../../components/mainComponents/SectionHeaders';
import RequiredMessage from '../../../components/mainComponents/RequiredMessage';
import { validateUserForm } from '../helpers/createAndEditUsersValidations';
import MaskInput from '../../../components/MaskInput';
import { useSnackbar } from '../../../context/SnackbarContext';

const AddUserModal = () => {
  const dispatch = useDispatch();
  const { showSnackbar } = useSnackbar();
  const manageUsersContext = useContext(ManageUsersContext);
  const { openAddUserModal, handleCloseAddModal, userId, formFieldsData } = manageUsersContext || {};

  const { editUserViewloader, createUserLoader, userEditLoader, createUserDetails, userEditDetails } =
    useSelector((state) => state?.manageUsers);

  const userDetail = useSelector((state) => state?.manageUsers?.editUserViewDetails?.data);
  const { currentEnv, user } = useSelector((state) => state?.authenticationSlice);

  let defaultUserData = {
    firstName: '',
    lastName: '',
    email: '',
    mobile: '',
    office: '',
    activeDate: null,
    deActiveDate: null,
    account: { value: '', label: '' },
    site: { value: '', label: '' },
    role: { value: '', label: '' },
    supervisor: { value: '', label: '' },
  };
  const minDate = dayjs().tz(currentEnv?.time_zone)?.startOf('day');
  const [userData, setUserData] = useState(defaultUserData);
  const [rolesOptions, setRoleOptions] = useState([]);
  const [supervisorOptions, setSupervisorOptions] = useState([]);
  const [accOptions, setAccOptions] = useState([]);
  const [siteAdd, setSiteAdd] = useState({});
  const [siteOptions, setSiteOptions] = useState([]);
  const [isUserValid, setIsUserValid] = useState(false);
  const [hideSupervisor, setHideSupervisor] = useState(true);
  const [isRequiredSite, setIsRequiredSite] = useState(false);
  const [validationErrors, setValidationErrors] = useState({});

  let rolesOptionsTemp = formFieldsData?.fields?.role?.options;
  let supervisorOptionsTemp = formFieldsData?.fields?.field_assigned_to_supervisor?.options;
  let siteOptionsTemp = formFieldsData?.fields?.field_site?.options;
  const AccountOptions = formFieldsData?.fields?.assigned_to_node?.options;
  const site_required_roles = formFieldsData?.fields?.site_required_roles;

  const [selectedOption, setSelectedOption] = useState(null);
  const siteDetails = useSelector((state) => state?.manageUsers?.siteDetails?.data);
  const roles = useSelector((state) => state?.authenticationSlice?.user?.userData?.roles);

  const localUserRole = roles && roles[0];
 
  useEffect(() => {
    const useroption = ["assessment_specialist", "support_staff"];
    const isValid =
      String(userDetail?.id) === String(user?.userData?.uid) &&
      user?.userData?.roles?.includes(userDetail?.role) &&
      useroption.includes(userDetail?.role);
  
    setIsUserValid(isValid);
  }, [userDetail, user]); 

  useEffect(() => {
    setRoleOptions(Object.entries(formFieldsData?.fields?.role?.options || {}).map(([value, label]) => ({
      value,
      label
    }))); 
  }, [formFieldsData]); 
  

  useEffect(() => {
    let arr1 = [];
    let arr3 = [];

    rolesOptionsTemp &&
      Object.keys(rolesOptionsTemp)?.map((a, i) => {
        Object.values(rolesOptionsTemp)?.map((b, j) => {
          if (i == j) arr1.push({ value: a, label: b });
        });
      });

    const arr2 = Object.entries(supervisorOptionsTemp || {})
      .map(([key, value]) => ({ value: key, label: value }))
      .sort((a, b) => a.label.localeCompare(b.label));

    if (localUserRole !== 'parent_admin') {
      siteOptionsTemp &&
        Object.keys(siteOptionsTemp)?.map((a, i) => {
          Object.values(siteOptionsTemp)?.map((b, j) => {
            if (i == j) arr3.push({ value: a, label: b });
          });
        });
      setSiteOptions(arr3);
    }

   // setRoleOptions(arr1);
    !userId && setSupervisorOptions(arr2);

    const accountOptions = [];
    AccountOptions &&
      Object.keys(AccountOptions)?.map((a, i) => {
        Object.values(AccountOptions)?.map((b, j) => {
          if (i == j) accountOptions.push({ value: a, label: b });
        });
      });
    setAccOptions(accountOptions);
    setHideSupervisor(true);

    return () => {
      setUserData(defaultUserData);
      setValidationErrors({});
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formFieldsData, userId]);

  useEffect(() => {
    if (userId || userData?.site?.value) {
      setSiteAdd({ ...siteDetails });
    }
  }, [siteDetails, userData?.site?.value, userId]);

  useEffect(() => {
    if (userData?.site?.value) {
      dispatch(getSiteDetails(userData?.site?.value));
    }
  }, [dispatch, userData?.site?.value]);

  useEffect(() => {
    if (userData?.role?.value) {
      const hide_supervisor = ['account_manager', 'supervisor', 'parent_admin']?.includes(
        userData?.role?.value
      );
      setHideSupervisor(hide_supervisor);
      const required_sites =
        site_required_roles && Object.values(site_required_roles)?.includes(userData?.role?.value);
      setIsRequiredSite(required_sites);
    }
  }, [site_required_roles, userData?.role?.value]);

  useEffect(() => {
    if (userData?.account?.value) {
      let siteOptions = [];
      if (userId) {
        siteOptions =
          userDetail?.field_site &&
          Object.entries(userDetail?.field_site[userData?.account?.value] || {}).map(([value, label]) => ({
            value,
            label,
          }));
      } else {
        siteOptions = Object.entries(siteOptionsTemp[userData?.account?.value] || {}).map(
          ([value, label]) => ({
            value,
            label,
          })
        );
      }
      setSiteOptions(siteOptions);
    }
  }, [
    siteOptionsTemp,
    userData?.account?.value,
    userDetail?.assigned_to_node,
    userDetail?.field_site,
    userId,
  ]);

  useEffect(() => {
    if (userId) {
      let accountArray = [];
      let site = '';

      const rolesArray = Object.entries(userDetail?.role_options || {}).map(([value, label]) => ({
        value,
        label,
      }));
     // setRoleOptions(rolesArray);
      let role = rolesArray.find((item) => item?.value == userDetail?.role);

      if (localUserRole === 'parent_admin') {
        site =
          userDetail?.field_site &&
          typeof userDetail?.field_site === 'object' &&
          userDetail?.site_default_id &&
          Object.values(userDetail?.field_site).find((sites) => userDetail?.site_default_id in sites)?.[
            userDetail?.site_default_id
          ];
      } else {
        site = siteOptions?.find((item) => item?.value == userDetail?.field_site);
      }

      userDetail?.assigned_to_node &&
        Object.keys(userDetail?.assigned_to_node)?.map((a, i) => {
          Object.values(userDetail?.assigned_to_node)?.map((b, j) => {
            if (i == j) accountArray.push({ value: a, label: b });
          });
        });
      setAccOptions(accountArray);

      const supervisorArray = Object.entries(userDetail?.field_assigned_to_supervisor || {})
        .map(([key, value]) => ({ value: key, label: value }))
        .sort((a, b) => a.label.localeCompare(b.label));

      setSupervisorOptions(supervisorArray);
      setUserData({
        uid: userId,
        firstName: userDetail?.field_first_name,
        lastName: userDetail?.field_last_name,
        email: userDetail?.email,
        mobile: userDetail?.field_mobile_no_,
        office: userDetail?.field_office_no,
        activeDate: userDetail?.field_date
          ? dayjs(new Date(userDetail?.field_date))?.tz(currentEnv?.time_zone)
          : null,
        deActiveDate: dayjs(new Date(userDetail?.field_deactivated_date)).tz(currentEnv?.time_zone),
        field_mobile_no_: userDetail?.field_mobile_no_,
        field_office_no: userDetail?.field_office_no,
        field_office_no_ext: userDetail?.field_office_no_ext,

        site: site ? site : '',
        role: role ? role : '',
        supervisor: userDetail?.supervisor_default_id
          ? supervisorArray?.find((item) => item.value === userDetail?.supervisor_default_id)
          : '',
        account: userDetail?.assigned_to_node_default_id
          ? accountArray?.find((item) => item.value === userDetail?.assigned_to_node_default_id)
          : '',
      });
      setHideSupervisor(['account_manager', 'supervisor', 'parent_admin']?.includes(userDetail?.role));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userDetail, userId]);

  useEffect(() => {
    if (Object.keys(validationErrors).length > 0) {
      // Scroll to the first error
      const firstErrorField = Object.keys(validationErrors)[0];
      const errorElement = document.getElementById(firstErrorField);
      if (errorElement) {
        errorElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }
  }, [validationErrors]);

  const handleAddUser = useMemo(() => {
    return () => {
      if (
        !validateUserForm(
          userData,
          setValidationErrors,
          localUserRole,
          hideSupervisor,
          isRequiredSite,
          userDetail,
          userId,
          user?.userData?.uid,
          minDate
        )
      ) {
        return;
      }

      let data = {
        field_first_name: userData?.firstName?.trim(),
        field_last_name: userData?.lastName?.trim(),
        email: userData?.email,

        field_mobile_no_: userData?.mobile?.replace(/^[-]+$/, ''),
        field_office_no: userData?.office?.replace(/^[-]+$/, ''),
        field_office_no_ext: '',

        field_site: userData?.site?.value ? userData?.site?.value : '',
        role: userData?.role?.value,
        field_assigned_to_supervisor: !hideSupervisor ? userData?.supervisor?.value : null,
      };

      if (userDetail?.status == '1') {
        if (userData?.deActiveDate?.isValid()) {
          data.field_deactivated_date = dayjs(userData?.deActiveDate)
            .startOf('day')
            .tz(currentEnv?.time_zone)
            .toISOString();
        } else {
          data.field_deactivated_date = '';
        }
      }
      if (userDetail?.status == '0' || !userId) {
        if (userData?.activeDate?.isValid()) {
          data.field_date = dayjs(userData?.activeDate)
            .startOf('day')
            .tz(currentEnv?.time_zone)
            .toISOString();
        } else {
          data.field_date = '';
        }
      }
      if (localUserRole == 'parent_admin') {
        data.assigned_to_node = userData?.account?.value;
      }

      let actionResult;
      if (userId) {
        data.id = userId;
        actionResult = dispatch(editUserDetails(data));
      } else {
        actionResult = dispatch(createNewUser(data));
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userData, localUserRole, hideSupervisor, isRequiredSite, userDetail, userId, dispatch]);

  const handleData = (e) => {
    const { name, value } = e.target;
    setUserData({
      ...userData,
      [name]: value,
    });
  };

  const handleEmailOnBlur = (e) => {
    const { name, value } = e.target;
    setUserData((prev) => ({
      ...prev,
      [name]: value.trim(), // To remove both leading and trailing spaces on blur
    }));
  };

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
  };

  const handleActiveDeactiveDate = (date, name) => {
    const adjustedDate = dayjs(date).startOf('day').tz(currentEnv?.time_zone, true);
    setUserData({
      ...userData,
      [name]: adjustedDate ? adjustedDate : null,
    });
  };

  const handleCloseModal = () => {
    handleCloseAddModal();
    setSiteAdd({});
    if (!userId) {
      setUserData(defaultUserData);
      setHideSupervisor(false);
      setIsRequiredSite(false);
    }
    setValidationErrors({});
  };

  useEffect(() => {
    if (userEditDetails?.status === 'success' || createUserDetails?.status === 'success') {
      dispatch(clearEditUserInfoDetails());
      handleCloseModal();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [createUserDetails?.status, dispatch, userEditDetails?.status]);

  return (
    <ASDrawer
      {...{
        open: openAddUserModal,
        setOpen: handleCloseModal,
        action: userId ? 'Edit' : 'Create',
        headerImage: userImage,
        onSubmit: handleAddUser,
        headerName: userId ? 'Edit User' : 'Create User',
        leftIcons: userId && (
          <div className="responsive-chip">
            <Chip
              variant="filled"
              color={userDetail?.status === '1' ? 'success' : 'error'}
              label={userDetail?.status == '1' ? 'Active' : 'Deactivated'}
              size="small"
              sx={{ padding: '3px 4px' }}
            />
          </div>
        ),
        rightIcons: (
          <div style={{ gap: 3, fontFamily: 'inter-regular' }} className="items-center">
            <DropdownMenu
              options={modalActions || []}
              onOptionSelect={(option) => handleOptionSelect(option)}
              selectedOption={selectedOption}
            />
          </div>
        ),
        loader: createUserLoader || userEditLoader,
        mainLoader: editUserViewloader,
      }}
    >
      <Grid size={{ xs: 12 }} container spacing={2}>
        <RequiredMessage />
        <Grid size={{ xs: 12 }}>
          <SectionHeaders title="User Information" />
        </Grid>

        <Grid size={{ xs: 12, sm: 6 }}>
          <CustomOutlinedInput
            id="firstName"
            size="small"
            label="First Name"
            isRequired
            value={userData?.firstName}
            name="firstName"
            onChange={(e) => handleData(e)}
            isError={!!validationErrors.firstName}
            errorMessage={validationErrors.firstName}
            autoComplete="given-name"
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6 }}>
          <CustomOutlinedInput
            id="lastName"
            size="small"
            label="Last Name"
            isRequired
            value={userData?.lastName}
            name="lastName"
            onChange={(e) => handleData(e)}
            isError={!!validationErrors.lastName}
            errorMessage={validationErrors.lastName}
            autoComplete="family-name"
          />
        </Grid>
        <Grid size={{ xs: 12 }}>
          <CustomOutlinedInput
            id="email"
            size="small"
            label="Email"
            isRequired
            value={userData?.email}
            name="email"
            onChange={(e) => handleData(e)}
            onBlur={handleEmailOnBlur}
            isError={!!validationErrors.email}
            errorMessage={validationErrors.email}
            autoComplete="email"
            disabled={userId !== ''}
          />
        </Grid>
        <Grid size={{ xs: 12 }}>
          <ASAutocomplete
            id="role"
            width="100%"
            label="Role"
            isRequired
            options={rolesOptions}
            //value={rolesOptions.find((option) => option.value === userDetail?.role) || null}
            value={userData.role}
            onChange={(e, value) => {
              setUserData({ ...userData, role: value });
              if (!value?.id) {
                setHideSupervisor(true);
              }
            }}
            
            isError={!!validationErrors.role}
            errorMessage={validationErrors.role}
            disabled={isUserValid}
          />
        </Grid>

        <Grid size={{ xs: 12, sm: 6 }}>
          <MaskInput
            label={'Mobile'}
            name={'mobile'}
            value={userData?.mobile}
            validationErrors={validationErrors}
            placeholder={''}
            handleData={(e) => handleData(e)}
            mask={'000-000-0000'}
            definitions={{
              0: {
                mask: '0',
                placeholderChar: '-',
              },
            }}
          />
        </Grid>

        <Grid size={{ xs: 12, sm: 6 }}>
          <MaskInput
            label={'Office'}
            name={'office'}
            value={userData?.office}
            validationErrors={validationErrors}
            placeholder={''}
            handleData={(e) => handleData(e)}
            mask={'000-000-0000'}
            definitions={{
              0: {
                mask: '0',
                placeholderChar: '-',
              },
            }}
          />
        </Grid>
        {localUserRole === 'parent_admin' ? (
          <Grid size={{ xs: 12 }}>
            <ASAutocomplete
              id="account"
              width="100%"
              label="Account"
              isRequired={true}
              options={accOptions}
              value={userData?.account}
              onChange={(e, value) => setUserData({ ...userData, account: value, site: '' })}
              isError={!!validationErrors.account}
              errorMessage={validationErrors.account}
              disabled={parseInt(user?.userData?.uid) === userId}
            />
          </Grid>
        ) : (
          <Grid size={{ xs: 12 }}>
            <Typography
              component="label"
              sx={[
                {
                  fontSize: '0.875rem',
                  color:'var(--text-secondary-color)',
                  fontFamily: 'inter-semibold',
                },
              ]}
            >
              Account
            </Typography>
            <Typography variant="subtitle2" component="p" gutterBottom>
              {userId ? userDetail?.field_organization : formFieldsData?.fields?.field_organization?.value}
            </Typography>
          </Grid>
        )}

        <Grid size={{ xs: 12 }}>
          <ASAutocomplete
            id="site"
            width="100%"
            label="Site"
            isRequired={isRequiredSite}
            options={siteOptions}
            value={userData?.site}
            onChange={(e, value) => {
              setUserData({ ...userData, site: value });
            }}
            isError={isRequiredSite && !!validationErrors.site}
            errorMessage={isRequiredSite && validationErrors.site}
            disabled={parseInt(user?.userData?.uid) === userId}
          />
        </Grid>
        {userData?.site?.value && siteAdd?.id && (
          <Grid size={{ xs: 12 }} marginBottom="16px">
            <Typography
              component="label"
              sx={[
                {
                  fontSize: '0.875rem',
                  color:'var(--text-secondary-color)',
                  fontFamily: 'inter-semibold',
                },
              ]}
            >
              Address
            </Typography>
            <Typography variant="subtitle2" component="p" gutterBottom>
              {siteAdd?.field_line_1 +
                ', ' +
                siteAdd?.field_line_2 +
                ', ' +
                siteAdd?.field_city +
                ', ' +
                siteAdd?.field_state +
                ', ' +
                siteAdd?.field_zip_}
            </Typography>
          </Grid>
        )}

        {(userDetail?.is_date || !userId) && (
          <>
            <Grid size={{ xs: 12 }} style={{ marginBottom: '1.25rem', marginTop: '1.25rem' }}>
              <Divider />
            </Grid>
            <Grid size={{ xs: 12 }} gap={2} display={{ md: 'flex', ld: 'flex' }} alignItems="center">
              <Grid size={{ xs: 12, sm: 6 }}>
                <SectionHeaders
                  id={userId && userDetail?.status == '1' ? 'deActiveDate' : 'activeDate'}
                  title={userId && userDetail?.status == '1' ? 'Deactivate On' : 'Activate On*'}
                />
              </Grid>
              <Grid size={{ xs: 12, sm: 6 }}>
                {userId && userDetail?.status == '1' ? (
                  <CustomDatePicker
                    id="deActiveDate"
                    name="deActiveDate"
                    onChange={(e) => handleActiveDeactiveDate(e, 'deActiveDate')}
                    value={userData?.deActiveDate?.isValid() ? dayjs(userData.deActiveDate) : null}
                    isError={!!validationErrors.deActiveDate}
                    errorMessage={validationErrors.deActiveDate}
                    minDate={minDate}
                    disabled={isUserValid}
                    sx={[
                      {
                        width: '100%',
                      },
                    ]}
                  />
                ) : (
                  <CustomDatePicker
                    id="activeDate"
                    name="activeDate"
                    onChange={(e) => handleActiveDeactiveDate(e, 'activeDate')}
                    value={userData?.activeDate ? dayjs(userData.activeDate) : null}
                    isError={!!validationErrors.activeDate}
                    errorMessage={validationErrors.activeDate}
                    minDate={minDate}
                    disabled={isUserValid}
                    sx={[
                      {
                        width: '100%',
                      },
                    ]}
                  />
                )}
              </Grid>
            </Grid>
          </>
        )}

        {!hideSupervisor && (
          <>
            <Grid size={{ xs: 12 }} style={{ marginBottom: '1.25rem', marginTop: '1.25rem' }}>
              <Divider />
            </Grid>
            <Grid size={{ xs: 12 }} gap={2} display={{ md: 'flex', ld: 'flex' }} alignItems="center">
              <Grid size={{ xs: 12, md: 12 }}>
                <SectionHeaders id="supervisor" title="Supervisor*" />
              </Grid>
              <Grid size={{ xs: 12, md: 12 }}>
                <ASAutocomplete
                  id="supervisor"
                  width="100%"
                  label=""
                  isRequired
                  options={supervisorOptions?.filter((sup) => parseInt(sup?.value) !== userDetail?.id)}
                  value={userData?.supervisor}
                  onChange={(e, value) => setUserData({ ...userData, supervisor: value })}
                  isError={!!validationErrors.supervisor}
                  errorMessage={validationErrors.supervisor}
                  disabled={isUserValid}
                />
              </Grid>
            </Grid>
          </>
        )}
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
  );
};

export default AddUserModal;
