import { ReactNode } from 'react';

export type DataListName = string;
export type DataListValue = ReactNode;
export type DataList = { name: DataListName; value: DataListValue }[] | null;
