<h1 align="center">MrDTwice</h1>

<p align="center">
  <strong>Discover, share, rate, and review interesting places.</strong>
</p>

<p align="center">
  A lightweight community-driven web app for exploring places to visit, built as
  an academy final project MVP.
</p>

<p align="center">
  <a href="#overview">Overview</a>
  |
  <a href="#contents">Contents</a>
  |
  <a href="#how-to-view-it">How to View It</a>
  |
  <a href="#how-to-run-it">How to Run It</a>
  |
  <a href="#docs">Docs</a>
</p>

<p align="center">
  <img alt="Build" src="https://img.shields.io/badge/build-TODO-lightgrey">
  <img alt="Deploy" src="https://img.shields.io/badge/deploy-TODO-lightgrey">
  <img alt="Status" src="https://img.shields.io/badge/status-MVP-orange">
  <img alt="License" src="https://img.shields.io/badge/license-MIT-blue">
</p>

## Overview

MrDTwice is an MVP web application for discovering and sharing interesting
places. Users should be able to browse places, search and filter them, open a
detail page, add a new place, upload at least one image, and leave ratings or
reviews.

The project is intentionally small in scope: the goal is to deliver a working,
presentable product for an academy final exam, not a feature-heavy platform.

## Contents

- [Overview](#overview)
- [Core Features](#core-features)
- [Tech Stack](#tech-stack)
- [How to View It](#how-to-view-it)
- [How to Run It](#how-to-run-it)
- [Project Structure](#project-structure)
- [Docs](#docs)
- [License](#license)

## Core Features

- Browse places.
- Search and filter by text, category, country, and city.
- View place details with images and average rating.
- Add a new place with basic information and images.
- Add ratings from 1 to 5 stars.
- Add written reviews.

Out of scope for the first MVP:

- Authentication.
- User profiles.
- Favorites and wishlists.
- Social features.
- Advanced moderation.
- Recommendation algorithms.

## Tech Stack

Frontend:

- Angular
- TypeScript
- Angular Router
- Tailwind CSS
- PrimeNG

Backend:

- Node.js
- Express
- PostgreSQL hosted on Supabase
- `pg`
- dotenv

Tooling:

- npm
- ESLint
- Prettier
- Vitest for frontend tests

## How to View It

TODO: add the public deployment URL, screenshots, or demo instructions.

Design reference:

- [Figma mockup](https://www.figma.com/design/cMAgFuT1NFTkabQaFxcSP8/Wireframe-e-Mockup?node-id=30-54384&t=sUAnXCBUrnGCNY4F-1)

## How to Run It

TODO: add final setup instructions when frontend, backend, environment variables,
and database schema are stable.

Expected local flow:

```bash
cd backend
npm install
npm run lint
```

```bash
cd frontend
npm install
npm run start
```

## Project Structure

```text
.
|-- backend/    # Express API and database access
|-- docs/       # Project documentation
|-- frontend/   # Angular application
|-- mockups/    # UI mockups and reference screens
`-- README.md
```

## Docs

- [Concept](docs/concept.md)
- [Information Architecture](docs/information-architecture.md)
- [Technical Stack](docs/technical-stack.md)
- [Style Guide](docs/style-guide.md)
- [Backend Flow](docs/BE-schema-of-complete-flux.md)
- [Setup Guide](docs/setup-guide.md)
- [Deployment Guide](docs/deployment-guide.md)

## License

Licensed under the [MIT License](LICENSE).
