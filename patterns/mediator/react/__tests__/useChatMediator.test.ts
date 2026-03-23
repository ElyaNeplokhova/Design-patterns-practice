/**
 * @vitest-environment jsdom
 */
import { describe, it, expect } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useChatMediator } from '../hooks/useChatMediator';

describe('useChatMediator', () => {
  it('starts with empty messages', () => {
    const { result } = renderHook(() => useChatMediator());
    expect(result.current.messages).toHaveLength(0);
  });

  it('defaults to Alice as current user', () => {
    const { result } = renderHook(() => useChatMediator());
    expect(result.current.currentUser).toBe('Alice');
  });

  it('uses initial user when provided', () => {
    const { result } = renderHook(() => useChatMediator('Bob'));
    expect(result.current.currentUser).toBe('Bob');
  });

  it('adds message with current user as sender when send is called', () => {
    const { result } = renderHook(() => useChatMediator('Alice'));
    act(() => result.current.send('Hello'));
    expect(result.current.messages).toHaveLength(1);
    expect(result.current.messages[0]).toEqual({ from: 'Alice', content: 'Hello' });
  });

  it('does not add empty messages', () => {
    const { result } = renderHook(() => useChatMediator());
    act(() => result.current.send(''));
    act(() => result.current.send('   '));
    expect(result.current.messages).toHaveLength(0);
  });

  it('trimms message content', () => {
    const { result } = renderHook(() => useChatMediator('Bob'));
    act(() => result.current.send('  Hi  '));
    expect(result.current.messages[0].content).toBe('Hi');
  });

  it('exposes all participants', () => {
    const { result } = renderHook(() => useChatMediator());
    expect(result.current.participants).toEqual(['Alice', 'Bob', 'Charlie']);
  });
});
