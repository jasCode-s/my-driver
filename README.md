# My Driver

An app for hiring a driver to drive *your own car* — for when you're impaired (alcohol, etc.) and need to get yourself and your car home safely. Cross-platform for iOS and Android.

Full product plan: see the plan written during the initial planning session (architecture, data model, API surface, phased build order).

## Structure

```
apps/
  mobile/   # Expo (React Native + TypeScript) app — rider + driver roles in one app
  api/      # Node.js + TypeScript backend (Express + Socket.IO + Postgres/PostGIS + Redis)
packages/
  shared/   # Shared TypeScript types + zod schemas used by both apps
```

## Prerequisites

- Node.js 20+
- Docker (for local Postgres/PostGIS + Redis)
- Expo Go app on your phone, or an iOS/Android simulator, to run the mobile app

## Setup

```bash
npm install

# start local Postgres + Redis
docker compose up -d

# copy env config and run DB migrations
cp apps/api/.env.example apps/api/.env
npm run migrate --workspace=@my-driver/api

# start the backend
npm run dev:api

# in another terminal, start the mobile app
npm run dev:mobile
```

The mobile app reads the API base URL from `apps/mobile/app.json` (`expo.extra.apiUrl`, defaults to `http://localhost:4000`) — point it at your machine's LAN IP when testing on a physical device via Expo Go.

## Status

Early scaffold: monorepo, backend skeleton (health check, auth signup/login, JWT middleware, Socket.IO auth handshake), and the mobile app's route structure (auth, rider, driver, profile) with role switching. Trip creation, driver-matching, live location tracking, and fare/rating are stubbed with `TODO` markers pointing at the milestone that implements them — see the plan for the full phased build order.

## Commands

- `npm run typecheck` — typecheck every workspace
- `npm run dev:api` / `npm run dev:mobile` — run each app in dev mode
- `npm run migrate --workspace=@my-driver/api` — apply DB migrations
