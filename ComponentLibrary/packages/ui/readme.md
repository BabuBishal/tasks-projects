# b3-ui

A modern, accessible React component library with TypeScript support, built for flexibility and ease of use.

## Features

- 🎨 **Themeable** - Built-in light/dark mode support with CSS custom properties
- ♿ **Accessible** - ARIA compliant components following WAI-ARIA best practices
- 📦 **Tree-shakeable** - Import only what you need
- 🎯 **TypeScript** - Full type safety with TypeScript definitions
- 🎭 **Unstyled mode** - Complete control over styling when needed
- 🪝 **Custom Hooks** - Useful React hooks included
- 🚀 **Zero dependencies** - Lightweight with no external dependencies

## Installation

```bash
npm install b3-ui
# or
yarn add b3-ui
# or
pnpm add b3-ui
```

## Quick Start

```tsx
import { Button, Input, useToast, ToastProvider } from "b3-ui";
import "b3-ui/theme.css"; // Import theme CSS

function App() {
  return (
    <ToastProvider>
      <Button variant="primary" size="md">
        Click me
      </Button>
    </ToastProvider>
  );
}
```

## Theming

The library supports light and dark themes out of the box.

### Auto Theme (based on system preference)

```tsx
// Just import the theme CSS - it will auto-detect system preference
import "b3-ui/theme.css";
```

### Manual Theme Control

```tsx
// Set data-theme attribute on html or body
<html data-theme="dark">{/* Your app */}</html>;

// Or programmatically
document.documentElement.setAttribute("data-theme", "dark");
```

### Custom Theme

Override CSS custom properties to match your brand:

```css
:root {
  --ui-button-bg: #your-color;
  --ui-button-color: #your-text-color;
  --ui-border: #your-border-color;
  /* See theme.css for all available tokens */
}
```

## Components

### Button

Versatile button component with multiple variants and sizes.

```tsx
import { Button } from 'b3-ui';

<Button variant="primary" size="md" onClick={handleClick}>
  Primary Button
</Button>

<Button variant="secondary" size="lg">
  Secondary Button
</Button>

<Button variant="outline" size="sm" disabled>
  Disabled Button
</Button>

<Button variant="danger">
  Delete
</Button>

// Unstyled mode for custom styling
<Button unstyled className="my-custom-class">
  Custom Styled
</Button>
```

**Props:**

- `variant`: "primary" | "secondary" | "outline" | "danger"
- `size`: "sm" | "md" | "lg"
- `disabled`: boolean
- `unstyled`: boolean
- All standard button HTML attributes

---

### Form Components

#### Input

```tsx
import { Input } from "b3-ui";

<Input
  label="Email"
  type="email"
  placeholder="Enter your email"
  helperText="We'll never share your email"
  error={errors.email}
/>;
```

#### Textarea

```tsx
import { Textarea } from "b3-ui";

<Textarea
  label="Description"
  rows={5}
  placeholder="Enter description"
  helperText="Maximum 500 characters"
/>;
```

#### Select

```tsx
import { Select } from "b3-ui";

<Select
  label="Country"
  optionList={["USA", "UK", "Canada", "Australia"]}
  helperText="Select your country"
/>;
```

#### Checkbox

```tsx
import { Checkbox } from "b3-ui";

<Checkbox
  label="Accept terms and conditions"
  helperText="Required to proceed"
/>;
```

---

### Card

```tsx
import { Card } from 'b3-ui';

<Card
  title="Card Title"
  content="Card content goes here"
/>

<Card
  title="With JSX Content"
  content={<div>Rich content with <strong>formatting</strong></div>}
/>
```

---

### Badge

```tsx
import { Badge } from 'b3-ui';

<Badge text="New" variant="success" size="small" />
<Badge text="Warning" variant="warning" size="medium" />
<Badge text="Error" variant="danger" size="large" />
<Badge text="Info" variant="info" />
```

---

### Modal

```tsx
import { Modal } from "b3-ui";
import { useState } from "react";

function MyComponent() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setIsOpen(true)}>Open Modal</Button>

      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <h2>Modal Title</h2>
        <p>Modal content goes here</p>
      </Modal>
    </>
  );
}
```

---

### Toast

Toast notifications with progress indicator.

```tsx
import { ToastProvider, useToast } from "b3-ui";

// Wrap your app with ToastProvider
function App() {
  return (
    <ToastProvider>
      <YourApp />
    </ToastProvider>
  );
}

// Use in components
function MyComponent() {
  const { notify } = useToast();

  const showToast = () => {
    notify({
      title: "Success!",
      description: "Your changes have been saved",
      type: "success",
      duration: 4000,
    });
  };

  return <Button onClick={showToast}>Show Toast</Button>;
}
```

**Toast Types:** "default" | "success" | "info" | "warning" | "destructive"

---

### Tabs

```tsx
import { Tabs } from "b3-ui";

<Tabs defaultValue="tab1">
  <Tabs.List>
    <Tabs.Trigger value="tab1">Tab 1</Tabs.Trigger>
    <Tabs.Trigger value="tab2">Tab 2</Tabs.Trigger>
    <Tabs.Trigger value="tab3">Tab 3</Tabs.Trigger>
  </Tabs.List>

  <Tabs.Content value="tab1">Content for tab 1</Tabs.Content>
  <Tabs.Content value="tab2">Content for tab 2</Tabs.Content>
  <Tabs.Content value="tab3">Content for tab 3</Tabs.Content>
</Tabs>;
```

---

### Accordion

```tsx
import { Accordion } from "b3-ui";

<Accordion defaultOpen="item-1">
  <Accordion.Item value="item-1">
    <Accordion.Header>Section 1</Accordion.Header>
    <Accordion.Content>Content for section 1</Accordion.Content>
  </Accordion.Item>

  <Accordion.Item value="item-2">
    <Accordion.Header>Section 2</Accordion.Header>
    <Accordion.Content>Content for section 2</Accordion.Content>
  </Accordion.Item>
</Accordion>;
```

---

### Table

```tsx
import { Table } from "b3-ui";

<Table>
  <Table.Header>
    <Table.HeaderCell>Name</Table.HeaderCell>
    <Table.HeaderCell>Email</Table.HeaderCell>
    <Table.HeaderCell>Role</Table.HeaderCell>
  </Table.Header>

  <Table.Body>
    <Table.Row>
      <Table.Cell>John Doe</Table.Cell>
      <Table.Cell>john@example.com</Table.Cell>
      <Table.Cell>Admin</Table.Cell>
    </Table.Row>
    <Table.Row>
      <Table.Cell>Jane Smith</Table.Cell>
      <Table.Cell>jane@example.com</Table.Cell>
      <Table.Cell>User</Table.Cell>
    </Table.Row>
  </Table.Body>
</Table>;
```

---

### Toggle

```tsx
import { Toggle } from "b3-ui";
import { useState } from "react";

function MyComponent() {
  const [enabled, setEnabled] = useState(false);

  return (
    <Toggle
      checked={enabled}
      onChange={setEnabled}
      label="Enable notifications"
    />
  );
}
```

---

### Loading Components

#### Spinner

```tsx
import { Spinner } from 'b3-ui';

<Spinner />
<Spinner className="custom-spinner" />
```

#### LoadingDots

```tsx
import { LoadingDots } from 'b3-ui';

<LoadingDots />
<LoadingDots className="custom-dots" />
```

---

## Hooks

### useToggle

Toggle boolean state easily.

```tsx
import { useToggle } from "b3-ui";

function MyComponent() {
  const [isOpen, toggleOpen] = useToggle(false);

  return (
    <div>
      <Button onClick={toggleOpen}>{isOpen ? "Close" : "Open"}</Button>
      {isOpen && <div>Content</div>}
    </div>
  );
}
```

---

### useLocalStorage

Persist state in localStorage with automatic synchronization.

```tsx
import { useLocalStorage } from "b3-ui";

function MyComponent() {
  const [name, setName, removeName] = useLocalStorage("username", "");

  return (
    <div>
      <Input value={name} onChange={(e) => setName(e.target.value)} />
      <Button onClick={removeName}>Clear</Button>
    </div>
  );
}
```

---

### useCopyToClipboard

Copy text to clipboard with state tracking.

```tsx
import { useCopyToClipboard } from "b3-ui";

function MyComponent() {
  const { copy, isCopied } = useCopyToClipboard();

  return (
    <Button onClick={() => copy("Text to copy")}>
      {isCopied ? "Copied!" : "Copy"}
    </Button>
  );
}
```

---

### useFetch

Simple data fetching hook.

```tsx
import { useFetch } from "b3-ui";

function MyComponent() {
  const { data, loading, error } = useFetch<User>("/api/user");

  if (loading) return <Spinner />;
  if (error) return <div>Error: {error.message}</div>;

  return <div>{data?.name}</div>;
}
```

---

### useIntersectionObserverSingle

Observe when a single element enters the viewport.

```tsx
import { useIntersectionObserverSingle } from "b3-ui";

function MyComponent() {
  const [isVisible, ref] = useIntersectionObserverSingle({
    threshold: 0.5,
    triggerOnce: true,
  });

  return <div ref={ref}>{isVisible ? "Visible!" : "Not visible"}</div>;
}
```

---

### useWindowSize

Track window dimensions.

```tsx
import { useWindowSize } from "b3-ui";

function MyComponent() {
  const { width, height } = useWindowSize();

  return (
    <div>
      Window: {width}x{height}
    </div>
  );
}
```

---

### useTimeout

Declarative setTimeout hook.

```tsx
import { useTimeout } from "b3-ui";

function MyComponent() {
  useTimeout(() => {
    console.log("Executed after 2 seconds");
  }, 2000);

  return <div>Component</div>;
}
```

---

### useOutsideClick

Detect clicks outside an element.

```tsx
import { useOutsideClick } from "b3-ui";
import { useRef } from "react";

function MyComponent() {
  const ref = useRef(null);

  useOutsideClick(ref, () => {
    console.log("Clicked outside!");
  });

  return <div ref={ref}>Click outside me</div>;
}
```

---

## Styling

### Unstyled Mode

All components support an `unstyled` prop for complete styling control:

```tsx
<Button unstyled className="my-custom-button">
  Custom Button
</Button>

<Input unstyled className="my-input" />
```

### CSS Modules

Components use CSS modules internally, so styles won't conflict with your app.

### Custom Utility

The library includes a `cn` utility for className merging:

```tsx
import { cn } from "b3-ui";

<div className={cn("base-class", isActive && "active-class")}>Content</div>;
```

## Accessibility

All components follow WCAG 2.1 Level AA guidelines:

- ✅ Keyboard navigation support
- ✅ ARIA labels and roles
- ✅ Focus management
- ✅ Screen reader friendly
- ✅ Proper color contrast

## TypeScript

Full TypeScript support with exported types:

```tsx
import type { ButtonProps, InputProps, ToastOptions } from "b3-ui";
```

- Edge (latest) -->

## Contributing

Contributions are welcome! Please read our contributing guidelines before submitting PRs.

## License

MIT

## Support

For issues and feature requests, please use the [GitHub issue tracker](https://github.com/BabuBishal/tasks-projects/issues).
