import ModeEditOutlineOutlinedIcon from '@mui/icons-material/ModeEditOutlineOutlined';
import RemoveRedEyeOutlinedIcon from '@mui/icons-material/RemoveRedEyeOutlined';
import HistoryRoundedIcon from '@mui/icons-material/HistoryRounded';
import AccountsSVG from '../assets/customSVGIcons/headers/AccountsSVG';
import ReportIssuesSVG from '../assets/customSVGIcons/ReportIssuesSVG';
import UsersSVG from '../assets/customSVGIcons/headers/UsersSVG';
import OrganizationsSVG from '../assets/customSVGIcons/headers/OrganisationsSVG';
import ProfileSVG from '../assets/customSVGIcons/customer/ProfileSVG';
import PersonalSettingSVG from '../assets/customSVGIcons/headers/PersonalSettingSVG';
// import SwitchProfilSVG from '../assets/customSVGIcons/headers/SwitchProfileSVG';
import KeyIcon from '@mui/icons-material/Key';
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import EditCustomerIcon from '../assets/customSVGIcons/customer/EditCustomerIcon';
import RequestEditHistoryIcon from '../assets/customSVGIcons/customer/RequestEditHistoryIcon';

export const gridActions = [
  { id: 0, label: 'View', icon: RemoveRedEyeOutlinedIcon },
  { id: 1, label: 'Edit', icon: ModeEditOutlineOutlinedIcon },
];

export const modalActions = [{ id: 0, label: 'Report an Issue', icon: ReportIssuesSVG }];
export const ViewUserActions = [
  { id: 0, label: 'Edit', icon: EditRoundedIcon },
  { id: 1, label: 'Reset Password', icon: KeyIcon },
  { id: 2, label: 'Report an Issue', icon: ReportIssuesSVG },
];

export const ViewAccountActions = [
  { id: 0, label: 'Edit', icon: EditRoundedIcon },
  { id: 2, label: 'Report an Issue', icon: ReportIssuesSVG },
];

export const MOBILE_REGEX = /^[0-9]{10}$/;

export const filterOptionsForStatus = [
  { label: 'Active', value: 'Active' },
  { label: 'Deactivated', value: 'Deactivated' },
];

export const orgKpiEditHistoryData = [
  { title: 'Organization', label1: 'United Healthcare', label2: '' },
  { title: 'Created By', label1: 'Ganesh Lad', label2: 'Administrator' },
  { title: 'Created On', label1: '10/16/2024', label2: '09:27 AM' },
];

export const orgActions = [
  { id: 0, label: 'Edit', icon: ModeEditOutlineOutlinedIcon },
  { id: 1, label: 'Edits History', icon: HistoryRoundedIcon },
  { id: 2, label: 'Report an Issue', icon: ReportIssuesSVG },
];

export const headerOptions = (userRole, hasAccess) => {
  let options = [
    { id: 0, label: 'Accounts', icon: AccountsSVG },
    { id: 1, label: 'Issues', icon: ReportIssuesSVG },
    { id: 2, label: 'Organizations', icon: OrganizationsSVG },
    { id: 3, label: 'Users', icon: UsersSVG },
  ];

  if (!userRole?.includes('parent_admin')) {
    options = options.filter((option) => option.label !== 'Accounts');
  }

  // Remove 'Organizations' if hasAccess is false
  if (!hasAccess) {
    options = options.filter((option) => option.label !== 'Organizations');
  }

  return options;
};

export const profileOptions = [
  { id: 0, label: 'My Profile', icon: ProfileSVG },
  // { id: 1, label: 'Switch Profile', icon: SwitchProfileSVG },
  { id: 1, label: 'Personal Settings', icon: PersonalSettingSVG },
];
export const CustomerActions = [
  { id: 0, label: 'View', icon: RemoveRedEyeOutlinedIcon },
  { id: 1, label: 'Edit', icon: ModeEditOutlineOutlinedIcon },
  { id: 2, label: 'Activity History', icon: HistoryRoundedIcon },
  { id: 3, label: 'Edits History', icon: HistoryRoundedIcon },
  { id: 4, label: 'Request Edits History', icon: HistoryRoundedIcon },
  { id: 5, label: 'Requested Edits History', icon: HistoryRoundedIcon },
];

export const viewCustomerDetailsActions = [
  { id: 0, label: 'Request edits', icon: EditCustomerIcon },
  { id: 1, label: 'View requested edits history', icon: RequestEditHistoryIcon },
];
  
export const filterOptionsForOrg = [
  { label: 'Active', value: 'Active' },
  { label: 'Not Active', value: 'Not Active' },
];
