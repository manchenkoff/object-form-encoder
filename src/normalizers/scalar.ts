import { Normalizer } from '../types';

export default class ScalarNormalizer implements Normalizer {
    normalize(formData: FormData, key: string, value: any): FormData {
        formData.append(key, value as string);

        return formData;
    }

    shouldNormalize(value: any): boolean {
        return typeof value !== 'object';
    }
}
