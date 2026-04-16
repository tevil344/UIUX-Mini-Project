const LIMITS = {
  name: 80,
  prn: 24,
  employeeId: 24,
  email: 120,
  password: 72,
};

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const NAME_PATTERN = /^[A-Za-z][A-Za-z\s.'-]*$/;
const PRN_PATTERN = /^[A-Za-z0-9/-]+$/;

function stripControlChars(value) {
  return value.replace(/[\u0000-\u001F\u007F]/g, "");
}

function collapseWhitespace(value) {
  return value.replace(/\s+/g, " ").trim();
}

function sanitizePlainText(value, maxLength) {
  return collapseWhitespace(stripControlChars(String(value ?? "")).slice(0, maxLength));
}

function sanitizeEmail(value) {
  return sanitizePlainText(value, LIMITS.email).toLowerCase();
}

function sanitizePassword(value) {
  return stripControlChars(String(value ?? "")).slice(0, LIMITS.password);
}

export function sanitizeAuthDraft(draft) {
  return {
    name: sanitizePlainText(draft.name, LIMITS.name),
    prn: draft.role === "teacher" ? "" : sanitizePlainText(draft.prn, LIMITS.prn).toUpperCase(),
    employeeId: draft.role === "teacher" ? sanitizePlainText(draft.employeeId, LIMITS.employeeId).toUpperCase() : "",
    email: sanitizeEmail(draft.email),
    password: sanitizePassword(draft.password),
    role: draft.role || "student",
    division: draft.division || "TY Computer Engineering - Div A",
  };
}

export function validateAuthInput(draft, mode = "login") {
  const values = sanitizeAuthDraft(draft);
  const errors = {};

  if (!values.email) {
    errors.email = "Email is required";
  } else if (values.email.length > LIMITS.email || !EMAIL_PATTERN.test(values.email)) {
    errors.email = "Enter a valid email address";
  }

  if (!values.password) {
    errors.password = "Password is required";
  } else if (values.password.length < 8) {
    errors.password = "Password must be at least 8 characters";
  } else if (values.password.length > LIMITS.password) {
    errors.password = "Password is too long";
  }

  if (mode === "register") {
    if (!values.name) {
      errors.name = "Full name is required";
    } else if (!NAME_PATTERN.test(values.name)) {
      errors.name = "Use letters, spaces, apostrophes, dots, or hyphens only";
    }

    if (values.role === "teacher") {
      if (!values.employeeId) {
        errors.employeeId = "Employee ID is required";
      } else if (!PRN_PATTERN.test(values.employeeId)) {
        errors.employeeId = "Use letters, numbers, /, or - only";
      }
    } else {
      if (!values.prn) {
        errors.prn = "PRN is required";
      } else if (!PRN_PATTERN.test(values.prn)) {
        errors.prn = "Use letters, numbers, /, or - only";
      }
    }
  }

  return {
    values,
    errors,
    isValid: Object.keys(errors).length === 0,
  };
}

export function makeInitials(name) {
  return sanitizePlainText(name, LIMITS.name)
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join("");
}
