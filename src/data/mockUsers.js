export const DEFAULT_USER_PROFILE = {
  name: "Prathmesh M.",
  initials: "PM",
  prn: "22110XXXX",
  division: "TY Computer Engineering - Div B",
  email: "student@pccoe.org",
  academicYear: "AY 2024-25",
  role: "student",
};

export const DEFAULT_TEACHER_PROFILE = {
  name: "Prof. Sharma",
  initials: "PS",
  employeeId: "T1001",
  division: "TY Computer Engineering - Div A",
  email: "teacher@pccoe.org",
  role: "teacher",
};

export const MOCK_USER_ACCOUNTS = [
  {
    email: "prathmesh@pccoe.org",
    password: "password123",
    user: {
      ...DEFAULT_USER_PROFILE,
      name: "Prathmesh M.",
      initials: "PM",
      prn: "22110CSE001",
      email: "prathmesh@pccoe.org",
      role: "student",
    },
  },
  {
    email: "ananya@pccoe.org",
    password: "password123",
    user: {
      ...DEFAULT_USER_PROFILE,
      name: "Ananya S.",
      initials: "AS",
      prn: "22110CSE014",
      division: "TY Computer Engineering - Div A",
      email: "ananya@pccoe.org",
      role: "student",
    },
  },
  {
    email: "rohan@pccoe.org",
    password: "password123",
    user: {
      ...DEFAULT_USER_PROFILE,
      name: "Rohan P.",
      initials: "RP",
      prn: "22110CSE027",
      division: "TY Computer Engineering - Div B",
      email: "rohan@pccoe.org",
      role: "student",
    },
  },
  {
    email: "sharma@pccoe.org",
    password: "password123",
    user: {
      ...DEFAULT_TEACHER_PROFILE,
      name: "Prof. Sharma",
      initials: "PS",
      employeeId: "EDU-T-1001",
      division: "TY Computer Engineering - Div A",
      email: "sharma@pccoe.org",
      role: "teacher",
    },
  },
  {
    email: "patil@pccoe.org",
    password: " ",
    user: {
      ...DEFAULT_TEACHER_PROFILE,
      name: "Prof. Patil",
      initials: "VP",
      employeeId: "EDU-T-2004",
      division: "TY Computer Engineering - Div B",
      email: "patil@pccoe.org",
      role: "teacher",
    },
  },
];
