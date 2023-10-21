import { Converter, Normalizer } from './types';

export default class ObjectConverter implements Converter {
    private normalizers: Array<Normalizer>;

    constructor(normalizers: Array<Normalizer>) {
        this.normalizers = normalizers;
    }

    convertObjectToFormData(value: Record<string, any>): FormData {
        let formData = new FormData();

        for (const key in value) {
            if (!value.hasOwnProperty(key) || value[key] === undefined) {
                continue;
            }

            const fieldValue = value[key];

            let isNormalized = false;

            for (const normalizer of this.normalizers) {
                if (!normalizer.shouldNormalize(fieldValue)) {
                    continue;
                }

                formData = normalizer.normalize(formData, key, fieldValue);
                isNormalized = true;

                break;
            }

            if (!isNormalized) {
                throw new Error(`No normalizer found for ${key}`);
            }
        }

        return formData;
    }
}
