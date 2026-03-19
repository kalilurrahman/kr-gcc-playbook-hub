# Pages

The `src/pages/` directory acts as the entry point for primary views rendered by the router in `App.tsx`. Given that the GCC Playbook is fundamentally a Single-Page Application (SPA), the logic here predominantly revolves around state management and global layout wrappers.

![Main Dashboard Dark](../../public/images/main_dark.png)
*Index Page View in Dark Mode*

## `Index.tsx`

This is the main driver of the application. It encapsulates the core dashboard, sidebars, headers, and individual content sections.

### State & Navigation
Rather than navigating to distinct URLs like `/purpose` or `/library`, navigation is managed through state mapping:
- The `activeSection` state determines which major block of the `gccData.ts` (e.g. `purpose`, `lifecycle`, `maturity`, etc.) to render dynamically within the central layout.
- The `ResourcesExplorer` (`/library`) acts as one of these conditionally rendered sections.
- When `activeSection` is updated (e.g. by a user clicking a navigation link inside `GCCHeader.tsx`), the page smoothly scrolls to the top to simulate page navigation and provide seamless content transitions.

![Library Search Dark](../../public/images/library_search_dark.png)
*Resources Explorer rendering dynamically in Index.tsx*

## `PlaybookViewer.tsx`

This view is responsible for providing a comprehensive reading experience for the GCC Playbook.
It dynamically fetches the structured playbook content and renders it allowing users to easily access any chapter, section or resources.

Features implemented include:
- An interactive Table of Contents for easy navigation
- A complete Glossary to check the most important terms
- Robust Search functionality to easily find specific topics
- The ability to track reading progress by remembering the last read chapter and allowing the user to pick up where they left off.

![Playbook Viewer Light](../../public/images/playbook_main_light.png)
*Playbook Viewer in Light Mode*

![Playbook Viewer Dark](../../public/images/playbook_main_dark.png)
*Playbook Viewer in Dark Mode*

## `NotFound.tsx`

The fallback mechanism for any undefined paths. If a user navigates to an unrecognized URL fragment (via the address bar or outdated bookmark), this component intercepts the request, presents a "Page Not Found" screen, and securely guides the user back to the `Index.tsx` view using a styled "Return Home" call-to-action.