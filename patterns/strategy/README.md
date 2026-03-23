# Strategy

Define a family of algorithms, encapsulate each one, and make them interchangeable. The Strategy pattern lets the algorithm vary independently from clients that use it.

## Structure

- **Context** — `ShippingCalculator` holds a reference to a strategy and delegates calculations
- **Strategy** — interface for shipping cost algorithms
- **Concrete strategies** — Standard, Express, Overnight, Free

## Usage

**Class-based (Node.js):**

```bash
npm run strategy:class
```

**React demo:** `/patterns/strategy`
