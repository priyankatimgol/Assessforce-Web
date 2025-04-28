const getRoleColor = (role) => {
  if (role === 'account_manager') {
    return 'var(--account-manager-color)';
  } else if (role === 'support_staff') {
    return 'var(--support-staff-color)';
  } else if (role === 'assessment_specialist') {
    return 'var(--assessment-specialist-color)';
  } else if (role === 'parent_admin') {
    return 'var(--parent-admin-color)';
  } else if (role === 'supervisor') {
    return 'var(--supervisor-color)';
  } else if (role === 'Administrator') {
    return 'var(--admin-color)';
} else {
    return '#558B2F';
  }
};

export default getRoleColor;
