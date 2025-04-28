import CustomerId from '../../../assets/customSVGIcons/customer/CustomerIdIcon';
import EditCustomerIcon from '../../../assets/customSVGIcons/customer/EditCustomerIcon';
import RequestEditHistoryIcon from '../../../assets/customSVGIcons/customer/RequestEditHistoryIcon';
import HistoryRoundedIcon from '@mui/icons-material/HistoryRounded';
import PropTypes from 'prop-types';
import EmailIcon from '../../../assets/customSVGIcons/customer/EmailIcon';
import MobileIcon from '../../../assets/customSVGIcons/customer/MobileIcon';
import GenderIcon from '../../../assets/customSVGIcons/customer/GenderIcon';
import SSNIcon from '../../../assets/customSVGIcons/customer/SSNIcon';
import DOBIcon from '../../../assets/customSVGIcons/customer/DOBIcon';
import RemoveRedEyeOutlinedIcon from '@mui/icons-material/RemoveRedEyeOutlined';
import ModeEditOutlineOutlinedIcon from '@mui/icons-material/ModeEditOutlineOutlined';
import ActivityHistory from '../../../assets/customSVGIcons/customer/ActivityHistory';
import ProfileSVG from '../../../assets/customSVGIcons/customer/ProfileSVG';
import Household from '../../../assets/customSVGIcons/customer/Household';
import NameIcon from '../../../assets/customSVGIcons/customer/NameIcon';
const ButtonIconRenderer = ({ type }) => {
  return (
    <div className="icon-wrapper">
      {(() => {
        switch (type) {
          case 'Request Edit':
            return <EditCustomerIcon sx={{ fill: 'var(--primary-color)', width: '18px', height: '18px' }} />;
          case 'Edits History':
            return <HistoryRoundedIcon sx={{ width: '20px', height: '20px' }} />;
          case 'Request Edit History':
            return (
              <RequestEditHistoryIcon sx={{ fill: 'var(--primary-color)', width: '18px', height: '18px' }} />
            );
          case 'Activity History':
            return <ActivityHistory sx={{ width: '20px', height: '20px' }} />;
          case 'field_customer_unique_id':
            return <CustomerId sx={{ fill: 'var(--primary-color)', width: '20px', height: '20px' }} />;
          case 'field_first_namee':
            return <NameIcon sx={{ width: '20px', height: '20px' }} />;
          case 'field_last_namee':
            return <NameIcon sx={{ width: '20px', height: '20px' }} />;
          case 'field_dob2':
            return <DOBIcon sx={{ fill: 'var(--primary-color)', width: '20px', height: '20px' }} />;
          case 'field_age2':
            return (
              <RequestEditHistoryIcon sx={{ fill: 'var(--primary-color)', width: '20px', height: '20px' }} />
            );
          case 'field_email':
            return <EmailIcon sx={{ fill: 'var(--primary-color)', width: '20px', height: '20px' }} />;
          case 'field_mobile_number':
            return <MobileIcon sx={{ fill: 'var(--primary-color)', width: '20px', height: '20px' }} />;
          case 'field_gender':
            return <GenderIcon sx={{ fill: 'var(--primary-color)', width: '20px', height: '20px' }} />;
          case 'field_ssn':
            return <SSNIcon sx={{ fill: 'var(--primary-color)', width: '20px', height: '20px' }} />;

          case 'View':
            return <RemoveRedEyeOutlinedIcon sx={{ width: '20px', height: '20px' }} />;
          case 'Edit':
            return <ModeEditOutlineOutlinedIcon sx={{ width: '20px', height: '20px' }} />;

          case 'Request Edits':
            return <EditCustomerIcon color="currentColor" sx={{ width: '20px', height: '20px' }} />;
          case 'Request Edits History':
            return (
              <RequestEditHistoryIcon
                color="currentColor"
                sx={{
                  width: '20px',
                  height: '20px',
                }}
              />
            );
          case 'Profile':
            return <ProfileSVG sx={{ fill: 'var(--primary-color)', width: '20px', height: '20px' }} />;

          case 'Household':
            return <Household sx={{ fill: 'var(--primary-color)', width: '20px', height: '20px' }} />;

          default:
            return <RequestEditHistoryIcon sx={{ fill: 'var(--primary-color)' }} />;
        }
      })()}
    </div>
  );
};
ButtonIconRenderer.propTypes = {
  type: PropTypes.string.isRequired,
};
export default ButtonIconRenderer;
