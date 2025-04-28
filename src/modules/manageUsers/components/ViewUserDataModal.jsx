import { useContext, useRef, useState } from 'react';
import { UsersDetailsContext } from '../ManageUsers';
import userImage from '../../../assets/images/User.svg';
import { Chip, Divider, IconButton, Tooltip, Typography, useMediaQuery } from '@mui/material';
import KeyIcon from '@mui/icons-material/Key';
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import Grid from '@mui/material/Grid2';

import ASDrawer from '../../../components/mainComponents/ASDrawer';
import DropdownMenu from '../../../components/mainComponents/DropdownMenu';
import { modalActions, ViewUserActions } from '../../../utils/constants';
import ResetPasswordDialog from './ResetPasswordDialog';
import SectionHeaders from '../../../components/mainComponents/SectionHeaders';
import dayjs from 'dayjs';
import { useSelector } from 'react-redux';

const ViewUserDataModal = () => {
  const menuRef = useRef(null);
  const viewUsersDetailsContext = useContext(UsersDetailsContext);
  const { openViewModal, handleCloseViewModal, userDetail, handleToggleEdit, userId, loader, isEdit } =
    viewUsersDetailsContext || {};
  const isMobile = useMediaQuery('(max-width:768px)');

  const { currentEnv } = useSelector((state) => state?.authenticationSlice);
  const {
    field_first_name,
    field_last_name,
    role,
    field_mobile_no_,
    field_office_no,
    field_office_no_ext,
    status,
    email,
    field_organization,
    field_site,
    address,
    field_date,
    field_deactivated_date,
    field_assigned_to_supervisor,
    role_name,
  } = userDetail || {};

  const [selectedOption, setSelectedOption] = useState(null);
  const [resetPassword, setResetPassWord] = useState(false);
  const [resetPasswordAnchor, setResetPasswordAnchor] = useState(false);

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
    if (option?.label === 'Edit') {
      handleEdit(userId);
    } else if (option?.label === 'Reset Password') {
      setResetPasswordAnchor(!resetPasswordAnchor);
    }
  };

  const handleOpenResetPasswordMenu = () => {
    setResetPasswordAnchor(!resetPasswordAnchor);
  };

  const handleCloseMenu = () => {
    setResetPasswordAnchor(false);
  };

  const handleClose = () => {
    handleCloseViewModal();
    setResetPasswordAnchor(false);
  };

  const handleEdit = (id) => {
    handleToggleEdit(id);
    setResetPasswordAnchor(false);
  };

  const callBack = () => {
    setResetPasswordAnchor(false);
  };

  return (
    <ASDrawer
      {...{
        open: openViewModal,
        setOpen: handleClose,
        action: 'Create',
        headerName: 'User',
        showFooter: false,
        headerImage: userImage,
        leftIcons: status && (
          <div className="responsive-chip">
            <Chip
              variant="filled"
              color={status === 'Active' ? 'success' : 'error'}
              label={status}
              size="small"
              sx={{ padding: '3px 4px' }}
            />
          </div>
        ),
        rightIcons: (
          <div style={{ gap: 3, fontFamily: 'inter-regular' }} className="items-center">
            {!isMobile && isEdit && (
              <Tooltip title="Edit user">
                <IconButton aria-haspopup="true" onClick={() => handleEdit(userId)}>
                  <EditRoundedIcon className="hover-icon pointer" />
                </IconButton>
              </Tooltip>
            )}

            {!isMobile && isEdit && (
              <Tooltip title="Reset Password" ref={menuRef}>
                <IconButton aria-haspopup="true" onClick={handleOpenResetPasswordMenu}>
                  <KeyIcon className="hover-icon pointer" />
                </IconButton>
              </Tooltip>
            )}

            <div className="view_modal_dropdown_icon">
              <DropdownMenu
                options={isMobile && isEdit ? ViewUserActions : modalActions || []}
                onOptionSelect={(option) => handleOptionSelect(option)}
                selectedOption={selectedOption}
                callBack={callBack}
              />
            </div>
          </div>
        ),
        mainLoader: loader,
      }}
    >
      <Grid size={{ xs: 12 }} container spacing={2} marginTop={1}>
        <Grid size={{ xs: 12 }}>
          <SectionHeaders title="User Information" />
          <Grid container marginTop={2}>
            <Grid size={{ xs: 4, md: 3 }}>
              <Typography className="aaa">Name</Typography>
            </Grid>
            <Grid size={{ xs: 8, md: 9 }}>
              <Typography className="bbb">
                {(field_first_name || field_last_name)
                  ? `${field_first_name || ''} ${field_last_name || ''}`.trim()
                  : '-'}
              </Typography>
            </Grid>
            <Grid size={{ xs: 12 }} className="empty_div"></Grid>
            <Grid size={{ xs: 4, md: 3 }}>
              <Typography className="aaa">Email</Typography>
            </Grid>
            <Grid size={{ xs: 8, md: 9 }}>
              <Typography className="bbb">{email || '-'}</Typography>
            </Grid>
            <Grid size={{ xs: 12 }} className="empty_div"></Grid>
            <Grid size={{ xs: 4, md: 3 }}>
              <Typography className="aaa">Role</Typography>
            </Grid>
            <Grid size={{ xs: 8, md: 9 }}>
              <Typography className="bbb">{role || '-'}</Typography>
            </Grid>
            <Grid size={{ xs: 12 }} className="empty_div"></Grid>
            <Grid size={{ xs: 4, md: 3 }}>
              <Typography className="aaa">Mobile</Typography>
            </Grid>
            <Grid size={{ xs: 8, md: 9 }}>
              <Typography className="bbb">{field_mobile_no_ || '-'}</Typography>
            </Grid>
            <Grid size={{ xs: 12 }} className="empty_div"></Grid>
            <Grid size={{ xs: 4, md: 3 }}>
              <Typography className="aaa">Office</Typography>
            </Grid>
            <Grid size={{ xs: 8, md: 9 }}>
              <Typography className="bbb">{field_office_no_ext + field_office_no || '-'}</Typography>
            </Grid>
            <Grid size={{ xs: 12 }} className="empty_div"></Grid>

            <Grid size={{ xs: 4, md: 3 }}>
              <Typography className="aaa">Organization</Typography>
            </Grid>
            <Grid size={{ xs: 8, md: 9 }}>
              <Typography className="bbb">{field_organization || '-'}</Typography>
            </Grid>
            <Grid size={{ xs: 12 }} className="empty_div"></Grid>

            <Grid size={{ xs: 4, md: 3 }}>
              <Typography className="aaa">Site</Typography>
            </Grid>
            <Grid size={{ xs: 8, md: 9 }}>
              <Typography className="bbb">{field_site || '-'}</Typography>
            </Grid>
            <Grid size={{ xs: 12 }} className="empty_div"></Grid>

            <Grid size={{ xs: 4, md: 3 }}>
              <Typography className="aaa">Address</Typography>
            </Grid>
            <Grid size={{ xs: 8, md: 9 }}>
              <Typography className="bbb">{address || '-'}</Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid size={{ xs: 12 }} style={{ marginBottom: '1.25rem', marginTop: '1.25rem' }}>
          <Divider />
        </Grid>
      </Grid>

      <Grid container size={{ xs: 12 }} spacing={2}>
        <Grid size={{ xs: 12 }}>
          <SectionHeaders title="Status" />
          <Grid container marginTop={2}>
            <Grid size={{ xs: 4, md: 3 }}>
              <Typography className="aaa">
                {status === 'Active' ? 'Activated On' : 'Deactivated On'}
              </Typography>
            </Grid>
            <Grid size={{ xs: 8, md: 9 }}>
              <Typography className="bbb">
                {status === 'Active'
                  ? field_date
                    ? dayjs(field_date)?.tz(currentEnv?.time_zone)?.format(currentEnv?.date_format)
                    : '-'
                  : field_deactivated_date !== ''
                    ? dayjs(field_deactivated_date)
                        ?.tz(currentEnv?.time_zone)
                        ?.format(currentEnv?.date_format)
                    : '-'}
              </Typography>
            </Grid>
          </Grid>
        </Grid>
        {/* <Grid size={{ xs: 12}}></Grid> */}
        {role_name && !['account_manager', 'supervisor', 'parent_admin']?.includes(role_name) && (
          <>
            <Grid size={{ xs: 12 }} style={{ marginBottom: '1.25rem', marginTop: '1.25rem' }}>
              <Divider />
            </Grid>
          </>
        )}
      </Grid>

      {role_name && !['account_manager', 'supervisor', 'parent_admin']?.includes(role_name) && (
        <Grid container size={{ xs: 12 }} spacing={2} marginTop={1}>
          <Grid size={{ xs: 12 }}>
            <SectionHeaders title="Supervisor" />
            <Grid container marginTop={2}>
              <Grid size={{ xs: 4, md: 3 }}>
                <Typography className="aaa">Assigned to</Typography>
              </Grid>
              <Grid size={{ xs: 8, md: 9 }}>
                <Typography className="bbb">{field_assigned_to_supervisor || '-'}</Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid size={{ xs: 12 }} className="empty_div"></Grid>
        </Grid>
      )}

      {resetPasswordAnchor && (
        <ResetPasswordDialog
          data={email}
          status={status}
          anchorEl={resetPasswordAnchor}
          handleCloseMenu={handleCloseMenu}
          resetPassword={resetPassword}
          setResetPassWord={setResetPassWord}
        />
      )}
    </ASDrawer>
  );
};

export default ViewUserDataModal;
