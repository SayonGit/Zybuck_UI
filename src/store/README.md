# Redux Store Structure

This document outlines the comprehensive Redux store structure for the booking application, including all static data management and state organization.

## Store Architecture

### Main Store (`src/store/index.ts`)

```typescript
export const store = configureStore({
  reducer: {
    flightSearch: flightSearchReducer,
    hotelSearch: hotelSearchReducer,
    carSearch: carSearchReducer,
    appData: appDataReducer, // NEW: Centralized static data
  },
});
```

## App Data Slice (`src/store/slices/appDataSlice/`)

### Overview

The `appDataSlice` centralizes all static data used throughout the application, providing a single source of truth for:

- Form options and configurations
- UI content and text
- Image assets and media
- Feature lists and descriptions

### Data Categories

#### 1. Form Tabs (`tabs`)

```typescript
interface TabOption {
  id: string;
  label: string;
  icon: string;
  rotate: number;
}
```

- **Flights**: Flight booking form
- **Stay**: Hotel booking form
- **Car**: Car rental form

#### 2. Scrolling Images (`scrollingImages`)

```typescript
interface ScrollingImage {
  id: string;
  src: string;
  alt: string;
}
```

- Dashboard background images
- Travel destination photos
- High-quality Unsplash images

#### 3. Flight Form Options

- **Class Options** (`flightClassOptions`): Economy, Premium Economy, Business, First Class
- **Airline Options** (`airlineOptions`): Emirates, Lufthansa, British Airways, etc.

#### 4. Hotel Form Options

- **Citizenship Options** (`citizenshipOptions`): 40+ countries
- **Star Rating Options** (`starRatingOptions`): 2-5 stars, Any rating
- **Time Options** (`earlyCheckinoutTimeOptions`): 08:00-12:00
- **Room Type Options** (`roomTypeOptions`): RO, BB, HB, FB, AI

#### 5. Content Data

- **Service Features** (`serviceFeatures`): App benefits and features
- **Flight Deals** (`flightDeals`): Featured flight offers
- **Trending Cities** (`trendingCities`): Popular destinations
- **Popular Destinations** (`popularDestinations`): Top travel spots
- **Account Travel Features** (`accountTravelFeatures`): User account benefits

### Usage Examples

#### Accessing Data in Components

```typescript
import { useAppData } from "../hooks/useAppData";

const MyComponent = () => {
  const { tabs, flightClassOptions, airlineOptions, trendingCities } =
    useAppData();

  // Use the data...
};
```

#### Updating Data (if needed)

```typescript
import { useAppDispatch } from "../store/hooks";
import { updateFlightDeals } from "../store/slices/appDataSlice";

const MyComponent = () => {
  const dispatch = useAppDispatch();

  const updateDeals = (newDeals) => {
    dispatch(updateFlightDeals(newDeals));
  };
};
```

## Custom Hook (`src/hooks/useAppData.ts`)

### Purpose

Provides a clean interface for accessing all static data from the Redux store.

### Features

- **Type Safety**: Full TypeScript support
- **Performance**: Memoized selectors
- **Simplicity**: Single hook for all data access
- **Maintainability**: Centralized data access pattern

### Available Data

```typescript
const {
  // Form tabs
  tabs,

  // Scrolling images
  scrollingImages,

  // Flight form options
  flightClassOptions,
  airlineOptions,

  // Hotel form options
  citizenshipOptions,
  starRatingOptions,
  earlyCheckinoutTimeOptions,
  roomTypeOptions,

  // Car form options
  carOptions,

  // Content data
  serviceFeatures,
  flightDeals,
  trendingCities,
  popularDestinations,
  accountTravelFeatures,
} = useAppData();
```

## Migration Benefits

### Before (Hardcoded Data)

```typescript
// ❌ Hardcoded in components
const tabs = [
  { id: "flights", label: "Flights", icon: "..." },
  // ...
];
```

### After (Redux Store)

```typescript
// ✅ Centralized in store
const { tabs } = useAppData();
```

## Advantages

### 1. **Centralized Data Management**

- Single source of truth for all static data
- Easy to update and maintain
- Consistent data across components

### 2. **Type Safety**

- Full TypeScript support
- Compile-time error checking
- IntelliSense support

### 3. **Performance**

- Memoized selectors prevent unnecessary re-renders
- Efficient data access patterns
- Optimized for React rendering

### 4. **Maintainability**

- Clear separation of concerns
- Easy to add new data categories
- Consistent data structure

### 5. **Scalability**

- Easy to extend with new data types
- Support for dynamic data updates
- Future-proof architecture

## Data Structure Standards

### Naming Conventions

- **Options**: `*Options` (e.g., `flightClassOptions`)
- **Lists**: `*s` (e.g., `tabs`, `cities`)
- **Features**: `*Features` (e.g., `serviceFeatures`)

### Interface Standards

```typescript
// Option interfaces
interface Option {
  value: string;
  label: string;
  disabled?: boolean;
}

// Content interfaces
interface ContentItem {
  id: number;
  title: string;
  description: string;
  icon?: string;
}
```

## Future Enhancements

### 1. **Dynamic Data Loading**

- API integration for real-time data
- Caching strategies
- Loading states

### 2. **Internationalization**

- Multi-language support
- Locale-specific data
- Translation management

### 3. **Personalization**

- User-specific data
- Preferences management
- Custom content

### 4. **Analytics Integration**

- Usage tracking
- Performance monitoring
- Data insights

## Best Practices

### 1. **Data Access**

- Always use `useAppData()` hook
- Don't access store directly in components
- Use destructuring for clean code

### 2. **Updates**

- Use Redux actions for data updates
- Maintain immutability
- Follow Redux Toolkit patterns

### 3. **Performance**

- Use React.memo for expensive components
- Implement proper dependency arrays
- Monitor re-render patterns

### 4. **Testing**

- Mock the `useAppData` hook in tests
- Test data transformations
- Verify component behavior with different data

## File Structure

```
src/store/
├── index.ts                    # Main store configuration
├── hooks.ts                    # Typed hooks
└── slices/
    ├── appDataSlice/           # Static data management
    │   └── index.ts
    ├── flightSearchSlice/      # Flight form state
    ├── hotelSearchSlice/       # Hotel form state
    └── carSearchSlice/         # Car form state
```

This architecture provides a robust, scalable, and maintainable foundation for the booking application's data management needs.
