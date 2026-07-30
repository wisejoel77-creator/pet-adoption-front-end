# PawFound Front End

PawFound is a React application for browsing pets, submitting adoption requests, and managing pets, shelters, and requests as an administrator.

## Features

Browse pets with images, species, age, breed, and adoption-status badges.
Search pets by name and open a details page with an adoption form.
View submitted adoption requests, including the pet image and species.
Register and log in as an adopter.
See the currently signed-in role in the navigation and log out securely from the browser.
Admin dashboard for managing pets, shelters, and adoption requests.
Responsive cream, forest-green, terracotta, and gold visual theme.

## Technology

- React 
- Vite
- React Router
- CSS

## Getting started

### Pre-requisites

- Node.js 20 or newer
- The PawFound Flask backend running at `http://localhost:5000`

### Install and run

```bash
npm install
npm run dev
```

Open the local address shown by Vite, usually `http://localhost:5173`.

## Available commands

```bash
npm run dev      # Start the development server
npm run build    # Create a production build in dist/
npm run preview  # Preview a production build locally
npm run lint     # Run ESLint
```

## Authentication

After a successful login, the frontend stores the backend access token in browser local storage. The navigation uses the authenticated `/auth/profile` endpoint to show the current role and only displays the Admin link to users with the `admin` role.

Selecting **Log out** removes the token from local storage and returns the user to the home page. Access-token expiry is configured by the backend and is currently one hour.

## Backend API

The app expects the API to be available at `http://localhost:5000`. Main endpoints used include:

- `GET /view-all-pets`
- `GET /pet/:id`
- `POST /auth/login`
- `POST /auth/register`
- `GET /auth/profile`
- `GET /my-adoption-requests`

## Production deployment

Build the project before deployment:

```bash
npm run build
```

Vercel automatically detects Vite projects. Configure the production backend URL before deployment if your API is not hosted at `http://localhost:5000`.
