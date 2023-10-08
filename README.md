# Object Form Encoder

[![npm version][npm-version-src]][npm-version-href]
[![npm downloads][npm-downloads-src]][npm-downloads-href]
[![License][license-src]][license-href]
[![Nuxt][nuxt-src]][nuxt-href]

This package provides a simple way to convert any object to a FormData instance to send it to remote server.

## Features

-   Convert any object to FormData instance
-   Converts complex objects to JSON strings
-   Normalizes Dates to ISO strings
-   Assigns arrays with `key[]` syntax

## Installation

1. Add `object-form-encoder` dependency to your project

```bash
# Using pnpm
pnpm add -D object-form-encoder

# Using yarn
yarn add --dev object-form-encoder

# Using npm
npm install --save-dev object-form-encoder
```

That's it! You can now use this package in your app ✨

## Usage

Let's imagine that you have this object in your application code:

```typescript
const payload = {
    name: 'John',
    roles: ['user', 'admin'],
    is_active: true,
    has_children: false,
    age: 30,
    address: {
        street: 'Street name',
        city: 'City name',
    },
    created_at: new Date('2020-01-01'),
    avatar: new File(['foo'], 'foo.txt'), // e.g. from <input type="file" />
    uploads: new FileList([...]), // e.g. from <input type="file" multiple />
};
```

And you need to send it to the server as `multipart/form-data` request. You can do it with this package:

```typescript
import { objectToFormData } from 'object-form-encoder';

const formData = objectToFormData(payload);
```

Now you are free to send this `formData` to the remote API.

### Normalization

Since some types should be normalized before appending to the `FormData` instance, this package contains a list of normalizers for such types:

-   `FileList` - appends each file to the same key with `key[]` syntax
-   `Array` - appends each item to the same key with `key[]` syntax
-   `File` - appends as is
-   `Date` - normalizes to ISO string
-   `Boolean` - converts to `1` or `0` string
-   `Object` - converts to JSON string
-   `Scalar` - appends as is (any type that is not `object`)

Each normalizer applies only once and the order of normalizers is the same as in the list above.

## Development

```bash
# Install dependencies
yarn install

# Build package
yarn build

# Run Prettier
yarn fmt

# Run ESLint
yarn lint

# Run Vitest
yarn test

# Release new version
yarn release
```

<!-- Badges -->

[npm-version-src]: https://img.shields.io/npm/v/object-form-encoder/latest.svg?style=flat&colorA=18181B&colorB=28CF8D
[npm-version-href]: https://npmjs.com/package/object-form-encoder
[npm-downloads-src]: https://img.shields.io/npm/dm/object-form-encoder.svg?style=flat&colorA=18181B&colorB=28CF8D
[npm-downloads-href]: https://npmjs.com/package/object-form-encoder
[license-src]: https://img.shields.io/npm/l/object-form-encoder.svg?style=flat&colorA=18181B&colorB=28CF8D
[license-href]: https://npmjs.com/package/object-form-encoder
[nuxt-src]: https://img.shields.io/badge/Nuxt-18181B?logo=nuxt.js
[nuxt-href]: https://nuxt.com
