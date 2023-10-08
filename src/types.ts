export interface Normalizer {
    shouldNormalize(value: any): boolean;
    normalize(formData: FormData, key: string, value: any): FormData;
}

export interface Converter {
    convertObjectToFormData(value: Record<string, any>): FormData;
}
