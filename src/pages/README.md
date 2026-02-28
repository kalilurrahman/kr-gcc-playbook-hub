# `src/pages/` - Top-Level Page Components

This directory holds the main React page components that handle the overall layout and routing logic for the GCC Playbook.

## Overview

The `src/pages/` folder provides the entry points for the different routes defined in `src/App.tsx`.

## Key Files

- **`Index.tsx`**: The primary dashboard and content view for the GCC Playbook. It is responsible for orchestrating the overall user experience.
  - Integrates the global layout components (`GCCHeader`, `GCCFooter`, `CuratorBanner`).
  - Manages the state for the `searchQuery` and the `activeSection`.
  - Dynamically renders content based on the user's navigation choice or search input.
  - Uses `framer-motion` to smoothly transition between different sections (Overview, Resources, or specific content sections like Lifecycle Phases).

- **`NotFound.tsx`**: The fallback component used when a user navigates to a route that does not exist in the application. It acts as a custom 404 page.

## Routing Logic

The routing is handled via `react-router-dom` inside `src/App.tsx`. The default route (`/`) maps directly to `Index.tsx`. All unknown routes (`*`) map to `NotFound.tsx`.

If new top-level pages need to be added (e.g., an `/about` page), you should create a new component in this folder and update `App.tsx` accordingly.
