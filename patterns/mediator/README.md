# Mediator

Define an object that encapsulates how a set of objects interact. The Mediator promotes loose coupling by keeping objects from referring to each other explicitly.

## Structure

- **Mediator** — `ChatRoom` coordinates communication between participants
- **Colleague** — `User` (extends `BaseParticipant`) communicates only through the mediator
- Participants do not reference each other; all messages flow through the mediator

## Usage

**Class-based (Node.js):**

```bash
npm run mediator:class
```

**React demo:** `/patterns/mediator`
