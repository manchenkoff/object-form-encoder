import { Normalizer } from '../types';

export default class ObjectNormalizer implements Normalizer {
    normalize(formData: FormData, key: string, value: any): FormData {
        const jsonString = JSON.stringify(value);

        formData.append(key, jsonString);

        return formData;
    }

    shouldNormalize(value: any): boolean {
        return typeof value === 'object';
    }
}
