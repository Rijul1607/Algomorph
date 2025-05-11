
/**
 * Helper functions to ensure arrays are properly formatted
 */

/**
 * Ensures a value is always returned as an array
 * If the input is already an array, it's returned as-is
 * If it's a single value, it's wrapped in an array
 * If it's undefined/null, an empty array is returned
 */
export function ensureArray<T>(value: T | T[] | null | undefined): T[] {
  if (value === null || value === undefined) {
    return [];
  }
  return Array.isArray(value) ? value : [value];
}
