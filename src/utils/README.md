# URL-Based Navigation System

This system allows users to navigate directly to specific forms using URL query parameters.

## URL Structure

### Dashboard with Form Tabs

- `/` - Default dashboard (shows flights tab)
- `/?tab=flights` - Dashboard with flights form active
- `/?tab=stay` - Dashboard with hotel form active
- `/?tab=car` - Dashboard with car rental form active

### Search Results

- `/search?type=flight&from=...&to=...` - Flight search results
- `/search?type=hotel&destination=...&checkInDate=...` - Hotel search results
- `/search?type=car&pickupLocation=...&dropoffLocation=...` - Car search results

## Navigation Utilities

### `navigateToForm(navigate, formType, preserveExistingParams)`

Navigates to a specific form on the dashboard.

```tsx
import { navigateToForm } from "../utils/navigationUtils";

// Navigate to flights form
navigateToForm(navigate, "flights");

// Navigate to hotel form, clearing other params
navigateToForm(navigate, "stay", false);
```

### `getFormTypeFromUrl()`

Gets the current active form type from URL.

```tsx
import { getFormTypeFromUrl } from "../utils/navigationUtils";

const activeForm = getFormTypeFromUrl(); // 'flights' | 'stay' | 'car' | null
```

### `isFormActive(formType)`

Checks if a specific form is currently active.

```tsx
import { isFormActive } from "../utils/navigationUtils";

const isFlightsActive = isFormActive("flights"); // boolean
```

## Features

### 1. URL Synchronization

- Tab changes update the URL automatically
- Browser back/forward buttons work correctly
- Page refresh maintains the active tab

### 2. Direct Navigation

- Users can bookmark specific forms
- Share links to specific forms
- SEO-friendly URLs

### 3. Smooth Scrolling

- When navigating to a form via URL, the page scrolls to the form
- Provides better user experience

### 4. Header Quick Navigation

- Header includes quick links to each form
- One-click navigation to specific forms

## Usage Examples

### Direct URL Access

```
https://yourapp.com/?tab=stay
https://yourapp.com/?tab=car
https://yourapp.com/?tab=flights
```

### Programmatic Navigation

```tsx
// From any component
import { navigateToForm } from "../utils/navigationUtils";

const handleFormClick = () => {
  navigateToForm(navigate, "stay");
};
```

### Form State Detection

```tsx
// Check which form is currently active
import { getFormTypeFromUrl } from "../utils/navigationUtils";

const currentForm = getFormTypeFromUrl();
if (currentForm === "flights") {
  // Show flight-specific content
}
```

## Browser Support

- Works with all modern browsers
- Maintains browser history correctly
- Supports bookmarking and sharing
