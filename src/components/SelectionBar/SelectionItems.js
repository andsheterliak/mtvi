import { SelectionItem } from './SelectionItem';

export const SelectionItems = ({
  data,
  selectHandler,
  selected,
  isLoading,
  itemSkeletonAmount,
}) => {
  if (isLoading) {
    return Array(itemSkeletonAmount)
      .fill()
      .map((_, index) => {
        return <SelectionItem key={index} isLoading={true} />;
      });
  }

  return Object.entries(data).map(([key, { name, amount }]) => {
    return (
      <SelectionItem
        key={key}
        name={name}
        amount={amount}
        selectHandler={(e) => selectHandler(e, key)}
        isSelected={key === selected}
      />
    );
  });
};
