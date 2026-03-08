# Data Layer

The `src/data/` directory acts as the central static data layer for the GCC Playbook. The entire application is built on top of predefined TypeScript objects to ensure type safety, eliminate API dependency for core content, and allow rapid offline editing.

## `gccData.ts`

This is the primary data module powering the core playbooks and dashboards of the application. It contains comprehensive structured models for:

- **GCC Purpose & Strategic Objectives:** Details around cost arbitrage, talent access, and innovation hubs.
- **Lifecycle Phases:** An array of objects defining the stages from inception and planning to growth and exit.
- **Maturity Levels:** Breakdown of the 5 evolutionary steps (Cost Center -> Global Value Creator).
- **GCC Sizes:** Scale definitions (Micro/Nano to Mega GCCs) and their typical operational focuses.
- **Geographies:** Information on major global GCC hubs (e.g., India, Mexico, Poland, Philippines).
- **Challenges & Solutions:** Common operational risks mapped to practical mitigation strategies.
- **Best Practices:** Frameworks for governance, alignment, and execution.
- **Finance & Accounting:** Comparisons between CapEx/OpEx models and localization strategies.

## `resourcesData.ts`

This file is responsible for powering the entire interactive `ResourcesExplorer` component ("The Library"). It exports:

- `allResources`: A vast array of objects defining hundreds of curated links, PDFs, tools, and guides.
  - Each object adheres to an implicit schema containing `name`, `url`, `type` (e.g., Blog, Web Guide, Web Article, PDF), and `category`.
- `resourceCategories`: A dynamically extracted, sorted array of all unique categories present within `allResources`.
- `resourcesByCategory`: A heavily optimized mapping grouping the resources array by their category keys for near-instant rendering and searchability.

### Updating Data

Any modification to these arrays will automatically hot-reload and reflect in the application's components. They are structured intentionally so that non-technical contributors can easily edit text strings, add new items, or restructure existing content directly within the TypeScript files.