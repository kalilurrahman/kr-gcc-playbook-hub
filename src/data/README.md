# `src/data/` - Static Application Data

![GCC Purpose Data Mapping](../../public/images/purpose_dark.png)

This folder stores the core content of the GCC Playbook application.

## Overview

The primary file here is `gccData.ts`. It acts as the "database" or content management file for the entire application, holding structured information regarding the Global Capability Center Playbook.

## Structure of `gccData.ts`

The data is defined using TypeScript interfaces to maintain type safety across the React application.

### Key Interfaces

- **`GCCCard`**: Represents an individual topic or concept within a section.
  - `icon`: An emoji representing the topic visually.
  - `title`: The main heading.
  - `description`: A short summary.
  - `tags`: An array of keywords for categorization and search.
  - `details`: An array of bullet points containing the deep dive information and links.
- **`GCCSection`**: Represents a major category grouping multiple cards.
  - `id`: A unique identifier (e.g., "purpose", "lifecycle").
  - `label`: A short display name used in navigation.
  - `title`: The full title for the section header.
  - `cards`: An array of `GCCCard` objects.

### Content Categories

The `sections` array currently exports the following structured data:

1. **GCC Purpose**: The strategic objectives behind setting up a GCC.
2. **Lifecycle Phases**: The end-to-end journey from inception to maturity.
3. **Maturity Levels**: The stages a GCC traverses over time.
4. **GCC Sizes**: Categories and scaling metrics.
5. **Geography**: An analysis of popular global destinations for GCC setups.
6. **Challenges**: Common hurdles and how to address them.
7. **Best Practices**: Frameworks for success.
8. **Resources**: A curated list of links to consulting reports, government portals, legal advisors, etc.
9. **Finance & Accounting**: Financial strategies (CapEx/OpEx, Tax Insights, Accounting Standards).

### Navigation & Metrics

- **`navItems`**: Extracted directly from the sections for rendering the global header navigation.
- **`stats`**: Key metrics (e.g., Active GCCs globally, Professionals Employed) displayed prominently on the Overview dashboard.

## Adding Content

To add new content or a new section:
1. Define a new object matching the `GCCSection` interface.
2. Add it to the exported `sections` array in `gccData.ts`.
3. The application dynamically generates navigation, search indexing, and rendering based on this array.