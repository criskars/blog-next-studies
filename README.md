# Blog Next Studies

A blog built as a study project with Next.js, React, and TypeScript. It includes a public reading experience and an administrative area for managing posts.

The project brings together the Next.js App Router, server actions, Markdown/MDX editing and rendering, authentication, and a SQLite-compatible database accessed through Drizzle ORM.

## Features

### Public area

- Home page at `/` with a list of posts.
- Individual post pages at `/:slug`.
- About page at `/about`.
- Custom not-found page.
- Dedicated components for post images, summaries, and rendered content.

### Administrative area

- Login page at `/admin/login`.
- Post list at `/admin/posts`.
- New-post page at `/admin/posts/new`.
- Post-editing page at `/admin/posts/[slug]`.
- Actions for creating, updating, and deleting posts.
- Markdown/MDX editor and image-upload action.
- A publication field for controlling whether a post is published.

Administrative pages and write actions include authentication checks. A request check in `app/proxy.ts` also redirects unauthenticated GET requests under `/admin` to the login page.

## Tech stack

| Area | Technologies |
| --- | --- |
| Application | Next.js 16, React 19, TypeScript |
| Styling and UI | Tailwind CSS 4, Radix UI |
| Content | MDXEditor, `next-mdx-remote`, `remark-gfm`, `rehype-sanitize`, `remark-mdx-remove-expressions` |
| Data | Drizzle ORM, Drizzle Kit, `@libsql/client` |
| Authentication | `bcryptjs`, `jose` |
| Tooling | npm, ESLint, Prettier |

Check `package.json` and `package-lock.json` for the exact dependency versions used by this checkout.

## Project structure

```text
.
├── app/
│   ├── [slug]/                  # Public post route
│   ├── about/                   # About page
│   ├── actions/                 # Post, login, logout, slug, and image actions
│   ├── admin/
│   │   ├── login/               # Administrative login
│   │   └── posts/
│   │       ├── [slug]/          # Edit an existing post
│   │       ├── new/             # Create a post
│   │       └── page.tsx         # Administrative post list
│   ├── components/
│   │   ├── admin/               # Administrative UI and editor
│   │   ├── public/              # Public-facing components
│   │   └── shared/              # Shared components
│   ├── lib/
│   │   ├── login/               # Login and session management
│   │   └── queries/             # Data queries
│   ├── utils/                   # Utility functions
│   ├── globals.css
│   ├── layout.tsx
│   ├── not-found.tsx
│   ├── page.tsx
│   └── proxy.ts                 # Additional check for admin requests
├── db/
│   ├── index.ts                 # Database initialization
│   ├── schema.ts                # Drizzle table definition
│   └── seed/
│       ├── posts.json           # Source data for sample posts
│       └── seed.ts              # Imports sample posts into the database
├── models/
│   └── post/                    # Post model
├── public/                      # Public assets
├── repositories/
│   ├── post/                    # Post repository implementations
│   └── post-repository.ts       # Repository contracts
├── .env.example
├── drizzle.config.ts
├── local.db
├── package.json
└── tsconfig.json
```

The repository contains both a Drizzle-backed post repository and a JSON-backed implementation. The database schema defines a `posts_table` with an ID, unique slug, title, excerpt, content, cover-image slug, publication status, creation and update timestamps, and author.

## Getting started

### 1. Clone and install

```bash
git clone [https://github.com/criskars/blog-next-studies.git](https://github.com/criskars/blog-next-studies.git)
cd blog-next-studies
npm ci
```

### 2. Configure the environment

Copy the example file and replace its placeholder credentials and secrets:

```bash
cp .env.example .env
```

The example provides these variables:

| Variable | Purpose |
| --- | --- |
| `DB_FILE_NAME` | Database connection value; the example uses `file:local.db`. |
| `LOGIN_EMAIL` | Email accepted by the administrative login. |
| `LOGIN_PASSWORD` | Encoded password hash used by the login check—not a plain-text password. |
| `JWT_SECRET_KEY` | Secret used to sign and verify session tokens. |
| `LOGIN_EXPIRATION_SECONDS` | Session-cookie lifetime in seconds. |
| `LOGIN_EXPIRATION_STRING` | JWT expiration value. |
| `LOGIN_COOKIE_NAME` | Name of the session cookie. |

`.env.example` contains illustrative values, not working production credentials. Generate an appropriate password hash for `LOGIN_PASSWORD`, use a strong private value for `JWT_SECRET_KEY`, and keep your real `.env` file out of version control.

### 3. Prepare the database

The project provides a Drizzle migration command:

```bash
npm run migrate
```

This command runs `drizzle-kit migrate`. Make sure the database configuration and the migrations required by your checkout are in place before relying on it to initialize a fresh database.

To replace the database's posts with the sample posts from `db/seed/posts.json`, run:

```bash
npm run seed
```

> **Warning:** `db/seed/seed.ts` deletes every row in `posts_table` before inserting the JSON posts. Do not run this command against a database containing posts you want to keep. It is intended for a disposable or deliberately reset database.

### 4. Start development

```bash
npm run dev
```

Open the local address reported by Next.js in your terminal.

## Available scripts

| Command | What it runs |
| --- | --- |
| `npm run dev` | `next dev` |
| `npm run build` | `next build` |
| `npm run start` | `next start` |
| `npm run lint` | `eslint` |
| `npm run preview` | `next build && next start -p 3001` |
| `npm run migrate` | `npx drizzle-kit migrate` |
| `npm run seed` | `npx tsx db/seed/seed.ts` |

`preview` builds the application and starts it on port 3001. `start` expects an existing production build.

## Posts and content

Public posts are addressed by slug. The schema marks `slug` as unique, and the application has separate actions for looking up a slug and for creating or updating posts.

The administrative UI contains an editor for post content. Public-facing components display the saved content, including a component dedicated to safer Markdown rendering. Review the content-processing configuration before accepting content from authors you do not trust.

Post data is organized across:

- `db/schema.ts` for the database table.
- `models/post/` for the application model.
- `repositories/` for data-access implementations.
- `app/lib/queries/` for queries used by pages and components.
- `app/actions/` for operations initiated by the interface.

## Authentication

The administrative login checks the submitted credentials against the configured email and password hash. A successful login creates a JWT-based session cookie. Administrative pages and write actions check authentication, while `app/proxy.ts` provides an additional redirect for unauthenticated GET requests to administrative routes.

Set `JWT_SECRET_KEY` explicitly for any deployed environment. The implementation has included a fallback secret in its login module; a publicly known fallback must not be treated as a secure deployment configuration.

## Notes for contributors

This is a learning project. When changing post fields, update the relevant schema, model, repository code, forms, and seed data together. When changing an action that writes data, check both its validation and its authentication behavior.

Before deploying, also review the database location, persistence of uploaded images, secret management, and whether the migration files required for a fresh installation are available.