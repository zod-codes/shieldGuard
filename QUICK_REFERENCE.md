# Quick Reference: Key Changes

## 🎯 Main Architecture Changes

### 1. Router Migration (CRITICAL)
- **OLD:** BrowserRouter wrapper in main.tsx
- **NEW:** createBrowserRouter with RouterProvider
- **Files:** `src/main.tsx`, `src/routes.tsx` (new)

### 2. Layout Pattern (CRITICAL)
- **OLD:** App.tsx with manual routing and prop drilling
- **NEW:** RootLayout.tsx with useOutletContext
- **Files:** `src/layouts/RootLayout.tsx` (new)

### 3. App.tsx Deleted
- **Status:** ✅ REMOVED - functionality moved to RootLayout

---

## 📦 All Files Changed

### New Files Created:
```
src/routes.tsx                          ← Router configuration
src/layouts/RootLayout.tsx              ← Root layout component
OPTIMIZATION_SUMMARY.md                 ← Full documentation
```

### Modified Components:
```
src/main.tsx                            ← RouterProvider setup
src/pages/Home.tsx                      ← Uses useOutletContext
src/components/Header.tsx               ← Link-based navigation
src/components/Footer.tsx               ← Link-based navigation  
src/components/ProductsDropdown.tsx     ← Link + useCallback
src/components/Hero.tsx                 ← useCallback optimization
src/components/AuthModal.tsx            ← useCallback optimization
```

---

## 🚀 React Conventions Applied

### Navigation
- ❌ BEFORE: `<a href>` tags, `onClick={() => navigate(...)}`
- ✅ AFTER: `<Link to="">` components

### State Updates
- ❌ BEFORE: `setFormData({ ...formData, [name]: value })`
- ✅ AFTER: `setFormData(prev => ({ ...prev, [name]: value }))`

### Callbacks
- ❌ BEFORE: Functions recreated on every render
- ✅ AFTER: `useCallback` with proper dependency arrays

### Global State
- ❌ BEFORE: Props drilled through 3+ components
- ✅ AFTER: `useOutletContext` from RootLayout

### Accessibility
- ❌ BEFORE: No aria attributes or labels
- ✅ AFTER: `aria-label`, `aria-expanded`, `htmlFor` on all inputs

---

## 💡 How to Use the New Architecture

### Add a New Route
```tsx
// In src/routes.tsx
{
  path: '/my-page',
  element: <MyPage />,
}
```

### Access Global Callbacks in a Page
```tsx
// In src/pages/MyPage.tsx
import { useOutletContext } from 'react-router-dom';

interface OutletContextType {
  onSignUpClick: () => void;
}

export function MyPage() {
  const { onSignUpClick } = useOutletContext<OutletContextType>();
  // ... use onSignUpClick
}
```

### Navigate Programmatically
```tsx
import { useNavigate } from 'react-router-dom';

export function MyComponent() {
  const navigate = useNavigate();
  
  const handleClick = useCallback(() => {
    navigate('/path');
  }, [navigate]);
}
```

### Link to Another Route
```tsx
import { Link } from 'react-router-dom';

export function MyComponent() {
  return <Link to="/careers">Careers</Link>;
}
```

---

## ✅ Verification Checklist

- [x] No manual routing in components
- [x] All `<a>` tags replaced with Link
- [x] useCallback used for event handlers
- [x] useOutletContext eliminates prop drilling
- [x] All forms have proper labels (accessibility)
- [x] TypeScript interfaces for all props/context
- [x] Old App.tsx removed
- [x] routes.tsx created with all routes
- [x] RootLayout.tsx handles global state
- [x] No inline function handlers in JSX

---

## 📚 Related Files for Reference

- Full documentation: `OPTIMIZATION_SUMMARY.md`
- Router config: `src/routes.tsx`
- Root layout: `src/layouts/RootLayout.tsx`
- Entry point: `src/main.tsx`

---

## ⚠️ Important Notes

1. **Header component no longer needs `onNavigate` prop** - It handles navigation internally with Link and useNavigate
2. **Home page must use `useOutletContext`** - To access `onSignUpClick` from RootLayout
3. **ProductsDropdown is used in Header** - It handles its own Link navigation
4. **All navigation is client-side** - No page reloads, proper SPA behavior
5. **Smooth scroll for hash anchors** - Use buttons with handleSmoothScroll function

---

Last Updated: January 8, 2026
