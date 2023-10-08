import { Normalizer } from '../types';

export default class BooleanNormalizer implements Normalizer {
    normalize(formData: FormData, key: string, value: any): FormData {
        formData.append(key, (value as boolean) ? '1' : '0');

        return formData;
    }

    shouldNormalize(value: any): boolean {
        return typeof value === 'boolean';
    }
}
