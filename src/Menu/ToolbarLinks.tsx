import { List } from '@material-ui/core';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import { Links } from './Links';

const useStyles = makeStyles(({ breakpoints }) => {
  return createStyles({
    list: {
      display: 'none',
      gridAutoFlow: 'column',
      gap: 4,

      [breakpoints.up(breakpoints.values.sl)]: {
        display: 'grid',
      },
    },

    link: {
      padding: '2px 12px 2px 12px',
    },
  });
});

export const ToolbarLinks = () => {
  const classes = useStyles();

  return (
    <List className={classes.list} component="nav" aria-label="main navigation">
      <Links listItemProps={{ className: classes.link }} />
    </List>
  );
};
