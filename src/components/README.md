# `src/components/` - React UI Components

This folder contains all the reusable React UI components used to build the GCC Playbook application.

## Overview

Components in this directory follow the best practices of breaking down a large application into smaller, self-contained building blocks. It is broadly categorized into:

1. **Feature Components**: Components specifically designed for the GCC Playbook's functionality (e.g., `ContentSection`, `CuratorBanner`, `GCCHeader`, `OverviewSection`, `ResourcesExplorer`).
2. **UI Components (`ui/`)**: Low-level, generic components provided by `shadcn-ui`. These are styled with Tailwind CSS and Radix UI primitives to ensure accessibility and consistent design.

## Notable Components

- **`GCCHeader.tsx`**: The main application header containing navigation links, dark/light mode toggle, and global search functionality.
- **`ContentSection.tsx`**: Displays individual sections (like Purpose, Lifecycle, Geography) in an interactive card grid format.
- **`ResourcesExplorer.tsx`**: A component designed specifically to render and filter the extensive list of GCC resources, tools, reports, and templates.
- **`GCCFooter.tsx`**: The application footer with branding and copyright.

## Design System

The styling is handled primarily through **Tailwind CSS**. Components use a custom utility `cn()` (found in `src/lib/utils.ts`) to manage dynamic class names efficiently.

### Adding New Components

When adding new components:
- Use functional components and modern React hooks.
- Create an interface for component props.
- If it's a primitive UI block (like a new button variant or tooltip), place it inside the `ui/` subdirectory. Otherwise, keep it at the root of `src/components/`.
