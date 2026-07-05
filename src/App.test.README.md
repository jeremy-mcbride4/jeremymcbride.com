# App.jsx Test Suite

Comprehensive test coverage for the Jeremy McBride Aerial website.

## Test Setup

- **Framework**: Vitest
- **Testing Library**: React Testing Library
- **Test File**: [src/App.test.jsx](src/App.test.jsx)
- **Config**: [vitest.config.js](../vitest.config.js)

## Running Tests

```bash
# Run tests once
npm test

# Run tests in watch mode
npm run test

# Run with UI
npm run test:ui

# Run with coverage
npm run test:coverage
```

## Test Coverage

### Component Rendering (3 tests)
- ✅ Renders without crashing
- ✅ Displays hero section with main heading
- ✅ Shows navigation menu items

### User Interactions (1 test)
- ✅ Toggles mobile menu when hamburger is clicked

### Services Section (2 tests)
- ✅ Displays all enterprise services
- ✅ Displays marketing aerials service

### Portfolio Section (2 tests)
- ✅ Renders portfolio section with images
- ✅ Renders the R3FPano component

### Credentials Section (1 test)
- ✅ Displays credentials section

### Contact Form (3 tests)
- ✅ Renders contact form with all fields
- ✅ Can type into form fields
- ✅ Can select service option

### Footer Section (1 test)
- ✅ Renders footer with current year

### Navigation & CTAs (2 tests)
- ✅ Has CTA buttons linking to contact section
- ✅ Displays service area badges

## Notes

- R3FPano component is mocked to avoid Three.js/WebGL complexity in tests
- Form submission tests are simplified to avoid async timing issues
- Tests use semantic queries (getByRole, getByLabelText) for better accessibility testing
