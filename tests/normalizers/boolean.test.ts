import { expect, test } from 'vitest';
import BooleanNormalizer from '../../src/normalizers/boolean';

test('should normalize value', () => {
    const normalizer = new BooleanNormalizer();

    const formData = new FormData();
    const key = 'files';
    const value = false;

    const expected = new FormData();
    expected.append(key, '0');

    expect(normalizer.normalize(formData, key, value)).toEqual(expected);
});

test('should apply', () => {
    const normalizer = new BooleanNormalizer();

    const value = true;

    expect(normalizer.shouldNormalize(value)).toBe(true);
});

test('should not apply', () => {
    const normalizer = new BooleanNormalizer();
    const value = 'false';

    expect(normalizer.shouldNormalize(value)).toBe(false);
});
