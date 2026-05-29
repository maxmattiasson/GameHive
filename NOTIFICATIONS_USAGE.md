# Notifications Context Usage Guide

The notifications system is now fully integrated and ready to use throughout your application.

## Basic Usage

Any component can send notifications by importing and using the `useNotifications` hook:

```tsx
import { useNotifications } from "../contexts/NotificationsContext";

export function MyComponent() {
  const { notify } = useNotifications();

  const handleAction = () => {
    // Send a simple info notification
    notify("Action completed!");
    
    // Or with options for type and custom duration
    notify("Success!", {
      type: "success",
      duration: 5000 // auto-dismiss after 5 seconds
    });
  };

  return <button onClick={handleAction}>Click me</button>;
}
```

## API Reference

### `useNotifications()`

Returns an object with:

- **`notify(message, options?): string`** — Send a notification and get back its ID
  - `message` (string, required): Notification text
  - `options.type` ("info" | "success" | "error" | "warning", default: "info"): Visual style
  - `options.duration` (number, default: 4000): Auto-dismiss after milliseconds (0 = persist until clicked)
  - Returns the notification ID for programmatic dismissal

- **`dismiss(id: string): void`** — Manually dismiss a notification by ID

- **`clearAll(): void`** — Clear all active notifications at once

- **`notifications: Notification[]`** — Current array of active notifications

## Common Patterns

### Success notification after form submission
```tsx
const { notify } = useNotifications();

const handleSubmit = async (data) => {
  try {
    await api.post("/endpoint", data);
    notify("Saved successfully!", { type: "success" });
  } catch (error) {
    notify("Failed to save", { type: "error", duration: 6000 });
  }
};
```

### Persistent notification requiring user action
```tsx
notify("Please review your changes", { duration: 0 }); // Won't auto-dismiss
```

### Quick info notification
```tsx
notify("Loading...", { type: "info" });
```

### Error with longer timeout
```tsx
notify("An error occurred. Please try again.", {
  type: "error",
  duration: 6000
});
```

### Warning notification
```tsx
notify("This action cannot be undone", { type: "warning" });
```

## Notification Types & Styling

- **info** (default): Light blue background, for general information
- **success**: Light green background, for successful operations
- **warning**: Light yellow background, for cautionary messages
- **error**: Light red background, for error messages

## Accessibility

- Notifications use `aria-live="polite"` for screen readers
- Each notification can be dismissed by clicking, pressing Enter, or Space
- Visual focus indicator included for keyboard navigation
- Close button provides explicit dismiss affordance

## Features

✅ Multiple stacked notifications  
✅ Auto-dismiss with configurable timeout  
✅ Manual dismiss by click or keyboard  
✅ Type-based color coding  
✅ Smooth animations  
✅ Responsive design (stacks at bottom on mobile)  
✅ Full keyboard and screen reader support  

## Implementation Details

The system is already wired up:
- Provider: `apps/web/frontend/src/contexts/NotificationsContext.tsx`
- Component: `apps/web/frontend/src/components/layout/Notifications.tsx`
- Styling: `apps/web/frontend/src/components/layout/Notifications.css`
- Mounted in: `apps/web/frontend/src/main.tsx`
