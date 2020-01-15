// This file in the entry point for the main webpack configuration
// Everything exported here can be used from other JS libraries

// TS export examples:

// export { IProvider } from './IoC/IProvider';
// export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;

// JS export examples:

import {
    assert, fail, unreachable,
} from './contracts';

export {
    assert,
    fail,
    unreachable,
};