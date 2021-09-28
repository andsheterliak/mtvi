import { Typography } from '@material-ui/core';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import { Skeleton } from '@material-ui/lab';
import { IsLoading } from '~/shared/types';
import { SelectionDataItem } from './types';

const useStyles = makeStyles(({ palette }) => {
  return createStyles({
    info: {
      width: '100%',
      display: 'grid',
      gap: '10px',
      gridAutoFlow: 'column',
      justifyContent: 'space-between',
      textTransform: 'initial',
    },

    amount: {
      padding: '0 10px',
      borderRadius: '5px',
      backgroundColor: palette.type === 'dark' ? 'hsl(0, 0%, 30%, 15%)' : 'hsl(0, 0%, 80%, 15%)',
    },
  });
});

type Props = Partial<{
  name: SelectionDataItem['name'];
  amount: SelectionDataItem['amount'];
  isLoading: IsLoading;
}>;

export const SelectionItem = ({ name, amount, isLoading }: Props) => {
  const classes = useStyles();

  return (
    <Typography className={classes.info}>
      {isLoading ? <Skeleton width={130} /> : name}

      {isLoading ? (
        <Typography component="span">
          <Skeleton width={30} />
        </Typography>
      ) : (
        <Typography className={classes.amount} component="span">
          {amount}
        </Typography>
      )}
    </Typography>
  );
};
