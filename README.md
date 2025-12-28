# Ride Booking System Frontend

A modern, responsive, and user-friendly frontend for a comprehensive ride booking platform. Built with **React**, **TypeScript**, and **Tailwind CSS**, it provides seamless experiences for riders, drivers, and administrators.

---

## 🎯 Project Overview

This frontend application enables a complete ride-booking experience with role-based interfaces and real-time features. It supports three distinct user types with specialized dashboards and functionality:

-   **Riders** can request rides, track live progress, view history, and manage their profiles.
-   **Drivers** can accept incoming ride requests, manage availability, track earnings, and update ride statuses.
-   **Admins** can oversee all users, manage driver approvals, monitor rides, and access analytics dashboards.

---

## 🌐 Live Deployment

**Frontend URL:** [https://frontend-ride-booking-system.vercel.app/](https://frontend-ride-booking-system.vercel.app/)

**Backend URL:** [https://backend-ride-booking-system-ecru.vercel.app/](https://backend-ride-booking-system-ecru.vercel.app/)

---

## 🔑 Test Credentials

Use these accounts to test the application:

### Super Admin

```
Email: super@gmail.com
Password: 12345678
```

### Driver

```
Email: arif@gmail.com
Password: 1234@Arif
```

### Rider

```
Email: ayon@gmail.com
Password: 1234@Ayon
```

---

## 🔐 Authentication & Authorization

The frontend implements JWT-based authentication with secure session management and role-based access control:

### 1. Login & Registration

-   **Public Endpoint:** Users can register as Rider or Driver with email and password.
-   **JWT Storage:** Access and refresh tokens are securely stored (HTTP-only cookies managed by backend).
-   **Auto-Login:** Authentication state persists across sessions.
-   **Role Selection:** New users select their role during registration (Rider or Driver).

### 2. Role-Based Landing Pages

Upon successful login, users are redirected to role-specific dashboards:

-   **Riders** → Rider Dashboard (Ride Request, History, Profile)
-   **Drivers** → Driver Dashboard (Incoming Requests, Earnings, Ride Management)
-   **Admins** → Admin Dashboard (User Management, Analytics, Ride Oversight)

### 3. Account Status Handling

#### Blocked or Suspended Users

-   Redirected to a dedicated **Account Status Page** displaying:
    -   Current account status (BLOCKED, SUSPENDED, etc.)
    -   Reason for the status
    -   Instructions or contact details to resolve the issue
    -   Logout option

#### Offline Drivers

-   Can access all dashboard pages **except** ride acceptance features.
-   Features like "Incoming Requests" and "Accept Ride" buttons are hidden.
-   Display notice: "Go online to receive ride requests."
-   Online/Offline toggle remains visible for quick status change.

### 4. Persistent Authentication

-   Redux Toolkit manages auth state globally.
-   RTK Query handles API calls with automatic token refresh.
-   Protected routes check authentication and redirect unauthorized users to login.

---

## 🏠 Public Landing Pages

Accessible **without authentication**:

### Home

A comprehensive landing page featuring:

1. **Hero Banner** – Eye-catching introduction with CTA
2. **How-it-Works Overview** – Step-by-step explanation of the booking process
3. **Service Highlights** – Key features and benefits
4. **Customer Testimonials** – Feedback from riders and drivers
5. **Call-to-Action Prompts** – Sign-up and login buttons
6. **Promotions/Special Offers** – Current deals and discounts

### About Us

-   Company background and mission statement
-   Team profiles with roles and descriptions
-   Company values and vision

### Features

Detailed breakdown of:

-   **Rider Capabilities** – Request rides, track progress, view history
-   **Driver Capabilities** – Accept requests, manage availability, track earnings
-   **Admin Capabilities** – Manage users, approve drivers, monitor analytics

### Contact

-   Validated contact form for user inquiries
-   Form fields: Name, Email, Message
-   Simulated submission with success/error feedback

### FAQ

-   Searchable and filterable list of common questions
-   Organized by categories (Riders, Drivers, Admin)
-   Collapsible accordion-style answers

---

## 👤 Rider Features

### 1. Ride Request Form

-   **Pickup Location** – Text input
-   **Destination** – Text input
-   **Distance & Fare Estimation** – Auto-calculated based on backend
-   **Payment Method Selection** – Card, Cash
-   **Request Submission** – Creates ride request with REQUESTED status

### 2. Live Ride Tracking

-   Driver details: Name, vehicle info, rating
-   Ongoing ride status updates
-   Current progress

### 3. Ride History

-   Paginated list of past rides
-   **Search & Filters:**
    -   Date range
    -   Fare range
    -   Ride status (COMPLETED, CANCELED, etc.)
-   Click ride for detailed view

### 4. Ride Details Page

-   Ride location (pickup & drop-off)
-   Timestamps: Requested, Accepted, Picked Up, In Transit, Completed
-   Driver information and rating
-   Ride status timeline
-   Fare breakdown and total cost
-   Cancellation status

### 5. Profile Management

-   **View & Edit Profile:**
    -   Name
    -   Email (read-only)
    -   Phone number
-   **Change Password** – Old and new password validation

---

## 🚗 Driver Features

### 1. Availability Control

-   **Online/Offline Toggle** – Change availability status instantly
-   Status persistence
-   Restricted features when offline (e.g., cannot accept rides)

### 2. Incoming Requests

-   List of pending ride requests from riders
-   Rider details: Name, pickup location, destination, distance, fare
-   **Accept/Reject Actions:**
    -   Accept → Ride status changes to ACCEPTED
    -   Reject → Ride marked as available for other drivers

### 3. Active Ride Management

-   Current active ride display (if any)
-   **Status Update Flow:**
    -   ACCEPTED → PICKED_UP (Rider picked up)
    -   PICKED_UP → IN_TRANSIT (Started traveling)
    -   IN_TRANSIT → COMPLETED (Reached destination)
-   Cancel ride option (with reason)

### 4. Earnings Dashboard

-   **Visual Breakdown:**
    -   Daily earnings
    -   Weekly earnings
    -   Monthly earnings
-   **Charts & Analytics:** Using recharts for visualizations
-   Total earnings summary
-   Completed rides count
-   Average earnings per ride

### 5. Ride History

-   Paginated list of all past rides
-   **Filters & Search:**
    -   Date range
    -   Earnings range
    -   Status (COMPLETED, CANCELED, etc.)
-   Click for detailed ride information

### 6. Profile Management

-   **Vehicle Details:**
    -   Vehicle name
-   **Contact Info:**
    -   Phone number
    -   Email (read-only)
-   **Security:**
    -   Change password
-   **Status Display:** Show approval and availability status

---

## 🛡️ Admin Features

### 1. User Management

-   **User Listing:**
    -   View all registered users (riders, drivers)
    -   **Search & Filters:**
        -   By name or email
        -   By role (RIDER, DRIVER)
        -   By status (ACTIVE, BLOCKED, SUSPENDED)
    -   Pagination and sorting
-   **Actions:**
    -   Block/Unblock riders
    -   View user details
    -   Search and filter capabilities

### 2. Driver Management

-   **Driver Listing:**
    -   View all registered drivers
    -   Approval status (PENDING, APPROVED, SUSPENDED)
    -   **Filters:**
        -   By approval status
    -   Pagination and sorting
-   **Actions:**
    -   Approve pending drivers
    -   Suspend approved drivers
    -   View driver profiles and vehicle info

### 3. Ride Oversight

-   **Ride Listing:**
    -   View all rides across the platform
    -   **Advanced Filters:**
        -   By date range
        -   By status (REQUESTED, ACCEPTED, COMPLETED, CANCELED)
        -   By rider or driver name
    -   Pagination and sorting
-   **Ride Details:**
    -   Full ride information
    -   Timeline and status history
    -   Driver and rider details

### 4. Analytics Dashboard

-   **Data Visualizations:**
    -   Ride volume trends (daily, weekly, monthly)
    -   Revenue trends
    -   Driver activity and performance
    -   User demographics
-   **Key Metrics:**
    -   Total users (riders & drivers)
    -   Total completed rides
    -   Platform revenue
    -   Average rating
-   **Charts:** Bar charts, line charts, pie charts (using recharts)

### 5. Search & Filter Tools

-   Consistent search patterns across all admin pages
-   Advanced filtering with multiple criteria
-   Real-time search results

### 6. Profile Management

-   Update personal information
-   Change password
-   View admin-specific permissions and role

---

## 🛠️ Technology Stack

### Frontend

-   **React 19+** – UI library
-   **TypeScript** – Type-safe development
-   **React Router v7+** – Client-side routing
-   **Vite** – Fast build tool and dev server
-   **Tailwind CSS** – Utility-first CSS framework
-   **shadcn/ui** – Pre-built React components

### State Management & Data Fetching

-   **Redux Toolkit** – Global state management
-   **RTK Query** – Data fetching and caching
-   **Axios** – HTTP client

### UI/UX Enhancements

-   **Recharts** – Data visualization and charts
-   **react-hot-toast** – Toast notifications
-   **Lucide Icons** – Icon library
-   **Tailwind CSS Dark Mode** – Theme support

### Developer Tools

-   **ESLint** – Code quality and linting
-   **TypeScript Strict Mode** – Type safety
-   **Vite Dev Server** – Fast HMR

### Deployment

-   **Vercel** – Frontend hosting

---

## 📁 Project Structure

```
frontend-ride-booking-system/
│
├── src/
│   ├── assets/
│   │   └── icons/              # SVG and icon components
│   │
│   ├── components/
│   │   ├── layout/             # Layout components
│   │   │   ├── CommonLayout.tsx
│   │   │   ├── DashboardLayout.tsx
│   │   │   ├── Navbar.tsx
│   │   │   ├── Footer.tsx
│   │   │   └── ModeToggler.tsx
│   │   ├── modules/            # Feature-specific components
│   │   │   ├── admin/
│   │   │   │   ├── driverColumns.tsx
│   │   │   │   └── riderColumns.tsx
│   │   │   ├── authentication/
│   │   │   │   ├── LoginForm.tsx
│   │   │   │   └── RegisterForm.tsx
│   │   │   └── common/
│   │   │       ├── data-table.tsx
│   │   │       ├── ProfileForm.tsx
│   │   │       ├── VehicleForm.tsx
│   │   │       └── ChangePasswordForm.tsx
│   │   └── ui/                 # Reusable UI components (shadcn/ui based)
│   │
│   ├── config/
│   │   └── index.ts            # App configuration
│   │
│   ├── constants/              # Constants for statuses, roles, etc.
│   │   ├── accountStatus.ts
│   │   ├── approvalStatus.ts
│   │   ├── driverAvailabilityStatus.ts
│   │   ├── paymentMethod.ts
│   │   ├── rideStatus.ts
│   │   └── role.ts
│   │
│   ├── contexts/               # React Context (theme, sidebar)
│   │   ├── theme.context.ts
│   │   └── sidebar.context.ts
│   │
│   ├── hooks/                  # Custom React hooks
│   │   ├── useTheme.ts
│   │   ├── useSidebar.tsx
│   │   └── use-mobile.ts
│   │
│   ├── lib/
│   │   ├── axios.ts            # Axios configuration and interceptors
│   │   └── utils.ts            # Utility functions
│   │
│   ├── pages/                  # Page components
│   │   ├── Home.tsx
│   │   ├── About.tsx
│   │   ├── Features.tsx
│   │   ├── Contact.tsx
│   │   ├── Faq.tsx
│   │   ├── Login.tsx
│   │   ├── Register.tsx
│   │   ├── RideDetails.tsx
│   │   ├── RideHistory.tsx
│   │   ├── AccountStatus.tsx
│   │   ├── ChangePassword.tsx
│   │   ├── EditProfile.tsx
│   │   ├── admin/
│   │   │   ├── Analytics.tsx
│   │   │   ├── Drivers.tsx
│   │   │   └── Riders.tsx
│   │   ├── driver/
│   │   │   ├── Earnings.tsx
│   │   │   ├── IncomingRequests.tsx
│   │   │   └── RideManagement.tsx
│   │   └── rider/
│   │       ├── LiveRideTracking.tsx
│   │       ├── RideDetails.tsx
│   │       └── RideRequestForm.tsx
│   │
│   ├── providers/
│   │   └── theme.provider.tsx  # Theme provider setup
│   │
│   ├── redux/                  # Redux store and slices
│   │   ├── store.ts            # Redux store configuration
│   │   ├── hooks.ts            # Redux hooks (useAppDispatch, useAppSelector)
│   │   ├── baseApi.ts          # RTK Query base API
│   │   ├── axiosBaseQuery.ts   # Axios integration with RTK Query
│   │   └── features/
│   │       ├── admin/          # Admin slices and APIs
│   │       ├── auth/           # Authentication slices and APIs
│   │       ├── driver/         # Driver slices and APIs
│   │       └── ride/           # Ride slices and APIs
│   │
│   ├── routes/
│   │   ├── index.tsx           # Main route definitions
│   │   ├── adminSidebarItems.ts
│   │   ├── driverSidebarItems.ts
│   │   └── riderSidebarItems.ts
│   │
│   ├── types/                  # TypeScript types and interfaces
│   │   ├── auth.type.ts
│   │   ├── driver.type.ts
│   │   ├── ride.type.ts
│   │   ├── theme.type.ts
│   │   └── index.ts
│   │
│   ├── utils/                  # Utility functions
│   │   ├── capitalize.ts
│   │   ├── generateRoutes.ts
│   │   ├── generateSidebarItems.ts
│   │   ├── getRideStatusColor.ts
│   │   └── withAuth.tsx        # Auth HOC for protected routes
│   │
│   ├── App.tsx                 # Root app component
│   ├── main.tsx                # Entry point
│   └── index.css               # Global styles
│
├── public/                     # Static assets
│
├── package.json                # Dependencies and scripts
├── tsconfig.json               # TypeScript configuration
├── vite.config.ts              # Vite configuration
├── tailwind.config.js          # Tailwind CSS configuration
├── eslint.config.js            # ESLint configuration
└── README.md                   # Project documentation
```

---

## 🚀 Getting Started

### Prerequisites

-   **Node.js** (v16 or higher)
-   **npm** or **yarn** package manager
-   Backend API running and accessible

### Installation

1. **Clone the repository**

    ```bash
    git clone https://github.com/Samira-Shajahan-Borsha/ride-booking-system-frontend.git
    cd frontend-ride-booking-system
    ```

2. **Install dependencies**

    ```bash
    npm install
    ```

3. **Environment Configuration**

    - Create a `.env.local` file in the root directory
    - Add the backend API URL:
        ```
        VITE_API_BASE_URL=https://backend-ride-booking-system-ecru.vercel.app/api
        ```

4. **Start the development server**

    ```bash
    npm run dev
    ```

    - The app will be available at `http://localhost:5173`

5. **Build for production**

    ```bash
    npm run build
    ```

6. **Preview production build**
    ```bash
    npm run preview
    ```

---

## 📋 Available Scripts

```bash
npm run dev        # Start development server with HMR
npm run build      # Build optimized production bundle
npm run preview    # Preview production build locally
npm run lint       # Run ESLint to check code quality
npm run type-check # Run TypeScript type checking
```

## 🎨 Features Highlights

✅ **Responsive Design** – Works seamlessly on desktop, tablet, and mobile devices  
✅ **Dark Mode Support** – Toggle between light and dark themes  
✅ **Real-time Updates** – Live ride tracking and status updates  
✅ **Advanced Filtering** – Powerful search and filter tools across all pages  
✅ **Role-Based Access** – Separate dashboards for riders, drivers, and admins  
✅ **Secure Authentication** – JWT-based login with token refresh  
✅ **Data Visualization** – Analytics dashboards with interactive charts  
✅ **Form Validation** – Comprehensive client-side validation  
✅ **Error Handling** – User-friendly error messages and notifications  
✅ **Accessibility** – WCAG-compliant UI components

---

## 🔗 API Integration

The frontend communicates with the backend using RTK Query, which provides:

-   Automatic token refresh
-   Request/response interceptors
-   Caching and invalidation
-   Error handling
-   Type-safe API calls

### Base URL

```
https://backend-ride-booking-system-ecru.vercel.app/api/v1
```

### Key Endpoints Used

-   `POST /auth/register` – User registration
-   `POST /auth/login` – User login
-   `POST /auth/refresh-token` – Refresh JWT token
-   `POST /auth/logout` – Logout
-   `GET /user/me` – Get current user profile
-   `POST /ride/request` – Request a new ride
-   `GET /ride/me` – Get user's rides
-   `PATCH /driver/available-status/:id` – Toggle driver availability
-   `GET /driver/earnings` – Get driver earnings

---

## 🐛 Troubleshooting

### CORS Issues

If you encounter CORS errors:

-   Ensure the backend is running and accessible
-   Check that `VITE_API_BASE_URL` is correctly configured
-   Verify backend CORS settings include your frontend URL

### Authentication Issues

-   Clear browser cookies and localStorage
-   Restart the development server
-   Check that the backend authentication endpoints are working

### Build Errors

-   Delete `node_modules` and `dist` directories
-   Run `npm install` to reinstall dependencies
-   Ensure TypeScript version is compatible

---

## 📊 Project Stats

-   **Total Pages:** 15+
-   **Reusable Components:** 30+
-   **API Endpoints:** 20+
-   **Supported Roles:** 3 (Rider, Driver, Admin)
-   **UI States:** Handled (loading, error, empty, success)
-   **Responsive Breakpoints:** Mobile, Tablet, Desktop

---

**Happy coding! 🚀**
