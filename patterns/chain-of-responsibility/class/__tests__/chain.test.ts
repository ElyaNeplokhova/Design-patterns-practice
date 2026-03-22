import { describe, it, expect } from 'vitest';
import { RequiredHandler } from '../handlers/required-handler';
import { EmailHandler } from '../handlers/email-handler';
import { MinLengthHandler } from '../handlers/min-length-handler';
import { MaxLengthHandler } from '../handlers/max-length-handler';

/**
 * Tests for the Chain of Responsibility pattern — class-based implementation.
 * Covers: (1) each handler in isolation, (2) full chain composition, (3) early
 * exit on first failure.
 */
describe('Chain of Responsibility — Class', () => {
  /**
   * Builds a validation chain: required → email → minLength(8) → maxLength(64).
   * Used for full-chain tests. Returns the head of the chain.
   */
  const buildChain = () => {
    const required = new RequiredHandler();
    const email = new EmailHandler();
    const minLen = new MinLengthHandler(8);
    const maxLen = new MaxLengthHandler(64);
    required.setNext(email).setNext(minLen).setNext(maxLen);
    return required;
  };

  /** RequiredHandler alone — no next handler, so request ends after validate(). */
  describe('RequiredHandler in isolation', () => {
    it('rejects empty string', () => {
      const handler = new RequiredHandler();
      const result = handler.handle({ field: 'email', value: '' });
      // Base case: empty value must fail with specific error message
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('email is required');
    });

    it('rejects whitespace-only', () => {
      const handler = new RequiredHandler();
      const result = handler.handle({ field: 'email', value: '   ' });
      // trim() makes whitespace-only equivalent to empty
      expect(result.isValid).toBe(false);
    });

    it('accepts non-empty value', () => {
      const handler = new RequiredHandler();
      const result = handler.handle({ field: 'email', value: 'a@b.co' });
      // No next handler → base-handler returns { isValid: true, errors: [] }
      expect(result.isValid).toBe(true);
      expect(result.errors).toHaveLength(0);
    });
  });

  /** EmailHandler alone — validates format only, ignores length. */
  describe('EmailHandler in isolation', () => {
    it('rejects invalid email', () => {
      const handler = new EmailHandler();
      const result = handler.handle({ field: 'email', value: 'invalid' });
      // Missing @ and domain → invalid format
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('email must be a valid email');
    });

    it('accepts valid email', () => {
      const handler = new EmailHandler();
      const result = handler.handle({ field: 'email', value: 'user@example.com' });
      // Standard format passes regex validation
      expect(result.isValid).toBe(true);
    });
  });

  /** MinLengthHandler alone — enforces minimum character count. */
  describe('MinLengthHandler in isolation', () => {
    it('rejects string shorter than min', () => {
      const handler = new MinLengthHandler(8);
      const result = handler.handle({ field: 'email', value: 'short' });
      // "short" = 5 chars < 8
      expect(result.isValid).toBe(false);
      expect(result.errors[0]).toContain('at least 8');
    });

    it('accepts string at or above min', () => {
      const handler = new MinLengthHandler(2);
      // Boundary: exactly 8 chars and above both pass
      expect(handler.handle({ field: 'email', value: '12345678' }).isValid).toBe(true);
      expect(handler.handle({ field: 'email', value: '123456789' }).isValid).toBe(true);
    });
  });

  /** MaxLengthHandler alone — enforces maximum character count. */
  describe('MaxLengthHandler in isolation', () => {
    it('rejects string longer than max', () => {
      const handler = new MaxLengthHandler(64);
      const result = handler.handle({ field: 'email', value: 'a'.repeat(65) });
      // 65 chars exceeds limit of 64
      expect(result.isValid).toBe(false);
      expect(result.errors[0]).toContain('at most 64');
    });

    it('accepts string at or below max', () => {
      const handler = new MaxLengthHandler(64);
      // Boundary: exactly 64 chars and shorter both pass
      expect(handler.handle({ field: 'email', value: 'a'.repeat(64) }).isValid).toBe(true);
      expect(handler.handle({ field: 'email', value: 'short' }).isValid).toBe(true);
    });
  });

  /** Full chain — verifies order of handlers and early-exit behavior. */
  describe('Full chain', () => {
    it('stops at first failure (required)', () => {
      const chain = buildChain();
      const result = chain.handle({ field: 'email', value: '' });
      // RequiredHandler is first → fails immediately, never reaches email/min/max
      expect(result.isValid).toBe(false);
      expect(result.errors).toHaveLength(1);
      expect(result.errors[0]).toBe('email is required');
    });

    it('stops at first failure (email)', () => {
      const chain = buildChain();
      const result = chain.handle({ field: 'email', value: 'invalid' });
      // Passes required (non-empty) but fails email format; min/max never run
      expect(result.isValid).toBe(false);
      expect(result.errors).toHaveLength(1);
      expect(result.errors[0]).toContain('valid email');
    });

    it('stops at first failure (minLength)', () => {
      const chain = buildChain();
      const result = chain.handle({ field: 'email', value: 'a@b.co' });
      // Passes required and email; fails min length (6 < 8); max never runs
      expect(result.isValid).toBe(false);
      expect(result.errors[0]).toContain('at least 8');
    });

    it('passes valid input through entire chain', () => {
      const chain = buildChain();
      const result = chain.handle({ field: 'email', value: 'valid.email@example.com' });
      // All four handlers pass: non-empty, valid format, ≥8, ≤64 chars
      expect(result.isValid).toBe(true);
      expect(result.errors).toHaveLength(0);
    });
  });
});
