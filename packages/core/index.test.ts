import { describe, it, expect } from 'vitest';
import { getButtonClass } from './index';

describe('Button Core Logic', () => {
  it('應根據 variant 回傳正確的 class', () => {
    expect(getButtonClass('primary')).toBe('btn-base btn-primary');
    expect(getButtonClass('secondary')).toBe('btn-base btn-secondary');
  });
});