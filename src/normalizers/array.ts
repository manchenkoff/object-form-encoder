import { Normalizer } from '../types';

export default class ArrayNormalizer implements Normalizer {
    private readonly normalizers: Array<Normalizer>;

    constructor(normalizers: Array<Normalizer>) {
        this.normalizers = normalizers;
    }

    normalize(formData: FormData, key: string, value: object): FormData {
        const arrayKey = `${key}[]`;

        for (const item of value as any[]) {
            formData = this.normalizeArrayItem(formData, arrayKey, item);
        }

        return formData;
    }

    normalizeArrayItem(formData: FormData, key: string, value: any): FormData {
        for (const normalizer of this.normalizers) {
            if (normalizer.shouldNormalize(value)) {
                return normalizer.normalize(formData, key, value);
            }
        }

        throw new Error(`No normalizer found for '${value}'`);
    }

    shouldNormalize(value: any): boolean {
        return Array.isArray(value);
    }
}
