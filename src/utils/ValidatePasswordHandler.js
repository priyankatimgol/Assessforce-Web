const validatePasswordHandler = ({ passwordConfigurations, password = '' }) => {
  if (!passwordConfigurations) return [];

  const errors = [];
  const { uppercase, lowercase, special_characters, min_length, numeric } = passwordConfigurations;

  if (password.length < min_length) {
    errors.push(`length`);
  }
  if ((password.match(/[A-Z]/g) || []).length < uppercase) {
    errors.push(`uppercase`);
  }
  if ((password.match(/[a-z]/g) || []).length < lowercase) {
    errors.push(`lowercase`);
  }
  if ((password.match(/[0-9]/g) || []).length < numeric) {
    errors.push(`numeric`);
  }
  if ((password.match(/[^\w\s]|_/g) || []).length < special_characters) {
    errors.push(`special`);
  }

  return errors;
};

export default validatePasswordHandler;
