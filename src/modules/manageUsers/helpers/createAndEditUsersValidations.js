import validator from 'validator';
import { MOBILE_REGEX } from '../../../utils/constants';

export const validateUserForm = (
  userData,
  setValidationErrors,
  localUserRole,
  hideSupervisor,
  isRequiredSite,
  userDetail,
  userId,
  loggedInUserId,
  minDate
) => {
  const errors = {};
  const mobile = userData?.mobile?.replace(/\D/g, '');
  const office = userData?.office?.replace(/\D/g, '');

  if (!userData.firstName.trim()) {
    errors.firstName = 'First name is required.';
  }

  if (!userData.lastName.trim()) {
    errors.lastName = 'Last name is required.';
  }

  if (!userData.email.trim()) {
    errors.email = 'Email is required.';
  } else if (!validator.isEmail(userData.email)) {
    errors.email = 'Email is invalid. Enter a valid email (e.g., name@domain.com).';
  }

  if (!userData.role?.value) {
    errors.role = 'Role is required.';
  }

  if (mobile && !MOBILE_REGEX.test(mobile) && mobile?.length !== 10) {
    errors.mobile = 'Mobile number is invalid. Enter a 10-digit number (e.g., 123-456-7890).';
  }

  if (office && !MOBILE_REGEX.test(office) && office?.length !== 10) {
    errors.office = 'Office number is invalid. Enter a 10-digit number (e.g., 123-456-7890).';
  }

  if (localUserRole === 'parent_admin' && !userData?.account?.value) {
    errors.account = 'Account is required.';
  }

  if (isRequiredSite && parseInt(loggedInUserId) !== userId && !userData.site?.value) {
    errors.site = 'Site is required.';
  }

  if (!hideSupervisor && !userData?.supervisor?.value) {
    errors.supervisor = 'Supervisor is required.';
  }

  if (userDetail?.status == '0' || !userId) {
    if (!userData?.activeDate?.isValid()) {
      errors.activeDate = 'Activate on is required.';
    } else if (userData?.activeDate.isBefore(minDate)) {
      errors.activeDate = 'Effective date cannot be a past date.';
    }
  } else if (userDetail?.status == '1' && userDetail?.is_date) {
    if (userData?.deActiveDate?.isValid() && userData?.deActiveDate.isBefore(minDate)) {
      errors.deActiveDate = 'Effective date cannot be a past date.';
    }
  }

  setValidationErrors(errors);

  // Return true if there are no errors
  return Object.keys(errors).length === 0;
};
