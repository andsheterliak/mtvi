import { ListItem, Typography } from '@material-ui/core';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import { Skeleton } from '@material-ui/lab';
import { MouseEventHandler } from 'react';
import { IsLoading } from '~/shared/types';
import { SelectionBarItem } from './types';

const useStyles = makeStyles(({ palette }) => {
  return createStyles({
    info: {
      width: '100%',
      display: 'grid',
      gap: '10px',
      gridAutoFlow: 'column',
      justifyContent: 'space-between',
    },

    amount: {
      padding: '0 10px',
      borderRadius: '5px',
      backgroundColor: palette.type === 'dark' ? 'hsl(0, 0%, 30%, 15%)' : 'hsl(0, 0%, 80%, 15%)',
    },
  });
});

type Props = Partial<{
  name: SelectionBarItem['name'];
  amount: SelectionBarItem['amount'];
  selectHandler: MouseEventHandler<HTMLButtonElement>;
  isSelected: boolean;
  isLoading: IsLoading;
}>;

export const SelectionItem = ({ name, amount, selectHandler, isSelected, isLoading }: Props) => {
  const classes = useStyles();

  const content = (
    <Typography color={isSelected ? 'inherit' : 'textPrimary'} className={classes.info}>
      {isLoading ? <Skeleton width={130} /> : name}

      {isLoading ? (
        <Typography component="span">
          <Skeleton width={30} />
        </Typography>
      ) : (
        <Typography
          className={classes.amount}
          color={isSelected ? 'inherit' : 'textSecondary'}
          component="span"
        >
          {amount}
        </Typography>
      )}
    </Typography>
  );

  return (
    <>
      {isLoading ? (
        <ListItem component="div">{content}</ListItem>
      ) : (
        <ListItem button component="button" onClick={selectHandler} selected={isSelected}>
          {content}
        </ListItem>
      )}
    </>
  );
};
