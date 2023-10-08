import { expect, test } from 'vitest';
import DateNormalizer from '../../src/normalizers/date';

test('should normalize value', () => {
    const normalizer = new DateNormalizer();

    const formData = new FormData();
    const key = 'files';
    const value = new Date('2020-01-01');

    const expected = new FormData();
    expected.append(key, value.toISOString());

    expect(normalizer.normalize(formData, key, value)).toEqual(expected);
});

test('should apply', () => {
    const normalizer = new DateNormalizer();

    const value = new Date('2020-01-01');

    expect(normalizer.shouldNormalize(value)).toBe(true);
});

test('should not apply', () => {
    const normalizer = new DateNormalizer();
    const value = '2020-01-01';

    expect(normalizer.shouldNormalize(value)).toBe(false);
});
