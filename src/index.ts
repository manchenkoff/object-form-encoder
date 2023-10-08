import ObjectConverter from './converter';
import ArrayNormalizer from './normalizers/array';
import BooleanNormalizer from './normalizers/boolean';
import DateNormalizer from './normalizers/date';
import FileNormalizer from './normalizers/file';
import FileListNormalizer from './normalizers/filelist';
import ObjectNormalizer from './normalizers/object';
import ScalarNormalizer from './normalizers/scalar';
import { Normalizer } from './types';

const normalizers: Array<Normalizer> = [
    new FileListNormalizer(),
    new ArrayNormalizer([
        new FileListNormalizer(),
        new FileNormalizer(),
        new DateNormalizer(),
        new BooleanNormalizer(),
        new ObjectNormalizer(),
        new ScalarNormalizer(),
    ]),
    new FileNormalizer(),
    new DateNormalizer(),
    new BooleanNormalizer(),
    new ObjectNormalizer(),
    new ScalarNormalizer(),
];

const converter = new ObjectConverter(normalizers);

export function objectToFormData(value: object): FormData {
    const formData = converter.convertObjectToFormData(value);

    return formData;
}
