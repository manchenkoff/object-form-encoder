import { Normalizer } from '../types';

export default class FileNormalizer implements Normalizer {
    normalize(formData: FormData, key: string, value: any): FormData {
        formData.append(key, value as File);

        return formData;
    }

    shouldNormalize(value: any): boolean {
        return value instanceof File;
    }
}
