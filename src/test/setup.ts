/**
 * @fileoverview Test setup file for Vitest
 */

import { expect, afterEach } from 'vitest';

// Cleanup localStorage after each test
afterEach(() => {
  localStorage.clear();
});

// Mock localStorage for tests
global.localStorage = {
  getItem: (key: string) => {
    return (global.localStorage as any)[key] || null;
  },
  setItem: (key: string, value: string) => {
    (global.localStorage as any)[key] = value;
  },
  removeItem: (key: string) => {
    delete (global.localStorage as any)[key];
  },
  clear: () => {
    for (const key in global.localStorage) {
      if (key !== 'getItem' && key !== 'setItem' && key !== 'removeItem' && key !== 'clear') {
        delete (global.localStorage as any)[key];
      }
    }
  },
  length: 0,
  key: (index: number) => null,
};
