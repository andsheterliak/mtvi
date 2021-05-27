import { ListItem, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
  name: {
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
  },

  amount: {
    padding: '0 10px',
    borderRadius: '5px',
    backgroundColor: 'hsl(0, 0%, 60%, 15%)',
    height: 'min-content',
    marginLeft: '10px',
  },
}));

const SelectionItem = ({ name, amount, selectHandler, isSelected }) => {
  const classes = useStyles();

  return (
    <ListItem
      button
      component="button"
      onClick={selectHandler}
      selected={isSelected}
    >
      <Typography color="textPrimary" className={classes.name}>
        {name}

        <Typography
          className={classes.amount}
          color="textSecondary"
          component="span"
        >
          {amount}
        </Typography>
      </Typography>
    </ListItem>
  );
};

export default SelectionItem;
