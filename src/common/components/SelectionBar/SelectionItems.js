import SelectionItem from './SelectionItem';

const SelectionItems = ({ data, selectHandler, selected }) => {
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

export default SelectionItems;
