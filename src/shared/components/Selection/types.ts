export type Selected = string;
export type SelectHandler = (key: Selected) => void;

export type SelectionDataItem<Data = unknown> = {
  name: string;
  amount: number;
  data: Data;
};

export type SelectionData = Record<string, SelectionDataItem>;
