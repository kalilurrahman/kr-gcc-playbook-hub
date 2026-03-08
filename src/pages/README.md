# Pages

The `src/pages/` directory acts as the entry point for primary views rendered by the router in `App.tsx`. Given that the GCC Playbook is fundamentally a Single-Page Application (SPA), the logic here predominantly revolves around state management and global layout wrappers.

## `Index.tsx`

This is the main driver of the application. It encapsulates the core dashboard, sidebars, headers, and individual content sections.

### State & Navigation
Rather than navigating to distinct URLs like `/purpose` or `/library`, navigation is managed through state mapping:
- The `activeSection` state determines which major block of the `gccData.ts` (e.g. `purpose`, `lifecycle`, `maturity`, etc.) to render dynamically within the central layout.
- The `ResourcesExplorer` (`/library`) acts as one of these conditionally rendered sections.
- When `activeSection` is updated (e.g. by a user clicking a navigation link inside `GCCHeader.tsx`), the page smoothly scrolls to the top to simulate page navigation and provide seamless content transitions.

## `NotFound.tsx`

The fallback mechanism for any undefined paths. If a user navigates to an unrecognized URL fragment (via the address bar or outdated bookmark), this component intercepts the request, presents a "Page Not Found" screen, and securely guides the user back to the `Index.tsx` view using a styled "Return Home" call-to-action.