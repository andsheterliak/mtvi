import { Card, CardHeader, List } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Slider } from '../Slider';
import { SelectionItems } from './SelectionItems';

export { useSelectionBar } from './useSelectionBar';

const useStyles = makeStyles((theme) => ({
  title: {
    backgroundColor: 'hsl(0, 0%, 0%, 13%)',
  },

  list: {
    display: 'grid',
    gridAutoFlow: 'column',
    gridAutoColumns: 'max-content',

    [theme.breakpoints.up('md')]: {
      display: 'block',
    },
  },
}));

export const SelectionBar = ({
  title,
  data,
  selectHandler,
  selected,
  isLoading,
  itemSkeletonAmount,
}) => {
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
