# Calis10x

A bilingual (English / Persian) calisthenics skill-progression website: a structured exercise library with technique guidance, built as an **AI-assisted development project** to practice prompt engineering and AI-led project management.

**Live demo:** <!-- paste your Vercel URL here -->

> **Status: work in progress.** Stage 1 is live. Accounts, workouts, progress tracking and the AI coach are planned (see [Roadmap](#roadmap)).

---

## About this project

Calis10x is first of all an experiment in **working with AI as a product owner**, not a showcase of hand-written code.

- **My role:** project management, product decisions, prioritisation, reviewing AI output, and deployment. I make the decisions.
- **AI does most of the implementation.** The initial application was generated with [Lovable](https://lovable.dev). Where it made sense, I intervene and write or adjust code myself.
- **Claude** (Anthropic) is my partner for overall project management: planning the roadmap, reviewing decisions, Git/GitHub workflow, deployment guidance, security advice, and writing code changes.
- **ChatGPT** (OpenAI) was used to draft the original feature list and for additional ideas.

Because most of the code is AI-generated, I treat it like code from a junior colleague: it has to be read, questioned and tested before it is merged.

## Features (Stage 1)

- Design system with a dark theme
- Full **English and Persian** support, including **RTL layout** (typed translation dictionaries; adding a language means adding one file)
- Responsive navigation and homepage
- **Exercise library:** search, filtering by category and difficulty level, and a detail page per exercise with target muscles, technique cues, common mistakes and a progression path
- Client-side routing with typed routes

## Tech stack

| Area | Technology |
| --- | --- |
| Framework | [TanStack Start](https://tanstack.com/start) (TanStack Router), React 19, TypeScript |
| Styling | Tailwind CSS v4, Radix UI primitives (shadcn/ui style components) |
| Tooling | Vite, Vitest + Testing Library, ESLint, Prettier |
| Package manager | Bun |
| Hosting | Vercel |
| AI tools | Lovable (code generation), Claude, ChatGPT |

## Getting started

Requirements: [Bun](https://bun.sh).

```bash
git clone https://github.com/Ali-Armani/calis10x.git
cd calis10x
bun install
bun run dev      # http://localhost:8080
```

Other scripts:

```bash
bun run build    # production build
bun run lint     # ESLint
bun run test     # unit tests (Vitest)
bun run format   # Prettier
```

> Use `bun`, not `npm install`: npm currently fails on this dependency tree.

No environment variables are needed at this stage. Never commit `.env` files; they are git-ignored.

## Project structure

```
src/
├── routes/        # thin route files (TanStack Router)
├── features/      # feature code, e.g. features/exercises
├── components/    # layout and UI components
├── i18n/          # locales (en, fa) and the i18n provider
├── lib/ hooks/    # shared utilities
└── test/          # tests and test setup
```

Project rules (also in `AGENTS.md`):

- Translations live in `src/i18n/locales/<code>.ts`, typed against the English dictionary.
- Feature code lives in `src/features/<feature>/`; routes stay thin.
- Use logical spacing (`ms-`, `me-`, `ps-`, `pe-`) so layouts work in RTL.

## Deployment

Deployed on Vercel from the `main` branch.

- Framework preset: **Other**
- Install command: `bun install`
- Build command: `bun run build`
- Output directory: empty (the build writes `.vercel/output` itself)

See [DEPLOY.md](./DEPLOY.md).

## Roadmap

- [x] Stage 1: design system, EN/FA language system, navigation, homepage, exercise library
- [ ] Stage 2: accounts (sign-in) and athlete profiles
- [ ] Stage 3: skill tree, workouts, progress tracking
- [ ] Stage 4: AI coach, community, challenges, admin
- [ ] Engineering quality: CI pipeline (lint, tests, build), security headers, accessibility audit

## Known limitations

Being honest about the current state:

- The app is **unfinished**; most roadmap stages are not built yet.
- Some dependencies are **very new or pre-release** (for example the Nitro beta). This makes the build fragile and may need pinning or updating.
- Later stages (accounts, database, AI coach) depend on **Lovable Cloud**, which creates vendor lock-in that I will need to evaluate.
- No automated CI yet, and test coverage is minimal.
- Content is not yet reviewed by a certified coach.

## Security

- No secrets in the repository; environment files are git-ignored.
- Planned: security headers (CSP, frame protection, `nosniff`, referrer policy), Dependabot and secret scanning, and rate limiting before any AI or authentication endpoint goes live.

## Disclaimer

Training information on this site is for educational purposes only and is not medical advice. Consult a qualified professional before starting a new exercise program.

## Author

**Ali Armani** · [GitHub](https://github.com/Ali-Armani) · [Portfolio](https://ali-armani.github.io)

I will document lessons learned from this project (what worked, what failed, and how my prompting changed) in the blog section of my portfolio.