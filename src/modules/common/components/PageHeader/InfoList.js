import { makeStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';

const useStyles = makeStyles(() => {
  return {
    list: {
      listStyleType: 'none',
      margin: 0,
      padding: 0,
    },

    infoItem: {
      '&:not(:last-child)': {
        margin: '0 0 8px 0',
      },
    },
  };
});

const InfoList = ({ dataList }) => {
  const classes = useStyles();

  const items = dataList.map(({ name, value }) => {
    return (
      <li key={name} className={classes.infoItem}>
        <Typography component="span" variant="body2" color="textSecondary">
          {name}:{' '}
        </Typography>

        <Typography component="span" variant="body2">
          {value}
        </Typography>
      </li>
    );
  });

  return <ul className={classes.list}>{items}</ul>;
};

export default InfoList;
