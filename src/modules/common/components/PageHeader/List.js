import { makeStyles } from '@material-ui/core/styles';

import ListItem from './ListItem';

const useStyles = makeStyles(() => {
  return {
    list: {
      listStyleType: 'none',
      margin: 0,
      padding: 0,
    },
  };
});

const List = ({ dataList }) => {
  const classes = useStyles();

  const items = dataList.map(({ name, value }) => {
    return <ListItem key={name} name={name} value={value} />;
  });

  return <ul className={classes.list}>{items}</ul>;
};

export default List;
