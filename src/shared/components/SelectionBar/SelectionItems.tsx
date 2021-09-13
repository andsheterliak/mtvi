import { ItemAmount } from '~/shared/constants';
import { IsLoading } from '~/shared/types';
import { SelectionItem } from './SelectionItem';
import { Selected, SelectHandler, SelectionBarData } from './types';

type Props = {
  data: SelectionBarData | null;
  selectHandler: SelectHandler;
  selected: Selected;
  isLoading: IsLoading;
  itemSkeletonAmount: ItemAmount;
};

export const SelectionItems = ({
  data,
  selectHandler,
  selected,
  isLoading,
  itemSkeletonAmount,
}: Props) => {
  if (isLoading) {
    const items = Array(itemSkeletonAmount)
      .fill('')
      .map((_, index) => {
        return <SelectionItem key={index} isLoading={true} />;
      });

    return <>{items}</>;
  }

  const items = Object.entries(data!).map(([key, { name, amount }]) => {
    return (
      <SelectionItem
        key={key}
        name={name}
        amount={amount}
        selectHandler={() => selectHandler(key)}
        isSelected={key === selected}
      />
    );
  });

  return <>{items}</>;
};
