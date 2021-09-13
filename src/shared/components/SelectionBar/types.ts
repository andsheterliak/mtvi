export type Selected = string;
export type SelectHandler = (key: Selected) => void;

export type SelectionBarItem<Data = unknown> = {
  name: string;
  amount: number;
  data: Data;
};

export type SelectionBarData = Record<string, SelectionBarItem>;
