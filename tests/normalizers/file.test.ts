import { expect, test } from 'vitest';
import FileNormalizer from '../../src/normalizers/file';

test('should normalize value', () => {
    const normalizer = new FileNormalizer();

    const formData = new FormData();
    const key = 'files';
    const value = new File(['foo'], 'foo.txt');

    const expected = new FormData();
    expected.append(key, value);

    expect(normalizer.normalize(formData, key, value)).toEqual(expected);
});

test('should apply', () => {
    const normalizer = new FileNormalizer();

    const file = new File(['foo'], 'foo.txt');

    expect(normalizer.shouldNormalize(file)).toBe(true);
});

test('should not apply', () => {
    const normalizer = new FileNormalizer();
    const value = { file: 'foo.txt' };

    expect(normalizer.shouldNormalize(value)).toBe(false);
});
