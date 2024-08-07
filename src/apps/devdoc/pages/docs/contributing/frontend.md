# Frontend
This is a guide to help the Kloudlite community and also Kloudlite members contribute to our UI. It is ongoing work but we hope it provides some useful information to get started. If you have any questions or need help, please send us a message on our Discord server (opens in a new tab). We'll be happy to help you.

## Running the UI
You can run the UI and access the dashboard in two ways:

- Build the UI pointing to an external Kloudlite server: KLOUDLITE_HOST=https://console.kloudlite.io (opens in a new tab) pnpm dev inside of the site folder. This is helpful when you are building something in the UI and already have the data on your deployed server.
- Build the entire Kloudlite server + UI locally: task app=console in the root folder. It is useful when you have to contribute with features that are not deployed yet or when you have to work on both, frontend and backend.

In both cases, you can access the dashboard on http://localhost:4001 (opens in a new tab). If you are running the task app=console you can log in using the default credentials: admin@kloudlite.com and SomeSecurePassword!

## Tech Stack
All our dependencies are described in site/package.json but here are the most important ones:

- Remix (opens in a new tab) as framework
- TypeScript (opens in a new tab) to keep our sanity
- Radix UI (opens in a new tab) for UI components
- Graphql (opens in a new tab) as fetching lib
- Storybook (opens in a new tab) for visual testing
- PNPM as package manager

## Structure

All the code related to the UI is inside the src folder and we defined a few conventions to help people to navigate through it.

- src - source code
    - @types - Custom types for dependencies that don't have defined types (largely code that has no server-side equivalent)
    - api - API code as function calls and types
    - queries - react-query queries and mutations
    - components - UI components
    - hooks - Hooks that can be used across the application
    - pages - Page components
    - testHelpers - Helper functions to help with integration tests
    - util - Helper functions that can be used across the application
- design system - Static UI assets like images, fonts, icons, etc


## Routing
We use Remix (opens in a new tab) for routing. The routes are defined in the routes.tsx file.

## Pages
Pages are the top-level components of the app. The page component lives under the src/apps folder and each page should have its own folder so we can better group the views, tests, utility functions and so on. We use a structure where the page component is responsible for fetching all the data and passing it down to the view.

## States
A page usually has at least three states: loading, ready/success, and error, so always remember to handle these scenarios while you are coding a page. We use the useOutletContext hook to access the state from the parent component.

## fetching data
We use the Graphql api to fetch data. It provides a simple interface to fetch data from the server.It is used to fetch data from the server and update the state of the page. It also provides a way to handle errors and loading states.

**useWatch:** The useWatch hook is used to watch for changes in the data and update the state of the page. It is used to watch for changes in the data and update the state of the page. It also provides a way to handle errors and loading states.

**useWatchReload:** The useWatchReload hook is used to watch for changes in the data and reload the page. It is used to watch for changes in the data and reload the page. It also provides a way to handle errors and loading states.

## API

We use the Graphql (opens in a new tab) as fetching library. It provides a simple interface to fetch data from the server.It is used to fetch data from the server and update the state of the page. It also provides a way to handle errors and loading states. Our APi functions are defined in the server/gql/queries folder. Each function is a query that returns a GraphQL object. The functions are used to fetch data from the server and update the state of the page. It also provides a way to handle errors and loading states.

## Components
We use the Remix UI (opens in a new tab) as UI components. It provides a set of UI components that can be used to build the UI of the application. The components are defined in the components folder. Each component is a UI component that can be used to build the UI of the application. The components are used to build the UI of the application.

### Structure
Each component gets its own folder. Make sure you add a test and Storybook stories for the component as well. By keeping these tidy, the codebase will remain easy to navigate, healthy and maintainable for all contributors.

### Accessibility
We strive to keep our UI accessible.

In general, colors should come from the app theme, but if there is a need to add a custom color, please ensure that the foreground and background have a minimum contrast ratio of 4.5:1 to meet WCAG level AA compliance. WebAIM has a great tool for checking your colors directly, but tools like Dequeue's axe DevTools can also do automated checks in certain situations.

### Should I create a new component?
As with most things in the world, it depends. If you are creating a new component to encapsulate some UI abstraction like UsersTable it is ok but you should always try to use the base components that are provided by the library or from the codebase. It's recommended that you always do a quick search before creating a custom primitive component like dialogs, popovers, buttons, etc.