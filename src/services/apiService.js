import { DEFAULT_USER_PROFILE, DEFAULT_TEACHER_PROFILE } from "../data/mockUsers";
import {
  clearSession,
  getAllAccounts,
  getSession,
  getStoredAccounts,
  saveSession,
  saveStoredAccounts,
} from "./authStorage";
import { makeInitials, validateAuthInput } from "../utils/auth";

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export const apiService = {
  login: async (email, password) => {
    await delay(800);

    const { values, errors, isValid } = validateAuthInput({ email, password }, "login");
    if (!isValid) {
      throw new Error(errors.email || errors.password || "Invalid credentials");
    }

    const account = getAllAccounts().find(
      (item) => item.email === values.email && item.password === values.password,
    );

    if (!account) {
      throw new Error("No matching account found. Create an account first.");
    }

    saveSession(account.user);
    return account.user;
  },

  register: async (data) => {
    await delay(1000);

    const { values, errors, isValid } = validateAuthInput(data, "register");
    if (!isValid) {
      throw new Error(Object.values(errors)[0] || "Invalid registration details");
    }

    const accounts = getStoredAccounts();
    const exists = accounts.some((item) => item.email === values.email);
    if (exists) {
      throw new Error("An account with this email already exists");
    }

    const defaultProfile = values.role === "teacher" ? DEFAULT_TEACHER_PROFILE : DEFAULT_USER_PROFILE;

    const newUser = {
      ...defaultProfile,
      name: values.name,
      prn: values.role === "teacher" ? "" : values.prn,
      employeeId: values.role === "teacher" ? values.employeeId : "",
      email: values.email,
      division: values.division || defaultProfile.division,
      initials: makeInitials(values.name),
      role: values.role || "student",
    };

    saveStoredAccounts([
      ...accounts,
      { email: values.email, password: values.password, user: newUser },
    ]);

    saveSession(newUser);
    return newUser;
  },

  logout: async () => {
    await delay(300);
    clearSession();
  },

  fetchData: async () => {
    await delay(800);
    return true;
  },

  getSession,
};
