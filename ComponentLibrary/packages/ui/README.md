# 3UI

A modern, accessible React component library with TypeScript support, built for flexibility and ease of use.

## Features

- 🎨 **Themeable** - Built-in light/dark mode support with CSS custom properties
- ♿ **Accessible** - ARIA compliant components following WAI-ARIA best practices
- 📦 **Tree-shakeable** - Import only what you need
- 🎯 **TypeScript** - Full type safety with TypeScript definitions
- 🎭 **Unstyled mode** - Complete control over styling when needed
- 🪝 **Custom Hooks** - Useful React hooks included
- 🚀 **Zero dependencies** - Lightweight with no external dependencies
- 🎨 **CSS included** - Styles automatically bundled, no manual CSS imports needed

## Installation

```bash
npm install 3ui
# or
yarn add 3ui
# or
pnpm add 3ui
```

## Quick Start

```tsx
import { Button, Input, useToast, ToastProvider } from "3ui";

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

**Note:** Styles are automatically included! No need to import CSS manually.

## Theming

The library supports light and dark themes out of the box.

### Auto Theme (based on system preference)

Themes are automatically detected based on system preferences. No setup required!

### Manual Theme Control

```tsx
// Set data-theme attribute on html or body
<html data-theme="dark">{/* Your app */}</html>

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
  /* See documentation for all available tokens */
}
```

## Components

### Button

Versatile button component with multiple variants and sizes.

```tsx
import { Button } from '3ui';

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
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `"primary" \| "secondary" \| "outline" \| "danger"` | `"primary"` | Button style variant |
| `size` | `"sm" \| "md" \| "lg"` | `"md"` | Button size |
| `disabled` | `boolean` | `false` | Disable the button |
| `unstyled` | `boolean` | `false` | Remove default styles |
| `className` | `string` | - | Additional CSS classes |

---

### Card

Container component with multiple variants.

```tsx
import { Card } from '3ui';

<Card variant="elevated" size="md">
  <h3>Card Title</h3>
  <p>Card content goes here</p>
</Card>

<Card variant="bordered" size="lg">
  Rich content
</Card>
```

**Props:**
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `"elevated" \| "bordered" \| "primary" \| "secondary" \| "rounded"` | - | Card style |
| `size` | `"sm" \| "md" \| "lg"` | `"md"` | Padding size |
| `unstyled` | `boolean` | `false` | Remove default styles |

---

### Badge

Display status or category labels.

```tsx
import { Badge } from '3ui';

<Badge variant="success" size="sm">New</Badge>
<Badge variant="warning" size="md">Warning</Badge>
<Badge variant="danger" size="lg" rounded>Error</Badge>
<Badge variant="info">Info</Badge>
```

**Props:**
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `"primary" \| "secondary" \| "outline" \| "success" \| "warning" \| "danger"` | `"primary"` | Badge color variant |
| `size` | `"sm" \| "md" \| "lg"` | `"md"` | Badge size |
| `rounded` | `boolean` | `false` | Pill-shaped badge |
| `unstyled` | `boolean` | `false` | Remove default styles |

---

### Form Components

#### Input

Compound component for text inputs with label and error states.

```tsx
import { Input } from "3ui";

<Input id="email" initialValue="" placeholder="Enter email">
  <Input.Label>Email Address</Input.Label>
  <Input.Field type="email" />
  <Input.Error>Invalid email</Input.Error>
</Input>
```

#### Textarea

```tsx
import { Textarea } from "3ui";

<Textarea initialValue="" className="w-full">
  <Textarea.Label htmlFor="description">Description</Textarea.Label>
  <Textarea.Field rows={5} placeholder="Enter description..." />
</Textarea>
```

#### Select

Compound select dropdown component.

```tsx
import { Select } from "3ui";

<Select.Root value={selected} onChange={setSelected}>
  <Select.Trigger>Select option</Select.Trigger>
  <Select.List>
    <Select.Option value="option1">Option 1</Select.Option>
    <Select.Option value="option2">Option 2</Select.Option>
  </Select.List>
</Select.Root>
```

#### Checkbox

```tsx
import { Checkbox } from "3ui";

<Checkbox
  label="Accept terms and conditions"
  checked={accepted}
  onChange={(e) => setAccepted(e.target.checked)}
/>
```

---

### Modal

Dialog component with compound pattern.

```tsx
import { Modal } from "3ui";

<Modal defaultOpen={false}>
  <Modal.Trigger>Open Modal</Modal.Trigger>
  
  <Modal.Content>
    <Modal.Header>
      <h2>Modal Title</h2>
    </Modal.Header>
    
    <Modal.Body>
      <p>Modal content goes here</p>
    </Modal.Body>
    
    <Modal.Footer>
      <Modal.Close>Close</Modal.Close>
    </Modal.Footer>
  </Modal.Content>
</Modal>
```

**Important:** Add `<div id="modal-root"></div>` to your HTML for modal portal.

---

### Toast

Toast notifications with progress indicator.

```tsx
import { ToastProvider, useToast } from "3ui";

// Wrap your app
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

**Toast Types:** `"default" | "success" | "info" | "warning" | "destructive"`

---

### Tabs

Tab navigation component.

```tsx
import { Tabs } from "3ui";

<Tabs defaultValue="tab1">
  <Tabs.List>
    <Tabs.Trigger value="tab1">Tab 1</Tabs.Trigger>
    <Tabs.Trigger value="tab2">Tab 2</Tabs.Trigger>
    <Tabs.Trigger value="tab3">Tab 3</Tabs.Trigger>
  </Tabs.List>

  <Tabs.Content value="tab1">Content for tab 1</Tabs.Content>
  <Tabs.Content value="tab2">Content for tab 2</Tabs.Content>
  <Tabs.Content value="tab3">Content for tab 3</Tabs.Content>
</Tabs>
```

---

### Accordion

Collapsible content sections.

```tsx
import { Accordion } from "3ui";

<Accordion defaultOpenItems={["item-1"]}>
  <Accordion.Item value="item-1">
    <Accordion.Trigger>Section 1</Accordion.Trigger>
    <Accordion.Content>Content for section 1</Accordion.Content>
  </Accordion.Item>

  <Accordion.Item value="item-2">
    <Accordion.Trigger>Section 2</Accordion.Trigger>
    <Accordion.Content>Content for section 2</Accordion.Content>
  </Accordion.Item>
</Accordion>
```

---

### Table

Responsive table with optional pagination.

```tsx
import { Table } from "3ui";

<Table striped>
  <Table.Header>
    <Table.Row>
      <Table.Head>Name</Table.Head>
      <Table.Head>Email</Table.Head>
      <Table.Head>Role</Table.Head>
    </Table.Row>
  </Table.Header>

  <Table.Body>
    <Table.Row>
      <Table.Cell>John Doe</Table.Cell>
      <Table.Cell>john@example.com</Table.Cell>
      <Table.Cell>Admin</Table.Cell>
    </Table.Row>
  </Table.Body>
</Table>

// With pagination
<Table 
  striped
  pagination={{
    pageSize: 10,
    total: 100,
    onPageChange: (page) => console.log(page)
  }}
>
  {/* ... */}
</Table>
```

---

### Toggle

Switch/toggle component.

```tsx
import { Toggle } from "3ui";
import { useState } from "react";

function MyComponent() {
  const [enabled, setEnabled] = useState(false);

  return (
    <Toggle.Root 
      checked={enabled} 
      onChange={setEnabled}
      variant="primary"
    >
      <Toggle.Button />
      <Toggle.Label>Enable notifications</Toggle.Label>
    </Toggle.Root>
  );
}
```

**Variants:** `"primary" | "success" | "danger" | "warning"`

---

### Slider

Range input slider.

```tsx
import { Slider } from "3ui";

<Slider id="volume" initialValue={50} min={0} max={100}>
  <Slider.Label htmlFor="volume" showValue>
    Volume
  </Slider.Label>
  <Slider.Field step={1} onChange={(val) => console.log(val)} />
</Slider>
```

---

### Loading Components

#### Spinner

```tsx
import { Spinner } from '3ui';

<Spinner size={40} color="var(--ui-accent)" speed={1}>
  Loading...
</Spinner>
```

#### LoadingDots

```tsx
import { LoadingDots } from '3ui';

<LoadingDots size="md" speed={0.6}>
  <LoadingDots.Dot />
  <LoadingDots.Label>Loading</LoadingDots.Label>
</LoadingDots>
```

---

## Hooks

### useToggle

Toggle boolean state easily.

```tsx
import { useToggle } from "3ui";

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
import { useLocalStorage } from "3ui";

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
import { useCopyToClipboard } from "3ui";

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
import { useFetch } from "3ui";

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
import { useIntersectionObserverSingle } from "3ui";

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
import { useWindowSize } from "3ui";

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
import { useTimeout } from "3ui";

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
import { useOutsideClick } from "3ui";
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

### Custom Utility

The library includes a `cn` utility for className merging:

```tsx
import { cn } from "3ui";

<div className={cn("base-class", isActive && "active-class")}>Content</div>
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
import type { ButtonProps, InputProps, ToastOptions } from "3ui";
```

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Contributing

Contributions are welcome! Please read our contributing guidelines before submitting PRs.

## License

MIT © Bishal Babu Bohara

## Support

For issues and feature requests, please use the [GitHub issue tracker](https://github.com/BabuBishal/tasks-projects/issues).
