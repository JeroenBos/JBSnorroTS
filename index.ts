// TS:

export { IProvider } from './IoC/IProvider';
export { IResettableProvider } from './IoC/IResettableProvider';
export { AbstractProvider } from './IoC/AbstractProvider';
export { InverseLookup } from './@types/TLookup';
export { ResettableContainer } from './IoC/ResettableContainer';
export type Rect = ClientRect | DOMRect;
export { Grouping } from './extensions/enumerable';
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
export type UncheckedOmit<T, K> = Pick<T, Exclude<keyof T, K>>;

// JS:

import {
    assert, assertAreIdentical
} from './contracts';

import {
    undefinedToFalse
} from './conversions';
import { isDevelopment } from './flags';
import { groupBy } from './extensions/enumerable';
import { isEmptyObject } from './extensions/object';
import { isNumeric } from './extensions/numerics';

export {
    assert,
    assertAreIdentical,
    undefinedToFalse,
    isDevelopment,
    groupBy,
    isEmptyObject,
    isNumeric,
};