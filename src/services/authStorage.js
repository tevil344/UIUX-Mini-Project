import { MOCK_USER_ACCOUNTS } from "../data/mockUsers";

const SESSION_KEY = "sh_session";
const ACCOUNTS_KEY = "sh_accounts";

function safeParse(raw, fallback) {
  try {
    return JSON.parse(raw);
  } catch {
    return fallback;
  }
}

export function getStoredAccounts() {
  const raw = localStorage.getItem(ACCOUNTS_KEY);
  if (!raw) {
    return [];
  }

  const parsed = safeParse(raw, []);
  return Array.isArray(parsed) ? parsed : [];
}

export function saveStoredAccounts(accounts) {
  localStorage.setItem(ACCOUNTS_KEY, JSON.stringify(accounts));
}

export function getAllAccounts() {
  const storedAccounts = getStoredAccounts();
  const storedEmails = new Set(storedAccounts.map((item) => item.email));
  const seededAccounts = MOCK_USER_ACCOUNTS.filter(
    (item) => !storedEmails.has(item.email),
  );
  return [...seededAccounts, ...storedAccounts];
}

export function getSession() {
  const raw = localStorage.getItem(SESSION_KEY);
  return raw ? safeParse(raw, null) : null;
}

export function saveSession(user) {
  localStorage.setItem(SESSION_KEY, JSON.stringify(user));
}

export function clearSession() {
  localStorage.removeItem(SESSION_KEY);
}
