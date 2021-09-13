import { Card, CardHeader, List } from '@material-ui/core';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import { ItemAmount } from '~/shared/constants';
import { IsLoading } from '~/shared/types';
import { Slider } from '../Slider';
import { SelectionItems } from './SelectionItems';
import { Selected, SelectHandler, SelectionBarData } from './types';

export * from './types';
export * from './useSelectionBar';

const useStyles = makeStyles(({ breakpoints }) => {
  return createStyles({
    title: {
      backgroundColor: 'hsl(0, 0%, 0%, 13%)',
    },

    list: {
      display: 'grid',
      gridAutoFlow: 'column',
      gridAutoColumns: 'max-content',

      [breakpoints.up('md')]: {
        display: 'block',
      },
    },
  });
});

type Props = {
  isLoading: IsLoading;
  itemSkeletonAmount: ItemAmount;
  selected: Selected;
  selectHandler: SelectHandler;
  title: string;
  data: SelectionBarData | null;
};

export const SelectionBar = ({
  title,
  data,
  selectHandler,
  selected,
  isLoading,
  itemSkeletonAmount,
}: Props) => {
  const classes = useStyles();

  return (
    <Card>
      <CardHeader
        titleTypographyProps={{ color: 'textPrimary' }}
        title={title}
        className={classes.title}
      />

      <Slider padding="0" isLoading={isLoading}>
        <List component="div" className={classes.list}>
          <SelectionItems
            isLoading={isLoading}
            itemSkeletonAmount={itemSkeletonAmount}
            data={data}
            selectHandler={selectHandler}
            selected={selected}
          />
        </List>
      </Slider>
    </Card>
  );
};
