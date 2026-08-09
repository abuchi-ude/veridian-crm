# Veridian CRM

A responsive and accessible customer management dashboard built for the Peerless frontend engineering assessment.

The application implements Case 1, the **Customer Management Dashboard**, and allows users to view, search, filter, and register customers through a focused customer-management journey.

## Features

* Customer dashboard with portfolio metrics
* Searchable, filterable, and paginated customer table
* Customer registration with React Hook Form and Zod validation
* Pending status preselected by default, with the option to choose Active or Inactive
* Phone-number character and length validation
* Duplicate submission protection
* Status-aware registration success dialog
* Loading skeleton, error, empty-data, and no-results states
* Responsive desktop, tablet, and mobile layouts
* System-aware light and dark themes with a session-only theme toggle
* Accessible modal dialogs, mobile navigation, keyboard navigation, and focus management
* Automated tests for validation, filtering, pagination, form controls, and the registration journey

## Tech Stack

| Technology | Purpose |
| --- | --- |
| React | UI development |
| TypeScript | Static type safety |
| Vite | Development and build tooling |
| Tailwind CSS | Styling and responsive layout |
| React Router | Client-side routing |
| TanStack Query | Data fetching and server-state patterns |
| React Hook Form | Form state and submission handling |
| Zod | Form schema validation |
| Lucide React | Icons |
| Vitest | Test runner |
| React Testing Library | Component and user-flow testing |
| pnpm | Package management |

## Getting Started

### Prerequisites

* Node.js
* pnpm

### Installation

```bash
git clone https://github.com/abuchi-ude/veridian-crm.git
cd veridian-crm
pnpm install
```

Start the development server:

```bash
pnpm dev
```

The application will be available at the local URL provided by Vite.

### Production build

```bash
pnpm build
```

Preview the production build locally:

```bash
pnpm preview
```

## Testing

Run the test suite with:

```bash
pnpm test
```

Run the lint checks with:

```bash
pnpm lint
```

The tests use Vitest and React Testing Library and focus on observable user-facing behavior. Current coverage includes:

* Customer schema and phone-number validation
* Search and combined customer filtering
* Pagination behavior
* Filter control updates and page resets
* Opening and submitting the customer registration form
* Verifying the success state and submitted customer information

## Current Application Flow and Scope

The customer management journey is the only active product screen in this assessment build. Visiting `/` redirects to `/customers`, so the application opens directly on the selected Case 1 experience. The other sidebar items are intentionally dormant because their screens are outside the case-study scope.

The implemented flow is:

1. The customer directory loads the local mock customer collection.
2. Users can search, combine status, industry, and customer-type filters, and move through paginated results.
3. The **Assessment state preview** controls let reviewers inspect the required loading, empty, and error presentations without changing the data source.
4. **Register Customer** opens the registration dialog. Required fields are validated and repeat submission is prevented while creation is in progress.
5. Successful submission closes the registration dialog and opens a status-aware success dialog containing the new customer's summary.
6. **Register Another Customer** starts another registration.
7. **View All Customers** closes the success dialog, clears search and filters, and moves to the page containing the newly added customer.

## Architecture

The project separates route-level composition, shared interface elements, feature-specific code, and the data-service boundary.

```text
src/
|-- components/                 Shared form and button components
|-- features/
|   `-- customers/
|       |-- components/        Customer-specific UI
|       |-- hooks/             TanStack Query hooks
|       |-- utils/             Filtering and pagination logic
|       |-- customer.constants.ts
|       |-- customer.schema.ts
|       |-- customer.services.ts
|       |-- customer.types.ts
|       `-- customers.mock.ts
|-- layout/                     Dashboard shell, header, and sidebar
|-- lib/                        Shared utilities
|-- pages/                      Route-level page composition
|-- routes/                     Application routing
|-- test/                       Shared test setup
|-- App.tsx
|-- index.css
`-- main.tsx
```

### Directory responsibilities

* `components/` contains UI components shared outside a single feature.
* `features/customers/` owns customer-specific components, domain types, validation, query hooks, service functions, mock data, utilities, and tests.
* `layout/` contains the application shell, header, and responsive sidebar.
* `pages/` composes feature components and coordinates the page-level journey.
* `routes/` defines application routing and redirects the root route to the customer page.
* `lib/` contains shared application utilities.
* `test/` contains shared test-environment setup.

This structure keeps customer-domain behavior close together while preventing the route-level page from owning every presentation detail.

## Data and State Approach

The assessment calls for a mock API or local service and does not provide a production customer API. The application therefore uses an in-memory mock customer collection behind a service boundary.

TanStack Query manages customer fetching, creation invalidation, and refetching. Local React state is reserved for transient interface concerns such as modal visibility, search, filters, pagination, and assessment-state previews.

Customer registration appends the new record to the in-memory collection. Because there is no backend or browser persistence layer, customers created during a session are reset after a full page refresh.

## Customer Registration

The registration form collects:

* Business name
* Customer type
* Industry
* Contact person
* Email address
* Phone number
* Account status

New registrations default to **Pending**, reflecting an account that still requires onboarding, but users can select **Active** or **Inactive** when appropriate. React Hook Form manages form state and submission, while Zod centralizes validation and the accepted customer-domain values.

During submission, the submit button is disabled, its text changes to `Registering...`, and `aria-busy` communicates progress to assistive technologies. This prevents rapid repeat submissions through the interface.

## Accessibility

Accessibility is part of the primary implementation rather than an additional visual pass.

### Forms and dialogs

* Form controls have associated labels and understandable validation feedback.
* Dialogs use `role="dialog"`, `aria-modal`, `aria-labelledby`, and `aria-describedby`.
* Focus moves into an opened dialog and remains trapped within it.
* `Escape` closes dialogs and focus returns to the element that opened them.
* Background scrolling is disabled while a dialog is open.

### Navigation

* A skip link allows keyboard users to move directly to the main content.
* The mobile drawer receives focus when opened and traps keyboard navigation.
* Content behind the open drawer is hidden from keyboard and assistive-technology navigation.
* Closing the drawer restores focus to its trigger.
* The desktop sidebar can be collapsed into an accessible icon rail.

The application also provides visible focus styling, semantic controls, accessible names, reduced-motion behavior, and responsive table and dialog layouts.

## User States

* **Populated:** displays customer records and portfolio information.
* **Search/filter:** applies search and multiple filters without leaving the page.
* **No results:** explains that no customers match the current search or filters.
* **Empty data:** explains that no customer records exist yet and offers registration.
* **Loading:** displays a skeleton while customer data is being retrieved.
* **Validation:** displays field-level feedback before submission.
* **Submission:** communicates progress and prevents repeat actions.
* **Error:** provides an explicit failure message and retry action.
* **Success:** confirms registration, summarizes the created customer, and provides next actions.

## Assumptions and Trade-offs

* The supplied customer information is local mock data because no production API or credentials were provided.
* Customer IDs can be generated locally for this assessment.
* Newly created mock customers persist only for the current page session.
* Search and filtering operate against the locally available customer collection.
* The other CRM navigation destinations remain dormant because only Case 1 is implemented.
* The theme initially follows the operating-system preference. A manual toggle changes the current session only, so a refresh returns to the system preference.
* The project prioritizes the required customer journey, its accessibility, and its reliability instead of adding unrelated CRM functionality.

The service boundary allows the mock implementation to be replaced later without coupling customer-facing components directly to a particular backend.

## Deferred Work

If the project were extended beyond the assessment scope, natural next steps would include:

* Replace the local service with a production API.
* Persist records through a backend.
* Add authentication and authorization.
* Add server-side filtering and pagination for larger datasets.
* Add customer editing and archiving.
* Expand automated coverage for secondary error and accessibility interactions.
* Add API-specific retry and recovery behavior when a real backend is available.

## AI-Assisted Development Disclosure

I used OpenAI Codex and ChatGPT as coding assistants during development, particularly for component scaffolding, Tailwind styling, accessibility and focus-management review, debugging, test refinement, and checking the documentation for clarity and completeness. I directed the product and technical decisions, reviewed and adapted the suggestions in the context of the application, and verified the implementation with the TypeScript production build, ESLint, Vitest, and manual interaction checks. I treated AI output as an engineering aid rather than a source of truth, and I understand the resulting implementation and trade-offs.

## Repository

[abuchi-ude/veridian-crm](https://github.com/abuchi-ude/veridian-crm)
