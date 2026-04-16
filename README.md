# StudentHub Dashboard

StudentHub Dashboard is a polished academic dashboard prototype built with React, Vite, and Tailwind CSS. It is designed as a student-facing interface for tracking coursework, lab attendance, exams, grades, notifications, and profile settings through a modern multi-page dashboard experience.

This project is frontend-only and uses a lightweight mock service with `localStorage` to simulate authentication, session persistence, and demo account handling.

## Overview

The application focuses on delivering a professional student portal experience with:

- A responsive authentication flow with sign in and sign up states
- A dashboard for academic summaries and quick status visibility
- Dedicated sections for assignments, lab sessions, timetable, exams, grades, progress tracking, notifications, and settings
- Persisted UI preferences such as dark mode
- Mock async loading states, toast notifications, and modal-driven actions

## Feature Highlights

- `Authentication`: Form validation, demo login, local session persistence, and basic registration flow
- `Dashboard`: Summary cards for assignments, average score, pending work, and lab attendance
- `Academic Views`: Separate pages for timetable, exams, grades, assignments, lab sessions, and progress tracking
- `Notifications`: Alert center with unread indicators and read state management
- `Settings`: User preference controls including theme behavior
- `UX Details`: Skeleton loading states, responsive sidebar navigation, global search/filter controls, toast feedback, and error boundaries

## Tech Stack

- `React 19`
- `Vite 7`
- `Tailwind CSS 3`
- `PostCSS + Autoprefixer`
- `Lucide React` for icons

## Project Structure

```text
src/
  components/
    common/        # shared UI pieces such as skeletons, toasts, empty states
    layout/        # shell layout, routing, sidebar, header
    modals/        # modal-based interactions
  constants/       # navigation and UI constants
  context/         # global app state via React context
  data/            # mock user and alert data
  pages/           # top-level dashboard views
  services/        # mock API and localStorage persistence
  App.jsx          # app entry composition
  main.jsx         # React bootstrap
```

## Getting Started

### Prerequisites

- `Node.js 20.19+` or `22.12+`
- `npm`

### Installation

```bash
npm install
```

### Run the Development Server

```bash
npm run dev
```

Open the local Vite URL shown in the terminal after the server starts.

## Available Scripts

- `npm run dev` - start the local development server
- `npm run build` - create an optimized production build in `dist/`
- `npm run preview` - preview the production build locally

## Demo Account

Use the bundled test account to access the dashboard immediately:

- `Email:` `test@pccoe.org`
- `Password:` `password123`

You can also create a new account from the sign-up screen. New accounts are stored in browser `localStorage` for demo purposes.

## Implementation Notes

- Authentication and account creation are mocked in `src/services/apiService.js`.
- Global application state is managed through `src/context/AppContext.jsx`.
- Page switching is handled client-side through the layout/router layer in `src/components/layout/PageRouter.jsx`.
- The project currently ships without backend integration or automated tests.

## Build Output

Running `npm run build` generates the production-ready assets inside `dist/`.

## Future Improvements

- Replace the mock API with a real backend and persistent database
- Add unit and integration tests for authentication and dashboard workflows
- Introduce a formal router if deep-linkable pages are needed
- Connect dashboard widgets to live academic data sources

## License

This project is intended for academic and portfolio use unless a separate license is added.
