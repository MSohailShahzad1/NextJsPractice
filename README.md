# Notes App

A full-stack notes application built with Next.js App Router, NextAuth (credentials), Prisma, and PostgreSQL.

## Features

- User registration and login
- Protected notes routes with auth middleware/proxy
- Notes CRUD (create, read, update, delete)
- Debounced search in notes list
- Sorting (`newest`, `oldest`, `title A-Z`, `title Z-A`)
- Pagination in notes list
- Toast-based action feedback (login/logout/register/create/update/delete and error states)
- Loading states for main routes and note actions
- Responsive UI with shared design system styles

## Tech Stack

- `next@16` + App Router
- `react@19`
- `next-auth@5` (credentials provider)
- `prisma@7` + PostgreSQL (`@prisma/adapter-pg`)
- `zod` for input validation
- Tailwind CSS + shadcn/ui style components
- `sonner` for toasts

## Project Structure

- `src/app` - pages, layouts, route handlers, loading states
- `src/app/api` - API routes (`auth`, `register`, `notes`)
- `src/components` - UI and notes components
- `src/auth.ts` - NextAuth configuration
- `src/proxy.ts` - route protection (auth-aware redirects)
- `src/lib/prisma.ts` - Prisma client setup
- `src/validations` - Zod schemas
- `prisma/schema.prisma` - DB schema

## Environment Variables

Create `.env` and `.env.local` with:

```env
# .env
DATABASE_URL=postgresql://...

# .env.local
AUTH_SECRET=your-random-secret
```

## Setup

1. Install dependencies:

```bash
npm install
```

2. Run Prisma migrations:

```bash
npx prisma migrate dev
```

3. Start the app:

```bash
npm run dev
```

Default local URL: `http://localhost:3000`

## Scripts

- `npm run dev` - start development server
- `npm run build` - production build
- `npm run start` - run production server
- `npm run lint` - run ESLint

## Main Routes

- `/` - home
- `/login` - login
- `/register` - register
- `/notes` - notes list (search/sort/paginated)
- `/notes/new` - create note
- `/notes/[id]` - edit note
- `/notes/[id]/delete` - delete confirmation

## API Endpoints

- `POST /api/register` - create account
- `GET /api/notes` - list current user notes
- `POST /api/notes` - create note
- `GET /api/notes/[id]` - get single note (owned by current user)
- `PUT /api/notes/[id]` - update note (owned by current user)
- `DELETE /api/notes/[id]` - delete note (owned by current user)

## Notes

- Email is normalized (trim + lowercase) during registration and login/auth.
- Note ownership is enforced on server routes.
- Prisma client is generated into `src/generated/prisma`.
