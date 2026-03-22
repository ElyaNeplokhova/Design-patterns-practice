# Design Patterns Practice

A hands-on study repo where every GoF design pattern is implemented twice:

1. **Class-based** — pure TypeScript / OOP, runnable with Node.js.
2. **React-based** — hooks, components, and a live demo page via Next.js.

Both versions share only contracts (`shared/types.ts`) and never import each other's implementation, so you can compare OOP and React approaches side by side.

## Tech Stack

| Layer | Tool |
|-------|------|
| Language | TypeScript (strict mode) |
| Framework | Next.js 14+ (App Router) |
| UI | React 18+ |
| Testing | Vitest + React Testing Library |
| Package manager | npm |

## Folder Layout

```
Design-patterns-practice/
├── package.json
├── tsconfig.json
├── README.md
│
├── patterns/                          # All pattern implementations
│   ├── README.md                      # Index of all patterns
│   └── <pattern-name>/
│       ├── README.md                  # Pattern explanation + UML + usage
│       ├── shared/
│       │   └── types.ts               # Interfaces shared by both versions
│       ├── class/
│       │   ├── index.ts               # Public exports
│       │   ├── handlers/              # Pattern participants
│       │   ├── chain.ts               # Composition / runnable example
│       │   └── __tests__/
│       └── react/
│           ├── hooks/
│           ├── components/
│           ├── handlers/              # React-specific implementations
│           └── __tests__/
│
└── app/                               # Next.js App Router
    └── patterns/
        └── <pattern-name>/
            └── page.tsx               # Live demo page
```

## Getting Started

```bash
# 1. Clone the repo
git clone https://github.com/<your-username>/Design-patterns-practice.git
cd Design-patterns-practice

# 2. Install dependencies
npm install

# 3. Run the dev server (Next.js demo pages)
npm run dev          # http://localhost:3000

# 4. Run tests
npm test

# 5. Run a class-based example directly
npx tsx patterns/chain-of-responsibility/class/chain.ts
```

## Pattern Index

| # | Pattern | Category | Class | React | Demo Page | Status |
|---|---------|----------|-------|-------|-----------|--------|
| 1 | [Chain of Responsibility](patterns/chain-of-responsibility/README.md) | Behavioural | `patterns/chain-of-responsibility/class/` | `patterns/chain-of-responsibility/react/` | `/patterns/chain-of-responsibility` | Implemented |

> Rows will be added here as new patterns are implemented.

## Adding a New Pattern

1. Create `patterns/<pattern-name>/` with `shared/`, `class/`, and `react/` sub-folders.
2. Add a `README.md` inside the pattern folder with explanation, UML, and usage notes.
3. Create a demo page at `app/patterns/<pattern-name>/page.tsx`.
4. Add a row to the **Pattern Index** table above.

## License

MIT
