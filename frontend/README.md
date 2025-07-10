# Patientor Frontend

A modern React-based frontend application for patient management and medical record keeping. This application provides a comprehensive interface for healthcare professionals to manage patient information, medical entries, and generate reports.

## 🏥 Project Overview

Patientor is a healthcare management system frontend that allows medical staff to:

- View and manage patient records
- Add and track medical entries (Hospital visits, Occupational healthcare, Health checks)
- Generate PDF reports
- Maintain patient confidentiality with secure data handling

## ✨ Features

### Patient Management

- **Patient Directory**: Browse and search through patient records
- **Patient Profiles**: Detailed patient information including personal data and medical history
- **Privacy Protection**: Sensitive information (SSN) is handled securely

### Medical Entries

- **Multiple Entry Types**: Support for different types of medical entries:
  - Hospital entries with discharge information
  - Occupational healthcare entries
  - Health check entries with ratings
- **Diagnosis Integration**: Link entries with diagnosis codes
- **Entry Validation**: Comprehensive form validation using Zod schemas

### Document Generation

- **PDF Reports**: Generate professional PDF reports for patient records
- **Medical Documentation**: Export patient information and medical history

### User Experience

- **Modern UI**: Clean, responsive design built with TailwindCSS
- **Icon Integration**: Lucide React icons for intuitive navigation
- **Form Management**: Robust form handling with React Hook Form
- **Type Safety**: Full TypeScript coverage for enhanced development experience

## 🛠 Tech Stack

### Core Technologies

- **React 19.1.0** - Modern React with latest features
- **TypeScript 5.8.3** - Type-safe development
- **Vite 6.3.5** - Fast build tool and dev server

### Styling & UI

- **TailwindCSS 4.1.8** - Utility-first CSS framework
- **Lucide React 0.513.0** - Beautiful icon library

### Form & Validation

- **React Hook Form 7.59.0** - Performant form library
- **Zod 3.25.64** - TypeScript-first schema validation
- **@hookform/resolvers 5.1.1** - Form validation resolvers

### Routing & Navigation

- **React Router 7.6.2** - Client-side routing

### API & Data Fetching

- **Axios 1.9.0** - HTTP client for API communication

### Document Generation

- **@react-pdf/renderer 4.3.0** - PDF generation capabilities

### Development Tools

- **ESLint** - Code linting with React-specific rules
- **TypeScript ESLint** - TypeScript-aware linting
- **Vite Plugin React** - Hot module replacement

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── entries/        # Medical entry components
│   ├── layouts/        # Layout components
│   ├── patients/       # Patient-related components
│   ├── pdf/           # PDF generation components
│   └── ui/            # Base UI components
├── pages/              # Page components
│   ├── home.tsx       # Home page with patient list
│   └── patients/      # Patient-specific pages
├── services/           # API service functions
│   ├── patients.ts    # Patient CRUD operations
│   ├── entries.ts     # Medical entries API
│   └── diagnoses.ts   # Diagnosis data
├── schemas/            # Zod validation schemas
│   ├── patient-schema.ts
│   ├── entry-schema.ts
│   └── diagnose-schema.ts
├── types/              # TypeScript type definitions
├── utils/              # Utility functions
└── styles/             # Global styles
```

## 🚀 Getting Started

### Prerequisites

- Node.js (version 18 or higher)
- pnpm (recommended package manager)

### Installation

1. Clone the repository

```bash
git clone <repository-url>
cd patientor/frontend
```

2. Install dependencies

```bash
pnpm install
```

3. Start the development server

```bash
pnpm dev
```

4. Open your browser and navigate to `http://localhost:5173`

### Available Scripts

- `pnpm dev` - Start development server with hot reload
- `pnpm build` - Build the application for production
- `pnpm lint` - Run ESLint to check code quality
- `pnpm preview` - Preview the production build locally

## 🔧 Configuration

### Path Aliases

The project uses `@` as an alias for the `src` directory, configured in `vite.config.ts`:

```typescript
resolve: {
  alias: {
    '@': path.resolve(__dirname, './src'),
  },
}
```

### Environment Setup

The application is configured to work with a backend API. Ensure your backend server is running and accessible.

## 🧪 Code Quality

### TypeScript

- Strict TypeScript configuration
- Comprehensive type definitions for all data models
- Zod schemas for runtime validation

### ESLint Configuration

- React-specific linting rules
- TypeScript-aware linting
- Automatic code formatting standards

### Form Validation

- Client-side validation using Zod schemas
- Server-side error handling
- Type-safe form data processing

## 📱 Responsive Design

The application is built with mobile-first responsive design principles using TailwindCSS, ensuring optimal user experience across:

- Desktop computers
- Tablets
- Mobile devices

## 🔒 Security Features

- Sensitive patient data (SSN) is handled securely
- Type-safe API communications
- Input validation and sanitization
- Secure routing and authentication ready

## 🤝 Contributing

1. Follow the existing code style and conventions
2. Ensure TypeScript types are properly defined
3. Add appropriate Zod schemas for new data structures
4. Test form validations thoroughly
5. Maintain responsive design principles

## 📄 License

This project is part of a fullstack patient management system. Please refer to the main project license for details.
