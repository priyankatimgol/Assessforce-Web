export const validateForm = (formData, setValidationErrors, setEFormErrors, rows, isDateMandatory) => {
  const errors = {};
  const hasEmptyFields = rows.some((row) =>
    ['type', 'eform', 'access'].some((field) => !row[field] || row[field] === 'Select')
  );

  let eFormErrors = [];
  rows.forEach((row) => {
    const rowErrors = {};
    ['type', 'eform', 'access'].forEach((field) => {
      if (!row[field] || row[field] === 'Select') {
        rowErrors[field] = true;
      }
    });
    if (Object.keys(rowErrors).length > 0) {
      eFormErrors[row.id] = rowErrors; // Assign errors to the row ID
    }
  });

  if (!formData.name.trim()) {
    errors.name = 'Name is required.';
  }

  if (!formData.displayName.trim()) {
    errors.displayName = 'Display Name is required.';
  }

  if (!formData.parent) {
    errors.parent = 'Parent is required.';
  }

  // if (hasEmptyFields) {
  //   errors.eForm = 'All fields are required.';
  // }

  setEFormErrors(eFormErrors);
  if (eFormErrors.length > 0) {
    errors.eForm = 'All fields are required.';
  }

  if (isDateMandatory && !formData?.activationDate?.isValid()) {
    errors.activationDate = 'Activate on is required.';
  }

  if (formData?.userCapOverride && formData?.userCapOverride < 1) {
    errors.userCapOverride = 'User cap override must be equal to or greater than 1.';
  }

  setValidationErrors(errors);

  // Return true if there are no errors
  return Object.keys(errors).length === 0;
};
