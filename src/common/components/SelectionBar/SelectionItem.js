import { ListItem, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Skeleton } from '@material-ui/lab';

const useStyles = makeStyles(() => ({
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
    backgroundColor: 'hsl(0, 0%, 60%, 15%)',
  },
}));

const SelectionItem = ({
  name,
  amount,
  selectHandler,
  isSelected,
  isLoading,
}) => {
  const classes = useStyles();

  const content = (
    <Typography color="textPrimary" className={classes.info}>
      {isLoading ? <Skeleton width={130} /> : name}

      {isLoading ? (
        <Typography component="span">
          <Skeleton width={30} />
        </Typography>
      ) : (
        <Typography
          className={classes.amount}
          color="textSecondary"
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
        <ListItem
          button
          component="button"
          onClick={selectHandler}
          selected={isSelected}
        >
          {content}
        </ListItem>
      )}
    </>
  );
};

export default SelectionItem;
