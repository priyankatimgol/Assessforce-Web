import { useRef } from 'react';
import { Typography, InputAdornment, IconButton, CircularProgress } from '@mui/material';
import PropTypes from 'prop-types';
import CustomOutlinedInput from '../components/CustomOutlinedInput';
import ASAutocomplete from '../components/mainComponents/ASAutocomplete';
import ASFileUpload from '../components/mainComponents/ASFileUpload';
import ASRadioButtonGroup from '../components/mainComponents/ASRadioButtonGroup';
import MaskInput from '../components/MaskInput';
import CustomDatePicker from '../components/CustomDatePicker';
import dayjs from 'dayjs';
import FormFieldSearch from '../assets/customSVGIcons/FormFieldSearch';
import Grid from '@mui/material/Grid2';

const FormFieldRenderer = ({
  choice,
  formValues,
  handleInputChange,
  validationErrors,
  timeZone,
  endAdornment = false,
  searchLoader = false,
  handleSearch,
  setAvatarInitialText
}) => {
  const fieldRefs = useRef({});
  const minDate = dayjs().tz(timeZone?.time_zone)?.startOf('day');
  const yesterdayEnd = dayjs().tz(timeZone?.time_zone)?.subtract(1, 'day').endOf('day');
  const tomorrowStart = dayjs().tz(timeZone?.time_zone)?.add(1, 'day').startOf('day');

  if (!choice) return null;

  let transformedData = [];
  if (choice.type === 'select' || choice.type === 'radio') {
    transformedData = Object.entries(choice.options || {}).map(([value, label]) => ({ label, value }));
  }

  //Just to set the default value (Label).
  let selectDefaultValue = null;
  if (choice.type === 'select') {
    const valueToMatch =
      formValues[choice.machine_name] !== undefined ? formValues[choice.machine_name] : choice.default_value;
    if (valueToMatch) {
      selectDefaultValue = transformedData.find((option) => option.value === valueToMatch);
    }
  }

  const commonProps = {
    type: choice.type,
    id: choice.machine_name,
    label: choice.title,
    value: formValues[choice.machine_name] || '',
    name: choice.title,
    isRequired: choice.required,
    isErrorIcon: true,
    isError: !!validationErrors[choice.machine_name],
    errorMessage: validationErrors[choice.machine_name],
    maxRows: (choice?.rows && parseInt(choice?.rows)) || 1,
    multiline: parseInt(choice?.rows) > 1 ? true : false,
    startAdornment:
      choice?.sub_type === 'currency' ? (
        <InputAdornment position="start">{choice?.settings?.currency_symbol}</InputAdornment>
      ) : null,
    title: choice.title,
  };

  if (endAdornment === true) {
    setAvatarInitialText(choice.description ? choice.description : '');
  }

  const inputSettingProps = choice?.settings;
  const findMaskInitial = inputSettingProps?.mask?.split('')?.[0];
  const dateRestriction = inputSettingProps?.date_restrictions;
  let dateSelections = {};

  if (dateRestriction === 'curr_past') {
    dateSelections = { maxDate: minDate };
  } else if (dateRestriction === 'curr_future') {
    dateSelections = { minDate: minDate };
  } else if (dateRestriction === 'past') {
    dateSelections = { maxDate: yesterdayEnd }; // Allow only before today
  } else if (dateRestriction === 'future') {
    dateSelections = { minDate: tomorrowStart }; //Allow only after today
  }

  return (
    <div ref={(el) => (fieldRefs.current[choice.machine_name] = el)}>
      {(() => {
        switch (choice.type) {
          case 'number':
          case 'textfield':
            return (
              <CustomOutlinedInput
                {...commonProps}
                size="small"
                onChange={(event) => handleInputChange(choice.machine_name, event.target.value)}
                maxLength={parseInt(inputSettingProps?.character_limit)}
                settings={inputSettingProps}
                typeFromSettings={true}
              />
            );
          case 'select':
            return (
              <ASAutocomplete
                width="100%"
                {...commonProps}
                options={transformedData}
                onChange={(_event, newValue) =>
                  handleInputChange(choice.machine_name, newValue?.value, 'select')
                }
                value={selectDefaultValue}
              />
            );
          case 'file':
            return (
              <ASFileUpload
                {...commonProps}
                onChange={(file) => handleInputChange(choice.machine_name, file, 'file')}
              />
            );
          case 'radio':
            return (
              <Grid container alignItems="center">
                <Grid item xs={12} md={6}>
                  <Typography className="input-label" component="label" htmlFor={choice.title}>
                    Active
                  </Typography>
                </Grid>
                <Grid
                  item
                  xs={12}
                  md={6}
                  display="flex"
                  justifyContent={{ xs: 'flex-start', md: 'flex-end' }}
                >
                  <ASRadioButtonGroup
                    {...commonProps}
                    options={transformedData}
                    onChange={(_event, newValue) => handleInputChange(choice.machine_name, newValue, 'radio')}
                  />
                </Grid>
              </Grid>
            );
          case 'masked_input':
            return (
              <MaskInput
                {...commonProps}
                // placeholder={inputSettingProps?.placeholder || '-'}
                handleData={(_event) => handleInputChange(choice.machine_name, _event?.target?.value)}
                mask={inputSettingProps?.mask}
                definitions={{
                  [findMaskInitial]: {
                    mask: '0',
                    placeholderChar: inputSettingProps?.mask_placeholder || '_',
                  },
                }}
                initialMaskValue={findMaskInitial}

                endAdornment={endAdornment &&
                  inputSettingProps?.mask_placeholder && (
                    <InputAdornment position="end"
                      onClick={!searchLoader && handleSearch}
                    >
                      <IconButton
                        sx={{ padding: 0 }}
                        title={`Search ${commonProps?.label?.replace(/^Enter\s*/, '')}`}
                      >
                        {searchLoader ?
                          <CircularProgress
                            size={24}
                            sx={{ color: 'var(--primary-color)' }} />
                          :
                          <FormFieldSearch />
                        }
                      </IconButton>
                    </InputAdornment>
                  )
                }
              />
            );
          case 'date':
            return (
              <>
                <Grid item xs={6}>
                  <Typography className="input-label" component="label" htmlFor={choice.title}>
                    {choice?.title}
                  </Typography>
                </Grid>
                <CustomDatePicker
                  id={choice?.machine_name}
                  name={choice?.machine_name}
                  onChange={(_event) => {
                    handleInputChange(choice.machine_name, _event?.toISOString());
                  }}
                  value={commonProps?.value ? dayjs(commonProps?.value) : null}
                  sx={[
                    {
                      width: '100%',
                    },
                  ]}
                  maxDate={dateSelections.maxDate}
                  minDate={dateSelections.minDate}
                />
              </>
            );
          case 'textarea':
            return (
              <CustomOutlinedInput
                {...commonProps}
                onChange={(event) => handleInputChange(choice.machine_name, event.target.value)}
                maxLength={{}}
              />
            );
          case 'email': return (
            <CustomOutlinedInput
                {...commonProps}
                onChange={(event) => handleInputChange(choice.machine_name, event.target.value)}
                maxLength={parseInt(inputSettingProps?.character_limit)}
              />
          )
          default:
            return (
              <CustomOutlinedInput
                {...commonProps}
                onChange={(event) => handleInputChange(choice.machine_name, event.target.value)}
              />
            );
        }
      })()}
    </div>
  );
};

FormFieldRenderer.propTypes = {
  choice: PropTypes.object.isRequired,
  formValues: PropTypes.object.isRequired,
  handleInputChange: PropTypes.func.isRequired,
  validationErrors: PropTypes.object.isRequired,
  timeZone: PropTypes.any,
  endAdornment: PropTypes.bool,
  searchLoader: PropTypes.bool,
  handleSearch: PropTypes.func,
};

export default FormFieldRenderer;
