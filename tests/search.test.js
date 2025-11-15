/**
 * Search photos by query across title, description, author, category
 * Pure function used for unit tests
 * @param {Array<Object>} photos
 * @param {string} query
 */
function searchPhotos(photos, query) {
  if (!Array.isArray(photos)) throw new Error('Photos must be an array');
  if (!query || typeof query !== 'string') return photos;
  const q = query.toLowerCase().trim();
  if (!q) return photos;
  return photos.filter(p =>
    (p.title || '').toLowerCase().includes(q) ||
    (p.description || '').toLowerCase().includes(q) ||
    (p.author || '').toLowerCase().includes(q) ||
    (p.category || '').toLowerCase().includes(q)
  );
}

describe('Search Photos - Unit Tests', () => {
  const sample = [
    { title: 'Mountain Sunrise', description: 'Golden hour', author: 'John', category: 'nature' },
    { title: 'City Lights', description: 'Night skyline', author: 'Jane', category: 'architecture' },
    { title: 'Forest Path', description: 'Green woods', author: 'Mike', category: 'nature' }
  ];

  // Happy paths
  test('finds by title', () => {
    const res = searchPhotos(sample, 'Mountain');
    expect(res).toHaveLength(1);
    expect(res[0].title).toBe('Mountain Sunrise');
  });

  test('finds by description', () => {
    const res = searchPhotos(sample, 'night');
    expect(res).toHaveLength(1);
    expect(res[0].title).toBe('City Lights');
  });

  test('finds by author (case-insensitive)', () => {
    const res = searchPhotos(sample, 'jOHn');
    expect(res).toHaveLength(1);
    expect(res[0].author).toBe('John');
  });

  test('finds by category', () => {
    const res = searchPhotos(sample, 'nature');
    expect(res).toHaveLength(2);
  });

  // Exceptions & edge cases
  test('returns all when query empty', () => {
    const res = searchPhotos(sample, '');
    expect(res).toHaveLength(3);
  });

  test('throws when photos not array', () => {
    expect(() => searchPhotos(null, 'x')).toThrow('Photos must be an array');
  });

  test('returns empty when no matches', () => {
    const res = searchPhotos(sample, 'zzz');
    expect(res).toHaveLength(0);
  });
});
