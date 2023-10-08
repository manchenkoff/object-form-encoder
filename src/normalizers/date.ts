import { Normalizer } from '../types';

export default class DateNormalizer implements Normalizer {
    normalize(formData: FormData, key: string, value: any): FormData {
        formData.append(key, (value as Date).toISOString());

        return formData;
    }

    shouldNormalize(value: any): boolean {
        return value instanceof Date;
    }
}
