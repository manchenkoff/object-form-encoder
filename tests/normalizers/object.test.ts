import { expect, test } from 'vitest';
import ObjectNormalizer from '../../src/normalizers/object';

test('should normalize value', () => {
    const normalizer = new ObjectNormalizer();

    const formData = new FormData();
    const key = 'object';
    const value = { bar: 'baz' };

    const expected = new FormData();
    expected.append(key, JSON.stringify(value));

    expect(normalizer.normalize(formData, key, value)).toEqual(expected);
});

test('should apply', () => {
    const normalizer = new ObjectNormalizer();
    const value = { bar: 'baz' };

    expect(normalizer.shouldNormalize(value)).toBe(true);
});

test('should not apply', () => {
    const normalizer = new ObjectNormalizer();
    const value = 'baz';

    expect(normalizer.shouldNormalize(value)).toBe(false);
});
