import { expect, test } from 'vitest';
import ScalarNormalizer from '../../src/normalizers/scalar';

test('should normalize value', () => {
    const normalizer = new ScalarNormalizer();

    const formData = new FormData();
    const key = 'string';
    const value = 'bar';

    const expected = new FormData();
    expected.append(key, value);

    expect(normalizer.normalize(formData, key, value)).toEqual(expected);
});

test('should apply', () => {
    const normalizer = new ScalarNormalizer();
    const value = 'baz';

    expect(normalizer.shouldNormalize(value)).toBe(true);
});

test('should not apply', () => {
    const normalizer = new ScalarNormalizer();
    const value = { bar: 'baz' };

    expect(normalizer.shouldNormalize(value)).toBe(false);
});
