import { expect, test } from 'vitest';
import { objectToFormData } from '../src/index';

test('object should be converted to form data', () => {
    const payload = { foo: 'bar' };

    const expected = new FormData();
    expected.append('foo', 'bar');

    expect(objectToFormData(payload)).toEqual(expected);
});

test('object should be converted to form data w/o undefined', () => {
    const payload = { foo: 'bar', bar: undefined };

    const expected = new FormData();
    expected.append('foo', 'bar');

    expect(objectToFormData(payload)).toEqual(expected);
});

test('complex object should be converted to form data', () => {
    const file1 = new File(['foo'], 'foo.txt');
    const file2 = new File(['bar'], 'bar.txt');

    const fileInput = document.createElement('input');

    fileInput.type = 'file';
    fileInput.multiple = true;

    const fileList = Object.create(fileInput.files) as FileList;
    fileList[0] = file1;
    fileList[1] = file2;

    Object.defineProperty(fileList, 'length', { value: 2 });

    const payload = {
        name: 'John',
        roles: ['user', 'admin'],
        is_active: true,
        has_children: false,
        age: 30,
        address: {
            street: 'Street name',
            city: 'City name',
        },
        created_at: new Date('2020-01-01'),
        avatar: new File(['foo'], 'foo.txt'),
        uploads: fileList,
    };

    const expected = new FormData();
    expected.append('name', 'John');
    expected.append('roles[]', 'user');
    expected.append('roles[]', 'admin');
    expected.append('is_active', '1');
    expected.append('has_children', '0');
    expected.append('age', '30');
    expected.append('address', JSON.stringify(payload.address));
    expected.append('created_at', '2020-01-01T00:00:00.000Z');
    expected.append('avatar', payload.avatar);
    expected.append('uploads[]', file1);
    expected.append('uploads[]', file2);

    expect(objectToFormData(payload)).toEqual(expected);
});
