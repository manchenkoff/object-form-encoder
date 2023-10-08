import { expect, test } from 'vitest';
import FileListNormalizer from '../../src/normalizers/filelist';

test('should normalize value', () => {
    const normalizer = new FileListNormalizer();

    const file1 = new File(['foo'], 'foo.txt');
    const file2 = new File(['bar'], 'bar.txt');

    const fileInput = document.createElement('input');

    fileInput.type = 'file';
    fileInput.multiple = true;

    const fileList = Object.create(fileInput.files) as FileList;
    fileList[0] = file1;
    fileList[1] = file2;

    Object.defineProperty(fileList, 'length', { value: 2 });

    const formData = new FormData();
    const key = 'files';
    const value = fileList;

    const expected = new FormData();
    expected.append('files[]', file1);
    expected.append('files[]', file2);

    expect(normalizer.normalize(formData, key, value)).toEqual(expected);
});

test('should apply', () => {
    const normalizer = new FileListNormalizer();

    const file1 = new File(['foo'], 'foo.txt');
    const file2 = new File(['bar'], 'bar.txt');

    const fileInput = document.createElement('input');

    fileInput.type = 'file';
    fileInput.multiple = true;

    const fileList = Object.create(fileInput.files) as FileList;
    fileList[0] = file1;
    fileList[1] = file2;

    expect(normalizer.shouldNormalize(fileList)).toBe(true);
});

test('should not apply', () => {
    const normalizer = new FileListNormalizer();
    const value = [1, 2, 3];

    expect(normalizer.shouldNormalize(value)).toBe(false);
});
