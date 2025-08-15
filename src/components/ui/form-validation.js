export const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validatePhone = (phone) => {
  const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
  return phoneRegex.test(phone.replace(/\s/g, ''));
};

export const validatePassword = (password) => {
  return {
    isValid: password.length >= 8,
    hasUpperCase: /[A-Z]/.test(password),
    hasLowerCase: /[a-z]/.test(password),
    hasNumbers: /\d/.test(password),
    hasSpecialChar: /[!@#$%^&*(),.?":{}|<>]/.test(password),
  };
};

export const validateRequired = (value) => {
  return value && value.toString().trim().length > 0;
};

export const getPasswordStrength = (password) => {
  const validation = validatePassword(password);
  let score = 0;
  
  if (validation.isValid) score += 20;
  if (validation.hasUpperCase) score += 20;
  if (validation.hasLowerCase) score += 20;
  if (validation.hasNumbers) score += 20;
  if (validation.hasSpecialChar) score += 20;
  
  if (score < 40) return { strength: 'weak', color: 'red' };
  if (score < 80) return { strength: 'medium', color: 'amber' };
  return { strength: 'strong', color: 'green' };
};