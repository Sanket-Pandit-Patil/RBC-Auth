export const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const isStrongEnoughPassword = (password) => {
  return typeof password === "string" && password.length >= 6;
};

export const isNonEmptyString = (value) => {
  return typeof value === "string" && value.trim().length > 0;
};

export const isValidIdArray = (arr) => {
  return Array.isArray(arr) && arr.every((item) => Number.isInteger(item) && item > 0);
};

export const validateProviderSignup = (body) => {
  const { name, email, password } = body;
  if (!isNonEmptyString(name)) return "Name is required";
  if (!isValidEmail(email)) return "Valid email is required";
  if (!isStrongEnoughPassword(password)) return "Password must be at least 6 characters long";
  return null;
};

export const validateLogin = (body) => {
  const { email, password } = body;
  if (!isValidEmail(email)) return "Valid email is required";
  if (!isStrongEnoughPassword(password)) return "Password must be at least 6 characters long";
  return null;
};

export const validateNameOnly = (body, fieldName = "name") => {
  if (!isNonEmptyString(body[fieldName])) return `${fieldName} is required`;
  return null;
};

export const validateCreateHandyman = (body) => {
  const { name, email, password } = body;
  if (!isNonEmptyString(name)) return "Name is required";
  if (!isValidEmail(email)) return "Valid email is required";
  if (!isStrongEnoughPassword(password)) return "Password must be at least 6 characters long";
  return null;
};

export const validateServiceZoneSelection = (body) => {
  const { serviceIds = [], zoneIds = [] } = body;

  if (!Array.isArray(serviceIds) || !Array.isArray(zoneIds)) {
    return "serviceIds and zoneIds must be arrays";
  }

  if (serviceIds.length > 0 && !isValidIdArray(serviceIds)) {
    return "serviceIds must contain valid integer IDs";
  }

  if (zoneIds.length > 0 && !isValidIdArray(zoneIds)) {
    return "zoneIds must contain valid integer IDs";
  }

  return null;
};