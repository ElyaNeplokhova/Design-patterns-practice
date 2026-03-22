# Chain of Responsibility

Pass a request along a chain of handlers. Each handler either processes the request or forwards it to the next handler.

## Structure

- **Handler** — abstract base with `setNext()` and `handle()`
- **Concrete handlers** — Required, Email, MinLength, MaxLength
- **Client** — builds the chain and sends requests

## Usage

**Class-based (Node.js):**

```bash
npm run chain:class
```

**React demo:** `/patterns/chain-of-responsibility`
