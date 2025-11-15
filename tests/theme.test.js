/**
 * Theme toggling utility for testing (does not depend on DOM)
 */
function toggleTheme(current) {
  return current === 'light' ? 'dark' : 'light';
}

describe('Theme Toggle - Unit Tests', () => {
  test('toggles light -> dark', () => {
    expect(toggleTheme('light')).toBe('dark');
  });
  test('toggles dark -> light', () => {
    expect(toggleTheme('dark')).toBe('light');
  });
  test('defaults to light when invalid input', () => {
    expect(toggleTheme(null)).toBe('light');
    expect(toggleTheme(undefined)).toBe('light');
    expect(toggleTheme('')).toBe('light');
  });
});
