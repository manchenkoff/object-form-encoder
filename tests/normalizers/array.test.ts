import { expect, test } from 'vitest';
import ArrayNormalizer from '../../src/normalizers/array';
import ScalarNormalizer from '../../src/normalizers/scalar';

test('should normalize value', () => {
    const normalizer = new ArrayNormalizer([new ScalarNormalizer()]);

    const formData = new FormData();
    const key = 'array';
    const value = ['bar', 'baz'];

    const expected = new FormData();
    expected.append('array[]', 'bar');
    expected.append('array[]', 'baz');

    expect(normalizer.normalize(formData, key, value)).toEqual(expected);
});

test('should apply', () => {
    const normalizer = new ArrayNormalizer([]);
    const value = ['bar', 'baz'];

    expect(normalizer.shouldNormalize(value)).toBe(true);
});

test('should not apply', () => {
    const normalizer = new ArrayNormalizer([]);
    const value = { bar: 'baz' };

    expect(normalizer.shouldNormalize(value)).toBe(false);
});
