import { Normalizer } from '../types';

export default class FileListNormalizer implements Normalizer {
    normalize(formData: FormData, key: string, value: any): FormData {
        const arrayKey = `${key}[]`;

        for (const file of value as FileList) {
            formData.append(arrayKey, file);
        }

        return formData;
    }

    shouldNormalize(value: any): boolean {
        return value instanceof FileList;
    }
}
