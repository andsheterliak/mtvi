import { ChangeEvent } from 'react';
import { SortOption } from '~/api/tmdb';

export type DateTitle = string;
export type ModalTitle = string;
export type IsAdjustmentButtonDisabled = boolean;

export type SortByOptions = Record<string, SortOption>;
export type SortByValue = HTMLSelectElement['value'];
export type SortByEvent = ChangeEvent<{ value: unknown }>; // MUI required types. Can't be changed.

export type UserScoreValue = number | number[]; // MUI required types. Can't be changed.
// eslint-disable-next-line @typescript-eslint/ban-types
export type UserScoreEvent = ChangeEvent<{}>; // MUI required types. Can't be changed.
