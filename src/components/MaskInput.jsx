import { useState, useCallback, useRef } from 'react';
import { IMaskInput } from 'react-imask';
import PropTypes from 'prop-types';
import CustomOutlinedInput from './CustomOutlinedInput';

const MaskInput = ({
  label,
  name,
  value,
  handleData,
  placeholder,
  mask,
  validationErrors,
  definitions,
  initialMaskValue = '0',
  ...props
}) => {
  const maskRef = useRef(null);
  const [isLazy, setIsLazy] = useState(true);

  const handleFocus = useCallback(() => {
    setIsLazy(false);
  }, []);

  // const handleBlur = useCallback(() => {
  //   setIsLazy(true);
  //   if (maskRef.current?.maskRef?.value) {
  //     const rawValue = maskRef.current.maskRef.unmaskedValue;
  //     const expectedLength = mask.split('')?.filter((char) => char === initialMaskValue)?.length;
  //     if (!rawValue || rawValue.length < expectedLength) {
  //       maskRef.current.maskRef.value = '';
  //       handleData?.({ target: { name: name, value: '' } });
  //     }
  //   }
  // }, [mask, handleData, name]);

  const handleAccept = useCallback(
    (value) => {
      handleData?.({ target: { name: name, value } });
    },
    [handleData, name]
  );

  return (
    <CustomOutlinedInput
      id={name}
      label={label}
      name={name}
      size="small"
      value={value || ''}
      inputComponent={IMaskInput}
      placeholder={placeholder}
      inputProps={{
        ref: maskRef,
        mask: mask,
        definitions: definitions,
        lazy: isLazy,
        onAccept: handleAccept,
        overwrite: false,
        style: {
          padding: '0.75rem 0.875rem',
          height: '1.5rem'
        },
      }}
      onFocus={handleFocus}
      // onBlur={handleBlur}
      isError={!!validationErrors?.[name]}
      errorMessage={validationErrors?.[name]}
      {...props}
    />
  );
};

MaskInput.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.string,
  handleData: PropTypes.func,
  mask: PropTypes.string,
  placeholder: PropTypes.string,
  definitions: PropTypes.object,
  validationErrors: PropTypes.object,
  initialMaskValue: PropTypes.string,
};

export default MaskInput;
